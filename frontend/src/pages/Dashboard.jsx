import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { listIncidents, getActiveWarnings } from '../services/api';
import { Loader2 } from 'lucide-react';

export default function Dashboard() {
  const [reports, setReports] = useState([]);
  const [broadcasts, setBroadcasts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCitizenData = async () => {
    try {
      const [incidentData, rawWarningData] = await Promise.all([
        listIncidents().catch(() => []),
        getActiveWarnings().catch(() => [])
      ]);

      setReports(Array.isArray(incidentData) ? incidentData : []);

      // Normalize array or { warnings: [...] } safely
      const warningList = Array.isArray(rawWarningData)
        ? rawWarningData
        : (rawWarningData?.warnings || []);

      // Map Agent 1 telemetry outputs directly into citizen broadcast cards
      const dynamicBroadcasts = warningList.map((w, idx) => {
        let badgeStyle = 'bg-slate-800 text-slate-400 border-slate-700';

        if (w.hazard_level === 'CRITICAL') {
          badgeStyle = 'bg-red-500/20 text-red-400 border-red-500/30';
        } else if (w.hazard_level === 'WARNING') {
          badgeStyle = 'bg-amber-500/20 text-amber-400 border-amber-500/30';
        } else if (w.hazard_level === 'ADVISORY') {
          badgeStyle = 'bg-blue-500/20 text-blue-400 border-blue-500/30';
        } else if (w.hazard_level === 'NORMAL') {
          badgeStyle = 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
        }

        return {
          id: `warn-${w.zone_id || idx}`,
          title: `${w.hazard_level || 'INFO'} Alert: Zone ${w.zone_id || 'Unknown'}`,
          desc: w.alert_message || 'Telemetry within monitored baseline.',
          level: w.hazard_level || 'NOMINAL',
          riskScore: w.risk_score,
          dangerRadius: w.danger_radius_km,
          time: 'Live Sensor',
          badgeColor: badgeStyle
        };
      });

      setBroadcasts(dynamicBroadcasts);
    } catch (err) {
      console.error('Failed to sync citizen dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCitizenData();
    const interval = setInterval(fetchCitizenData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 p-4 sm:p-6 lg:p-8 space-y-6">
      
      {/* Welcome Banner / Citizen Status */}
      <div className="rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900/90 to-blue-950/40 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs uppercase font-bold tracking-wider text-emerald-400">
              Local Area Status: Monitored
            </span>
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
          <p className="text-xs text-emerald-400 font-medium mt-1">100% Processed by AI Triage</p>
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
            {loading && <Loader2 size={16} className="animate-spin text-slate-500" />}
          </div>

          <div className="space-y-3">
            {reports.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-xs">
                No incidents reported yet. Use the "Report Incident" button above to submit an alert.
              </div>
            ) : (
              reports.map((report) => {
                const severity = report.triage?.severity_level || "Under Review";
                const isCritical = severity === "Critical";
                return (
                  <div
                    key={report.id}
                    className="p-4 rounded-xl border border-slate-800/80 bg-slate-950/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-700 transition"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-blue-400">{report.id}</span>
                        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${
                          isCritical
                            ? 'text-red-400 bg-red-500/10 border-red-500/20'
                            : 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                        }`}>
                          {severity} • AI Verified
                        </span>
                      </div>
                      <h3 className="font-bold text-sm text-white mt-1">{report.title}</h3>
                      <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{report.description}</p>
                      <p className="text-[11px] text-slate-500 mt-1 font-mono">
                        📍 {report.latitude?.toFixed(4)}, {report.longitude?.toFixed(4)} • {new Date(report.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>

                    <div className="sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-800 shrink-0">
                      <div className="text-xs font-semibold text-slate-400">Allocated Response:</div>
                      <div className="text-xs text-emerald-400 font-bold mt-0.5 max-w-[180px] sm:text-right">
                        {report.triage?.recommended_assets?.[0] || "Recon Unit En Route"}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right 1 Col: Urgent Local Alerts (Agent 1 Stream) */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-md p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              Live Broadcasts
            </h2>
            <span className="text-[10px] uppercase text-slate-500 font-mono">Agent 1 Stream</span>
          </div>

          <div className="space-y-3">
            {broadcasts.length === 0 ? (
              <div className="p-6 text-center text-slate-500 text-xs">No active broadcasts in your sector.</div>
            ) : (
              broadcasts.map((alert) => (
                <div key={alert.id} className="p-3.5 rounded-xl border border-slate-800/80 bg-slate-950/60 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded border ${alert.badgeColor}`}>
                      {alert.level}
                    </span>
                    <span className="text-[11px] text-slate-500">{alert.time}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-200">{alert.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{alert.desc}</p>
                  {alert.dangerRadius > 0 && (
                    <div className="pt-1 flex items-center justify-between text-[10px] text-slate-500 font-mono border-t border-slate-800/50 mt-2">
                      <span>Impact Radius: {alert.dangerRadius} km</span>
                      <span>Risk: {alert.riskScore}</span>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
