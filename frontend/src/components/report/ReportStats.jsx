import {
  TriangleAlert,
  ShieldCheck,
  Building2,
  Clock3,
} from "lucide-react";

function ReportStats() {
  const stats = [
    {
      title: "Active Reports",
      value: "245",
      icon: <TriangleAlert size={30} />,
      color: "bg-red-500",
    },
    {
      title: "Verified Alerts",
      value: "198",
      icon: <ShieldCheck size={30} />,
      color: "bg-green-500",
    },
    {
      title: "Relief Camps",
      value: "34",
      icon: <Building2 size={30} />,
      color: "bg-blue-500",
    },
    {
      title: "Avg Response",
      value: "12 min",
      icon: <Clock3 size={30} />,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">

      {stats.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition duration-300"
        >
          <div
            className={`w-14 h-14 rounded-xl ${item.color} flex items-center justify-center text-white`}
          >
            {item.icon}
          </div>

          <h2 className="text-3xl font-bold mt-5">
            {item.value}
          </h2>

          <p className="text-gray-500 mt-2">
            {item.title}
          </p>
        </div>
      ))}

    </div>
  );
}

export default ReportStats;