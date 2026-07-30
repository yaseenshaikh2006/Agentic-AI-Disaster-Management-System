function Footer() {
  return (
    <footer className="bg-slate-950 text-white py-12">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">

        <div>
          <h2 className="text-2xl font-bold text-cyan-400">
            🌍 DisasterAI
          </h2>

          <p className="mt-4 text-gray-400">
            Agentic AI Based Disaster Management System
            for smarter prediction, response and recovery.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">
            Quick Links
          </h3>

          <ul className="space-y-2 text-gray-400">
            <li>Home</li>
            <li>Disaster Map</li>
            <li>Report Disaster</li>
            <li>Relief Distribution</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">
            Emergency
          </h3>

          <ul className="space-y-2 text-gray-400">
            <li>🚨 SOS Alert</li>
            <li>📍 Safe Zones</li>
            <li>📡 BLE Mesh</li>
            <li>🤖 AI Prediction</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">
            Contact
          </h3>

          <p className="text-gray-400">
            Email: support@disasterai.com
          </p>

          <p className="text-gray-400 mt-2">
            Emergency Helpline: 112
          </p>
        </div>

      </div>

      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500">
        © 2026 Agentic AI Based Disaster Management System. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;