import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">

      <div className="w-full max-w-lg bg-slate-900 rounded-2xl shadow-2xl p-8">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-cyan-400">
            🌍 DisasterAI
          </h1>

          <p className="text-gray-400 mt-2">
            Create Your Account
          </p>
        </div>

        <form className="space-y-5">

          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-cyan-400"
          />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-cyan-400"
          />

          <input
            type="tel"
            placeholder="Mobile Number"
            className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-cyan-400"
          />

          <select className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-700">
            <option>Citizen</option>
            <option>Government Officer</option>
            <option>NGO</option>
            <option>Volunteer</option>
          </select>

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-cyan-400"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-cyan-400"
          />

          <button
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-lg font-semibold transition"
          >
            Create Account
          </button>

        </form>

        <p className="text-center text-gray-400 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-cyan-400 hover:underline"
          >
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Register;