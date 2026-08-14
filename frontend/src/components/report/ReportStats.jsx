import {
  TriangleAlert,
  ShieldCheck,
  Building2,
  Clock3,
} from "lucide-react";

function ReportStats() {
  const stats = [
    {
      title: "Incident Reporting",
      description: "Submit emergency incidents",
      icon: TriangleAlert,
      iconStyle: "text-red-600 bg-red-50 border-red-100",
    },
    {
      title: "Report Verification",
      description: "Reports reviewed for accuracy",
      icon: ShieldCheck,
      iconStyle: "text-emerald-600 bg-emerald-50 border-emerald-100",
    },
    {
      title: "Relief Coordination",
      description: "Connect incidents with response teams",
      icon: Building2,
      iconStyle: "text-blue-600 bg-blue-50 border-blue-100",
    },
    {
      title: "Response Tracking",
      description: "Monitor emergency response status",
      icon: Clock3,
      iconStyle: "text-amber-600 bg-amber-50 border-amber-100",
    },
  ];

  return (
    <section className="mt-6">

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
            >

              <div className="flex items-start justify-between">

                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg border ${item.iconStyle}`}
                >
                  <Icon size={20} />
                </div>

                <span className="text-xs font-medium text-slate-400">
                  SYSTEM
                </span>

              </div>

              <h3 className="mt-4 text-base font-semibold text-slate-800">
                {item.title}
              </h3>

              <p className="mt-1 text-sm leading-5 text-slate-500">
                {item.description}
              </p>

            </div>
          );
        })}

      </div>

    </section>
  );
}

export default ReportStats;