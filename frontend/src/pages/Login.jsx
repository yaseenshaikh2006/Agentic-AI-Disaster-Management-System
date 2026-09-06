import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { auth, db } from "../firebase";

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

    if (!formData.email || !formData.password) {
      alert("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

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
      }
    } finally {
      setLoading(false);
    }
  };

  // ================================
  // UI
  // ================================
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6 py-10">

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

        </div>

      </div>

    </div>
  );
}

export default Login;