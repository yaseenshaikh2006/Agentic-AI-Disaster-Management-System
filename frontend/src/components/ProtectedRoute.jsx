import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export default function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070b14] flex items-center justify-center text-slate-400 text-sm">
        Verifying Security Clearance...
      </div>
    );
  }

  if (!user) {
    alert("Restricted Access: Please log in with authorized Officer/EOC credentials.");
    return <Navigate to="/login" replace />;
  }

  return children;
}
