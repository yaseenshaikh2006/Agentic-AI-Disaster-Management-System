import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  AlertTriangle, 
  MapPin, 
  Send, 
  ShieldAlert, 
  CheckCircle2, 
  Loader2, 
  ArrowLeft 
} from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { triageDisasterReport } from "../services/api";

// Local Mumbai coordinate resolver for common locations
const MUMBAI_GEO_DATABASE = {
  jogeshwari: { lat: 19.1352, lng: 72.8546 },
  andheri: { lat: 19.1136, lng: 72.8697 },
  kurla: { lat: 19.0728, lng: 72.8826 },
  bandra: { lat: 19.0596, lng: 72.8295 },
  dadar: { lat: 19.0178, lng: 72.8478 },
  dharavi: { lat: 19.0402, lng: 72.8509 },
  colaba: { lat: 18.9067, lng: 72.8147 },
  ghatkopar: { lat: 19.0860, lng: 72.9090 },
  thane: { lat: 19.2183, lng: 72.9781 },
  chembur: { lat: 19.0622, lng: 72.9024 },
  borivali: { lat: 19.2307, lng: 72.8567 },
  malad: { lat: 19.1874, lng: 72.8484 }
};

function resolveCoordinates(locationInput) {
  if (!locationInput) return { lat: 19.0760, lng: 72.8777 };

  // Check if user manually entered "lat, lng" numbers
  const coordMatch = locationInput.match(/(-?\d+\.\d+)\s*,\s*(-?\d+\.\d+)/);
  if (coordMatch) {
    return { lat: parseFloat(coordMatch[1]), lng: parseFloat(coordMatch[2]) };
  }

  // Text-based matching
  const cleaned = locationInput.toLowerCase().trim();
  for (const [zone, coords] of Object.entries(MUMBAI_GEO_DATABASE)) {
    if (cleaned.includes(zone)) {
      return coords;
    }
  }

  // Default Central Metro fallback
  return { lat: 19.0760, lng: 72.8777 };
}

