'use client';

import React from 'react';
import { Lightbulb, LightbulbOff, Lock, Unlock, Plus, Minus, Thermometer } from 'lucide-react';

interface Room {
  id: string;
  name: string;
  lightsOn: boolean;
  locked: boolean;
  thermostatTarget: number;
}

interface QuickControlsProps {
  rooms: Room[];
  onToggleLight: (roomId: string) => void;
  onToggleLock: (roomId: string) => void;
  onSetThermostat: (roomId: string, temperature: number) => void;
}

interface ToggleSwitchProps {
  enabled: boolean;
  onToggle: () => void;
  iconOn: React.ReactNode;
  iconOff: React.ReactNode;
  labelOn: string;
  labelOff: string;
  activeColor?: string;
}

function ToggleSwitch({
  enabled,
  onToggle,
  iconOn,
  iconOff,
  labelOn,
  labelOff,
  activeColor = 'bg-green-500',
}: ToggleSwitchProps) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-2"
      aria-label={enabled ? labelOn : labelOff}
    >
      <span className="flex-shrink-0">{enabled ? iconOn : iconOff}</span>
      <div
        className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
          enabled ? activeColor : 'bg-gray-600'
        }`}
      >
        <div
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
            enabled ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </div>
    </button>
  );
}

export default function QuickControls({
  rooms,
  onToggleLight,
  onToggleLock,
  onSetThermostat,
}: QuickControlsProps) {
  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700/50 overflow-hidden">
      <div className="p-4 border-b border-slate-700/50">
        <h3 className="text-lg font-semibold text-white">Quick Controls</h3>
      </div>

      <div className="divide-y divide-slate-700/30">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 hover:bg-slate-700/20 transition-colors"
          >
            {/* Room Name */}
            <span className="text-sm font-medium text-gray-200 min-w-[120px]">
              {room.name}
            </span>

            <div className="flex items-center gap-6 flex-wrap">
              {/* Light Toggle */}
              <ToggleSwitch
                enabled={room.lightsOn}
                onToggle={() => onToggleLight(room.id)}
                iconOn={<Lightbulb className="w-4 h-4 text-yellow-400" />}
                iconOff={<LightbulbOff className="w-4 h-4 text-gray-500" />}
                labelOn="Lights on"
                labelOff="Lights off"
                activeColor="bg-yellow-500"
              />

              {/* Lock Toggle */}
              <ToggleSwitch
                enabled={room.locked}
                onToggle={() => onToggleLock(room.id)}
                iconOn={<Lock className="w-4 h-4 text-green-400" />}
                iconOff={<Unlock className="w-4 h-4 text-red-400" />}
                labelOn="Locked"
                labelOff="Unlocked"
                activeColor="bg-green-500"
              />

              {/* Thermostat Controls */}
              <div className="flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-teal-400" />
                <button
                  onClick={() => onSetThermostat(room.id, room.thermostatTarget - 1)}
                  className="p-1 rounded-md bg-slate-700 hover:bg-slate-600 text-gray-300 transition-colors"
                  aria-label="Decrease temperature"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-sm font-bold text-teal-400 min-w-[3rem] text-center font-mono">
                  {room.thermostatTarget}°C
                </span>
                <button
                  onClick={() => onSetThermostat(room.id, room.thermostatTarget + 1)}
                  className="p-1 rounded-md bg-slate-700 hover:bg-slate-600 text-gray-300 transition-colors"
                  aria-label="Increase temperature"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
