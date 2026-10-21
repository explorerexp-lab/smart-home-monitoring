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
  if (temp <= 28) return 'text-green-400';
  return 'text-red-400';
}

function getTemperatureBg(temp: number): string {
  if (temp < 20) return 'bg-blue-500/10';
  if (temp <= 28) return 'bg-green-500/10';
  return 'bg-red-500/10';
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
  return (
    <div className="bg-slate-800 rounded-xl p-6 hover:shadow-lg hover:shadow-slate-900/50 transition-all duration-300 hover:-translate-y-0.5 border border-slate-700/50">
      {/* Room Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 bg-slate-700/50 rounded-lg">{icon}</div>
        <h3 className="text-lg font-semibold text-white">{room}</h3>
      </div>

      {/* Sensor Grid */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        {/* Temperature */}
        <div className={`rounded-lg p-3 ${getTemperatureBg(temperature)}`}>
          <div className="flex items-center gap-2 mb-1">
            <Thermometer className={`w-4 h-4 ${getTemperatureColor(temperature)}`} />
            <span className="text-xs text-gray-400">Temperature</span>
          </div>
          <p className={`text-xl font-bold ${getTemperatureColor(temperature)}`}>
            {temperature.toFixed(1)}°C
          </p>
        </div>

        {/* Humidity */}
        <div className="rounded-lg p-3 bg-blue-500/10">
          <div className="flex items-center gap-2 mb-1">
            <Droplets className="w-4 h-4 text-blue-400" />
            <span className="text-xs text-gray-400">Humidity</span>
          </div>
          <p className="text-xl font-bold text-blue-400">{humidity.toFixed(0)}%</p>
        </div>

        {/* Light */}
        <div className="rounded-lg p-3 bg-yellow-500/10">
          <div className="flex items-center gap-2 mb-1">
            <Sun className="w-4 h-4 text-yellow-400" />
            <span className="text-xs text-gray-400">Light</span>
          </div>
          <p className="text-xl font-bold text-yellow-400">{light} lux</p>
        </div>

        {/* Motion */}
        <div className={`rounded-lg p-3 ${motion ? 'bg-green-500/10' : 'bg-slate-700/30'}`}>
          <div className="flex items-center gap-2 mb-1">
            <Activity className={`w-4 h-4 ${motion ? 'text-green-400' : 'text-gray-500'}`} />
            <span className="text-xs text-gray-400">Motion</span>
          </div>
          <p className={`text-sm font-bold ${motion ? 'text-green-400' : 'text-gray-500'}`}>
            {motion ? 'Detected' : 'Clear'}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-slate-700/50 my-4" />

      {/* Controls */}
      <div className="flex items-center justify-between">
        {/* Light Toggle */}
        <button
          onClick={onToggleLight}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
            lightsOn
              ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30'
              : 'bg-slate-700/50 text-gray-400 hover:bg-slate-700'
          }`}
        >
          {lightsOn ? (
            <Lightbulb className="w-4 h-4" />
          ) : (
            <LightbulbOff className="w-4 h-4" />
          )}
          <span>{lightsOn ? 'On' : 'Off'}</span>
        </button>

        {/* Lock Toggle */}
        <button
          onClick={onToggleLock}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
            locked
              ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
              : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
          }`}
        >
          {locked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
          <span>{locked ? 'Locked' : 'Unlocked'}</span>
        </button>

        {/* Thermostat */}
        <div className="flex items-center gap-1.5 bg-slate-700/50 rounded-lg px-3 py-2">
          <Thermometer className="w-4 h-4 text-teal-400" />
          <span className="text-sm font-bold text-teal-400">{thermostatTarget}°</span>
        </div>
      </div>
    </div>
  );
}
