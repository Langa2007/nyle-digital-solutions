'use client';

import React from 'react';

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
  const onClick = async () => {
    const url = process.env.NEXT_PUBLIC_CALENDLY_URL;
    
    console.log('[Calendly] Button clicked. URL:', url);

    if (!url || url.includes('YOUR_USER')) {
      const msg = 'Calendly URL is missing or unconfigured.';
      console.warn(msg);
      await logToBackend('warn', msg, { url });
      return;
    }

    try {
      // Import dynamically inside the handler to ensure we get the named exports correctly
      const CalendlyModule = await import('react-calendly');
      
      // Some versions of the library or build tools might put named exports under .default
      const openPopupWidget = CalendlyModule.openPopupWidget || (CalendlyModule as any).default?.openPopupWidget;

      if (openPopupWidget) {
        openPopupWidget({
          url,
          rootElement: document.body,
        });
        await logToBackend('info', 'Calendly popup opened successfully', { url });
      } else {
        const msg = 'openPopupWidget is missing in library exports';
        // Log the keys to see what is available
        const keys = Object.keys(CalendlyModule);
        console.error(msg, keys);
        await logToBackend('error', msg, { availableKeys: keys });
      }
    } catch (err: any) {
      const msg = `Failed to load or open Calendly: ${err.message}`;
      console.error(msg);
      await logToBackend('error', msg, { stack: err.stack });
    }
  };

  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
}
