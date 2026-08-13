import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

import DashboardStats from "../components/dashboard/DashboardStats";
import DashboardCharts from "../components/dashboard/DashboardCharts";
import ReportList from "../components/dashboard/ReportList";

import {
  ShieldCheck,
  Bell,
  Activity,
  Clock3,
  ChevronDown,
  AlertTriangle,
  X,
} from "lucide-react";

function GovernmentDashboard() {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [reports, setReports] = useState([]);
  const [selectedReportId, setSelectedReportId] = useState(null);

  // ================= FIREBASE REPORTS =================

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "disasterReports"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setReports(data);
      }
    );

    return () => unsubscribe();
  }, []);

  // ================= NOTIFICATIONS =================

  const notifications = reports
    .filter(
      (report) =>
        report.status === "Pending" ||
        report.severity === "Critical"
    )
    .sort((a, b) => {
      const timeA = a.createdAt?.seconds || 0;
      const timeB = b.createdAt?.seconds || 0;

      return timeB - timeA;
    })
    .slice(0, 8);

  const notificationCount = notifications.length;

  // ================= NOTIFICATION CLICK =================

  const handleNotificationClick = (reportId) => {
    setSelectedReportId(reportId);
    setNotificationsOpen(false);

    setTimeout(() => {
      const element = document.getElementById(
        `report-${reportId}`
      );

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 300);
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] text-slate-800">

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <header className="bg-[#0b1220] text-white shadow-md">

        <div className="max-w-[1600px] mx-auto px-5 lg:px-8">

          <div className="h-[76px] flex items-center justify-between">

            {/* BRAND */}

            <div className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-900/30">

                <ShieldCheck size={25} />

              </div>

              <div>

                <h1 className="text-lg md:text-xl font-bold tracking-tight">
                  Disaster Management Center
                </h1>

                <p className="text-xs md:text-sm text-slate-400">
                  Government Operations Dashboard
                </p>

              </div>

            </div>


            {/* RIGHT SIDE */}

            <div className="flex items-center gap-5">

              {/* SYSTEM STATUS */}

              <div className="hidden md:block text-right">

                <p className="text-[10px] uppercase tracking-wider text-slate-500">
                  System Status
                </p>

                <div className="flex items-center justify-end gap-2 mt-1">

                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>

                  <span className="text-sm font-medium text-emerald-400">
                    Operational
                  </span>

                </div>

              </div>


              <div className="hidden md:block h-8 w-px bg-slate-700"></div>


              {/* ================================================= */}
              {/* NOTIFICATION */}
              {/* ================================================= */}

              <div className="relative">

                <button
                  onClick={() =>
                    setNotificationsOpen(
                      !notificationsOpen
                    )
                  }
                  className="relative w-10 h-10 rounded-lg hover:bg-slate-800 flex items-center justify-center transition"
                  title="Notifications"
                >

                  <Bell size={19} />

                  {notificationCount > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center bg-red-500 text-white text-[10px] font-bold rounded-full">

                      {notificationCount > 9
                        ? "9+"
                        : notificationCount}

                    </span>
                  )}

                </button>


                {/* ================================================= */}
                {/* NOTIFICATION PANEL */}
                {/* ================================================= */}

                {notificationsOpen && (

                  <div className="absolute right-0 top-12 w-[370px] max-w-[calc(100vw-30px)] bg-white text-slate-800 rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-[9999]">

                    {/* PANEL HEADER */}

                    <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">

                      <div>

                        <h3 className="font-semibold text-sm">
                          Notifications
                        </h3>

                        <p className="text-xs text-slate-400 mt-0.5">
                          Recent disaster alerts
                        </p>

                      </div>


                      <button
                        onClick={() =>
                          setNotificationsOpen(false)
                        }
                        className="w-7 h-7 rounded-md hover:bg-slate-100 flex items-center justify-center"
                      >

                        <X size={16} />

                      </button>

                    </div>


                    {/* NOTIFICATION LIST */}

                    <div className="max-h-[390px] overflow-y-auto">

                      {notifications.length === 0 ? (

                        <div className="py-10 text-center">

                          <Bell
                            size={30}
                            className="mx-auto text-slate-300"
                          />

                          <p className="text-sm text-slate-500 mt-3">
                            No new notifications
                          </p>

                        </div>

                      ) : (

                        notifications.map((report) => (

                          <div
                            key={report.id}
                            onClick={() =>
                              handleNotificationClick(
                                report.id
                              )
                            }
                            className={`px-4 py-3 border-b border-slate-100 cursor-pointer transition ${
                              selectedReportId === report.id
                                ? "bg-blue-50"
                                : "hover:bg-slate-50"
                            }`}
                          >

                            <div className="flex gap-3">

                              {/* ICON */}

                              <div
                                className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                                  report.severity ===
                                  "Critical"
                                    ? "bg-red-100"
                                    : "bg-amber-100"
                                }`}
                              >

                                <AlertTriangle
                                  size={17}
                                  className={
                                    report.severity ===
                                    "Critical"
                                      ? "text-red-600"
                                      : "text-amber-600"
                                  }
                                />

                              </div>


                              {/* CONTENT */}

                              <div className="min-w-0 flex-1">

                                <div className="flex items-start justify-between gap-2">

                                  <p className="text-sm font-semibold text-slate-800">

                                    {report.disasterType ||
                                      "Disaster Report"}

                                  </p>


                                  <span
                                    className={`text-[10px] font-semibold px-2 py-1 rounded-full ${
                                      report.status ===
                                      "Pending"
                                        ? "bg-amber-50 text-amber-700"
                                        : "bg-red-50 text-red-700"
                                    }`}
                                  >

                                    {report.status ===
                                    "Pending"
                                      ? "PENDING"
                                      : "CRITICAL"}

                                  </span>

                                </div>


                                <p className="text-xs text-slate-500 mt-1">

                                  {report.location ||
                                    "Location unavailable"}

                                </p>


                                {report.description && (

                                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">

                                    {report.description}

                                  </p>

                                )}

                              </div>

                            </div>

                          </div>

                        ))

                      )}

                    </div>


                    {/* FOOTER */}

                    {notifications.length > 0 && (

                      <div className="px-4 py-3 bg-slate-50 border-t border-slate-200">

                        <p className="text-xs text-slate-500 text-center">

                          {notificationCount} active
                          notification
                          {notificationCount !== 1
                            ? "s"
                            : ""}

                        </p>

                      </div>

                    )}

                  </div>

                )}

              </div>


              {/* ADMIN PROFILE */}

              <div className="hidden sm:flex items-center gap-2">

                <div className="w-9 h-9 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-semibold text-sm">

                  AD

                </div>


                <div className="hidden lg:block">

                  <p className="text-sm font-medium">
                    Administrator
                  </p>

                  <p className="text-[11px] text-slate-500">
                    Government
                  </p>

                </div>


                <ChevronDown
                  size={16}
                  className="text-slate-400"
                />

              </div>

            </div>

          </div>

        </div>

      </header>


      {/* ================================================= */}
      {/* MAIN */}
      {/* ================================================= */}

      <main className="max-w-[1600px] mx-auto px-5 lg:px-8 py-6">

        {/* PAGE HEADER */}

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">

          <div>

            <div className="flex items-center gap-2 mb-1">

              <Activity
                size={20}
                className="text-blue-600"
              />

              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                Command Center
              </h2>

            </div>


            <p className="text-sm text-slate-500">
              Monitor disaster incidents, assess risk and
              coordinate emergency response operations.
            </p>

          </div>


          {/* LIVE MONITORING */}

          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-2.5 shadow-sm">

            <Clock3
              size={17}
              className="text-slate-500"
            />

            <div>

              <p className="text-[10px] uppercase tracking-wide text-slate-400">
                Dashboard
              </p>

              <p className="text-sm font-semibold text-slate-700">
                Live Monitoring
              </p>

            </div>

          </div>

        </div>


        {/* ================================================= */}
        {/* STATISTICS */}
        {/* ================================================= */}

        <section>
          <DashboardStats />
        </section>


        {/* ================================================= */}
        {/* CHARTS */}
        {/* ================================================= */}

        <section className="mt-6">
          <DashboardCharts />
        </section>


        {/* ================================================= */}
        {/* REPORTS */}
        {/* ================================================= */}

        <section className="mt-7">

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 md:p-5">

            <ReportList
              selectedReportId={selectedReportId}
            />

          </div>

        </section>

      </main>


      {/* ================================================= */}
      {/* FOOTER */}
      {/* ================================================= */}

      <footer className="border-t border-slate-200 bg-white mt-8">

        <div className="max-w-[1600px] mx-auto px-5 lg:px-8 py-4">

          <div className="flex flex-col md:flex-row justify-between items-center gap-2">

            <p className="text-xs text-slate-500">
              Disaster Management Center • Government
              Operations
            </p>

            <p className="text-xs text-slate-400">
              Live data synchronized with Firebase
            </p>

          </div>

        </div>

      </footer>

    </div>
  );
}

export default GovernmentDashboard;