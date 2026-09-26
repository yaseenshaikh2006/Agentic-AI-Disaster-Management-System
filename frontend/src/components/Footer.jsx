import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Mail, Radio, HeartPulse, Activity } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-[#070b14] text-slate-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        
        {/* Brand & Mission */}
        <div className="md:col-span-2 space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-red-600 to-orange-500 flex items-center justify-center shadow-md shadow-red-600/30">
              <span className="text-white text-base font-black">⚡</span>
            </div>
            <span className="font-extrabold text-white text-lg tracking-tight">
              Anti<span className="text-red-500">Calamity</span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20">
              EOC Autonomous Core
            </span>
          </div>
          <p className="text-xs text-slate-400 max-w-md leading-relaxed">
            Autonomous multi-agent disaster response infrastructure. Integrating real-time IoT telemetry, 
            multimodal crisis triage, and dynamic resource dispatch to minimize response latency when seconds count.
          </p>
        </div>

        {/* Coordinated Platform Routes */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
            Operations Matrix
          </h3>
          <ul className="space-y-2 text-xs">
            <li>
              <Link to="/map" className="hover:text-white transition flex items-center gap-1.5">
                <span>🗺️</span> Live Operations Map
              </Link>
            </li>
            <li>
              <Link to="/report" className="hover:text-amber-400 transition flex items-center gap-1.5">
                <span>🚨</span> Report Emergency Incident
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="hover:text-white transition flex items-center gap-1.5">
                <span>📊</span> Citizen Safety Feeds
              </Link>
            </li>
            <li>
              <Link to="/government" className="hover:text-white transition flex items-center gap-1.5">
                <span>🏛️</span> Gov Command Console
              </Link>
            </li>
            <li>
              <Link to="/relief" className="hover:text-white transition flex items-center gap-1.5">
                <span>📦</span> Relief & Resource Hub
              </Link>
            </li>
          </ul>
        </div>

        {/* Emergency Node / Contact */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
            EOC Dispatch Node
          </h3>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <Mail size={14} className="text-orange-400" />
              <span>eoc@anticalamity.org</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-400 text-[11px] pt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span>24/7 Multi-Agent Coordination Active</span>
            </div>
            <p className="text-[11px] text-slate-500 pt-2 leading-relaxed">
              Prioritized routing enabled for first responder squads and municipal authorities.
            </p>
          </div>
        </div>

      </div>

      {/* Bottom Legal / Status Bar */}
      <div className="max-w-7xl mx-auto pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
        <div>
          © 2026 AntiCalamity Intelligence Systems. Built for high-consequence crisis response.
        </div>
        <div className="flex items-center gap-4">
          <span className="inline-flex items-center gap-1.5 text-slate-400">
            <Radio size={12} className="text-emerald-500" />
            Field Mesh Ready
          </span>
          <span className="inline-flex items-center gap-1.5 text-slate-400">
            <Shield size={12} className="text-blue-500" />
            Role-Guarded Command
          </span>
        </div>
      </div>
    </footer>
  );
}
