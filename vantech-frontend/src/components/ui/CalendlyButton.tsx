'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import PopupModal with SSR disabled to prevent build-time errors
const PopupModal = dynamic(() => import('react-calendly').then((mod) => mod.PopupModal), {
  ssr: false,
});

interface CalendlyButtonProps {
  className?: string;
  children: React.ReactNode;
}

const logToBackend = async (level: string, message: string, meta?: any) => {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!backendUrl) return;

    await fetch(`${backendUrl}/logs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ level, message, meta, source: 'frontend' }),
    });
  } catch (err) {
    // Fail silently
  }
};

export default function CalendlyButton({ className, children }: CalendlyButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [rootElement, setRootElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // Set the root element only after the component mounts on the client
    setRootElement(document.body);
  }, []);

  const url = process.env.NEXT_PUBLIC_CALENDLY_URL || '';

  const handleOpen = async () => {
    console.log('[Calendly] Clicked. URL:', url);

    if (!url || url.includes('YOUR_USER')) {
      const msg = 'Calendly URL is missing or unconfigured.';
      console.warn(msg);
      await logToBackend('warn', msg, { url });
      return;
    }

    setIsOpen(true);
    await logToBackend('info', 'Calendly modal triggered', { url });
  };

  return (
    <>
      <button onClick={handleOpen} className={className}>
        {children}
      </button>
      {rootElement && (
        <PopupModal
          url={url}
          onModalClose={() => setIsOpen(false)}
          open={isOpen}
          rootElement={rootElement}
        />
      )}
    </>
  );
}
