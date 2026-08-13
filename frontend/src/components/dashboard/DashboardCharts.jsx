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

  const disasterTypes = [
    "Flood",
    "Fire",
    "Earthquake",
    "Cyclone",
    "Landslide",
  ];

  const severities = [
    "Low",
    "Medium",
    "High",
    "Critical",
  ];

  const disasterData = disasterTypes
    .map((type) => ({
      name: type,
      value: reports.filter(
        (report) => report.disasterType === type
      ).length,
    }))
    .filter((item) => item.value > 0);

  const severityData = severities.map((severity) => ({
    severity,
    reports: reports.filter(
      (report) => report.severity === severity
    ).length,
  }));

  const COLORS = [
    "#2563eb",
    "#ef4444",
    "#f59e0b",
    "#7c3aed",
    "#059669",
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

      {/* Disaster Types */}

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">

        <div className="flex items-center justify-between mb-4">

          <div>
            <h3 className="text-lg font-semibold text-slate-800">
              Disaster Types
            </h3>

            <p className="text-xs text-slate-500 mt-1">
              Distribution of reported incidents
            </p>
          </div>

          <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center">
            <span className="text-sm font-bold text-slate-600">
              DT
            </span>
          </div>

        </div>

        <div className="h-[280px]">

          {disasterData.length === 0 ? (
            <div className="h-full flex items-center justify-center text-sm text-slate-400">
              No disaster data available
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">

              <PieChart>

                <Pie
                  data={disasterData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="45%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={3}
                >
                  {disasterData.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip
                  contentStyle={{
                    borderRadius: "10px",
                    border: "1px solid #e2e8f0",
                    boxShadow:
                      "0 4px 12px rgba(0,0,0,0.08)",
                  }}
                />

              </PieChart>

            </ResponsiveContainer>
          )}

        </div>

        {/* Legend */}

        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mt-1">

          {disasterData.map((item, index) => (
            <div
              key={item.name}
              className="flex items-center gap-2 text-xs text-slate-600"
            >
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{
                  backgroundColor:
                    COLORS[index % COLORS.length],
                }}
              />

              {item.name}

              <span className="font-semibold">
                {item.value}
              </span>
            </div>
          ))}

        </div>

      </div>

      {/* Severity */}

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">

        <div className="flex items-center justify-between mb-4">

          <div>
            <h3 className="text-lg font-semibold text-slate-800">
              Severity Overview
            </h3>

            <p className="text-xs text-slate-500 mt-1">
              Incidents grouped by severity
            </p>
          </div>

          <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center">
            <span className="text-sm font-bold text-slate-600">
              SV
            </span>
          </div>

        </div>

        <div className="h-[280px]">

          <ResponsiveContainer width="100%" height="100%">

            <BarChart
              data={severityData}
              margin={{
                top: 10,
                right: 10,
                left: -15,
                bottom: 5,
              }}
            >

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e2e8f0"
              />

              <XAxis
                dataKey="severity"
                tick={{
                  fill: "#64748b",
                  fontSize: 12,
                }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                allowDecimals={false}
                tick={{
                  fill: "#64748b",
                  fontSize: 12,
                }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                contentStyle={{
                  borderRadius: "10px",
                  border: "1px solid #e2e8f0",
                  boxShadow:
                    "0 4px 12px rgba(0,0,0,0.08)",
                }}
              />

              <Bar
                dataKey="reports"
                fill="#334155"
                radius={[5, 5, 0, 0]}
                barSize={42}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
}

export default DashboardCharts;