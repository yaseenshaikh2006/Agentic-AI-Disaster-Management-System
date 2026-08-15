import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import DisasterMap from "./pages/DisasterMap";
import ReportDisaster from "./pages/ReportDisaster";
import ReliefDistribution from "./pages/ReliefDistribution";
import GovernmentDashboard from "./pages/GovernmentDashboard";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/map" element={<DisasterMap />} />
      <Route path="/report" element={<ReportDisaster />} />
      <Route path="/relief" element={<ReliefDistribution />} />
      <Route path="/government" element={<GovernmentDashboard />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;