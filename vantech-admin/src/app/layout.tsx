import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '../components/providers/AuthProvider';
import { ReactQueryProvider } from '@/components/providers/ReactQueryProvider';

export const metadata: Metadata = {
  title: 'Vantech Software Solutions Admin',
  description: 'Admin dashboard for Vantech Software Solutions',
  icons: {
    icon: [{ url: '/vantech-favicon.png', type: 'image/png' }],
    shortcut: '/vantech-favicon.png',
    apple: '/vantech-favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/vantech-favicon.png" type="image/png" />
        <link rel="shortcut icon" href="/vantech-favicon.png" />
        <link rel="apple-touch-icon" href="/vantech-favicon.png" />
      </head>
      <body className="bg-[var(--color-admin-bg)] text-[var(--color-admin-ink)]">
        <ReactQueryProvider>
          <AuthProvider>
            {children}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#0f172a',
                  color: '#e2e8f0',
                  border: '1px solid rgba(148, 163, 184, 0.18)',
                },
              }}
            />
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
