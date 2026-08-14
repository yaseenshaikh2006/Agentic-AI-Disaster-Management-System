import {
  Users,
  FileWarning,
  HeartHandshake,
  Activity,
} from "lucide-react";

function Stats() {
  const stats = [
    {
      number: "10,000+",
      label: "Citizens Protected",
      icon: Users,
      description: "People supported through emergency response",
    },
    {
      number: "500+",
      label: "Disaster Reports",
      icon: FileWarning,
      description: "Incidents monitored across locations",
    },
    {
      number: "250+",
      label: "Relief Camps",
      icon: HeartHandshake,
      description: "Emergency relief operations coordinated",
    },
    {
      number: "24×7",
      label: "AI Monitoring",
      icon: Activity,
      description: "Continuous disaster intelligence",
    },
  ];

  return (
    <section className="relative bg-[#050b1f] text-white py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Section Header */}

        <div className="text-center mb-10">

          <p className="text-xs uppercase tracking-[0.2em] text-cyan-400 font-semibold">
            System Overview
          </p>

          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            Live Impact Statistics
          </h2>

          <p className="text-slate-500 mt-3 max-w-2xl mx-auto text-sm">
            Real-time operational metrics from the disaster management
            platform.
          </p>

        </div>


        {/* Statistics */}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">

          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="group relative bg-slate-900/70 border border-slate-800 hover:border-cyan-400/40 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1"
              >

                {/* Icon */}

                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center mb-5 group-hover:bg-cyan-400/10 transition">
                  <Icon
                    size={20}
                    className="text-cyan-400"
                  />
                </div>


                {/* Number */}

                <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                  {item.number}
                </h3>


                {/* Label */}

                <p className="text-sm font-semibold text-slate-200 mt-2">
                  {item.label}
                </p>


                {/* Description */}

                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  {item.description}
                </p>


                {/* Bottom Accent */}

                <div className="absolute bottom-0 left-5 right-5 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent opacity-0 group-hover:opacity-100 transition" />

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}

export default Stats;