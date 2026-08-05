import DashboardStats from "../components/dashboard/DashboardStats";
import DashboardCharts from "../components/dashboard/DashboardCharts";
import ReportList from "../components/dashboard/ReportList";

function GovernmentDashboard() {
  return (
    <div className="min-h-screen bg-slate-100 p-6">

      {/* Heading */}
      <h1 className="text-4xl font-bold mb-6">
        🏛 Government Dashboard
      </h1>

      {/* Statistics */}
      <DashboardStats />

      {/* Charts */}
      <div className="mt-6">
        <DashboardCharts />
      </div>

      {/* Reports */}
      <div className="mt-8">
        <ReportList />
      </div>

    </div>
  );
}

export default GovernmentDashboard;