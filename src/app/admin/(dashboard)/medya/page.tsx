"use client";

import { useEffect, useState, useRef } from "react";

interface MediaItem {
  id: string;
  filename: string;
  url: string;
  alt: string;
  size: number;
  mimeType: string;
}

export default function MedyaAdminPage() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/media").then((r) => r.json()).then(setMedia);
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    await fetch("/api/media", { method: "POST", body: formData });
    setUploading(false);
    fetch("/api/media").then((r) => r.json()).then(setMedia);
  };

  const handleDelete = async (id: string) => {
    await fetch("/api/media", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetch("/api/media").then((r) => r.json()).then(setMedia);
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
  };

  return (
    <div>
      <h1 className="font-headline-xl text-headline-xl text-on-surface mb-8">Medya Kütüphanesi</h1>
      <div className="glass-panel p-6 rounded-lg mb-8">
        <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
        <button
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="bg-primary-container text-on-primary-container font-label-bold text-label-bold px-6 py-2 rounded hover:bg-primary-container/90 transition-colors disabled:opacity-50"
        >
          {uploading ? "Yükleniyor..." : "Resim Yükle"}
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {media.map((m) => (
          <div key={m.id} className="glass-panel rounded-lg overflow-hidden group">
            <img src={m.url} alt={m.alt || m.filename} className="w-full h-40 object-cover" />
            <div className="p-3 flex justify-between items-center">
              <span className="font-body-md text-body-md text-on-surface-variant truncate text-sm flex-1">{m.filename}</span>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => copyUrl(m.url)} className="p-1 text-on-surface-variant hover:text-primary-container transition-colors" title="URL Kopyala">
                  <span className="material-symbols-outlined text-sm">content_copy</span>
                </button>
                <button onClick={() => handleDelete(m.id)} className="p-1 text-on-surface-variant hover:text-error transition-colors" title="Sil">
                  <span className="material-symbols-outlined text-sm">delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
