import { useState } from "react";
import axios from "axios";
import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
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
    <div className="bg-white rounded-3xl shadow-2xl p-8 mt-8">
      <form onSubmit={handleSubmit} className="space-y-8">

        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold text-slate-800">
            🚨 Submit Disaster Report
          </h2>

          <p className="text-gray-500 mt-2">
            Fill in the details below so authorities can respond quickly.
          </p>
        </div>

        {/* Disaster Type + Severity */}
        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <label className="font-semibold flex items-center gap-2 mb-2">
              <TriangleAlert size={18} />
              Disaster Type
            </label>

            <select
              className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-red-500 outline-none"
              value={formData.disasterType}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  disasterType: e.target.value,
                })
              }
            >
              <option value="">Select Disaster</option>
              <option>Flood</option>
              <option>Fire</option>
              <option>Earthquake</option>
              <option>Cyclone</option>
              <option>Landslide</option>
            </select>
          </div>

          <div>
            <label className="font-semibold flex items-center gap-2 mb-2">
              <Calendar size={18} />
              Severity
            </label>

            <select
              className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-red-500 outline-none"
              value={formData.severity}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  severity: e.target.value,
                })
              }
            >
              <option value="">Select Severity</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Critical</option>
            </select>
          </div>

        </div>

        {/* Location + Time */}
        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <label className="font-semibold flex items-center gap-2 mb-2">
              <MapPin size={18} />
              Current Location
            </label>

            <div className="flex gap-3">

              <input
                type="text"
                className="flex-1 border border-gray-300 rounded-xl p-3"
                placeholder="Click Get GPS"
                value={formData.location}
                readOnly
              />

              <button
                type="button"
                onClick={getCurrentLocation}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 rounded-xl transition"
              >
                Get GPS
              </button>

            </div>
          </div>

          <div>
            <label className="font-semibold flex items-center gap-2 mb-2">
              <Calendar size={18} />
              Report Time
            </label>

            <input
              type="text"
              className="w-full border border-gray-300 rounded-xl p-3 bg-gray-100"
              value={new Date().toLocaleString()}
              readOnly
            />
          </div>

        </div>

        {/* Description */}

        <div>

          <label className="font-semibold flex items-center gap-2 mb-2">
            <FileText size={18} />
            Description
          </label>

          <textarea
            rows="5"
            className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-red-500 outline-none"
            placeholder="Describe the disaster..."
            value={formData.description}
            onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value,
              })
            }
          />

        </div>

        {/* Image Upload */}

        <UploadBox
          image={formData.image}
          onChange={(e) =>
            setFormData({
              ...formData,
              image: e.target.files[0],
            })
          }
        />

        {/* Submit Button */}

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white py-4 rounded-2xl font-bold text-lg flex justify-center items-center gap-3 transition duration-300"
        >
          <Send size={22} />
          Submit Disaster Report
        </button>

      </form>
    </div>
  );
}

export default ReportForm;