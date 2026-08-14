import {
  Activity,
  MapPin,
  Radio,
  ShieldCheck,
} from "lucide-react";

import DisasterMap from "../components/map/DisasterMap";
import MapLegend from "../components/map/MapLegend";

function DisasterMapPage() {
  return (
    <div className="min-h-screen bg-[#f5f7fb]">

      {/* Page Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-6">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

            {/* Title */}
            <div className="flex items-start gap-4">

              <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center shadow-sm">
                <MapPin
                  size={24}
                  className="text-white"
                />
              </div>

              <div>
                <div className="flex items-center gap-3">

                  <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                    Disaster Monitoring Map
                  </h1>

                  <span className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    LIVE
                  </span>

                </div>

                <p className="text-sm text-slate-500 mt-1">
                  Real-time disaster incidents, emergency locations and safe zones
                </p>
              </div>

            </div>

            {/* Status */}
            <div className="flex items-center gap-6">

              <div className="flex items-center gap-2">
                <Activity
                  size={18}
                  className="text-blue-600"
                />

                <div>
                  <p className="text-xs text-slate-400">
                    MONITORING
                  </p>

                  <p className="text-sm font-semibold text-slate-700">
                    Active
                  </p>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-2">

                <Radio
                  size={18}
                  className="text-cyan-600"
                />

                <div>
                  <p className="text-xs text-slate-400">
                    NETWORK
                  </p>

                  <p className="text-sm font-semibold text-emerald-600">
                    Connected
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>
      </header>


      {/* Main Content */}
      <main className="max-w-[1600px] mx-auto px-6 lg:px-10 py-7">

        {/* Information Bar */}
        <div className="bg-white border border-slate-200 rounded-xl px-5 py-4 mb-6 shadow-sm">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

            <div>
              <h2 className="text-base font-semibold text-slate-800">
                Live Incident Map
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Monitor reported incidents and emergency locations in real time.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-5 text-sm">

              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <span className="text-slate-600">
                  Disaster
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span className="text-slate-600">
                  Alert
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-slate-600">
                  Safe Zone
                </span>
              </div>

              <div className="flex items-center gap-2">
                <MapPin
                  size={15}
                  className="text-blue-600"
                />

                <span className="text-slate-600">
                  Your Location
                </span>
              </div>

            </div>

          </div>

        </div>


        {/* Map + Legend */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-6 items-start">

          {/* Map */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

            <DisasterMap />

          </div>


          {/* Sidebar */}
          <aside className="space-y-5">

            <MapLegend />

            {/* Map Status Card */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">

              <div className="flex items-center gap-3 mb-4">

                <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center">
                  <ShieldCheck
                    size={19}
                    className="text-emerald-600"
                  />
                </div>

                <div>
                  <h3 className="font-semibold text-slate-800">
                    Map Status
                  </h3>

                  <p className="text-xs text-slate-500">
                    Monitoring system
                  </p>
                </div>

              </div>

              <div className="flex items-center justify-between py-3 border-t border-slate-100">

                <span className="text-sm text-slate-500">
                  Data connection
                </span>

                <span className="flex items-center gap-2 text-sm font-medium text-emerald-600">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Live
                </span>

              </div>

              <div className="flex items-center justify-between py-3 border-t border-slate-100">

                <span className="text-sm text-slate-500">
                  Location services
                </span>

                <span className="text-sm font-medium text-blue-600">
                  Enabled
                </span>

              </div>

            </div>

          </aside>

        </div>

      </main>

    </div>
  );
}

export default DisasterMapPage;