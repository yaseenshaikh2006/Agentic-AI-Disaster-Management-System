import {
  BrainCircuit,
  RadioTower,
  MapPinned,
  Siren,
  PackageCheck,
  Landmark,
  ArrowUpRight,
} from "lucide-react";

function Features() {
  const features = [
    {
      icon: BrainCircuit,
      title: "AI Disaster Prediction",
      description:
        "Analyze disaster patterns and provide early warnings to support faster emergency response.",
      tag: "AI INTELLIGENCE",
    },
    {
      icon: RadioTower,
      title: "BLE Mesh Communication",
      description:
        "Maintain emergency communication between nearby devices even when internet connectivity is unavailable.",
      tag: "OFFLINE NETWORK",
    },
    {
      icon: MapPinned,
      title: "Safe Zone Navigation",
      description:
        "Identify safer locations and guide citizens toward shelters using real-time disaster information.",
      tag: "LIVE MAPPING",
    },
    {
      icon: Siren,
      title: "Emergency SOS",
      description:
        "Send emergency alerts with location information to help authorities coordinate rapid assistance.",
      tag: "EMERGENCY RESPONSE",
    },
    {
      icon: PackageCheck,
      title: "Relief Distribution",
      description:
        "Track relief materials and distribution activities with greater transparency and accountability.",
      tag: "TRANSPARENT RELIEF",
    },
    {
      icon: Landmark,
      title: "Government Command Center",
      description:
        "Monitor incidents, verify reports, assess damage and coordinate rehabilitation operations.",
      tag: "GOVERNMENT OPERATIONS",
    },
  ];

  return (
    <section className="relative bg-slate-950 text-white py-24 overflow-hidden">

      {/* Background Glow */}

      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Section Header */}

        <div className="text-center max-w-3xl mx-auto mb-16">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 text-cyan-400 text-xs font-semibold tracking-widest mb-5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            PLATFORM CAPABILITIES
          </div>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Built for{" "}
            <span className="text-cyan-400">
              Intelligent Disaster Response
            </span>
          </h2>

          <p className="mt-5 text-slate-400 text-lg leading-relaxed">
            A unified emergency management platform combining AI,
            real-time intelligence, offline communication and coordinated
            response operations.
          </p>

        </div>

        {/* Feature Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="group relative bg-slate-900/70 border border-slate-800 rounded-2xl p-7 hover:border-cyan-400/40 hover:bg-slate-900 transition-all duration-300"
              >

                {/* Top Line */}

                <div className="absolute top-0 left-7 right-7 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                {/* Icon */}

                <div className="flex items-start justify-between mb-7">

                  <div className="w-12 h-12 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center group-hover:bg-cyan-400/15 transition">
                    <Icon
                      size={24}
                      className="text-cyan-400"
                      strokeWidth={1.8}
                    />
                  </div>

                  <ArrowUpRight
                    size={20}
                    className="text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
                  />

                </div>

                {/* Tag */}

                <p className="text-[10px] font-semibold tracking-[0.18em] text-cyan-400/80 mb-2">
                  {feature.tag}
                </p>

                {/* Title */}

                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>

                {/* Description */}

                <p className="text-sm text-slate-400 leading-6">
                  {feature.description}
                </p>

                {/* Bottom Indicator */}

                <div className="mt-7 flex items-center gap-2 text-xs text-slate-500 group-hover:text-slate-300 transition">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                  Integrated platform capability
                </div>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}

export default Features;