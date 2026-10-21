'use client';

import React from 'react';
import { Home, Camera, Bell, Thermometer } from 'lucide-react';

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
  bgColor: string;
  iconColor: string;
}

function StatCard({ icon, label, value, bgColor, iconColor }: StatCardProps) {
  return (
    <div className={`rounded-xl p-4 ${bgColor} border border-slate-700/30`}>
      <div className="flex items-center gap-3">
        <div className={`p-2.5 rounded-lg bg-slate-800/50 ${iconColor}`}>{icon}</div>
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wider">{label}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
        </div>
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
        bgColor="bg-blue-500/10"
        iconColor="text-blue-400"
      />
      <StatCard
        icon={<Camera className="w-5 h-5" />}
        label="Cameras Online"
        value={onlineCameras}
        bgColor="bg-green-500/10"
        iconColor="text-green-400"
      />
      <StatCard
        icon={<Bell className="w-5 h-5" />}
        label="Active Alerts"
        value={activeAlerts}
        bgColor={activeAlerts > 0 ? 'bg-red-500/10' : 'bg-amber-500/10'}
        iconColor={activeAlerts > 0 ? 'text-red-400' : 'text-amber-400'}
      />
      <StatCard
        icon={<Thermometer className="w-5 h-5" />}
        label="Avg Temperature"
        value={`${averageTemperature.toFixed(1)}°`}
        bgColor="bg-teal-500/10"
        iconColor="text-teal-400"
      />
    </div>
  );
}
