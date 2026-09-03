import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default Leaflet marker icons in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom SVG pulsing marker generator
const createIncidentIcon = (severity) => {
  const colorMap = {
    critical: '#dc2626',
    high: '#ea580c',
    medium: '#d97706',
    low: '#16a34a',
  };
  const color = colorMap[severity] || '#2563eb';

  return L.divIcon({
    className: 'custom-incident-pin',
    html: `
      <div style="position: relative; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center;">
        <span style="position: absolute; width: 100%; height: 100%; border-radius: 50%; background-color: ${color}; opacity: 0.75; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></span>
        <span style="position: relative; width: 14px; height: 14px; border-radius: 50%; background-color: ${color}; border: 2px solid #ffffff; box-shadow: 0 0 8px rgba(0,0,0,0.5);"></span>
      </div>
      <style>
        @keyframes ping {
          75%, 100% { transform: scale(2.2); opacity: 0; }
        }
      </style>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });
};

// Initial disaster telemetry for demonstration
const SAMPLE_INCIDENTS = [
  {
    id: 'INC-101',
    title: 'Severe Flash Flood & Submerged Highway',
    type: 'flood',
    severity: 'critical',
    lat: 19.0760,
    lng: 72.8777,
    reportedAt: '12 mins ago',
    peopleAffected: 45,
    needs: ['Evacuation Boat', 'Medical Aid'],
    aiAssessment: 'High-risk water level surge. Water velocity exceeds safety threshold for light vehicles.'
  },
  {
    id: 'INC-102',
    title: 'Urban Structural Collapse',
    type: 'earthquake',
    severity: 'high',
    lat: 19.1136,
    lng: 72.8697,
    reportedAt: '35 mins ago',
    peopleAffected: 12,
    needs: ['Search & Rescue', 'Heavy Cranes'],
    aiAssessment: 'Potential localized secondary collapse. Perimeter isolation recommended.'
  },
  {
    id: 'INC-103',
    title: 'Commercial Complex Fire Hazard',
    type: 'fire',
    severity: 'medium',
    lat: 19.0330,
    lng: 73.0297,
    reportedAt: '1 hour ago',
    peopleAffected: 0,
    needs: ['Fire Tender', 'Traffic Diversion'],
    aiAssessment: 'Smoke plume dispersing southwest. Visibility reduced within 800m radius.'
  }
];

export default function DisasterMap() {
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [activeIncident, setActiveIncident] = useState(null);

  const filteredIncidents = selectedSeverity === 'all'
    ? SAMPLE_INCIDENTS
    : SAMPLE_INCIDENTS.filter((inc) => inc.severity === selectedSeverity);

  return (
    <div className="relative w-full h-[650px] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950">
      
      {/* Floating Control Panel */}
<div className="absolute top-3 right-3 z-[1000] bg-slate-900/90 backdrop-blur-md border border-slate-700/80 p-2.5 rounded-xl shadow-xl flex flex-col gap-1.5">  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
    Filter Live Incidents
  </span>
  <div className="flex gap-1.5">
    {['all', 'critical', 'high', 'medium'].map((level) => (
      <button
        key={level}
        onClick={() => setSelectedSeverity(level)}
        className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize transition ${
          selectedSeverity === level
            ? 'bg-blue-600 text-white shadow-md'
            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
        }`}
      >
        {level}
      </button>
    ))}
  </div>
</div>

      {/* Map Viewport */}
      <MapContainer
        center={[19.0760, 72.8777]}
        zoom={11}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <TileLayer
  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
/>

        {filteredIncidents.map((incident) => (
          <React.Fragment key={incident.id}>
            {/* Radius Highlight for Critical Incidents */}
            {incident.severity === 'critical' && (
              <Circle
                center={[incident.lat, incident.lng]}
                radius={2000}
                pathOptions={{ color: '#dc2626', fillColor: '#dc2626', fillOpacity: 0.15 }}
              />
            )}

            {/* Custom Marker Pin */}
            <Marker
              position={[incident.lat, incident.lng]}
              icon={createIncidentIcon(incident.severity)}
              eventHandlers={{
                click: () => setActiveIncident(incident),
              }}
            >
              <Popup>
                <div className="p-1 max-w-xs text-slate-900">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-bold text-xs uppercase px-1.5 py-0.5 rounded bg-slate-200">
                      {incident.id}
                    </span>
                    <span className={`text-[10px] uppercase font-extrabold px-1.5 py-0.5 rounded text-white ${
                      incident.severity === 'critical' ? 'bg-red-600' :
                      incident.severity === 'high' ? 'bg-orange-500' : 'bg-amber-500'
                    }`}>
                      {incident.severity}
                    </span>
                  </div>
                  <h4 className="font-semibold text-sm mb-1">{incident.title}</h4>
                  <p className="text-xs text-slate-600 mb-2">Reported {incident.reportedAt}</p>
                  
                  <div className="bg-slate-100 p-2 rounded text-xs mb-2">
                    <span className="font-bold text-slate-700">🤖 AI Triage:</span>
                    <p className="text-slate-600 text-[11px] mt-0.5">{incident.aiAssessment}</p>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {incident.needs.map((n, i) => (
                      <span key={i} className="text-[10px] bg-blue-100 text-blue-800 font-medium px-1.5 py-0.5 rounded">
                        {n}
                      </span>
                    ))}
                  </div>
                </div>
              </Popup>
            </Marker>
          </React.Fragment>
        ))}
      </MapContainer>
    </div>
  );
}