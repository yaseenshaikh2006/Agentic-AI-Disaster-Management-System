function MapLegend() {
  return (
    <div className="bg-white shadow-lg rounded-xl p-4">
      <h3 className="text-xl font-bold mb-3">
        🗺️ Map Legend
      </h3>

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🔴</span>
          <span>Disaster Area</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-2xl">🟢</span>
          <span>Safe Shelter</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-2xl">📍</span>
          <span>Your Location</span>
        </div>
      </div>
    </div>
  );
}

export default MapLegend;