import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";

function ChangeView({ center }) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, 13);
  }, [center, map]);

  return null;
}

const disasterLocations = [
  {
    id: 1,
    position: [19.0760, 72.8777],
    title: "🌊 Flood Alert",
    description: "Mumbai - High Flood Risk",
  },
  {
    id: 2,
    position: [18.5204, 73.8567],
    title: "🔥 Fire Alert",
    description: "Pune - Industrial Fire",
  },
  {
    id: 3,
    position: [19.2183, 72.9781],
    title: "🏠 Safe Shelter",
    description: "Shelter Capacity: 500 People",
  },
];

function DisasterMap() {
  const [position, setPosition] = useState([19.0760, 72.8777]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (location) => {
        setPosition([
          location.coords.latitude,
          location.coords.longitude,
        ]);
      },
      () => {
        alert("Location permission denied. Showing default location.");
      }
    );
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-lg p-4">
      <h2 className="text-2xl font-bold mb-4">
        🗺️ Live Disaster Map
      </h2>

      <MapContainer
        center={position}
        zoom={8}
        style={{ height: "550px", width: "100%" }}
      >
        <ChangeView center={position} />

        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Current User Location */}
        <Marker position={position}>
          <Popup>📍 You are here</Popup>
        </Marker>

        {/* Disaster & Shelter Markers */}
        {disasterLocations.map((location) => (
          <Marker key={location.id} position={location.position}>
            <Popup>
              <strong>{location.title}</strong>
              <br />
              {location.description}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default DisasterMap;