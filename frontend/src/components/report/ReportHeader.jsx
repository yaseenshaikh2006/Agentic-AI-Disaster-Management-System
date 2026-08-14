import { TriangleAlert, ShieldCheck } from "lucide-react";

function ReportHeader() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      <div className="absolute left-0 top-0 h-full w-1 bg-red-500" />

      <div className="relative px-6 py-7 lg:px-8">

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          {/* Left */}

          <div className="flex items-start gap-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 border border-red-100">
              <TriangleAlert
                size={25}
                className="text-red-600"
              />
            </div>

            <div>

              <div className="flex flex-wrap items-center gap-3">

                <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                  Report Disaster
                </h1>

                <span className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                  EMERGENCY REPORTING
                </span>

              </div>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Submit accurate disaster information to help emergency
                authorities assess incidents and coordinate a faster response.
              </p>

            </div>

          </div>


          {/* Security Status */}

          <div className="flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white border border-emerald-100">
              <ShieldCheck
                size={21}
                className="text-emerald-600"
              />
            </div>

            <div>

              <p className="text-sm font-semibold text-slate-800">
                Secure Reporting
              </p>

              <div className="mt-0.5 flex items-center gap-2">

                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                <p className="text-xs text-emerald-600">
                  Protected & Verified
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default ReportHeader;