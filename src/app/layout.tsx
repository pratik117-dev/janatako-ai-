import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import AuthProvider from '@/components/providers/AuthProvider';
import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: {
    default: "Jeevan KC's Portfolio",
    template: `%s | Jeevan KC`,
  },
  description: 'A personal portfolio website showcasing projects and skills by Jeevan KC, a computer engineer, IT entrepreneur, and software developer from Nepal.',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: "Jeevan KC's Portfolio",
    description: 'A personal portfolio website showcasing projects and skills by Jeevan KC, a computer engineer and software developer from Nepal.',
    type: 'website',
    locale: 'en_US',
    url: 'https://jeevan-kc.com.np',
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
        className={cn(
          GeistSans.variable,
          GeistMono.variable,
          'min-h-screen bg-background font-sans antialiased'
        )}
        suppressHydrationWarning
      >
        <AuthProvider>
          <Toaster richColors />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}