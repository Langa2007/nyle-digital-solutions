'use client';

import React, { useEffect, useState } from 'react';

interface CalendlyButtonProps {
  className?: string;
  children: React.ReactNode;
}

export default function CalendlyButton({ className, children }: CalendlyButtonProps) {
  const [calendly, setCalendly] = useState<any>(null);

  useEffect(() => {
    // Dynamically import react-calendly only on the client
    import('react-calendly').then((mod) => {
      setCalendly(mod);
    });
  }, []);

  const onClick = () => {
    const url = process.env.NEXT_PUBLIC_CALENDLY_URL;
    if (!url || url.includes('YOUR_USER')) {
      alert('Please configure your Calendly URL in the .env file.');
      return;
    }

    if (calendly && calendly.openPopupWidget) {
      calendly.openPopupWidget({
        url,
        rootElement: document.body,
      });
    } else if (!calendly) {
      console.warn('Calendly is still loading...');
    }
  };

  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
}
