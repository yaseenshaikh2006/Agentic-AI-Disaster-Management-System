import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { optimizeDispatch } from "../../services/api";
import { Truck, CheckCircle2, Clock } from "lucide-react";

const SEVERITY_COLORS = {
  Critical: "#ef4444",
  High: "#f97316",
  Moderate: "#eab308",
  Low: "#22c55e",
};

const createMarkerIcon = (severity) => {
  const color = SEVERITY_COLORS[severity] || "#3b82f6";
  return L.divIcon({
    className: "custom-incident-pin",
    html: `<div style="
      background-color: ${color};
      width: 18px;
      height: 18px;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 0 10px ${color}88;
    "></div>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });
};

export default function LiveIncidentMap({ incidents = [], onDispatchSuccess }) {
  const [dispatchingId, setDispatchingId] = useState(null);
  const [activeDispatches, setActiveDispatches] = useState({});

  const defaultCenter = [19.076, 72.8777];

  const handleDispatch = async (incident) => {
    try {
      setDispatchingId(incident.id);
      const severity = incident.triage?.severity_level || "Critical";
      const plan = await optimizeDispatch(incident.id, severity);
      setActiveDispatches((prev) => ({ ...prev, [incident.id]: plan }));
      if (onDispatchSuccess) onDispatchSuccess(incident.id, plan);
    } catch (err) {
      alert("Failed to allocate relief units: " + err.message);
    } finally {
      setDispatchingId(null);
    }
  };

  return (
    <div className="relative w-full h-[500px] rounded-2xl overflow-hidden border border-slate-800 shadow-md">
      <MapContainer
        center={defaultCenter}
        zoom={11}
        scrollWheelZoom={true}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {incidents.map((incident) => {
          const lat = parseFloat(incident.latitude) || 19.076;
          const lng = parseFloat(incident.longitude) || 72.8777;
          const severity = incident.triage?.severity_level || "Moderate";
          const radiusMeters = severity === "Critical" ? 1800 : severity === "High" ? 1200 : 600;
          const dispatchOrder = activeDispatches[incident.id] || incident.assignedDispatch;

          return (
            <React.Fragment key={incident.id}>
              {/* Danger Zone Radius */}
              <Circle
                center={[lat, lng]}
                radius={radiusMeters}
                pathOptions={{
                  color: SEVERITY_COLORS[severity],
                  fillColor: SEVERITY_COLORS[severity],
                  fillOpacity: 0.2,
                  weight: 1.5,
                }}
              />

              {/* Marker Pin */}
              <Marker position={[lat, lng]} icon={createMarkerIcon(severity)}>
                <Popup>
                  <div className="p-1 max-w-xs text-slate-900 font-sans">
                    <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-1">
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded text-white"
                        style={{ backgroundColor: SEVERITY_COLORS[severity] }}
                      >
                        {severity}
                      </span>
                      <span className="text-[11px] text-slate-500 font-mono">{incident.id}</span>
                    </div>

                    <h4 className="font-bold text-sm mt-1.5">{incident.title}</h4>
                    <p className="text-xs text-slate-600 mt-1">{incident.description}</p>

                    <div className="mt-2 bg-slate-100 p-2 rounded text-[11px] space-y-1">
                      <div className="font-semibold text-slate-700">Agent 2 Hazards:</div>
                      <div className="flex flex-wrap gap-1">
                        {incident.triage?.detected_hazards?.map((h, i) => (
                          <span key={i} className="bg-slate-200 text-slate-700 px-1 py-0.5 rounded text-[10px]">
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-2.5">
                      {dispatchOrder ? (
                        <div className="bg-emerald-50 border border-emerald-300 p-2 rounded text-emerald-800 text-xs">
                          <div className="flex items-center gap-1 font-bold">
                            <CheckCircle2 size={13} className="text-emerald-600" />
                            {dispatchOrder.assigned_unit}
                          </div>
                          <div className="flex items-center gap-1 text-[11px] text-emerald-700 mt-0.5">
                            <Clock size={11} /> ETA: {dispatchOrder.estimated_arrival_minutes} mins
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleDispatch(incident)}
                          disabled={dispatchingId === incident.id}
                          className="w-full flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-blue-600 text-white text-xs font-semibold py-1.5 px-3 rounded transition"
                        >
                          <Truck size={13} />
                          {dispatchingId === incident.id ? "Calculating..." : "Dispatch Relief (Agent 3)"}
                        </button>
                      )}
                    </div>
                  </div>
                </Popup>
              </Marker>
            </React.Fragment>
          );
        })}
      </MapContainer>
    </div>
  );
}
