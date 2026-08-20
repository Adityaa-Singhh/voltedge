import { Mic, MicOff, AlertCircle } from 'lucide-react';
import { useVoiceSearch } from '../hooks/useVoiceSearch';
import { AnimatePresence, motion } from 'framer-motion';

interface VoiceSearchButtonProps {
  onSearchResult: (text: string) => void;
  className?: string;
}

export function VoiceSearchButton({ onSearchResult, className = '' }: VoiceSearchButtonProps) {
  const { isListening, isSupported, errorMessage, startListening, stopListening, clearError } =
    useVoiceSearch((text) => {
      onSearchResult(text);
    });

  if (!isSupported) return null;

  return (
    <div className={`relative inline-flex items-center ${className}`}>
      <button
        type="button"
        onClick={isListening ? stopListening : startListening}
        className={`p-1.5 rounded-full transition-all duration-300 relative group ${
          isListening
            ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30 scale-110 animate-pulse'
            : 'text-slate-400 hover:text-volt hover:bg-white/10'
        }`}
        title={isListening ? 'Stop listening' : 'Voice Search (Speak product or brand)'}
        aria-label="Voice search products"
      >
        {isListening ? (
          <MicOff className="w-4 h-4 text-white" />
        ) : (
          <Mic className="w-4 h-4 text-slate-400 group-hover:text-volt transition-colors" />
        )}

        {isListening && (
          <span className="absolute -inset-1 rounded-full border-2 border-rose-400 animate-ping pointer-events-none" />
        )}
      </button>

      {/* Listening State Overlay / Tooltip */}
      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full right-0 mt-3 w-64 p-3.5 rounded-2xl bg-dark-2/95 backdrop-blur-xl border border-volt/40 shadow-2xl shadow-volt/20 z-50 text-left"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span className="flex h-2.5 w-2.5 rounded-full bg-rose-500 animate-ping" />
              <p className="text-xs font-bold text-white flex items-center gap-1.5">
                Listening to your voice...
              </p>
            </div>
            <p className="text-[11px] text-slate-400 leading-snug">
              Speak a product or brand name (e.g. <span className="text-volt">"Havells 2.5 wire"</span> or <span className="text-volt">"16A switch"</span>)
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Message Toast */}
      <AnimatePresence>
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full right-0 mt-3 w-72 p-3 rounded-xl bg-dark-2/95 border border-rose-500/40 text-left shadow-2xl z-50 flex items-start gap-2.5"
          >
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-xs text-rose-200">{errorMessage}</p>
              <button
                onClick={clearError}
                className="text-[10px] text-slate-400 hover:text-white mt-1 underline"
              >
                Dismiss
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
