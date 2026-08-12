import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { Bell, AlertTriangle, X } from "lucide-react";

function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "disasterReports"),
      (snapshot) => {
        const data = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .sort((a, b) => {
            const timeA = a.createdAt?.seconds || 0;
            const timeB = b.createdAt?.seconds || 0;

            return timeB - timeA;
          });

        setNotifications(data.slice(0, 5));

        const lastSeen =
          localStorage.getItem("lastNotificationTime") || "0";

        const newReports = data.filter((report) => {
          const reportTime = report.createdAt?.seconds || 0;

          return reportTime > Number(lastSeen);
        });

        if (!open) {
          setUnreadCount(newReports.length);
        }
      },
      (error) => {
        console.error("Notification Error:", error);
      }
    );

    return () => unsubscribe();
  }, [open]);

  const handleOpen = () => {
    setOpen(!open);

    if (!open) {
      const latestReport = notifications[0];

      if (latestReport?.createdAt?.seconds) {
        localStorage.setItem(
          "lastNotificationTime",
          latestReport.createdAt.seconds.toString()
        );
      }

      setUnreadCount(0);
    }
  };

  return (
    <div className="relative">

      {/* Notification Button */}

      <button
        onClick={handleOpen}
        className="relative p-3 rounded-xl hover:bg-slate-100 transition"
      >
        <Bell size={24} className="text-slate-700" />

        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold min-w-5 h-5 px-1 rounded-full flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}

      {open && (
        <div className="absolute right-0 top-14 w-96 max-w-[90vw] bg-white rounded-2xl shadow-2xl border border-gray-100 z-50">

          {/* Header */}

          <div className="flex items-center justify-between p-4 border-b">

            <div>
              <h3 className="font-bold text-lg">
                🔔 Notifications
              </h3>

              <p className="text-xs text-gray-500">
                Latest disaster reports
              </p>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X size={18} />
            </button>

          </div>

          {/* Notification List */}

          <div className="max-h-96 overflow-y-auto">

            {notifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">

                <Bell
                  size={35}
                  className="mx-auto mb-3 text-gray-300"
                />

                <p>No notifications</p>

              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="p-4 border-b hover:bg-slate-50 transition"
                >

                  <div className="flex gap-3">

                    <div className="bg-red-100 text-red-600 p-2 rounded-xl h-fit">
                      <AlertTriangle size={20} />
                    </div>

                    <div className="flex-1">

                      <div className="flex justify-between gap-2">

                        <h4 className="font-semibold text-slate-800">
                          {notification.disasterType ||
                            "Disaster Report"}
                        </h4>

                        <span
                          className={`text-xs px-2 py-1 rounded-full font-semibold ${
                            notification.status === "Verified"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {notification.status || "Pending"}
                        </span>

                      </div>

                      <p className="text-sm text-gray-600 mt-1">
                        Severity:{" "}
                        <span className="font-semibold">
                          {notification.severity || "Unknown"}
                        </span>
                      </p>

                      <p className="text-xs text-gray-500 mt-1">
                        📍{" "}
                        {notification.location ||
                          "Location unavailable"}
                      </p>

                    </div>

                  </div>

                </div>
              ))
            )}

          </div>

          {/* Footer */}

          {notifications.length > 0 && (
            <div className="p-3 text-center border-t">

              <button
                onClick={() => setOpen(false)}
                className="text-sm text-blue-600 hover:text-blue-800 font-semibold"
              >
                Close Notifications
              </button>

            </div>
          )}

        </div>
      )}

    </div>
  );
}

export default NotificationBell;