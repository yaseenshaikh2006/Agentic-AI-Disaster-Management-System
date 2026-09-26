import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { auth, db } from "../firebase";
import { ShieldCheck, ShieldAlert, ArrowLeft, Lock, Mail, Loader2 } from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // ================================
  // Handle Input Change
  // ================================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================================
  // Navigate According To Role
  // ================================
  const navigateByRole = (role) => {
    switch (role) {
      case "Government Officer":
        navigate("/government", { replace: true });
        break;

      case "NGO":
        navigate("/relief", { replace: true });
        break;

      case "Volunteer":
        navigate("/relief", { replace: true });
        break;

      case "Citizen":
      default:
        // Citizen goes directly to Report Disaster page
        navigate("/report", { replace: true });
        break;
    }
  };

  // ================================
  // Login Function
  // ================================
  const handleSubmit = async (e) => {
    e.preventDefault();

<<<<<<< HEAD
    if (!formData.email || !formData.password) {
      alert("Please enter email and password.");
=======
    if (!email || !password) {
      alert("Please enter both officer email and security credential.");
>>>>>>> 47e57e0 (Feat: Finalize AntiCalamity EOC access, route protection, and telemetry stress-test)
      return;
    }

    try {
      setLoading(true);

<<<<<<< HEAD
      // --------------------------------
      // 1. Firebase Authentication Login
      // --------------------------------
      const userCredential =
        await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

      const user = userCredential.user;

      // --------------------------------
      // 2. Get User Role From Firestore
      // --------------------------------
      const userRef = doc(db, "users", user.uid);

      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        alert(
          "User profile not found in database."
        );

        return;
      }

      const userData = userDoc.data();

      // --------------------------------
      // 3. Get Role
      // --------------------------------
      const role = userData.role || "Citizen";

      console.log("Logged in user:", userData);
      console.log("User role:", role);

      // --------------------------------
      // 4. Save User Information
      // --------------------------------
      localStorage.setItem(
        "disasterAIUser",
        JSON.stringify({
          uid: user.uid,
          name: userData.name || "",
          email: userData.email || user.email,
          mobile: userData.mobile || "",
          role: role,
        })
      );

      // --------------------------------
      // 5. Success Message
      // --------------------------------
      alert(
        `Login successful!\n\nWelcome ${userData.name || "User"}`
      );

      // --------------------------------
      // 6. Role Based Navigation
      // --------------------------------
      navigateByRole(role);

    } catch (error) {
      console.error("LOGIN ERROR:", error);

      // Firebase Authentication Errors
      if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/wrong-password" ||
        error.code === "auth/user-not-found"
      ) {
        alert("Invalid email or password.");
      }

      else if (error.code === "auth/invalid-email") {
        alert("Please enter a valid email address.");
      }

      else if (error.code === "auth/too-many-requests") {
        alert(
          "Too many login attempts. Please try again later."
        );
      }

      // Firestore Permission Error
      else if (
        error.code === "permission-denied" ||
        error.message?.includes(
          "Missing or insufficient permissions"
        )
      ) {
        alert(
          "Firestore permission denied.\n\nPlease check your Firestore Security Rules."
        );
      }

      else {
        alert(
          "Login failed.\n\n" +
            (error.message || "Something went wrong.")
        );
=======
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
>>>>>>> 47e57e0 (Feat: Finalize AntiCalamity EOC access, route protection, and telemetry stress-test)
      }
    } finally {
      setLoading(false);
    }
  };

  // ================================
  // UI
  // ================================
  return (
    <div className="min-h-screen bg-[#070b14] flex flex-col items-center justify-center px-4 py-8 relative">
      {/* Background radial highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-950/20 via-transparent to-transparent pointer-events-none" />

<<<<<<< HEAD
      <div className="w-full max-w-md">

        {/* Main Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-8">

          {/* Logo */}
          <div className="text-center mb-8">

            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center">

              <span className="text-5xl">
                🌍
              </span>

            </div>

            <h1 className="text-4xl font-bold text-cyan-400">
              DisasterAI
            </h1>

            <p className="text-slate-400 mt-2">
              Emergency Management Platform
            </p>

          </div>

          {/* Heading */}
          <div className="mb-7">

            <h2 className="text-2xl font-bold text-white">
              Welcome Back
            </h2>

            <p className="text-slate-400 text-sm mt-2">
              Sign in to access your DisasterAI account.
            </p>

          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Email */}
            <div>

              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                className="w-full px-4 py-3.5 rounded-xl bg-slate-800 text-white placeholder-slate-500 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 focus:border-cyan-400 transition"
              />

            </div>

            {/* Password */}
            <div>

              <label className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                className="w-full px-4 py-3.5 rounded-xl bg-slate-800 text-white placeholder-slate-500 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 focus:border-cyan-400 transition"
              />

            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-700 disabled:text-slate-400 text-slate-950 font-bold transition duration-200 shadow-lg shadow-cyan-500/10"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-5 h-5 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin"></span>
                  Signing In...
                </span>
              ) : (
                "Sign In"
              )}
            </button>

          </form>

          {/* Register Link */}
          <div className="text-center mt-7">

            <p className="text-slate-400 text-sm">
              Don't have an account?{" "}

              <Link
                to="/register"
                className="text-cyan-400 hover:text-cyan-300 font-semibold hover:underline"
              >
                Create an account
              </Link>
            </p>

          </div>

          {/* Security Box */}
          <div className="mt-7 p-4 rounded-xl bg-slate-800/70 border border-slate-700">

            <div className="flex items-start gap-3">

              <div className="text-xl">
                🛡️
              </div>

              <div>

                <p className="text-sm font-semibold text-slate-200">
                  Secure Emergency Access
                </p>

                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Your account and emergency information
                  are protected by secure authentication.
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Back Home */}
        <div className="text-center mt-5">

          <Link
            to="/"
            className="text-sm text-slate-500 hover:text-cyan-400 transition"
          >
            ← Back to DisasterAI Home
          </Link>

=======
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
>>>>>>> 47e57e0 (Feat: Finalize AntiCalamity EOC access, route protection, and telemetry stress-test)
        </div>

      </div>

      {/* Return to Home link */}
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