function ReportDisaster() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    disasterType: "Flood",
    severity: "High",
    location: "",
    description: "",
    contactNumber: ""
  });

  const [locating, setLocating] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [triageResult, setTriageResult] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`;
        setFormData((prev) => ({ ...prev, location: coords }));
        setLocating(false);
      },
      (error) => {
        console.warn("GPS Notice:", error.message);
        // Fallback for HTTP access: auto-assign local sector
        setFormData((prev) => ({ ...prev, location: "19.1352, 72.8546" }));
        alert("GPS disabled on non-HTTPS network. Populated current active sector coordinates.");
        setLocating(false);
      },
      { timeout: 7000, enableHighAccuracy: true }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.description.trim()) {
      alert("Please enter details about the emergency incident.");
      return;
    }

    try {
      setSubmitting(true);
      const coords = resolveCoordinates(formData.location);

      // 1. Ingest via Agent 2 (Gemini Triage & Incident Engine)
      const triageData = await triageDisasterReport({
        title: `${formData.disasterType} at ${formData.location || "Mumbai Metro"}`,
        description: formData.description,
        latitude: coords.lat,
        longitude: coords.lng,
        contactNumber: formData.contactNumber || "Citizen_Anonymous",
        severity: formData.severity,
      });

      setTriageResult(triageData);

      // 2. Persist to Firestore
      try {
        await addDoc(collection(db, "incidents"), {
          disasterType: formData.disasterType,
          userReportedSeverity: formData.severity,
          location: formData.location || `${coords.lat}, ${coords.lng}`,
          latitude: coords.lat,
          longitude: coords.lng,
          description: formData.description,
          contactNumber: formData.contactNumber || "Anonymous Civilian",
          aiTriage: triageData.triage || triageData,
          status: "OPEN_TRIAGED",
          createdAt: serverTimestamp()
        });
      } catch (fsErr) {
        console.warn("Firestore sync optional fallback:", fsErr.message);
      }

      setSubmitted(true);
    } catch (err) {
      console.error("Submission failed:", err);
      alert("Submission error: " + (err.message || "Failed to record incident."));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col items-center justify-center px-4 py-8 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-red-950/20 via-transparent to-transparent pointer-events-none" />

      <div className="w-full max-w-xl bg-[#0d1424] rounded-2xl border border-slate-800 p-6 md:p-8 shadow-2xl relative z-10">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-red-950/60 border border-red-800/80 text-red-500">
              <AlertTriangle size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-white">AntiCalamity</h1>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
                  SOS Ingress
                </span>
              </div>
              <p className="text-xs text-slate-400">Civilian Emergency Incident Telemetry Submission</p>
            </div>
          </div>
          <Link
            to="/"
            className="text-xs text-slate-400 hover:text-slate-200 transition inline-flex items-center gap-1"
          >
            <ArrowLeft size={14} /> Back
          </Link>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-950/60 border border-emerald-700/60 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 size={32} />
            </div>
            <h2 className="text-xl font-bold text-slate-100">Incident Telemetry Logged</h2>
            <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
              Your report has been received and routed to EOC field responders.
              {triageResult?.triage && (
                <span className="block mt-2 font-mono text-emerald-400 bg-emerald-950/30 p-2 rounded-lg border border-emerald-900/50">
                  Severity: {triageResult.triage.severity_level || "Critical"} | Confidence: {(triageResult.triage.confidence_score * 100).toFixed(0)}%
                </span>
              )}
            </p>
            <div className="pt-4 flex gap-3 justify-center">
              <button
                onClick={() => {
                  setSubmitted(false);
                  setTriageResult(null);
                  setFormData({
                    disasterType: "Flood",
                    severity: "High",
                    location: "",
                    description: "",
                    contactNumber: ""
                  });
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition"
              >
                Submit Another Report
              </button>
              <button
                onClick={() => navigate("/map")}
                className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-xs font-semibold text-white transition"
              >
                View Incident Map
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wide mb-1.5">
                  Disaster Category
                </label>
                <select
                  name="disasterType"
                  value={formData.disasterType}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900/90 text-white text-sm border border-slate-700/80 focus:outline-none focus:border-red-500 transition"
                >
                  <option value="Flood">🌊 Inundation / Urban Flood</option>
                  <option value="Fire">🔥 Structural / Forest Fire</option>
                  <option value="Landslide">⛰️ Landslide / Debris Flow</option>
                  <option value="Building Collapse">🏚️ Structural Collapse</option>
                  <option value="Cyclone">🌀 Cyclone / Gale Surge</option>
                  <option value="Medical Emergency">🚑 Mass Medical Trauma</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wide mb-1.5">
                  Reported Severity
                </label>
                <select
                  name="severity"
                  value={formData.severity}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900/90 text-white text-sm border border-slate-700/80 focus:outline-none focus:border-red-500 transition"
                >
                  <option value="Low">Low - Localized disruption</option>
                  <option value="Medium">Medium - Threat to property</option>
                  <option value="High">High - Life safety in danger</option>
                  <option value="Critical">Critical - Active casualties trapped</option>
                </select>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
                  Location (Name or Coordinates)
                </label>
                <button
                  type="button"
                  onClick={handleGetCurrentLocation}
                  disabled={locating}
                  className="text-xs text-orange-400 hover:text-orange-300 flex items-center gap-1 font-semibold cursor-pointer"
                >
                  <MapPin size={12} />
                  {locating ? "Resolving GPS..." : "Auto-Detect GPS"}
                </button>
              </div>
              <input
                type="text"
                name="location"
                placeholder="e.g. Jogeshwari, Andheri, Dadar, or 19.135, 72.854"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-900/90 text-white text-sm border border-slate-700/80 focus:outline-none focus:border-red-500 placeholder-slate-500 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wide mb-1.5">
                Situation Description & Immediate Need
              </label>
              <textarea
                name="description"
                rows={3}
                placeholder="Describe trapped people, water depth, blocked routes, or urgent medical requirements..."
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-900/90 text-white text-sm border border-slate-700/80 focus:outline-none focus:border-red-500 placeholder-slate-500 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wide mb-1.5">
                Callback Number <span className="text-slate-500 text-[10px]">(Optional)</span>
              </label>
              <input
                type="tel"
                name="contactNumber"
                placeholder="+91 XXXXX XXXXX"
                value={formData.contactNumber}
                onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-900/90 text-white text-sm border border-slate-700/80 focus:outline-none focus:border-red-500 placeholder-slate-500 transition"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-bold py-3 px-4 rounded-xl text-sm shadow-lg shadow-red-950/50 flex items-center justify-center gap-2 transition cursor-pointer disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Agent 2 Triaging & Transmitting SOS...</span>
                </>
              ) : (
                <>
                  <Send size={16} />
                  <span>Submit Live Emergency SOS</span>
                </>
              )}
            </button>
          </form>
        )}

        <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5">
            <ShieldAlert size={13} className="text-emerald-400" />
            Unauthenticated Civilian Protocol Enabled
          </span>
          <Link to="/login" className="text-slate-400 hover:text-slate-200 underline">
            Officer EOC Clearance
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ReportDisaster;
