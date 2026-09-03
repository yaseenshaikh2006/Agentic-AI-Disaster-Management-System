import React, { useState } from 'react';

export default function UploadBox({ onImageSelected }) {
  const [preview, setPreview] = useState(null);
  const [compressing, setCompressing] = useState(false);

  const compressImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxWidth = 1000;
          const scaleSize = maxWidth / img.width;
          const width = img.width > maxWidth ? maxWidth : img.width;
          const height = img.width > maxWidth ? img.height * scaleSize : img.height;

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              resolve(new File([blob], file.name, { type: 'image/jpeg' }));
            },
            'image/jpeg',
            0.7
          );
        };
      };
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setCompressing(true);
    const compressed = await compressImage(file);
    setPreview(URL.createObjectURL(compressed));
    setCompressing(false);

    if (onImageSelected) {
      onImageSelected(compressed);
    }
  };

  return (
    <div className="border border-dashed border-slate-700 bg-slate-900/50 rounded-2xl p-4 text-center">
      {preview ? (
        <div className="relative group">
          <img
            src={preview}
            alt="Disaster Scene Preview"
            className="w-full max-h-56 object-cover rounded-xl border border-slate-800"
          />
          <button
            type="button"
            onClick={() => {
              setPreview(null);
              if (onImageSelected) onImageSelected(null);
            }}
            className="absolute top-2 right-2 bg-red-600/90 text-white text-xs px-2.5 py-1 rounded-md shadow hover:bg-red-500"
          >
            Remove
          </button>
        </div>
      ) : (
        <label className="cursor-pointer block py-6">
          <div className="text-3xl mb-2">📸</div>
          <span className="text-sm font-medium text-slate-300">
            {compressing ? 'Optimizing image for low bandwidth...' : 'Attach Disaster Verification Image'}
          </span>
          <p className="text-xs text-slate-500 mt-1">Auto-compressed to transmit over emergency networks</p>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
            disabled={compressing}
          />
        </label>
      )}
    </div>
  );
}