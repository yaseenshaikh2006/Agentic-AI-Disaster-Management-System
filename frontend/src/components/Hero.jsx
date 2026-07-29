function Hero() {
  return (
    <section className="bg-slate-950 text-white min-h-[90vh] flex items-center">
      <div className="max-w-7xl mx-auto px-6">

        <h1 className="text-6xl font-bold leading-tight">
          Agentic AI Based
          <br />
          Disaster Management System
        </h1>

        <p className="mt-6 text-xl text-gray-300 max-w-3xl">
          An intelligent disaster response platform featuring AI prediction,
          BLE Mesh communication, safe zone navigation, transparent relief
          distribution, and government rehabilitation support.
        </p>

        <div className="mt-8 flex gap-5">
          <button className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-lg font-semibold">
            Get Started
          </button>

          <button className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-black">
            Live Disaster Map
          </button>
        </div>

      </div>
    </section>
  );
}

export default Hero;