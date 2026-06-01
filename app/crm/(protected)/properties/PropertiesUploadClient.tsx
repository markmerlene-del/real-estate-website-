"use client";

import { useRef, useState, useTransition } from "react";
import Image from "next/image";

interface PropertyRow {
  id: string;
  title: string;
  address: string;
  currentImage: string | null;
}

export default function PropertiesUploadClient({ properties }: { properties: PropertyRow[] }) {
  const [images, setImages] = useState<Record<string, string>>(
    Object.fromEntries(properties.map((p) => [p.id, p.currentImage ?? ""]))
  );
  const [dragging, setDragging] = useState<string | null>(null);
  const [uploading, setUploading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [, startTransition] = useTransition();
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  async function upload(propertyId: string, file: File) {
    setUploading(propertyId);
    setError(null);
    const form = new FormData();
    form.append("propertyId", propertyId);
    form.append("file", file);
    try {
      const res = await fetch("/api/properties/upload-image", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Upload failed");
      startTransition(() => {
        setImages((prev) => ({ ...prev, [propertyId]: data.url }));
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(null);
    }
  }

  function handleFiles(propertyId: string, files: FileList | null) {
    if (!files?.length) return;
    upload(propertyId, files[0]);
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900">Property Photos</h1>
        <p className="text-sm text-gray-500 mt-0.5">Upload or replace photos for each listing</p>
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="space-y-3">
        {properties.map((p) => {
          const imgUrl = images[p.id];
          const isUploading = uploading === p.id;
          const isDragging = dragging === p.id;

          return (
            <div
              key={p.id}
              className={`flex items-center gap-4 p-4 bg-white border rounded-lg transition-colors ${
                isDragging ? "border-amber-400 bg-amber-50" : "border-gray-200"
              }`}
              onDragOver={(e) => { e.preventDefault(); setDragging(p.id); }}
              onDragLeave={() => setDragging(null)}
              onDrop={(e) => {
                e.preventDefault();
                setDragging(null);
                handleFiles(p.id, e.dataTransfer.files);
              }}
            >
              {/* Thumbnail */}
              <div className="w-20 h-16 rounded overflow-hidden bg-gray-100 flex-shrink-0 relative">
                {imgUrl ? (
                  <Image src={imgUrl} alt={p.title} fill className="object-cover" unoptimized />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-gray-300" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <rect x="2" y="6" width="20" height="14" rx="1" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M2 14l5-4 4 3 4-5 7 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="8.5" cy="10.5" r="1.5" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{p.title}</p>
                <p className="text-xs text-gray-500 truncate">{p.address}</p>
                {imgUrl && (
                  <p className="text-xs text-green-600 mt-0.5">Photo uploaded</p>
                )}
              </div>

              {/* Upload button */}
              <div className="flex-shrink-0">
                <input
                  ref={(el) => { inputRefs.current[p.id] = el; }}
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={(e) => handleFiles(p.id, e.target.files)}
                />
                <button
                  onClick={() => inputRefs.current[p.id]?.click()}
                  disabled={isUploading}
                  className="px-3 py-1.5 text-xs font-medium rounded border border-gray-300 text-gray-700 hover:border-amber-500 hover:text-amber-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUploading ? (
                    <span className="flex items-center gap-1.5">
                      <svg className="w-3 h-3 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
                        <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                      </svg>
                      Uploading…
                    </span>
                  ) : imgUrl ? "Replace" : "Upload"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-4 text-xs text-gray-400">
        You can also drag and drop a photo onto any row. Changes go live immediately.
      </p>
    </div>
  );
}
