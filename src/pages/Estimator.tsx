import { useState, useMemo } from 'react';
import {
  Zap,
  Home,
  Shield,
  Layers,
  Send,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  Flame,
  Plus,
  RefreshCw,
  Building,
} from 'lucide-react';
import SEO from '../components/SEO';
import { useBOM } from '../context/BOMContext';
import { businessInfo } from '../data';
import { trackEvent } from '../services/analyticsService';

type PropertyType = '1bhk' | '2bhk' | '3bhk' | 'duplex' | 'commercial';

interface HouseConfig {
  bedrooms: number;
  bathrooms: number;
  acs: number;
  geysers: number;
  kitchenPowerPoints: number;
}

const DEFAULT_CONFIGS: Record<PropertyType, { name: string; subtitle: string; sqft: string; config: HouseConfig }> = {
  '1bhk': {
    name: '1 BHK Apartment',
    subtitle: 'Compact Residential',
    sqft: '500 - 650 sq.ft.',
    config: { bedrooms: 1, bathrooms: 1, acs: 1, geysers: 1, kitchenPowerPoints: 2 },
  },
  '2bhk': {
    name: '2 BHK Home / Flat',
    subtitle: 'Standard Family Setup',
    sqft: '850 - 1100 sq.ft.',
    config: { bedrooms: 2, bathrooms: 2, acs: 2, geysers: 2, kitchenPowerPoints: 3 },
  },
  '3bhk': {
    name: '3 BHK Premium Residence',
    subtitle: 'Spacious Residential',
    sqft: '1250 - 1650 sq.ft.',
    config: { bedrooms: 3, bathrooms: 3, acs: 3, geysers: 3, kitchenPowerPoints: 4 },
  },
  'duplex': {
    name: 'Duplex / Independent Villa',
    subtitle: 'Heavy Load Multi-Floor',
    sqft: '2000 - 3200 sq.ft.',
    config: { bedrooms: 4, bathrooms: 4, acs: 5, geysers: 4, kitchenPowerPoints: 6 },
  },
  'commercial': {
    name: 'Commercial Shop / Office',
    subtitle: 'Retail & Business Outlets',
    sqft: '600 - 1200 sq.ft.',
    config: { bedrooms: 0, bathrooms: 1, acs: 2, geysers: 0, kitchenPowerPoints: 4 },
  },
};

