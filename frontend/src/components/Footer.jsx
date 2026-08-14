import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Map,
  AlertTriangle,
  Package,
  Building2,
  Mail,
} from "lucide-react";

function Footer() {
  return (
    <footer className="bg-[#030817] border-t border-slate-800/80 text-white">

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}

          <div className="lg:col-span-2">

            <div className="flex items-center gap-3 mb-5">

              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
                <ShieldCheck size={21} />
              </div>

              <div>
                <h2 className="text-lg font-bold">
                  Disaster AI
                </h2>

                <p className="text-[9px] text-slate-500 uppercase tracking-[0.2em]">
                  Emergency Management
                </p>
              </div>

            </div>

            <p className="max-w-md text-sm leading-6 text-slate-400">
              An Agentic AI based disaster management platform designed
              to support prediction, emergency communication, safe-zone
              identification and coordinated disaster response.
            </p>

          </div>


          {/* Platform */}

          <div>

            <h3 className="text-sm font-semibold text-white mb-5">
              Platform
            </h3>

            <div className="space-y-3">

              <FooterLink
                to="/map"
                icon={Map}
                label="Disaster Map"
              />

              <FooterLink
                to="/report"
                icon={AlertTriangle}
                label="Report Disaster"
              />

              <FooterLink
                to="/relief"
                icon={Package}
                label="Relief Distribution"
              />

              <FooterLink
                to="/government"
                icon={Building2}
                label="Government Center"
              />

            </div>

          </div>


          {/* Contact */}

          <div>

            <h3 className="text-sm font-semibold text-white mb-5">
              Contact
            </h3>

            <div className="flex items-start gap-3 text-sm text-slate-400">

              <Mail
                size={17}
                className="text-cyan-400 mt-0.5 shrink-0"
              />

              <div>

                <p>support@disasterai.com</p>

                <p className="mt-2 text-slate-500">
                  Emergency support available
                </p>

              </div>

            </div>

          </div>

        </div>


        {/* Bottom */}

        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">

          <p className="text-xs text-slate-500">
            © 2026 Disaster AI. All rights reserved.
          </p>

          <p className="text-xs text-slate-600">
            Intelligent Emergency Management Platform
          </p>

        </div>

      </div>

    </footer>
  );
}


function FooterLink({ to, icon: Icon, label }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-2.5 text-sm text-slate-400 hover:text-cyan-400 transition"
    >
      <Icon size={15} />
      {label}
    </Link>
  );
}


export default Footer;