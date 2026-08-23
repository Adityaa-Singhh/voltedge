// ===== PRODUCT CATEGORIES =====
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string; // lucide icon name
  productCount: number;
  image: string;
}

export const categories: Category[] = [
  {
    id: 'cat-1',
    name: 'Switches',
    slug: 'switches',
    description: 'Modular switches, toggle switches, and smart switches for every need',
    icon: 'ToggleRight',
    productCount: 45,
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'cat-2',
    name: 'Sockets',
    slug: 'sockets',
    description: 'Power sockets, USB sockets, and multi-pin sockets',
    icon: 'Plug',
    productCount: 32,
    image: 'https://images.unsplash.com/photo-1620288627223-53302f4e8c74?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'cat-3',
    name: 'Wires',
    slug: 'wires',
    description: 'House wiring, flexible wires, and industrial grade cables',
    icon: 'Cable',
    productCount: 28,
    image: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'cat-4',
    name: 'Cables',
    slug: 'cables',
    description: 'Armoured cables, multi-core cables, and submersible cables',
    icon: 'Unplug',
    productCount: 22,
    image: 'https://images.unsplash.com/photo-1558486012-817176f84c6d?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'cat-5',
    name: 'Lighting',
    slug: 'lighting',
    description: 'LED bulbs, panel lights, downlights, and decorative lighting',
    icon: 'Lightbulb',
    productCount: 56,
    image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'cat-6',
    name: 'MCB & Protection',
    slug: 'mcb-protection',
    description: 'MCBs, RCCBs, distribution boards, and surge protectors',
    icon: 'ShieldCheck',
    productCount: 38,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'cat-7',
    name: 'Fans',
    slug: 'fans',
    description: 'Ceiling fans, exhaust fans, table fans, and BLDC fans',
    icon: 'Fan',
    productCount: 24,
    image: 'https://images.unsplash.com/photo-1618945037805-f1a4ed3783a4?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'cat-8',
    name: 'Accessories',
    slug: 'accessories',
    description: 'Electrical tapes, junction boxes, conduits, and tools',
    icon: 'Wrench',
    productCount: 64,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'cat-9',
    name: 'Industrial',
    slug: 'industrial',
    description: 'Heavy-duty switches, industrial plugs, and panel components',
    icon: 'Factory',
    productCount: 30,
    image: 'https://images.unsplash.com/photo-1513828742140-ccaa34f3ccd0?auto=format&fit=crop&w=600&q=80',
  },
];

// ===== BRANDS =====
export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo: string;
  description: string;
  isAuthorized: boolean;
  categories: string[];
  tagline: string;
}

export const brands: Brand[] = [
  {
    id: 'brand-1',
    name: 'PMCona',
    slug: 'pmcona',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
    description: 'One of India\'s leading manufacturers of modular switches, sockets, and electrical accessories. Known for innovative designs and reliable quality.',
    isAuthorized: true,
    categories: ['Switches', 'Sockets', 'Accessories', 'MCB & Protection'],
    tagline: 'Innovation in Every Switch',
  },
  {
    id: 'brand-2',
    name: 'Havells',
    slug: 'havells',
    logo: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&w=200&q=80',
    description: 'A trusted name in electrical equipment with a wide range of products from wires to fans to industrial solutions.',
    isAuthorized: true,
    categories: ['Wires', 'Cables', 'Fans', 'Lighting', 'MCB & Protection'],
    tagline: 'Wires That Don\'t Catch Fire',
  },
  {
    id: 'brand-3',
    name: 'Polycab',
    slug: 'polycab',
    logo: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=200&q=80',
    description: 'India\'s largest wires & cables manufacturer delivering safe and reliable products for residential and industrial use.',
    isAuthorized: true,
    categories: ['Wires', 'Cables', 'Fans', 'Lighting'],
    tagline: 'Expert in Wires & Cables',
  },
  {
    id: 'brand-4',
    name: 'Anchor by Panasonic',
    slug: 'anchor',
    logo: 'https://images.unsplash.com/photo-1542744094-2ab25be78b90?auto=format&fit=crop&w=200&q=80',
    description: 'Premium modular switches and sockets with Japanese technology and design excellence.',
    isAuthorized: true,
    categories: ['Switches', 'Sockets', 'Accessories'],
    tagline: 'Switch to Smarter Living',
  },
  {
    id: 'brand-5',
    name: 'Finolex',
    slug: 'finolex',
    logo: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=200&q=80',
    description: 'Pioneers in cable manufacturing with over 60 years of expertise in high-quality electrical wires and cables.',
    isAuthorized: false,
    categories: ['Wires', 'Cables'],
    tagline: 'The Wire People',
  },
  {
    id: 'brand-6',
    name: 'Crompton',
    slug: 'crompton',
    logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=200&q=80',
    description: 'A century-old brand known for reliable fans, lighting, and pumps with modern energy-efficient technology.',
    isAuthorized: false,
    categories: ['Fans', 'Lighting'],
    tagline: 'Lighting Lives, Stirring Air',
  },
];

// ===== PRODUCTS =====
export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  brandSlug: string;
  category: string;
  categorySlug: string;
  description: string;
  shortDescription: string;
  specifications: { label: string; value: string }[];
  images: string[];
  sectionImages?: {
    hero?: string;
    specs?: string;
    banner?: string;
  };
  isFeatured: boolean;
  isNew: boolean;
  inStock: boolean;
  tags: string[];
}

