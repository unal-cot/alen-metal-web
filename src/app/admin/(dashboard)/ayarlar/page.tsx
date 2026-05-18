"use client";

import { useEffect, useState } from "react";

export default function AyarlarAdminPage() {
  const [config, setConfig] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/site-config").then((r) => r.json()).then(setConfig);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/site-config", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(config),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const set = (key: string, value: string) => setConfig((prev) => ({ ...prev, [key]: value }));

  return (
    <div>
      <h1 className="font-headline-xl text-headline-xl text-on-surface mb-8">Site Ayarları</h1>
      <form onSubmit={handleSubmit} className="glass-panel p-6 rounded-lg space-y-4 max-w-2xl">
        <div>
          <label className="font-label-bold text-label-bold text-on-surface block mb-2">Tagline</label>
          <input value={config.tagline || ""} onChange={(e) => set("tagline", e.target.value)}
            className="w-full bg-surface-container border border-outline-variant rounded px-4 py-2 text-on-surface focus:border-primary-container focus:outline-none"
            placeholder="Güvenlikte Kalite, İşte Güç!" />
        </div>
        <div>
          <label className="font-label-bold text-label-bold text-on-surface block mb-2">Hero Açıklama</label>
          <textarea value={config.hero_description || ""} onChange={(e) => set("hero_description", e.target.value)} rows={3}
            className="w-full bg-surface-container border border-outline-variant rounded px-4 py-2 text-on-surface focus:border-primary-container focus:outline-none resize-none" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-label-bold text-label-bold text-on-surface block mb-2">Telefon 1</label>
            <input value={config.phone_1 || ""} onChange={(e) => set("phone_1", e.target.value)}
              className="w-full bg-surface-container border border-outline-variant rounded px-4 py-2 text-on-surface focus:border-primary-container focus:outline-none"
              placeholder="0530 845 1754" />
          </div>
          <div>
            <label className="font-label-bold text-label-bold text-on-surface block mb-2">Telefon 2</label>
            <input value={config.phone_2 || ""} onChange={(e) => set("phone_2", e.target.value)}
              className="w-full bg-surface-container border border-outline-variant rounded px-4 py-2 text-on-surface focus:border-primary-container focus:outline-none"
              placeholder="0541 204 2908" />
          </div>
        </div>
        <div>
          <label className="font-label-bold text-label-bold text-on-surface block mb-2">Footer Açıklama</label>
          <textarea value={config.footer_description || ""} onChange={(e) => set("footer_description", e.target.value)} rows={2}
            className="w-full bg-surface-container border border-outline-variant rounded px-4 py-2 text-on-surface focus:border-primary-container focus:outline-none resize-none" />
        </div>
        <div>
          <label className="font-label-bold text-label-bold text-on-surface block mb-2">Adres</label>
          <input value={config.address || ""} onChange={(e) => set("address", e.target.value)}
            className="w-full bg-surface-container border border-outline-variant rounded px-4 py-2 text-on-surface focus:border-primary-container focus:outline-none"
            placeholder="İstanbul, Türkiye" />
        </div>
        <div>
          <label className="font-label-bold text-label-bold text-on-surface block mb-2">Copyright Metni</label>
          <input value={config.copyright || ""} onChange={(e) => set("copyright", e.target.value)}
            className="w-full bg-surface-container border border-outline-variant rounded px-4 py-2 text-on-surface focus:border-primary-container focus:outline-none"
            placeholder="© 2024 Alen Metal. Güçlü Yapılar, Güvenli Yarınlar." />
        </div>
        <button type="submit"
          className="bg-primary-container text-on-primary-container font-label-bold text-label-bold px-6 py-2 rounded hover:bg-primary-container/90 transition-colors">
          {saved ? "Kaydedildi!" : "Kaydet"}
        </button>
      </form>
    </div>
  );
}
