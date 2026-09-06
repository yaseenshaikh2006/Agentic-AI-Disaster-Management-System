import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { auth, db } from "../firebase";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    role: "Citizen",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  // -----------------------------
  // Handle input changes
  // -----------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // -----------------------------
  // Role based navigation
  // -----------------------------
  const goToRolePage = (role) => {
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
        navigate("/dashboard", { replace: true });
        break;
    }
  };

  // -----------------------------
  // Register user
  // -----------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.mobile ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      // Create Firebase Authentication account
      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

      const user = userCredential.user;

      // Save user information in Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        role: formData.role,
        createdAt: new Date(),
      });

      // Save locally for dashboard
      localStorage.setItem(
        "disasterAIUser",
        JSON.stringify({
          uid: user.uid,
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile,
          role: formData.role,
        })
      );

      alert(
        `✅ Account created successfully!\n\nRole: ${formData.role}`
      );

      // IMPORTANT:
      // Do NOT signOut here.
      // Firebase automatically keeps the user logged in.

      // Open page according to selected role
      goToRolePage(formData.role);

    } catch (error) {
      console.error("REGISTER ERROR:", error);

      if (error.code === "auth/email-already-in-use") {
        alert("❌ This email is already registered.");
      } else if (error.code === "auth/invalid-email") {
        alert("❌ Invalid email address.");
      } else if (error.code === "auth/weak-password") {
        alert("❌ Password must be at least 6 characters.");
      } else if (error.code === "permission-denied") {
        alert(
          "❌ Firestore permission denied.\n\nPlease check Firestore Rules."
        );
      } else {
        alert("❌ Registration failed:\n\n" + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6 py-10">

      <div className="w-full max-w-lg bg-slate-900 rounded-2xl shadow-2xl p-8 border border-slate-800">

        {/* Logo */}
        <div className="text-center mb-8">

          <div className="text-6xl mb-3">
            🌍
          </div>

          <h1 className="text-4xl font-bold text-cyan-400">
            DisasterAI
          </h1>

          <p className="text-slate-400 mt-2">
            Create Your Account
          </p>

        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* Mobile */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Mobile Number
            </label>

            <input
              type="tel"
              name="mobile"
              placeholder="Enter mobile number"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Select Role
            </label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-cyan-400"
            >
              <option value="Citizen">
                Citizen
              </option>

              <option value="Government Officer">
                Government Officer
              </option>

              <option value="NGO">
                NGO
              </option>

              <option value="Volunteer">
                Volunteer
              </option>
            </select>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Create password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-600 text-white py-3 rounded-xl font-bold transition"
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>

        </form>

        {/* Login */}
        <p className="text-center text-slate-400 mt-6">

          Already have an account?{" "}

          <Link
            to="/login"
            className="text-cyan-400 font-semibold hover:underline"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Register;