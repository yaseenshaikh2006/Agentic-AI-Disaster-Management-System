import { Link } from "react-router-dom";
import {
  ArrowRight,
  Map,
  ShieldCheck,
  Radio,
  Activity,
  AlertTriangle,
} from "lucide-react";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#050b1f] text-white">

      {/* Background */}

      <div className="absolute inset-0 pointer-events-none">

        <div className="absolute top-[-180px] right-[-120px] w-[600px] h-[600px] rounded-full bg-blue-600/[0.08] blur-3xl" />

        <div className="absolute bottom-[-200px] left-[-150px] w-[500px] h-[500px] rounded-full bg-cyan-500/[0.05] blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

      </div>


      {/* Content */}

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">

        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-20 items-center min-h-[650px] py-20">

          {/* LEFT */}

          <div>

            {/* Label */}

            <div className="flex items-center gap-3 mb-7">

              <span className="w-10 h-px bg-cyan-400" />

              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
                Intelligent Emergency Management
              </span>

            </div>


            {/* Heading */}

            <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.04]">

              Smarter Technology

              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-300">
                for Disaster Response
              </span>

            </h1>


            {/* Description */}

            <p className="mt-7 max-w-2xl text-lg text-slate-400 leading-relaxed">
              An Agentic AI based disaster management platform designed to
              predict risks, strengthen emergency communication, identify
              safe zones and coordinate disaster response.
            </p>


            {/* Buttons */}

            <div className="flex flex-wrap gap-4 mt-9">

              <Link
                to="/report"
                className="
                  group
                  inline-flex
                  items-center
                  gap-2
                  px-6
                  py-3.5
                  rounded-lg
                  bg-blue-600
                  hover:bg-blue-500
                  text-white
                  font-semibold
                  transition
                  shadow-lg
                  shadow-blue-600/20
                "
              >
                Report a Disaster

                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition"
                />
              </Link>


              <Link
                to="/map"
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-6
                  py-3.5
                  rounded-lg
                  border
                  border-slate-700
                  hover:border-cyan-500/50
                  hover:bg-slate-900/60
                  text-slate-200
                  font-semibold
                  transition
                "
              >
                <Map size={18} />

                Explore Disaster Map
              </Link>

            </div>


            {/* Capabilities */}

            <div className="mt-10 pt-6 border-t border-slate-800/80">

              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-600 mb-4">
                Core Capabilities
              </p>

              <div className="flex flex-wrap gap-x-8 gap-y-3">

                <Capability
                  icon={Activity}
                  title="AI Prediction"
                  color="text-blue-400"
                />

                <Capability
                  icon={Radio}
                  title="BLE Mesh"
                  color="text-cyan-400"
                />

                <Capability
                  icon={ShieldCheck}
                  title="Safe Zones"
                  color="text-emerald-400"
                />

              </div>

            </div>

          </div>


          {/* RIGHT — MINIMAL VISUAL */}

          <div className="hidden lg:flex justify-center">

            <div className="relative w-[390px] h-[390px]">

              {/* Outer ring */}

              <div className="absolute inset-8 rounded-full border border-cyan-400/10" />

              <div className="absolute inset-16 rounded-full border border-blue-400/10" />

              {/* Glow */}

              <div className="absolute inset-[100px] rounded-full bg-cyan-400/[0.06] blur-2xl" />


              {/* Center */}

              <div className="
                absolute
                inset-[105px]
                rounded-full
                border
                border-cyan-400/30
                bg-slate-900/70
                backdrop-blur-sm
                flex
                flex-col
                items-center
                justify-center
                shadow-2xl
                shadow-cyan-500/10
              ">

                <ShieldCheck
                  size={52}
                  strokeWidth={1.4}
                  className="text-cyan-400"
                />

                <p className="mt-4 text-sm font-semibold text-white">
                  Disaster Response
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  AI-powered platform
                </p>

              </div>


              {/* Floating indicators */}

              <div className="absolute top-10 right-2 flex items-center gap-2 text-xs text-slate-400">

                <span className="w-2 h-2 rounded-full bg-emerald-400" />

                Connected

              </div>


              <div className="absolute bottom-12 left-0 flex items-center gap-2 text-xs text-slate-400">

                <Radio
                  size={15}
                  className="text-cyan-400"
                />

                BLE Network

              </div>


              <div className="absolute bottom-24 right-0 flex items-center gap-2 text-xs text-slate-400">

                <AlertTriangle
                  size={15}
                  className="text-amber-400"
                />

                Risk Detection

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}


function Capability({ icon: Icon, title, color }) {
  return (
    <div className="flex items-center gap-2">

      <Icon
        size={17}
        className={color}
      />

      <span className="text-sm text-slate-400">
        {title}
      </span>

    </div>
  );
}


export default Hero;