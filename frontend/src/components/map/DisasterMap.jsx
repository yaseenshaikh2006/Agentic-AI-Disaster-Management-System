import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

import L from "leaflet";

import { db } from "../../firebase";
import { collection, onSnapshot } from "firebase/firestore";

// Fix Leaflet marker icons
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function ChangeView({ center }) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, 13);
  }, [center, map]);

  return null;
}

// Default demo markers
const disasterLocations = [
  {
    id: 1,
    position: [19.076, 72.8777],
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
  const [position, setPosition] = useState([19.076, 72.8777]);
  const [reports, setReports] = useState([]);

  // Get User GPS
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

  // Fetch Firestore Reports
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "disasterReports"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setReports(data);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-5">

      <h2 className="text-3xl font-bold mb-5">
        🗺️ Live Disaster Map
      </h2>

      <MapContainer
        center={position}
        zoom={8}
        style={{
          height: "600px",
          width: "100%",
          borderRadius: "20px",
        }}
      >
        <ChangeView center={position} />

        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* User Location */}

        <Marker position={position}>
          <Popup>
            📍 Your Current Location
          </Popup>
        </Marker>

        {/* Default Demo Markers */}

        {disasterLocations.map((location) => (
          <Marker
            key={location.id}
            position={location.position}
          >
            <Popup>
              <strong>{location.title}</strong>
              <br />
              {location.description}
            </Popup>
          </Marker>
        ))}

        {/* Firestore Live Reports */}

        {reports.map((report) => {
          if (!report.location) return null;

          const coords = report.location.split(",");

          if (coords.length !== 2) return null;

          const lat = parseFloat(coords[0]);
          const lng = parseFloat(coords[1]);

          if (isNaN(lat) || isNaN(lng)) return null;

          return (
            <Marker
              key={report.id}
              position={[lat, lng]}
            >
              <Popup>

                <h3 className="font-bold text-lg">
                  🚨 {report.disasterType}
                </h3>

                <p>
                  <strong>Severity:</strong>{" "}
                  {report.severity}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  {report.status}
                </p>

                <p>
                  <strong>Description:</strong>
                  <br />
                  {report.description}
                </p>

              </Popup>
            </Marker>
          );
        })}

      </MapContainer>

    </div>
  );
}

export default DisasterMap;