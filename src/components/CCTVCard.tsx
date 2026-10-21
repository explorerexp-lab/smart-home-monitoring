'use client';

import React, { useState, useEffect } from 'react';
import { Camera, Eye, WifiOff } from 'lucide-react';

interface CCTVCardProps {
  name: string;
  location: string;
  status: 'online' | 'offline';
  motionDetected: boolean;
  resolution: string;
}

export default function CCTVCard({
  name,
  location,
  status,
  motionDetected,
  resolution,
}: CCTVCardProps) {
  const [timestamp, setTimestamp] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimestamp(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const isOnline = status === 'online';

  const formattedTimestamp = timestamp.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const formattedDate = timestamp.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  return (
    <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700/50 hover:shadow-lg hover:shadow-slate-900/50 transition-all duration-300">
      {/* Video Feed Area */}
      <div className="relative aspect-video overflow-hidden">
        {/* Simulated Camera Background */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 ${
            !isOnline ? 'grayscale' : ''
          }`}
        >
          {/* Scan Lines Effect */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
            }}
          />
          {/* Subtle noise overlay */}
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.15)_0%,_transparent_70%)]" />
        </div>

        {/* Camera Name - Top Left */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <Camera className="w-4 h-4 text-white/80" />
          <span className="text-sm font-mono font-medium text-white/90">{name}</span>
        </div>

        {/* LIVE Badge - Top Right */}
        {isOnline && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm rounded px-2 py-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
            </span>
            <span className="text-xs font-bold text-white">LIVE</span>
          </div>
        )}

        {/* REC Indicator */}
        {isOnline && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
            <span className="text-xs font-mono text-red-400 font-medium">REC</span>
            <span className="text-red-500 animate-pulse">●</span>
          </div>
        )}

        {/* Timestamp - Bottom Right */}
        <div className="absolute bottom-3 right-3">
          <span className="text-xs font-mono text-white/60">
            {formattedDate} {formattedTimestamp}
          </span>
        </div>

        {/* Motion Detected Banner */}
        {isOnline && motionDetected && (
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center">
            <div className="bg-red-600/80 backdrop-blur-sm px-4 py-1.5 rounded-md animate-pulse">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-white" />
                <span className="text-sm font-bold text-white tracking-wider">
                  MOTION DETECTED
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Offline Overlay */}
        {!isOnline && (
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center">
            <WifiOff className="w-10 h-10 text-gray-500 mb-2" />
            <span className="text-lg font-bold text-gray-400 tracking-widest">OFFLINE</span>
          </div>
        )}
      </div>

      {/* Info Bar */}
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}
          />
          <span className="text-sm text-gray-300">{location}</span>
        </div>
        <span className="text-xs text-gray-500 font-mono">{resolution}</span>
      </div>
    </div>
  );
}
