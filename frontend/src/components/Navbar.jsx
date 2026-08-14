import { NavLink, Link } from "react-router-dom";
import {
  ShieldCheck,
  Map,
  AlertTriangle,
  Package,
  Building2,
  LogIn,
} from "lucide-react";

function Navbar() {
  const navItems = [
    {
      name: "Home",
      path: "/",
      icon: null,
    },
    {
      name: "Disaster Map",
      path: "/map",
      icon: Map,
    },
    {
      name: "Report",
      path: "/report",
      icon: AlertTriangle,
    },
    {
      name: "Relief",
      path: "/relief",
      icon: Package,
    },
    {
      name: "Government",
      path: "/government",
      icon: Building2,
    },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#050b1f]/95 backdrop-blur-xl border-b border-slate-800/80">

      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <div className="h-[76px] flex items-center justify-between">

          {/* Logo */}

          <Link
            to="/"
            className="flex items-center gap-3 group shrink-0"
          >

            <div
              className="
                w-10
                h-10
                rounded-xl
                bg-blue-600
                flex
                items-center
                justify-center
                shadow-lg
                shadow-blue-600/20
                group-hover:bg-blue-500
                transition
              "
            >
              <ShieldCheck
                size={22}
                strokeWidth={2}
                className="text-white"
              />
            </div>

            <div className="leading-none">

              <h1 className="text-white text-lg font-bold tracking-tight">
                Disaster AI
              </h1>

              <p className="text-[9px] text-slate-500 uppercase tracking-[0.2em] mt-1">
                Emergency Management
              </p>

            </div>

          </Link>


          {/* Navigation */}

          <div className="hidden md:flex items-center gap-1">

            {navItems.map((item) => {

              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `
                    group
                    flex
                    items-center
                    gap-2
                    px-3.5
                    py-2
                    rounded-lg
                    text-sm
                    font-medium
                    transition-all
                    ${
                      isActive
                        ? "text-white bg-slate-800/80"
                        : "text-slate-400 hover:text-white hover:bg-slate-900/70"
                    }
                    `
                  }
                >

                  {Icon && (
                    <Icon
                      size={15}
                      strokeWidth={1.8}
                      className="text-slate-500 group-hover:text-cyan-400 transition"
                    />
                  )}

                  {item.name}

                </NavLink>
              );

            })}


            {/* Divider */}

            <div className="h-6 w-px bg-slate-800 mx-3" />


            {/* Login */}

            <Link
              to="/login"
              className="
                flex
                items-center
                gap-2
                px-4
                py-2
                rounded-lg
                bg-blue-600
                hover:bg-blue-500
                text-white
                text-sm
                font-semibold
                transition
                shadow-md
                shadow-blue-600/20
              "
            >

              <LogIn size={15} />

              Login

            </Link>

          </div>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;