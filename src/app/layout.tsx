import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Smart Home Monitoring System',
  description:
    'Integrated IoT and CCTV Feed Analysis — Monitor and control your smart home from anywhere.',
  keywords: ['smart home', 'IoT', 'CCTV', 'monitoring', 'automation', 'sensors'],
  authors: [
    { name: 'Venkata Rao Dechiraju' },
    { name: 'Sivanesan' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-slate-950 text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
