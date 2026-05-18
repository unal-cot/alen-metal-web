"use client";

import { useEffect, useState } from "react";

interface Stat {
  id: string;
  label: string;
  value: string;
  order: number;
  active: boolean;
}

export default function IstatistiklerAdminPage() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [form, setForm] = useState<Partial<Stat>>({ label: "", value: "", order: 0, active: true });
  const [editing, setEditing] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/stats").then((r) => r.json()).then(setStats);
  }, []);

  const refresh = () => fetch("/api/stats").then((r) => r.json()).then(setStats);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editing ? "PUT" : "POST";
    const body = editing ? { ...form, id: editing } : form;
    await fetch("/api/stats", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setForm({ label: "", value: "", order: 0, active: true });
    setEditing(null);
    refresh();
  };

  const handleEdit = (s: Stat) => {
    setForm(s);
    setEditing(s.id);
  };

  const handleDelete = async (id: string) => {
    await fetch("/api/stats", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    refresh();
  };

  return (
    <div>
      <h1 className="font-headline-xl text-headline-xl text-on-surface mb-8">İstatistikler</h1>
      <form onSubmit={handleSubmit} className="glass-panel p-6 rounded-lg mb-8 space-y-4">
        <h2 className="font-headline-lg text-headline-lg text-on-surface">{editing ? "Düzenle" : "Yeni İstatistik"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input placeholder="Değer (örn: 500+)" value={form.value || ""} onChange={(e) => setForm({ ...form, value: e.target.value })}
            className="bg-surface-container border border-outline-variant rounded px-4 py-2 text-on-surface focus:border-primary-container focus:outline-none" required />
          <input placeholder="Etiket (örn: Tamamlanan Proje)" value={form.label || ""} onChange={(e) => setForm({ ...form, label: e.target.value })}
            className="bg-surface-container border border-outline-variant rounded px-4 py-2 text-on-surface focus:border-primary-container focus:outline-none" required />
          <input type="number" placeholder="Sıra" value={form.order || 0} onChange={(e) => setForm({ ...form, order: +e.target.value })}
            className="bg-surface-container border border-outline-variant rounded px-4 py-2 text-on-surface focus:border-primary-container focus:outline-none" />
        </div>
        <label className="flex items-center gap-2 text-on-surface">
          <input type="checkbox" checked={form.active || false} onChange={(e) => setForm({ ...form, active: e.target.checked })} />
          <span className="font-label-bold text-label-bold">Aktif</span>
        </label>
        <div className="flex gap-4">
          <button type="submit" className="bg-primary-container text-on-primary-container font-label-bold text-label-bold px-6 py-2 rounded hover:bg-primary-container/90 transition-colors">
            {editing ? "Güncelle" : "Ekle"}
          </button>
          {editing && (
            <button type="button" onClick={() => { setEditing(null); setForm({ label: "", value: "", order: 0, active: true }); }}
              className="bg-surface-container-high text-on-surface font-label-bold text-label-bold px-6 py-2 rounded hover:bg-surface-container-highest transition-colors">İptal</button>
          )}
        </div>
      </form>
      <div className="space-y-4">
        {stats.map((s) => (
          <div key={s.id} className="glass-panel p-4 rounded-lg flex items-center justify-between">
            <div>
              <div className="font-headline-lg text-headline-lg text-primary-container">{s.value}</div>
              <div className="font-body-md text-body-md text-on-surface-variant">Sıra: {s.order} {!s.active && "· Pasif"}</div>
            </div>
            <div className="font-label-bold text-label-bold text-on-surface">{s.label}</div>
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