export default function EstimatorPage() {
  const [propertyType, setPropertyType] = useState<PropertyType>('2bhk');
  const [config, setConfig] = useState<HouseConfig>(DEFAULT_CONFIGS['2bhk'].config);
  const [addedToBOM, setAddedToBOM] = useState(false);
  const { addItem } = useBOM();

  const handlePropertyChange = (type: PropertyType) => {
    setPropertyType(type);
    setConfig(DEFAULT_CONFIGS[type].config);
    setAddedToBOM(false);
  };

  // Automated Engineering Calculations
  const calculatedEstimates = useMemo(() => {
    const { bedrooms, bathrooms, acs, geysers, kitchenPowerPoints } = config;

    // 1. Wires & Cables (90 meter coils)
    // 1.5 sq mm: Lighting, fans, exhaust, standard points
    const wire1_5 = Math.max(1, Math.ceil((bedrooms * 1.2 + bathrooms * 0.4 + 1.5) * 0.8));
    // 2.5 sq mm: 16A Power sockets, fridge, TV units
    const wire2_5 = Math.max(1, Math.ceil((bedrooms * 0.8 + kitchenPowerPoints * 0.4 + 1) * 0.9));
    // 4.0 sq mm: Dedicated AC and Geyser circuits (heavy load continuous)
    const wire4_0 = Math.max(1, Math.ceil((acs * 0.6 + geysers * 0.5 + 0.4)));
    // 6.0 sq mm: Main incomer from meter to DB
    const wire6_0_meters = propertyType === 'duplex' ? 45 : 25;

    // 2. Switchgear & Protection
    const mcb10A = Math.max(2, bedrooms * 2 + 2); // 10A for lights & fans
    const mcb16A = Math.max(2, bedrooms + kitchenPowerPoints); // 16A for general power
    const mcb25A = acs + geysers; // 25A for ACs and geysers
    const isolatorRating = acs >= 3 || propertyType === 'duplex' ? '63A Double Pole' : '40A Double Pole';
    const rccbRating = acs >= 3 || propertyType === 'duplex' ? '63A 30mA (Shock Protection)' : '40A 30mA';
    const dbSize = acs + geysers + mcb10A + mcb16A > 10 ? '12-Way SPN / TPN DB' : '8-Way SPN Enclosure';

    // 3. Modular Switches & Sockets
    const switches6A = bedrooms * 10 + bathrooms * 3 + kitchenPowerPoints * 2 + 8;
    const sockets6A = bedrooms * 4 + bathrooms * 1 + 4;
    const sockets16A = bedrooms * 2 + kitchenPowerPoints + acs + geysers;
    const fanRegulators = bedrooms + (propertyType === 'duplex' ? 3 : 2);
    const estimatedPlates = Math.ceil((switches6A + sockets6A + sockets16A) / 6);

    return {
      wires: [
        { name: '1.5 sq mm FRLS Copper Wire (Light & Fan Circuits)', qty: wire1_5, unit: 'Coils (90m)', brand: 'Polycab / Havells / Finolex', specs: 'IS 694 Flame Retardant' },
        { name: '2.5 sq mm FRLS Copper Wire (16A Power Sockets & Appliances)', qty: wire2_5, unit: 'Coils (90m)', brand: 'Polycab / Havells / Finolex', specs: 'Heavy Gauge Power Wire' },
        { name: '4.0 sq mm FRLS Copper Wire (AC & Geyser Dedicated Lines)', qty: wire4_0, unit: 'Coils (90m)', brand: 'Polycab / Havells', specs: 'High Amperage Thermal Grade' },
        { name: '6.0 sq mm Main Submain Incomer Wire (Meter to DB)', qty: wire6_0_meters, unit: 'Meters', brand: 'Polycab / Havells', specs: 'Main Distribution Line' },
      ],
      protection: [
        { name: '10A B-Curve Single Pole MCBs (Lighting Circuits)', qty: mcb10A, unit: 'Pcs', brand: 'PMCona / Havells', specs: 'C-Series Micro Breaker' },
        { name: '16A / 20A Single Pole MCBs (Power Socket Circuits)', qty: mcb16A, unit: 'Pcs', brand: 'PMCona / Havells', specs: 'Inductive Load Rated' },
        { name: '25A / 32A C-Curve MCBs (Dedicated for AC & Geysers)', qty: mcb25A, unit: 'Pcs', brand: 'PMCona / Havells', specs: 'Compressor Surge Rated' },
        { name: `Main Isolator Switch (${isolatorRating})`, qty: 1, unit: 'Pcs', brand: 'PMCona / Havells', specs: 'Main Incomer Switch' },
        { name: `RCCB / ELCB Earth Leakage Breaker (${rccbRating})`, qty: 1, unit: 'Pcs', brand: 'Havells / PMCona', specs: 'Human Safety Shock Proof' },
        { name: `Modular Distribution Board (${dbSize})`, qty: 1, unit: 'Pcs', brand: 'PMCona / Havells', specs: 'IP43 Metal Enclosure' },
      ],
      switches: [
        { name: '6A 1-Way Modular Switches', qty: switches6A, unit: 'Pcs', brand: 'PMCona / Anchor Roma', specs: 'Silver Inlay Contacts' },
        { name: '6A 3-Pin Modular Sockets with Safety Shutter', qty: sockets6A, unit: 'Pcs', brand: 'PMCona / Anchor Roma', specs: 'Child Safety Shuttered' },
        { name: '16A / 20A Heavy Duty Modular Power Sockets', qty: sockets16A, unit: 'Pcs', brand: 'PMCona / Anchor Roma', specs: 'Heavy Appliance Sockets' },
        { name: 'Stepped Electronic Fan Regulators (Hum-Free)', qty: fanRegulators, unit: 'Pcs', brand: 'PMCona / Anchor Roma', specs: 'Capacitive Stepped Control' },
        { name: 'Modular Surface / Concealed Base Plates & Cover Frames', qty: estimatedPlates, unit: 'Frames', brand: 'PMCona / Anchor Roma', specs: 'Flame Retardant Polycarbonate' },
      ]
    };
  }, [config, propertyType]);

  const handleAddAllToBOM = () => {
    trackEvent('estimator_add_all_to_bom', { property_type: propertyType });
    const allItems = [
      ...calculatedEstimates.wires,
      ...calculatedEstimates.protection,
      ...calculatedEstimates.switches,
    ];

    allItems.forEach((item, idx) => {
      addItem(
        {
          id: `est-${propertyType}-${idx}-${Date.now()}`,
          name: item.name,
          brand: item.brand,
          category: 'House Wiring Estimate',
          image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=400&q=80',
        },
        item.qty,
        item.unit,
        item.specs
      );
    });

    setAddedToBOM(true);
    setTimeout(() => setAddedToBOM(false), 3000);
  };

  const handleSendWhatsAppEstimate = () => {
    trackEvent('estimator_send_whatsapp', { property_type: propertyType });
    const propMeta = DEFAULT_CONFIGS[propertyType];

    let msg = `*⚡ HOUSE WIRING & LOAD ESTIMATE — SAI ENTERPRISES*\n`;
    msg += `------------------------------------\n`;
    msg += `🏠 *Property Type:* ${propMeta.name} (${propMeta.sqft})\n`;
    msg += `🛏️ Bedrooms: ${config.bedrooms} | 🚿 Bathrooms: ${config.bathrooms}\n`;
    msg += `❄️ AC Points: ${config.acs} | ♨️ Geyser Points: ${config.geysers}\n`;
    msg += `🍳 Kitchen Power Outlets: ${config.kitchenPowerPoints}\n`;
    msg += `📅 *Date:* ${new Date().toLocaleDateString('en-IN')}\n`;
    msg += `------------------------------------\n\n`;

    msg += `*1. WIRES & CABLES (IS 694):*\n`;
    calculatedEstimates.wires.forEach(w => {
      msg += `• ${w.name}: *${w.qty} ${w.unit}*\n`;
    });

    msg += `\n*2. MCBs & DISTRIBUTION GEAR:*\n`;
    calculatedEstimates.protection.forEach(p => {
      msg += `• ${p.name}: *${p.qty} ${p.unit}*\n`;
    });

    msg += `\n*3. MODULAR SWITCHES & ACCESSORIES:*\n`;
    calculatedEstimates.switches.forEach(s => {
      msg += `• ${s.name}: *${s.qty} ${s.unit}*\n`;
    });

    msg += `\n------------------------------------\n`;
    msg += `Please review this house wiring bill of materials and share your best wholesale package price.\n\n`;
    msg += `Generated via Sai Enterprises Interactive Load Estimator`;

    const encoded = encodeURIComponent(msg);
    const url = `https://wa.me/${businessInfo.whatsappRaw}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-dark-1 text-slate-100 py-12 md:py-20 relative overflow-hidden">
      <SEO
        title="Project House Wiring & Electrical Load Estimator | Sai Enterprises"
        description="Calculate exact wire coils, MCB ratings, and modular switch requirements for your 1BHK, 2BHK, 3BHK, or Villa in Rourkela. Instant WhatsApp wholesale quote."
        canonical="https://saienterprises-90c6b.web.app/estimator"
      />

      {/* Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-volt/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-volt/10 border border-volt/30 text-volt text-xs font-mono font-semibold uppercase tracking-wider mb-4">
            <Zap className="w-3.5 h-3.5" />
            IS 694 Standard Electrical Estimator
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            House Wiring & Material <span className="text-transparent bg-clip-text bg-gradient-to-r from-volt to-emerald-400">Bill of Materials Calculator</span>
          </h1>
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            Select your property size and load requirements. Our engineering model calculates the exact wire gauges, MCB breakers, and modular switch counts needed for a safe, code-compliant electrical installation.
          </p>
        </div>

        {/* Step 1: Select Property Type */}
        <div className="mb-10">
          <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
            <Home className="w-4 h-4 text-volt" /> Step 1: Select Property Configuration
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {(Object.keys(DEFAULT_CONFIGS) as PropertyType[]).map((type) => {
              const item = DEFAULT_CONFIGS[type];
              const isSelected = propertyType === type;
              return (
                <button
                  key={type}
                  onClick={() => handlePropertyChange(type)}
                  className={`p-4 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden ${
                    isSelected
                      ? 'bg-dark-2 border-volt shadow-lg shadow-volt/10 ring-1 ring-volt'
                      : 'bg-dark-2/60 border-white/10 hover:border-white/20 hover:bg-dark-2'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-2 right-2 text-volt">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  )}
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-3 ${isSelected ? 'bg-volt text-dark-1' : 'bg-white/5 text-slate-400'}`}>
                    {type === 'commercial' ? <Building className="w-4 h-4" /> : <Home className="w-4 h-4" />}
                  </div>
                  <p className="text-xs font-extrabold text-white leading-tight">{item.name}</p>
                  <p className="text-[11px] text-volt font-mono mt-1">{item.sqft}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{item.subtitle}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Fine Tune Adjustments */}
        <div className="p-5 md:p-6 rounded-3xl bg-dark-2/80 border border-white/10 shadow-2xl mb-12 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-volt" /> Customize Room & Heavy Appliance Points
              </h2>
              <p className="text-xs text-slate-400">Adjust the sliders to match your exact floor plan</p>
            </div>
            <button
              onClick={() => setConfig(DEFAULT_CONFIGS[propertyType].config)}
              className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors"
            >
              <RefreshCw className="w-3 h-3" /> Reset
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Bedrooms */}
            <div className="p-3.5 rounded-2xl bg-dark-3/60 border border-white/5">
              <span className="text-[11px] font-mono uppercase text-slate-400 block mb-1">Bedrooms / Living</span>
              <div className="flex items-center justify-between mt-2">
                <button
                  onClick={() => setConfig(p => ({ ...p, bedrooms: Math.max(0, p.bedrooms - 1) }))}
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-white flex items-center justify-center"
                >
                  -
                </button>
                <span className="text-base font-bold font-mono text-volt">{config.bedrooms}</span>
                <button
                  onClick={() => setConfig(p => ({ ...p, bedrooms: p.bedrooms + 1 }))}
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-white flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>

            {/* Bathrooms */}
            <div className="p-3.5 rounded-2xl bg-dark-3/60 border border-white/5">
              <span className="text-[11px] font-mono uppercase text-slate-400 block mb-1">Bathrooms / Toilets</span>
              <div className="flex items-center justify-between mt-2">
                <button
                  onClick={() => setConfig(p => ({ ...p, bathrooms: Math.max(0, p.bathrooms - 1) }))}
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-white flex items-center justify-center"
                >
                  -
                </button>
                <span className="text-base font-bold font-mono text-volt">{config.bathrooms}</span>
                <button
                  onClick={() => setConfig(p => ({ ...p, bathrooms: p.bathrooms + 1 }))}
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-white flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>

            {/* AC Units */}
            <div className="p-3.5 rounded-2xl bg-dark-3/60 border border-white/5">
              <span className="text-[11px] font-mono uppercase text-slate-400 block mb-1">AC Units (1.5 / 2 Ton)</span>
              <div className="flex items-center justify-between mt-2">
                <button
                  onClick={() => setConfig(p => ({ ...p, acs: Math.max(0, p.acs - 1) }))}
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-white flex items-center justify-center"
                >
                  -
                </button>
                <span className="text-base font-bold font-mono text-volt">{config.acs}</span>
                <button
                  onClick={() => setConfig(p => ({ ...p, acs: p.acs + 1 }))}
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-white flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>

            {/* Geysers */}
            <div className="p-3.5 rounded-2xl bg-dark-3/60 border border-white/5">
              <span className="text-[11px] font-mono uppercase text-slate-400 block mb-1">Geysers / Water Heaters</span>
              <div className="flex items-center justify-between mt-2">
                <button
                  onClick={() => setConfig(p => ({ ...p, geysers: Math.max(0, p.geysers - 1) }))}
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-white flex items-center justify-center"
                >
                  -
                </button>
                <span className="text-base font-bold font-mono text-volt">{config.geysers}</span>
                <button
                  onClick={() => setConfig(p => ({ ...p, geysers: p.geysers + 1 }))}
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-white flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>

            {/* Kitchen Heavy Power */}
            <div className="p-3.5 rounded-2xl bg-dark-3/60 border border-white/5">
              <span className="text-[11px] font-mono uppercase text-slate-400 block mb-1">Kitchen Power Points</span>
              <div className="flex items-center justify-between mt-2">
                <button
                  onClick={() => setConfig(p => ({ ...p, kitchenPowerPoints: Math.max(1, p.kitchenPowerPoints - 1) }))}
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-white flex items-center justify-center"
                >
                  -
                </button>
                <span className="text-base font-bold font-mono text-volt">{config.kitchenPowerPoints}</span>
                <button
                  onClick={() => setConfig(p => ({ ...p, kitchenPowerPoints: p.kitchenPowerPoints + 1 }))}
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-white flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Step 3: Output Bill of Materials (BOM) */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <Layers className="w-6 h-6 text-volt" /> Calculated Electrical Bill of Materials (BOM)
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Recommended by authorized engineers based on CPWD / IS 694 electrical installation guidelines
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleAddAllToBOM}
                className="px-4 py-2.5 rounded-xl bg-volt text-dark-1 font-extrabold text-xs flex items-center gap-2 hover:bg-volt/90 shadow-lg shadow-volt/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Plus className="w-4 h-4" />
                {addedToBOM ? 'Added to Quotation List' : 'Add All to Material List'}
              </button>
              <button
                onClick={handleSendWhatsAppEstimate}
                className="px-4 py-2.5 rounded-xl bg-[#25d366] text-white font-extrabold text-xs flex items-center gap-2 hover:bg-[#20bd5a] shadow-lg shadow-[#25d366]/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Send className="w-4 h-4" />
                Get Wholesale Quote on WhatsApp
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Section 1: Wires & Cables */}
            <div className="p-5 rounded-3xl bg-dark-2/90 border border-white/10 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-white/10">
                  <div className="w-8 h-8 rounded-lg bg-volt/15 text-volt flex items-center justify-center font-mono font-bold text-xs">
                    01
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Wires & Cables</h3>
                    <p className="text-[11px] text-slate-400">IS 694 Certified Flame Retardant</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {calculatedEstimates.wires.map((item, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-dark-3/60 border border-white/5">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-xs font-semibold text-white leading-tight">{item.name}</p>
                        <span className="text-xs font-mono font-bold text-volt px-2 py-0.5 rounded bg-volt/10 border border-volt/20 shrink-0">
                          {item.qty} {item.unit}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1">Recommended: {item.brand}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-1.5 text-[11px] text-slate-400">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>100% Electrolytic Copper Conductors</span>
              </div>
            </div>

            {/* Section 2: Switchgear & Protection */}
            <div className="p-5 rounded-3xl bg-dark-2/90 border border-white/10 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-white/10">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center font-mono font-bold text-xs">
                    02
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">MCBs & Protection</h3>
                    <p className="text-[11px] text-slate-400">Circuit & Shock Protection</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {calculatedEstimates.protection.map((item, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-dark-3/60 border border-white/5">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-xs font-semibold text-white leading-tight">{item.name}</p>
                        <span className="text-xs font-mono font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 shrink-0">
                          {item.qty} {item.unit}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1">Grade: {item.specs}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-1.5 text-[11px] text-slate-400">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>10kA Short Circuit Breaking Capacity</span>
              </div>
            </div>

            {/* Section 3: Modular Switches & Sockets */}
            <div className="p-5 rounded-3xl bg-dark-2/90 border border-white/10 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-white/10">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/15 text-purple-400 flex items-center justify-center font-mono font-bold text-xs">
                    03
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Modular Switches</h3>
                    <p className="text-[11px] text-slate-400">Premium Polycarbonate Accessories</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {calculatedEstimates.switches.map((item, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-dark-3/60 border border-white/5">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-xs font-semibold text-white leading-tight">{item.name}</p>
                        <span className="text-xs font-mono font-bold text-purple-400 px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20 shrink-0">
                          {item.qty} {item.unit}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1">Series: {item.brand}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-1.5 text-[11px] text-slate-400">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>Polycarbonate UV & Flame Resistant</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-16 p-8 md:p-10 rounded-3xl bg-gradient-to-r from-dark-2 via-dark-2/90 to-dark-2 border border-volt/30 shadow-2xl relative overflow-hidden text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Need a Custom Site Quotation for Your Electrical Contractor?
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-2">
              Sai Enterprises provides bulk project billing, GST invoices, and same-day delivery to construction sites across Rourkela and Sundargarh.
            </p>
          </div>
          <button
            onClick={handleSendWhatsAppEstimate}
            className="px-6 py-3.5 rounded-full bg-volt text-dark-1 font-extrabold text-sm flex items-center gap-2 hover:bg-volt/90 shadow-xl shadow-volt/20 hover:scale-105 active:scale-95 transition-all shrink-0"
          >
            <span>Share Floor Plan on WhatsApp</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
