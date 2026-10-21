'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Sofa,
  BedDouble,
  CookingPot,
  Car,
  TreePine,
  Monitor,
} from 'lucide-react';
import Header from '@/components/Header';
import StatusOverview from '@/components/StatusOverview';
import SensorCard from '@/components/SensorCard';
import SensorChart from '@/components/SensorChart';
import CCTVCard from '@/components/CCTVCard';
import AlertsList from '@/components/AlertsList';
import QuickControls from '@/components/QuickControls';
import type { Room, Alert, CCTVFeed, HistoricalDataPoint } from '@/lib/utils';
import { generateSensorData, generateHistoricalData } from '@/lib/utils';
import {
  rooms as initialRooms,
  cctvFeeds as initialCCTVFeeds,
  alerts as initialAlerts,
} from '@/lib/mock-data';

// ─── Room Icon Map ───────────────────────────────────────────────────────────

const roomIcons: Record<string, React.ReactNode> = {
  Sofa: <Sofa className="w-5 h-5 text-blue-400" />,
  Bed: <BedDouble className="w-5 h-5 text-purple-400" />,
  CookingPot: <CookingPot className="w-5 h-5 text-orange-400" />,
  Car: <Car className="w-5 h-5 text-gray-400" />,
  TreePine: <TreePine className="w-5 h-5 text-green-400" />,
  Monitor: <Monitor className="w-5 h-5 text-cyan-400" />,
};

// ─── Active Tab Type ─────────────────────────────────────────────────────────

type DashboardTab = 'overview' | 'cctv' | 'controls';

// ─── Main Dashboard Page ─────────────────────────────────────────────────────

export default function DashboardPage() {
  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);
  const [cctvFeeds] = useState<CCTVFeed[]>(initialCCTVFeeds);
  const [historicalData, setHistoricalData] = useState<HistoricalDataPoint[]>(
    []
  );
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');

  // Generate historical data on mount
  useEffect(() => {
    setHistoricalData(generateHistoricalData(24));
  }, []);

  // Simulate live sensor updates every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setRooms((prev) =>
        prev.map((room) => ({
          ...room,
          sensors: generateSensorData(),
        }))
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // ─── Handlers ────────────────────────────────────────────────────────────

  const handleToggleLight = useCallback((roomId: string) => {
    setRooms((prev) =>
      prev.map((room) =>
        room.id === roomId ? { ...room, lightsOn: !room.lightsOn } : room
      )
    );
  }, []);

  const handleToggleLock = useCallback((roomId: string) => {
    setRooms((prev) =>
      prev.map((room) =>
        room.id === roomId ? { ...room, locked: !room.locked } : room
      )
    );
  }, []);

  const handleSetThermostat = useCallback(
    (roomId: string, temperature: number) => {
      setRooms((prev) =>
        prev.map((room) =>
          room.id === roomId
            ? { ...room, thermostatTarget: temperature }
            : room
        )
      );
    },
    []
  );

  const handleDismissAlert = useCallback((alertId: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== alertId));
  }, []);

  // ─── Derived Data ────────────────────────────────────────────────────────

  const onlineCameras = cctvFeeds.filter((f) => f.status === 'online').length;
  const unreadAlerts = alerts.filter((a) => !a.read).length;
  const avgTemp =
    rooms.length > 0
      ? parseFloat(
          (
            rooms.reduce((sum, r) => sum + r.sensors.temperature, 0) /
            rooms.length
          ).toFixed(1)
        )
      : 0;

  // ─── Tab Buttons ─────────────────────────────────────────────────────────

  const tabs: { key: DashboardTab; label: string; emoji: string }[] = [
    { key: 'overview', label: 'Overview', emoji: '📊' },
    { key: 'cctv', label: 'CCTV Feeds', emoji: '📹' },
    { key: 'controls', label: 'Controls', emoji: '🎛️' },
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <Header alertCount={unreadAlerts} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Status Overview Strip */}
        <StatusOverview
          roomsCount={rooms.length}
          onlineCameras={onlineCameras}
          activeAlerts={alerts.length}
          averageTemperature={avgTemp}
        />

        {/* Tab Navigation */}
        <div className="flex gap-2 border-b border-slate-700 pb-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2.5 rounded-t-lg text-sm font-medium transition-all duration-200 ${
                activeTab === tab.key
                  ? 'bg-slate-800 text-white border-b-2 border-blue-500'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-slate-800/50'
              }`}
            >
              <span className="mr-2">{tab.emoji}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* ─── Overview Tab ──────────────────────────────────────────────── */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Sensor Cards Grid */}
            <section>
              <h2 className="text-lg font-semibold text-white mb-4">
                🏠 Room Sensors
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {rooms.map((room) => (
                  <SensorCard
                    key={room.id}
                    room={room.name}
                    icon={roomIcons[room.icon] || roomIcons['Monitor']}
                    temperature={room.sensors.temperature}
                    humidity={room.sensors.humidity}
                    light={room.sensors.light}
                    motion={room.sensors.motion}
                    lightsOn={room.lightsOn}
                    locked={room.locked}
                    thermostatTarget={room.thermostatTarget}
                    onToggleLight={() => handleToggleLight(room.id)}
                    onToggleLock={() => handleToggleLock(room.id)}
                  />
                ))}
              </div>
            </section>

            {/* Historical Chart */}
            <section>
              <h2 className="text-lg font-semibold text-white mb-4">
                📈 Sensor Trends (24h)
              </h2>
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700/50">
                {historicalData.length > 0 && (
                  <SensorChart data={historicalData} />
                )}
              </div>
            </section>

            {/* Alerts */}
            <section>
              <h2 className="text-lg font-semibold text-white mb-4">
                🔔 Recent Alerts
              </h2>
              <div className="bg-slate-800 rounded-xl p-4 border border-slate-700/50 max-h-96 overflow-y-auto custom-scrollbar">
                <AlertsList
                  alerts={alerts}
                  onDismiss={handleDismissAlert}
                />
              </div>
            </section>
          </div>
        )}

        {/* ─── CCTV Tab ──────────────────────────────────────────────────── */}
        {activeTab === 'cctv' && (
          <section>
            <h2 className="text-lg font-semibold text-white mb-4">
              📹 Live Camera Feeds
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cctvFeeds.map((feed) => (
                <CCTVCard
                  key={feed.id}
                  name={feed.name}
                  location={feed.location}
                  status={feed.status}
                  motionDetected={feed.motionDetected}
                  resolution={feed.resolution}
                />
              ))}
            </div>
          </section>
        )}

        {/* ─── Controls Tab ──────────────────────────────────────────────── */}
        {activeTab === 'controls' && (
          <section>
            <h2 className="text-lg font-semibold text-white mb-4">
              🎛️ Quick Controls
            </h2>
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700/50">
              <QuickControls
                rooms={rooms.map((r) => ({
                  id: r.id,
                  name: r.name,
                  lightsOn: r.lightsOn,
                  locked: r.locked,
                  thermostatTarget: r.thermostatTarget,
                }))}
                onToggleLight={handleToggleLight}
                onToggleLock={handleToggleLock}
                onSetThermostat={handleSetThermostat}
              />
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 py-8 mt-8 border-t border-slate-800">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-500">
          <p>
            Smart Home Monitoring System — Venkata Rao Dechiraju & Sivanesan,
            SRMIST
          </p>
          <p>Built with Next.js • IoT & CCTV Integration</p>
        </div>
      </footer>
    </div>
  );
}
