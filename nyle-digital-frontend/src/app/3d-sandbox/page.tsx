'use client';

import { useEffect, useState } from 'react';
import SandboxCanvas from '@/components/sections/SandboxCanvas';
import TopologyVisualizer, { SystemNode } from '@/components/sections/TopologyVisualizer';
import {
  Activity,
  Cpu,
  Database,
  Grid,
  Settings2,
  Terminal,
  Layers,
  Sparkles,
  RefreshCw,
  Sliders,
  Play,
  RotateCcw,
} from 'lucide-react';

type Tab = 'geometry' | 'topology';
type ThemeColor = 'blue' | 'teal' | 'violet' | 'amber';
type MeshType = 'blob' | 'torus' | 'icosahedron' | 'wave' | 'card';

// Node data presets for server monitoring
const nodePresetList: Record<string, string[]> = {
  'client-web': [
    'GET /index.html - 200 OK - 8ms',
    'GET /_next/static/chunks/main.js - 200 OK - 4ms',
    'GET /api/portfolio - 200 OK - 24ms',
    'GET /assets/hero-bg.png - 200 OK - 82ms',
  ],
  'client-mobile': [
    'POST /api/auth/login - 200 OK - 42ms',
    'GET /api/user/profile - 200 OK - 18ms',
    'GET /api/notifications - 304 Not Modified - 12ms',
  ],
  'load-balancer': [
    'LB Router - Request forwarded to worker API gateway (10.0.1.12)',
    'LB Router - Distributed health check check: Node-A: OK, Node-B: OK',
    'LB Security - IP 192.168.1.105 verified against rate limit policy',
  ],
  'api-worker': [
    'API Gateway - GET /api/portfolio - Authenticated with OAuth2 JWT',
    'API Controller - Fetched 6 items from primary cache cluster',
    'API Runtime - Garbage collection completed in 2.2ms',
  ],
  'db-master': [
    'DB Transaction - BEGIN TRANSACTION ISOLATION LEVEL READ COMMITTED',
    'DB Query - SELECT * FROM portfolio_items WHERE active = true - 64ms',
    'DB Buffer Pool - Cache miss ratio: 2.1% - loading pages from storage disk',
    'DB Lock Manager - Shared lock acquired on table: settings',
  ],
};