export const products: Product[] = [
  {
    id: "prod-pmcona-9251",
    name: "PM CONA Status 6AX 1-Way Modular Switch",
    slug: "pm-cona-status-6ax-1-way-modular-switch-9251",
    brand: "PMCona",
    brandSlug: "pmcona",
    category: "Switches",
    categorySlug: "switches",
    description: "The PM CONA Status 6AX 1-Way Modular Switch (Code 9251) is crafted with premium flame-retardant polycarbonate for exceptional durability and safety. Features precision engineered silver cadmium oxide contact tips for spark-free performance and long electrical life tested over 100,000 switching cycles. Compatible with all standard PM CONA Status modular plates.",
    shortDescription: "ISI marked 6AX 1-way modular switch with smooth toggle and durable silver inlay contacts.",
    specifications: [
      {
            "label": "Product Code",
            "value": "9251"
      },
      {
            "label": "Range / Series",
            "value": "Status Range"
      },
      {
            "label": "Switch Type",
            "value": "1-Way Single Pole"
      },
      {
            "label": "Current Rating",
            "value": "6AX"
      },
      {
            "label": "Voltage Rating",
            "value": "240V ~ 50Hz"
      },
      {
            "label": "Module Size",
            "value": "1 Module"
      },
      {
            "label": "Material",
            "value": "High Grade Flame Retardant Polycarbonate"
      },
      {
            "label": "Certification",
            "value": "ISI Marked (IS:3854)"
      },
      {
            "label": "Box Packaging",
            "value": "20 Pcs (Box) / 600 Pcs (Mini) / 1200 Pcs (Bulk)"
      }
],
    images: ["/images/products/pmcona-status-switch.png"],
    isFeatured: true,
    isNew: false,
    inStock: true,
    tags: ["switch", "6AX", "1-way", "status", "modular", "pmcona", "isi"],
  },
  {
    id: "prod-pmcona-9256",
    name: "PM CONA Status 6AX 2-Way Modular Switch",
    slug: "pm-cona-status-6ax-2-way-modular-switch-9256",
    brand: "PMCona",
    brandSlug: "pmcona",
    category: "Switches",
    categorySlug: "switches",
    description: "The PM CONA Status 6AX 2-Way Modular Switch (Code 9256) enables smooth independent dual-point control for corridors, staircases, and master bedrooms. Engineered with heavy-duty brass terminals and anti-spark silver contacts.",
    shortDescription: "2-way 6AX modular switch for dual-point staircase and bedroom light control.",
    specifications: [
      {
            "label": "Product Code",
            "value": "9256"
      },
      {
            "label": "Range / Series",
            "value": "Status Range"
      },
      {
            "label": "Switch Type",
            "value": "2-Way Dual Control"
      },
      {
            "label": "Current Rating",
            "value": "6AX"
      },
      {
            "label": "Voltage Rating",
            "value": "240V ~ 50Hz"
      },
      {
            "label": "Module Size",
            "value": "1 Module"
      },
      {
            "label": "Certification",
            "value": "ISI Marked (IS:3854)"
      },
      {
            "label": "Box Packaging",
            "value": "20 Pcs (Box) / 200 Pcs (Mini) / 1200 Pcs (Bulk)"
      }
],
    images: ["/images/products/pmcona-status-switch.png"],
    isFeatured: false,
    isNew: false,
    inStock: true,
    tags: ["switch", "6AX", "2-way", "status", "modular", "pmcona"],
  },
  {
    id: "prod-pmcona-9261",
    name: "PM CONA Status 6A Bell Push Switch",
    slug: "pm-cona-status-6a-bell-push-switch-9261",
    brand: "PMCona",
    brandSlug: "pmcona",
    category: "Switches",
    categorySlug: "switches",
    description: "PM CONA Status 6A Bell Push Switch (Code 9261) features a responsive tactile spring-return action designed for millions of presses. Clean laser-etched bell symbol with UV-resistant glossy finish.",
    shortDescription: "Spring-return bell push switch with engraved bell icon for main door calling systems.",
    specifications: [
      {
            "label": "Product Code",
            "value": "9261"
      },
      {
            "label": "Range / Series",
            "value": "Status Range"
      },
      {
            "label": "Switch Type",
            "value": "Bell Push (Momentary Contact)"
      },
      {
            "label": "Current Rating",
            "value": "6A"
      },
      {
            "label": "Voltage Rating",
            "value": "240V ~ 50Hz"
      },
      {
            "label": "Module Size",
            "value": "1 Module"
      },
      {
            "label": "Certification",
            "value": "ISI Marked"
      },
      {
            "label": "Box Packaging",
            "value": "20 Pcs (Box) / 200 Pcs (Mini) / 1200 Pcs (Bulk)"
      }
],
    images: ["/images/products/pmcona-status-switch.png"],
    isFeatured: false,
    isNew: false,
    inStock: true,
    tags: ["switch", "bell-push", "6A", "status", "modular", "pmcona"],
  },
  {
    id: "prod-pmcona-9386",
    name: "PM CONA Status 16AX 1-Way Heavy Modular Switch",
    slug: "pm-cona-status-16ax-1-way-heavy-modular-switch-9386",
    brand: "PMCona",
    brandSlug: "pmcona",
    category: "Switches",
    categorySlug: "switches",
    description: "Built for heavy residential and commercial loads, the PM CONA Status 16AX 1-Way Switch (Code 9386) handles high inrush currents effortlessly. Equipped with robust terminal screws and captive washers to ensure firm wire gripping without conductor damage.",
    shortDescription: "Heavy-duty 16AX 1-way switch designed for high-load appliances like geysers and ACs.",
    specifications: [
      {
            "label": "Product Code",
            "value": "9386"
      },
      {
            "label": "Range / Series",
            "value": "Status Range"
      },
      {
            "label": "Switch Type",
            "value": "1-Way High Load Switch"
      },
      {
            "label": "Current Rating",
            "value": "16AX"
      },
      {
            "label": "Voltage Rating",
            "value": "240V ~ 50Hz"
      },
      {
            "label": "Module Size",
            "value": "1 Module"
      },
      {
            "label": "Certification",
            "value": "ISI Marked (IS:3854)"
      },
      {
            "label": "Box Packaging",
            "value": "20 Pcs (Box) / 200 Pcs (Mini) / 1200 Pcs (Bulk)"
      }
],
    images: ["/images/products/pmcona-status-16a-switch.png"],
    isFeatured: true,
    isNew: false,
    inStock: true,
    tags: ["switch", "16AX", "power", "status", "modular", "pmcona", "isi"],
  },
  {
    id: "prod-pmcona-9396",
    name: "PM CONA Status 16AX 1-Way Switch with Indicator",
    slug: "pm-cona-status-16ax-1-way-switch-with-indicator-9396",
    brand: "PMCona",
    brandSlug: "pmcona",
    category: "Switches",
    categorySlug: "switches",
    description: "The PM CONA Status 16AX 1-Way Switch with Indicator (Code 9396) provides clear visual ON/OFF indication, making it ideal for water heaters, air conditioners, motor starters, and kitchen appliances.",
    shortDescription: "16AX power switch featuring an integrated neon indicator for status monitoring.",
    specifications: [
      {
            "label": "Product Code",
            "value": "9396"
      },
      {
            "label": "Range / Series",
            "value": "Status Range"
      },
      {
            "label": "Switch Type",
            "value": "1-Way with Indicator"
      },
      {
            "label": "Current Rating",
            "value": "16AX"
      },
      {
            "label": "Indicator",
            "value": "Built-in Long Life Neon Lamp"
      },
      {
            "label": "Module Size",
            "value": "1 Module"
      },
      {
            "label": "Certification",
            "value": "ISI Marked"
      },
      {
            "label": "Box Packaging",
            "value": "20 Pcs (Box) / 200 Pcs (Mini) / 1200 Pcs (Bulk)"
      }
],
    images: ["/images/products/pmcona-status-16a-switch.png"],
    isFeatured: false,
    isNew: false,
    inStock: true,
    tags: ["switch", "16AX", "indicator", "status", "modular", "pmcona"],
  },
  {
    id: "prod-pmcona-9796",
    name: "PM CONA Status 25A 1-Way Heavy Switch with Porcelain Base",
    slug: "pm-cona-status-25a-1-way-switch-porcelain-base-9796",
    brand: "PMCona",
    brandSlug: "pmcona",
    category: "Switches",
    categorySlug: "switches",
    description: "Engineered for maximum thermal resilience, the PM CONA Status 25A Switch (Code 9796) incorporates a high-grade vitrified porcelain base that prevents overheating even under sustained 25A peak loads. Perfect for heavy industrial machinery, 2-ton air conditioners, and commercial kitchens.",
    shortDescription: "Ultra heavy-duty 25A 1-way modular switch with heat-proof porcelain base for heavy power loads.",
    specifications: [
      {
            "label": "Product Code",
            "value": "9796"
      },
      {
            "label": "Range / Series",
            "value": "Status Range"
      },
      {
            "label": "Switch Type",
            "value": "1-Way Heavy Duty"
      },
      {
            "label": "Current Rating",
            "value": "25A"
      },
      {
            "label": "Base Material",
            "value": "High Glaze Vitrified Porcelain Base"
      },
      {
            "label": "Module Size",
            "value": "1 Module"
      },
      {
            "label": "Certification",
            "value": "ISI Marked"
      },
      {
            "label": "Box Packaging",
            "value": "20 Pcs (Box) / 200 Pcs (Mini) / 1200 Pcs (Bulk)"
      }
],
    images: ["/images/products/pmcona-status-16a-switch.png"],
    isFeatured: true,
    isNew: false,
    inStock: true,
    tags: ["switch", "25A", "porcelain-base", "heavy-duty", "status", "pmcona"],
  },
  {
    id: "prod-pmcona-9601",
    name: "PM CONA Flat 6AX 1-Way Modular Switch",
    slug: "pm-cona-flat-6ax-1-way-modular-switch-9601",
    brand: "PMCona",
    brandSlug: "pmcona",
    category: "Switches",
    categorySlug: "switches",
    description: "The Flat Switch Range by PM CONA (Code 9601) delivers an ultra-modern flush architectural aesthetic. Minimalist flat toggle with micro-gap mechanism ensures whisper-soft operation and aesthetic symmetry.",
    shortDescription: "Ultra-sleek flat profile 6AX modular switch with whisper-quiet tactile click.",
    specifications: [
      {
            "label": "Product Code",
            "value": "9601"
      },
      {
            "label": "Range / Series",
            "value": "Flat Range (Status Series)"
      },
      {
            "label": "Switch Type",
            "value": "1-Way Flat Switch"
      },
      {
            "label": "Current Rating",
            "value": "6AX"
      },
      {
            "label": "Module Size",
            "value": "1 Module"
      },
      {
            "label": "Certification",
            "value": "ISI Marked (IS:3854)"
      },
      {
            "label": "Box Packaging",
            "value": "20 Pcs (Box) / 600 Pcs (Mini) / 1200 Pcs (Bulk)"
      }
],
    images: ["/images/products/pmcona-flat-switch.png"],
    isFeatured: true,
    isNew: false,
    inStock: true,
    tags: ["switch", "flat", "6AX", "modular", "pmcona", "isi"],
  },
  {
    id: "prod-pmcona-9751",
    name: "PM CONA Step 6AX 1-Way Modular Switch",
    slug: "pm-cona-step-6ax-1-way-modular-switch-9751",
    brand: "PMCona",
    brandSlug: "pmcona",
    category: "Switches",
    categorySlug: "switches",
    description: "PM CONA Step Switch Range (Code 9751) introduces an ergonomic geometric step contour that blends architectural flair with effortless finger accessibility. Made with flame-retardant engineering grade polycarbonate.",
    shortDescription: "Distinctive stepped-edge 6AX modular switch offering enhanced finger grip and modern contours.",
    specifications: [
      {
            "label": "Product Code",
            "value": "9751"
      },
      {
            "label": "Range / Series",
            "value": "Step Range (Status Series)"
      },
      {
            "label": "Switch Type",
            "value": "1-Way Step Switch"
      },
      {
            "label": "Current Rating",
            "value": "6AX"
      },
      {
            "label": "Module Size",
            "value": "1 Module"
      },
      {
            "label": "Certification",
            "value": "ISI Marked"
      },
      {
            "label": "Box Packaging",
            "value": "20 Pcs (Box) / 600 Pcs (Mini) / 1200 Pcs (Bulk)"
      }
],
    images: ["/images/products/pmcona-step-switch.png"],
    isFeatured: false,
    isNew: false,
    inStock: true,
    tags: ["switch", "step", "6AX", "modular", "pmcona", "isi"],
  },
  {
    id: "prod-pmcona-9891",
    name: "PM CONA Chrome 6AX 1-Way Modular Switch",
    slug: "pm-cona-chrome-6ax-1-way-modular-switch-9891",
    brand: "PMCona",
    brandSlug: "pmcona",
    category: "Switches",
    categorySlug: "switches",
    description: "PM CONA Chrome Switch Range (Code 9891) features mirror-finish chrome trim accents for luxurious interior aesthetics. High-temperature resistant plating ensures the chrome finish remains lustrous for decades without peeling or tarnishing.",
    shortDescription: "Luxury chrome-accented 6AX switch adding an opulent metallic touch to interior wall plates.",
    specifications: [
      {
            "label": "Product Code",
            "value": "9891"
      },
      {
            "label": "Range / Series",
            "value": "Chrome Range (Status Series)"
      },
      {
            "label": "Switch Type",
            "value": "1-Way Chrome Switch"
      },
      {
            "label": "Current Rating",
            "value": "6AX"
      },
      {
            "label": "Trim Finish",
            "value": "Electroplated Mirror Chrome"
      },
      {
            "label": "Module Size",
            "value": "1 Module"
      },
      {
            "label": "Certification",
            "value": "ISI Marked"
      },
      {
            "label": "Box Packaging",
            "value": "20 Pcs (Box) / 600 Pcs (Mini) / 1200 Pcs (Bulk)"
      }
],
    images: ["/images/products/pmcona-chrome-switch.png"],
    isFeatured: true,
    isNew: false,
    inStock: true,
    tags: ["switch", "chrome", "6AX", "luxury", "modular", "pmcona"],
  },
  {
    id: "prod-pmcona-9406",
    name: "PM CONA Status Dual 16AX 1-Way Switch with Indicator",
    slug: "pm-cona-status-dual-16ax-1-way-switch-with-indicator-9406",
    brand: "PMCona",
    brandSlug: "pmcona",
    category: "Switches",
    categorySlug: "switches",
    description: "The PM CONA Status Dual Switch (Code 9406) occupies 2 full modules, offering a grand toggle interface and enhanced thermal dissipation for heavy 16A loads. Includes glowing locator indicator for easy night operation.",
    shortDescription: "Double-width 2-module 16AX switch with glowing indicator for prominent power appliances.",
    specifications: [
      {
            "label": "Product Code",
            "value": "9406"
      },
      {
            "label": "Range / Series",
            "value": "Status Dual Range"
      },
      {
            "label": "Switch Type",
            "value": "Dual 1-Way Switch with Indicator"
      },
      {
            "label": "Current Rating",
            "value": "16AX"
      },
      {
            "label": "Module Size",
            "value": "2 Module"
      },
      {
            "label": "Certification",
            "value": "ISI Marked"
      },
      {
            "label": "Box Packaging",
            "value": "10 Pcs (Box) / 100 Pcs (Mini) / 600 Pcs (Bulk)"
      }
],
    images: ["/images/products/pmcona-dual-switch.png"],
    isFeatured: true,
    isNew: false,
    inStock: true,
    tags: ["switch", "dual-switch", "16AX", "2-module", "status", "pmcona"],
  },
  {
    id: "prod-pmcona-9426",
    name: "PM CONA Status Dual 32A D.P. Switch with Indicator",
    slug: "pm-cona-status-dual-32a-dp-switch-with-indicator-9426",
    brand: "PMCona",
    brandSlug: "pmcona",
    category: "Switches",
    categorySlug: "switches",
    description: "The PM CONA Status Dual 32A Double Pole (D.P.) Switch (Code 9426) isolates both Phase and Neutral simultaneously, providing complete safety for air conditioners, water heaters, and main distribution circuits.",
    shortDescription: "2-module 32A Double Pole isolator switch with indicator for complete mains & AC disconnection.",
    specifications: [
      {
            "label": "Product Code",
            "value": "9426"
      },
      {
            "label": "Range / Series",
            "value": "Status Dual Range"
      },
      {
            "label": "Switch Type",
            "value": "Double Pole (D.P.) Isolator Switch"
      },
      {
            "label": "Current Rating",
            "value": "32A"
      },
      {
            "label": "Indicator",
            "value": "Integrated Indicator Window"
      },
      {
            "label": "Module Size",
            "value": "2 Module"
      },
      {
            "label": "Certification",
            "value": "ISI Marked (IS:3854)"
      },
      {
            "label": "Box Packaging",
            "value": "10 Pcs (Box) / 50 Pcs (Mini) / 300 Pcs (Bulk)"
      }
],
    images: ["/images/products/pmcona-dual-switch.png"],
    isFeatured: true,
    isNew: false,
    inStock: true,
    tags: ["switch", "32A", "DP-switch", "isolator", "dual-switch", "pmcona"],
  },
  {
    id: "prod-pmcona-9316",
    name: "PM CONA Status 6A 3-Pin Modular Socket",
    slug: "pm-cona-status-6a-3-pin-modular-socket-9316",
    brand: "PMCona",
    brandSlug: "pmcona",
    category: "Sockets",
    categorySlug: "sockets",
    description: "The PM CONA Status 6A 3-Pin Socket (Code 9316) is designed for smooth insertion and positive retention of all standard Indian 2-pin and 3-pin 6A plugs. Phosphor bronze spring leaves ensure zero loose contact sparks.",
    shortDescription: "High-conductivity 6A 3-pin modular socket with virgin phosphor bronze contact leaves.",
    specifications: [
      {
            "label": "Product Code",
            "value": "9316"
      },
      {
            "label": "Range / Series",
            "value": "Status Range"
      },
      {
            "label": "Socket Type",
            "value": "3 Pin 6A Socket"
      },
      {
            "label": "Current Rating",
            "value": "6A, 240V"
      },
      {
            "label": "Module Size",
            "value": "2 Module"
      },
      {
            "label": "Terminal Screws",
            "value": "Heavy Brass Screws with Washers"
      },
      {
            "label": "Certification",
            "value": "ISI Marked (IS:1293)"
      },
      {
            "label": "Box Packaging",
            "value": "10 Pcs (Box) / 300 Pcs (Mini) / 600 Pcs (Bulk)"
      }
],
    images: ["/images/products/pmcona-socket-6a.png"],
    isFeatured: false,
    isNew: false,
    inStock: true,
    tags: ["socket", "6A", "3-pin", "status", "modular", "pmcona", "isi"],
  },
  {
    id: "prod-pmcona-9716",
    name: "PM CONA Status 6A 3-Pin Socket with Safety Shutter",
    slug: "pm-cona-status-6a-3-pin-socket-safety-shutter-9716",
    brand: "PMCona",
    brandSlug: "pmcona",
    category: "Sockets",
    categorySlug: "sockets",
    description: "Equipped with automatic mechanical safety shutters, the PM CONA Status 6A Socket (Code 9716) shields toddlers and users from accidental electrical shock by only opening when Earth and Live/Neutral pins engage together.",
    shortDescription: "Child-safe 6A 3-pin socket featuring automatic spring safety shutters on live terminals.",
    specifications: [
      {
            "label": "Product Code",
            "value": "9716"
      },
      {
            "label": "Range / Series",
            "value": "Status Range"
      },
      {
            "label": "Socket Type",
            "value": "3 Pin with Safety Shutter"
      },
      {
            "label": "Current Rating",
            "value": "6A, 240V"
      },
      {
            "label": "Safety Mechanism",
            "value": "Integrated Child-Safe Shutter"
      },
      {
            "label": "Module Size",
            "value": "2 Module"
      },
      {
            "label": "Certification",
            "value": "ISI Marked"
      },
      {
            "label": "Box Packaging",
            "value": "10 Pcs (Box) / 300 Pcs (Mini) / 600 Pcs (Bulk)"
      }
],
    images: ["/images/products/pmcona-socket-6a.png"],
    isFeatured: false,
    isNew: false,
    inStock: true,
    tags: ["socket", "6A", "safety-shutter", "child-safe", "status", "pmcona"],
  },
  {
    id: "prod-pmcona-9416",
    name: "PM CONA Status 6/16A Universal Socket with Shutter (Thermal Base)",
    slug: "pm-cona-status-6-16a-universal-socket-with-shutter-9416",
    brand: "PMCona",
    brandSlug: "pmcona",
    category: "Sockets",
    categorySlug: "sockets",
    description: "The PM CONA Status Universal Combined 6/16A Socket (Code 9416) accepts both 6A domestic and 16A heavy power plugs. Constructed with a specialised high thermal insulation base that prevents housing deformation during continuous high-amp appliance use.",
    shortDescription: "Heavy-duty combined 6A/16A universal socket with safety shutters and high thermal insulation base.",
    specifications: [
      {
            "label": "Product Code",
            "value": "9416"
      },
      {
            "label": "Range / Series",
            "value": "Status Range"
      },
      {
            "label": "Socket Type",
            "value": "Universal Combined Socket (6A & 16A)"
      },
      {
            "label": "Current Rating",
            "value": "6A / 16A Dual Rated, 240V"
      },
      {
            "label": "Base Construction",
            "value": "High Thermal Insulation Base"
      },
      {
            "label": "Safety Features",
            "value": "Spring Loaded Child-Safe Shutters"
      },
      {
            "label": "Module Size",
            "value": "2 Module"
      },
      {
            "label": "Certification",
            "value": "ISI Marked (IS:1293)"
      },
      {
            "label": "Box Packaging",
            "value": "10 Pcs (Box) / 100 Pcs (Mini) / 600 Pcs (Bulk)"
      }
],
    images: ["/images/products/pmcona-universal-socket.png"],
    isFeatured: true,
    isNew: false,
    inStock: true,
    tags: ["socket", "16A", "universal-socket", "safety-shutter", "high-thermal", "pmcona"],
  },
  {
    id: "prod-pmcona-9706",
    name: "PM CONA Status 6/16A Universal Socket with Porcelain Base",
    slug: "pm-cona-status-6-16a-universal-socket-porcelain-base-9706",
    brand: "PMCona",
    brandSlug: "pmcona",
    category: "Sockets",
    categorySlug: "sockets",
    description: "Engineered for harsh commercial and industrial environments, the PM CONA Status 6/16A Socket (Code 9706) features an unbreakable high-glaze porcelain chamber that ensures zero burning, melting, or distortion even under severe prolonged overload.",
    shortDescription: "Ultra-rugged 6/16A universal socket built with vitrified porcelain base for non-flammable thermal safety.",
    specifications: [
      {
            "label": "Product Code",
            "value": "9706"
      },
      {
            "label": "Range / Series",
            "value": "Status Range"
      },
      {
            "label": "Socket Type",
            "value": "Universal 6/16A with Porcelain Base"
      },
      {
            "label": "Current Rating",
            "value": "6A / 16A, 240V"
      },
      {
            "label": "Base Material",
            "value": "Heavy Vitrified Porcelain Base"
      },
      {
            "label": "Module Size",
            "value": "2 Module"
      },
      {
            "label": "Certification",
            "value": "ISI Marked"
      },
      {
            "label": "Box Packaging",
            "value": "10 Pcs (Box) / 100 Pcs (Mini) / 600 Pcs (Bulk)"
      }
],
    images: ["/images/products/pmcona-universal-socket.png"],
    isFeatured: true,
    isNew: false,
    inStock: true,
    tags: ["socket", "16A", "porcelain-base", "industrial", "status", "pmcona"],
  },
  {
    id: "prod-pmcona-9376",
    name: "PM CONA Status Mini Step Fan Regulator",
    slug: "pm-cona-status-mini-step-fan-regulator-9376",
    brand: "PMCona",
    brandSlug: "pmcona",
    category: "Accessories",
    categorySlug: "accessories",
    description: "The PM CONA Status Mini Step Fan Regulator (Code 9376) fits neatly into a single module space. Utilises high-stability metallic film capacitors to ensure buzz-free, hum-free speed regulation with exact speed steps.",
    shortDescription: "1-module 4-step hum-free electronic capacitor fan regulator with 360-degree rotary knob.",
    specifications: [
      {
            "label": "Product Code",
            "value": "9376"
      },
      {
            "label": "Range / Series",
            "value": "Status Range"
      },
      {
            "label": "Type",
            "value": "Mini Step Fan Regulator (Hum-Free)"
      },
      {
            "label": "Steps",
            "value": "4 Speed Steps + OFF (360\u00b0 Free Rotation)"
      },
      {
            "label": "Load Capacity",
            "value": "100W Max"
      },
      {
            "label": "Module Size",
            "value": "1 Module"
      },
      {
            "label": "Box Packaging",
            "value": "20 Pcs (Box) / 100 Pcs (Mini) / 600 Pcs (Bulk)"
      }
],
    images: ["/images/products/pmcona-fan-regulator.png"],
    isFeatured: true,
    isNew: false,
    inStock: true,
    tags: ["fan-regulator", "dimmer", "hum-free", "status", "pmcona"],
  },
  {
    id: "prod-pmcona-9536",
    name: "PM CONA Combo USB Charger Socket 2.2A",
    slug: "pm-cona-combo-usb-charger-socket-2-2a-9536",
    brand: "PMCona",
    brandSlug: "pmcona",
    category: "Accessories",
    categorySlug: "accessories",
    description: "The PM CONA Combo USB Charger Socket (Code 9536) delivers high-efficiency 2.2A 5V DC power with built-in short circuit, surge, and over-temperature protection. Charge all USB devices directly from your modular switchboard without an external adapter.",
    shortDescription: "1-module fast USB charging socket for direct wall charging of smartphones and tablets.",
    specifications: [
      {
            "label": "Product Code",
            "value": "9536"
      },
      {
            "label": "Range / Series",
            "value": "Status Range"
      },
      {
            "label": "Output Current",
            "value": "5V DC, 2.2A High Speed"
      },
      {
            "label": "Input Voltage",
            "value": "100V - 240V AC ~ 50/60Hz"
      },
      {
            "label": "Protection",
            "value": "Over-Voltage, Over-Current & Short Circuit"
      },
      {
            "label": "Module Size",
            "value": "1 Module"
      },
      {
            "label": "Box Packaging",
            "value": "20 Pcs (Box) / 100 Pcs (Mini) / 600 Pcs (Bulk)"
      }
],
    images: ["/images/products/pmcona-usb-socket.png"],
    isFeatured: true,
    isNew: true,
    inStock: true,
    tags: ["usb-charger", "socket", "smart-charging", "status", "pmcona"],
  },
  {
    id: "prod-pmcona-9541",
    name: "PM CONA Modular LED Foot Lamp",
    slug: "pm-cona-modular-led-foot-lamp-9541",
    brand: "PMCona",
    brandSlug: "pmcona",
    category: "Lighting",
    categorySlug: "lighting",
    description: "The PM CONA LED Foot Lamp (Code 9541) provides gentle, glare-free downward illumination. Consumes less than 1.5W of power, making it an ideal long-life night guide for staircases, corridors, and bedrooms.",
    shortDescription: "Low-power recessed modular LED foot light for night hallway and stairway navigation.",
    specifications: [
      {
            "label": "Product Code",
            "value": "9541"
      },
      {
            "label": "Range / Series",
            "value": "Status Range"
      },
      {
            "label": "Light Source",
            "value": "High Lumen SMD LED"
      },
      {
            "label": "Power Consumption",
            "value": "1.5W Energy Efficient"
      },
      {
            "label": "Module Size",
            "value": "2 Module"
      },
      {
            "label": "Box Packaging",
            "value": "10 Pcs (Box) / 50 Pcs (Mini) / 300 Pcs (Bulk)"
      }
],
    images: ["/images/products/pmcona-led-footlamp.png"],
    isFeatured: false,
    isNew: false,
    inStock: true,
    tags: ["foot-lamp", "led", "night-light", "status", "pmcona"],
  },
  {
    id: "prod-pmcona-9451",
    name: "PM CONA Modular Motor Starter 25A",
    slug: "pm-cona-modular-motor-starter-25a-9451",
    brand: "PMCona",
    brandSlug: "pmcona",
    category: "MCB & Protection",
    categorySlug: "mcb-protection",
    description: "PM CONA Modular Motor Starter (Code 9451) is equipped with dedicated ON (Green) and OFF (Red) push buttons and a precision bimetallic thermal overload release mechanism. Shields 1HP and 2HP water pumps, air conditioners, and compressors from phase fault and over-current burnout.",
    shortDescription: "25A heavy-duty single phase modular motor starter with overload trip protection and manual push buttons.",
    specifications: [
      {
            "label": "Product Code",
            "value": "9451"
      },
      {
            "label": "Range / Series",
            "value": "Status Range"
      },
      {
            "label": "Starter Type",
            "value": "Single Phase Motor Starter"
      },
      {
            "label": "Current Rating",
            "value": "25A (Suitable up to 2.0 HP)"
      },
      {
            "label": "Protection",
            "value": "Thermal Overload & Short Circuit Release"
      },
      {
            "label": "Module Size",
            "value": "2 Module"
      },
      {
            "label": "Box Packaging",
            "value": "10 Pcs (Box) / 50 Pcs (Mini) / 300 Pcs (Bulk)"
      }
],
    images: ["/images/products/pmcona-motor-starter.png"],
    isFeatured: true,
    isNew: false,
    inStock: true,
    tags: ["motor-starter", "25A", "water-pump", "protection", "status", "pmcona"],
  },
  {
    id: "prod-pmcona-9526",
    name: "PM CONA Modular Movement Infrared Sensor Switch",
    slug: "pm-cona-modular-movement-infrared-sensor-switch-9526",
    brand: "PMCona",
    brandSlug: "pmcona",
    category: "Accessories",
    categorySlug: "accessories",
    description: "The PM CONA Movement Sensor (Code 9526) features high-precision PIR detection optics. Automatically switches connected lights ON when motion is detected and switches OFF after an adjustable timeout, delivering massive energy savings in bathrooms, corridors, and storage areas.",
    shortDescription: "Passive infrared PIR motion sensor switch that turns lights ON automatically upon human presence.",
    specifications: [
      {
            "label": "Product Code",
            "value": "9526"
      },
      {
            "label": "Range / Series",
            "value": "Status Range"
      },
      {
            "label": "Sensor Technology",
            "value": "Passive Infrared (PIR)"
      },
      {
            "label": "Detection Range",
            "value": "Up to 5 Meters, 120\u00b0 Angle"
      },
      {
            "label": "Module Size",
            "value": "2 Module"
      },
      {
            "label": "Box Packaging",
            "value": "10 Pcs (Box) / 50 Pcs (Mini) / 300 Pcs (Bulk)"
      }
],
    images: ["/images/products/pmcona-movement-sensor.png"],
    isFeatured: true,
    isNew: true,
    inStock: true,
    tags: ["motion-sensor", "pir", "smart-automation", "energy-saver", "pmcona"],
  },
  {
    id: "prod-pmcona-9456",
    name: "PM CONA Hotel Key Tag with 32A D.P. Switch",
    slug: "pm-cona-hotel-key-tag-with-32a-dp-switch-9456",
    brand: "PMCona",
    brandSlug: "pmcona",
    category: "Accessories",
    categorySlug: "accessories",
    description: "Designed for hotels, guest houses, and smart hospitality projects, the PM CONA Hotel Key Tag Switch (Code 9456) activates room power only when the room key is inserted into the slot. Cuts off all lighting and auxiliary loads automatically upon card removal.",
    shortDescription: "Hospitality energy-saving key tag master switch with heavy 32A double pole contact and indicator.",
    specifications: [
      {
            "label": "Product Code",
            "value": "9456"
      },
      {
            "label": "Range / Series",
            "value": "Status Range"
      },
      {
            "label": "Switch Rating",
            "value": "32A Double Pole (D.P.) with Neon Indicator"
      },
      {
            "label": "Module Size",
            "value": "2 Module"
      },
      {
            "label": "Included Items",
            "value": "Master Switch Mechanism + Engraved Key Tag"
      },
      {
            "label": "Certification",
            "value": "ISI Marked"
      },
      {
            "label": "Box Packaging",
            "value": "05 Pcs (Box) / 25 Pcs (Mini) / 150 Pcs (Bulk)"
      }
],
    images: ["/images/products/pmcona-hotel-keytag.png"],
    isFeatured: false,
    isNew: true,
    inStock: true,
    tags: ["hotel-keycard", "energy-saver", "hospitality", "32A", "status", "pmcona"],
  },
  {
    id: "prod-pmcona-9786",
    name: "PM CONA Modular Power Box Complete Unit",
    slug: "pm-cona-modular-power-box-complete-unit-9786",
    brand: "PMCona",
    brandSlug: "pmcona",
    category: "MCB & Protection",
    categorySlug: "mcb-protection",
    description: "The PM CONA Modular Power Box (Code 9786) is a pre-configured heavy appliance power station. Comes complete with a 16A Glow Plug Top with indicator, a 16A shuttered socket, a 25A Single Pole MCB, a 4-module plate, and a high-impact surface box.",
    shortDescription: "All-in-one power unit: Glow 16A plug top, 16A socket, 25A SP MCB, 4M plate & surface box.",
    specifications: [
      {
            "label": "Product Code",
            "value": "9786"
      },
      {
            "label": "Range / Series",
            "value": "Status Range"
      },
      {
            "label": "Kit Contents",
            "value": "Glow 16A Plug Top, 16A Socket, 25A SP MCB, 4M Plate, 4M Box, 1 Blank"
      },
      {
            "label": "Power Rating",
            "value": "25A / 240V"
      },
      {
            "label": "Application",
            "value": "Air Conditioners, Geysers, Heavy Power Outlets"
      },
      {
            "label": "Box Packaging",
            "value": "05 Pcs (Box) / 30 Pcs (Mini) / 60 Pcs (Bulk)"
      }
],
    images: ["/images/products/pmcona-modular-power-box.png"],
    isFeatured: true,
    isNew: false,
    inStock: true,
    tags: ["power-box", "mcb", "ac-power", "16A", "modular", "pmcona"],
  },
  {
    id: "prod-pmcona-10106",
    name: "PM CONA Single Pole (SP) Modular MCB 6A to 32A (3kA)",
    slug: "pm-cona-single-pole-sp-modular-mcb-3ka-10106",
    brand: "PMCona",
    brandSlug: "pmcona",
    category: "MCB & Protection",
    categorySlug: "mcb-protection",
    description: "PM CONA Modular Single Pole (SP) MCBs (Codes 10106 - 10132) fit directly into standard 1-module switch plates. Features precision bimetallic thermal overload trip and magnetic short-circuit arc chute protection rated for 3kA breaking capacity.",
    shortDescription: "ISI marked 1-module Single Pole miniature circuit breaker with 3kA breaking capacity.",
    specifications: [
      {
            "label": "Product Code",
            "value": "10106 (6A) / 10110 (10A) / 10116 (16A) / 10120 (20A) / 10125 (25A) / 10132 (32A)"
      },
      {
            "label": "Range / Series",
            "value": "Status Range"
      },
      {
            "label": "Configuration",
            "value": "Single Pole (SP), C-Curve"
      },
      {
            "label": "Breaking Capacity",
            "value": "3kA (3000A)"
      },
      {
            "label": "Voltage Rating",
            "value": "240V AC, 50Hz"
      },
      {
            "label": "Module Size",
            "value": "1 Module"
      },
      {
            "label": "Certification",
            "value": "ISI Marked (IS/IEC 60898-1)"
      },
      {
            "label": "Box Packaging",
            "value": "20 Pcs (Box) / 100 Pcs (Mini) / 600 Pcs (Bulk)"
      }
],
    images: ["/images/products/pmcona-mcb-sp.png"],
    isFeatured: true,
    isNew: false,
    inStock: true,
    tags: ["mcb", "single-pole", "circuit-breaker", "3kA", "protection", "pmcona", "isi"],
  },
  {
    id: "prod-pmcona-10232",
    name: "PM CONA Double Pole (DP) Modular MCB 32A (3kA)",
    slug: "pm-cona-double-pole-dp-modular-mcb-32a-3ka-10232",
    brand: "PMCona",
    brandSlug: "pmcona",
    category: "MCB & Protection",
    categorySlug: "mcb-protection",
    description: "The PM CONA 32A Double Pole (DP) MCB (Code 10232) simultaneously protects and breaks both Phase and Neutral lines during overload or short-circuit events, preventing hazardous potential back-feeds in air conditioning and geyser loops.",
    shortDescription: "2-module Double Pole 32A MCB for dual-line Phase & Neutral short-circuit protection.",
    specifications: [
      {
            "label": "Product Code",
            "value": "10232"
      },
      {
            "label": "Range / Series",
            "value": "Status Range"
      },
      {
            "label": "Configuration",
            "value": "Double Pole (DP)"
      },
      {
            "label": "Current Rating",
            "value": "32A"
      },
      {
            "label": "Breaking Capacity",
            "value": "3kA"
      },
      {
            "label": "Module Size",
            "value": "2 Module"
      },
      {
            "label": "Certification",
            "value": "ISI Marked (IS/IEC 60898-1)"
      },
      {
            "label": "Box Packaging",
            "value": "10 Pcs (Box) / 50 Pcs (Mini) / 300 Pcs (Bulk)"
      }
],
    images: ["/images/products/pmcona-mcb-dp.png"],
    isFeatured: true,
    isNew: false,
    inStock: true,
    tags: ["mcb", "double-pole", "32A", "circuit-breaker", "protection", "pmcona"],
  },
  {
    id: "prod-pmcona-9771",
    name: "PM CONA Fresh Modular Angle & Batten Lamp Holder",
    slug: "pm-cona-fresh-modular-angle-batten-lamp-holder-9771",
    brand: "PMCona",
    brandSlug: "pmcona",
    category: "Accessories",
    categorySlug: "accessories",
    description: "PM CONA Fresh Modular Lamp Holders (Codes 9771 Angle / 9776 Batten / 9781 Ceiling Rose) feature spring-loaded solid brass plungers and heat-resistant ceramic cores to support continuous LED and incandescent lighting without contact looseness.",
    shortDescription: "Heavy brass plunger B22 lamp holder with flame-retardant glossy modular skirt.",
    specifications: [
      {
            "label": "Product Code",
            "value": "9771 (Angle) / 9776 (Batten) / 9781 (Ceiling Rose)"
      },
      {
            "label": "Range / Series",
            "value": "Status Fresh Series"
      },
      {
            "label": "Cap Type",
            "value": "B22 Standard Bayonet Cap"
      },
      {
            "label": "Plunger Material",
            "value": "Heavy Solid Brass Plungers with Stainless Springs"
      },
      {
            "label": "Box Packaging",
            "value": "10 Pcs (Box) / 180 Pcs (Mini) / 360 Pcs (Bulk)"
      }
],
    images: ["/images/products/pmcona-fresh-holder.png"],
    isFeatured: false,
    isNew: false,
    inStock: true,
    tags: ["lamp-holder", "b22", "angle-holder", "batten-holder", "status", "pmcona"],
  },
  {
    id: "prod-pmcona-14001",
    name: "PM CONA Platinum 10A 1-Way Luxury Modular Switch",
    slug: "pm-cona-platinum-10a-1-way-luxury-modular-switch-14001",
    brand: "PMCona",
    brandSlug: "pmcona",
    category: "Switches",
    categorySlug: "switches",
    description: "The PM CONA Platinum Range (Code 14001) is engineered for premium residential and commercial spaces. Rated at 10A for modern lighting loads with silver alloy contact bridge and silky smooth toggle kinematics.",
    shortDescription: "Premium 10A 1-way switch from the architectural Platinum range with feather-touch toggle.",
    specifications: [
      {
            "label": "Product Code",
            "value": "14001"
      },
      {
            "label": "Range / Series",
            "value": "Platinum Range"
      },
      {
            "label": "Switch Type",
            "value": "1-Way Single Pole"
      },
      {
            "label": "Current Rating",
            "value": "10A, 240V"
      },
      {
            "label": "Module Size",
            "value": "1 Module"
      },
      {
            "label": "Certification",
            "value": "ISI Marked (IS:3854)"
      },
      {
            "label": "Box Packaging",
            "value": "20 Pcs (Box) / 600 Pcs (Mini) / 1200 Pcs (Bulk)"
      }
],
    images: ["/images/products/pmcona-platinum-switch.png"],
    isFeatured: true,
    isNew: false,
    inStock: true,
    tags: ["switch", "10A", "platinum", "luxury", "modular", "pmcona", "isi"],
  },
  {
    id: "prod-pmcona-14016",
    name: "PM CONA Platinum 20A 1-Way Switch with Blue LED Indicator",
    slug: "pm-cona-platinum-20a-1-way-switch-blue-led-14016",
    brand: "PMCona",
    brandSlug: "pmcona",
    category: "Switches",
    categorySlug: "switches",
    description: "The PM CONA Platinum 20A Switch with Blue LED (Code 14016) combines high current switching capability with an elegant micro-lens blue LED illumination that creates a serene ambience in modern interiors.",
    shortDescription: "20A heavy-duty switch with subtle blue LED night locator for geysers and high-wattage loads.",
    specifications: [
      {
            "label": "Product Code",
            "value": "14016"
      },
      {
            "label": "Range / Series",
            "value": "Platinum Range"
      },
      {
            "label": "Switch Type",
            "value": "1-Way Power Switch with LED"
      },
      {
            "label": "Current Rating",
            "value": "20A, 240V"
      },
      {
            "label": "Indicator",
            "value": "Integrated Blue LED Indicator"
      },
      {
            "label": "Module Size",
            "value": "1 Module"
      },
      {
            "label": "Certification",
            "value": "ISI Marked"
      },
      {
            "label": "Box Packaging",
            "value": "20 Pcs (Box) / 200 Pcs (Mini) / 1200 Pcs (Bulk)"
      }
],
    images: ["/images/products/pmcona-platinum-switch.png"],
    isFeatured: true,
    isNew: false,
    inStock: true,
    tags: ["switch", "20A", "platinum", "blue-led", "luxury", "pmcona"],
  },
  {
    id: "prod-pmcona-14041",
    name: "PM CONA Platinum Dual 20A 1-Way Switch with Blue LED",
    slug: "pm-cona-platinum-dual-20a-1-way-switch-blue-led-14041",
    brand: "PMCona",
    brandSlug: "pmcona",
    category: "Switches",
    categorySlug: "switches",
    description: "PM CONA Platinum Dual 20A Switch (Code 14041) delivers broad-format tactile control across two full modules. Equipped with high-conductivity copper alloy terminal blocks and dual blue LED status lighting.",
    shortDescription: "2-module double width 20A luxury switch featuring luminous blue LED locator light.",
    specifications: [
      {
            "label": "Product Code",
            "value": "14041"
      },
      {
            "label": "Range / Series",
            "value": "Platinum Dual Series"
      },
      {
            "label": "Switch Type",
            "value": "Dual 1-Way Power Switch"
      },
      {
            "label": "Current Rating",
            "value": "20A"
      },
      {
            "label": "Indicator",
            "value": "Blue LED Indicator"
      },
      {
            "label": "Module Size",
            "value": "2 Module"
      },
      {
            "label": "Certification",
            "value": "ISI Marked"
      },
      {
            "label": "Box Packaging",
            "value": "10 Pcs (Box) / 100 Pcs (Mini) / 600 Pcs (Bulk)"
      }
],
    images: ["/images/products/pmcona-platinum-dual-switch.png"],
    isFeatured: false,
    isNew: false,
    inStock: true,
    tags: ["switch", "platinum", "dual-switch", "20A", "blue-led", "pmcona"],
  },
  {
    id: "prod-pmcona-14066",
    name: "PM CONA Platinum 6/16A Universal Socket with Shutter (Tested 25A)",
    slug: "pm-cona-platinum-6-16a-universal-socket-shutter-14066",
    brand: "PMCona",
    brandSlug: "pmcona",
    category: "Sockets",
    categorySlug: "sockets",
    description: "The PM CONA Platinum Universal Socket (Code 14066) is engineered beyond industry benchmarks, tested to withstand continuous current peaks up to 25A. Features spring-action child safety shutters and pure phosphor bronze contact grips.",
    shortDescription: "Ultra-capacity universal 6/16A socket with safety shutters, tested up to 25A high peak loads.",
    specifications: [
      {
            "label": "Product Code",
            "value": "14066"
      },
      {
            "label": "Range / Series",
            "value": "Platinum Range"
      },
      {
            "label": "Current Rating",
            "value": "6A / 16A (Tested Upto 25A Peak)"
      },
      {
            "label": "Safety Features",
            "value": "Integrated Child-Safe Shutter"
      },
      {
            "label": "Module Size",
            "value": "2 Module"
      },
      {
            "label": "Certification",
            "value": "ISI Marked (IS:1293)"
      },
      {
            "label": "Box Packaging",
            "value": "10 Pcs (Box) / 300 Pcs (Mini) / 600 Pcs (Bulk)"
      }
],
    images: ["/images/products/pmcona-platinum-socket.png"],
    isFeatured: true,
    isNew: false,
    inStock: true,
    tags: ["socket", "16A", "platinum", "universal", "tested-25A", "pmcona", "isi"],
  },
  {
    id: "prod-pmcona-18001",
    name: "PM CONA Estella 10AX 1-Way Smooth Modular Switch",
    slug: "pm-cona-estella-10ax-1-way-smooth-modular-switch-18001",
    brand: "PMCona",
    brandSlug: "pmcona",
    category: "Switches",
    categorySlug: "switches",
    description: "PM CONA Estella Range (Code 18001) features organic curved geometry in silky smooth white polycarbonate. High-capacity 10AX rating handles capacitive LED driver inrush currents with ease.",
    shortDescription: "Smooth white finish 10AX 1-way modular switch with soft curved contours.",
    specifications: [
      {
            "label": "Product Code",
            "value": "18001"
      },
      {
            "label": "Range / Series",
            "value": "Estella Range"
      },
      {
            "label": "Switch Type",
            "value": "1-Way Single Pole"
      },
      {
            "label": "Current Rating",
            "value": "10AX, 240V"
      },
      {
            "label": "Finish",
            "value": "Smooth Silk White"
      },
      {
            "label": "Module Size",
            "value": "1 Module"
      },
      {
            "label": "Certification",
            "value": "ISI Marked (IS:3854)"
      },
      {
            "label": "Box Packaging",
            "value": "20 Pcs (Box) / 600 Pcs (Mini) / 1200 Pcs (Bulk)"
      }
],
    images: ["/images/products/pmcona-estella-switch.png"],
    isFeatured: true,
    isNew: false,
    inStock: true,
    tags: ["switch", "10AX", "estella", "smooth-white", "modular", "pmcona", "isi"],
  },
  {
    id: "prod-pmcona-18066",
    name: "PM CONA Estella 6/16A Universal Socket with Safety Shutter",
    slug: "pm-cona-estella-6-16a-universal-socket-with-safety-shutter-18066",
    brand: "PMCona",
    brandSlug: "pmcona",
    category: "Sockets",
    categorySlug: "sockets",
    description: "The PM CONA Estella 6/16A Universal Socket (Code 18066) combines modern curved bezel design with robust high-temperature internal terminal construction and positive plug clamping.",
    shortDescription: "Estella series 6/16A combined socket with child-proof safety shutter and brass contacts.",
    specifications: [
      {
            "label": "Product Code",
            "value": "18066"
      },
      {
            "label": "Range / Series",
            "value": "Estella Range"
      },
      {
            "label": "Current Rating",
            "value": "6A / 16A Dual Rated, 240V"
      },
      {
            "label": "Safety Features",
            "value": "Child-Safe Mechanical Shutter"
      },
      {
            "label": "Module Size",
            "value": "2 Module"
      },
      {
            "label": "Certification",
            "value": "ISI Marked"
      },
      {
            "label": "Box Packaging",
            "value": "10 Pcs (Box) / 100 Pcs (Mini) / 600 Pcs (Bulk)"
      }
],
    images: ["/images/products/pmcona-estella-socket.png"],
    isFeatured: false,
    isNew: false,
    inStock: true,
    tags: ["socket", "16A", "estella", "safety-shutter", "pmcona"],
  },
  {
    id: "prod-pmcona-1951",
    name: "PM CONA Glow 6A 3-Pin Plug Top with Indicator",
    slug: "pm-cona-glow-6a-3-pin-plug-top-with-indicator-1951",
    brand: "PMCona",
    brandSlug: "pmcona",
    category: "Accessories",
    categorySlug: "accessories",
    description: "The PM CONA Glow 6A Plug Top (Code 1951) features a built-in glowing neon indicator for immediate power visibility. Molded in unbreakable polycarbonate with nickel-plated solid brass contact pins and heavy cord clamp.",
    shortDescription: "ISI marked 6A 3-pin plug top with internal neon glow power indicator and solid brass pins.",
    specifications: [
      {
            "label": "Product Code",
            "value": "1951"
      },
      {
            "label": "Range / Series",
            "value": "Value Range (Glow Series)"
      },
      {
            "label": "Current Rating",
            "value": "6A, 240V"
      },
      {
            "label": "Indicator",
            "value": "Built-in Neon Indicator Lamp"
      },
      {
            "label": "Pin Material",
            "value": "Solid Nickel-Plated Brass Pins"
      },
      {
            "label": "Certification",
            "value": "ISI Marked (IS:1293)"
      },
      {
            "label": "Box Packaging",
            "value": "20 Pcs (Box) / 300 Pcs (Mini) / 600 Pcs (Bulk)"
      }
],
    images: ["/images/products/pmcona-plug-top-6a.png"],
    isFeatured: true,
    isNew: false,
    inStock: true,
    tags: ["plug-top", "6A", "glow", "indicator", "value-range", "pmcona", "isi"],
  },
  {
    id: "prod-pmcona-1961",
    name: "PM CONA Glow 16A 3-Pin Heavy Plug Top with Indicator",
    slug: "pm-cona-glow-16a-3-pin-heavy-plug-top-with-indicator-1961",
    brand: "PMCona",
    brandSlug: "pmcona",
    category: "Accessories",
    categorySlug: "accessories",
    description: "The PM CONA Glow 16A Plug Top (Code 1961) is built to safely power high-wattage household appliances. Features heavy-duty nickel-plated brass pins and internal screw cord clamp to prevent wire slip-out.",
    shortDescription: "Heavy-duty 16A plug top with neon indicator for refrigerators, washing machines, and geysers.",
    specifications: [
      {
            "label": "Product Code",
            "value": "1961"
      },
      {
            "label": "Range / Series",
            "value": "Value Range (Glow Series)"
      },
      {
            "label": "Current Rating",
            "value": "16A, 240V"
      },
      {
            "label": "Indicator",
            "value": "Built-in Neon Power Indicator"
      },
      {
            "label": "Certification",
            "value": "ISI Marked (IS:1293)"
      },
      {
            "label": "Box Packaging",
            "value": "10 Pcs (Box) / 200 Pcs (Mini) / 400 Pcs (Bulk)"
      }
],
    images: ["/images/products/pmcona-plug-top-16a.png"],
    isFeatured: true,
    isNew: false,
    inStock: true,
    tags: ["plug-top", "16A", "heavy-duty", "glow", "indicator", "pmcona", "isi"],
  },
  {
    id: "prod-pmcona-4311",
    name: "PM CONA Next 3-Pin Universal Multi Plug 6/13A with Indicator",
    slug: "pm-cona-next-3-pin-universal-multi-plug-with-indicator-4311",
    brand: "PMCona",
    brandSlug: "pmcona",
    category: "Accessories",
    categorySlug: "accessories",
    description: "The PM CONA Next Universal Multi Plug (Code 4311) provides multi-country plug compatibility. Converts any standard socket into a versatile hub with glowing indicator lamp and high-grade copper phosphor bronze internal leaves.",
    shortDescription: "Universal multi-plug adaptor compatible with international, 2-pin, and 3-pin plug types.",
    specifications: [
      {
            "label": "Product Code",
            "value": "4311"
      },
      {
            "label": "Range / Series",
            "value": "Value Range"
      },
      {
            "label": "Current Rating",
            "value": "6A / 13A Universal"
      },
      {
            "label": "Indicator",
            "value": "Neon Power Indicator"
      },
      {
            "label": "Plug Compatibility",
            "value": "Indian, US, UK, Euro 2-Pin & 3-Pin Plugs"
      },
      {
            "label": "Box Packaging",
            "value": "10 Pcs (Box) / 200 Pcs (Mini) / 400 Pcs (Bulk)"
      }
],
    images: ["/images/products/pmcona-multi-plug-universal.png"],
    isFeatured: true,
    isNew: false,
    inStock: true,
    tags: ["multi-plug", "adaptor", "universal", "indicator", "pmcona"],
  },
  {
    id: "prod-pmcona-2026",
    name: "PM CONA Mega 6/16A Multi Plug with Indicator",
    slug: "pm-cona-mega-6-16a-multi-plug-with-indicator-2026",
    brand: "PMCona",
    brandSlug: "pmcona",
    category: "Accessories",
    categorySlug: "accessories",
    description: "PM CONA Mega Multi Plug (Code 2026) is engineered for heavy power applications. Features high thermal resistance casing, glowing neon lamp, and heavy brass pins.",
    shortDescription: "Heavy-duty 16A multi-plug adapter allowing simultaneous connection of high and low load appliances.",
    specifications: [
      {
            "label": "Product Code",
            "value": "2026"
      },
      {
            "label": "Range / Series",
            "value": "Value Range"
      },
      {
            "label": "Current Rating",
            "value": "6A / 16A Dual Rated"
      },
      {
            "label": "Indicator",
            "value": "Built-in Neon Indicator"
      },
      {
            "label": "Box Packaging",
            "value": "10 Pcs (Box) / 150 Pcs (Mini) / 300 Pcs (Bulk)"
      }
],
    images: ["/images/products/pmcona-multi-plug-universal.png"],
    isFeatured: false,
    isNew: true,
    inStock: true,
    tags: ["multi-plug", "16A", "mega", "heavy-duty", "pmcona"],
  },
  {
    id: "prod-pmcona-2526",
    name: "PM CONA Dome Batten & Angle Lamp Holder",
    slug: "pm-cona-dome-batten-angle-lamp-holder-2526",
    brand: "PMCona",
    brandSlug: "pmcona",
    category: "Accessories",
    categorySlug: "accessories",
    description: "PM CONA Dome Lamp Holders (Code 2526 Angle / Code 2541 Batten / Code 3266 Ceiling Rose) are the gold standard for residential and commercial surface lighting installations. Features heavy vitrified porcelain backplate for total thermal safety.",
    shortDescription: "Classic dome-shaped B22 lamp holder with robust porcelain base and solid brass terminals.",
    specifications: [
      {
            "label": "Product Code",
            "value": "2526 (Angle) / 2541 (Batten) / 3266 (Ceiling Rose)"
      },
      {
            "label": "Range / Series",
            "value": "Value Range (Dome Series)"
      },
      {
            "label": "Base Chamber",
            "value": "Vitrified Porcelain Chamber"
      },
      {
            "label": "Terminals",
            "value": "Heavy Solid Brass Plungers"
      },
      {
            "label": "Box Packaging",
            "value": "20 Pcs (Box) / 300 Pcs (Mini) / 600 Pcs (Bulk)"
      }
],
    images: ["/images/products/pmcona-dome-holder.png"],
    isFeatured: false,
    isNew: false,
    inStock: true,
    tags: ["holder", "b22", "dome-holder", "angle-holder", "batten-holder", "pmcona"],
  },
  {
    id: "prod-pmcona-3401",
    name: "PM CONA Zoom Assorted Musical Door Bell",
    slug: "pm-cona-zoom-assorted-musical-door-bell-3401",
    brand: "PMCona",
    brandSlug: "pmcona",
    category: "Accessories",
    categorySlug: "accessories",
    description: "The PM CONA Zoom Musical Door Bell (Code 3401) fills your home with crisp, pleasant melodic greetings. Features an acoustic resonating chamber and long-life electronic sound IC.",
    shortDescription: "Assorted melodious musical door chime with crisp acoustic speaker chamber.",
    specifications: [
      {
            "label": "Product Code",
            "value": "3401"
      },
      {
            "label": "Range / Series",
            "value": "Musical Bells (Value Range)"
      },
      {
            "label": "Sound Type",
            "value": "Assorted Melodious Chimes"
      },
      {
            "label": "Operating Voltage",
            "value": "240V AC ~ 50Hz"
      },
      {
            "label": "Box Packaging",
            "value": "10 Pcs (Box) / 80 Pcs (Mini) / 160 Pcs (Bulk)"
      }
],
    images: ["/images/products/pmcona-doorbell-zoom.png"],
    isFeatured: true,
    isNew: false,
    inStock: true,
    tags: ["doorbell", "musical-bell", "chime", "pmcona"],
  },
  {
    id: "prod-pmcona-3276",
    name: "PM CONA Regency Multi-Tune Religious & Hindi Door Bell",
    slug: "pm-cona-regency-multi-tune-religious-hindi-door-bell-3276",
    brand: "PMCona",
    brandSlug: "pmcona",
    category: "Accessories",
    categorySlug: "accessories",
    description: "PM CONA Regency Door Bell (Code 3276) features an external tune selection switch allowing you to easily switch between devotional chants (Gayatri Mantra, Maha Mrityunjaya, Om Jai Jagdish) and melodious Hindi tunes.",
    shortDescription: "Multi-tune door bell with selector switch for divine religious mantras and popular Hindi melodies.",
    specifications: [
      {
            "label": "Product Code",
            "value": "3276"
      },
      {
            "label": "Range / Series",
            "value": "Musical Bells (Value Range)"
      },
      {
            "label": "Tunes",
            "value": "Religious Mantras + Hindi Melodies with Selector Switch"
      },
      {
            "label": "Operating Voltage",
            "value": "240V AC ~ 50Hz"
      },
      {
            "label": "Box Packaging",
            "value": "10 Pcs (Box) / 80 Pcs (Mini) / 160 Pcs (Bulk)"
      }
],
    images: ["/images/products/pmcona-doorbell-zoom.png"],
    isFeatured: false,
    isNew: false,
    inStock: true,
    tags: ["doorbell", "mantra", "religious-bell", "hindi-tunes", "pmcona"],
  },
  {
    id: "prod-pmcona-3236",
    name: "PM CONA Continuous Mantra Door Bell (12 Mantras)",
    slug: "pm-cona-continuous-mantra-door-bell-12-mantras-3236",
    brand: "PMCona",
    brandSlug: "pmcona",
    category: "Accessories",
    categorySlug: "accessories",
    description: "The PM CONA Continuous Mantra Chanting Bell (Code 3236) plugs directly into any 2-pin or 3-pin wall socket. Includes 12 pre-programmed high-definition sacred Vedic mantras with built-in volume adjustment knob and track change button.",
    shortDescription: "2-pin direct plug-in continuous chanting mantra player with 12 Vedic mantras and rotary volume control.",
    specifications: [
      {
            "label": "Product Code",
            "value": "3236"
      },
      {
            "label": "Range / Series",
            "value": "Value Range (Mantra Series)"
      },
      {
            "label": "Mantra Count",
            "value": "12 Sacred Mantras"
      },
      {
            "label": "Controls",
            "value": "Rotary Volume Controller + Track Selector Button"
      },
      {
            "label": "Connection",
            "value": "Direct 2-Pin Plug-in"
      },
      {
            "label": "Box Packaging",
            "value": "20 Pcs (Box) / 160 Pcs (Mini) / 320 Pcs (Bulk)"
      }
],
    images: ["/images/products/pmcona-doorbell-zoom.png"],
    isFeatured: true,
    isNew: false,
    inStock: true,
    tags: ["mantra-bell", "vedic-chants", "continuous-bell", "volume-control", "pmcona"],
  },
  {
    id: "prod-pmcona-4341",
    name: "PM CONA Flood Water Alarm Bell",
    slug: "pm-cona-flood-water-alarm-bell-4341",
    brand: "PMCona",
    brandSlug: "pmcona",
    category: "Accessories",
    categorySlug: "accessories",
    description: "PM CONA Flood Water Alarm (Code 4341) sounds an immediate loud voice warning and alarm chime the moment water reaches the top level of your overhead water tank. Highly reliable sensor wires prevent roof damage and water wastage.",
    shortDescription: "Automated overhead water tank overflow alarm bell with loud acoustic alert to prevent water wastage.",
    specifications: [
      {
            "label": "Product Code",
            "value": "4341"
      },
      {
            "label": "Range / Series",
            "value": "Alarm Bells (Value Range)"
      },
      {
            "label": "Function",
            "value": "Overhead Tank Water Overflow Alert"
      },
      {
            "label": "Alert Type",
            "value": "Loud Acoustic Alarm + Voice Alert"
      },
      {
            "label": "Box Packaging",
            "value": "10 Pcs (Box) / 40 Pcs (Mini) / 80 Pcs (Bulk)"
      }
],
    images: ["/images/products/pmcona-water-alarm.png"],
    isFeatured: true,
    isNew: false,
    inStock: true,
    tags: ["water-alarm", "tank-overflow", "alarm-bell", "safety", "pmcona"],
  },
  {
    id: "prod-pmcona-3261",
    name: "PM CONA Trico Wireless Remote Door Bell",
    slug: "pm-cona-trico-wireless-remote-door-bell-3261",
    brand: "PMCona",
    brandSlug: "pmcona",
    category: "Accessories",
    categorySlug: "accessories",
    description: "The PM CONA Trico Wireless Remote Door Bell (Code 3261) operates over an ultra-reliable 433MHz RF frequency with an open-air range up to 100 meters. Weatherproof remote transmitter button pairs seamlessly with the indoor chime unit.",
    shortDescription: "Long-range RF wireless remote door bell with zero wiring needed and multi-melody speaker.",
    specifications: [
      {
            "label": "Product Code",
            "value": "3261"
      },
      {
            "label": "Range / Series",
            "value": "Remote Wireless Bells"
      },
      {
            "label": "Transmission Range",
            "value": "Up to 100m (Open Field)"
      },
      {
            "label": "Frequency",
            "value": "433.92 MHz Digital Anti-Interference"
      },
      {
            "label": "Melodies",
            "value": "36 Selectable Polyphonic Melodies"
      },
      {
            "label": "Box Packaging",
            "value": "10 Pcs (Box) / 40 Pcs (Mini) / 80 Pcs (Bulk)"
      }
],
    images: ["/images/products/pmcona-doorbell-remote.png"],
    isFeatured: true,
    isNew: false,
    inStock: true,
    tags: ["wireless-doorbell", "remote-bell", "cordless", "rf-remote", "pmcona"],
  },
  {
    id: "prod-pmcona-2551",
    name: "PM CONA Single Phase 5-30A Energy Meter (Counter / LCD)",
    slug: "pm-cona-single-phase-5-30a-energy-meter-2551",
    brand: "PMCona",
    brandSlug: "pmcona",
    category: "Industrial",
    categorySlug: "industrial",
    description: "The PM CONA Single Phase Energy Meter (Code 2551 Counter / Code 2571 LCD) provides precise Class 1.0 measurement of kWh power consumption. Anti-tamper optical detection and impulse LED make it the premier choice for tenant billing.",
    shortDescription: "High-accuracy static single-phase sub-meter with tamper-proof optical seal for sub-letting & rentals.",
    specifications: [
      {
            "label": "Product Code",
            "value": "2551 (Counter Type) / 2571 (LCD Display)"
      },
      {
            "label": "Range / Series",
            "value": "Allied Range"
      },
      {
            "label": "Current Rating",
            "value": "5-30A Single Phase"
      },
      {
            "label": "Voltage Rating",
            "value": "240V, 50Hz, Class 1.0 Accuracy"
      },
      {
            "label": "Display",
            "value": "High Visibility Stepper Counter or Backlit LCD"
      },
      {
            "label": "Box Packaging",
            "value": "01 Pc (Box) / 20 Pcs (Mini) / 60 Pcs (Bulk)"
      }
],
    images: ["/images/products/pmcona-energy-meter.png"],
    isFeatured: true,
    isNew: true,
    inStock: true,
    tags: ["energy-meter", "sub-meter", "kwh", "single-phase", "allied", "pmcona"],
  },
  {
    id: "prod-pmcona-1911",
    name: "PM CONA Porcelain Kit Kat Fuse (16A / 32A / 63A / 100A)",
    slug: "pm-cona-porcelain-kit-kat-fuse-1911",
    brand: "PMCona",
    brandSlug: "pmcona",
    category: "MCB & Protection",
    categorySlug: "mcb-protection",
    description: "PM CONA Rewirable Porcelain Kit Kat Fuses (Codes 1911 - 1941) are made from high-density vitrified electro-porcelain with heavy-duty electrolytic copper spring contacts for reliable fault clearance and long thermal stability.",
    shortDescription: "High-glaze vitrified electrical porcelain rewirable kit kat fuse with heavy copper phosphor contacts.",
    specifications: [
      {
            "label": "Product Code",
            "value": "1911 (16A/240V) / 1916 (16A/415V) / 1926 (32A/415V) / 1936 (63A/415V) / 1941 (100A/415V)"
      },
      {
            "label": "Range / Series",
            "value": "Allied Range"
      },
      {
            "label": "Material",
            "value": "High Glaze Electrical Grade Porcelain"
      },
      {
            "label": "Contacts",
            "value": "Good Grip Electrolytic Copper Contacts"
      },
      {
            "label": "Voltage Rating",
            "value": "240V / 415V AC"
      },
      {
            "label": "Certification",
            "value": "ISI Marked (IS:2086)"
      },
      {
            "label": "Box Packaging",
            "value": "12 Pcs (16A) / 06 Pcs (32A) / 03 Pcs (63A) / 01 Pc (100A)"
      }
],
    images: ["/images/products/pmcona-kitkat-fuse.png"],
    isFeatured: false,
    isNew: false,
    inStock: true,
    tags: ["kitkat-fuse", "porcelain-fuse", "rewirable-fuse", "protection", "pmcona", "isi"],
  },
  {
    id: "prod-pmcona-1906",
    name: "PM CONA Professional Line Voltage Tester",
    slug: "pm-cona-professional-line-voltage-tester-1906",
    brand: "PMCona",
    brandSlug: "pmcona",
    category: "Industrial",
    categorySlug: "industrial",
    description: "The PM CONA Line Tester Series (Code 1906 Great / 2041 Sharp / 1896 Mega Industrial) features high-strength cellulose acetate unbreakable handles with built-in high-resistance safety resistors and glowing neon indicator for phase testing up to 500V.",
    shortDescription: "High-safety electrical neon phase tester with insulated hardened chrome vanadium blade.",
    specifications: [
      {
            "label": "Product Code",
            "value": "1906 (Great) / 2041 (Sharp Single Light) / 1896 (Mega Industrial)"
      },
      {
            "label": "Range / Series",
            "value": "Allied Range"
      },
      {
            "label": "Voltage Test Range",
            "value": "100V - 500V AC"
      },
      {
            "label": "Blade Material",
            "value": "Hardened Chrome Vanadium Steel with Insulation Sleeve"
      },
      {
            "label": "Box Packaging",
            "value": "100 Pcs (Box) / 800 Pcs (Mini) / 1600 Pcs (Bulk)"
      }
],
    images: ["/images/products/pmcona-digital-tester.png"],
    isFeatured: false,
    isNew: false,
    inStock: true,
    tags: ["line-tester", "phase-tester", "tools", "allied", "pmcona"],
  },
  {
    id: "prod-pmcona-4131",
    name: "PM CONA Quick Grip PVC Electrical Insulation Tape (6m)",
    slug: "pm-cona-quick-grip-pvc-electrical-insulation-tape-4131",
    brand: "PMCona",
    brandSlug: "pmcona",
    category: "Accessories",
    categorySlug: "accessories",
    description: "PM CONA Quick Grip PVC Electrical Tape (Code 4131) offers high dielectric breakdown resistance up to 6000V. Highly stretchable, moisture-resistant, and non-aging formulation available in Red, Yellow, Blue, Green, Black, and White phase colours.",
    shortDescription: "All-weather flame-retardant pressure-sensitive PVC insulation tape with ultra-strong adhesive grip.",
    specifications: [
      {
            "label": "Product Code",
            "value": "4131"
      },
      {
            "label": "Range / Series",
            "value": "Allied Range"
      },
      {
            "label": "Length / Width",
            "value": "6 Metres Length, Standard 18mm Width"
      },
      {
            "label": "Dielectric Strength",
            "value": "> 6000 Volts"
      },
      {
            "label": "Available Colours",
            "value": "Black, Red, Yellow, Green, Blue, White"
      },
      {
            "label": "Box Packaging",
            "value": "30 Pcs (Box) / 1200 Pcs (Bulk)"
      }
],
    images: ["/images/products/pmcona-pvc-tape.png"],
    isFeatured: false,
    isNew: false,
    inStock: true,
    tags: ["insulation-tape", "pvc-tape", "quick-grip", "allied", "pmcona"],
  },
  {
    id: "prod-pmcona-2091",
    name: "PM CONA Gold Heavy Electric Iron Connector with Indicator",
    slug: "pm-cona-gold-heavy-electric-iron-connector-with-indicator-2091",
    brand: "PMCona",
    brandSlug: "pmcona",
    category: "Accessories",
    categorySlug: "accessories",
    description: "The PM CONA Gold Heavy Iron Connector (Code 2091) is engineered for pressing irons, heaters, and high-heat appliances. Combines a ceramic insulated terminal chamber with heavy brass contact clips and external neon indicator.",
    shortDescription: "Heat-resistant heavy electrical iron connector plug with neon indicator and porcelain interior.",
    specifications: [
      {
            "label": "Product Code",
            "value": "2091"
      },
      {
            "label": "Range / Series",
            "value": "Gold / Allied Range"
      },
      {
            "label": "Current Rating",
            "value": "10A - 16A, 240V"
      },
      {
            "label": "Internal Core",
            "value": "High Temperature Ceramic / Porcelain Insulation"
      },
      {
            "label": "Indicator",
            "value": "Built-in Neon Power Indicator"
      },
      {
            "label": "Box Packaging",
            "value": "20 Pcs (Box) / 200 Pcs (Mini) / 400 Pcs (Bulk)"
      }
],
    images: ["/images/products/pmcona-iron-connector.png"],
    isFeatured: false,
    isNew: false,
    inStock: true,
    tags: ["iron-connector", "heater-plug", "ceramic-core", "gold-series", "pmcona"],
  },
  {
    id: "prod-pmcona-1061",
    name: "PM CONA Gold Super & Jazz 1-Way Traditional Switch 6AX",
    slug: "pm-cona-gold-super-jazz-1-way-switch-6ax-1061",
    brand: "PMCona",
    brandSlug: "pmcona",
    category: "Switches",
    categorySlug: "switches",
    description: "PM CONA Gold Range (Codes 1061 Super / 1016 Jazz) offers the industry's most trusted traditional piano-type switches. Proven reliability across millions of Indian homes with heavy brass terminal screws and solid silver-tipped contact bars.",
    shortDescription: "ISI marked traditional surface/flush piano switch in Milky White & Off White colours.",
    specifications: [
      {
            "label": "Product Code",
            "value": "1061 (Super 1-Way 6AX) / 1016 (Jazz 1-Way 6AX) / 1066 (2-Way) / 1071 (Bell Push)"
      },
      {
            "label": "Range / Series",
            "value": "Gold Range"
      },
      {
            "label": "Colours Available",
            "value": "Milky White & Off White"
      },
      {
            "label": "Current Rating",
            "value": "6AX, 240V"
      },
      {
            "label": "Certification",
            "value": "ISI Marked (IS:3854)"
      },
      {
            "label": "Box Packaging",
            "value": "20 Pcs (Box) / 720 Pcs (Mini) / 1440 Pcs (Bulk)"
      }
],
    images: ["/images/products/pmcona-gold-switch.png"],
    isFeatured: false,
    isNew: false,
    inStock: true,
    tags: ["switch", "6AX", "piano-switch", "gold-range", "traditional", "pmcona", "isi"],
  },
  {
    id: "prod-3",
    name: "Polycab Optima Plus 1.5 sq mm Wire",
    slug: "polycab-optima-plus-wire",
    brand: "Polycab",
    brandSlug: "polycab",
    category: "Wires",
    categorySlug: "wires",
    description: "High-quality HRFR (Heat Resistant Flame Retardant) house wire with 90m coil length. Suitable for domestic electrical wiring with superior insulation and conductivity.",
    shortDescription: "HRFR house wire \u2014 1.5 sq mm, 90m coil",
    specifications: [
      {
            "label": "Size",
            "value": "1.5 sq mm"
      },
      {
            "label": "Length",
            "value": "90 meters"
      },
      {
            "label": "Type",
            "value": "HRFR"
      },
      {
            "label": "Voltage",
            "value": "1100V"
      },
      {
            "label": "Conductor",
            "value": "Electrolytic Copper"
      },
      {
            "label": "Certification",
            "value": "ISI, ROHS"
      }
],
    images: ["https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=600&q=80"],
    isFeatured: true,
    isNew: false,
    inStock: true,
    tags: ["wire", "1.5mm", "copper", "HRFR"],
  },
  {
    id: "prod-4",
    name: "Havells 32A MCB Single Pole",
    slug: "havells-32a-mcb-single-pole",
    brand: "Havells",
    brandSlug: "havells",
    category: "MCB & Protection",
    categorySlug: "mcb-protection",
    description: "Miniature Circuit Breaker with C-curve tripping characteristic. Provides reliable short circuit and overload protection for residential and commercial installations.",
    shortDescription: "C-curve MCB for short circuit & overload protection",
    specifications: [
      {
            "label": "Rating",
            "value": "32A"
      },
      {
            "label": "Poles",
            "value": "Single Pole"
      },
      {
            "label": "Curve",
            "value": "C Curve"
      },
      {
            "label": "Breaking Capacity",
            "value": "10kA"
      },
      {
            "label": "Standard",
            "value": "IS/IEC 60898"
      }
],
    images: ["https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80"],
    isFeatured: true,
    isNew: false,
    inStock: true,
    tags: ["MCB", "32A", "protection", "single-pole"],
  },
  {
    id: "prod-5",
    name: "Crompton Energion HS 1200mm BLDC Fan",
    slug: "crompton-energion-bldc-fan",
    brand: "Crompton",
    brandSlug: "crompton",
    category: "Fans",
    categorySlug: "fans",
    description: "Ultra-energy-efficient BLDC ceiling fan consuming only 35W. Features remote control, sleep mode, timer, and high air delivery. 5-star rated for maximum savings.",
    shortDescription: "Ultra-efficient BLDC ceiling fan \u2014 just 35W",
    specifications: [
      {
            "label": "Sweep",
            "value": "1200mm"
      },
      {
            "label": "Power",
            "value": "35W"
      },
      {
            "label": "RPM",
            "value": "330"
      },
      {
            "label": "Air Delivery",
            "value": "230 CMM"
      },
      {
            "label": "Star Rating",
            "value": "5 Star"
      },
      {
            "label": "Remote",
            "value": "Yes"
      }
],
    images: ["https://images.unsplash.com/photo-1618945037805-f1a4ed3783a4?auto=format&fit=crop&w=600&q=80"],
    isFeatured: true,
    isNew: true,
    inStock: true,
    tags: ["fan", "BLDC", "energy-saving", "ceiling"],
  },
  {
    id: "prod-6",
    name: "Havells 12W LED Panel Light",
    slug: "havells-12w-led-panel",
    brand: "Havells",
    brandSlug: "havells",
    category: "Lighting",
    categorySlug: "lighting",
    description: "Slim LED panel light with edge-lit technology for uniform glow. Flicker-free operation, surge-proof, and energy-efficient. Perfect for false ceilings in homes and offices.",
    shortDescription: "Slim edge-lit LED panel \u2014 flicker-free, 12W",
    specifications: [
      {
            "label": "Wattage",
            "value": "12W"
      },
      {
            "label": "Shape",
            "value": "Round"
      },
      {
            "label": "Color Temp",
            "value": "6500K (Cool Daylight)"
      },
      {
            "label": "Lumens",
            "value": "1080 lm"
      },
      {
            "label": "Cutout",
            "value": "150mm"
      },
      {
            "label": "Warranty",
            "value": "2 Years"
      }
],
    images: ["https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&w=600&q=80"],
    isFeatured: true,
    isNew: false,
    inStock: true,
    tags: ["LED", "panel", "ceiling", "lighting"],
  },
  {
    id: "prod-7",
    name: "PMCona 8 Way TPN Distribution Board",
    slug: "pmcona-8way-tpn-db",
    brand: "PMCona",
    brandSlug: "pmcona",
    category: "MCB & Protection",
    categorySlug: "mcb-protection",
    description: "Premium 8-way TPN distribution board with door and DIN rail. Designed for organized and safe electrical distribution in residential and commercial buildings.",
    shortDescription: "8-way TPN distribution board with door",
    specifications: [
      {
            "label": "Ways",
            "value": "8"
      },
      {
            "label": "Type",
            "value": "TPN (Triple Pole + Neutral)"
      },
      {
            "label": "Material",
            "value": "CRCA Sheet Steel with Powder Coating"
      },
      {
            "label": "IP Rating",
            "value": "IP43"
      },
      {
            "label": "Mounting",
            "value": "Flush / Surface"
      }
],
    images: ["https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80"],
    isFeatured: false,
    isNew: false,
    inStock: true,
    tags: ["distribution-board", "TPN", "MCB", "enclosure"],
  },
  {
    id: "prod-8",
    name: "Finolex 2.5 sq mm FR House Wire",
    slug: "finolex-2-5-fr-wire",
    brand: "Finolex",
    brandSlug: "finolex",
    category: "Wires",
    categorySlug: "wires",
    description: "Flame Retardant PVC insulated building wire engineered for safe household circuitry, air conditioner wiring, and power plug distribution.",
    shortDescription: "Finolex 2.5 sq mm FR building wire 90m coil",
    specifications: [
      {
            "label": "Size",
            "value": "2.5 sq mm"
      },
      {
            "label": "Length",
            "value": "90 meters"
      },
      {
            "label": "Insulation",
            "value": "FR PVC Flame Retardant"
      },
      {
            "label": "Certification",
            "value": "ISI (IS:694)"
      }
],
    images: ["https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=600&q=80"],
    isFeatured: false,
    isNew: false,
    inStock: true,
    tags: ["wire", "2.5mm", "finolex", "copper"],
  }
];

