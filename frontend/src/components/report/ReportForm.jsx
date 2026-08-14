import { useState } from "react";
import axios from "axios";
import { db } from "../../firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

import {
  CLOUDINARY_URL,
  UPLOAD_PRESET,
} from "../../config/cloudinary";

import {
  MapPin,
  Calendar,
  TriangleAlert,
  FileText,
  Send,
  Navigation,
  Info,
} from "lucide-react";

import UploadBox from "./UploadBox";

function ReportForm() {
  const [formData, setFormData] = useState({
    disasterType: "",
    severity: "",
    location: "",
    description: "",
    image: null,
  });

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData((prev) => ({
          ...prev,
          location: `${position.coords.latitude}, ${position.coords.longitude}`,
        }));
      },
      () => {
        alert("Unable to fetch location.");
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = "";

      // Upload image to Cloudinary
      if (formData.image) {
        const imageData = new FormData();

        imageData.append("file", formData.image);
        imageData.append("upload_preset", UPLOAD_PRESET);

        const uploadResponse = await axios.post(
          CLOUDINARY_URL,
          imageData
        );

        imageUrl = uploadResponse.data.secure_url;
      }

      // Save report in Firestore
      await addDoc(collection(db, "disasterReports"), {
        disasterType: formData.disasterType,
        severity: formData.severity,
        location: formData.location,
        description: formData.description,
        imageUrl,
        status: "Pending",
        createdAt: serverTimestamp(),
      });

      alert("✅ Disaster Report Submitted Successfully!");

      setFormData({
        disasterType: "",
        severity: "",
        location: "",
        description: "",
        image: null,
      });

    } catch (error) {
      console.error(error);
      alert("❌ Error submitting report");
    }
  };

  return (
    <section className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">

      <form onSubmit={handleSubmit}>

        {/* Form Header */}

        <div className="border-b border-slate-200 px-6 py-6 lg:px-8">

          <div className="flex items-start gap-4">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 border border-blue-100">
              <FileText
                size={22}
                className="text-blue-600"
              />
            </div>

            <div>

              <h2 className="text-xl font-bold text-slate-900">
                Incident Information
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Provide accurate information about the emergency incident.
              </p>

            </div>

          </div>

        </div>


        {/* Form Body */}

        <div className="px-6 py-7 lg:px-8 space-y-7">

          {/* Disaster Type + Severity */}

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

            {/* Disaster Type */}

            <div>

              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">

                <TriangleAlert
                  size={17}
                  className="text-red-500"
                />

                Disaster Type

              </label>

              <select
                required
                value={formData.disasterType}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    disasterType: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >

                <option value="">
                  Select disaster type
                </option>

                <option>Flood</option>
                <option>Fire</option>
                <option>Earthquake</option>
                <option>Cyclone</option>
                <option>Landslide</option>

              </select>

            </div>


            {/* Severity */}

            <div>

              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">

                <TriangleAlert
                  size={17}
                  className="text-amber-500"
                />

                Severity

              </label>

              <select
                required
                value={formData.severity}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    severity: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >

                <option value="">
                  Select severity
                </option>

                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Critical</option>

              </select>

            </div>

          </div>


          {/* Location + Time */}

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

            {/* Location */}

            <div>

              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">

                <MapPin
                  size={17}
                  className="text-blue-600"
                />

                Current Location

              </label>

              <div className="flex gap-2">

                <input
                  type="text"
                  required
                  readOnly
                  value={formData.location}
                  placeholder="Location coordinates"
                  className="min-w-0 flex-1 rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-600 outline-none"
                />

                <button
                  type="button"
                  onClick={getCurrentLocation}
                  className="flex shrink-0 items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >

                  <Navigation size={16} />

                  GPS

                </button>

              </div>

              <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-400">

                <Info size={13} />

                Use GPS to automatically capture your current location.

              </p>

            </div>


            {/* Report Time */}

            <div>

              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">

                <Calendar
                  size={17}
                  className="text-slate-500"
                />

                Report Time

              </label>

              <input
                type="text"
                readOnly
                value={new Date().toLocaleString()}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-600 outline-none"
              />

            </div>

          </div>


          {/* Description */}

          <div>

            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">

              <FileText
                size={17}
                className="text-slate-600"
              />

              Incident Description

            </label>

            <textarea
              required
              rows="5"
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
              placeholder="Describe what happened, the affected area, visible damage, or any immediate danger..."
              className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

          </div>


          {/* Evidence Upload */}

          <div>

            <div className="mb-2">

              <h3 className="text-sm font-semibold text-slate-700">
                Supporting Evidence
              </h3>

              <p className="mt-1 text-xs text-slate-400">
                Upload an image of the incident if available.
              </p>

            </div>

            <UploadBox
              image={formData.image}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  image: e.target.files[0],
                })
              }
            />

          </div>

        </div>


        {/* Form Footer */}

        <div className="flex flex-col gap-4 border-t border-slate-200 bg-slate-50 px-6 py-5 sm:flex-row sm:items-center sm:justify-between lg:px-8">

          <div>

            <p className="text-sm font-medium text-slate-700">
              Ready to submit?
            </p>

            <p className="mt-0.5 text-xs text-slate-400">
              Your report will be sent for verification.
            </p>

          </div>


          <button
            type="submit"
            className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
          >

            <Send size={17} />

            Submit Disaster Report

          </button>

        </div>

      </form>

    </section>
  );
}

export default ReportForm;