import DisasterMap from "../components/map/DisasterMap";
import MapLegend from "../components/map/MapLegend";

function DisasterMapPage() {
  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <h1 className="text-4xl font-bold mb-6">🌍 Disaster Map</h1>

      <div className="grid lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <DisasterMap />
        </div>

        <div>
          <MapLegend />
        </div>
      </div>
    </div>
  );
}

export default DisasterMapPage;