"use client";

import { useEffect, useState } from "react";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  imageUrl: string;
  order: number;
  active: boolean;
}

export default function HizmetlerAdminPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [form, setForm] = useState<Partial<Service>>({ title: "", icon: "fence", order: 0, active: true });
  const [editing, setEditing] = useState<string | null>(null);

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
    setEditing(null);
    refresh();
  };

  const handleEdit = (s: Service) => {
    setForm(s);
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

  return (
    <div>
      <h1 className="font-headline-xl text-headline-xl text-on-surface mb-8">Hizmetler</h1>
      <form onSubmit={handleSubmit} className="glass-panel p-6 rounded-lg mb-8 space-y-4">
        <h2 className="font-headline-lg text-headline-lg text-on-surface">{editing ? "Düzenle" : "Yeni Hizmet"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input placeholder="Başlık" value={form.title || ""} onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="bg-surface-container border border-outline-variant rounded px-4 py-2 text-on-surface focus:border-primary-container focus:outline-none" required />
          <input placeholder="İkon (Material Symbol)" value={form.icon || ""} onChange={(e) => setForm({ ...form, icon: e.target.value })}
            className="bg-surface-container border border-outline-variant rounded px-4 py-2 text-on-surface focus:border-primary-container focus:outline-none" />
        </div>
        <textarea placeholder="Açıklama" value={form.description || ""} onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={2} className="w-full bg-surface-container border border-outline-variant rounded px-4 py-2 text-on-surface focus:border-primary-container focus:outline-none resize-none" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input placeholder="Görsel URL" value={form.imageUrl || ""} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
            className="bg-surface-container border border-outline-variant rounded px-4 py-2 text-on-surface focus:border-primary-container focus:outline-none" />
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
            <button type="button" onClick={() => { setEditing(null); setForm({ title: "", icon: "fence", order: 0, active: true }); }}
              className="bg-surface-container-high text-on-surface font-label-bold text-label-bold px-6 py-2 rounded hover:bg-surface-container-highest transition-colors">İptal</button>
          )}
        </div>
      </form>
      <div className="space-y-4">
        {services.map((s) => (
          <div key={s.id} className="glass-panel p-4 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-2xl text-primary-container">{s.icon}</span>
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
