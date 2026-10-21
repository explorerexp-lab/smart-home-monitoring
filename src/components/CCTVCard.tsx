'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Camera,
  Eye,
  Wifi,
  WifiOff,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  RefreshCw,
  Radio,
  Sliders,
  Check,
} from 'lucide-react';
import { cameraPresets, CameraPreset } from '@/lib/mock-data';

export interface CCTVCardProps {
  id?: string;
  name: string;
  location: string;
  status: 'online' | 'offline';
  motionDetected: boolean;
  resolution: string;
  streamUrl?: string;
  streamType?: 'youtube' | 'video' | 'iframe';
  description?: string;
  onToggleStatus?: (id: string) => void;
  onUpdateStream?: (id: string, newUrl: string, presetName?: string) => void;
}

function extractYouTubeId(input: string): string | null {
  if (!input) return null;
  const trimmed = input.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;
  const match = trimmed.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/
  );
  return match ? match[1] : null;
}

export default function CCTVCard({
  id = 'cam-feed',
  name,
  location,
  status: initialStatus,
  motionDetected: initialMotion,
  resolution,
  streamUrl: initialStreamUrl = '26wX6-esfwE',
  streamType = 'youtube',
  description,
  onToggleStatus,
  onUpdateStream,
}: CCTVCardProps) {
  const [currentStatus, setCurrentStatus] = useState<'online' | 'offline'>(initialStatus);
  const [currentStream, setCurrentStream] = useState<string>(initialStreamUrl);
  const [motionDetected, setMotionDetected] = useState<boolean>(initialMotion);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showConfig, setShowConfig] = useState<boolean>(false);
  const [customInput, setCustomInput] = useState<string>('');
  const [timestamp, setTimestamp] = useState<Date>(new Date());
  const [fps, setFps] = useState<number>(29.9);
  const [isReloading, setIsReloading] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Sync internal status if parent props change
  useEffect(() => {
    setCurrentStatus(initialStatus);
  }, [initialStatus]);

  useEffect(() => {
    setMotionDetected(initialMotion);
  }, [initialMotion]);

  useEffect(() => {
    if (initialStreamUrl) {
      setCurrentStream(initialStreamUrl);
    }
  }, [initialStreamUrl]);

  // Clock ticker & simulated frame rate jitter
  useEffect(() => {
    const clockInterval = setInterval(() => {
      setTimestamp(new Date());
    }, 1000);

    const fpsInterval = setInterval(() => {
      setFps(parseFloat((29.8 + Math.random() * 0.4).toFixed(1)));
    }, 3000);

    return () => {
      clearInterval(clockInterval);
      clearInterval(fpsInterval);
    };
  }, []);

  const isOnline = currentStatus === 'online';
  const youtubeId = extractYouTubeId(currentStream);

  const formattedTimestamp = timestamp.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const formattedDate = timestamp.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const toggleStatus = () => {
    const nextStatus = currentStatus === 'online' ? 'offline' : 'online';
    setCurrentStatus(nextStatus);
    if (onToggleStatus) onToggleStatus(id);
  };

  const handleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => {
        console.error('Fullscreen request failed:', err);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleSelectPreset = (preset: CameraPreset) => {
    setCurrentStream(preset.streamUrl);
    setShowConfig(false);
    if (onUpdateStream) onUpdateStream(id, preset.streamUrl, preset.label);
  };

  const handleApplyCustomUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    setCurrentStream(customInput.trim());
    setCustomInput('');
    setShowConfig(false);
    if (onUpdateStream) onUpdateStream(id, customInput.trim());
  };

  const reloadStream = () => {
    setIsReloading(true);
    setTimeout(() => setIsReloading(false), 800);
  };

  return (
    <div
      ref={containerRef}
      className={`group bg-slate-900 rounded-xl overflow-hidden border border-slate-700/60 shadow-xl transition-all duration-300 flex flex-col ${
        isFullscreen ? 'w-full h-full p-2' : ''
      }`}
    >
      {/* ─── Video Viewport ─── */}
      <div className="relative aspect-video w-full bg-black overflow-hidden select-none">
        {/* Real Live Video Feed */}
        {isOnline && !isReloading ? (
          youtubeId ? (
            <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
              <iframe
                title={`Live Stream: ${name}`}
                src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&mute=${
                  isMuted ? 1 : 0
                }&controls=0&modestbranding=1&loop=1&playsinline=1&rel=0&iv_load_policy=3&disablekb=1`}
                className="w-full h-[135%] -translate-y-[12%] object-cover pointer-events-auto scale-105"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <video
              src={currentStream}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          )
        ) : (
          /* Offline / Reloading Static Screen */
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-black flex flex-col items-center justify-center p-6 text-center">
            <div className="relative mb-3">
              <WifiOff className="w-12 h-12 text-red-500/80 animate-pulse" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600" />
              </span>
            </div>
            <p className="text-white font-mono font-bold tracking-widest text-base">
              SIGNAL LOST // FEED OFFLINE
            </p>
            <p className="text-gray-400 text-xs mt-1 font-mono">
              IP: 192.168.1.{id.replace(/\D/g, '') || '42'} • RTSP / H.264
            </p>
            <button
              onClick={toggleStatus}
              className="mt-4 px-3 py-1.5 text-xs font-mono font-medium rounded bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-md flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Reconnect Camera
            </button>
          </div>
        )}

        {/* ─── CCTV CRT Scanlines & Vignette Overlay ─── */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.06) 2px, rgba(255,255,255,0.06) 4px)',
          }}
        />
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_60%,_rgba(0,0,0,0.65)_100%)]" />

        {/* ─── HUD: Top-Left (Camera Identification) ─── */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-2 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded border border-white/10 z-10">
          <Camera className="w-3.5 h-3.5 text-emerald-400" />
          <div className="flex flex-col">
            <span className="text-xs font-mono font-bold text-white tracking-wider uppercase leading-none">
              {name}
            </span>
            <span className="text-[10px] font-mono text-gray-300 leading-tight">
              {location}
            </span>
          </div>
        </div>

        {/* ─── HUD: Top-Right (Live Indicator & Actions) ─── */}
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 z-10">
          {isOnline && (
            <div className="flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-2 py-1 rounded border border-white/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
              </span>
              <span className="text-[11px] font-mono font-extrabold text-white tracking-wider">
                LIVE
              </span>
            </div>
          )}

          {/* Audio Mute/Unmute */}
          {isOnline && (
            <button
              onClick={() => setIsMuted(!isMuted)}
              title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
              className="p-1.5 rounded bg-black/60 hover:bg-black/90 backdrop-blur-md text-white/90 hover:text-white border border-white/10 transition-colors"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
            </button>
          )}

          {/* Reload Stream */}
          <button
            onClick={reloadStream}
            title="Reload Video Feed"
            className="p-1.5 rounded bg-black/60 hover:bg-black/90 backdrop-blur-md text-white/90 hover:text-white border border-white/10 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isReloading ? 'animate-spin text-blue-400' : ''}`} />
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={handleFullscreen}
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Stream'}
            className="p-1.5 rounded bg-black/60 hover:bg-black/90 backdrop-blur-md text-white/90 hover:text-white border border-white/10 transition-colors"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* ─── HUD: Center Motion Detection Alert Box ─── */}
        {isOnline && motionDetected && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            {/* Target Crosshair Bounding Box */}
            <div className="relative w-48 h-28 border-2 border-red-500/80 rounded-sm animate-pulse bg-red-950/20 backdrop-blur-[1px] flex flex-col justify-between p-1.5 shadow-[0_0_15px_rgba(239,68,68,0.5)]">
              <div className="flex justify-between items-center text-[10px] font-mono font-bold text-red-400">
                <span>AI OBJECT DETECT</span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3 text-red-400" /> 98.4%
                </span>
              </div>
              <div className="bg-red-600/90 text-white text-center py-0.5 rounded text-xs font-mono font-black tracking-widest uppercase">
                MOTION DETECTED
              </div>
              <div className="flex justify-between text-[9px] font-mono text-red-300">
                <span>ZONE: A-1</span>
                <span>TRACKING ACTIVE</span>
              </div>
            </div>
          </div>
        )}

        {/* ─── HUD: Bottom-Left (REC & Technical Specs) ─── */}
        <div className="absolute bottom-2.5 left-2.5 flex items-center gap-2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded border border-white/10 z-10 text-[10px] font-mono">
          {isOnline ? (
            <>
              <div className="flex items-center gap-1 text-red-400 font-bold">
                <span>REC</span>
                <span className="text-red-500 animate-pulse">●</span>
              </div>
              <span className="text-gray-400">|</span>
              <span className="text-emerald-400">{fps} FPS</span>
              <span className="text-gray-400">|</span>
              <span className="text-gray-300">{resolution}</span>
            </>
          ) : (
            <span className="text-red-400 font-bold">STANDBY</span>
          )}
        </div>

        {/* ─── HUD: Bottom-Right (Live Dynamic Timestamp) ─── */}
        <div className="absolute bottom-2.5 right-2.5 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded border border-white/10 z-10 text-[10px] font-mono text-white/90">
          <span>{formattedDate}</span>
          <span className="ml-1 text-emerald-400 font-bold">{formattedTimestamp}</span>
        </div>
      </div>

      {/* ─── Camera Control Bar Underneath Viewport ─── */}
      <div className="p-3 bg-slate-800/90 border-t border-slate-700/50 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          {/* Status & Location Info */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleStatus}
              title={isOnline ? 'Disconnect Stream' : 'Connect Stream'}
              className="flex items-center gap-1.5 focus:outline-none group/toggle"
            >
              <span
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  isOnline
                    ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]'
                    : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]'
                }`}
              />
              <span className="text-xs font-mono font-medium text-gray-300 group-hover/toggle:text-white transition-colors">
                {isOnline ? 'ONLINE' : 'OFFLINE'}
              </span>
            </button>

            <span className="text-xs text-gray-500">•</span>

            <span className="text-xs text-gray-400 font-mono truncate max-w-[150px] sm:max-w-[220px]">
              {description || location}
            </span>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-1.5">
            {/* Motion Simulation Trigger */}
            <button
              onClick={() => setMotionDetected(!motionDetected)}
              title={motionDetected ? 'Clear Motion Alert' : 'Trigger Motion Test'}
              className={`px-2 py-1 text-[11px] font-mono rounded flex items-center gap-1 border transition-all ${
                motionDetected
                  ? 'bg-red-500/20 text-red-300 border-red-500/50 hover:bg-red-500/30'
                  : 'bg-slate-700/50 text-gray-400 border-slate-600/50 hover:text-gray-200'
              }`}
            >
              <Radio className="w-3 h-3" />
              <span>{motionDetected ? 'Motion ON' : 'Test Motion'}</span>
            </button>

            {/* Presets & Stream Source Selector */}
            <button
              onClick={() => setShowConfig(!showConfig)}
              title="Change CCTV Stream Feed"
              className={`px-2 py-1 text-[11px] font-mono rounded flex items-center gap-1 border transition-all ${
                showConfig
                  ? 'bg-blue-600 text-white border-blue-500'
                  : 'bg-slate-700/60 text-gray-300 border-slate-600 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <Sliders className="w-3 h-3" />
              <span>Feed Source</span>
            </button>
          </div>
        </div>

        {/* ─── Expandable Preset / Custom Stream Chooser ─── */}
        {showConfig && (
          <div className="mt-2 pt-2 border-t border-slate-700/60 flex flex-col gap-2.5 animate-in fade-in duration-150">
            <div>
              <p className="text-[11px] font-mono font-semibold text-gray-300 mb-1.5 flex items-center gap-1">
                🌐 Switch to Live Open CCTV Cameras:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-36 overflow-y-auto custom-scrollbar pr-1">
                {cameraPresets.map((preset) => {
                  const isCurrent = currentStream === preset.streamUrl;
                  return (
                    <button
                      key={preset.id}
                      onClick={() => handleSelectPreset(preset)}
                      className={`text-left p-1.5 rounded text-[11px] font-mono border transition-all flex items-center justify-between gap-1 ${
                        isCurrent
                          ? 'bg-blue-600/30 text-blue-200 border-blue-500/60 font-semibold'
                          : 'bg-slate-800 text-gray-300 border-slate-700/70 hover:bg-slate-700/80 hover:text-white'
                      }`}
                    >
                      <div className="truncate">
                        <span className="text-[10px] text-gray-400 block leading-tight">
                          [{preset.room}]
                        </span>
                        <span className="truncate block">{preset.label}</span>
                      </div>
                      {isCurrent && <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom URL Input */}
            <form onSubmit={handleApplyCustomUrl} className="flex gap-1.5">
              <input
                type="text"
                placeholder="Or paste any YouTube Live / Stream URL or ID..."
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-white placeholder-gray-500 font-mono focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-mono font-medium transition-colors"
              >
                Apply
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
