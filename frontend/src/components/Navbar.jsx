import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-slate-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          🌍 DisasterAI
        </h1>

        <div className="flex gap-6">
          <Link to="/" className="hover:text-cyan-400">Home</Link>
          <Link to="/map" className="hover:text-cyan-400">Map</Link>
          <Link to="/report" className="hover:text-cyan-400">Report</Link>
          <Link to="/relief" className="hover:text-cyan-400">Relief</Link>
          <Link to="/government" className="hover:text-cyan-400">Government</Link>
          <Link to="/login" className="hover:text-cyan-400">Login</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;