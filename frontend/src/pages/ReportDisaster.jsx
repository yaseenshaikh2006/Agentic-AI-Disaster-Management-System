import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { auth, db, storage } from "../firebase";

function ReportDisaster() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    disasterType: "Earthquake",
    severity: "Low",
    location: "",
    description: "",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // -----------------------------
  // Handle input changes
  // -----------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // -----------------------------
  // Get current GPS location
  // -----------------------------
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("GPS is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setFormData((prev) => ({
          ...prev,
          location: `${latitude}, ${longitude}`,
        }));
      },
      (error) => {
        console.error("GPS ERROR:", error);
        alert(
          "Unable to get your location. Please allow location permission."
        );
      }
    );
  };

  // -----------------------------
  // Handle image
  // -----------------------------
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Allow only images
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");
      return;
    }

    // 5 MB limit
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5 MB.");
      return;
    }

    setImage(file);
  };

  // -----------------------------
  // Submit report
  // -----------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check login
    const user = auth.currentUser;

    if (!user) {
      alert("Please login first to submit a disaster report.");
      navigate("/login");
      return;
    }

    // Validation
    if (!formData.location.trim()) {
      alert("Please enter your current location.");
      return;
    }

    if (!formData.description.trim()) {
      alert("Please enter incident description.");
      return;
    }

    try {
      setLoading(true);

      let imageUrl = "";

      // -----------------------------
      // Upload image if selected
      // -----------------------------
      if (image) {
        const imageRef = ref(
          storage,
          `disasterReports/${user.uid}/${Date.now()}_${image.name}`
        );

        await uploadBytes(imageRef, image);

        imageUrl = await getDownloadURL(imageRef);
      }

      // -----------------------------
      // Save report in Firestore
      // -----------------------------
      const reportData = {
        userId: user.uid,
        userEmail: user.email,

        disasterType: formData.disasterType,
        severity: formData.severity,
        location: formData.location.trim(),
        description: formData.description.trim(),

        imageUrl: imageUrl,

        status: "Pending",
        verified: false,

        createdAt: serverTimestamp(),
      };

      const docRef = await addDoc(
        collection(db, "disasterReports"),
        reportData
      );

      console.log("Report submitted successfully:", docRef.id);

      alert(
        "✅ Disaster report submitted successfully!\n\nReport ID: " +
          docRef.id
      );

      // Reset form
      setFormData({
        disasterType: "Earthquake",
        severity: "Low",
        location: "",
        description: "",
      });

      setImage(null);

      // Go back to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("REPORT SUBMISSION ERROR:", error);

      // Show actual Firebase error
      alert(
        "❌ Report submission failed.\n\n" +
          "Error: " +
          error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">

      {/* ================= HEADER ================= */}
      <header className="bg-slate-950 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

          <div>
            <h1 className="text-3xl font-bold">
              🚨 DisasterAI
            </h1>

            <p className="text-slate-400 mt-1">
              Emergency Disaster Reporting System
            </p>
          </div>

          <button
            onClick={() => navigate("/dashboard")}
            className="bg-slate-800 hover:bg-slate-700 px-5 py-2 rounded-lg transition"
          >
            ← Dashboard
          </button>

        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="max-w-5xl mx-auto px-6 py-10">

        {/* Page title */}
        <div className="mb-8">

          <p className="text-blue-600 font-semibold uppercase tracking-wider text-sm">
            Emergency Report
          </p>

          <h2 className="text-4xl font-bold text-slate-900 mt-2">
            Report a Disaster
          </h2>

          <p className="text-slate-600 mt-2">
            Provide accurate information about the incident so that
            authorities can verify and respond quickly.
          </p>

        </div>

        {/* ================= FORM CARD ================= */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">

          {/* Progress header */}
          <div className="grid grid-cols-3 border-b border-slate-200">

            <div className="p-5 bg-blue-50">
              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                  01
                </div>

                <div>
                  <p className="font-bold text-slate-900">
                    Report Details
                  </p>

                  <p className="text-sm text-slate-500">
                    Incident information
                  </p>
                </div>

              </div>
            </div>

            <div className="p-5">
              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold">
                  02
                </div>

                <div>
                  <p className="font-bold text-slate-900">
                    Evidence
                  </p>

                  <p className="text-sm text-slate-500">
                    Optional image
                  </p>
                </div>

              </div>
            </div>

            <div className="p-5">
              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold">
                  03
                </div>

                <div>
                  <p className="font-bold text-slate-900">
                    Submit
                  </p>

                  <p className="text-sm text-slate-500">
                    Send for verification
                  </p>
                </div>

              </div>
            </div>

          </div>

          {/* ================= FORM ================= */}
          <form onSubmit={handleSubmit} className="p-8">

            {/* Incident information */}
            <div className="mb-8">

              <h3 className="text-2xl font-bold text-slate-900">
                Incident Information
              </h3>

              <p className="text-slate-500 mt-1 mb-6">
                Provide details about the emergency incident.
              </p>

              {/* Disaster type + severity */}
              <div className="grid md:grid-cols-2 gap-6">

                {/* Disaster type */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-2">
                    🚨 Disaster Type
                  </label>

                  <select
                    name="disasterType"
                    value={formData.disasterType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Earthquake</option>
                    <option>Flood</option>
                    <option>Fire</option>
                    <option>Landslide</option>
                    <option>Cyclone</option>
                    <option>Tsunami</option>
                    <option>Drought</option>
                    <option>Building Collapse</option>
                    <option>Industrial Accident</option>
                    <option>Other</option>
                  </select>
                </div>

                {/* Severity */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-2">
                    ⚠️ Severity
                  </label>

                  <select
                    name="severity"
                    value={formData.severity}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Critical</option>
                  </select>
                </div>

              </div>

              {/* Location */}
              <div className="mt-6">

                <label className="block font-semibold text-slate-700 mb-2">
                  📍 Current Location
                </label>

                <div className="flex gap-3">

                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Enter location or use GPS"
                    className="flex-1 px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  <button
                    type="button"
                    onClick={getCurrentLocation}
                    className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
                  >
                    📍 GPS
                  </button>

                </div>

                <p className="text-sm text-slate-500 mt-2">
                  Use GPS to automatically capture your current
                  latitude and longitude.
                </p>

              </div>

              {/* Description */}
              <div className="mt-6">

                <label className="block font-semibold text-slate-700 mb-2">
                  📝 Incident Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="6"
                  placeholder="Describe what happened, affected areas, injuries, damage, or any other important information..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

            </div>

            {/* ================= IMAGE ================= */}
            <div className="border-t border-slate-200 pt-8">

              <h3 className="text-2xl font-bold text-slate-900">
                📷 Supporting Evidence
              </h3>

              <p className="text-slate-500 mt-1 mb-5">
                Upload an image of the incident if available.
              </p>

              <label
                htmlFor="disasterImage"
                className="block cursor-pointer"
              >

                <div className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl p-10 text-center transition bg-slate-50">

                  <div className="text-5xl mb-4">
                    ☁️
                  </div>

                  <h4 className="text-lg font-bold text-slate-800">
                    Upload incident evidence
                  </h4>

                  <p className="text-slate-500 mt-1">
                    Click to browse and select an image
                  </p>

                  <p className="text-sm text-slate-400 mt-2">
                    JPG, PNG or other image formats • Max 5 MB
                  </p>

                  {image && (
                    <p className="mt-4 text-blue-600 font-semibold">
                      Selected: {image.name}
                    </p>
                  )}

                </div>

              </label>

              <input
                id="disasterImage"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />

            </div>

            {/* ================= SUBMIT ================= */}
            <div className="mt-8 border-t border-slate-200 pt-6">

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                <div>
                  <h4 className="font-bold text-slate-800">
                    Ready to submit?
                  </h4>

                  <p className="text-sm text-slate-500">
                    Your report will be sent for verification.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-bold text-lg transition shadow-lg"
                >
                  {loading
                    ? "⏳ Submitting..."
                    : "🚨 Submit Disaster Report"}
                </button>

              </div>

            </div>

          </form>

        </div>

        {/* Security note */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-5">

          <div className="flex gap-3">

            <div className="text-2xl">
              🔐
            </div>

            <div>
              <h4 className="font-bold text-blue-900">
                Secure Emergency Reporting
              </h4>

              <p className="text-sm text-blue-700 mt-1">
                Your report is securely stored and associated with
                your authenticated account. Submitted reports are
                marked as pending until verification.
              </p>
            </div>

          </div>

        </div>

      </main>
    </div>
  );
}

export default ReportDisaster;
