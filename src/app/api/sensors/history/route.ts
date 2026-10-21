import { NextRequest, NextResponse } from 'next/server';

interface HistoricalDataPoint {
  timestamp: string;
  temperature: number;
  humidity: number;
  light: number;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const hours = parseInt(searchParams.get('hours') || '24', 10);
  const clampedHours = Math.min(Math.max(hours, 1), 168); // 1h to 7 days

  const now = Date.now();
  const intervalMs = 5 * 60 * 1000; // 5-minute intervals
  const totalPoints = Math.floor((clampedHours * 60) / 5);

  const data: HistoricalDataPoint[] = [];

  for (let i = totalPoints; i >= 0; i--) {
    const pointTime = now - i * intervalMs;
    const date = new Date(pointTime);
    const hourOfDay = date.getHours() + date.getMinutes() / 60;

    // Temperature: base 24°C, amplitude 5, ~24h period (peaks in afternoon ~15:00)
    const tempCycle = Math.sin(((hourOfDay - 9) / 24) * 2 * Math.PI);
    const temperature = parseFloat(
      (24 + 5 * tempCycle + (Math.random() - 0.5) * 1.5).toFixed(1)
    );

    // Humidity: base 55%, amplitude 15, ~12h period
    const humidityCycle = Math.sin(((hourOfDay - 3) / 12) * 2 * Math.PI);
    const humidity = parseFloat(
      (55 + 15 * humidityCycle + (Math.random() - 0.5) * 4).toFixed(1)
    );

    // Light: base 500 lux, amplitude 400, ~24h period (peaks at noon ~12:00)
    const lightCycle = Math.sin(((hourOfDay - 6) / 24) * 2 * Math.PI);
    const lightRaw = 500 + 400 * lightCycle + (Math.random() - 0.5) * 50;
    const light = Math.round(Math.max(0, lightRaw));

    data.push({
      timestamp: date.toISOString(),
      temperature,
      humidity,
      light,
    });
  }

  return NextResponse.json({
    hours: clampedHours,
    interval: '5min',
    totalPoints: data.length,
    data,
  });
}
