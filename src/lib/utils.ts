import clsx, { ClassValue } from "clsx";
import { format } from "date-fns";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface SensorReading {
  temperature: number;
  humidity: number;
  light: number;
  motion: boolean;
  timestamp: Date;
}

export interface HistoricalDataPoint {
  timestamp: string;
  temperature: number;
  humidity: number;
  light: number;
}

export interface Room {
  id: string;
  name: string;
  icon: string;
  sensors: SensorReading;
  lightsOn: boolean;
  thermostatTarget: number;
  locked: boolean;
}

export interface Alert {
  id: string;
  type: "motion" | "temperature" | "smoke" | "intrusion";
  severity: "low" | "medium" | "high" | "critical";
  message: string;
  room: string;
  timestamp: Date;
  read: boolean;
}

export interface CCTVFeed {
  id: string;
  name: string;
  location: string;
  status: "online" | "offline";
  motionDetected: boolean;
  lastMotion: Date | null;
  resolution: string;
}

// ─── Utility Functions ───────────────────────────────────────────────────────

/**
 * Merge class names using clsx.
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

/**
 * Generate a random simulated sensor reading.
 */
export function generateSensorData(): SensorReading {
  return {
    temperature: parseFloat((Math.random() * (35 - 18) + 18).toFixed(1)),
    humidity: parseFloat((Math.random() * (80 - 30) + 30).toFixed(1)),
    light: Math.round(Math.random() * 1000),
    motion: Math.random() > 0.7,
    timestamp: new Date(),
  };
}

/**
 * Generate an array of historical data points at 5-minute intervals
 * for the last N hours.
 */
export function generateHistoricalData(hours: number): HistoricalDataPoint[] {
  const data: HistoricalDataPoint[] = [];
  const now = new Date();
  const totalPoints = hours * 12; // 12 points per hour (every 5 min)

  for (let i = totalPoints; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 5 * 60 * 1000);
    data.push({
      timestamp: formatTimestamp(timestamp),
      temperature: parseFloat((Math.random() * (35 - 18) + 18).toFixed(1)),
      humidity: parseFloat((Math.random() * (80 - 30) + 30).toFixed(1)),
      light: Math.round(Math.random() * 1000),
    });
  }

  return data;
}

/**
 * Format a Date as "HH:mm".
 */
export function formatTimestamp(date: Date): string {
  return format(date, "HH:mm");
}
