import {
  AlertTriangle,
  ShieldCheck,
  Navigation,
} from "lucide-react";

function MapLegend() {
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4">

      <div className="flex items-center gap-2 mb-4">

        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
          <Navigation
            size={16}
            className="text-blue-600"
          />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-800">
            Map Legend
          </h3>

          <p className="text-[11px] text-slate-400">
            Location indicators
          </p>
        </div>

      </div>


      <div className="space-y-3">

        {/* Disaster */}

        <div className="flex items-center gap-3">

          <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">

            <AlertTriangle
              size={15}
              className="text-red-600"
            />

          </div>

          <span className="text-sm text-slate-600">
            Disaster Area
          </span>

        </div>


        {/* Safe Zone */}

        <div className="flex items-center gap-3">

          <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">

            <ShieldCheck
              size={15}
              className="text-emerald-600"
            />

          </div>

          <span className="text-sm text-slate-600">
            Safe Shelter
          </span>

        </div>


        {/* User Location */}

        <div className="flex items-center gap-3">

          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">

            <Navigation
              size={15}
              className="text-blue-600"
            />

          </div>

          <span className="text-sm text-slate-600">
            Your Location
          </span>

        </div>

      </div>

    </div>
  );
}

export default MapLegend;