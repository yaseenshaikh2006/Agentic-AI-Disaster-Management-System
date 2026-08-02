import { useEffect, useState } from "react";
import MapClickHandler from "./MapClickHandler";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function ChangeView({ center }) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, 10);
  }, [center, map]);

  return null;
}

const disasterLocations = [
  {
    id: 1,
    type: "Disaster",
    position: [19.076, 72.8777],
    title: "🌊 Flood Alert",
    description: "Mumbai - High Flood Risk",
  },
  {
    id: 2,
    type: "Disaster",
    position: [18.5204, 73.8567],
    title: "🔥 Fire Alert",
    description: "Pune - Industrial Fire",
  },
  {
    id: 3,
    type: "Safe Zone",
    position: [19.2183, 72.9781],
    title: "🏠 Safe Shelter",
    description: "Capacity: 500 People",
  },
  {
    id: 4,
    type: "Relief Camp",
    position: [19.1136, 72.8697],
    title: "🚑 Relief Camp",
    description: "Medical Support & Food Available",
  },
  {
    id: 5,
    type: "Disaster",
    position: [28.6139, 77.209],
    title: "🌍 Earthquake Alert",
    description: "Delhi - Moderate Risk",
  },
];

function DisasterMap() {
  const [position, setPosition] = useState([19.076, 72.8777]);

  useEffect(() => {
    if (!navigator.geolocation) return;

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
    <div className="bg-white rounded-2xl shadow-xl p-6">

      <div className="flex justify-between items-center mb-5">
        <h2 className="text-3xl font-bold">
          🌍 Live Disaster Map
        </h2>

        <span className="bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold">
          Live Monitoring
        </span>
      </div>

      <MapContainer
        center={position}
        zoom={8}
        style={{
          height: "600px",
          width: "100%",
          borderRadius: "18px",
        }}
      >
        <ChangeView center={position} />

        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapClickHandler />
        
        <Marker position={position}>
          <Popup>
            <div>
              <h3 className="font-bold text-lg">
                📍 Your Current Location
              </h3>

              <p>
                Latitude: {position[0].toFixed(4)}
              </p>

              <p>
                Longitude: {position[1].toFixed(4)}
              </p>
            </div>
          </Popup>
        </Marker>

        {disasterLocations.map((location) => (
          <Marker
            key={location.id}
            position={location.position}
          >
            <Popup>
              <div className="space-y-2">

                <h3 className="font-bold text-lg">
                  {location.title}
                </h3>

                <p className="text-gray-600">
                  {location.description}
                </p>

                <span className="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
                  {location.type}
                </span>

              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <div className="grid md:grid-cols-4 gap-4 mt-6">

        <div className="bg-red-100 rounded-xl p-4 text-center">
          <h3 className="text-xl font-bold text-red-700">
            3
          </h3>
          <p>Active Disasters</p>
        </div>

        <div className="bg-green-100 rounded-xl p-4 text-center">
          <h3 className="text-xl font-bold text-green-700">
            1
          </h3>
          <p>Safe Zones</p>
        </div>

        <div className="bg-blue-100 rounded-xl p-4 text-center">
          <h3 className="text-xl font-bold text-blue-700">
            1
          </h3>
          <p>Relief Camps</p>
        </div>

        <div className="bg-yellow-100 rounded-xl p-4 text-center">
          <h3 className="text-xl font-bold text-yellow-700">
            Live
          </h3>
          <p>GPS Tracking</p>
        </div>

      </div>

    </div>
  );
}

export default DisasterMap;