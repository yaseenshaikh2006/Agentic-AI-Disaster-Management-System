import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function DisasterMap() {
  const center = [19.0760, 72.8777];

  return (
    <div className="bg-white rounded-xl shadow-lg p-4">
      <h2 className="text-2xl font-bold mb-4">
        🗺️ Live Disaster Map
      </h2>

      <MapContainer
        center={center}
        zoom={11}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={center}>
          <Popup>
            📍 Mumbai <br />
            Demo Disaster Location
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default DisasterMap;