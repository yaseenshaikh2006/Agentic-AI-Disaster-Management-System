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

// Leaflet Marker Fix
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

// Demo Markers
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
  const [position, setPosition] = useState([
    19.0760,
    72.8777,
  ]);

  const [reports, setReports] = useState([]);

  // User GPS
  useEffect(() => {
    if (!navigator.geolocation) {
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (location) => {
        setPosition([
          location.coords.latitude,
          location.coords.longitude,
        ]);
      },
      () => {
        console.log(
          "Location permission denied. Showing default location."
        );
      }
    );
  }, []);

  // Firestore Reports
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
    <div className="overflow-hidden rounded-2xl">

      <MapContainer
        center={position}
        zoom={8}
        style={{
          height: "650px",
          width: "100%",
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
            <strong>Your Current Location</strong>
          </Popup>
        </Marker>


        {/* Demo Markers */}

        {disasterLocations.map((location) => (
          <Marker
            key={location.id}
            position={location.position}
          >
            <Popup>

              <h3 className="font-bold text-lg">
                {location.title}
              </h3>

              <p className="mt-1">
                {location.description}
              </p>

            </Popup>
          </Marker>
        ))}


        {/* Firestore Reports */}

        {reports.map((report) => {

          if (!report.location) {
            return null;
          }

          const coords = report.location.split(",");

          if (coords.length !== 2) {
            return null;
          }

          const lat = parseFloat(coords[0]);
          const lng = parseFloat(coords[1]);

          if (isNaN(lat) || isNaN(lng)) {
            return null;
          }

          return (
            <Marker
              key={report.id}
              position={[lat, lng]}
            >

              <Popup minWidth={280}>

                {/* Uploaded Image */}

                {report.imageUrl && (
                  <img
                    src={report.imageUrl}
                    alt="Disaster"
                    className="w-full h-40 object-cover rounded-lg mb-3"
                  />
                )}


                {/* Disaster Type */}

                <h3 className="text-xl font-bold text-red-600 mb-2">
                  🚨 {report.disasterType}
                </h3>


                {/* Severity */}

                <p>
                  <strong>Severity:</strong>{" "}
                  {report.severity}
                </p>


                {/* Status */}

                <p className="mt-1">

                  <strong>Status:</strong>{" "}

                  <span
                    className={`font-bold ${
                      report.status === "Verified"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {report.status}
                  </span>

                </p>


                {/* Description */}

                <p className="mt-2">
                  <strong>Description:</strong>
                </p>

                <p className="text-gray-700">
                  {report.description}
                </p>


                {/* Date */}

                {report.createdAt && (
                  <p className="mt-3 text-sm text-gray-500">

                    📅{" "}

                    {report.createdAt
                      .toDate()
                      .toLocaleString()}

                  </p>
                )}

              </Popup>

            </Marker>
          );
        })}

      </MapContainer>

    </div>
  );
}

export default DisasterMap;