'use client';

import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import {
  Thermometer,
  Flame,
  ShieldAlert,
  ShieldCheck,
  Move,
  X,
} from 'lucide-react';

type AlertSeverity = 'low' | 'medium' | 'high' | 'critical';
type AlertType = 'motion' | 'temperature' | 'smoke' | 'intrusion';

interface Alert {
  id: string;
  type: AlertType;
  severity: AlertSeverity;
  message: string;
  room: string;
  timestamp: Date;
  read: boolean;
}

interface AlertsListProps {
  alerts: Alert[];
  onDismiss: (id: string) => void;
}

const severityBorderColors: Record<AlertSeverity, string> = {
  low: 'border-l-blue-400',
  medium: 'border-l-yellow-400',
  high: 'border-l-orange-400',
  critical: 'border-l-rose-500',
};

const severityBadgeColors: Record<AlertSeverity, string> = {
  low: 'bg-blue-500/15 text-blue-400 border border-blue-500/30',
  medium: 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/30',
  high: 'bg-orange-500/15 text-orange-400 border border-orange-500/30',
  critical: 'bg-rose-500/15 text-rose-400 border border-rose-500/30',
};

function getAlertIcon(type: AlertType) {
  switch (type) {
    case 'motion':
      return <Move className="w-4 h-4 text-blue-400" />;
    case 'temperature':
      return <Thermometer className="w-4 h-4 text-orange-400" />;
    case 'smoke':
      return <Flame className="w-4 h-4 text-rose-400" />;
    case 'intrusion':
      return <ShieldAlert className="w-4 h-4 text-rose-500" />;
    default:
      return <ShieldAlert className="w-4 h-4 text-zinc-400" />;
  }
}

export default function AlertsList({ alerts, onDismiss }: AlertsListProps) {
  if (alerts.length === 0) {
    return (
      <div className="bg-[var(--bg-card)] rounded-xl p-8 border border-[var(--border-color)] flex flex-col items-center justify-center text-center">
        <ShieldCheck className="w-12 h-12 text-emerald-400 mb-3" />
        <h3 className="text-base font-semibold text-[var(--text-primary)] mb-1">
          All Zones Nominal
        </h3>
        <p className="text-xs text-[var(--text-muted)] font-mono">
          No security alerts or sensor anomalies detected
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[var(--bg-card)] rounded-xl border border-[var(--border-color)] overflow-hidden">
      <div className="p-4 border-b border-[var(--border-color)] flex items-center justify-between">
        <h3 className="text-base font-semibold text-[var(--text-primary)]">
          Live Threat & Anomaly Alerts
        </h3>
        <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-400 border border-rose-500/30">
          {alerts.length} Pending
        </span>
      </div>

      <div className="max-h-96 overflow-y-auto divide-y divide-[var(--border-subtle)]">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`flex items-start gap-3 p-3.5 border-l-4 ${
              severityBorderColors[alert.severity]
            } ${
              !alert.read
                ? 'bg-[var(--bg-surface)]/60'
                : 'bg-transparent'
            } hover:bg-[var(--bg-surface-hover)] transition-colors`}
          >
            {/* Icon */}
            <div className="flex-shrink-0 mt-0.5 p-1 rounded bg-[var(--bg-surface)] border border-[var(--border-color)]">
              {getAlertIcon(alert.type)}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-[var(--text-primary)] leading-snug">
                {alert.message}
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-1.5 font-mono">
                <span className="inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-medium bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-color)]">
                  {alert.room}
                </span>
                <span
                  className={`inline-flex items-center px-1.5 py-0.2 rounded text-[10px] uppercase font-bold ${
                    severityBadgeColors[alert.severity]
                  }`}
                >
                  {alert.severity}
                </span>
                <span className="text-[10px] text-[var(--text-muted)]">
                  {formatDistanceToNow(alert.timestamp, { addSuffix: true })}
                </span>
              </div>
            </div>

            {/* Dismiss */}
            <button
              onClick={() => onDismiss(alert.id)}
              className="flex-shrink-0 p-1 rounded hover:bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
              aria-label="Dismiss alert"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
