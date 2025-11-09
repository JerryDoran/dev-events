import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
// TypeScript may complain about the side-effect CSS import if no module declarations exist.
// Silence the error here since this is a valid Next.js global stylesheet.
// @ts-expect-error - Global CSS imports are valid in Next.js app directory
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Next.js 16 Demo',
  description: 'New next version for learning new things',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
