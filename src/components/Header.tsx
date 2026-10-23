'use client';

import React, { useState, useEffect } from 'react';
import { Bell, Wifi, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface HeaderProps {
  alertCount: number;
}

export default function Header({ alertCount }: HeaderProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { theme, toggleTheme, isDark } = useTheme();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <header className="bg-[var(--bg-header)] border-b border-[var(--border-color)] px-4 py-3 sm:px-6 transition-colors duration-200">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 max-w-7xl mx-auto">
        {/* Brand / Title */}
        <div className="flex items-center gap-3">
          <span className="text-2xl filter drop-shadow">🏠</span>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-[var(--text-primary)]">
              Smart Home
            </h1>
            <p className="text-xs text-[var(--text-muted)] font-mono hidden sm:block">
              IoT Sensor & Surveillance Telemetry
            </p>
          </div>
        </div>

        {/* Date & Time */}
        <div className="text-center">
          <p className="text-xs text-[var(--text-muted)] font-medium">{formattedDate}</p>
          <p className="text-base font-mono font-bold tracking-wider text-[var(--text-primary)]">
            {formattedTime}
          </p>
        </div>

        {/* Controls: Theme Toggle, Live Status, Alerts */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Minimalist Theme Toggle (Moon / Sun) */}
          <button
            onClick={toggleTheme}
            title={isDark ? 'Switch to light mode (T)' : 'Switch to dark mode (T)'}
            aria-label="Toggle theme"
            className="p-2 rounded-lg bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-hover)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors focus:outline-none"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>

          {/* Live Network Indicator */}
          <div className="flex items-center gap-2 bg-[var(--bg-surface)] rounded-lg px-3 py-1.5 border border-[var(--border-color)]">
            <Wifi className="w-3.5 h-3.5 text-emerald-400" />
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-xs font-mono font-medium text-emerald-400">Live</span>
          </div>

          {/* Notification Bell */}
          <button
            title="System Alerts"
            className="relative p-2 rounded-lg bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-hover)] border border-[var(--border-color)] transition-colors text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          >
            <Bell className="w-4 h-4" />
            {alertCount > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center h-4 min-w-[1rem] px-1 rounded-full bg-red-500 text-white text-[10px] font-bold">
                {alertCount > 99 ? '99+' : alertCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
