import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { Search, BellRing } from "lucide-react";
import ReportCard from "./ReportCard";

function ReportList({ selectedReportId }) {
  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("Newest");

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

  // Scroll to selected report
  useEffect(() => {
    if (!selectedReportId) return;

    const timer = setTimeout(() => {
      const element = document.getElementById(
        `report-${selectedReportId}`
      );

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        element.classList.add(
          "ring-4",
          "ring-blue-400",
          "ring-offset-2"
        );

        setTimeout(() => {
          element.classList.remove(
            "ring-4",
            "ring-blue-400",
            "ring-offset-2"
          );
        }, 3000);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [selectedReportId, reports]);

  const filteredReports = reports.filter((report) => {
    const disaster =
      report.disasterType?.toLowerCase() || "";

    const location =
      report.location?.toLowerCase() || "";

    const description =
      report.description?.toLowerCase() || "";

    const query = search.toLowerCase();

    const matchesSearch =
      disaster.includes(query) ||
      location.includes(query) ||
      description.includes(query);

    const matchesStatus =
      statusFilter === "All" ||
      report.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const sortedReports = [...filteredReports].sort((a, b) => {
    const timeA = a.createdAt?.seconds || 0;
    const timeB = b.createdAt?.seconds || 0;

    return sortOrder === "Newest"
      ? timeB - timeA
      : timeA - timeB;
  });

  return (
    <div className="mt-8">

      {/* Header */}

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-5">

        <div>
          <div className="flex items-center gap-2">

            <h2 className="text-2xl font-bold text-slate-800">
              📋 Live Disaster Reports
            </h2>

            {selectedReportId && (
              <BellRing
                size={18}
                className="text-blue-600"
              />
            )}

          </div>

          <p className="text-sm text-gray-500 mt-1">
            Monitor and manage reported disasters
          </p>
        </div>

        {/* Controls */}

        <div className="flex flex-col sm:flex-row gap-3">

          {/* Search */}

          <div className="relative w-full sm:w-72">

            <Search
              size={17}
              className="absolute left-3 top-3 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search disaster or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white"
            />

          </div>

          {/* Status */}

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white outline-none"
          >
            <option value="All">All Reports</option>
            <option value="Pending">Pending</option>
            <option value="Verified">Verified</option>
          </select>

          {/* Sort */}

          <select
            value={sortOrder}
            onChange={(e) =>
              setSortOrder(e.target.value)
            }
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white outline-none"
          >
            <option value="Newest">Newest First</option>
            <option value="Oldest">Oldest First</option>
          </select>

        </div>

      </div>

      {/* Reports */}

      {sortedReports.length === 0 ? (

        <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-500">
          No matching reports found.
        </div>

      ) : (

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

          {sortedReports.map((report) => (

            <div
              key={report.id}
              id={`report-${report.id}`}
              className="rounded-2xl transition-all duration-300"
            >

              <ReportCard
                report={report}
              />

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default ReportList;