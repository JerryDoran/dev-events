import type { Metadata } from 'next';
import { Schibsted_Grotesk, Martian_Mono } from 'next/font/google';
// TypeScript may complain about the side-effect CSS import if no module declarations exist.
// Silence the error here since this is a valid Next.js global stylesheet.
// @ts-expect-error - Global CSS imports are valid in Next.js app directory
import './globals.css';
import LightRays from '@/components/light-rays';
import Header from '@/components/header';

const schibstedGrotesk = Schibsted_Grotesk({
  variable: '--font-schibsted-grotesk',
  subsets: ['latin'],
});

const martianMono = Martian_Mono({
  variable: '--font-martian_mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'DevEvent',
  description: 'The hub for every dev event that you cannot miss',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${schibstedGrotesk.variable} ${martianMono.variable} min-h-screen antialiased`}
      >
        <Header />
        <div className='absolute inset-0 z-[-1] min-h-screen'>
          <LightRays
            raysOrigin='top-center-offset'
            raysColor='#00ffff'
            raysSpeed={1}
            lightSpread={0.8}
            rayLength={2.5}
            followMouse={true}
            mouseInfluence={0.02}
            noiseAmount={0}
            distortion={0.01}
          />
        </div>
        <main>{children}</main>
      </body>
    </html>
  );
}
