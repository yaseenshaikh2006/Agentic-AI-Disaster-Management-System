function Stats() {
  const stats = [
    { number: "10,000+", label: "Citizens Protected" },
    { number: "500+", label: "Disaster Reports" },
    { number: "250+", label: "Relief Camps" },
    { number: "24×7", label: "AI Monitoring" },
  ];

  return (
    <section className="bg-slate-950 text-white py-20">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-14">
          Live Impact Statistics
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">

          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center hover:border-cyan-400 transition duration-300 shadow-lg"
            >
              <h3 className="text-4xl font-extrabold text-cyan-400 mb-3">
                {item.number}
              </h3>

              <p className="text-gray-300 text-lg">
                {item.label}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Stats;