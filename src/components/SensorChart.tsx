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
import { useTheme } from '@/context/ThemeContext';

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
    color: '#38bdf8',
    gradientId: 'humidGradient',
    unit: '%',
    icon: <Droplets className="w-4 h-4" />,
  },
  light: {
    label: 'Light',
    color: '#fbbf24',
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
    <div className="rounded-lg p-3 shadow-xl border font-mono bg-[var(--bg-card)] border-[var(--border-color)]">
      <p className="text-[11px] text-[var(--text-muted)] mb-1">{label}</p>
      <p className="text-sm font-bold flex items-center gap-1.5" style={{ color: config.color }}>
        <span>{payload[0].value.toFixed(1)}</span>
        <span className="text-xs">{config.unit}</span>
      </p>
    </div>
  );
}

export default function SensorChart({
  data,
  activeMetric: initialMetric = 'temperature',
}: SensorChartProps) {
  const [activeMetric, setActiveMetric] = useState<ActiveMetric>(initialMetric);
  const { isDark } = useTheme();

  const config = metricConfig[activeMetric];

  // Refined neutral colors for grid lines & axes
  const gridColor = isDark ? '#1f1f23' : '#e2e8f0';
  const tickColor = isDark ? '#71717a' : '#64748b';
  const dotFillColor = isDark ? '#000000' : '#ffffff';

  return (
    <div className="bg-[var(--bg-card)] rounded-xl p-5 sm:p-6 border border-[var(--border-color)] transition-colors duration-200">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-primary)]">
            Sensor Telemetry History
          </h3>
          <p className="text-xs text-[var(--text-muted)] font-mono mt-0.5">
            Continuous 24-hour environmental sensor log
          </p>
        </div>

        {/* Metric Tabs */}
        <div className="flex gap-1 bg-[var(--bg-surface)] rounded-lg p-1 border border-[var(--border-color)]">
          {(Object.keys(metricConfig) as ActiveMetric[]).map((metric) => {
            const m = metricConfig[metric];
            const isActive = metric === activeMetric;
            return (
              <button
                key={metric}
                onClick={() => setActiveMetric(metric)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-all ${
                  isActive
                    ? 'bg-[var(--bg-card)] text-[var(--text-primary)] shadow-sm border border-[var(--border-color)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                {m.icon}
                <span>{m.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Chart */}
      <div className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id={config.gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={config.color}
                  stopOpacity={isDark ? 0.3 : 0.2}
                />
                <stop
                  offset="95%"
                  stopColor={config.color}
                  stopOpacity={0.0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis
              dataKey="timestamp"
              stroke={tickColor}
              tick={{ fontSize: 11, fill: tickColor, fontFamily: 'monospace' }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke={tickColor}
              tick={{ fontSize: 11, fill: tickColor, fontFamily: 'monospace' }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              content={
                <CustomTooltip
                  metric={activeMetric}
                />
              }
            />
            <Area
              type="monotone"
              dataKey={activeMetric}
              stroke={config.color}
              strokeWidth={2}
              fill={`url(#${config.gradientId})`}
              dot={false}
              activeDot={{
                r: 5,
                stroke: config.color,
                strokeWidth: 2,
                fill: dotFillColor,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
