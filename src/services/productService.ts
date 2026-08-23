/**
 * Product Service — Sai Enterprises
 */

import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  serverTimestamp,
  type DocumentData,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { COLLECTIONS, type FirestoreProduct } from '../lib/firestore-types';
import { products as staticProducts } from '../data';

function docToProduct(id: string, data: DocumentData): FirestoreProduct {
  return { id, ...data } as FirestoreProduct;
}

function staticToFirestoreProduct(p: typeof staticProducts[0]): FirestoreProduct {
  return {
    ...p,
    published: true,
    createdBy: 'system',
    updatedBy: 'system',
    createdAt: null as any,
    updatedAt: null as any,
  } as unknown as FirestoreProduct;
}

// ── Public ───────────────────────────────────────────────────────────────────

/** Get paginated published products for public site */
export async function getPublishedProductsPaginated(
  lastDoc: any = null,
  categorySlug: string = '',
  _searchPrefix: string = '',
  limitCount: number = 48
): Promise<{ products: FirestoreProduct[]; lastDoc: any; hasMore: boolean }> {
  try {
    let q = query(
      collection(db, COLLECTIONS.PRODUCTS),
      orderBy('createdAt', 'desc')
    );

    if (categorySlug) {
      q = query(
        collection(db, COLLECTIONS.PRODUCTS),
        where('categorySlug', '==', categorySlug),
        orderBy('createdAt', 'desc')
      );
    }

    if (lastDoc) {
      q = query(q, startAfter(lastDoc));
    }

    q = query(q, limit(limitCount));

    const snap = await getDocs(q);
    const firestoreProds = snap.docs
      .map((d) => docToProduct(d.id, d.data()))
      .filter((p) => p.published !== false);

    // If Firestore has results, merge with static products (Firestore updates take precedence)
    const productMap = new Map<string, FirestoreProduct>();

    // 1. Add matching static products
    const filteredStatic = staticProducts.filter(
      (p) => !categorySlug || p.categorySlug === categorySlug
    );
    for (const sp of filteredStatic) {
      if (sp.id) productMap.set(sp.id, staticToFirestoreProduct(sp));
    }

    // 2. Overwrite / append with Firestore products
    for (const fp of firestoreProds) {
      const key = fp.id || fp.slug;
      if (key) productMap.set(key, fp);
    }

    const merged = Array.from(productMap.values());

    return {
      products: merged.slice(0, limitCount),
      lastDoc: snap.docs.length > 0 ? snap.docs[snap.docs.length - 1] : null,
      hasMore: snap.docs.length === limitCount,
    };
  } catch (err) {
    console.warn('[productService] Firestore query fallback to static products:', err);
    const filteredStatic = staticProducts.filter(
      (p) => !categorySlug || p.categorySlug === categorySlug
    );
    return {
      products: filteredStatic.map(staticToFirestoreProduct).slice(0, limitCount),
      lastDoc: null,
      hasMore: false,
    };
  }
}

/** Get all published products (public) */
export async function getAllPublishedProducts(): Promise<FirestoreProduct[]> {
  try {
    const q = query(
      collection(db, COLLECTIONS.PRODUCTS),
      orderBy('createdAt', 'desc')
    );
    const snap = await getDocs(q);
    const firestoreProds = snap.docs
      .map((d) => docToProduct(d.id, d.data()))
      .filter((p) => p.published !== false);

    const productMap = new Map<string, FirestoreProduct>();
    for (const sp of staticProducts) {
      if (sp.id) productMap.set(sp.id, staticToFirestoreProduct(sp));
    }
    for (const fp of firestoreProds) {
      const key = fp.id || fp.slug;
      if (key) productMap.set(key, fp);
    }
    return Array.from(productMap.values());
  } catch {
    return staticProducts.map(staticToFirestoreProduct);
  }
}

/** Get featured products for homepage */
export async function getFeaturedProducts(count = 12): Promise<FirestoreProduct[]> {
  try {
    const q = query(
      collection(db, COLLECTIONS.PRODUCTS),
      where('isFeatured', '==', true),
      limit(count)
    );
    const snap = await getDocs(q);
    const firestoreProds = snap.docs
      .map((d) => docToProduct(d.id, d.data()))
      .filter((p) => p.published !== false);

    const productMap = new Map<string, FirestoreProduct>();
    for (const sp of staticProducts.filter((p) => p.isFeatured)) {
      if (sp.id) productMap.set(sp.id, staticToFirestoreProduct(sp));
    }
    for (const fp of firestoreProds) {
      const key = fp.id || fp.slug;
      if (key) productMap.set(key, fp);
    }
    return Array.from(productMap.values()).slice(0, count);
  } catch {
    return staticProducts.filter((p) => p.isFeatured).map(staticToFirestoreProduct).slice(0, count);
  }
}

/** Get published products by category slug */
export async function getProductsByCategory(categorySlug: string): Promise<FirestoreProduct[]> {
  try {
    const q = query(
      collection(db, COLLECTIONS.PRODUCTS),
      where('categorySlug', '==', categorySlug),
      orderBy('createdAt', 'desc')
    );
    const snap = await getDocs(q);
    const firestoreProds = snap.docs
      .map((d) => docToProduct(d.id, d.data()))
      .filter((p) => p.published !== false);

    const productMap = new Map<string, FirestoreProduct>();
    for (const sp of staticProducts.filter((p) => p.categorySlug === categorySlug)) {
      if (sp.id) productMap.set(sp.id, staticToFirestoreProduct(sp));
    }
    for (const fp of firestoreProds) {
      const key = fp.id || fp.slug;
      if (key) productMap.set(key, fp);
    }
    return Array.from(productMap.values());
  } catch {
    return staticProducts.filter((p) => p.categorySlug === categorySlug).map(staticToFirestoreProduct);
  }
}

