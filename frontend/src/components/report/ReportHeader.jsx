import { TriangleAlert, ShieldCheck } from "lucide-react";

function ReportHeader() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-600 via-red-500 to-orange-500 p-8 text-white shadow-2xl">

      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10"></div>
      <div className="absolute -left-10 -bottom-10 h-36 w-36 rounded-full bg-white/10"></div>

      <div className="relative flex flex-col lg:flex-row justify-between items-center">

        <div>
          <div className="flex items-center gap-3 mb-4">
            <TriangleAlert size={40} />
            <h1 className="text-4xl font-extrabold">
              Report Disaster
            </h1>
          </div>

          <p className="text-red-100 text-lg max-w-2xl">
            Report emergencies quickly and accurately. Your report helps
            authorities respond faster and save lives.
          </p>
        </div>

        <div className="mt-6 lg:mt-0">
          <div className="bg-white/20 backdrop-blur-md rounded-2xl px-6 py-4 flex items-center gap-3">
            <ShieldCheck size={28} />
            <div>
              <p className="font-bold">AI Verification</p>
              <p className="text-sm text-red-100">
                Secure Emergency Platform
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

export default ReportHeader;