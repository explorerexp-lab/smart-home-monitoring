'use client';

import React from 'react';
import { Home, Camera, Bell, Thermometer } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface StatusOverviewProps {
  roomsCount: number;
  onlineCameras: number;
  activeAlerts: number;
  averageTemperature: number;
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  accentBg: string;
  iconColor: string;
  badge?: string;
}

function StatCard({ icon, label, value, accentBg, iconColor, badge }: StatCardProps) {
  const { isOLED } = useTheme();

  return (
    <div
      className={`rounded-xl p-4 bg-[var(--bg-card)] border border-[var(--border-color)] transition-all duration-300 hover:-translate-y-0.5 ${
        isOLED
          ? 'hover:border-zinc-700 hover:shadow-[0_0_20px_rgba(0,0,0,0.8)]'
          : 'hover:shadow-md'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-lg ${accentBg} ${iconColor} border border-transparent`}>
            {icon}
          </div>
          <div>
            <p className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] font-semibold">
              {label}
            </p>
            <p className="text-2xl font-bold text-[var(--text-primary)] font-mono tracking-tight">
              {value}
            </p>
          </div>
        </div>
        {badge && (
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            {badge}
          </span>
        )}
      </div>
    </div>
  );
}

export default function StatusOverview({
  roomsCount,
  onlineCameras,
  activeAlerts,
  averageTemperature,
}: StatusOverviewProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatCard
        icon={<Home className="w-5 h-5" />}
        label="Total Rooms"
        value={roomsCount}
        accentBg="bg-blue-500/15"
        iconColor="text-blue-400"
      />
      <StatCard
        icon={<Camera className="w-5 h-5" />}
        label="Cameras Online"
        value={onlineCameras}
        accentBg="bg-emerald-500/15"
        iconColor="text-emerald-400"
        badge="24/7 Live"
      />
      <StatCard
        icon={<Bell className="w-5 h-5" />}
        label="Active Alerts"
        value={activeAlerts}
        accentBg={activeAlerts > 0 ? 'bg-red-500/15' : 'bg-amber-500/15'}
        iconColor={activeAlerts > 0 ? 'text-red-400' : 'text-amber-400'}
        badge={activeAlerts > 0 ? 'Needs Attention' : 'Nominal'}
      />
      <StatCard
        icon={<Thermometer className="w-5 h-5" />}
        label="Avg Temperature"
        value={`${averageTemperature.toFixed(1)}°C`}
        accentBg="bg-teal-500/15"
        iconColor="text-teal-400"
      />
    </div>
  );
}
