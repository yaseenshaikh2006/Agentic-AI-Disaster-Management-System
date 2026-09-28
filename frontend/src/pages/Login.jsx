import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { ShieldCheck, ShieldAlert, ArrowLeft, Lock, Mail, Loader2 } from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter both officer email and security credential.");
      return;
    }

    try {
      setLoading(true);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      const user = userCredential.user;

      // Fetch user profile or role from Firestore
      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          localStorage.setItem(
            "user",
            JSON.stringify({
              uid: user.uid,
              ...userDoc.data(),
            })
          );
        } else {
          localStorage.setItem(
            "user",
            JSON.stringify({
              uid: user.uid,
              email: user.email,
              role: "Officer",
            })
          );
        }
      } catch (docErr) {
        console.warn("Could not retrieve user document:", docErr.message);
      }

      alert("Officer Authentication Verified. Accessing Command Center.");
      navigate("/government", { replace: true });
    } catch (error) {
      console.error("Authentication error:", error);

      if (error.code === "auth/invalid-credential" || error.code === "auth/wrong-password") {
        alert("Authentication failed: Invalid officer credentials.");
      } else if (error.code === "auth/user-not-found") {
        alert("No registered responder profile found with this email.");
      } else if (error.code === "auth/invalid-email") {
        alert("Invalid email format.");
      } else {
        alert(error.message || "Failed to sign in.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] flex flex-col items-center justify-center px-4 py-8 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-950/20 via-transparent to-transparent pointer-events-none" />

      <div className="w-full max-w-md bg-[#0d1424] rounded-2xl shadow-2xl p-8 border border-slate-800 relative z-10">
        
        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-950/40 border border-orange-800/60 text-xs font-semibold text-orange-400 mb-3">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            EOC SECURE ACCESS NODE
          </div>

          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center justify-center gap-2">
            <span className="text-orange-500">AntiCalamity</span>
          </h1>
          <p className="text-slate-400 text-xs mt-1 uppercase tracking-wider font-mono">
            Emergency Operations & Command Portal
          </p>
        </div>

        {/* Access Notice */}
        <div className="mb-6 border-b border-slate-800 pb-5">
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <ShieldCheck size={18} className="text-orange-500" />
            Authorized Responder Login
          </h2>
          <p className="text-slate-400 text-xs mt-1 leading-relaxed">
            Restricted to EOC controllers, field logistics directors, and municipal disaster command units.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-slate-300 text-xs font-semibold mb-1.5 uppercase tracking-wide">
              Official Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                <Mail size={16} />
              </span>
              <input
                type="email"
                placeholder="officer@eoc.gov.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900/90 text-white text-sm border border-slate-700/80 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 placeholder-slate-500 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 text-xs font-semibold mb-1.5 uppercase tracking-wide">
              Security Credential
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                <Lock size={16} />
              </span>
              <input
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900/90 text-white text-sm border border-slate-700/80 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 placeholder-slate-500 transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 disabled:opacity-50 text-white py-3 rounded-xl text-sm font-semibold shadow-lg shadow-orange-950/50 transition flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Authenticating Clearance...</span>
              </>
            ) : (
              <span>Verify & Access Console</span>
            )}
          </button>
        </form>

        {/* Public Citizen Emergency Bypass */}
        <div className="mt-6 pt-5 border-t border-slate-800 text-center space-y-3">
          <p className="text-xs text-slate-400">
            Civilian reporting an active disaster?
          </p>
          <button
            type="button"
            onClick={() => navigate("/report")}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-400 hover:text-amber-300 transition underline underline-offset-4 cursor-pointer"
          >
            <ShieldAlert size={14} />
            Bypass Authentication: Submit Citizen Incident Report
          </button>
        </div>

        {/* Bottom Security Info Card */}
        <div className="mt-6 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-start gap-3">
          <div className="p-1.5 rounded-lg bg-blue-950/60 text-blue-400 border border-blue-900/60 mt-0.5">
            <ShieldCheck size={14} />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-200">
              Role-Based Incident Encryption
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5 leading-normal">
              Public submissions are open to ensure survival speed. Command allocation requires verified clearance.
            </p>
          </div>
        </div>

      </div>

      <div className="mt-4 text-center">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition"
        >
          <ArrowLeft size={13} />
          Back to Live Operations Home
        </Link>
      </div>
    </div>
  );
}

export default Login;
