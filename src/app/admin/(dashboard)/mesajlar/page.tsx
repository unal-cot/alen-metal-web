"use client";

import { useEffect, useState } from "react";

interface Message {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function MesajlarAdminPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/contact-messages").then((r) => r.json()).then(setMessages);
  }, []);

  const refresh = () => fetch("/api/contact-messages").then((r) => r.json()).then(setMessages);

  const toggleRead = async (m: Message) => {
    await fetch("/api/contact-messages", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: m.id, read: !m.read }),
    });
    refresh();
  };

  const handleDelete = async (id: string) => {
    await fetch("/api/contact-messages", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    refresh();
  };

  return (
    <div>
      <h1 className="font-headline-xl text-headline-xl text-on-surface mb-8">Mesajlar</h1>
      <div className="space-y-4">
        {messages.map((m) => (
          <div key={m.id} className={`glass-panel p-4 rounded-lg ${!m.read ? "border-primary-container/50" : ""}`}>
            <div className="flex items-center justify-between cursor-pointer" onClick={() => setExpanded(expanded === m.id ? null : m.id)}>
              <div className="flex items-center gap-4">
                {!m.read && <span className="w-2 h-2 rounded-full bg-primary-container" />}
                <div>
                  <div className="font-label-bold text-label-bold text-on-surface">{m.name}</div>
                  <div className="font-body-md text-body-md text-on-surface-variant flex flex-wrap gap-x-4 gap-y-1">
                    {m.phone && <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">call</span> {m.phone}</span>}
                    {m.email && <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">mail</span> {m.email}</span>}
                    {!m.phone && !m.email && "—"}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-body-md text-body-md text-on-surface-variant">
                  {new Date(m.createdAt).toLocaleDateString("tr-TR")}
                </span>
              </div>
            </div>
            {expanded === m.id && (
              <div className="mt-4 pt-4 border-t border-outline-variant/30">
                <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4 font-body-md text-body-md text-on-surface-variant">
                  {m.phone && <span><span className="font-label-bold text-label-bold text-on-surface">Telefon:</span> {m.phone}</span>}
                  {m.email && <span><span className="font-label-bold text-label-bold text-on-surface">E-posta:</span> {m.email}</span>}
                </div>
                <p className="font-body-md text-body-md text-on-surface whitespace-pre-wrap mb-4">{m.message}</p>
                <div className="flex gap-2">
                  <button onClick={() => toggleRead(m)}
                    className="bg-surface-container-high text-on-surface font-label-bold text-label-bold px-4 py-2 rounded hover:bg-surface-container-highest transition-colors">
                    {m.read ? "Okunmadı İşaretle" : "Okundu İşaretle"}
                  </button>
                  <button onClick={() => handleDelete(m.id)}
                    className="bg-error/10 text-error font-label-bold text-label-bold px-4 py-2 rounded hover:bg-error/20 transition-colors">
                    Sil
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
        {messages.length === 0 && (
          <p className="text-on-surface-variant font-body-md text-center py-12">Henüz mesaj yok.</p>
        )}
      </div>
    </div>
  );
}
