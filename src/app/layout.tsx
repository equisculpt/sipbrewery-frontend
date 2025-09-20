import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import FSIChatbot from '../components/FSIChatbot'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "SIPBrewery - AI-Powered Smart SIP Platform",
  description: "Transform your investments with AI-powered Smart SIPs. SEBI registered, trusted by investors.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        {children}
        <FSIChatbot />
      </body>
    </html>
  );
}
