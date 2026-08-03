import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { Search } from "lucide-react";
import ReportCard from "./ReportCard";

function ReportList() {
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

  const filteredReports = reports.filter((report) => {
    const disaster = report.disasterType?.toLowerCase() || "";
    const location = report.location?.toLowerCase() || "";
    const query = search.toLowerCase();

    const matchesSearch =
      disaster.includes(query) ||
      location.includes(query);

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

      <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-6">

        <h2 className="text-3xl font-bold">
          📋 Live Disaster Reports
        </h2>

        <div className="flex flex-col md:flex-row gap-4 w-full lg:w-auto">

          {/* Search */}

          <div className="relative md:w-80">

            <Search
              size={18}
              className="absolute left-3 top-3.5 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search disaster or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border rounded-xl pl-10 pr-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />

          </div>

          {/* Status Filter */}

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="All">All Reports</option>
            <option value="Pending">Pending</option>
            <option value="Verified">Verified</option>
          </select>

          {/* Sort */}

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="Newest">Newest First</option>
            <option value="Oldest">Oldest First</option>
          </select>

        </div>

      </div>

      <div className="grid gap-6">

        {sortedReports.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-10 text-center text-gray-500">
            No matching reports found.
          </div>
        ) : (
          sortedReports.map((report) => (
            <ReportCard
              key={report.id}
              report={report}
            />
          ))
        )}

      </div>

    </div>
  );
}

export default ReportList;