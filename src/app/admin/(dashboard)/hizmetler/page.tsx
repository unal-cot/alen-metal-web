"use client";

import { useEffect, useState } from "react";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  imageUrl: string;
  features: string;
  order: number;
  active: boolean;
}

const serviceIcons = [
  { value: "fence", label: "Panel Çit" },
  { value: "door_sliding", label: "Sürgülü Kapı" },
  { value: "garage_door", label: "Panjur Kapı" },
  { value: "door_front", label: "Personel Kapı" },
  { value: "roller_shades", label: "Panjur Sistemi" },
  { value: "grid_on", label: "Izgara / Panel" },
  { value: "shield", label: "Güvenlik" },
  { value: "lock", label: "Kilit" },
  { value: "construction", label: "İnşaat" },
  { value: "build", label: "Kaynak / Yapı" },
  { value: "engineering", label: "Mühendislik" },
  { value: "precision_manufacturing", label: "Lazer Kesim" },
  { value: "hardware", label: "Metal / Donanım" },
  { value: "architecture", label: "Mimari" },
  { value: "factory", label: "Fabrika" },
  { value: "home", label: "Ev / Genel" },
  { value: "handyman", label: "El İşi" },
  { value: "grass", label: "Çim / Bahçe" },
  { value: "outdoor_garden", label: "Bahçe" },
  { value: "star", label: "Yıldız" },
];

export default function HizmetlerAdminPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [form, setForm] = useState<Partial<Service>>({ title: "", icon: "fence", order: 0, active: true });
  const [editing, setEditing] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetch("/api/services").then((r) => r.json()).then(setServices);
  }, []);

  const refresh = () => fetch("/api/services").then((r) => r.json()).then(setServices);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editing ? "PUT" : "POST";
    const body = editing ? { ...form, id: editing } : form;
    await fetch("/api/services", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setForm({ title: "", icon: "fence", order: 0, active: true });
    setImagePreview("");
    setEditing(null);
    refresh();
  };

  const handleEdit = (s: Service) => {
    setForm(s);
    setImagePreview(s.imageUrl || "");
    setEditing(s.id);
  };

  const handleDelete = async (id: string) => {
    await fetch("/api/services", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    refresh();
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/media", { method: "POST", body: formData });
    const data = await res.json();
    setForm({ ...form, imageUrl: data.url });
    setImagePreview(data.url);
    setUploading(false);
  };

  return (
    <div>
      <h1 className="font-headline-xl text-headline-xl text-on-surface mb-8">Hizmetler</h1>
      <form onSubmit={handleSubmit} className="glass-panel p-6 rounded-lg mb-8 space-y-4">
        <h2 className="font-headline-lg text-headline-lg text-on-surface">{editing ? "Düzenle" : "Yeni Hizmet"}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input placeholder="Başlık" value={form.title || ""} onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="bg-surface-container border border-outline-variant rounded px-4 py-2 text-on-surface focus:border-primary-container focus:outline-none" required />

          <div>
            <label className="font-label-bold text-label-bold text-on-surface block mb-2">İkon</label>
            <select
              value={form.icon || "fence"}
              onChange={(e) => setForm({ ...form, icon: e.target.value })}
              className="w-full bg-surface-container border border-outline-variant rounded px-4 py-2 text-on-surface focus:border-primary-container focus:outline-none"
            >
              {serviceIcons.map((icon) => (
                <option key={icon.value} value={icon.value}>
                  {icon.label}
                </option>
              ))}
            </select>
            <div className="flex items-center gap-2 mt-2 text-on-surface-variant">
              <span className="material-symbols-outlined text-2xl">{form.icon || "fence"}</span>
              <span className="font-body-sm text-body-sm">önizleme</span>
            </div>
          </div>
        </div>

        <textarea placeholder="Açıklama" value={form.description || ""} onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={2} className="w-full bg-surface-container border border-outline-variant rounded px-4 py-2 text-on-surface focus:border-primary-container focus:outline-none resize-none" />

        <textarea placeholder="Özellikler (virgülle ayırın)" value={form.features || ""} onChange={(e) => setForm({ ...form, features: e.target.value })}
          rows={2} className="w-full bg-surface-container border border-outline-variant rounded px-4 py-2 text-on-surface focus:border-primary-container focus:outline-none resize-none" />

        <div>
          <label className="font-label-bold text-label-bold text-on-surface block mb-2">Servis Görseli</label>
          <div className="flex items-center gap-4">
            <label className="bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-bold text-label-bold px-4 py-2 rounded cursor-pointer transition-colors border border-outline-variant inline-flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">upload</span>
              {uploading ? "Yükleniyor..." : "Bilgisayardan Seç"}
              <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" disabled={uploading} />
            </label>
            {form.imageUrl && (
              <button
                type="button"
                onClick={() => { setForm({ ...form, imageUrl: "" }); setImagePreview(""); }}
                className="text-error font-label-bold text-label-bold hover:underline"
              >
                Görseli Kaldır
              </button>
            )}
          </div>
          {imagePreview && (
            <div className="mt-3">
              <img
                src={imagePreview}
                alt="Görsel önizleme"
                className="w-full max-w-md h-48 object-cover rounded-lg border border-outline-variant/30"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input type="number" placeholder="Sıra" value={form.order || 0} onChange={(e) => setForm({ ...form, order: +e.target.value })}
            className="bg-surface-container border border-outline-variant rounded px-4 py-2 text-on-surface focus:border-primary-container focus:outline-none" />
          <label className="flex items-center gap-2 text-on-surface">
            <input type="checkbox" checked={form.active || false} onChange={(e) => setForm({ ...form, active: e.target.checked })} />
            <span className="font-label-bold text-label-bold">Aktif</span>
          </label>
        </div>

        <div className="flex gap-4">
          <button type="submit" className="bg-primary-container text-on-primary-container font-label-bold text-label-bold px-6 py-2 rounded hover:bg-primary-container/90 transition-colors">
            {editing ? "Güncelle" : "Ekle"}
          </button>
          {editing && (
            <button type="button" onClick={() => { setEditing(null); setForm({ title: "", icon: "fence", order: 0, active: true }); setImagePreview(""); }}
              className="bg-surface-container-high text-on-surface font-label-bold text-label-bold px-6 py-2 rounded hover:bg-surface-container-highest transition-colors">İptal</button>
          )}
        </div>
      </form>

      <div className="space-y-4">
        {services.map((s) => (
          <div key={s.id} className="glass-panel p-4 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-4">
              {s.imageUrl ? (
                <img src={s.imageUrl} alt={s.title} className="w-12 h-12 rounded object-cover border border-outline-variant/30" />
              ) : (
                <span className="material-symbols-outlined text-2xl text-primary-container">{s.icon}</span>
              )}
              <div>
                <div className="font-label-bold text-label-bold text-on-surface">{s.title}</div>
                <div className="font-body-md text-body-md text-on-surface-variant">Sıra: {s.order} {!s.active && "· Pasif"}</div>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(s)} className="p-2 text-on-surface-variant hover:text-primary-container transition-colors">
                <span className="material-symbols-outlined">edit</span>
              </button>
              <button onClick={() => handleDelete(s.id)} className="p-2 text-on-surface-variant hover:text-error transition-colors">
                <span className="material-symbols-outlined">delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
