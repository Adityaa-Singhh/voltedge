import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Zap, Share2, PlusSquare, Sparkles, MoreVertical, Smartphone } from 'lucide-react';
import { usePWA } from '../context/PWAContext';

export function PWAPrompt() {
  const {
    showBanner,
    dismissBanner,
    promptInstall,
    isIOSModalOpen,
    setIsIOSModalOpen,
    isHelpModalOpen,
    setIsHelpModalOpen,
    isInstalled,
  } = usePWA();

  if (isInstalled) return null;

  return (
    <>
      {/* 1. Bottom Slide-Up Floating PWA Banner (24hr cooldown on dismiss) */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-40 p-3.5 sm:p-4 rounded-3xl bg-dark-2/95 backdrop-blur-2xl border border-volt/40 shadow-2xl shadow-volt/20 flex items-center justify-between gap-3"
          >
            {/* App Icon */}
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-volt to-volt-dim flex items-center justify-center text-dark-0 shadow-lg shadow-volt/30 shrink-0">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                  Install Sai Enterprises App
                </h4>
                <span className="text-[9px] font-mono font-bold text-volt px-1.5 py-0.2 rounded-full bg-volt/10 border border-volt/30">
                  FAST
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-tight mt-0.5 line-clamp-1">
                Instant catalog access & offline load calculations
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={promptInstall}
                className="px-3.5 py-2 rounded-xl bg-volt text-dark-1 font-extrabold text-xs flex items-center gap-1.5 hover:bg-volt/90 shadow-md shadow-volt/20 hover:scale-105 active:scale-95 transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Install</span>
              </button>

              <button
                onClick={dismissBanner}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Dismiss app install banner for 24 hours"
                title="Dismiss for 24 hours"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. iOS Safari Step-by-Step Installation Modal */}
      <AnimatePresence>
        {isIOSModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsIOSModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative z-10 w-full max-w-sm p-6 rounded-3xl bg-dark-2 border border-white/15 shadow-2xl text-center space-y-5"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-volt to-volt-dim flex items-center justify-center text-dark-0 mx-auto shadow-xl shadow-volt/30">
                <Zap className="w-7 h-7" strokeWidth={2.5} />
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  Install on iPhone / iPad
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Add Sai Enterprises to your home screen for quick offline access.
                </p>
              </div>

              {/* Steps */}
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-dark-3/60 border border-white/5">
                  <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-volt shrink-0">
                    <Share2 className="w-4 h-4" />
                  </div>
                  <p className="text-xs text-slate-300">
                    1. Tap the <strong className="text-white">Share</strong> button in Safari toolbar.
                  </p>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-dark-3/60 border border-white/5">
                  <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-volt shrink-0">
                    <PlusSquare className="w-4 h-4" />
                  </div>
                  <p className="text-xs text-slate-300">
                    2. Scroll down and tap <strong className="text-white">"Add to Home Screen"</strong>.
                  </p>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-dark-3/60 border border-white/5">
                  <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-volt shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <p className="text-xs text-slate-300">
                    3. Tap <strong className="text-white">"Add"</strong> at the top right.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsIOSModalOpen(false)}
                className="w-full py-3 rounded-xl bg-volt text-dark-1 font-bold text-xs hover:bg-volt/90 transition-colors shadow-lg shadow-volt/20"
              >
                Got It!
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. Android / Chrome / Edge Manual Help Modal */}
      <AnimatePresence>
        {isHelpModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsHelpModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative z-10 w-full max-w-sm p-6 rounded-3xl bg-dark-2 border border-white/15 shadow-2xl text-center space-y-5"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-volt to-volt-dim flex items-center justify-center text-dark-0 mx-auto shadow-xl shadow-volt/30">
                <Smartphone className="w-7 h-7" strokeWidth={2.5} />
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  Add Sai Enterprises to Home Screen
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Enjoy instantaneous loading, offline catalogue browsing, and easy trade enquiries.
                </p>
              </div>

              {/* Steps */}
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-dark-3/60 border border-white/5">
                  <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-volt shrink-0">
                    <MoreVertical className="w-4 h-4" />
                  </div>
                  <p className="text-xs text-slate-300">
                    1. Tap the <strong className="text-white">menu button (⋮)</strong> at the top right of your browser.
                  </p>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-dark-3/60 border border-white/5">
                  <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-volt shrink-0">
                    <Download className="w-4 h-4" />
                  </div>
                  <p className="text-xs text-slate-300">
                    2. Select <strong className="text-white">"Install app"</strong> or <strong className="text-white">"Add to Home screen"</strong>.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsHelpModalOpen(false)}
                className="w-full py-3 rounded-xl bg-volt text-dark-1 font-bold text-xs hover:bg-volt/90 transition-colors shadow-lg shadow-volt/20"
              >
                Got It!
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

// Button for Mobile Drawer or Pages
export function PWAInstallButton({ className = '' }: { className?: string }) {
  const { isInstalled, promptInstall } = usePWA();

  if (isInstalled) return null;

  return (
    <button
      onClick={promptInstall}
      className={`flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-volt/20 to-volt-dim/20 text-volt border border-volt/40 hover:border-volt hover:bg-volt hover:text-dark-1 font-extrabold text-xs transition-all active:scale-95 shadow-md shadow-volt/10 ${className}`}
      title="Install Sai Enterprises Web App"
      aria-label="Install App"
    >
      <Download className="w-4 h-4" />
      <span>Install Sai Enterprises App</span>
    </button>
  );
}

// Compact Button for Header / Navbar
export function PWANavbarButton({ className = '' }: { className?: string }) {
  const { isInstalled, promptInstall } = usePWA();

  if (isInstalled) return null;

  return (
    <button
      onClick={promptInstall}
      className={`liquid-glass text-volt text-xs font-bold px-2.5 sm:px-3 py-2 rounded-2xl hover:bg-volt/15 border border-volt/30 flex items-center gap-1.5 transition-all active:scale-95 ${className}`}
      title="Install Web App"
      aria-label="Install App"
    >
      <Download size={13} className="text-volt" />
      <span className="hidden sm:inline">Install</span>
    </button>
  );
}
