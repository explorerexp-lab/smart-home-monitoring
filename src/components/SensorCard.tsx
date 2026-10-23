'use client';

import React from 'react';
import {
  Thermometer,
  Droplets,
  Sun,
  Activity,
  Lightbulb,
  LightbulbOff,
  Lock,
  Unlock,
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface SensorCardProps {
  room: string;
  icon: React.ReactNode;
  temperature: number;
  humidity: number;
  light: number;
  motion: boolean;
  lightsOn: boolean;
  locked: boolean;
  thermostatTarget: number;
  onToggleLight: () => void;
  onToggleLock: () => void;
}

function getTemperatureColor(temp: number): string {
  if (temp < 20) return 'text-blue-400';
  if (temp <= 28) return 'text-emerald-400';
  return 'text-rose-400';
}

function getTemperatureBg(temp: number): string {
  if (temp < 20) return 'bg-blue-500/10 border-blue-500/20';
  if (temp <= 28) return 'bg-emerald-500/10 border-emerald-500/20';
  return 'bg-rose-500/10 border-rose-500/20';
}

export default function SensorCard({
  room,
  icon,
  temperature,
  humidity,
  light,
  motion,
  lightsOn,
  locked,
  thermostatTarget,
  onToggleLight,
  onToggleLock,
}: SensorCardProps) {
  const { isOLED } = useTheme();

  return (
    <div
      className={`bg-[var(--bg-card)] rounded-xl p-5 border border-[var(--border-color)] transition-all duration-300 hover:-translate-y-0.5 ${
        isOLED
          ? 'hover:border-zinc-700 hover:shadow-[0_0_20px_rgba(0,0,0,0.9)]'
          : 'hover:shadow-lg hover:shadow-slate-900/20'
      }`}
    >
      {/* Room Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-lg">
            {icon}
          </div>
          <h3 className="text-base font-semibold text-[var(--text-primary)]">{room}</h3>
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className={`w-2 h-2 rounded-full ${
              motion ? 'bg-emerald-400 shadow-[0_0_8px_#10b981]' : 'bg-zinc-600'
            }`}
          />
          <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase">
            {motion ? 'Active' : 'Idle'}
          </span>
        </div>
      </div>

      {/* Sensor Grid */}
      <div className="grid grid-cols-2 gap-2.5 mb-4">
        {/* Temperature */}
        <div className={`rounded-lg p-2.5 border ${getTemperatureBg(temperature)}`}>
          <div className="flex items-center gap-1.5 mb-1">
            <Thermometer className={`w-3.5 h-3.5 ${getTemperatureColor(temperature)}`} />
            <span className="text-[11px] text-[var(--text-muted)] font-mono">Temp</span>
          </div>
          <p className={`text-lg font-bold font-mono ${getTemperatureColor(temperature)}`}>
            {temperature.toFixed(1)}°C
          </p>
        </div>

        {/* Humidity */}
        <div className="rounded-lg p-2.5 bg-blue-500/10 border border-blue-500/20">
          <div className="flex items-center gap-1.5 mb-1">
            <Droplets className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-[11px] text-[var(--text-muted)] font-mono">Humidity</span>
          </div>
          <p className="text-lg font-bold font-mono text-blue-400">
            {humidity.toFixed(0)}%
          </p>
        </div>

        {/* Light */}
        <div className="rounded-lg p-2.5 bg-amber-500/10 border border-amber-500/20">
          <div className="flex items-center gap-1.5 mb-1">
            <Sun className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[11px] text-[var(--text-muted)] font-mono">Light</span>
          </div>
          <p className="text-lg font-bold font-mono text-amber-400">
            {light} <span className="text-xs font-normal">lx</span>
          </p>
        </div>

        {/* Motion */}
        <div
          className={`rounded-lg p-2.5 border transition-colors ${
            motion
              ? 'bg-emerald-500/10 border-emerald-500/30'
              : 'bg-[var(--bg-surface)] border-[var(--border-subtle)]'
          }`}
        >
          <div className="flex items-center gap-1.5 mb-1">
            <Activity
              className={`w-3.5 h-3.5 ${motion ? 'text-emerald-400' : 'text-zinc-500'}`}
            />
            <span className="text-[11px] text-[var(--text-muted)] font-mono">Motion</span>
          </div>
          <p
            className={`text-sm font-bold font-mono ${
              motion ? 'text-emerald-400' : 'text-zinc-500'
            }`}
          >
            {motion ? 'Detected' : 'Clear'}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-[var(--border-subtle)] my-3" />

      {/* Controls */}
      <div className="flex items-center justify-between gap-2">
        {/* Light Toggle */}
        <button
          onClick={onToggleLight}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all border ${
            lightsOn
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30 shadow-[0_0_8px_rgba(245,158,11,0.2)]'
              : 'bg-[var(--bg-surface)] text-[var(--text-muted)] border-[var(--border-color)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)]'
          }`}
        >
          {lightsOn ? (
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
          ) : (
            <LightbulbOff className="w-3.5 h-3.5" />
          )}
          <span>{lightsOn ? 'Light ON' : 'Light OFF'}</span>
        </button>

        {/* Lock Toggle */}
        <button
          onClick={onToggleLock}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all border ${
            locked
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30 shadow-[0_0_8px_rgba(16,185,129,0.2)]'
              : 'bg-rose-500/20 text-rose-300 border-rose-500/40 hover:bg-rose-500/30 shadow-[0_0_8px_rgba(244,63,94,0.2)]'
          }`}
        >
          {locked ? (
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <Unlock className="w-3.5 h-3.5 text-rose-400" />
          )}
          <span>{locked ? 'Locked' : 'Open'}</span>
        </button>

        {/* Thermostat Target */}
        <div className="flex items-center gap-1 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-lg px-2.5 py-1.5">
          <Thermometer className="w-3.5 h-3.5 text-teal-400" />
          <span className="text-xs font-bold font-mono text-teal-400">
            {thermostatTarget}°
          </span>
        </div>
      </div>
    </div>
  );
}
