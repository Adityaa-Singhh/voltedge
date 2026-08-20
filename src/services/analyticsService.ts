/**
 * Analytics Service — Sai Enterprises
 * 
 * Provides Firebase Analytics (GA4) event tracking AND native Firestore
 * real-time aggregated metrics tracking (analyticsDaily).
 * 
 * Initialized safely with isSupported() to support environments where
 * IndexedDB or cookies might be restricted.
 */

import { getAnalytics, isSupported, logEvent, type Analytics } from 'firebase/analytics';
import { 
  doc, 
  setDoc, 
  increment, 
  serverTimestamp, 
  collection, 
  query, 
  orderBy, 
  limit, 
  onSnapshot 
} from 'firebase/firestore';
import { app, db } from '../lib/firebase';
import { COLLECTIONS, type DailyAnalytics } from '../lib/firestore-types';

let analyticsInstance: Analytics | null = null;
let initPromise: Promise<Analytics | null> | null = null;

// Initialize analytics asynchronously if supported by the client environment
export async function getAnalyticsInstance(): Promise<Analytics | null> {
  if (analyticsInstance) return analyticsInstance;
  if (initPromise) return initPromise;
  
  initPromise = (async () => {
    if (typeof window !== 'undefined') {
      try {
        const supported = await isSupported();
        if (supported) {
          analyticsInstance = getAnalytics(app);
          if (import.meta.env.DEV) {
            console.info('[Analytics] ✅ Firebase Analytics initialized successfully (G-PQEVRPH9B3)');
          }
        }
      } catch (err) {
        console.debug('[Analytics] Init notice:', err);
      }
    }
    return analyticsInstance;
  })();

  return initPromise;
}

// Immediately trigger background initialization
getAnalyticsInstance();

/**
 * Helper to get today's date key in 'YYYY-MM-DD'
 */
export function getTodayKey(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * Detect client device type
 */
function getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  if (typeof window === 'undefined') return 'desktop';
  const ua = navigator.userAgent.toLowerCase();
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) return 'tablet';
  if (/mobile|iphone|ipod|blackberry|opera mini|iemobile|wpdesktop/i.test(ua) || window.innerWidth < 768) return 'mobile';
  return 'desktop';
}

/**
 * Record atomic increments in Firestore analyticsDaily collection
 */
async function recordFirestoreDailyStat(fields: Record<string, number>) {
  try {
    const today = getTodayKey();
    const docRef = doc(db, COLLECTIONS.ANALYTICS_DAILY, today);
    const updates: Record<string, any> = {
      id: today,
      date: today,
      updatedAt: serverTimestamp(),
    };
    for (const [key, val] of Object.entries(fields)) {
      updates[key] = increment(val);
    }
    await setDoc(docRef, updates, { merge: true });
  } catch (err) {
    // Non-blocking fail-safe
    console.debug('[Analytics] Firestore daily stat record note:', err);
  }
}

/**
 * Generic event logging helper
 */
export async function trackEvent(eventName: string, params?: Record<string, any>) {
  try {
    const analytics = await getAnalyticsInstance();
    if (analytics) {
      logEvent(analytics, eventName, params);
      if (import.meta.env.DEV) {
        console.debug(`[Analytics Event] ${eventName}`, params);
      }
    }
  } catch (err) {
    console.debug('[Analytics] trackEvent error:', err);
  }
}

/**
 * Track page view on route changes (updates GA4 + Firestore daily visitor metrics)
 */
export function trackPageView(pagePath: string, pageTitle?: string) {
  // 1. GA4
  trackEvent('page_view', {
    page_path: pagePath,
    page_title: pageTitle || (typeof document !== 'undefined' ? document.title : ''),
    page_location: typeof window !== 'undefined' ? window.location.href : '',
  });

  // 2. Native Firestore Real-Time Counter
  if (typeof window !== 'undefined') {
    const today = getTodayKey();
    const sessionKey = `sai_session_counted_${today}`;
    const isNewVisitor = !sessionStorage.getItem(sessionKey);
    if (isNewVisitor) {
      sessionStorage.setItem(sessionKey, '1');
    }

    const device = getDeviceType();
    const hour = String(new Date().getHours()).padStart(2, '0') + ':00';

    const statUpdates: Record<string, number> = {
      pageViews: 1,
      [`hourlyPageViews.${hour}`]: 1,
    };
    if (isNewVisitor) {
      statUpdates.uniqueVisitors = 1;
      if (device === 'mobile') statUpdates.deviceMobile = 1;
      else if (device === 'tablet') statUpdates.deviceTablet = 1;
      else statUpdates.deviceDesktop = 1;
    }

    recordFirestoreDailyStat(statUpdates);
  }
}

