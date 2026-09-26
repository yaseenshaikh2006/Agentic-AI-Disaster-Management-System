import React, { useEffect, useState } from "react";
import { getReliefInventory, getShelterCapacities, listIncidents, optimizeDispatch } from "../services/api";
import { Boxes, Home, Truck, CheckCircle2, RefreshCw } from "lucide-react";

export default function ReliefDistribution() {
  const [inventory, setInventory] = useState([]);
  const [shelters, setShelters] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allocatingId, setAllocatingId] = useState(null);
  const [dispatchResults, setDispatchResults] = useState({});

  const loadLogisticsData = async () => {
    try {
      setLoading(true);
      const [invData, shelterData, incData] = await Promise.all([
        getReliefInventory(),
        getShelterCapacities(),
        listIncidents(),
      ]);
      setInventory(invData);
      setShelters(shelterData);
      setIncidents(incData);
    } catch (err) {
      console.error("Logistics sync error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLogisticsData();
  }, []);

  const handleAllocate = async (incident) => {
    try {
      setAllocatingId(incident.id);
      const severity = incident.triage?.severity_level || "High";
      const result = await optimizeDispatch(incident.id, severity);
      setDispatchResults((prev) => ({ ...prev, [incident.id]: result }));
    } catch (err) {
      alert("Allocation error: " + err.message);
    } finally {
      setAllocatingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 p-6 lg:p-10 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-blue-500 animate-ping" />
            <span className="text-xs font-mono uppercase tracking-wider text-blue-400">
              Agent 3 Tactical Grid
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white uppercase mt-1">
            Relief & Supply Logistics Matrix
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Live depot capacity, shelter occupancy, and automated payload dispatch.
          </p>
        </div>

        <button
          onClick={loadLogisticsData}
          className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 px-4 py-2 rounded-xl text-xs font-bold text-slate-200 transition self-start sm:self-auto"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          Refresh Supplies
        </button>
      </div>

      {/* Overview Metric Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Depots / Inventory */}
        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-md space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Boxes size={20} />
            </div>
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-white">
                Resource Depot Stockpile
              </h2>
              <p className="text-xs text-slate-400">Active municipal inventory ready for distribution</p>
            </div>
          </div>

          <div className="space-y-3">
            {inventory.length === 0 ? (
              <div className="text-xs text-slate-500 py-4">No inventory data available.</div>
            ) : (
              inventory.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/50 flex items-center justify-between hover:border-slate-700 transition"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-200">{item.category}</span>
                      <span
                        className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded border ${
                          item.status === "Optimal"
                            ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
                            : "text-amber-400 bg-amber-500/10 border-amber-500/20"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Threshold: {item.critical_threshold} units
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-base font-black font-mono text-blue-400">
                      {item.available_units?.toLocaleString() ?? 0}
                    </span>
                    <span className="text-[11px] text-slate-500 ml-1">Units</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Shelters */}
        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-md space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Home size={20} />
            </div>
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-white">
                Designated Safe Shelters
              </h2>
              <p className="text-xs text-slate-400">Capacity and intake tracking across safe hubs</p>
            </div>
          </div>

          <div className="space-y-3">
            {shelters.length === 0 ? (
              <div className="text-xs text-slate-500 py-4">No shelter nodes registered.</div>
            ) : (
              shelters.map((s, idx) => {
                const occupancy = s.current_occupancy || 0;
                const max = s.max_capacity || 500;
                const pct = Math.min(Math.round((occupancy / max) * 100), 100);

                return (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/50 space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-200">{s.name || s.shelter_name}</span>
                      <span className="font-mono text-emerald-400">{occupancy} / {max} occupants</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className={`h-full ${pct > 80 ? "bg-red-500" : "bg-emerald-500"}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Incident Demand & Automated Allocation Table */}
      <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-md space-y-4">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-white">
            Live Incident Supply Dispatch Queue
          </h2>
          <p className="text-xs text-slate-400">
            Click to authorize Agent 3 automated logistics calculations and supply reservations.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-[11px] uppercase font-bold text-slate-400 border-b border-slate-800">
              <tr>
                <th className="pb-3">Incident</th>
                <th className="pb-3">Coordinates</th>
                <th className="pb-3">Priority</th>
                <th className="pb-3">Recommended Assets</th>
                <th className="pb-3 text-right">Agent 3 Decision</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {incidents.map((inc) => {
                const plan = dispatchResults[inc.id] || inc.assignedDispatch;
                const severity = inc.triage?.severity_level || "High";

                return (
                  <tr key={inc.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3 font-medium text-slate-200">
                      <div className="font-mono font-bold text-blue-400">{inc.id}</div>
                      <div className="text-slate-400 text-[11px]">{inc.title}</div>
                    </td>
                    <td className="py-3 font-mono text-slate-400">
                      {inc.latitude?.toFixed(4)}, {inc.longitude?.toFixed(4)}
                    </td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                          severity === "Critical"
                            ? "bg-red-500/20 text-red-400 border border-red-500/30"
                            : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                        }`}
                      >
                        {severity}
                      </span>
                    </td>
                    <td className="py-3 text-slate-300">
                      {inc.triage?.recommended_assets?.join(", ") || "Standard Unit"}
                    </td>
                    <td className="py-3 text-right">
                      {plan ? (
                        <div className="inline-flex flex-col items-end text-emerald-400">
                          <span className="flex items-center gap-1 font-bold">
                            <CheckCircle2 size={12} /> {plan.assigned_unit}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            ETA: {plan.estimated_arrival_minutes}m • {plan.supplies_allocated?.join(", ")}
                          </span>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleAllocate(inc)}
                          disabled={allocatingId === inc.id}
                          className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold transition disabled:opacity-50 inline-flex items-center gap-1.5 cursor-pointer"
                        >
                          <Truck size={13} />
                          {allocatingId === inc.id ? "Routing..." : "Dispatch Supplies"}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
