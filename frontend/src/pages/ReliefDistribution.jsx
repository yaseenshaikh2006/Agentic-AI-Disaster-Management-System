import {
  Package,
  ShieldCheck,
  Truck,
  ClipboardList,
  ArrowRight,
} from "lucide-react";

function ReliefDistribution() {
  const modules = [
    {
      icon: ClipboardList,
      title: "Relief Inventory",
      description:
        "Manage essential relief materials and monitor available resources.",
      iconStyle: "bg-blue-50 text-blue-600 border-blue-100",
    },
    {
      icon: Truck,
      title: "Distribution Tracking",
      description:
        "Track the movement of relief supplies from collection points to affected areas.",
      iconStyle: "bg-emerald-50 text-emerald-600 border-emerald-100",
    },
    {
      icon: ShieldCheck,
      title: "Transparent Distribution",
      description:
        "Maintain a clear distribution record to support accountable relief operations.",
      iconStyle: "bg-violet-50 text-violet-600 border-violet-100",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Page Header */}

      <div className="border-b border-slate-200 bg-white">

        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div className="flex items-start gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50">
                <Package
                  size={24}
                  className="text-blue-600"
                />
              </div>

              <div>

                <div className="flex flex-wrap items-center gap-3">

                  <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                    Relief Distribution
                  </h1>

                  <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                    RELIEF OPERATIONS
                  </span>

                </div>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                  Coordinate relief resources and maintain transparent
                  distribution across disaster-affected areas.
                </p>

              </div>

            </div>

            {/* Status */}

            <div className="flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3">

              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />

              <div>

                <p className="text-sm font-semibold text-slate-800">
                  Operations Ready
                </p>

                <p className="text-xs text-emerald-600">
                  Relief coordination system
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* Main Content */}

      <main className="mx-auto max-w-7xl px-6 py-8 lg:px-8">

        {/* Introduction */}

        <div className="mb-6">

          <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
            Operations Center
          </p>

          <h2 className="mt-1 text-xl font-bold text-slate-800">
            Relief Management
          </h2>

          <p className="mt-1 max-w-2xl text-sm text-slate-500">
            Select an operational area to manage relief resources and
            distribution activities.
          </p>

        </div>


        {/* Modules */}

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

          {modules.map((module, index) => {

            const Icon = module.icon;

            return (
              <div
                key={index}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-md"
              >

                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl border ${module.iconStyle}`}
                >
                  <Icon size={21} />
                </div>

                <h3 className="mt-5 text-lg font-semibold text-slate-800">
                  {module.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {module.description}
                </p>

                <button
                  type="button"
                  className="mt-5 flex items-center gap-2 text-sm font-semibold text-blue-600 transition group-hover:gap-3"
                >
                  Open module
                  <ArrowRight size={16} />
                </button>

              </div>
            );
          })}

        </div>


        {/* Transparency Section */}

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div className="flex items-start gap-4">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                <ShieldCheck
                  size={20}
                  className="text-slate-700"
                />
              </div>

              <div>

                <h3 className="font-semibold text-slate-800">
                  Transparent Relief Operations
                </h3>

                <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
                  Relief activities can be recorded and monitored to improve
                  accountability, resource visibility and response coordination.
                </p>

              </div>

            </div>

            <span className="shrink-0 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-medium text-slate-500">
              ACCOUNTABILITY
            </span>

          </div>

        </section>

      </main>

    </div>
  );
}

export default ReliefDistribution;