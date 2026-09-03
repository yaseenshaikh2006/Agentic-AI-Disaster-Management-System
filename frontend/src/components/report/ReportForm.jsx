import React, { useState } from 'react';

const DISASTER_TYPES = [
  { id: 'flood', label: 'Flood / Flash Flood', icon: '🌊' },
  { id: 'earthquake', label: 'Earthquake', icon: '🏚️' },
  { id: 'fire', label: 'Wildfire / Building Fire', icon: '🔥' },
  { id: 'landslide', label: 'Landslide', icon: '⛰️' },
  { id: 'cyclone', label: 'Cyclone / Storm', icon: '🌪️' },
  { id: 'other', label: 'Other Hazard', icon: '⚠️' }
];

const SEVERITY_LEVELS = [
  { id: 'low', label: 'Low', desc: 'Minor property damage, no injuries', color: 'border-yellow-500 text-yellow-500 bg-yellow-500/10' },
  { id: 'medium', label: 'Medium', desc: 'Blocked routes, non-fatal injuries', color: 'border-amber-500 text-amber-500 bg-amber-500/10' },
  { id: 'high', label: 'High', desc: 'Structural collapse, evacuations needed', color: 'border-orange-500 text-orange-500 bg-orange-500/10' },
  { id: 'critical', label: 'Critical', desc: 'Trapped civilians, immediate life threat', color: 'border-red-600 text-red-500 bg-red-600/15' }
];

export default function ReportForm({ onSubmit, isSubmitting }) {
  const [formData, setFormData] = useState({
    disasterType: 'flood',
    severity: 'medium',
    title: '',
    description: '',
    address: '',
    latitude: '',
    longitude: '',
    peopleAffected: '',
    immediateNeeds: []
  });

  const [geoLoading, setGeoLoading] = useState(false);
  const [geoError, setGeoError] = useState('');

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setGeoError('Geolocation is not supported by your browser.');
      return;
    }
    setGeoLoading(true);
    setGeoError('');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setFormData((prev) => ({
          ...prev,
          latitude: pos.coords.latitude.toFixed(6),
          longitude: pos.coords.longitude.toFixed(6)
        }));
        setGeoLoading(false);
      },
      (err) => {
        setGeoError('Could not fetch GPS. Please enter coordinates or address manually.');
        setGeoLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleNeedToggle = (need) => {
    setFormData((prev) => {
      const exists = prev.immediateNeeds.includes(need);
      return {
        ...prev,
        immediateNeeds: exists
          ? prev.immediateNeeds.filter((n) => n !== need)
          : [...prev.immediateNeeds, need]
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-slate-100">
      {/* Disaster Category Selection */}
      <div>
        <label className="block text-sm font-semibold uppercase tracking-wider text-slate-400 mb-2">
          1. Hazard Category
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {DISASTER_TYPES.map((type) => (
            <button
              key={type.id}
              type="button"
              onClick={() => setFormData({ ...formData, disasterType: type.id })}
              className={`flex items-center gap-2 p-3 rounded-xl border text-sm font-medium transition-all ${
                formData.disasterType === type.id
                  ? 'border-blue-500 bg-blue-500/20 text-white shadow-lg shadow-blue-500/20'
                  : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 text-slate-300'
              }`}
            >
              <span className="text-xl">{type.icon}</span>
              <span>{type.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Severity Selector */}
      <div>
        <label className="block text-sm font-semibold uppercase tracking-wider text-slate-400 mb-2">
          2. Threat Level
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          {SEVERITY_LEVELS.map((lvl) => (
            <div
              key={lvl.id}
              onClick={() => setFormData({ ...formData, severity: lvl.id })}
              className={`cursor-pointer p-3 rounded-xl border transition-all ${
                formData.severity === lvl.id
                  ? `${lvl.color} ring-1 ring-offset-2 ring-offset-slate-950 font-bold`
                  : 'border-slate-800 bg-slate-900/40 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="text-sm font-bold uppercase">{lvl.label}</div>
              <div className="text-xs mt-1 opacity-70 leading-snug">{lvl.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Location Section */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-semibold uppercase tracking-wider text-slate-400">
            3. Incident Coordinates
          </label>
          <button
            type="button"
            onClick={handleGetLocation}
            disabled={geoLoading}
            className="text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition disabled:opacity-50"
          >
            {geoLoading ? 'Acquiring GPS...' : '📍 Auto-detect My GPS'}
          </button>
        </div>

        {geoError && <p className="text-xs text-red-400 mb-2">{geoError}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Latitude (e.g. 19.0760)"
            value={formData.latitude}
            onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none"
            required
          />
          <input
            type="text"
            placeholder="Longitude (e.g. 72.8777)"
            value={formData.longitude}
            onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none"
            required
          />
        </div>
      </div>

      {/* Immediate Needs Badges */}
      <div>
        <label className="block text-sm font-semibold uppercase tracking-wider text-slate-400 mb-2">
          4. Immediate Life-Saving Needs
        </label>
        <div className="flex flex-wrap gap-2">
          {['Medical Assistance', 'Evacuation Boat', 'Food & Drinking Water', 'Rescue Tools', 'Emergency Shelter'].map((need) => (
            <button
              key={need}
              type="button"
              onClick={() => handleNeedToggle(need)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                formData.immediateNeeds.includes(need)
                  ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300'
                  : 'border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700'
              }`}
            >
              {formData.immediateNeeds.includes(need) ? '✓ ' : '+ '} {need}
            </button>
          ))}
        </div>
      </div>

      {/* Details Description */}
      <div>
        <label className="block text-sm font-semibold uppercase tracking-wider text-slate-400 mb-2">
          5. Situation Details
        </label>
        <textarea
          rows="3"
          placeholder="Describe trapped victims, water levels, road blocks, or structural collapse..."
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm focus:border-blue-500 focus:outline-none"
          required
        ></textarea>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 px-4 rounded-xl font-semibold text-white bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 shadow-lg shadow-red-500/20 transition-all flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <span>Transmitting Incident Telemetry...</span>
        ) : (
          <span>Transmit Incident Report 🚨</span>
        )}
      </button>
    </form>
  );
}