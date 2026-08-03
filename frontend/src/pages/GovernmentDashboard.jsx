import DashboardStats from "../components/dashboard/DashboardStats";
import ReportList from "../components/dashboard/ReportList";

function GovernmentDashboard() {
  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <h1 className="text-4xl font-bold mb-8">
        🏛 Government Dashboard
      </h1>

      <DashboardStats />

      <ReportList />
    </div>
  );
}

export default GovernmentDashboard;