import React, { useState, useEffect } from 'react';
import { listIncidents, getActiveWarnings, optimizeDispatch } from '../services/api';
import { RefreshCw, ShieldAlert, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import LiveIncidentMap from "../components/dashboard/LiveIncidentMap";

export default function GovernmentDashboard() {
  const [incidents, setIncidents] = useState([]);
  const [warnings, setWarnings] = useState([]);
  const [decisionLogs, setDecisionLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dispatchingId, setDispatchingId] = useState(null);

  const fetchLiveEocData = async () => {
    try {
      setLoading(true);
      const [incidentData, warningData] = await Promise.all([
        listIncidents(),
        getActiveWarnings()
      ]);

      setIncidents(incidentData);
      setWarnings(warningData);

      // Generate Agent 1 Telemetry logs dynamically from live sensors
      const telemetryLogs = warningData.map((w, idx) => ({
        id: `telemetry-${idx}`,
        agent: 'Agent 1 (Prediction)',
        action: `Zone ${w.zone_id}: Risk Score ${w.risk_score} [${w.hazard_level}]. Radius: ${w.danger_radius_km}km. ${w.alert_message}`,
        time: 'Live Sensor',
        color: w.hazard_level === 'CRITICAL' ? 'text-red-400' : 'text-amber-400'
      }));

      // Generate Agent 2 Triage logs from recent incident reports
      const triageLogs = incidentData.slice(0, 3).map((inc) => ({
        id: `triage-${inc.id}`,
        agent: 'Agent 2 (Triage)',
        action: `Analyzed ${inc.id} (${inc.title}): Severity ${inc.triage?.severity_level || 'Evaluated'} with ${Math.round((inc.triage?.confidence_score || 0.8) * 100)}% confidence.`,
        time: 'Incident Queue',
        color: inc.triage?.severity_level === 'Critical' ? 'text-red-400' : 'text-blue-400'
      }));

      setDecisionLogs([...triageLogs, ...telemetryLogs]);
    } catch (error) {
      console.error("EOC Sync Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveEocData();
    const interval = setInterval(fetchLiveEocData, 10000); // 10s auto-refresh
    return () => clearInterval(interval);
  }, []);

  const handleDispatch = async (incident) => {
    try {
      setDispatchingId(incident.id);
      const severity = incident.triage?.severity_level || "Critical";
      const plan = await optimizeDispatch(incident.id, severity);

      // Update incident row in-place
      setIncidents((prev) =>
        prev.map((item) =>
          item.id === incident.id
            ? { ...item, assignedDispatch: plan, status: 'Dispatched' }
            : item
        )
      );

      // Append real Agent 3 decision log
      const newLog = {
        id: `dispatch-${Date.now()}`,
        agent: 'Agent 3 (Relief Logistics)',
        action: `Mobilized ${plan.assigned_unit} to ${incident.id}. Allocated: ${plan.supplies_allocated.join(', ')}. ETA: ${plan.estimated_arrival_minutes}m.`,
        time: 'Just now',
        color: 'text-emerald-400'
      };

      setDecisionLogs((prev) => [newLog, ...prev]);
    } catch (err) {
      alert("Dispatch failed: " + err.message);
    } finally {
      setDispatchingId(null);
    }
  };

  const criticalCount = incidents.filter(i => i.triage?.severity_level === 'Critical').length;

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
          <button 
            onClick={fetchLiveEocData}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 transition"
          >
            <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
            Sync AI Bus
          </button>
          <button 
            onClick={() => alert("🚨 Regional Siren Broadcast Initiated across all emergency zones.")}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/25 transition"
          >
            Broadcast Regional Siren 🚨
          </button>
        </div>
      </div>

      {/* Primary Telemetry Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl border border-red-600/40 bg-red-950/10 backdrop-blur-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Agent 2 Active Incidents</span>
          <div className="text-3xl font-black text-white mt-1">{incidents.length}</div>
          <div className="text-xs text-slate-300 font-medium mt-1">{criticalCount} Critical emergencies</div>
          <div className="text-[11px] text-red-400 mt-2">Real-time Citizen Ingestion</div>
        </div>

        <div className="p-4 rounded-2xl border border-amber-600/40 bg-amber-950/10 backdrop-blur-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Agent 1 Sensor Zones</span>
          <div className="text-3xl font-black text-white mt-1">{warnings.length}</div>
          <div className="text-xs text-slate-300 font-medium mt-1">Hydro & levee telemetry</div>
          <div className="text-[11px] text-amber-400 mt-2">Risk model operational</div>
        </div>

        <div className="p-4 rounded-2xl border border-blue-600/40 bg-blue-950/10 backdrop-blur-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Agent 3 Relief Status</span>
          <div className="text-3xl font-black text-white mt-1">
            {incidents.filter(i => i.status === 'Dispatched').length} Active
          </div>
          <div className="text-xs text-slate-300 font-medium mt-1">Tactical units engaged</div>
          <div className="text-[11px] text-blue-400 mt-2">Resource allocation ready</div>
        </div>

        <div className="p-4 rounded-2xl border border-emerald-600/40 bg-emerald-950/10 backdrop-blur-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Multi-Agent Core</span>
          <div className="text-3xl font-black text-white mt-1">100%</div>
          <div className="text-xs text-slate-300 font-medium mt-1">FastAPI microservices live</div>
          <div className="text-[11px] text-emerald-400 mt-2">Gemini 3.6-flash connected</div>
        </div>
      </div> 

      {/* Geospatial Threat Matrix Map */}
<div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-md p-5 space-y-3">
  <div className="flex items-center justify-between">
    <div>
      <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300">
        Geospatial Incident & Tactical Assets Map
      </h2>
      <p className="text-xs text-slate-500">
        Real-time Agent 2 triage locations with Agent 3 relief deployment zones.
      </p>
    </div>
    <div className="flex items-center gap-3 text-xs">
      <span className="flex items-center gap-1.5 text-slate-300">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> Critical Zone
      </span>
      <span className="flex items-center gap-1.5 text-slate-300">
        <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span> High Risk
      </span>
    </div>
  </div>

  <LiveIncidentMap 
    incidents={incidents} 
    onDispatchSuccess={(incidentId, plan) => {
      setIncidents((prev) =>
        prev.map((item) =>
          item.id === incidentId
            ? { ...item, assignedDispatch: plan, status: 'Dispatched' }
            : item
        )
      );
    }} 
  />
</div>

      {/* Main Grid: Live Incidents & AI Agent Decision Console */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Incident Triage Table */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-md p-5 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300">
              Live Incident Queue & Dispatch Status
            </h2>
            <span className="text-xs text-slate-500">Auto-refreshing (10s)</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-[11px] uppercase font-bold text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="pb-3">ID</th>
                  <th className="pb-3">Title & Coordinates</th>
                  <th className="pb-3">AI Severity</th>
                  <th className="pb-3">Detected Hazards</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Agent 3 Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {incidents.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-8 text-center text-slate-500">
                      No reports yet. Submit one from the /report page to see live triage.
                    </td>
                  </tr>
                ) : (
                  incidents.map((inc) => {
                    const severity = inc.triage?.severity_level || "Moderate";
                    return (
                      <tr key={inc.id} className="hover:bg-slate-800/40 transition">
                        <td className="py-3 font-mono font-bold text-blue-400">{inc.id}</td>
                        <td className="py-3 font-medium text-slate-200">
                          <div>{inc.title}</div>
                          <div className="text-[10px] text-slate-500 font-mono">
                            {inc.latitude.toFixed(4)}, {inc.longitude.toFixed(4)}
                          </div>
                        </td>
                        <td className="py-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                            severity === 'Critical' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                            severity === 'High' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                            'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          }`}>
                            {severity}
                          </span>
                        </td>
                        <td className="py-3 text-slate-300">
                          <div className="flex flex-wrap gap-1 max-w-[200px]">
                            {inc.triage?.detected_hazards?.map((h, i) => (
                              <span key={i} className="text-[9px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded border border-slate-700">
                                {h}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="py-3 font-medium text-slate-200">
                          {inc.assignedDispatch ? (
                            <span className="text-emerald-400 flex items-center gap-1">
                              <CheckCircle2 size={12} /> {inc.assignedDispatch.assigned_unit}
                            </span>
                          ) : (
                            <span className="text-slate-400">Pending Authorization</span>
                          )}
                        </td>
                        <td className="py-3 text-right">
                          {inc.assignedDispatch ? (
                            <span className="text-[10px] text-emerald-400 font-mono">
                              ETA: {inc.assignedDispatch.estimated_arrival_minutes}m
                            </span>
                          ) : (
                            <button
                              onClick={() => handleDispatch(inc)}
                              disabled={dispatchingId === inc.id}
                              className="px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white font-semibold text-[11px] transition disabled:opacity-50"
                            >
                              {dispatchingId === inc.id ? "Routing..." : "Dispatch"}
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 1 Col: Autonomous Agent Reasoning Log */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-md p-5 flex flex-col">
          <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></span>
              Multi-Agent Decision Bus
            </h2>
          </div>

          <div className="space-y-3.5 overflow-y-auto max-h-[460px] pr-1">
            {decisionLogs.length === 0 ? (
              <div className="text-xs text-slate-500 text-center py-6">Connecting to agent telemetry streams...</div>
            ) : (
              decisionLogs.map((log) => (
                <div key={log.id} className="p-3 rounded-xl border border-slate-800/80 bg-slate-950/50 space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className={`font-bold ${log.color}`}>{log.agent}</span>
                    <span className="text-slate-500">{log.time}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{log.action}</p>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
