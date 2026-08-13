import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, onSnapshot } from "firebase/firestore";

import {
  FileText,
  Clock3,
  CheckCircle2,
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
      description: "All reported incidents",
      icon: FileText,
      iconBg: "bg-slate-100",
      iconColor: "text-slate-700",
    },
    {
      title: "Pending Review",
      value: stats.pending,
      description: "Awaiting verification",
      icon: Clock3,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
    },
    {
      title: "Verified Reports",
      value: stats.verified,
      description: "Successfully verified",
      icon: CheckCircle2,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      title: "Critical Incidents",
      value: stats.critical,
      description: "Require immediate action",
      icon: ShieldAlert,
      iconBg: "bg-red-50",
      iconColor: "text-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
          >

            <div className="flex items-start justify-between">

              <div>
                <p className="text-sm font-medium text-slate-500">
                  {card.title}
                </p>

                <p className="text-3xl font-bold text-slate-800 mt-2">
                  {card.value}
                </p>

                <p className="text-xs text-slate-400 mt-2">
                  {card.description}
                </p>
              </div>

              <div
                className={`w-11 h-11 rounded-lg ${card.iconBg} flex items-center justify-center`}
              >
                <Icon
                  size={21}
                  className={card.iconColor}
                />
              </div>

            </div>

          </div>
        );
      })}

    </div>
  );
}

export default DashboardStats;