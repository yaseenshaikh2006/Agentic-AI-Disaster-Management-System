function Hero() {
  return (
    <section className="bg-slate-950 text-white min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-6xl font-bold">
          Agentic AI Based
          <span className="text-cyan-400"> Disaster </span>
          Management System
        </h1>

        <p className="mt-6 text-xl text-gray-300">
          AI Powered Disaster Prediction, BLE Mesh Communication,
          Safe Zones and Relief Distribution.
        </p>

        <div className="mt-8 flex gap-4">
          <button className="bg-cyan-500 px-6 py-3 rounded-lg">
            Get Started
          </button>

          <button className="border border-white px-6 py-3 rounded-lg">
            Explore Map
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;