import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MOCK_USER_REPORTS = [
  {
    id: 'REP-902',
    type: 'Flash Flood',
    location: 'Kurla West, Ward L',
    date: 'Today, 10:14 AM',
    status: 'Verified by AI',
    statusColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    severity: 'Critical',
    unitsDispatched: '2 NDRF Teams'
  },
  {
    id: 'REP-881',
    type: 'Uprooted Tree / Road Block',
    location: 'SVT Road, Santacruz',
    date: 'Yesterday, 4:20 PM',
    status: 'Resolved',
    statusColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    severity: 'Medium',
    unitsDispatched: 'Municipal BMC Crew'
  }
];

const EMERGENCY_BROADCASTS = [
  {
    id: 1,
    title: 'High Tide Warning (4.87m)',
    desc: 'Expected at 13:42 IST along coastal sections. Avoid promenade and low-lying coastal paths.',
    level: 'Warning',
    time: '25m ago',
    badgeColor: 'bg-red-500/20 text-red-400 border-red-500/30'
  },
  {
    id: 2,
    title: 'Clean Water Point Activated',
    desc: 'Relief distribution vehicle positioned at Community Hall No. 3 with drinking supplies.',
    level: 'Relief',
    time: '1h ago',
    badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
  }
];

export default function Dashboard() {
  const [reports] = useState(MOCK_USER_REPORTS);
  const [broadcasts] = useState(EMERGENCY_BROADCASTS);

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 p-4 sm:p-6 lg:p-8 space-y-6">
      
      {/* Welcome Banner / Citizen Status */}
      <div className="rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900/90 to-blue-950/40 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span className="text-xs uppercase font-bold tracking-wider text-emerald-400">Local Area Status: Monitored</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Citizen Safety Console
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-xl">
            Track your incident telemetry submissions, view localized disaster alerts, and access immediate survival resources.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/report"
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white shadow-lg shadow-red-600/25 transition flex items-center gap-1.5"
          >
            <span>🚨</span>
            <span>Report Incident</span>
          </Link>
          <Link
            to="/map"
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
          >
            Explore Map
          </Link>
        </div>
      </div>

      {/* Safety Stat Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-md">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Nearby Safe Shelters</span>
          <div className="text-3xl font-black text-white mt-2">4 Open</div>
          <p className="text-xs text-slate-500 mt-1">Closest: St. Mary High School (0.8 km)</p>
        </div>

        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-md">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Your Incident Reports</span>
          <div className="text-3xl font-black text-white mt-2">{reports.length} Total</div>
          <p className="text-xs text-emerald-400 font-medium mt-1">100% Verified by AI Triage</p>
        </div>

        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-md">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Emergency SOS Network</span>
          <div className="text-3xl font-black text-emerald-400 mt-2">Operational</div>
          <p className="text-xs text-slate-500 mt-1">Direct relay with Municipal Response</p>
        </div>
      </div>

      {/* Two Column Grid: Broadcasts & User Incident Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: My Active Submissions */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-md p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200">
                Your Incident Submissions
              </h2>
              <p className="text-xs text-slate-400">Real-time status updates on emergencies reported from your device</p>
            </div>
          </div>

          <div className="space-y-3">
            {reports.map((report) => (
              <div
                key={report.id}
                className="p-4 rounded-xl border border-slate-800/80 bg-slate-950/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-700 transition"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-blue-400">{report.id}</span>
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${report.statusColor}`}>
                      {report.status}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-white mt-1">{report.type}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">📍 {report.location} • <span className="text-slate-500">{report.date}</span></p>
                </div>

                <div className="sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-800">
                  <div className="text-xs font-semibold text-slate-300">Response Action:</div>
                  <div className="text-xs text-emerald-400 font-bold mt-0.5">{report.unitsDispatched}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Urgent Local Alerts */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-md p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              Live Broadcasts
            </h2>
            <span className="text-[10px] uppercase text-slate-500 font-mono">Area Zone 4</span>
          </div>

          <div className="space-y-3">
            {broadcasts.map((alert) => (
              <div key={alert.id} className="p-3.5 rounded-xl border border-slate-800/80 bg-slate-950/60 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded border ${alert.badgeColor}`}>
                    {alert.level}
                  </span>
                  <span className="text-[11px] text-slate-500">{alert.time}</span>
                </div>
                <h4 className="text-xs font-bold text-slate-200">{alert.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{alert.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}