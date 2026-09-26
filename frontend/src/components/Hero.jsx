import React from 'react';
import { Link } from 'react-router-dom';

const SYSTEM_CAPABILITIES = [
  {
    icon: '🛰️',
    title: 'Autonomous Geospatial Triage',
    desc: 'Multi-agent neural vision models process field imagery and telemetry to estimate water depth, structural collapse, and critical risk perimeters in real time.'
  },
  {
    icon: '📦',
    title: 'Dynamic Resource Dispatch',
    desc: 'Logistics agents balance shelter bed availability, medical gear, and rescue vehicle routes to eliminate aid distribution bottlenecks.'
  },
  {
    icon: '📡',
    title: 'Emergency Mesh Readiness',
    desc: 'Built to ingest crowd-sourced citizen alerts with client-side compression and store-and-forward protocols under degraded field connectivity.'
  },
  {
    icon: '🏛️',
    title: 'Inter-Agency Command Bridge',
    desc: 'Unified operational picture connecting municipal authorities, disaster response forces (NDRF), and local volunteers into one synchronization hub.'
  }
];

export default function Hero() {
  return (
    <main>
      {/* Live Operational Ticker */}
      <div className="border-b border-slate-800/80 bg-slate-950/90 py-2.5 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="font-mono uppercase font-bold text-slate-300">SYSTEM STATUS: ALL TELEMETRY NODES ACTIVE</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-slate-400 font-mono text-[11px]">
            <span>ACTIVE MONITORS: 14</span>
            <span>DISPATCHED UNITS: 38</span>
            <span>AI AGENTS SYNCED: 4/4</span>
          </div>
        </div>
      </div>

      {/* Hero Content Section */}
      <section className="relative pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-8">
        
        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 text-xs font-semibold shadow-lg shadow-red-500/10">
          <span className="text-base">⚡</span>
          <span>Next-Gen Agentic Disaster Response Infrastructure</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-4xl mx-auto leading-tight sm:leading-none">
          Autonomous Coordination When <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-amber-400">Seconds Count.</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          A synchronized crisis response ecosystem powered by autonomous AI agents—triaging incidents, deploying critical supplies, and guiding citizens to safety.
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            to="/report"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 shadow-xl shadow-red-600/30 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <span>🚨</span>
            <span>Report Emergency Incident</span>
          </Link>
          <Link
            to="/map"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-600 shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <span>🗺️</span>
            <span>View Live Operations Map</span>
          </Link>
        </div>

        {/* Telemetry Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 text-left">
          {[
            { label: 'Avg Triage Speed', val: '< 1.8s', desc: 'Neural hazard classification' },
            { label: 'Relief Routing', val: 'Real-Time', desc: 'Autonomous logistics agents' },
            { label: 'Payload Footprint', val: '~180 KB', desc: 'Low-bandwidth image pipeline' },
            { label: 'EOC Synchronization', val: '99.9%', desc: 'Unified situational picture' },
          ].map((stat, i) => (
            <div key={i} className="p-4 rounded-2xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-white">{stat.val}</div>
              <div className="text-xs font-bold text-slate-300 mt-1">{stat.label}</div>
              <div className="text-[11px] text-slate-500 mt-0.5">{stat.desc}</div>
            </div>
          ))}
        </div>

      </section>

      {/* Architecture Capabilities Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-widest text-red-500 font-mono">Agentic Architecture</h2>
          <p className="text-2xl sm:text-3xl font-extrabold text-white">Engineered for High-Consequence Environments</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SYSTEM_CAPABILITIES.map((cap, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl border border-slate-800 bg-slate-900/50 hover:border-slate-700 transition space-y-3 group"
            >
              <div className="text-3xl p-2.5 rounded-xl bg-slate-800/60 w-fit group-hover:scale-110 transition-transform">
                {cap.icon}
              </div>
              <h3 className="text-lg font-bold text-white">{cap.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{cap.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}