import React, { useState } from 'react';

const MOCK_TRIAGE_INCIDENTS = [
  { id: 'INC-809', location: 'Bandra-Kurla Complex', type: 'Flash Flood', severity: 'Critical', unitsAssigned: 4, status: 'In Progress', eta: '6 mins' },
  { id: 'INC-808', location: 'Dharavi Sector 3', type: 'Building Hazard', severity: 'High', unitsAssigned: 2, status: 'Dispatched', eta: '11 mins' },
  { id: 'INC-807', location: 'Ghatkopar East', type: 'Road Submersion', severity: 'Medium', unitsAssigned: 1, status: 'Pending Triage', eta: '25 mins' },
  { id: 'INC-806', location: 'Vashi Creek Border', type: 'Bridge Inspection', severity: 'Low', unitsAssigned: 0, status: 'Monitoring', eta: 'N/A' },
];

const AGENT_DECISION_LOGS = [
  { id: 1, agent: 'Triage Agent', action: 'Classified Incident #809 as Critical flash flood. Water height 1.4m.', time: 'Just now', color: 'text-red-400' },
  { id: 2, agent: 'Logistics Agent', action: 'Auto-rerouted 2 NDRF Rescue Boats from Sector 7 to BKC.', time: '2 mins ago', color: 'text-blue-400' },
  { id: 3, agent: 'Broadcast Agent', action: 'Sent geo-fenced evacuation SMS to 4,200 devices within 2km radius.', time: '5 mins ago', color: 'text-emerald-400' },
  { id: 4, agent: 'Sensor Agent', action: 'Rainfall threshold exceeded (92mm/hr) in Central Division.', time: '9 mins ago', color: 'text-amber-400' },
];

export default function GovernmentDashboard() {
  const [incidents] = useState(MOCK_TRIAGE_INCIDENTS);

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 p-4 sm:p-6 lg:p-8 space-y-6">
      
      {/* Top Banner: Emergency Status Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black tracking-tight text-white uppercase">
              Emergency Operations Center (EOC)
            </h1>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-red-600/20 text-red-400 border border-red-500/30">
              LEVEL 2 ACTIVATION
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">Autonomous multi-agent dispatch and resource telemetry portal.</p>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 transition">
            Export Situation Report
          </button>
          <button className="px-3.5 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/25 transition">
            Broadcast Regional Siren 🚨
          </button>
        </div>
      </div>

      {/* Primary Telemetry Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Active Incidents', count: '14', detail: '4 Critical emergencies', trend: '+3 in last hour', color: 'border-red-600/40 bg-red-950/10' },
          { title: 'Deployed Field Teams', count: '38', detail: 'NDRF, Fire, EMS crews', trend: '82% capacity engaged', color: 'border-blue-600/40 bg-blue-950/10' },
          { title: 'Civilians Evacuated', count: '1,420', detail: 'Across 6 designated shelters', trend: '+340 safe today', color: 'border-emerald-600/40 bg-emerald-950/10' },
          { title: 'AI Confidence Metric', count: '96.4%', detail: 'Autonomous triage alignment', trend: 'Optimal multi-agent state', color: 'border-amber-600/40 bg-amber-950/10' },
        ].map((stat, idx) => (
          <div key={idx} className={`p-4 rounded-2xl border ${stat.color} backdrop-blur-sm`}>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{stat.title}</span>
            <div className="text-3xl font-black text-white mt-1">{stat.count}</div>
            <div className="text-xs text-slate-300 font-medium mt-1">{stat.detail}</div>
            <div className="text-[11px] text-slate-500 mt-2">{stat.trend}</div>
          </div>
        ))}
      </div>

      {/* Main Grid: Live Incidents & AI Agent Decision Console */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Incident Triage Table */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-md p-5 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300">
              Active Incident Queue & Dispatch Status
            </h2>
            <span className="text-xs text-slate-500">Auto-refreshing (5s)</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-[11px] uppercase font-bold text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="pb-3">ID</th>
                  <th className="pb-3">Location</th>
                  <th className="pb-3">Type</th>
                  <th className="pb-3">Severity</th>
                  <th className="pb-3">Units</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {incidents.map((inc) => (
                  <tr key={inc.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3 font-mono font-bold text-blue-400">{inc.id}</td>
                    <td className="py-3 font-medium text-slate-200">{inc.location}</td>
                    <td className="py-3 text-slate-300">{inc.type}</td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                        inc.severity === 'Critical' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                        inc.severity === 'High' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                        'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}>
                        {inc.severity}
                      </span>
                    </td>
                    <td className="py-3 text-slate-300">{inc.unitsAssigned} Units</td>
                    <td className="py-3 font-medium text-slate-200">{inc.status}</td>
                    <td className="py-3 text-right">
                      <button className="px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white font-semibold text-[11px] transition">
                        Dispatch
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 1 Col: Autonomous Agent Reasoning Log */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-md p-5 flex flex-col">
          <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></span>
              AI Agent Decision Telemetry
            </h2>
          </div>

          <div className="space-y-3.5 overflow-y-auto max-h-[380px] pr-1">
            {AGENT_DECISION_LOGS.map((log) => (
              <div key={log.id} className="p-3 rounded-xl border border-slate-800/80 bg-slate-950/50 space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className={`font-bold ${log.color}`}>{log.agent}</span>
                  <span className="text-slate-500">{log.time}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{log.action}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}