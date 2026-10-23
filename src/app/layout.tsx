import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Smart Home Monitoring System (OLED Dark Mode)',
  description:
    'Integrated IoT and CCTV Feed Analysis with OLED-Friendly True Black Mode for Maximum Power Efficiency.',
  keywords: ['smart home', 'IoT', 'CCTV', 'monitoring', 'automation', 'sensors', 'OLED', 'dark mode'],
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
    <html lang="en" className="dark oled" data-theme="oled" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('smart-home-theme');
                  var theme = saved || 'oled';
                  var root = document.documentElement;
                  root.setAttribute('data-theme', theme);
                  root.classList.remove('dark', 'light', 'oled');
                  if (theme === 'oled') {
                    root.classList.add('dark', 'oled');
                  } else if (theme === 'dark') {
                    root.classList.add('dark');
                  } else {
                    root.classList.add('light');
                  }
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
