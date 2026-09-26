import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import DisasterMap from "./pages/DisasterMap";
import ReportDisaster from "./pages/ReportDisaster";
import ReliefDistribution from "./pages/ReliefDistribution";
import GovernmentDashboard from "./pages/GovernmentDashboard";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

function GovernmentRoute({ children }) {
  // Check if session has government access (set on Login)
  const userRole = localStorage.getItem("user_role");
  if (userRole !== "government") {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}

function App() {
  return (
    <Routes>
      {/* Public Routes (Accessible without login) */}
  <Route path="/" element={<Home />} />
  <Route path="/map" element={<DisasterMap />} />
  <Route path="/report" element={<ReportDisaster />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/login" element={<Login />} />

  {/* Restricted Officer/EOC Routes */}
  <Route 
    path="/government" 
    element={
      <ProtectedRoute>
        <GovernmentDashboard />
      </ProtectedRoute>
    } 
  />
  <Route 
    path="/relief" 
    element={
      <ProtectedRoute>
        <ReliefDistribution />
      </ProtectedRoute>
    } 
  />
    </Routes>
  );
}

export default App;
