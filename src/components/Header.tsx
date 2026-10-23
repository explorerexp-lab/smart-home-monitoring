'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Bell, Wifi, Zap, Moon, Sun, ChevronDown, Check, BatteryCharging } from 'lucide-react';
import { useTheme, ThemeMode } from '@/context/ThemeContext';

interface HeaderProps {
  alertCount: number;
}

export default function Header({ alertCount }: HeaderProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { theme, setTheme, cycleTheme, isOLED, powerSavings } = useTheme();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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

  const themeOptions: {
    id: ThemeMode;
    label: string;
    sublabel: string;
    icon: React.ReactNode;
    tag?: string;
  }[] = [
    {
      id: 'oled',
      label: 'OLED Pure Black',
      sublabel: 'True #000000 pitch black • 0% pixel power • Max battery savings',
      icon: <Zap className="w-4 h-4 text-emerald-400" />,
      tag: 'OLED Friendly',
    },
    {
      id: 'dark',
      label: 'Dark Slate',
      sublabel: 'Midnight slate navy • Soft contrast for low-light environments',
      icon: <Moon className="w-4 h-4 text-blue-400" />,
    },
    {
      id: 'light',
      label: 'Daylight Light',
      sublabel: 'Crisp high-contrast daylight theme for well-lit environments',
      icon: <Sun className="w-4 h-4 text-amber-400" />,
    },
  ];

  return (
    <header className="bg-[var(--bg-header)] border-b border-[var(--border-color)] px-4 py-3 sm:px-6 transition-colors duration-200">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 max-w-7xl mx-auto">
        {/* Logo / Title */}
        <div className="flex items-center gap-3">
          <span className="text-2xl filter drop-shadow">🏠</span>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-[var(--text-primary)]">
                Smart Home
              </h1>
              {isOLED && (
                <span className="px-2 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/40 flex items-center gap-1 shadow-[0_0_8px_rgba(16,185,129,0.3)]">
                  <Zap className="w-3 h-3 fill-emerald-400 text-emerald-400" />
                  <span>OLED Black</span>
                </span>
              )}
            </div>
            <p className="text-[11px] text-[var(--text-muted)] hidden sm:block">
              Integrated IoT & 24/7 CCTV Telemetry Dashboard
            </p>
          </div>
        </div>

        {/* Date & Time */}
        <div className="text-center">
          <p className="text-xs text-[var(--text-muted)] font-medium">{formattedDate}</p>
          <p className="text-lg font-mono font-bold tracking-wider text-[var(--text-primary)]">
            {formattedTime}
          </p>
        </div>

        {/* Right side controls: Theme Switcher, Live Indicator, Notifications */}
        <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap justify-center sm:justify-end">
          {/* OLED / Theme Switcher Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              title="Change Display Mode (OLED Pure Black / Dark / Light) • Shortcut [T]"
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all border ${
                isOLED
                  ? 'bg-black text-emerald-400 border-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.2)] hover:border-emerald-400'
                  : theme === 'dark'
                  ? 'bg-slate-800 text-blue-300 border-slate-700 hover:border-slate-600'
                  : 'bg-white text-slate-800 border-slate-300 hover:border-slate-400 shadow-sm'
              }`}
            >
              {isOLED ? (
                <>
                  <Zap className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400 animate-pulse" />
                  <span className="font-bold">OLED Mode</span>
                  <span className="hidden md:inline px-1.5 py-0.2 rounded text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-700/50">
                    0% Black
                  </span>
                </>
              ) : theme === 'dark' ? (
                <>
                  <Moon className="w-3.5 h-3.5 text-blue-400" />
                  <span>Dark Slate</span>
                </>
              ) : (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  <span>Light</span>
                </>
              )}
              <ChevronDown
                className={`w-3.5 h-3.5 text-[var(--text-muted)] transition-transform duration-200 ${
                  dropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-2xl z-50 p-2 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-2 border-b border-[var(--border-subtle)] flex items-center justify-between">
                  <span className="text-xs font-semibold text-[var(--text-primary)]">
                    Display Theme
                  </span>
                  <span className="text-[10px] font-mono text-[var(--text-muted)]">
                    Press <kbd className="px-1 py-0.5 bg-[var(--bg-surface)] rounded text-[9px] font-bold border border-[var(--border-color)]">T</kbd> to cycle
                  </span>
                </div>

                <div className="space-y-1 mt-1.5">
                  {themeOptions.map((opt) => {
                    const isSelected = theme === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => {
                          setTheme(opt.id);
                          setDropdownOpen(false);
                        }}
                        className={`w-full text-left p-2.5 rounded-lg text-xs transition-all flex items-start gap-2.5 ${
                          isSelected
                            ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] border border-emerald-500/40 font-medium'
                            : 'text-[var(--text-secondary)] hover:bg-[var(--bg-surface-hover)] hover:text-[var(--text-primary)]'
                        }`}
                      >
                        <div className="p-1.5 rounded-md bg-[var(--bg-page)] border border-[var(--border-color)] shrink-0 mt-0.5">
                          {opt.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-sm leading-tight text-[var(--text-primary)]">
                              {opt.label}
                            </span>
                            {opt.tag && (
                              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                {opt.tag}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-[var(--text-muted)] mt-0.5 leading-snug">
                            {opt.sublabel}
                          </p>
                        </div>
                        {isSelected && (
                          <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* OLED Power Savings Indicator Pill */}
                <div className="mt-2 pt-2 border-t border-[var(--border-subtle)] px-2 py-1 flex items-center justify-between text-[11px] font-mono">
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <BatteryCharging className="w-3.5 h-3.5" />
                    <span>Display Efficiency:</span>
                  </div>
                  <span className="font-bold text-[var(--text-primary)]">
                    {powerSavings}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Live Indicator */}
          <div className="flex items-center gap-2 bg-[var(--bg-surface)] rounded-full px-3 py-1.5 border border-[var(--border-color)]">
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
            className="relative p-2 rounded-lg bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-hover)] border border-[var(--border-color)] transition-colors"
          >
            <Bell className="w-4 h-4 text-[var(--text-secondary)]" />
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