// ===== TESTIMONIALS =====
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  review: string;
  date: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Rajesh Kumar',
    role: 'Homeowner',
    rating: 5,
    review: 'Excellent shop! I got all the switches and sockets for my new home from Sai Enterprises. The owner personally helped me choose the right products. Very genuine and fair pricing.',
    date: '2 weeks ago',
  },
  {
    id: 'test-2',
    name: 'Suresh Electricals',
    role: 'Electrician',
    rating: 5,
    review: 'I have been buying all my electrical supplies from Sai Enterprises for over 3 years. They always have stock, give good rates for bulk orders, and the quality is always genuine.',
    date: '1 month ago',
  },
  {
    id: 'test-3',
    name: 'Priya Sharma',
    role: 'Interior Designer',
    rating: 5,
    review: 'As an interior designer, I need reliable suppliers who understand modular products. Sai Enterprises has an impressive range of switches and sockets from top brands. Highly recommended!',
    date: '3 weeks ago',
  },
  {
    id: 'test-4',
    name: 'Manoj Constructions',
    role: 'Contractor',
    rating: 4,
    review: 'We regularly source wires, cables, and MCBs from Sai Enterprises for our construction projects. Competitive pricing and they always deliver on time. Good business relationship.',
    date: '1 month ago',
  },
  {
    id: 'test-5',
    name: 'Anita Patel',
    role: 'Homeowner',
    rating: 5,
    review: 'Very professional shop. They explained the difference between various wire grades and helped me pick the safest option for my home. Will definitely come back.',
    date: '2 months ago',
  },
  {
    id: 'test-6',
    name: 'SK Traders',
    role: 'Business Owner',
    rating: 5,
    review: 'Best electrical shop in the area. They are authorized dealers for multiple brands which gives us confidence about genuine products. WhatsApp ordering is very convenient.',
    date: '3 weeks ago',
  },
];

