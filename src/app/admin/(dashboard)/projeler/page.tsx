"use client";

import { useEffect, useRef, useState } from "react";

interface ProjectImage {
  id?: string;
  url: string;
  order: number;
}

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  completedAt: string;
  active: boolean;
  images: ProjectImage[];
}

const emptyForm = { title: "", description: "", imageUrl: "", category: "", completedAt: "", active: true, images: [] as ProjectImage[] };

export default function ProjelerAdminPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState<Partial<Project>>(emptyForm);
  const [editing, setEditing] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    refresh();
  }, []);

  const refresh = () => fetch("/api/projects").then((r) => r.json()).then(setProjects).catch(() => {});

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/media", { method: "POST", body: fd });
      if (!res.ok) throw new Error("Yükleme başarısız");
      const data = await res.json();
      const currentImages = form.images || [];
      setForm({ ...form, images: [...currentImages, { url: data.url, order: currentImages.length }] });
    } catch {
      showMessage("error", "Görsel yüklenemedi.");
    }
    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
  };

  const removeImage = (index: number) => {
    const currentImages = form.images || [];
    setForm({ ...form, images: currentImages.filter((_, i) => i !== index) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (uploading) return;
    setSaving(true);
    try {
      const method = editing ? "PUT" : "POST";
      const payload = editing ? { ...form, id: editing } : form;
      const res = await fetch("/api/projects", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Kaydetme başarısız");
      setForm(emptyForm);
      setEditing(null);
      if (fileRef.current) fileRef.current.value = "";
      showMessage("success", editing ? "Proje güncellendi." : "Proje eklendi.");
      refresh();
    } catch {
      showMessage("error", "Kaydedilemedi.");
    }
    setSaving(false);
  };

  const handleEdit = (p: Project) => {
    setForm({ ...p, completedAt: p.completedAt ? p.completedAt.slice(0, 10) : "" });
    setEditing(p.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch("/api/projects", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
      showMessage("success", "Proje silindi.");
      refresh();
    } catch { showMessage("error", "Silinemedi."); }
  };

  const handleToggleActive = async (p: Project) => {
    try {
      await fetch("/api/projects", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: p.id, active: !p.active }) });
      showMessage("success", p.active ? "Proje gizlendi." : "Proje yayında.");
      refresh();
    } catch { showMessage("error", "Güncellenemedi."); }
  };

  const isDisabled = uploading || saving;
  const images = form.images || [];

  return (
    <div>
      <h1 className="font-headline-xl text-headline-xl text-on-surface mb-8">Projeler</h1>

      {message && (
        <div className={`mb-6 px-4 py-3 rounded font-label-bold text-label-bold ${
          message.type === "success" ? "bg-primary-container/20 text-primary-container border border-primary-container/50" : "bg-error/10 text-error border border-error/50"
        }`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="glass-panel p-6 rounded-lg mb-8 space-y-4">
        <h2 className="font-headline-lg text-headline-lg text-on-surface">{editing ? "Düzenle" : "Yeni Proje"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input placeholder="Başlık" value={form.title || ""} onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="bg-surface-container border border-outline-variant rounded px-4 py-2 text-on-surface focus:border-primary-container focus:outline-none" required />
          <input placeholder="Kategori" value={form.category || ""} onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="bg-surface-container border border-outline-variant rounded px-4 py-2 text-on-surface focus:border-primary-container focus:outline-none" />
        </div>
        <textarea placeholder="Açıklama" value={form.description || ""} onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={2} className="w-full bg-surface-container border border-outline-variant rounded px-4 py-2 text-on-surface focus:border-primary-container focus:outline-none resize-none" />

        {/* Multi image upload */}
        <div className="space-y-2">
          <label className="font-label-bold text-label-bold text-on-surface block">Fotoğraflar</label>
          <div className="flex items-center gap-4 flex-wrap">
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              disabled={isDisabled}
              className="bg-surface-container border border-outline-variant rounded px-4 py-2 text-on-surface file:mr-3 file:bg-primary-container file:text-on-primary-container file:border-0 file:rounded file:px-3 file:py-1 file:cursor-pointer file:font-label-bold disabled:opacity-50"
            />
            {uploading && <span className="text-primary-container font-label-bold animate-pulse">Yükleniyor...</span>}
          </div>
          {images.length > 0 && (
            <div className="flex gap-3 flex-wrap">
              {images.map((img, i) => (
                <div key={i} className="relative group">
                  <img src={img.url} alt={`Fotoğraf ${i + 1}`} className="h-20 w-20 rounded object-cover border border-outline-variant" />
                  <button type="button" onClick={() => removeImage(i)}
                    className="absolute -top-1.5 -right-1.5 bg-error text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="material-symbols-outlined text-sm">close</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <input type="date" value={form.completedAt || ""} onChange={(e) => setForm({ ...form, completedAt: e.target.value })}
            className="bg-surface-container border border-outline-variant rounded px-4 py-2 text-on-surface focus:border-primary-container focus:outline-none" />
        </div>
        <div className="flex gap-4">
          <button type="submit" disabled={isDisabled}
            className="bg-primary-container text-on-primary-container font-label-bold text-label-bold px-6 py-2 rounded hover:bg-primary-container/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            {saving ? "Kaydediliyor..." : editing ? "Güncelle" : "Ekle"}
          </button>
          {editing && (
            <button type="button" onClick={() => { setEditing(null); setForm(emptyForm); if (fileRef.current) fileRef.current.value = ""; }}
              className="bg-surface-container-high text-on-surface font-label-bold text-label-bold px-6 py-2 rounded hover:bg-surface-container-highest transition-colors">İptal</button>
          )}
        </div>
      </form>

      <div className="space-y-4">
        {projects.length === 0 && (
          <p className="text-center text-on-surface-variant font-body-md py-12">Henüz proje eklenmedi.</p>
        )}
        {projects.map((p) => (
          <div key={p.id} className={`glass-panel p-4 rounded-lg flex items-center justify-between ${!p.active ? "opacity-50" : ""}`}>
            <div className="flex items-center gap-4">
              {p.images?.[0]?.url ? (
                <img src={p.images[0].url} alt="" className="w-16 h-16 rounded object-cover" />
              ) : p.imageUrl ? (
                <img src={p.imageUrl} alt="" className="w-16 h-16 rounded object-cover" />
              ) : null}
              <div>
                <div className="font-label-bold text-label-bold text-on-surface">{p.title}</div>
                <div className="font-body-md text-body-md text-on-surface-variant">
                  {p.category}{!p.active && " · Pasif"}
                  {p.images?.length > 1 && ` · ${p.images.length} fotoğraf`}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleToggleActive(p)} className="p-2 text-on-surface-variant hover:text-primary-container transition-colors" title={p.active ? "Gizle" : "Göster"}>
                <span className="material-symbols-outlined">{p.active ? "visibility" : "visibility_off"}</span>
              </button>
              <button onClick={() => handleEdit(p)} className="p-2 text-on-surface-variant hover:text-primary-container transition-colors">
                <span className="material-symbols-outlined">edit</span>
              </button>
              <button onClick={() => handleDelete(p.id)} className="p-2 text-on-surface-variant hover:text-error transition-colors">
                <span className="material-symbols-outlined">delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