export default function SandboxPage() {
  const [activeTab, setActiveTab] = useState<Tab>('geometry');

  // Geometry sandbox states
  const [meshType, setMeshType] = useState<MeshType>('blob');
  const [wireframe, setWireframe] = useState(false);
  const [roughness, setRoughness] = useState(0.2);
  const [metalness, setMetalness] = useState(0.8);
  const [distort, setDistort] = useState(1.0);
  const [themeColor, setThemeColor] = useState<ThemeColor>('blue');

  // System topology states
  const [selectedNode, setSelectedNode] = useState<SystemNode>({
    id: 'load-balancer',
    label: 'Cloud Ingress Balancer',
    type: 'balancer',
    position: [0, 0, 0],
    status: 'healthy',
    icon: Layers,
    metrics: { cpu: '12%', ram: '1.2GB', latency: '2ms', throughput: '215 req/s' },
  });
  const [logs, setLogs] = useState<string[]>([
    '[SYSTEM] Booting active system telemetry monitoring...',
    '[SYSTEM] Ingress Load Balancer standing by on port 443...',
    '[SYSTEM] Connected to primary Postgres DB cluster.',
  ]);

  // Telemetry log simulation
  useEffect(() => {
    if (activeTab !== 'topology') return;

    const interval = setInterval(() => {
      const timestamp = new Date().toLocaleTimeString();
      const nodeLogs = nodePresetList[selectedNode.id] || ['Ping telemetry heartbeat active'];
      const randomMsg = nodeLogs[Math.floor(Math.random() * nodeLogs.length)];
      
      setLogs((prev) => {
        const updated = [...prev, `[${timestamp}] [${selectedNode.id.toUpperCase()}] ${randomMsg}`];
        if (updated.length > 8) updated.shift();
        return updated;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [activeTab, selectedNode]);

  // Fluctuate latency/CPU metric slightly for realism
  const [liveCPU, setLiveCPU] = useState(selectedNode.metrics.cpu);
  const [liveLatency, setLiveLatency] = useState(selectedNode.metrics.latency);

  useEffect(() => {
    setLiveCPU(selectedNode.metrics.cpu);
    setLiveLatency(selectedNode.metrics.latency);
  }, [selectedNode]);

  useEffect(() => {
    if (activeTab !== 'topology') return;

    const metricInterval = setInterval(() => {
      const baseCpu = parseInt(selectedNode.metrics.cpu);
      const baseLat = parseInt(selectedNode.metrics.latency);
      
      const cpuChange = Math.floor(Math.random() * 5) - 2; // -2% to +2%
      const latChange = Math.floor(Math.random() * 7) - 3; // -3ms to +3ms

      setLiveCPU(`${Math.max(1, baseCpu + cpuChange)}%`);
      setLiveLatency(`${Math.max(1, baseLat + latChange)}ms`);
    }, 1800);

    return () => clearInterval(metricInterval);
  }, [activeTab, selectedNode]);

  const resetGeometrySettings = () => {
    setWireframe(false);
    setRoughness(0.2);
    setMetalness(0.8);
    setDistort(1.0);
  };

  return (
    <div className="min-h-screen pt-28 pb-16">
      <section className="section-atmosphere pb-10">
        <div className="section-shell relative z-10">
          <div className="glass-panel rounded-[2rem] px-6 py-10 sm:px-10">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 dark:border-blue-400/20 dark:bg-blue-500/10 dark:text-blue-200">
                <Sparkles className="h-4 w-4 text-blue-500 animate-pulse" />
                Nyle WebGL 3D Interactive Lab
              </span>
              <h1 className="mt-4 text-4xl font-semibold text-slate-950 dark:text-white sm:text-5xl">
                Dynamic 3D Geometry and System Telemetry
              </h1>
              <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
                Witness Next-Gen frontend WebGL components. Switch between custom organic shaders, 3D wireframes, and live system architectures. Drag and orbit the canvases to inspect the math in real-time.
              </p>
            </div>

            {/* Navigation Tabs */}
            <div className="mt-10 flex gap-4 border-b border-slate-200 dark:border-slate-800 pb-px">
              <button
                onClick={() => setActiveTab('geometry')}
                className={`pb-4 text-sm font-semibold border-b-2 px-2 transition-all ${
                  activeTab === 'geometry'
                    ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-300'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100'
                }`}
              >
                Geometry Engine Sandbox
              </button>
              <button
                onClick={() => setActiveTab('topology')}
                className={`pb-4 text-sm font-semibold border-b-2 px-2 transition-all ${
                  activeTab === 'topology'
                    ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-300'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100'
                }`}
              >
                Cloud Network Topology
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="section-atmosphere pb-12">
        <div className="section-shell relative z-10">
          {activeTab === 'geometry' ? (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              {/* WebGL 3D Canvas */}
              <div className="h-[480px] lg:h-[580px]">
                <SandboxCanvas
                  meshType={meshType}
                  wireframe={wireframe}
                  roughness={roughness}
                  metalness={metalness}
                  distort={distort}
                  themeColor={themeColor}
                />
              </div>

              {/* Control Panel */}
              <div className="glass-panel rounded-[2rem] p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-5 mb-6">
                    <div className="rounded-xl bg-blue-100 dark:bg-blue-500/10 p-2 text-blue-600 dark:text-blue-300">
                      <Sliders className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Shader Engine Controls</h2>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Manipulate mathematical values in real-time</p>
                    </div>
                  </div>

                  {/* Preset Geometries Selector */}
                  <div className="space-y-4">
                    <label className="text-sm font-semibold uppercase tracking-wider text-slate-500">Geometry Preset</label>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {[
                        { id: 'blob', label: 'Organic Blob' },
                        { id: 'torus', label: 'Neon Torus Knot' },
                        { id: 'icosahedron', label: 'Wireframe Core' },
                        { id: 'wave', label: 'Sine Flow Field' },
                        { id: 'card', label: 'Holographic Card' },
                      ].map((type) => (
                        <button
                          key={type.id}
                          onClick={() => setMeshType(type.id as MeshType)}
                          className={`rounded-xl px-4 py-3 text-xs font-semibold border text-center transition-all ${
                            meshType === type.id
                              ? 'border-blue-600 bg-blue-500/10 text-blue-600 dark:border-blue-400 dark:text-blue-300'
                              : 'border-slate-200 dark:border-slate-800 hover:border-slate-400'
                          }`}
                        >
                          {type.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sliders for details */}
                  <div className="space-y-6 mt-8">
                    {/* Wireframe toggle */}
                    <div className="flex justify-between items-center bg-slate-100/50 dark:bg-slate-900/50 px-5 py-4 rounded-2xl">
                      <div>
                        <div className="text-sm font-semibold text-slate-900 dark:text-white">Wireframe Structure</div>
                        <div className="text-xs text-slate-500">Render barebones polygon vertices</div>
                      </div>
                      <button
                        onClick={() => setWireframe(!wireframe)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all ${
                          wireframe ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-all ${
                            wireframe ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Color Theme Selector */}
                    <div className="space-y-3">
                      <label className="text-sm font-semibold uppercase tracking-wider text-slate-500">Laser Glow Hue</label>
                      <div className="flex gap-4">
                        {(['blue', 'teal', 'violet', 'amber'] as ThemeColor[]).map((col) => {
                          const bgColors = {
                            blue: 'bg-blue-500',
                            teal: 'bg-teal-500',
                            violet: 'bg-violet-500',
                            amber: 'bg-amber-500',
                          };
                          return (
                            <button
                              key={col}
                              onClick={() => setThemeColor(col)}
                              className={`h-8 w-8 rounded-full border-2 transition-all ${bgColors[col]} ${
                                themeColor === col ? 'border-white scale-110 ring-2 ring-blue-500' : 'border-transparent'
                              }`}
                              aria-label={`Select ${col} theme`}
                            />
                          );
                        })}
                      </div>
                    </div>

                    {/* Roughness Slider */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">Surface Roughness</span>
                        <span className="font-mono text-blue-600 dark:text-blue-300">{roughness.toFixed(2)}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={roughness}
                        onChange={(e) => setRoughness(parseFloat(e.target.value))}
                        className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-blue-400"
                      />
                    </div>

                    {/* Metalness Slider */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">Metalness Reflection</span>
                        <span className="font-mono text-blue-600 dark:text-blue-300">{metalness.toFixed(2)}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={metalness}
                        onChange={(e) => setMetalness(parseFloat(e.target.value))}
                        className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-blue-400"
                      />
                    </div>

                    {meshType === 'blob' && (
                      /* Distortion noise Slider */
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-semibold text-slate-700 dark:text-slate-300">Organic Swell Factor</span>
                          <span className="font-mono text-blue-600 dark:text-blue-300">{distort.toFixed(2)}</span>
                        </div>
                        <input
                          type="range"
                          min="0.1"
                          max="2"
                          step="0.1"
                          value={distort}
                          onChange={(e) => setDistort(parseFloat(e.target.value))}
                          className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-blue-400"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-8 flex justify-end gap-3 border-t border-slate-200 dark:border-slate-800 pt-5">
                  <button
                    onClick={resetGeometrySettings}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-800 bg-white/50 px-5 py-3 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-900"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Reset
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              {/* Live 3D Network Topology Canvas */}
              <div className="h-[480px] lg:h-[580px]">
                <TopologyVisualizer
                  onSelectNode={(node) => setSelectedNode(node)}
                  selectedNodeId={selectedNode.id}
                />
              </div>

              {/* Topology Analytics Sidebar */}
              <div className="flex flex-col gap-6">
                {/* Simulated Server Inspector */}
                <div className="glass-panel rounded-[2rem] p-8">
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-5 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-teal-100 dark:bg-teal-500/10 p-2 text-teal-600 dark:text-teal-300">
                        <Activity className="h-5 w-5 animate-pulse" />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Active Node Telemetry</h2>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Direct connection details</p>
                      </div>
                    </div>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
                        selectedNode.status === 'healthy'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-500/10 dark:text-amber-300'
                      }`}
                    >
                      {selectedNode.status === 'healthy' ? 'Active / Healthy' : 'High Resource Load'}
                    </span>
                  </div>

                  {/* Active node specifics */}
                  <div className="space-y-5">
                    <div>
                      <div className="text-xs uppercase tracking-wider text-slate-400">Node Target</div>
                      <div className="text-lg font-semibold text-slate-900 dark:text-white">{selectedNode.label}</div>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-100/50 dark:bg-slate-900/50 px-4 py-3 rounded-2xl border border-slate-200/50 dark:border-slate-800/50">
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <Cpu className="h-3.5 w-3.5 text-blue-500" />
                          CPU Load
                        </div>
                        <div className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-1">
                          {liveCPU}
                        </div>
                      </div>
                      <div className="bg-slate-100/50 dark:bg-slate-900/50 px-4 py-3 rounded-2xl border border-slate-200/50 dark:border-slate-800/50">
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <Database className="h-3.5 w-3.5 text-teal-500" />
                          Memory usage
                        </div>
                        <div className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-1">
                          {selectedNode.metrics.ram}
                        </div>
                      </div>
                      <div className="bg-slate-100/50 dark:bg-slate-900/50 px-4 py-3 rounded-2xl border border-slate-200/50 dark:border-slate-800/50">
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <Activity className="h-3.5 w-3.5 text-rose-500" />
                          Internal Latency
                        </div>
                        <div className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-1">
                          {liveLatency}
                        </div>
                      </div>
                      <div className="bg-slate-100/50 dark:bg-slate-900/50 px-4 py-3 rounded-2xl border border-slate-200/50 dark:border-slate-800/50">
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <Grid className="h-3.5 w-3.5 text-amber-500" />
                          Capacity Limit
                        </div>
                        <div className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-1">
                          {selectedNode.metrics.throughput}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Simulated Diagnostic Logs Terminal */}
                <div className="glass-panel rounded-[2rem] p-6 bg-black/80 dark:bg-slate-950/80 border-slate-900 flex-grow">
                  <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-400 border-b border-slate-800 pb-3 mb-4">
                    <Terminal className="h-4 w-4 text-emerald-400 animate-pulse" />
                    <span>DIAGNOSTIC LOG MONITOR - TELEMETRY HEARTBEAT</span>
                  </div>

                  <div className="font-mono text-xs text-emerald-500 space-y-2 min-h-[148px]">
                    {logs.map((log, index) => (
                      <div key={index} className="leading-relaxed break-all">
                        {log}
                      </div>
                    ))}
                    <div className="inline-block w-1.5 h-3 bg-emerald-400 animate-pulse ml-0.5" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
