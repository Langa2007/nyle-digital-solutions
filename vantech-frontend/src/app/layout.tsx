import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CookieConsent from '@/components/ui/CookieConsent';
import { ReactQueryProvider } from '@/components/providers/react-query-provider';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';

import Vantech3DBackground from '@/components/ui/Vantech3DBackground';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://vantech-software-solutions.vercel.app';

export const metadata: Metadata = {
  title: 'Vantech Software Solutions | Software, Cloud and Product Delivery',
  description:
    'Vantech Software Solutions builds modern web platforms, mobile products, cloud systems, and digital operations with a sharp blue-forward brand experience.',
  keywords:
    'software development, web applications, mobile apps, cloud infrastructure, product engineering',
  authors: [{ name: 'Vantech Software Solutions' }],
  creator: 'Vantech Software Solutions',
  publisher: 'Vantech Software Solutions',
  metadataBase: new URL(siteUrl),
  icons: {
    icon: [
      { url: '/vantech-favicon.png', type: 'image/png' },
    ],
    shortcut: '/vantech-favicon.png',
    apple: '/vantech-favicon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: 'Vantech Software Solutions | Software, Cloud and Product Delivery',
    description:
      'Digital products, cloud systems, and business platforms designed for teams that need momentum.',
    siteName: 'Vantech Software Solutions',
    images: [
      {
        url: '/vantech-logo.png',
        width: 400,
        height: 400,
        alt: 'Vantech Softwares logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vantech Software Solutions | Software, Cloud and Product Delivery',
    description:
      'Digital products, cloud systems, and business platforms designed for teams that need momentum.',
    creator: '@vantechsoftwares',
    images: ['/vantech-logo.png'],
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-slate-950 font-sans text-slate-100 antialiased`}
      >
        <ReactQueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SmoothScrollProvider>
              <div className="site-frame relative flex min-h-screen flex-col overflow-hidden">
                <Vantech3DBackground />
                <Navbar />
                <main className="relative z-10 flex-grow">{children}</main>
                <Footer />
                <CookieConsent />
              </div>
            </SmoothScrollProvider>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#0f172a',
                  color: '#e2e8f0',
                  border: '1px solid rgba(148, 163, 184, 0.18)',
                },
                success: {
                  duration: 3000,
                  iconTheme: {
                    primary: '#2563eb',
                    secondary: '#eff6ff',
                  },
                },
                error: {
                  duration: 4000,
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#fff',
                  },
                },
              }}
            />
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
