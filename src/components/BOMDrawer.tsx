import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  X,
  Plus,
  Minus,
  Trash2,
  Send,
  Copy,
  Check,
  Building2,
  User,
  Sparkles,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { useBOM } from '../context/BOMContext';
import { businessInfo } from '../data';
import { trackEvent } from '../services/analyticsService';

export function BOMFloatingTrigger() {
  const { totalCount, setIsOpen } = useBOM();

  if (totalCount === 0) return null;

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => {
        trackEvent('open_bom_drawer', { source: 'floating_trigger' });
        setIsOpen(true);
      }}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-3 px-4 py-3 rounded-full bg-dark-2/95 dark:bg-dark-2/95 backdrop-blur-xl border border-volt/40 shadow-2xl shadow-volt/20 group hover:border-volt transition-all duration-300"
      aria-label="View Quotation List"
    >
      <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-volt/15 text-volt border border-volt/30 group-hover:bg-volt group-hover:text-dark-1 transition-all">
        <FileText className="w-4 h-4" />
        <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-volt text-[10px] font-bold text-dark-1 ring-2 ring-dark-1 animate-pulse">
          {totalCount}
        </span>
      </div>
      <div className="text-left pr-1 hidden sm:block">
        <p className="text-[10px] font-mono tracking-wider uppercase text-volt font-semibold leading-none">
          Material List
        </p>
        <p className="text-xs font-bold text-slate-200 group-hover:text-white transition-colors">
          {totalCount} {totalCount === 1 ? 'Item' : 'Items'} Ready
        </p>
      </div>
      <ArrowRight className="w-3.5 h-3.5 text-volt/70 group-hover:translate-x-0.5 transition-transform" />
    </motion.button>
  );
}