// ===== FAQs =====
export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const faqs: FAQ[] = [
  {
    id: 'faq-1',
    question: 'What electrical products do you sell?',
    answer: 'We offer a complete range of electrical products including modular switches, sockets, wires, cables, MCBs, distribution boards, LED lighting, fans, and electrical accessories. We stock both residential and industrial products from multiple trusted brands.',
    category: 'Products',
  },
  {
    id: 'faq-2',
    question: 'Are you an authorized dealer for these brands?',
    answer: 'Yes, Sai Enterprises is an authorized dealer and distributor for PMCona and several other leading electrical brands. All products we sell are 100% genuine with manufacturer warranty.',
    category: 'Brands',
  },
  {
    id: 'faq-3',
    question: 'Do you provide quotations for bulk orders?',
    answer: 'Absolutely! We provide competitive quotations for bulk and project-based orders. Contact us via WhatsApp or phone with your requirements and we will share a detailed quotation within 24 hours.',
    category: 'Orders',
  },
  {
    id: 'faq-4',
    question: 'What are your store timings?',
    answer: 'Our store is open Monday to Saturday from 9:00 AM to 8:00 PM. We are closed on Sundays and public holidays. For urgent requirements, you can reach us on WhatsApp.',
    category: 'Store',
  },
  {
    id: 'faq-5',
    question: 'Do you offer delivery?',
    answer: 'Yes, we offer local delivery for orders within the city. For large orders, we can arrange transport. Contact us for delivery charges and timelines based on your location.',
    category: 'Delivery',
  },
  {
    id: 'faq-6',
    question: 'Do the products come with warranty?',
    answer: 'All branded products come with the manufacturer\'s standard warranty. Warranty periods vary by product and brand — typically 1 to 10 years. We provide proper bills for warranty claims.',
    category: 'Warranty',
  },
  {
    id: 'faq-7',
    question: 'Can I return or exchange a product?',
    answer: 'Unused and unopened products can be returned or exchanged within 7 days of purchase with the original bill. Custom-cut wires and cables cannot be returned. Please contact us for specific return queries.',
    category: 'Returns',
  },
  {
    id: 'faq-8',
    question: 'Do you provide electrician recommendations?',
    answer: 'While we do not directly employ electricians, we can recommend trusted local electricians and contractors based on your project requirements. Many electricians are regular customers and we can connect you.',
    category: 'Services',
  },
  {
    id: 'faq-9',
    question: 'How can I check product availability?',
    answer: 'The fastest way to check availability is to send us a WhatsApp message with the product name or photo. We will confirm stock and pricing within minutes during business hours.',
    category: 'Products',
  },
  {
    id: 'faq-10',
    question: 'Do you offer special rates for electricians and contractors?',
    answer: 'Yes, we offer special trade pricing for electricians, contractors, and regular customers. Visit our store or contact us to discuss trade account benefits.',
    category: 'Orders',
  },
];

