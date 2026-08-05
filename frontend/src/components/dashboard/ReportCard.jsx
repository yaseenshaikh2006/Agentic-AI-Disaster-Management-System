import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";
import {
  CheckCircle,
  Trash2,
  MapPin,
  TriangleAlert,
  Calendar,
} from "lucide-react";

function ReportCard({ report }) {
  const verifyReport = async () => {
    try {
      await updateDoc(doc(db, "disasterReports", report.id), {
        status: "Verified",
      });

      alert("✅ Report Verified");
    } catch (error) {
      console.error(error);
      alert("❌ Unable to verify report");
    }
  };

  const deleteReport = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this report?"
    );

    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "disasterReports", report.id));

      alert("🗑 Report Deleted");
    } catch (error) {
      console.error(error);
      alert("❌ Unable to delete report");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden">

      {/* Image */}
      {report.imageUrl && (
        <img
          src={report.imageUrl}
          alt="Disaster"
          className="w-full h-56 object-cover"
        />
      )}

      <div className="p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">

          <h2 className="text-2xl font-bold flex items-center gap-2">
            <TriangleAlert className="text-red-500" />
            {report.disasterType}
          </h2>

          <span
            className={`px-4 py-2 rounded-full text-white text-sm font-semibold ${
              report.status === "Verified"
                ? "bg-green-500"
                : "bg-yellow-500"
            }`}
          >
            {report.status}
          </span>

        </div>

        {/* Report Details */}

        <div className="space-y-3 text-gray-700">

          <p>
            <strong>Severity:</strong> {report.severity}
          </p>

          <p className="flex items-center gap-2">
            <MapPin size={18} className="text-blue-600" />
            {report.location}
          </p>

          {report.createdAt && (
            <p className="flex items-center gap-2">
              <Calendar size={18} className="text-green-600" />
              {report.createdAt.toDate().toLocaleString()}
            </p>
          )}

          <p>
            <strong>Description:</strong>
          </p>

          <div className="bg-gray-100 rounded-xl p-3">
            {report.description}
          </div>

        </div>

        {/* Buttons */}

        <div className="flex gap-4 mt-6">

          {report.status !== "Verified" && (
            <button
              onClick={verifyReport}
              className="flex-1 flex justify-center items-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl transition"
            >
              <CheckCircle size={18} />
              Verify
            </button>
          )}

          <button
            onClick={deleteReport}
            className="flex-1 flex justify-center items-center gap-2 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl transition"
          >
            <Trash2 size={18} />
            Delete
          </button>

        </div>

      </div>
    </div>
  );
}

export default ReportCard;