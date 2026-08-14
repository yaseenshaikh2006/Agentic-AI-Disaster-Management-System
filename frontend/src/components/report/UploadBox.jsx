import { UploadCloud, ImageIcon, CheckCircle2 } from "lucide-react";

function UploadBox({ image, onChange }) {
  return (
    <div>

      <label className="block text-sm font-semibold text-slate-700 mb-2">
        Upload Disaster Image
      </label>

      <label
        className={`relative flex min-h-48 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-dashed transition-all duration-200 ${
          image
            ? "border-emerald-300 bg-emerald-50/50"
            : "border-slate-300 bg-slate-50 hover:border-blue-400 hover:bg-blue-50/40"
        }`}
      >

        {image ? (
          <div className="flex w-full flex-col items-center gap-3 p-5">

            <div className="relative max-h-52 overflow-hidden rounded-xl border border-slate-200 bg-white p-1 shadow-sm">

              <img
                src={URL.createObjectURL(image)}
                alt="Disaster preview"
                className="max-h-52 max-w-full rounded-lg object-contain"
              />

            </div>

            <div className="flex items-center gap-2 text-sm font-medium text-emerald-600">

              <CheckCircle2 size={17} />

              Image selected successfully

            </div>

            <p className="text-xs text-slate-400">
              Click to choose a different image
            </p>

          </div>
        ) : (
          <div className="flex flex-col items-center px-6 py-8 text-center">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-100 bg-blue-50">
              <UploadCloud
                size={23}
                className="text-blue-600"
              />
            </div>

            <p className="mt-4 text-sm font-semibold text-slate-700">
              Upload incident evidence
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Click to browse and select an image
            </p>

            <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
              <ImageIcon size={14} />
              JPG, PNG or other image formats
            </div>

          </div>
        )}

        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onChange}
        />

      </label>

    </div>
  );
}

export default UploadBox;