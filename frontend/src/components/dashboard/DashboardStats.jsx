import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import {
  FileWarning,
  Clock3,
  CheckCircle,
  ShieldAlert,
  TrendingUp,
} from "lucide-react";

function DashboardStats() {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    verified: 0,
    critical: 0,
  });

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "disasterReports"),
      (snapshot) => {
        const reports = snapshot.docs.map((doc) => doc.data());

        setStats({
          total: reports.length,
          pending: reports.filter(
            (r) => r.status === "Pending"
          ).length,
          verified: reports.filter(
            (r) => r.status === "Verified"
          ).length,
          critical: reports.filter(
            (r) => r.severity === "Critical"
          ).length,
        });
      }
    );

    return () => unsubscribe();
  }, []);

  const cards = [
    {
      title: "Total Reports",
      value: stats.total,
      icon: <FileWarning size={32} />,
      color: "from-blue-500 to-blue-700",
      text: "All disaster reports",
    },
    {
      title: "Pending",
      value: stats.pending,
      icon: <Clock3 size={32} />,
      color: "from-yellow-400 to-orange-500",
      text: "Waiting for verification",
    },
    {
      title: "Verified",
      value: stats.verified,
      icon: <CheckCircle size={32} />,
      color: "from-green-500 to-emerald-700",
      text: "Successfully verified",
    },
    {
      title: "Critical",
      value: stats.critical,
      icon: <ShieldAlert size={32} />,
      color: "from-red-500 to-red-700",
      text: "Need immediate action",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

      {cards.map((card, index) => (
        <div
          key={index}
          className={`bg-gradient-to-r ${card.color} rounded-3xl p-6 text-white shadow-xl hover:scale-105 transition duration-300`}
        >
          <div className="flex justify-between items-center">

            <div>
              <p className="text-sm opacity-90">
                {card.title}
              </p>

              <h2 className="text-5xl font-bold mt-3">
                {card.value}
              </h2>

              <p className="text-sm mt-3 opacity-90">
                {card.text}
              </p>
            </div>

            <div className="bg-white/20 p-4 rounded-2xl">
              {card.icon}
            </div>

          </div>

          <div className="flex items-center gap-2 mt-5 text-sm">
            <TrendingUp size={16} />
            <span>Live Firestore Data</span>
          </div>

        </div>
      ))}

    </div>
  );
}

export default DashboardStats;