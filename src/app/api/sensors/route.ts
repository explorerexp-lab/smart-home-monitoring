import { NextResponse } from 'next/server';

interface SensorData {
  temperature: number;
  humidity: number;
  light: number;
  motion: boolean;
  timestamp: string;
}

interface RoomSensorReading {
  id: string;
  name: string;
  sensors: SensorData;
}

const rooms = [
  { id: 'living-room', name: 'Living Room' },
  { id: 'bedroom', name: 'Bedroom' },
  { id: 'kitchen', name: 'Kitchen' },
  { id: 'garage', name: 'Garage' },
  { id: 'garden', name: 'Garden' },
  { id: 'office', name: 'Office' },
];

function generateSensorData(): SensorData {
  const temperature = parseFloat((18 + Math.random() * 12).toFixed(1));
  const humidity = parseFloat((30 + Math.random() * 40).toFixed(1));
  const light = Math.round(50 + Math.random() * 900);
  const motion = Math.random() > 0.65;
  const timestamp = new Date().toISOString();

  return { temperature, humidity, light, motion, timestamp };
}

export async function GET() {
  const data: RoomSensorReading[] = rooms.map((room) => ({
    id: room.id,
    name: room.name,
    sensors: generateSensorData(),
  }));

  return NextResponse.json(data);
}
