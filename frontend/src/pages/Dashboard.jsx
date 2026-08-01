function Dashboard() {
  const stats = [
    {
      title: "Active Alerts",
      value: "12",
      icon: "🚨",
      color: "bg-red-500",
    },
    {
      title: "Safe Shelters",
      value: "48",
      icon: "🏕️",
      color: "bg-green-500",
    },
    {
      title: "Volunteers",
      value: "325",
      icon: "👥",
      color: "bg-blue-500",
    },
    {
      title: "Relief Camps",
      value: "18",
      icon: "📦",
      color: "bg-yellow-500",
    },
  ];

  const actions = [
    {
      title: "Emergency SOS",
      icon: "🚨",
      color: "bg-red-600",
    },
    {
      title: "Disaster Map",
      icon: "🗺️",
      color: "bg-blue-600",
    },
    {
      title: "Report Disaster",
      icon: "📢",
      color: "bg-orange-500",
    },
    {
      title: "Relief Distribution",
      icon: "📦",
      color: "bg-green-600",
    },
    {
      title: "AI Assistant",
      icon: "🤖",
      color: "bg-purple-600",
    },
    {
      title: "BLE Mesh",
      icon: "📡",
      color: "bg-cyan-600",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Header */}

      <div className="bg-slate-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">

          <div>
            <h1 className="text-4xl font-bold">
              🌍 DisasterAI Dashboard
            </h1>

            <p className="text-gray-300 mt-2">
              Agentic AI Based Disaster Management System
            </p>
          </div>

          <div className="text-right">
            <p className="font-semibold">
              Welcome
            </p>

            <p className="text-cyan-400">
              Citizen
            </p>
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">

        {/* Statistics */}

        <h2 className="text-3xl font-bold mb-6">
          Live Statistics
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">

          {stats.map((item, index) => (
            <div
              key={index}
              className={`${item.color} text-white rounded-xl p-6 shadow-lg`}
            >
              <div className="text-5xl">
                {item.icon}
              </div>

              <h3 className="text-4xl font-bold mt-4">
                {item.value}
              </h3>

              <p className="mt-2 text-lg">
                {item.title}
              </p>
            </div>
          ))}

        </div>

        {/* Quick Actions */}

        <h2 className="text-3xl font-bold mb-6">
          Quick Actions
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">

          {actions.map((item, index) => (
            <div
              key={index}
              className={`${item.color} text-white rounded-xl p-8 shadow-lg hover:scale-105 transition duration-300 cursor-pointer`}
            >
              <div className="text-5xl">
                {item.icon}
              </div>

              <h3 className="text-2xl font-bold mt-5">
                {item.title}
              </h3>
            </div>
          ))}

        </div>

        {/* Bottom Section */}

        <div className="grid lg:grid-cols-2 gap-8">

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-5">
              🚨 Recent Alerts
            </h2>

            <ul className="space-y-4">
              <li className="border-b pb-3">
                🔴 Flood Alert - Mumbai
              </li>

              <li className="border-b pb-3">
                🟠 Fire Alert - Pune
              </li>

              <li>
                🟡 Landslide Warning - Himachal Pradesh
              </li>
            </ul>

          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-5">
              🤖 AI Assistant
            </h2>

            <p className="text-gray-600">
              AI Assistant will provide disaster guidance,
              prediction, emergency instructions and
              rehabilitation recommendations.
            </p>

            <button className="mt-6 bg-cyan-500 text-white px-6 py-3 rounded-lg hover:bg-cyan-600">
              Open AI Assistant
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;