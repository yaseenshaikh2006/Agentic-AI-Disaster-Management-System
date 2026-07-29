function Features() {

  const features = [
    "🤖 AI Prediction & Prevention",
    "📡 BLE Mesh Communication",
    "🗺 Safe Zone Navigation",
    "🚨 Emergency SOS",
    "📦 Relief Distribution",
    "🏛 Government Dashboard"
  ];

  return (
    <section className="py-20 bg-gray-100">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-12">
          Key Features
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {features.map((item, index) => (

            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow hover:shadow-xl transition"
            >
              <h3 className="text-xl font-semibold">
                {item}
              </h3>
            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Features;