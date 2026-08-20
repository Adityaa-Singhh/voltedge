import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

interface PWAContextType {
  isInstallable: boolean;
  isInstalled: boolean;
  isIOS: boolean;
  promptInstall: () => Promise<void>;
  showBanner: boolean;
  dismissBanner: () => void;
  isIOSModalOpen: boolean;
  setIsIOSModalOpen: (open: boolean) => void;
  isHelpModalOpen: boolean;
  setIsHelpModalOpen: (open: boolean) => void;
}

const PWAContext = createContext<PWAContextType | undefined>(undefined);

const DISMISS_KEY = 'saienterprises_pwa_dismiss_timestamp';
const TWENTY_FOUR_HOURS_MS = 24 * 60 * 60 * 1000;

export function PWAProvider({ children }: { children: ReactNode }) {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(true); // Default to true on web browsers
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [isIOSModalOpen, setIsIOSModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if already running in standalone mode (installed PWA)
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true;

    if (isStandalone) {
      setIsInstalled(true);
      setIsInstallable(false);
      return;
    }

    // Check if iOS device
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    // Check 24-hour dismissal cooldown
    const lastDismissed = localStorage.getItem(DISMISS_KEY);
    const now = Date.now();
    const isDismissCooldown =
      lastDismissed && now - Number(lastDismissed) < TWENTY_FOUR_HOURS_MS;

    // Handler for standard Chromium/Android beforeinstallprompt
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
      if (!isDismissCooldown) {
        setShowBanner(true);
      }
    };

    // Handler for when app is installed
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setShowBanner(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Show floating banner after 2.5 seconds if not on 24hr cooldown
    if (!isStandalone && !isDismissCooldown) {
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 2500);
      return () => clearTimeout(timer);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const promptInstall = async () => {
    if (isIOS) {
      setIsIOSModalOpen(true);
      return;
    }

    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        if (choice.outcome === 'accepted') {
          setIsInstalled(true);
          setShowBanner(false);
        }
        setDeferredPrompt(null);
      } catch (err) {
        console.warn('[PWA] Native install prompt error, showing guide:', err);
        setIsHelpModalOpen(true);
      }
    } else {
      // If browser hasn't fired beforeinstallprompt or doesn't support direct programmatic prompt
      setIsHelpModalOpen(true);
    }
  };

  const dismissBanner = () => {
    setShowBanner(false);
    localStorage.setItem(DISMISS_KEY, String(Date.now()));
  };

  return (
    <PWAContext.Provider
      value={{
        isInstallable,
        isInstalled,
        isIOS,
        promptInstall,
        showBanner,
        dismissBanner,
        isIOSModalOpen,
        setIsIOSModalOpen,
        isHelpModalOpen,
        setIsHelpModalOpen,
      }}
    >
      {children}
    </PWAContext.Provider>
  );
}

export function usePWA() {
  const context = useContext(PWAContext);
  if (!context) {
    throw new Error('usePWA must be used within a PWAProvider');
  }
  return context;
}
