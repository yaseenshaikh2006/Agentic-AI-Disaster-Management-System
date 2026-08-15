import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { auth, db } from "../firebase";

function RoleProtectedRoute({ children, allowedRoles }) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (user) => {
        if (!user) {
          setAuthorized(false);
          setLoading(false);
          return;
        }

        try {
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);

          if (!userSnap.exists()) {
            setAuthorized(false);
            setLoading(false);
            return;
          }

          const userData = userSnap.data();

          if (allowedRoles.includes(userData.role)) {
            setAuthorized(true);
          } else {
            setAuthorized(false);
          }

        } catch (error) {
          console.error(error);
          setAuthorized(false);
        }

        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [allowedRoles]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <p className="text-cyan-400 text-xl">
          Checking access...
        </p>
      </div>
    );
  }

  if (!authorized) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default RoleProtectedRoute;