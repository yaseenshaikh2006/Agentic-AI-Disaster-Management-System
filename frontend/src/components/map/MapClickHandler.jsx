import { Marker, Popup, useMapEvents } from "react-leaflet";
import { useState } from "react";

function MapClickHandler() {
  const [clickedPosition, setClickedPosition] = useState(null);

  useMapEvents({
    click(e) {
      setClickedPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  return clickedPosition ? (
    <Marker position={clickedPosition}>
      <Popup>
        <div>
          <h3 className="font-bold">📍 Selected Location</h3>

          <p>
            Latitude: {clickedPosition[0].toFixed(5)}
          </p>

          <p>
            Longitude: {clickedPosition[1].toFixed(5)}
          </p>

          <button className="mt-3 bg-red-600 text-white px-3 py-2 rounded-lg">
            Report Disaster Here
          </button>
        </div>
      </Popup>
    </Marker>
  ) : null;
}

export default MapClickHandler;