function Features() {
  const features = [
    {
      icon: "🤖",
      title: "AI Prediction",
      description:
        "Predict disasters using AI and provide early warnings to citizens.",
    },
    {
      icon: "📡",
      title: "BLE Mesh Communication",
      description:
        "Enable offline communication when internet services are unavailable.",
    },
    {
      icon: "🗺️",
      title: "Safe Zone Navigation",
      description:
        "Guide users to the nearest safe shelters using live maps.",
    },
    {
      icon: "🚨",
      title: "Emergency SOS",
      description:
        "Instantly send SOS alerts with your current location.",
    },
    {
      icon: "📦",
      title: "Relief Distribution",
      description:
        "Track relief materials with transparency and reduce corruption.",
    },
    {
      icon: "🏛️",
      title: "Government Dashboard",
      description:
        "Monitor damage assessment and rehabilitation progress.",
    },
  ];

  return (
    <section className="bg-gray-100 py-20">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-12">
          Key Features
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-8 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
            >
              <div className="text-5xl mb-4">
                {feature.icon}
              </div>

              <h3 className="text-2xl font-bold mb-4">
                {feature.title}
              </h3>

              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Features;