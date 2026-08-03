import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import ReportCard from "./ReportCard";

function ReportList() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "disasterReports"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setReports(data);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-6">
        📋 Live Disaster Reports
      </h2>

      <div className="grid gap-6">
        {reports.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-8 text-center text-gray-500">
            No reports found.
          </div>
        ) : (
          reports.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))
        )}
      </div>
    </div>
  );
}

export default ReportList;