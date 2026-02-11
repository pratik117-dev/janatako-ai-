import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import AuthProvider from '@/components/providers/AuthProvider';
import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: {
    default: "जनताको AI",
    template: `%s | जनताको AI`,
  },
  description: 'जनताको AI - नेपालको तथ्य-आधारित विश्लेषण र अन्तर्क्रियात्मक परियोजनाहरूको लागि नेपाली वेबसाइट',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: "जनताको AI",
    description: 'जनताको AI - नेपालको तथ्य-आधारित विश्लेषण र अन्तर्क्रियात्मक परियोजनाहरूको लागि नेपाली वेबसाइट',
    type: 'website',
    locale: 'ne_NP',
    url: 'https://janatakoai.com',
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