'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Check, ShieldCheck } from 'lucide-react';

const CONSENT_COOKIE_NAME = 'vantech_cookie_consent';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = Cookies.get(CONSENT_COOKIE_NAME);
    if (!consent) {
      // Small delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const preferences = {
      essential: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    };
    Cookies.set(CONSENT_COOKIE_NAME, JSON.stringify(preferences), { expires: 365 });
    setIsVisible(false);
    
    // Trigger a custom event for other components to know consent changed
    window.dispatchEvent(new Event('cookieConsentChanged'));
  };

  const handleDecline = () => {
    const preferences = {
      essential: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    };
    Cookies.set(CONSENT_COOKIE_NAME, JSON.stringify(preferences), { expires: 365 });
    setIsVisible(false);
    window.dispatchEvent(new Event('cookieConsentChanged'));
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-6 left-6 right-6 z-[100] mx-auto max-w-4xl"
      >
        <div className="glass-panel overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/90 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4 lg:max-w-2xl">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-blue-600/20 text-blue-400">
                <Cookie className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">We value your privacy</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
                  Read our <Link href="/cookies" className="text-blue-400 underline hover:text-blue-300">Cookie Policy</Link> for more details.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 sm:flex-nowrap">
              <button
                onClick={handleDecline}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white sm:w-auto"
              >
                Reject All
              </button>
              <Link
                href="/cookies"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-center text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white sm:w-auto"
              >
                Preferences
              </Link>
              <button
                onClick={handleAcceptAll}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 hover:bg-blue-700 sm:w-auto"
              >
                <Check className="h-4 w-4" />
                Accept All
              </button>
            </div>
          </div>
          
          <button 
            onClick={() => setIsVisible(false)}
            className="absolute right-4 top-4 text-slate-500 hover:text-white"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
