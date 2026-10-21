'use client';

import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Thermometer, Droplets, Sun } from 'lucide-react';

type ActiveMetric = 'temperature' | 'humidity' | 'light';

interface DataPoint {
  timestamp: string;
  temperature: number;
  humidity: number;
  light: number;
}

interface SensorChartProps {
  data: DataPoint[];
  activeMetric?: ActiveMetric;
}

const metricConfig: Record<
  ActiveMetric,
  { label: string; color: string; gradientId: string; unit: string; icon: React.ReactNode }
> = {
  temperature: {
    label: 'Temperature',
    color: '#f87171',
    gradientId: 'tempGradient',
    unit: '°C',
    icon: <Thermometer className="w-4 h-4" />,
  },
  humidity: {
    label: 'Humidity',
    color: '#60a5fa',
    gradientId: 'humidGradient',
    unit: '%',
    icon: <Droplets className="w-4 h-4" />,
  },
  light: {
    label: 'Light',
    color: '#facc15',
    gradientId: 'lightGradient',
    unit: ' lux',
    icon: <Sun className="w-4 h-4" />,
  },
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
  metric: ActiveMetric;
}

function CustomTooltip({ active, payload, label, metric }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;

  const config = metricConfig[metric];

  return (
    <div className="bg-slate-800 border border-slate-600 rounded-lg p-3 shadow-xl">
      <p className="text-xs text-gray-400 mb-1">{label}</p>
      <p className="text-sm font-bold" style={{ color: config.color }}>
        {payload[0].value.toFixed(1)}
        {config.unit}
      </p>
    </div>
  );
}

export default function SensorChart({ data, activeMetric: initialMetric = 'temperature' }: SensorChartProps) {
  const [activeMetric, setActiveMetric] = useState<ActiveMetric>(initialMetric);

  const config = metricConfig[activeMetric];

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700/50">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
        <h3 className="text-lg font-semibold text-white">Sensor History</h3>

        {/* Metric Tabs */}
        <div className="flex gap-1 bg-slate-700/50 rounded-lg p-1">
          {(Object.keys(metricConfig) as ActiveMetric[]).map((metric) => {
            const m = metricConfig[metric];
            const isActive = metric === activeMetric;
            return (
              <button
                key={metric}
                onClick={() => setActiveMetric(metric)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-slate-600 text-white shadow-sm'
                    : 'text-gray-400 hover:text-gray-300 hover:bg-slate-700/50'
                }`}
              >
                {m.icon}
                <span className="hidden sm:inline">{m.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
            <defs>
              <linearGradient id={config.gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={config.color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={config.color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis
              dataKey="timestamp"
              stroke="#64748b"
              tick={{ fontSize: 12, fill: '#94a3b8' }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#64748b"
              tick={{ fontSize: 12, fill: '#94a3b8' }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip metric={activeMetric} />} />
            <Area
              type="monotone"
              dataKey={activeMetric}
              stroke={config.color}
              strokeWidth={2}
              fill={`url(#${config.gradientId})`}
              dot={false}
              activeDot={{ r: 5, stroke: config.color, strokeWidth: 2, fill: '#1e293b' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
