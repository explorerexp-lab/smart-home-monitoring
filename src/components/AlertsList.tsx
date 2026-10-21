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
  critical: 'border-l-red-500',
};

const severityBadgeColors: Record<AlertSeverity, string> = {
  low: 'bg-blue-500/20 text-blue-400',
  medium: 'bg-yellow-500/20 text-yellow-400',
  high: 'bg-orange-500/20 text-orange-400',
  critical: 'bg-red-500/20 text-red-400',
};

function getAlertIcon(type: AlertType) {
  switch (type) {
    case 'motion':
      return <Move className="w-5 h-5 text-blue-400" />;
    case 'temperature':
      return <Thermometer className="w-5 h-5 text-orange-400" />;
    case 'smoke':
      return <Flame className="w-5 h-5 text-red-400" />;
    case 'intrusion':
      return <ShieldAlert className="w-5 h-5 text-red-500" />;
    default:
      return <ShieldAlert className="w-5 h-5 text-gray-400" />;
  }
}

export default function AlertsList({ alerts, onDismiss }: AlertsListProps) {
  if (alerts.length === 0) {
    return (
      <div className="bg-slate-800 rounded-xl p-8 border border-slate-700/50 flex flex-col items-center justify-center text-center">
        <ShieldCheck className="w-12 h-12 text-green-400 mb-3" />
        <h3 className="text-lg font-semibold text-white mb-1">All Clear</h3>
        <p className="text-sm text-gray-400">No alerts at this time</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700/50 overflow-hidden">
      <div className="p-4 border-b border-slate-700/50">
        <h3 className="text-lg font-semibold text-white">
          Alerts{' '}
          <span className="text-sm font-normal text-gray-400">({alerts.length})</span>
        </h3>
      </div>

      <div className="max-h-96 overflow-y-auto divide-y divide-slate-700/30">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`flex items-start gap-3 p-4 border-l-4 ${
              severityBorderColors[alert.severity]
            } ${
              !alert.read
                ? 'bg-slate-750 bg-slate-700/20'
                : 'bg-transparent'
            } hover:bg-slate-700/30 transition-colors`}
          >
            {/* Icon */}
            <div className="flex-shrink-0 mt-0.5">{getAlertIcon(alert.type)}</div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-200 leading-snug">{alert.message}</p>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-700 text-gray-300">
                  {alert.room}
                </span>
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${severityBadgeColors[alert.severity]}`}>
                  {alert.severity}
                </span>
                <span className="text-xs text-gray-500">
                  {formatDistanceToNow(alert.timestamp, { addSuffix: true })}
                </span>
              </div>
            </div>

            {/* Dismiss */}
            <button
              onClick={() => onDismiss(alert.id)}
              className="flex-shrink-0 p-1 rounded hover:bg-slate-600 transition-colors text-gray-500 hover:text-gray-300"
              aria-label="Dismiss alert"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
