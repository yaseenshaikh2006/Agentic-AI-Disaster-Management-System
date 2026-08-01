import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const locations = [
  {
    id: 1,
    position: [19.0760, 72.8777],
    title: "Flood Alert",
    description: "Mumbai - High Flood Risk",
  },
  {
    id: 2,
    position: [18.5204, 73.8567],
    title: "Fire Alert",
    description: "Pune - Industrial Fire",
  },
  {
    id: 3,
    position: [19.2183, 72.9781],
    title: "Safe Shelter",
    description: "Shelter Capacity: 500 People",
  },
];

function DisasterMap() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4">
      <h2 className="text-2xl font-bold mb-4">
        🗺️ Live Disaster Map
      </h2>

      <MapContainer
        center={[19.0760, 72.8777]}
        zoom={8}
        style={{ height: "550px", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {locations.map((location) => (
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