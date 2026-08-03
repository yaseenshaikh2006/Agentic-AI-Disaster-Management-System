import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { CheckCircle, Trash2, MapPin, TriangleAlert } from "lucide-react";

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
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">

      <div className="flex justify-between items-center mb-4">

        <h2 className="text-2xl font-bold flex items-center gap-2">
          <TriangleAlert className="text-red-500" />
          {report.disasterType}
        </h2>

        <span
          className={`px-4 py-2 rounded-full text-white font-semibold ${
            report.status === "Verified"
              ? "bg-green-500"
              : "bg-yellow-500"
          }`}
        >
          {report.status}
        </span>

      </div>

      <div className="space-y-2 text-gray-700">

        <p>
          <strong>Severity:</strong> {report.severity}
        </p>

        <p className="flex items-center gap-2">
          <MapPin size={18} />
          {report.location}
        </p>

        <p>
          <strong>Description:</strong> {report.description}
        </p>

      </div>

      <div className="flex gap-4 mt-6">

        {report.status !== "Verified" && (
          <button
            onClick={verifyReport}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl transition"
          >
            <CheckCircle size={18} />
            Verify
          </button>
        )}

        <button
          onClick={deleteReport}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl transition"
        >
          <Trash2 size={18} />
          Delete
        </button>

      </div>

    </div>
  );
}

export default ReportCard;