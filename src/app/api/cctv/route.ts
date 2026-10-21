import { NextResponse } from 'next/server';

interface CCTVFeed {
  id: string;
  name: string;
  location: string;
  status: 'online' | 'offline';
  motionDetected: boolean;
  lastMotion: string | null;
  resolution: '1080p' | '720p' | '4K';
  streamUrl: string;
  streamType: 'youtube' | 'video' | 'iframe';
  description?: string;
}

export async function GET() {
  const now = Date.now();

  const feeds: CCTVFeed[] = [
    {
      id: 'cam-kitchen',
      name: 'Kitchen',
      location: 'Kitchen & Dining Area',
      status: 'online',
      motionDetected: Math.random() > 0.6,
      lastMotion: new Date(now - Math.floor(Math.random() * 200000)).toISOString(),
      resolution: '1080p',
      streamUrl: '26wX6-esfwE',
      streamType: 'youtube',
      description: 'Italian Home Kitchen Live 24/7 (Slow TV)',
    },
    {
      id: 'cam-front-door',
      name: 'Front Door',
      location: 'Main Entrance & Porch',
      status: 'online',
      motionDetected: Math.random() > 0.5,
      lastMotion: new Date(now - Math.floor(Math.random() * 600000)).toISOString(),
      resolution: '1080p',
      streamUrl: 'rVLCmSXhXtg',
      streamType: 'youtube',
      description: 'Pedestrian Walkway & Street Entrance Stream',
    },
    {
      id: 'cam-living-room',
      name: 'Living Room',
      location: 'Main Lounge & Hall',
      status: 'online',
      motionDetected: Math.random() > 0.4,
      lastMotion: new Date(now - Math.floor(Math.random() * 300000)).toISOString(),
      resolution: '1080p',
      streamUrl: 'Qeq2Kax0v64',
      streamType: 'youtube',
      description: 'Explore.org Canine Sanctuary Lounge Cam',
    },
    {
      id: 'cam-backyard',
      name: 'Backyard',
      location: 'Rear Garden & Patio',
      status: 'online',
      motionDetected: Math.random() > 0.7,
      lastMotion: new Date(now - Math.floor(Math.random() * 1800000)).toISOString(),
      resolution: '1080p',
      streamUrl: 'XRC-hazGt4s',
      streamType: 'youtube',
      description: 'Backyard Bird Feeder & Garden Wildlife Cam',
    },
    {
      id: 'cam-garage',
      name: 'Garage',
      location: 'Driveway & Approach',
      status: 'online',
      motionDetected: false,
      lastMotion: null,
      resolution: '4K',
      streamUrl: 'vk5BHoDxXf0',
      streamType: 'youtube',
      description: '4K Expressway & Driveway Approach Stream',
    },
  ];

  return NextResponse.json(feeds);
}