// ===== GALLERY =====
export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: 'store' | 'products' | 'brands' | 'interior' | 'exterior';
}

export const galleryImages: GalleryImage[] = [
  { id: 'gal-1', src: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=800&q=80', alt: 'Sai Enterprises Store Front', category: 'exterior' },
  { id: 'gal-2', src: 'https://images.unsplash.com/photo-1513828742140-ccaa34f3ccd0?auto=format&fit=crop&w=800&q=80', alt: 'Store Interior — Wire Section', category: 'interior' },
  { id: 'gal-3', src: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80', alt: 'Product Display Wall', category: 'products' },
  { id: 'gal-4', src: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80', alt: 'Brand Display Area', category: 'brands' },
  { id: 'gal-5', src: 'https://images.unsplash.com/photo-1620288627223-53302f4e8c74?auto=format&fit=crop&w=800&q=80', alt: 'Switches Collection', category: 'products' },
  { id: 'gal-6', src: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=800&q=80', alt: 'Wires & Cables Section', category: 'products' },
  { id: 'gal-7', src: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&w=800&q=80', alt: 'Store Interior — Lighting Display', category: 'interior' },
  { id: 'gal-8', src: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=800&q=80', alt: 'Store Side View', category: 'exterior' },
  { id: 'gal-9', src: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80', alt: 'Billing Counter', category: 'interior' },
  { id: 'gal-10', src: 'https://images.unsplash.com/photo-1618945037805-f1a4ed3783a4?auto=format&fit=crop&w=800&q=80', alt: 'Fans Display', category: 'products' },
  { id: 'gal-11', src: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80', alt: 'MCB & Distribution Boards', category: 'products' },
  { id: 'gal-12', src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80', alt: 'PMCona Authorized Dealer Board', category: 'brands' },
];

// ===== BUSINESS INFO =====
// ===== BUSINESS INFO =====
export const businessInfo = {
  name: 'Sai Enterprises',
  tagline: 'Your Trusted Electrical Partner',
  fullName: 'Sai Enterprises',
  description: 'Premium electrical products supplier and authorized brand dealer serving homeowners, electricians, contractors, and businesses.',
  phone: '+91 79786 72521',
  phoneRaw: '917978672521',
  whatsapp: '+91 79786 72521',
  whatsappRaw: '917978672521',
  whatsappMessage: "Hi Sai Enterprises! I'm interested in your electrical products. Can you help me?",
  email: 'akashishshaw@gmail.com',
  address: {
    line1: 'Near Bank of India, TCI Chowk',
    line2: '',
    city: 'Rourkela',
    state: 'Odisha',
    pincode: '769004',
    full: 'Near Bank of India, TCI Chowk, Rourkela, Odisha 769004, India',
  },
  mapUrl: 'https://maps.google.com/maps?q=Near%20Bank%20of%20India%2C%20TCI%20Chowk%2C%20Rourkela%2C%20Odisha%20769004%2C%20India&t=&z=15&ie=UTF8&iwloc=&output=embed',
  mapDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Near+Bank+of+India,+TCI+Chowk,+Rourkela,+Odisha+769004,+India',
  hours: {
    weekdays: '9:00 AM — 8:00 PM',
    saturday: '9:00 AM — 8:00 PM',
    sunday: 'Closed',
  },
  experience: '5+',
  productsCount: '500+',
  brandsCount: '5+',
  customersServed: '1000+',
  social: {
    instagram: 'https://instagram.com/saienterprises',
    facebook: 'https://facebook.com/saienterprises',
    google: 'https://g.co/saienterprises',
  },
};

// ===== WHY CHOOSE US =====
export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export const whyChooseUs: Feature[] = [
  {
    icon: 'ShieldCheck',
    title: 'Genuine Products',
    description: 'Every product is sourced directly from authorized brand channels. No duplicates, no counterfeits.',
  },
  {
    icon: 'Award',
    title: 'Authorized Dealer',
    description: 'Official dealership for PMCona and other top brands — giving you manufacturer-backed assurance.',
  },
  {
    icon: 'Package',
    title: 'Wide Product Range',
    description: 'From modular switches to industrial cables — find everything for your electrical project under one roof.',
  },
  {
    icon: 'Users',
    title: 'Expert Guidance',
    description: 'Our experienced team helps you choose the right products for your specific electrical requirements.',
  },
  {
    icon: 'IndianRupee',
    title: 'Competitive Pricing',
    description: 'Best market rates for retail and bulk orders. Special trade pricing for electricians and contractors.',
  },
  {
    icon: 'MessageSquare',
    title: 'Quick Response',
    description: 'Reach us on WhatsApp for instant availability checks, quotes, and order confirmations.',
  },
];

// Helper
export function getBusinessInfo() {
  try {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('saienterprises_admin_business') : null;
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...businessInfo,
        ...parsed,
        address: { ...businessInfo.address, ...(parsed.address || {}) },
        hours: { ...businessInfo.hours, ...(parsed.hours || {}) },
        social: { ...businessInfo.social, ...(parsed.social || {}) },
      };
    }
  } catch {
    /* fallback to initial static businessInfo */
  }
  return businessInfo;
}

export function getWhatsAppUrl(message?: string): string {
  const info = getBusinessInfo();
  const msg = message || info.whatsappMessage || "Hi Sai Enterprises! I'm interested in your electrical products. Can you help me?";
  const rawNumber = (info.whatsappRaw || info.whatsapp || '917978672521').replace(/[^0-9]/g, '');
  return `https://wa.me/${rawNumber}?text=${encodeURIComponent(msg)}`;
}

export function getPhoneUrl(): string {
  const info = getBusinessInfo();
  const rawNumber = (info.phoneRaw || info.phone || '917978672521').replace(/[^0-9]/g, '');
  return `tel:+${rawNumber}`;
}

export function getProductEnquiryUrl(productName: string): string {
  return getWhatsAppUrl(`Hi! I'd like to enquire about: ${productName}. Is it available?`);
}

export function getQuoteUrl(): string {
  return getWhatsAppUrl('Hi Sai Enterprises! I would like to request a quotation. Here are my requirements:\n\n');
}
