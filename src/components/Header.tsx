'use client';

import React, { useState, useEffect } from 'react';
import { Bell, Wifi } from 'lucide-react';

interface HeaderProps {
  alertCount: number;
}

export default function Header({ alertCount }: HeaderProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

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
    <header className="bg-slate-800 border-b border-slate-700 px-4 py-3 sm:px-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Logo / Title */}
        <div className="flex items-center gap-2">
          <span className="text-2xl">🏠</span>
          <h1 className="text-xl font-bold text-white tracking-tight">
            Smart Home
          </h1>
        </div>

        {/* Date & Time */}
        <div className="text-center">
          <p className="text-sm text-gray-400">{formattedDate}</p>
          <p className="text-lg font-mono text-white">{formattedTime}</p>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-4">
          {/* Live Indicator */}
          <div className="flex items-center gap-2 bg-slate-700/50 rounded-full px-3 py-1.5">
            <Wifi className="w-4 h-4 text-green-400" />
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
            </span>
            <span className="text-sm font-medium text-green-400">Live</span>
          </div>

          {/* Notification Bell */}
          <button className="relative p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors">
            <Bell className="w-5 h-5 text-gray-300" />
            {alertCount > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center h-5 min-w-[1.25rem] px-1 rounded-full bg-red-500 text-white text-xs font-bold">
                {alertCount > 99 ? '99+' : alertCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
