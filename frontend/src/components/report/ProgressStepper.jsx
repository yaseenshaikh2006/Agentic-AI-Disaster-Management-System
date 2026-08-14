import {
  FileText,
  MapPin,
  Send,
} from "lucide-react";

function ProgressStepper() {
  const steps = [
    {
      number: "01",
      title: "Report Details",
      description: "Incident information",
      icon: FileText,
    },
    {
      number: "02",
      title: "Location",
      description: "Incident location",
      icon: MapPin,
    },
    {
      number: "03",
      title: "Submit Report",
      description: "Send for verification",
      icon: Send,
    },
  ];

  return (
    <section className="mt-6 rounded-xl border border-slate-200 bg-white px-6 py-5 shadow-sm">

      <div className="mb-5">

        <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
          Reporting Process
        </p>

        <h2 className="mt-1 text-lg font-semibold text-slate-800">
          Submit an Emergency Report
        </h2>

      </div>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {steps.map((step, index) => {

          const Icon = step.icon;

          return (
            <div
              key={step.number}
              className="relative flex items-center gap-4 rounded-lg border border-slate-100 bg-slate-50 px-4 py-4"
            >

              {/* Step Icon */}

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 border border-blue-100">
                <Icon
                  size={19}
                  className="text-blue-600"
                />
              </div>


              {/* Text */}

              <div>

                <div className="flex items-center gap-2">

                  <span className="text-[11px] font-bold text-blue-600">
                    STEP {step.number}
                  </span>

                </div>

                <h3 className="text-sm font-semibold text-slate-800 mt-0.5">
                  {step.title}
                </h3>

                <p className="text-xs text-slate-500 mt-0.5">
                  {step.description}
                </p>

              </div>


              {/* Connector */}

              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-4 border-t border-slate-200" />
              )}

            </div>
          );
        })}

      </div>

    </section>
  );
}

export default ProgressStepper;