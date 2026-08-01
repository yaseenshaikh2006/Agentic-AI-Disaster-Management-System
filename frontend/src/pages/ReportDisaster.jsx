import ReportHeader from "../components/report/ReportHeader";
import ReportStats from "../components/report/ReportStats";
import ProgressStepper from "../components/report/ProgressStepper";
import ReportForm from "../components/report/ReportForm";

function ReportDisaster() {
  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        <ReportHeader />
        <ReportStats />
        <ProgressStepper />
        <ReportForm />
      </div>
    </div>
  );
}

export default ReportDisaster;