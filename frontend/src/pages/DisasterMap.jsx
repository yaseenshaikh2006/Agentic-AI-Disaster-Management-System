import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { listIncidents, getActiveWarnings, optimizeDispatch } from "../services/api";
import { AlertTriangle, ShieldCheck, Truck, Clock, Navigation, RefreshCw } from "lucide-react";

// Severity styling configurations
const SEVERITY_CONFIG = {
  Critical: { color: "#ef4444", radius: 2200, label: "CRITICAL HAZARD" },
  High: { color: "#f97316", radius: 1500, label: "HIGH RISK" },
  Moderate: { color: "#eab308", radius: 900, label: "MODERATE" },
  Low: { color: "#22c55e", radius: 500, label: "MONITORING" },
};

// Custom dynamic marker pins for Leaflet
const createIncidentIcon = (severity) => {
  const conf = SEVERITY_CONFIG[severity] || SEVERITY_CONFIG.Moderate;
  return L.divIcon({
    className: "custom-map-pin",
    html: `
      <div style="
        background-color: ${conf.color};
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 3px solid #ffffff;
        box-shadow: 0 0 14px ${conf.color};
        animation: pulse 2s infinite;
      "></div>
    `,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
};

export default function DisasterMap() {
  const [incidents, setIncidents] = useState([]);
  const [warnings, setWarnings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [dispatchingId, setDispatchingId] = useState(null);

  const defaultCenter = [19.0760, 72.8777]; // Mumbai Center

  const loadMapData = async () => {
    try {
      setLoading(true);
      const [incidentData, warningData] = await Promise.all([
        listIncidents(),
        getActiveWarnings(),
      ]);
      setIncidents(incidentData);
      setWarnings(warningData);
    } catch (err) {
      console.error("Map telemetry sync failure:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMapData();
    const interval = setInterval(loadMapData, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleQuickDispatch = async (incident) => {
    try {
      setDispatchingId(incident.id);
      const severity = incident.triage?.severity_level || "Critical";
      const plan = await optimizeDispatch(incident.id, severity);

      setIncidents((prev) =>
        prev.map((item) =>
          item.id === incident.id ? { ...item, assignedDispatch: plan } : item
        )
      );
    } catch (err) {
      alert("Failed to allocate relief units: " + err.message);
    } finally {
      setDispatchingId(null);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-[#090d16] text-slate-100 overflow-hidden">
      
      {/* Top Floating Control Bar */}
      <header className="h-16 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md px-6 flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="h-3 w-3 rounded-full bg-red-500 animate-ping" />
          <h1 className="text-base font-black tracking-wider uppercase text-white">
            Geospatial Threat Matrix (GIS)
          </h1>
          <span className="hidden sm:inline-block text-xs font-mono text-slate-500">
            • LIVE MULTI-AGENT INGESTION
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs text-slate-400 font-mono hidden md:block">
            ACTIVE PINS: <span className="text-white font-bold">{incidents.length}</span> | HYDRO ZONES: <span className="text-white font-bold">{warnings.length}</span>
          </div>

          <button
            onClick={loadMapData}
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 px-3.5 py-1.5 rounded-xl text-xs font-bold transition text-slate-200"
          >
            <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
            Refresh Matrix
          </button>
        </div>
      </header>

      {/* Main Map + Details Sidebar Layout */}
      <div className="flex-1 relative flex overflow-hidden">
        
        {/* Leaflet Map Engine */}
        <div className="flex-1 h-full w-full">
          <MapContainer
            center={defaultCenter}
            zoom={11}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%", background: "#090d16" }}
          >
            <TileLayer
  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
/>

            {/* Render Agent 2 Incidents & Dynamic Perimeter Radii */}
            {incidents.map((incident) => {
              const lat = parseFloat(incident.latitude) || 19.0760;
              const lng = parseFloat(incident.longitude) || 72.8777;
              const severity = incident.triage?.severity_level || "Moderate";
              const conf = SEVERITY_CONFIG[severity] || SEVERITY_CONFIG.Moderate;

              return (
                <React.Fragment key={incident.id}>
                  {/* Dynamic Tactical Danger Zone */}
                  <Circle
                    center={[lat, lng]}
                    radius={conf.radius}
                    pathOptions={{
                      color: conf.color,
                      fillColor: conf.color,
                      fillOpacity: 0.18,
                      weight: 1.5,
                      dashArray: "4, 6",
                    }}
                  />

                  {/* High-visibility Marker */}
                  <Marker
                    position={[lat, lng]}
                    icon={createIncidentIcon(severity)}
                    eventHandlers={{
                      click: () => setSelectedIncident(incident),
                    }}
                  >
                    <Popup className="dark-leaflet-popup">
                      <div className="p-1 font-sans text-slate-900 max-w-xs">
                        <div className="flex items-center justify-between border-b pb-1">
                          <span
                            className="text-[10px] font-black px-2 py-0.5 rounded text-white"
                            style={{ backgroundColor: conf.color }}
                          >
                            {severity.toUpperCase()}
                          </span>
                          <span className="font-mono text-[11px] text-slate-500">
                            {incident.id}
                          </span>
                        </div>
                        <h4 className="font-bold text-xs mt-1.5">{incident.title}</h4>
                        <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">
                          {incident.description}
                        </p>
                      </div>
                    </Popup>
                  </Marker>
                </React.Fragment>
              );
            })}
          </MapContainer>
        </div>

        {/* Selected Incident Telemetry Flyout Panel */}
        {selectedIncident && (
          <aside className="absolute right-4 top-4 bottom-4 w-96 bg-slate-950/90 border border-slate-800/90 rounded-2xl backdrop-blur-xl p-5 shadow-2xl flex flex-col justify-between z-[1000] overflow-y-auto">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] font-mono uppercase text-blue-400 font-bold">
                    Incident Inspector
                  </span>
                  <h3 className="text-base font-black text-white">{selectedIncident.id}</h3>
                </div>
                <button
                  onClick={() => setSelectedIncident(null)}
                  className="text-slate-400 hover:text-white text-sm px-2 py-1 rounded-lg hover:bg-slate-800"
                >
                  ✕
                </button>
              </div>

              <div>
                <span className={`text-[11px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider ${
                  selectedIncident.triage?.severity_level === 'Critical'
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                    : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                }`}>
                  {selectedIncident.triage?.severity_level || "ASSESSED"}
                </span>
                <h4 className="text-sm font-bold text-slate-200 mt-2">
                  {selectedIncident.title}
                </h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {selectedIncident.description}
                </p>
              </div>

              <div className="bg-slate-900/80 rounded-xl p-3.5 border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-slate-300">Agent 2 Hazard Classification:</div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedIncident.triage?.detected_hazards?.map((h, i) => (
                    <span key={i} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                      {h}
                    </span>
                  ))}
                </div>
                <div className="text-[11px] text-slate-400 pt-1">
                  Confidence Score: <span className="text-emerald-400 font-mono font-bold">
                    {Math.round((selectedIncident.triage?.confidence_score || 0.85) * 100)}%
                  </span>
                </div>
              </div>

              <div className="bg-slate-900/80 rounded-xl p-3.5 border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-slate-300">Tactical Directives:</div>
                <p className="text-xs text-slate-400 italic">
                  "{selectedIncident.triage?.action_summary || 'Awaiting automated orders'}"
                </p>
              </div>
            </div>

            {/* Agent 3 Dispatch Trigger */}
            <div className="pt-4 border-t border-slate-800">
              {selectedIncident.assignedDispatch ? (
                <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-3 text-xs space-y-1">
                  <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                    <ShieldCheck size={15} /> Unit En Route: {selectedIncident.assignedDispatch.assigned_unit}
                  </div>
                  <div className="text-slate-400 text-[11px]">
                    Supplies: {selectedIncident.assignedDispatch.supplies_allocated.join(", ")}
                  </div>
                  <div className="text-emerald-300 font-mono text-[11px]">
                    ETA: {selectedIncident.assignedDispatch.estimated_arrival_minutes} minutes
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => handleQuickDispatch(selectedIncident)}
                  disabled={dispatchingId === selectedIncident.id}
                  className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition disabled:opacity-50"
                >
                  <Truck size={15} />
                  {dispatchingId === selectedIncident.id ? "Calculating Logistics..." : "Authorize Relief Dispatch (Agent 3)"}
                </button>
              )}
            </div>
          </aside>
        )}
      </div>

    </div>
  );
}
