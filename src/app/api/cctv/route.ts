import { NextResponse } from 'next/server';

interface CCTVFeed {
  id: string;
  name: string;
  location: string;
  status: 'online' | 'offline';
  motionDetected: boolean;
  lastMotion: string | null;
  resolution: '1080p' | '720p';
}

export async function GET() {
  const now = Date.now();

  const feeds: CCTVFeed[] = [
    {
      id: 'cam-001',
      name: 'Front Door',
      location: 'Main Entrance',
      status: 'online',
      motionDetected: Math.random() > 0.5,
      lastMotion: new Date(now - Math.floor(Math.random() * 600000)).toISOString(),
      resolution: '1080p',
    },
    {
      id: 'cam-002',
      name: 'Backyard',
      location: 'Rear Garden',
      status: 'online',
      motionDetected: Math.random() > 0.6,
      lastMotion: new Date(now - Math.floor(Math.random() * 1800000)).toISOString(),
      resolution: '1080p',
    },
    {
      id: 'cam-003',
      name: 'Garage',
      location: 'Garage Interior',
      status: 'offline',
      motionDetected: false,
      lastMotion: null,
      resolution: '720p',
    },
    {
      id: 'cam-004',
      name: 'Living Room',
      location: 'Living Room Interior',
      status: 'online',
      motionDetected: Math.random() > 0.7,
      lastMotion: new Date(now - Math.floor(Math.random() * 300000)).toISOString(),
      resolution: '1080p',
    },
  ];

  return NextResponse.json(feeds);
}
