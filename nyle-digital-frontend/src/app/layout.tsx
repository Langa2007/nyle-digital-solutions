import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ReactQueryProvider } from '@/components/providers/react-query-provider';

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
  process.env.NEXT_PUBLIC_SITE_URL || 'https://nyle-digital-solutions.vercel.app';

export const metadata: Metadata = {
  title: 'Nyle Digital Solutions | Software, Cloud and Product Delivery',
  description:
    'Nyle Digital builds modern web platforms, mobile products, cloud systems, and digital operations with a sharp blue-forward brand experience.',
  keywords:
    'software development, web applications, mobile apps, cloud infrastructure, product engineering',
  authors: [{ name: 'Nyle Digital Solutions' }],
  creator: 'Nyle Digital Solutions',
  publisher: 'Nyle Digital Solutions',
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: 'Nyle Digital Solutions | Software, Cloud and Product Delivery',
    description:
      'Digital products, cloud systems, and business platforms designed for teams that need momentum.',
    siteName: 'Nyle Digital Solutions',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nyle Digital Solutions | Software, Cloud and Product Delivery',
    description:
      'Digital products, cloud systems, and business platforms designed for teams that need momentum.',
    creator: '@nyledigital',
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
            <div className="relative flex min-h-screen flex-col overflow-hidden">
              <Navbar />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
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
