"use client";

import { useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function KullanicilarAdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "EDITOR" });
  const [editing, setEditing] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/users").then((r) => r.json()).then(setUsers);
  }, []);

  const refresh = () => fetch("/api/users").then((r) => r.json()).then(setUsers);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editing ? "PUT" : "POST";
    const body = editing ? { ...form, id: editing } : form;
    if (!editing && !form.password) return;
    await fetch("/api/users", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setForm({ name: "", email: "", password: "", role: "EDITOR" });
    setEditing(null);
    refresh();
  };

  const handleEdit = (u: User) => {
    setForm({ name: u.name, email: u.email, password: "", role: u.role });
    setEditing(u.id);
  };

  const handleDelete = async (id: string) => {
    await fetch("/api/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    refresh();
  };

  return (
    <div>
      <h1 className="font-headline-xl text-headline-xl text-on-surface mb-8">Kullanıcılar</h1>
      <form onSubmit={handleSubmit} className="glass-panel p-6 rounded-lg mb-8 space-y-4">
        <h2 className="font-headline-lg text-headline-lg text-on-surface">{editing ? "Düzenle" : "Yeni Kullanıcı"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input placeholder="Ad Soyad" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="bg-surface-container border border-outline-variant rounded px-4 py-2 text-on-surface focus:border-primary-container focus:outline-none" required />
          <input placeholder="E-posta" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="bg-surface-container border border-outline-variant rounded px-4 py-2 text-on-surface focus:border-primary-container focus:outline-none" required />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input placeholder={editing ? "Yeni şifre (boş bırakılırsa değişmez)" : "Şifre"} type="password" value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="bg-surface-container border border-outline-variant rounded px-4 py-2 text-on-surface focus:border-primary-container focus:outline-none"
            required={!editing} />
          <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}
            className="bg-surface-container border border-outline-variant rounded px-4 py-2 text-on-surface focus:border-primary-container focus:outline-none">
            <option value="EDITOR">Editör</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>
        <div className="flex gap-4">
          <button type="submit" className="bg-primary-container text-on-primary-container font-label-bold text-label-bold px-6 py-2 rounded hover:bg-primary-container/90 transition-colors">
            {editing ? "Güncelle" : "Ekle"}
          </button>
          {editing && (
            <button type="button" onClick={() => { setEditing(null); setForm({ name: "", email: "", password: "", role: "EDITOR" }); }}
              className="bg-surface-container-high text-on-surface font-label-bold text-label-bold px-6 py-2 rounded hover:bg-surface-container-highest transition-colors">İptal</button>
          )}
        </div>
      </form>
      <div className="space-y-4">
        {users.map((u) => (
          <div key={u.id} className="glass-panel p-4 rounded-lg flex items-center justify-between">
            <div>
              <div className="font-label-bold text-label-bold text-on-surface">{u.name}</div>
              <div className="font-body-md text-body-md text-on-surface-variant">{u.email} · {u.role === "ADMIN" ? "Admin" : "Editör"}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(u)} className="p-2 text-on-surface-variant hover:text-primary-container transition-colors">
                <span className="material-symbols-outlined">edit</span>
              </button>
              <button onClick={() => handleDelete(u.id)} className="p-2 text-on-surface-variant hover:text-error transition-colors">
                <span className="material-symbols-outlined">delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
