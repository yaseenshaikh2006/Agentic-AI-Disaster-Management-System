function ReportCard({ report }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">
          🚨 {report.disasterType}
        </h2>

        <span className="bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full text-sm font-semibold">
          {report.status}
        </span>
      </div>

      <div className="mt-4 space-y-2">
        <p>
          <strong>Severity:</strong> {report.severity}
        </p>

        <p>
          <strong>Location:</strong> {report.location}
        </p>

        <p>
          <strong>Description:</strong> {report.description}
        </p>
      </div>
    </div>
  );
}

export default ReportCard;