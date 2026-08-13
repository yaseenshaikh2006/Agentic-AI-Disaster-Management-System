import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";

import {
  CheckCircle,
  Trash2,
  MapPin,
  TriangleAlert,
  Calendar,
  ShieldAlert,
} from "lucide-react";

function ReportCard({ report }) {
  const verifyReport = async () => {
    try {
      await updateDoc(doc(db, "disasterReports", report.id), {
        status: "Verified",
      });

      alert("✅ Report Verified Successfully");
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

      alert("🗑 Report Deleted Successfully");
    } catch (error) {
      console.error(error);
      alert("❌ Unable to delete report");
    }
  };

  const getRiskLevel = () => {
    switch (report.severity) {
      case "Critical":
        return {
          label: "Critical Risk",
          className: "bg-red-50 text-red-700 border-red-200",
        };

      case "High":
        return {
          label: "High Risk",
          className: "bg-orange-50 text-orange-700 border-orange-200",
        };

      case "Medium":
        return {
          label: "Medium Risk",
          className: "bg-amber-50 text-amber-700 border-amber-200",
        };

      case "Low":
        return {
          label: "Low Risk",
          className: "bg-emerald-50 text-emerald-700 border-emerald-200",
        };

      default:
        return {
          label: "Risk Unknown",
          className: "bg-slate-50 text-slate-600 border-slate-200",
        };
    }
  };

  const risk = getRiskLevel();

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">

      {/* ================= IMAGE ================= */}
      {report.imageUrl && (
        <div className="w-full h-52 bg-slate-100 overflow-hidden">
          <img
            src={report.imageUrl}
            alt={`${report.disasterType || "Disaster"} report`}
            className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-300"
          />
        </div>
      )}

      <div className="p-5">

        {/* ================= HEADER ================= */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
              <TriangleAlert
                size={21}
                className="text-red-600"
              />
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900">
                {report.disasterType || "Unknown Disaster"}
              </h2>

              <p className="text-xs text-slate-500 mt-0.5">
                Disaster Incident Report
              </p>
            </div>

          </div>


          {/* Status */}
          <span
            className={`inline-flex items-center justify-center px-3 py-1.5 rounded-full text-xs font-semibold border ${
              report.status === "Verified"
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : "bg-amber-50 text-amber-700 border-amber-200"
            }`}
          >
            {report.status === "Verified" ? "Verified" : "Pending Review"}
          </span>

        </div>


        {/* ================= AI RISK ================= */}
        <div className="border border-slate-200 rounded-xl p-4 mb-5 bg-slate-50/70">

          <div className="flex items-center justify-between gap-3">

            <div className="flex items-center gap-3">

              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                  report.severity === "Critical"
                    ? "bg-red-100"
                    : report.severity === "High"
                    ? "bg-orange-100"
                    : report.severity === "Medium"
                    ? "bg-amber-100"
                    : "bg-emerald-100"
                }`}
              >
                <ShieldAlert
                  size={19}
                  className={
                    report.severity === "Critical"
                      ? "text-red-600"
                      : report.severity === "High"
                      ? "text-orange-600"
                      : report.severity === "Medium"
                      ? "text-amber-600"
                      : "text-emerald-600"
                  }
                />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Risk Assessment
                </p>

                <p className="text-xs text-slate-500">
                  Based on disaster severity
                </p>
              </div>

            </div>


            <span
              className={`px-3 py-1.5 rounded-lg border text-xs font-semibold ${risk.className}`}
            >
              {risk.label}
            </span>

          </div>

          <p className="text-xs text-slate-500 mt-3">
            Situation requires monitoring and appropriate response action.
          </p>

        </div>


        {/* ================= DETAILS ================= */}
        <div className="space-y-3">

          {/* Severity */}
          <div className="flex items-center gap-3">

            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
              <ShieldAlert
                size={17}
                className="text-slate-600"
              />
            </div>

            <div>
              <p className="text-xs text-slate-400">
                Severity
              </p>

              <p className="text-sm font-semibold text-slate-700">
                {report.severity || "Not specified"}
              </p>
            </div>

          </div>


          {/* Location */}
          <div className="flex items-start gap-3">

            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
              <MapPin
                size={17}
                className="text-blue-600"
              />
            </div>

            <div>
              <p className="text-xs text-slate-400">
                Location
              </p>

              <p className="text-sm font-medium text-slate-700 break-all">
                {report.location || "Location unavailable"}
              </p>
            </div>

          </div>


          {/* Date */}
          {report.createdAt && (
            <div className="flex items-center gap-3">

              <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                <Calendar
                  size={17}
                  className="text-emerald-600"
                />
              </div>

              <div>
                <p className="text-xs text-slate-400">
                  Reported On
                </p>

                <p className="text-sm font-medium text-slate-700">
                  {report.createdAt.toDate().toLocaleString()}
                </p>
              </div>

            </div>
          )}

        </div>


        {/* ================= DESCRIPTION ================= */}
        <div className="mt-5">

          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">
            Description
          </p>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">

            <p className="text-sm text-slate-600 leading-relaxed">
              {report.description || "No description provided."}
            </p>

          </div>

        </div>


        {/* ================= ACTION BUTTONS ================= */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6">

          {/* VERIFY */}
          {report.status !== "Verified" && (
            <button
              onClick={verifyReport}
              className="
                flex-1
                flex
                justify-center
                items-center
                gap-2
                bg-emerald-600
                hover:bg-emerald-700
                active:bg-emerald-800
                text-white
                py-2.5
                px-4
                rounded-xl
                font-semibold
                text-sm
                shadow-sm
                hover:shadow-md
                transition-all
                duration-200
              "
            >
              <CheckCircle size={17} />
              Verify Report
            </button>
          )}

          {/* DELETE */}
          <button
            onClick={deleteReport}
            className="
              flex-1
              flex
              justify-center
              items-center
              gap-2
              bg-slate-100
              hover:bg-red-50
              text-slate-600
              hover:text-red-600
              border
              border-slate-200
              hover:border-red-200
              py-2.5
              px-4
              rounded-xl
              font-semibold
              text-sm
              transition-all
              duration-200
            "
          >
            <Trash2 size={17} />
            Delete Report
          </button>

        </div>

      </div>
    </div>
  );
}

export default ReportCard;