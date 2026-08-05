import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, onSnapshot } from "firebase/firestore";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

function DashboardCharts() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "disasterReports"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data());
        setReports(data);
      }
    );

    return () => unsubscribe();
  }, []);

  const disasterData = [
    {
      name: "Flood",
      value: reports.filter((r) => r.disasterType === "Flood").length,
    },
    {
      name: "Fire",
      value: reports.filter((r) => r.disasterType === "Fire").length,
    },
    {
      name: "Earthquake",
      value: reports.filter((r) => r.disasterType === "Earthquake").length,
    },
    {
      name: "Cyclone",
      value: reports.filter((r) => r.disasterType === "Cyclone").length,
    },
    {
      name: "Landslide",
      value: reports.filter((r) => r.disasterType === "Landslide").length,
    },
  ];

  const severityData = [
    {
      severity: "Low",
      reports: reports.filter((r) => r.severity === "Low").length,
    },
    {
      severity: "Medium",
      reports: reports.filter((r) => r.severity === "Medium").length,
    },
    {
      severity: "High",
      reports: reports.filter((r) => r.severity === "High").length,
    },
    {
      severity: "Critical",
      reports: reports.filter((r) => r.severity === "Critical").length,
    },
  ];

  const COLORS = [
    "#3B82F6",
    "#EF4444",
    "#F59E0B",
    "#8B5CF6",
    "#10B981",
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">

      {/* Pie Chart */}

      <div className="bg-white rounded-2xl shadow-lg p-4">

        <h2 className="text-lg font-semibold text-center mb-3">
          🥧 Disaster Types
        </h2>

        <ResponsiveContainer width="100%" height={220}>
          <PieChart>

            <Pie
              data={disasterData}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={70}
              label
            >
              {disasterData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />

          </PieChart>
        </ResponsiveContainer>

      </div>

      {/* Bar Chart */}

      <div className="bg-white rounded-2xl shadow-lg p-4">

        <h2 className="text-lg font-semibold text-center mb-3">
          📊 Severity Distribution
        </h2>

        <ResponsiveContainer width="100%" height={220}>

          <BarChart data={severityData}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="severity" />

            <YAxis allowDecimals={false} />

            <Tooltip />

            <Bar
              dataKey="reports"
              fill="#2563EB"
              radius={[6, 6, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default DashboardCharts;