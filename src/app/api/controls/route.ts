import { NextRequest, NextResponse } from 'next/server';

type ControlAction = 'toggleLight' | 'setThermostat' | 'toggleLock';

interface ControlRequest {
  roomId: string;
  action: ControlAction;
  value?: number | boolean | string;
}

interface ControlResponse {
  success: boolean;
  roomId: string;
  action: ControlAction;
  newState: Record<string, unknown>;
}

const validRoomIds = [
  'living-room',
  'bedroom',
  'kitchen',
  'garage',
  'garden',
  'office',
];

const validActions: ControlAction[] = ['toggleLight', 'setThermostat', 'toggleLock'];

export async function POST(request: NextRequest) {
  try {
    const body: ControlRequest = await request.json();
    const { roomId, action, value } = body;

    if (!roomId || !action) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields: roomId and action' },
        { status: 400 }
      );
    }

    if (!validRoomIds.includes(roomId)) {
      return NextResponse.json(
        {
          success: false,
          message: `Invalid roomId "${roomId}". Valid rooms: ${validRoomIds.join(', ')}`,
        },
        { status: 400 }
      );
    }

    if (!validActions.includes(action)) {
      return NextResponse.json(
        {
          success: false,
          message: `Invalid action "${action}". Valid actions: ${validActions.join(', ')}`,
        },
        { status: 400 }
      );
    }

    let newState: Record<string, unknown>;

    switch (action) {
      case 'toggleLight': {
        const lightOn = value !== undefined ? Boolean(value) : Math.random() > 0.5;
        const brightness = lightOn ? Math.round(60 + Math.random() * 40) : 0;
        newState = {
          lightOn,
          brightness,
          updatedAt: new Date().toISOString(),
        };
        break;
      }

      case 'setThermostat': {
        const targetTemp =
          typeof value === 'number'
            ? Math.min(Math.max(value, 16), 30)
            : 22;
        const currentTemp = parseFloat((targetTemp + (Math.random() - 0.5) * 3).toFixed(1));
        newState = {
          targetTemperature: targetTemp,
          currentTemperature: currentTemp,
          mode: targetTemp > 24 ? 'cooling' : 'heating',
          updatedAt: new Date().toISOString(),
        };
        break;
      }

      case 'toggleLock': {
        const locked = value !== undefined ? Boolean(value) : Math.random() > 0.5;
        newState = {
          locked,
          lastChanged: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        break;
      }

      default:
        newState = {};
    }

    const response: ControlResponse = {
      success: true,
      roomId,
      action,
      newState,
    };

    return NextResponse.json(response);
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid request body — expected JSON' },
      { status: 400 }
    );
  }
}