/** Get a single product by slug or ID (public) */
export async function getProductBySlug(slug: string): Promise<FirestoreProduct | null> {
  if (!slug) return null;
  const rawSlug = slug.trim();
  const decodedSlug = decodeURIComponent(rawSlug).trim();

  try {
    // 1. Try Firestore where slug == rawSlug or decodedSlug
    const q1 = query(
      collection(db, COLLECTIONS.PRODUCTS),
      where('slug', '==', rawSlug),
      limit(1)
    );
    const snap1 = await getDocs(q1);
    if (!snap1.empty) {
      return docToProduct(snap1.docs[0].id, snap1.docs[0].data());
    }

    if (decodedSlug !== rawSlug) {
      const q2 = query(
        collection(db, COLLECTIONS.PRODUCTS),
        where('slug', '==', decodedSlug),
        limit(1)
      );
      const snap2 = await getDocs(q2);
      if (!snap2.empty) {
        return docToProduct(snap2.docs[0].id, snap2.docs[0].data());
      }
    }

    // 2. Try Firestore direct document ID lookup
    try {
      const docSnap = await getDoc(doc(db, COLLECTIONS.PRODUCTS, rawSlug));
      if (docSnap.exists()) {
        return docToProduct(docSnap.id, docSnap.data());
      }
    } catch {}

    // 3. Fallback: Search in-memory static products from src/data.ts
    const lowerRaw = rawSlug.toLowerCase();
    const lowerDecoded = decodedSlug.toLowerCase();
    const staticMatch = staticProducts.find(
      (p) =>
        p.slug === rawSlug ||
        p.slug === decodedSlug ||
        p.id === rawSlug ||
        p.id === decodedSlug ||
        p.slug.toLowerCase() === lowerRaw ||
        p.slug.toLowerCase() === lowerDecoded ||
        p.id.toLowerCase() === lowerRaw
    );

    if (staticMatch) {
      return staticToFirestoreProduct(staticMatch);
    }
  } catch (err) {
    console.warn('[productService] getProductBySlug lookup error, trying static data fallback:', err);
    const staticMatch = staticProducts.find(
      (p) =>
        p.slug === rawSlug ||
        p.slug === decodedSlug ||
        p.id === rawSlug ||
        p.slug.toLowerCase() === rawSlug.toLowerCase()
    );
    if (staticMatch) {
      return staticToFirestoreProduct(staticMatch);
    }
  }

  // 4. Final static search
  const finalStaticMatch = staticProducts.find(
    (p) =>
      p.slug === rawSlug ||
      p.slug === decodedSlug ||
      p.id === rawSlug ||
      p.slug.toLowerCase() === rawSlug.toLowerCase()
  );
  return finalStaticMatch ? staticToFirestoreProduct(finalStaticMatch) : null;
}

// ── Admin ────────────────────────────────────────────────────────────────────

/** Get all products regardless of published status (admin) */
export async function getAllProducts(): Promise<FirestoreProduct[]> {
  try {
    const q = query(
      collection(db, COLLECTIONS.PRODUCTS),
      orderBy('createdAt', 'desc')
    );
    const snap = await getDocs(q);
    const firestoreProds = snap.docs.map((d) => docToProduct(d.id, d.data()));

    const productMap = new Map<string, FirestoreProduct>();
    for (const sp of staticProducts) {
      if (sp.id) productMap.set(sp.id, staticToFirestoreProduct(sp));
    }
    for (const fp of firestoreProds) {
      const key = fp.id || fp.slug;
      if (key) productMap.set(key, fp);
    }
    return Array.from(productMap.values());
  } catch {
    return staticProducts.map(staticToFirestoreProduct);
  }
}

/** Get a single product by ID (admin) */
export async function getProductById(id: string): Promise<FirestoreProduct | null> {
  try {
    const snap = await getDoc(doc(db, COLLECTIONS.PRODUCTS, id));
    if (snap.exists()) return docToProduct(snap.id, snap.data());
  } catch {}

  const staticMatch = staticProducts.find((p) => p.id === id || p.slug === id);
  return staticMatch ? staticToFirestoreProduct(staticMatch) : null;
}

/** Create a new product */
export async function createProduct(
  data: Omit<FirestoreProduct, 'id' | 'createdAt' | 'updatedAt'>,
  actorUid: string
): Promise<string> {
  const ref = await addDoc(collection(db, COLLECTIONS.PRODUCTS), {
    ...data,
    published: data.published ?? true,
    createdBy: actorUid,
    updatedBy: actorUid,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateProduct(
  id: string,
  data: Partial<Omit<FirestoreProduct, 'id' | 'createdAt' | 'createdBy'>>,
  actorUid: string
): Promise<void> {
  await setDoc(
    doc(db, COLLECTIONS.PRODUCTS, id),
    {
      ...data,
      published: data.published ?? true,
      updatedBy: actorUid,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

/** Delete a product */
export async function deleteProduct(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTIONS.PRODUCTS, id));
}

/** Toggle published status */
export async function toggleProductPublished(id: string, published: boolean, actorUid: string): Promise<void> {
  await updateDoc(doc(db, COLLECTIONS.PRODUCTS, id), {
    published,
    updatedBy: actorUid,
    updatedAt: serverTimestamp(),
  });
}

/** Toggle featured status */
export async function toggleProductFeatured(id: string, isFeatured: boolean, actorUid: string): Promise<void> {
  await updateDoc(doc(db, COLLECTIONS.PRODUCTS, id), {
    isFeatured,
    updatedBy: actorUid,
    updatedAt: serverTimestamp(),
  });
}

