import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

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
          })
        );
      }

      alert("Login successful!");

      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error(error);

      if (error.code === "auth/invalid-credential") {
        alert("Invalid email or password.");
      } else if (error.code === "auth/user-not-found") {
        alert("No account found with this email.");
      } else if (error.code === "auth/wrong-password") {
        alert("Incorrect password.");
      } else if (error.code === "auth/invalid-email") {
        alert("Invalid email address.");
      } else {
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6 py-10">

      <div className="w-full max-w-md bg-slate-900 rounded-2xl shadow-2xl p-8 border border-slate-800">

        <div className="text-center mb-8">
          <div className="text-5xl mb-3">
            🌍
          </div>

          <h1 className="text-4xl font-bold text-cyan-400">
            DisasterAI
          </h1>

          <p className="text-gray-400 mt-2">
            Emergency Management Platform
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white">
            Welcome Back
          </h2>

          <p className="text-gray-400 mt-1">
            Sign in to access your disaster management account.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-gray-300 font-medium mb-2">
              Email Address
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-cyan-400 placeholder-gray-500"
            />
          </div>

          <div>
            <label className="block text-gray-300 font-medium mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-cyan-400 placeholder-gray-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-600 text-white py-3 rounded-lg font-semibold transition"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

        </form>

        <div className="text-center mt-6">

          <p className="text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-cyan-400 font-semibold hover:underline"
            >
              Create an account
            </Link>
          </p>

        </div>

        <div className="mt-6 p-4 rounded-lg bg-slate-800 border border-slate-700">

          <p className="text-white font-semibold">
            🛡️ Secure Emergency Access
          </p>

          <p className="text-gray-400 text-sm mt-1">
            Your data is protected with secure platform controls.
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;