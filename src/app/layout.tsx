import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Smart Home Monitoring System',
  description:
    'Real-time IoT sensor telemetry, actuator control, and 24/7 CCTV surveillance dashboard.',
  keywords: ['smart home', 'IoT', 'CCTV', 'monitoring', 'automation', 'sensors', 'telemetry'],
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
    <html lang="en" className="dark" data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('smart-home-theme');
                  var theme = saved === 'light' ? 'light' : 'dark';
                  var root = document.documentElement;
                  root.setAttribute('data-theme', theme);
                  root.classList.remove('dark', 'light');
                  root.classList.add(theme);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.className} min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)] antialiased transition-colors duration-200`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