export function BOMDrawer() {
  const { items, removeItem, updateQuantity, clearBOM, isOpen, setIsOpen, totalCount, addItem } = useBOM();
  const [projectName, setProjectName] = useState('');
  const [contractorName, setContractorName] = useState('');
  const [customItemText, setCustomItemText] = useState('');
  const [copied, setCopied] = useState(false);

  const generateWhatsAppMessage = () => {
    let msg = `*⚡ TRADE QUOTATION ESTIMATE — SAI ENTERPRISES*\n`;
    msg += `------------------------------------\n`;
    if (projectName.trim()) {
      msg += `📌 *Project / Site:* ${projectName.trim()}\n`;
    }
    if (contractorName.trim()) {
      msg += `👤 *Client / Contractor:* ${contractorName.trim()}\n`;
    }
    msg += `📅 *Date:* ${new Date().toLocaleDateString('en-IN')}\n`;
    msg += `------------------------------------\n\n`;
    msg += `*REQUIRED MATERIALS (${totalCount} Units):*\n\n`;

    items.forEach((item, index) => {
      msg += `${index + 1}. *${item.name}*\n`;
      msg += `   • Brand: ${item.brand || 'Standard'}\n`;
      msg += `   • Quantity: *${item.quantity} ${item.unit || 'Pcs'}*\n`;
      if (item.specs) {
        msg += `   • Specs: ${item.specs}\n`;
      }
      msg += `\n`;
    });

    msg += `------------------------------------\n`;
    msg += `Please provide your best wholesale pricing and stock availability for the above items.\n\n`;
    msg += `Sent via Sai Enterprises Digital Trade Desk`;

    return msg;
  };

  const handleSendWhatsApp = () => {
    trackEvent('send_bom_whatsapp', { source: 'bom_drawer' });
    const msg = generateWhatsAppMessage();
    const encoded = encodeURIComponent(msg);
    const url = `https://wa.me/${businessInfo.whatsappRaw}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCopy = () => {
    const msg = generateWhatsAppMessage();
    navigator.clipboard.writeText(msg);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleAddCustomItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customItemText.trim()) return;
    addItem(
      {
        id: `custom-${Date.now()}`,
        name: customItemText.trim(),
        brand: 'Custom / Site Request',
        category: 'Custom Item',
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80',
      },
      1,
      'Pcs'
    );
    setCustomItemText('');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        />

        {/* Drawer Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 280 }}
          className="relative z-10 w-full max-w-lg h-full bg-dark-0 text-white border-l border-white/20 shadow-2xl flex flex-col justify-between overflow-hidden"
        >
          {/* Header */}
          <div className="p-5 border-b border-white/20 bg-dark-2/90 backdrop-blur-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-volt/20 border border-volt/50 flex items-center justify-center text-volt shadow-lg shadow-volt/20">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                  Quotation Estimate <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-volt/20 text-volt border border-volt/40">{totalCount} {totalCount === 1 ? 'item' : 'items'}</span>
                </h3>
                <p className="text-xs text-slate-300 font-medium">
                  Compile your electrical bill of materials & get instant pricing
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5 custom-scrollbar bg-dark-1/80">
            {/* Optional Project Meta */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-dark-2 border border-white/15 shadow-md">
              <div>
                <label className="block text-[11px] font-mono font-bold uppercase text-slate-200 mb-1.5 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-volt" /> Site / Project Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. 3BHK Flat, Rourkela"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl bg-dark-3 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-volt focus:ring-1 focus:ring-volt transition-colors"
                />
              </div>
              <div>
                <label className="block text-[11px] font-mono font-bold uppercase text-slate-200 mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-volt" /> Your Name / Contractor
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rajesh Sharma"
                  value={contractorName}
                  onChange={(e) => setContractorName(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl bg-dark-3 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-volt focus:ring-1 focus:ring-volt transition-colors"
                />
              </div>
            </div>

            {/* Quick Add Custom Item Bar */}
            <form onSubmit={handleAddCustomItem} className="flex gap-2">
              <input
                type="text"
                placeholder="+ Add custom requirement (e.g. 25mm PVC Pipe 10pcs)"
                value={customItemText}
                onChange={(e) => setCustomItemText(e.target.value)}
                className="flex-1 text-xs px-3.5 py-2.5 rounded-xl bg-dark-2 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-volt focus:ring-1 focus:ring-volt transition-colors"
              />
              <button
                type="submit"
                disabled={!customItemText.trim()}
                className="px-4 py-2.5 text-xs font-bold rounded-xl bg-volt text-dark-1 hover:bg-volt/90 disabled:opacity-40 disabled:pointer-events-none transition-all shadow-md shadow-volt/20"
              >
                Add
              </button>
            </form>

            {/* Item List */}
            {items.length === 0 ? (
              <div className="text-center py-12 px-4 border border-dashed border-white/20 rounded-2xl bg-dark-2/40">
                <Layers className="w-12 h-12 text-slate-500 mx-auto mb-3" />
                <h4 className="text-sm font-bold text-slate-100">Your quotation list is empty</h4>
                <p className="text-xs text-slate-300 mt-1 max-w-xs mx-auto">
                  Browse products and tap <span className="text-volt font-bold">+ Add to Quote</span> to compile your material requirements.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-200 px-1">
                  <span>Selected Products ({items.length})</span>
                  <button
                    onClick={clearBOM}
                    className="text-[11px] font-bold text-rose-400 hover:text-rose-300 transition-colors"
                  >
                    Clear All
                  </button>
                </div>

                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-3.5 rounded-2xl bg-dark-2/95 border border-white/15 hover:border-volt/40 transition-all group shadow-md"
                  >
                    {/* Thumbnail */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 rounded-xl object-cover bg-dark-3 border border-white/10 shrink-0"
                    />

                    {/* Title & Brand */}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-white truncate group-hover:text-volt transition-colors">
                        {item.name}
                      </p>
                      <p className="text-[11px] text-slate-300 mt-0.5">
                        Brand: <span className="text-volt font-bold">{item.brand}</span>
                      </p>
                      {item.specs && (
                        <p className="text-[10px] text-emerald-400 font-mono truncate mt-0.5">{item.specs}</p>
                      )}
                    </div>

                    {/* Quantity Stepper */}
                    <div className="flex items-center gap-1.5 bg-dark-3 px-2 py-1 rounded-xl border border-white/20 shrink-0">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-mono font-extrabold text-volt min-w-[22px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Delete */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-400 rounded-xl hover:bg-rose-500/10 transition-colors shrink-0"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Controls */}
          {items.length > 0 && (
            <div className="p-5 border-t border-white/20 bg-dark-2/95 backdrop-blur-xl space-y-3">
              <button
                onClick={handleSendWhatsApp}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-extrabold text-sm shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all"
              >
                <Send className="w-4 h-4" />
                Send Material Estimate on WhatsApp
              </button>

              <div className="flex items-center justify-between gap-2">
                <button
                  onClick={handleCopy}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-dark-3 border border-white/20 hover:border-white/30 text-xs font-bold text-slate-200 hover:text-white transition-all"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-300" />
                      <span>Copy Text Summary</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                >
                  Continue Browsing
                </button>
              </div>

              <p className="text-[10px] text-center text-slate-400 flex items-center justify-center gap-1">
                <Sparkles className="w-3 h-3 text-volt" /> Direct wholesale pricing from Sai Enterprises Trade Desk
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
