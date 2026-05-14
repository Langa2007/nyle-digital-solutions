'use client';

import React from 'react';
import { openPopupWidget } from 'react-calendly';

interface CalendlyButtonProps {
  className?: string;
  children: React.ReactNode;
}

export default function CalendlyButton({ className, children }: CalendlyButtonProps) {
  const onClick = () => {
    const url = process.env.NEXT_PUBLIC_CALENDLY_URL;
    if (!url || url.includes('YOUR_USER')) {
      alert('Please configure your Calendly URL in the .env file.');
      return;
    }

    if (typeof window !== 'undefined') {
      openPopupWidget({
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
