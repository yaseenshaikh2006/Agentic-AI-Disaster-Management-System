import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import {
  FileWarning,
  Clock3,
  CheckCircle,
  ShieldAlert,
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
      icon: <FileWarning size={30} />,
      color: "bg-blue-500",
    },
    {
      title: "Pending",
      value: stats.pending,
      icon: <Clock3 size={30} />,
      color: "bg-yellow-500",
    },
    {
      title: "Verified",
      value: stats.verified,
      icon: <CheckCircle size={30} />,
      color: "bg-green-500",
    },
    {
      title: "Critical",
      value: stats.critical,
      icon: <ShieldAlert size={30} />,
      color: "bg-red-500",
    },
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl shadow-lg p-6 flex justify-between items-center"
        >
          <div>
            <p className="text-gray-500">{card.title}</p>
            <h2 className="text-4xl font-bold mt-2">
              {card.value}
            </h2>
          </div>

          <div className={`${card.color} p-4 rounded-2xl text-white`}>
            {card.icon}
          </div>
        </div>
      ))}
    </div>
  );
}

export default DashboardStats;