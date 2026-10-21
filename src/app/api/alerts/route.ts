import { NextRequest, NextResponse } from 'next/server';

type AlertType = 'motion' | 'temperature' | 'smoke' | 'intrusion';
type AlertSeverity = 'low' | 'medium' | 'high' | 'critical';

interface Alert {
  id: string;
  type: AlertType;
  severity: AlertSeverity;
  message: string;
  room: string;
  timestamp: string;
  read: boolean;
}

function generateAlerts(): Alert[] {
  const now = Date.now();
  const twoHoursMs = 2 * 60 * 60 * 1000;

  const alerts: Alert[] = [
    {
      id: 'alert-001',
      type: 'motion',
      severity: 'low',
      message: 'Motion detected in the garden area',
      room: 'Garden',
      timestamp: new Date(now - twoHoursMs * 0.95).toISOString(),
      read: true,
    },
    {
      id: 'alert-002',
      type: 'temperature',
      severity: 'medium',
      message: 'Temperature exceeds 30°C in the kitchen',
      room: 'Kitchen',
      timestamp: new Date(now - twoHoursMs * 0.82).toISOString(),
      read: true,
    },
    {
      id: 'alert-003',
      type: 'smoke',
      severity: 'critical',
      message: 'Smoke detected in the garage — verify immediately',
      room: 'Garage',
      timestamp: new Date(now - twoHoursMs * 0.7).toISOString(),
      read: false,
    },
    {
      id: 'alert-004',
      type: 'intrusion',
      severity: 'high',
      message: 'Unexpected entry detected at the front door',
      room: 'Living Room',
      timestamp: new Date(now - twoHoursMs * 0.55).toISOString(),
      read: false,
    },
    {
      id: 'alert-005',
      type: 'temperature',
      severity: 'low',
      message: 'Temperature dropped below 16°C in the bedroom',
      room: 'Bedroom',
      timestamp: new Date(now - twoHoursMs * 0.4).toISOString(),
      read: true,
    },
    {
      id: 'alert-006',
      type: 'motion',
      severity: 'medium',
      message: 'Repeated motion detected near the backyard camera',
      room: 'Garden',
      timestamp: new Date(now - twoHoursMs * 0.28).toISOString(),
      read: false,
    },
    {
      id: 'alert-007',
      type: 'smoke',
      severity: 'high',
      message: 'Elevated smoke levels in the kitchen',
      room: 'Kitchen',
      timestamp: new Date(now - twoHoursMs * 0.12).toISOString(),
      read: false,
    },
    {
      id: 'alert-008',
      type: 'intrusion',
      severity: 'critical',
      message: 'Garage door opened without authorization',
      room: 'Garage',
      timestamp: new Date(now - twoHoursMs * 0.03).toISOString(),
      read: false,
    },
  ];

  return alerts;
}

export async function GET() {
  const alerts = generateAlerts();
  return NextResponse.json(alerts);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { alertId } = body;

    if (!alertId || typeof alertId !== 'string') {
      return NextResponse.json(
        { success: false, message: 'Missing or invalid alertId' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Alert dismissed',
      alertId,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid request body' },
      { status: 400 }
    );
  }
}