/**
 * Track product view in product detail page
 */
export function trackProductView(product: { id?: string; name?: string; category?: string; brand?: string; modelNumber?: string }) {
  trackEvent('view_item', {
    item_id: product.id || '',
    item_name: product.name || '',
    item_category: product.category || '',
    item_brand: product.brand || '',
    item_variant: product.modelNumber || '',
  });
}

/**
 * Track product card click / interaction
 */
export function trackProductClick(product: { id?: string; name?: string; category?: string; brand?: string }, source: string = 'product_grid') {
  trackEvent('select_item', {
    item_id: product.id || '',
    item_name: product.name || '',
    item_category: product.category || '',
    item_brand: product.brand || '',
    item_list_name: source,
  });
}

/**
 * Track WhatsApp button clicks (High intent conversion)
 */
export function trackWhatsAppClick(source: string, details?: { productName?: string; pageUrl?: string }) {
  trackEvent('whatsapp_click', {
    source,
    product_name: details?.productName || '',
    page_url: details?.pageUrl || (typeof window !== 'undefined' ? window.location.pathname : ''),
    action_type: 'direct_lead',
  });
  recordFirestoreDailyStat({ whatsappClicks: 1 });
}

/**
 * Track Phone Call button clicks
 */
export function trackPhoneCallClick(source: string, phoneNumber?: string) {
  trackEvent('phone_call_click', {
    source,
    phone_number: phoneNumber || '',
    action_type: 'direct_lead',
  });
  recordFirestoreDailyStat({ phoneClicks: 1 });
}

/**
 * Track Quote Modal Openings
 */
export function trackQuoteModalOpen(source: string, productContext?: string) {
  trackEvent('quote_modal_open', {
    source,
    product_context: productContext || '',
  });
  recordFirestoreDailyStat({ quoteModalOpens: 1 });
}

/**
 * Track Quote / Enquiry Form Submissions
 */
export function trackEnquirySubmission(details: {
  source: string;
  name?: string;
  category?: string;
  productName?: string;
}) {
  trackEvent('generate_lead', {
    source: details.source,
    lead_category: details.category || 'General',
    item_name: details.productName || '',
    currency: 'INR',
  });
  recordFirestoreDailyStat({ enquiries: 1 });
}

/**
 * Track Search queries
 */
export function trackSearchQuery(searchTerm: string, resultsCount: number) {
  const term = searchTerm.trim().toLowerCase();
  if (!term || term.length < 2) return;
  
  trackEvent('search', {
    search_term: term,
    results_count: resultsCount,
  });

  const safeKey = term.replace(/[^a-zA-Z0-9 ]/g, '').trim().slice(0, 40);
  if (safeKey) {
    recordFirestoreDailyStat({
      [`topSearches.${safeKey}`]: 1,
    });
  }
}

/**
 * Track Category & Brand filter selections
 */
export function trackFilterChange(filterType: 'category' | 'brand', filterValue: string) {
  trackEvent('filter_applied', {
    filter_type: filterType,
    filter_value: filterValue,
  });
}

/**
 * Subscribe to real-time daily analytics records from Firestore
 */
export function subscribeToDailyAnalytics(
  daysLimit = 90,
  callback: (data: DailyAnalytics[]) => void
): () => void {
  const q = query(
    collection(db, COLLECTIONS.ANALYTICS_DAILY),
    orderBy('date', 'desc'),
    limit(daysLimit)
  );

  return onSnapshot(q, (snapshot) => {
    const records: DailyAnalytics[] = snapshot.docs.map((docSnap) => {
      const d = docSnap.data();
      return {
        id: docSnap.id,
        date: d.date || docSnap.id,
        pageViews: Number(d.pageViews) || 0,
        uniqueVisitors: Number(d.uniqueVisitors) || 0,
        whatsappClicks: Number(d.whatsappClicks) || 0,
        phoneClicks: Number(d.phoneClicks) || 0,
        quoteModalOpens: Number(d.quoteModalOpens) || 0,
        enquiries: Number(d.enquiries) || 0,
        deviceMobile: Number(d.deviceMobile) || 0,
        deviceDesktop: Number(d.deviceDesktop) || 0,
        deviceTablet: Number(d.deviceTablet) || 0,
        hourlyPageViews: d.hourlyPageViews || {},
        topSearches: d.topSearches || {},
        topPages: d.topPages || {},
        updatedAt: d.updatedAt,
      };
    });
    callback(records);
  }, (err) => {
    console.debug('[Analytics] Daily analytics subscription notice:', err);
  });
}
