import React, { useState } from 'react';

const INITIAL_INVENTORY = [
  { id: 'inv-1', item: 'Packaged Drinking Water', qty: '12,450 L', unit: 'Liters', status: 'Optimal', change: '+2,000 L today', color: 'text-blue-400 border-blue-500/30 bg-blue-500/10' },
  { id: 'inv-2', item: 'Ready-to-Eat Food Kits', qty: '3,800', unit: 'Rations', status: 'Moderate', change: '-450 dispatched', color: 'text-amber-400 border-amber-500/30 bg-amber-500/10' },
  { id: 'inv-3', item: 'First-Aid Trauma Kits', qty: '640', unit: 'Packs', status: 'Low Stock', change: '-120 dispatched', color: 'text-red-400 border-red-500/30 bg-red-500/10' },
  { id: 'inv-4', item: 'Blankets & Tarpaulins', qty: '1,920', unit: 'Units', status: 'Optimal', change: '+500 restocked', color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' },
];

const SHELTERS = [
  { id: 'SH-01', name: 'St. Mary Community Complex', capacity: 600, occupied: 480, area: 'Kurla West', status: '80% Full', contact: '+91 98201-XXXXX' },
  { id: 'SH-02', name: 'Municipal Sports Arena', capacity: 1200, occupied: 650, area: 'BKC East', status: '54% Full', contact: '+91 98202-XXXXX' },
  { id: 'SH-03', name: 'Bhavans Relief Camp', capacity: 400, occupied: 390, area: 'Andheri West', status: '97% Full', contact: '+91 98203-XXXXX' },
];

const DISPATCH_REQUESTS = [
  { id: 'REQ-401', destination: 'Sector 4 Flood Pocket', item: 'Drinking Water & First-Aid', priority: 'Critical', transport: 'NDRF Inflatable Boat', eta: '14 mins' },
  { id: 'REQ-402', destination: 'Relief Camp #2', item: '200 Tarpaulins & Food Kits', priority: 'High', transport: 'Heavy Truck 04', eta: '28 mins' },
  { id: 'REQ-403', destination: 'Clinic Tent 1', item: 'Oxygen Cylinders & Trauma Kits', priority: 'Critical', transport: 'Emergency Van', eta: '8 mins' },
];

export default function ReliefDistribution() {
  const [inventory] = useState(INITIAL_INVENTORY);
  const [shelters] = useState(SHELTERS);
  const [requests] = useState(DISPATCH_REQUESTS);

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 p-4 sm:p-6 lg:p-8 space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              Relief & Resource Logistics Hub
            </h1>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-blue-600/20 text-blue-400 border border-blue-500/30">
              SUPPLY CHAIN ACTIVE
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Real-time emergency supply levels, evacuation shelter occupancy, and autonomous dispatch routing.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/25 transition">
            + Request Resource Deployment
          </button>
        </div>
      </div>

      {/* Primary Supply Stock Ticker */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {inventory.map((inv) => (
          <div key={inv.id} className="p-4 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{inv.item}</span>
                <span className={`text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded border ${inv.color}`}>
                  {inv.status}
                </span>
              </div>
              <div className="text-2xl font-black text-white mt-2">{inv.qty}</div>
            </div>
            <div className="text-[11px] text-slate-500 mt-2 font-mono">{inv.change}</div>
          </div>
        ))}
      </div>

      {/* Grid: Shelters Capacity & Dispatch Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Active Shelters & Occupancy Rates */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-md p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200">
                Evacuation Shelter Capacity & Readiness
              </h2>
              <p className="text-xs text-slate-400">Live civilian occupancy monitoring across safe zones</p>
            </div>
            <span className="text-xs font-mono text-slate-500">3 Designated Shelters</span>
          </div>

          <div className="space-y-4">
            {shelters.map((sh) => {
              const occupancyPct = Math.round((sh.occupied / sh.capacity) * 100);
              const barColor = occupancyPct > 90 ? 'bg-red-500' : occupancyPct > 70 ? 'bg-amber-500' : 'bg-emerald-500';

              return (
                <div key={sh.id} className="p-4 rounded-xl border border-slate-800/80 bg-slate-950/60 space-y-2.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-blue-400">{sh.id}</span>
                        <h3 className="font-bold text-sm text-white">{sh.name}</h3>
                      </div>
                      <p className="text-xs text-slate-400">📍 {sh.area} • POC: <span className="text-slate-300 font-mono">{sh.contact}</span></p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-slate-200">{sh.occupied}</span>
                      <span className="text-xs text-slate-500"> / {sh.capacity} Persons</span>
                    </div>
                  </div>

                  {/* Occupancy Progress Bar */}
                  <div>
                    <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div className={`h-full rounded-full ${barColor}`} style={{ width: `${occupancyPct}%` }}></div>
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                      <span>Occupancy: {occupancyPct}%</span>
                      <span>Available: {sh.capacity - sh.occupied} Beds</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 1 Col: Active Logistical Dispatch Missions */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-md p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping"></span>
              Outbound Logistics
            </h2>
            <span className="text-[10px] font-mono text-slate-500">En Route</span>
          </div>

          <div className="space-y-3">
            {requests.map((req) => (
              <div key={req.id} className="p-3.5 rounded-xl border border-slate-800/80 bg-slate-950/60 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-blue-400">{req.id}</span>
                  <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded border ${
                    req.priority === 'Critical' ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-orange-500/20 text-orange-400 border-orange-500/30'
                  }`}>
                    {req.priority}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-200">{req.destination}</h4>
                <p className="text-xs text-slate-400">Cargo: <span className="text-slate-300">{req.item}</span></p>
                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-800/60">
                  <span>🚛 {req.transport}</span>
                  <span className="font-semibold text-emerald-400 font-mono">ETA: {req.eta}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}