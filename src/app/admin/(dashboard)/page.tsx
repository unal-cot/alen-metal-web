"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ services: 0, projects: 0, messages: 0, unread: 0 });

  useEffect(() => {
    (async () => {
      const [services, projects, messages] = await Promise.all([
        fetch("/api/services").then((r) => r.json()),
        fetch("/api/projects").then((r) => r.json()),
        fetch("/api/contact-messages").then((r) => r.json()),
      ]);
      setStats({
        services: services.length,
        projects: projects.length,
        messages: messages.length,
        unread: messages.filter((m: { read: boolean }) => !m.read).length,
      });
    })();
  }, []);

  return (
    <div>
      <h1 className="font-headline-xl text-headline-xl text-on-surface mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
        <Link href="/admin/hizmetler" className="glass-panel p-6 rounded-lg hover:-translate-y-1 transition-transform">
          <span className="material-symbols-outlined text-3xl text-primary-container mb-3">construction</span>
          <div className="font-stat-number text-stat-number text-on-surface">{stats.services}</div>
          <div className="font-label-bold text-label-bold text-on-surface-variant">Hizmetler</div>
        </Link>
        <Link href="/admin/projeler" className="glass-panel p-6 rounded-lg hover:-translate-y-1 transition-transform">
          <span className="material-symbols-outlined text-3xl text-primary-container mb-3">photo_library</span>
          <div className="font-stat-number text-stat-number text-on-surface">{stats.projects}</div>
          <div className="font-label-bold text-label-bold text-on-surface-variant">Projeler</div>
        </Link>
        <Link href="/admin/mesajlar" className="glass-panel p-6 rounded-lg hover:-translate-y-1 transition-transform">
          <span className="material-symbols-outlined text-3xl text-primary-container mb-3">mail</span>
          <div className="font-stat-number text-stat-number text-on-surface">{stats.messages}</div>
          <div className="font-label-bold text-label-bold text-on-surface-variant">Toplam Mesaj</div>
        </Link>
        <Link href="/admin/mesajlar" className="glass-panel p-6 rounded-lg hover:-translate-y-1 transition-transform border-primary-container/30">
          <span className="material-symbols-outlined text-3xl text-primary-container mb-3">mark_email_unread</span>
          <div className="font-stat-number text-stat-number text-primary-container">{stats.unread}</div>
          <div className="font-label-bold text-label-bold text-on-surface-variant">Okunmamış Mesaj</div>
        </Link>
      </div>
    </div>
  );
}
