'use client';

import React, { useState, useEffect } from 'react';
import Cookies from '../../../node_modules/@types/js-cookie';
import { motion } from 'framer-motion';
import { Shield, ShieldCheck, PieChart, Target, Info, Check } from 'lucide-react';
import toast from 'react-hot-toast';

const CONSENT_COOKIE_NAME = 'vantech_cookie_consent';

export default function CookiesPage() {
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = Cookies.get(CONSENT_COOKIE_NAME);
    if (consent) {
      try {
        const parsed = JSON.parse(consent);
        setPreferences({
          essential: true, // Always true
          analytics: !!parsed.analytics,
          marketing: !!parsed.marketing,
        });
      } catch (e) {
        console.error('Failed to parse cookie consent', e);
      }
    }
  }, []);

  const handleToggle = (key: 'analytics' | 'marketing') => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    const newConsent = {
      ...preferences,
      timestamp: new Date().toISOString(),
    };
    Cookies.set(CONSENT_COOKIE_NAME, JSON.stringify(newConsent), { expires: 365 });
    toast.success('Your cookie preferences have been saved.');
    window.dispatchEvent(new Event('cookieConsentChanged'));
  };

  const handleAcceptAll = () => {
    const allAccepted = {
      essential: true,
      analytics: true,
      marketing: true,
    };
    setPreferences(allAccepted);
    const newConsent = {
      ...allAccepted,
      timestamp: new Date().toISOString(),
    };
    Cookies.set(CONSENT_COOKIE_NAME, JSON.stringify(newConsent), { expires: 365 });
    toast.success('All cookies have been accepted.');
    window.dispatchEvent(new Event('cookieConsentChanged'));
  };

  return (
    <div className="min-h-screen pb-20 pt-10">
      <div className="section-shell">
        <div className="glass-panel rounded-[2rem] px-6 py-10 sm:px-10 lg:py-14">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-600 dark:text-blue-300">
              Privacy Control
            </p>
            <h1 className="mt-4 text-4xl font-semibold text-slate-950 dark:text-white sm:text-5xl">
              Cookie Policy & Preferences
            </h1>
            <p className="mt-5 text-lg text-slate-600 dark:text-slate-300">
              We use cookies to ensure our website works correctly and to understand how you interact with it. 
              You can manage your preferences below.
            </p>
          </div>

          <div className="mt-12 space-y-6">
            {/* Essential */}
            <div className="glass-panel relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/50 p-6 dark:bg-white/5 sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-slate-200 text-slate-600 dark:bg-white/10 dark:text-slate-400">
                    <Shield className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Essential Cookies</h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      Required for the website to function correctly. They cannot be disabled.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-500 dark:bg-white/10 dark:text-slate-400">
                  <Check className="h-4 w-4" />
                  Always Active
                </div>
              </div>
            </div>

            {/* Analytics */}
            <div className="glass-panel relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/50 p-6 dark:bg-white/5 sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                    <PieChart className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Analytics Cookies</h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      Help us understand how visitors use our site, so we can improve performance and content.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleToggle('analytics')}
                  className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    preferences.analytics ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-700'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      preferences.analytics ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Marketing */}
            <div className="glass-panel relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/50 p-6 dark:bg-white/5 sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400">
                    <Target className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Marketing Cookies</h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      Used to track visitors across websites to deliver relevant ads and marketing campaigns.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleToggle('marketing')}
                  className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    preferences.marketing ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-700'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      preferences.marketing ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <button
              onClick={handleSave}
              className="rounded-2xl border border-white/10 bg-slate-950 px-8 py-4 text-sm font-semibold text-white hover:bg-slate-900 dark:bg-white/5 dark:hover:bg-white/10"
            >
              Save Preferences
            </button>
            <button
              onClick={handleAcceptAll}
              className="rounded-2xl bg-blue-600 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 hover:bg-blue-700"
            >
              Accept All Cookies
            </button>
          </div>

          <div className="mt-12 rounded-[1.5rem] border border-blue-100 bg-blue-50/50 p-6 dark:border-white/10 dark:bg-white/5">
            <div className="flex items-start gap-4">
              <Info className="mt-1 h-5 w-5 text-blue-600 dark:text-blue-400" />
              <div>
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Security Note</h4>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  For your protection, we store authentication tokens in <strong>HTTP-only cookies</strong>. 
                  These are highly secure cookies that cannot be accessed by scripts, preventing common attacks like XSS. 
                  Unlike local storage, these cookies provide a professional standard of security for your account access.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
