'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Sofa,
  BedDouble,
  CookingPot,
  Car,
  TreePine,
  Monitor,
  Camera,
  ArrowRight,
  Zap,
  Leaf,
  ShieldCheck,
  Sliders,
  Sparkles,
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
import { useTheme } from '@/context/ThemeContext';

// ─── Room Icon Map ───────────────────────────────────────────────────────────

const roomIcons: Record<string, React.ReactNode> = {
  Sofa: <Sofa className="w-5 h-5 text-blue-400" />,
  Bed: <BedDouble className="w-5 h-5 text-purple-400" />,
  CookingPot: <CookingPot className="w-5 h-5 text-amber-400" />,
  Car: <Car className="w-5 h-5 text-zinc-400" />,
  TreePine: <TreePine className="w-5 h-5 text-emerald-400" />,
  Monitor: <Monitor className="w-5 h-5 text-cyan-400" />,
};

// ─── Active Tab Type ─────────────────────────────────────────────────────────

type DashboardTab = 'overview' | 'cctv' | 'controls';

// ─── Main Dashboard Page ─────────────────────────────────────────────────────

export default function DashboardPage() {
  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);
  const [cctvFeeds, setCctvFeeds] = useState<CCTVFeed[]>(initialCCTVFeeds);
  const [cctvFilter, setCctvFilter] = useState<string>('all');
  const [historicalData, setHistoricalData] = useState<HistoricalDataPoint[]>([]);
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [showOledBanner, setShowOledBanner] = useState<boolean>(true);

  const { theme, isOLED, powerSavings, setTheme } = useTheme();

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

  const handleToggleCCTVStatus = useCallback((feedId: string) => {
    setCctvFeeds((prev) =>
      prev.map((feed) =>
        feed.id === feedId
          ? {
              ...feed,
              status: feed.status === 'online' ? 'offline' : 'online',
            }
          : feed
      )
    );
  }, []);

  const handleUpdateCCTVStream = useCallback(
    (feedId: string, newUrl: string, presetName?: string) => {
      setCctvFeeds((prev) =>
        prev.map((feed) =>
          feed.id === feedId
            ? {
                ...feed,
                streamUrl: newUrl,
                description: presetName
                  ? `${presetName} (Active)`
                  : feed.description,
              }
            : feed
        )
      );
    },
    []
  );

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

  // Filtered CCTV feeds
  const displayedCctvFeeds =
    cctvFilter === 'all'
      ? cctvFeeds
      : cctvFeeds.filter(
          (feed) => feed.name.toLowerCase() === cctvFilter.toLowerCase()
        );

  // Primary live camera for overview spotlight (default to Kitchen)
  const spotlightFeed =
    cctvFeeds.find((f) => f.name.toLowerCase() === 'kitchen') || cctvFeeds[0];

  // ─── Tab Buttons ─────────────────────────────────────────────────────────

  const tabs: { key: DashboardTab; label: string; emoji: string }[] = [
    { key: 'overview', label: 'Overview', emoji: '📊' },
    { key: 'cctv', label: 'CCTV Feeds', emoji: '📹' },
    { key: 'controls', label: 'Controls', emoji: '🎛️' },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)] transition-colors duration-200">
      {/* Header with OLED / Theme Switcher */}
      <Header alertCount={unreadAlerts} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* OLED Screen Optimization Efficiency Bar */}
        {isOLED && showOledBanner && (
          <div className="rounded-xl p-3 sm:p-3.5 bg-black border border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.15)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shrink-0">
                <Zap className="w-4 h-4 fill-emerald-400 text-emerald-400" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-mono font-bold text-white tracking-wide">
                    OLED PURE BLACK MODE ACTIVE
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    True #000000 Pixel Shutoff
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 mt-0.5 leading-snug">
                  Zero backlight bleed • Infinite 1,000,000:1 contrast • Minimizes battery drain and OLED burn-in risk.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
              <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-700 text-emerald-400 font-bold">
                {powerSavings}
              </span>
              <button
                onClick={() => setShowOledBanner(false)}
                className="text-[11px] text-zinc-500 hover:text-zinc-300 font-mono px-2 py-1 rounded hover:bg-zinc-900 transition-colors"
                title="Dismiss OLED info bar"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* Status Overview Strip */}
        <StatusOverview
          roomsCount={rooms.length}
          onlineCameras={onlineCameras}
          activeAlerts={alerts.length}
          averageTemperature={avgTemp}
        />

        {/* Tab Navigation */}
        <div className="flex gap-2 border-b border-[var(--border-color)] pb-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2.5 rounded-t-lg text-sm font-medium transition-all duration-200 border-b-2 ${
                  isActive
                    ? isOLED
                      ? 'bg-zinc-900 text-white border-emerald-500 shadow-sm'
                      : 'bg-[var(--bg-card)] text-[var(--text-primary)] border-blue-500 shadow-sm'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)] border-transparent'
                }`}
              >
                <span className="mr-2">{tab.emoji}</span>
                {tab.label}
                {tab.key === 'cctv' && (
                  <span className="ml-2 px-1.5 py-0.5 text-[10px] font-mono bg-emerald-500/20 text-emerald-400 rounded-full border border-emerald-500/30">
                    {onlineCameras} LIVE
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ─── Overview Tab ──────────────────────────────────────────────── */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Spotlight: Real-time CCTV Stream & Room Sensors Combined */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              {/* Live Spotlight Feed (Kitchen / Primary Cam) */}
              <div className="lg:col-span-1 space-y-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--text-primary)] flex items-center gap-2">
                    <Camera className="w-4 h-4 text-emerald-400" />
                    <span>Real-Time CCTV Spotlight</span>
                  </h2>
                  <button
                    onClick={() => setActiveTab('cctv')}
                    className="text-xs font-mono text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
                  >
                    All Feeds ({cctvFeeds.length}) <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
                {spotlightFeed && (
                  <CCTVCard
                    id={spotlightFeed.id}
                    name={spotlightFeed.name}
                    location={spotlightFeed.location}
                    status={spotlightFeed.status}
                    motionDetected={spotlightFeed.motionDetected}
                    resolution={spotlightFeed.resolution}
                    streamUrl={spotlightFeed.streamUrl}
                    streamType={spotlightFeed.streamType}
                    description={spotlightFeed.description}
                    onToggleStatus={handleToggleCCTVStatus}
                    onUpdateStream={handleUpdateCCTVStream}
                  />
                )}
              </div>

              {/* Room Sensors Grid */}
              <div className="lg:col-span-2 space-y-2">
                <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--text-primary)]">
                  🏠 Room Environmental Telemetry
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {rooms.slice(0, 4).map((room) => (
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
              </div>
            </section>

            {/* Remaining Room Sensors (if > 4) */}
            {rooms.length > 4 && (
              <section>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                  {rooms.slice(4).map((room) => (
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
            )}

            {/* Historical Chart */}
            <section>
              <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--text-primary)] mb-3">
                📈 Telemetry Trends (24h IoT History)
              </h2>
              {historicalData.length > 0 && (
                <SensorChart data={historicalData} />
              )}
            </section>

            {/* Alerts */}
            <section>
              <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--text-primary)] mb-3">
                🔔 Recent Security & Environmental Alerts
              </h2>
              <AlertsList alerts={alerts} onDismiss={handleDismissAlert} />
            </section>
          </div>
        )}

        {/* ─── CCTV Tab ──────────────────────────────────────────────────── */}
        {activeTab === 'cctv' && (
          <section className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
                  <Camera className="w-5 h-5 text-emerald-400" />
                  <span>Real-Time CCTV Multi-Feed Console</span>
                </h2>
                <p className="text-xs text-[var(--text-muted)] font-mono mt-0.5">
                  Streaming 24/7 live open world feeds with AI Motion Detection HUD & preset selector.
                </p>
              </div>

              {/* Room Camera Filters */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  onClick={() => setCctvFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                    cctvFilter === 'all'
                      ? isOLED
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'bg-blue-600 text-white shadow-md'
                      : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)]'
                  }`}
                >
                  All ({cctvFeeds.length})
                </button>
                {cctvFeeds.map((feed) => (
                  <button
                    key={feed.id}
                    onClick={() => setCctvFilter(feed.name)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                      cctvFilter.toLowerCase() === feed.name.toLowerCase()
                        ? isOLED
                          ? 'bg-emerald-600 text-white shadow-md'
                          : 'bg-blue-600 text-white shadow-md'
                        : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)]'
                    }`}
                  >
                    {feed.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Camera Feeds Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {displayedCctvFeeds.map((feed) => (
                <CCTVCard
                  key={feed.id}
                  id={feed.id}
                  name={feed.name}
                  location={feed.location}
                  status={feed.status}
                  motionDetected={feed.motionDetected}
                  resolution={feed.resolution}
                  streamUrl={feed.streamUrl}
                  streamType={feed.streamType}
                  description={feed.description}
                  onToggleStatus={handleToggleCCTVStatus}
                  onUpdateStream={handleUpdateCCTVStream}
                />
              ))}
            </div>
          </section>
        )}

        {/* ─── Controls Tab ──────────────────────────────────────────────── */}
        {activeTab === 'controls' && (
          <section className="space-y-4">
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Sliders className="w-5 h-5 text-emerald-400" />
              <span>Smart Home Actuator & Automation Relays</span>
            </h2>
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
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 py-8 mt-12 border-t border-[var(--border-color)] text-xs text-[var(--text-muted)] font-mono transition-colors">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            Smart Home Monitoring System — Venkata Rao Dechiraju & Sivanesan, SRMIST
          </p>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <Zap className="w-3.5 h-3.5 fill-emerald-400" />
              <span>OLED-Optimized Display</span>
            </span>
            <span>•</span>
            <span>Next.js 14 • 24/7 CCTV & IoT Telemetry</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
