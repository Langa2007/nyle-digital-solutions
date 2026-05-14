'use client';

import React, { useEffect, useState } from 'react';

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
    // Fail silently to avoid blocking UX
  }
};

export default function CalendlyButton({ className, children }: CalendlyButtonProps) {
  const [calendly, setCalendly] = useState<any>(null);

  useEffect(() => {
    import('react-calendly').then((mod) => {
      setCalendly(mod);
    });
  }, []);

  const onClick = async () => {
    const url = process.env.NEXT_PUBLIC_CALENDLY_URL;
    
    // Immediate console log for local debugging
    console.log('[Calendly] Button clicked. URL:', url);

    if (!url || url.includes('YOUR_USER')) {
      const msg = 'Calendly URL is missing or unconfigured.';
      console.warn(msg);
      await logToBackend('warn', msg, { url });
      return;
    }

    if (calendly && calendly.openPopupWidget) {
      try {
        calendly.openPopupWidget({
          url,
          rootElement: document.body,
        });
        await logToBackend('info', 'Calendly popup opened successfully', { url });
      } catch (err: any) {
        const msg = `Failed to open Calendly popup: ${err.message}`;
        console.error(msg);
        await logToBackend('error', msg, { stack: err.stack });
      }
    } else {
      const msg = calendly ? 'openPopupWidget is missing in library' : 'Calendly library not loaded yet';
      console.warn(msg);
      await logToBackend('warn', msg);
    }
  };

  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
}
