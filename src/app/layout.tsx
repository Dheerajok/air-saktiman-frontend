import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { GamificationProvider } from '@/lib/gamification-context';
import { AppShell } from '@/components/layout/AppShell';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AirGuard - Play. Act. Breathe Better.',
  description: 'Gamified environmental climate platform for clean air missions, real-time AQI tracking, CSR impact, and community climate action.',
  keywords: ['Air Quality', 'AQI', 'Air Pollution', 'Climate Action', 'Environmental Missions', 'Gamification', 'CSR Funding', 'AirGuard'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen bg-[#F8FAFD] text-[#202124] antialiased">
        <GamificationProvider>
          <AppShell>{children}</AppShell>
        </GamificationProvider>
      </body>
    </html>
  );
}
