'use client';

import React, { useEffect, useState } from 'react';

interface CalendlyButtonProps {
  className?: string;
  children: React.ReactNode;
}

export default function CalendlyButton({ className, children }: CalendlyButtonProps) {
  const [calendly, setCalendly] = useState<any>(null);

  useEffect(() => {
    import('react-calendly').then((mod) => {
      setCalendly(mod);
    });
  }, []);

  const onClick = () => {
    const url = process.env.NEXT_PUBLIC_CALENDLY_URL;
    
    if (!url || url.includes('YOUR_USER')) {
      console.warn('Calendly URL is not configured. Please add NEXT_PUBLIC_CALENDLY_URL to your environment variables.');
      // Optionally fallback to a contact link if needed, but staying silent for now to avoid bad UX
      return;
    }

    if (calendly && calendly.openPopupWidget) {
      calendly.openPopupWidget({
        url,
        rootElement: document.body,
      });
    }
  };

  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
}
