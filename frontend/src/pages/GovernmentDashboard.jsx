import DashboardStats from "../components/dashboard/DashboardStats";
import DashboardCharts from "../components/dashboard/DashboardCharts";
import ReportList from "../components/dashboard/ReportList";
import NotificationBell from "../components/dashboard/NotificationBell";

function GovernmentDashboard() {
  return (
    <div className="min-h-screen bg-slate-100 p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">

        <div>
          <h1 className="text-4xl font-bold text-slate-800">
            🏛 Government Dashboard
          </h1>

          <p className="text-gray-500 mt-1">
            Monitor and manage disaster reports
          </p>
        </div>

        {/* Notification */}
        <NotificationBell />

      </div>

      {/* Statistics */}
      <DashboardStats />

      {/* Charts */}
      <DashboardCharts />

      {/* Reports */}
      <div className="mt-8">
        <ReportList />
      </div>

    </div>
  );
}

export default GovernmentDashboard;