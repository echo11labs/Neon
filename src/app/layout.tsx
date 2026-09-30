import type { Metadata } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LenisWrapper from '../components/LenisWrapper';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-heading' });
const inter = Inter({ subsets: ['latin'], variable: '--font-body' });

export const metadata: Metadata = {
  title: 'Neon Nepal | Premium Custom Neon Signs',
  description: 'Bespoke LED neon artistry, handcrafted in Nepal. Elevate your interior, business, or event with our premium glowing statements.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className={`${spaceGrotesk.variable} ${inter.variable} antialiased`}>
        <LenisWrapper>
          <div className="app">
            <Navbar />
            <main>{children}</main>
            <Footer />
          </div>
        </LenisWrapper>
      </body>
    </html>
  );
}
