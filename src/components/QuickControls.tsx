'use client';

import React from 'react';
import { Lightbulb, LightbulbOff, Lock, Unlock, Plus, Minus, Thermometer } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

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
  activeColor = 'bg-emerald-500',
}: ToggleSwitchProps) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-2 group/switch focus:outline-none"
      aria-label={enabled ? labelOn : labelOff}
    >
      <span className="flex-shrink-0">{enabled ? iconOn : iconOff}</span>
      <div
        className={`relative w-11 h-6 rounded-full transition-colors duration-200 border border-transparent ${
          enabled ? activeColor : 'bg-zinc-700'
        }`}
      >
        <div
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200 ${
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
  const { isOLED } = useTheme();

  return (
    <div className="bg-[var(--bg-card)] rounded-xl border border-[var(--border-color)] overflow-hidden transition-colors">
      <div className="p-4 border-b border-[var(--border-color)] flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-[var(--text-primary)]">
            Actuator & Relay Overrides
          </h3>
          <p className="text-xs text-[var(--text-muted)] font-mono">
            Direct hardware relays for lighting, access control, and HVAC setpoints
          </p>
        </div>
      </div>

      <div className="divide-y divide-[var(--border-subtle)]">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 hover:bg-[var(--bg-surface-hover)] transition-colors"
          >
            {/* Room Name */}
            <span className="text-sm font-semibold text-[var(--text-primary)] min-w-[130px]">
              {room.name}
            </span>

            <div className="flex items-center gap-6 flex-wrap">
              {/* Light Toggle */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-[var(--text-muted)] hidden md:inline">
                  Light:
                </span>
                <ToggleSwitch
                  enabled={room.lightsOn}
                  onToggle={() => onToggleLight(room.id)}
                  iconOn={<Lightbulb className="w-4 h-4 text-amber-400" />}
                  iconOff={<LightbulbOff className="w-4 h-4 text-zinc-500" />}
                  labelOn="Lights on"
                  labelOff="Lights off"
                  activeColor="bg-amber-500"
                />
              </div>

              {/* Lock Toggle */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-[var(--text-muted)] hidden md:inline">
                  Lock:
                </span>
                <ToggleSwitch
                  enabled={room.locked}
                  onToggle={() => onToggleLock(room.id)}
                  iconOn={<Lock className="w-4 h-4 text-emerald-400" />}
                  iconOff={<Unlock className="w-4 h-4 text-rose-400" />}
                  labelOn="Locked"
                  labelOff="Unlocked"
                  activeColor="bg-emerald-500"
                />
              </div>

              {/* Thermostat Controls */}
              <div className="flex items-center gap-2 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-lg p-1">
                <Thermometer className="w-3.5 h-3.5 text-teal-400 ml-1.5" />
                <button
                  onClick={() => onSetThermostat(room.id, room.thermostatTarget - 1)}
                  className="p-1 rounded bg-[var(--bg-page)] hover:bg-[var(--bg-surface-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)] transition-colors"
                  aria-label="Decrease temperature"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="text-xs font-bold text-teal-400 min-w-[2.8rem] text-center font-mono">
                  {room.thermostatTarget}°C
                </span>
                <button
                  onClick={() => onSetThermostat(room.id, room.thermostatTarget + 1)}
                  className="p-1 rounded bg-[var(--bg-page)] hover:bg-[var(--bg-surface-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)] transition-colors"
                  aria-label="Increase temperature"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
