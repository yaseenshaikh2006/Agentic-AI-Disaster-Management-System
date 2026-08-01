import { UploadCloud, ImageIcon } from "lucide-react";

function UploadBox({ onChange }) {
  return (
    <div>
      <label className="block text-gray-700 font-semibold mb-3">
        Upload Disaster Image
      </label>

      <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-red-300 rounded-2xl cursor-pointer bg-red-50 hover:bg-red-100 transition duration-300">

        <UploadCloud size={60} className="text-red-500 mb-4" />

        <p className="text-lg font-semibold text-gray-700">
          Drag & Drop Image Here
        </p>

        <p className="text-gray-500 mt-2">
          or Click to Browse
        </p>

        <ImageIcon size={28} className="text-gray-400 mt-4" />

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