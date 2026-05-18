"use client";

import { useState } from "react";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { GlassPanel } from "@/components/ui/GlassPanel";

export default function IletisimPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/contact-messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setLoading(false);
    setSubmitted(true);
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <h1 className="font-display-lg text-display-lg text-primary-container mb-4">İletişim</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-12 max-w-2xl">
            Bizimle iletişime geçin. Projeleriniz için ücretsiz keşif ve fiyat teklifi alın.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            <div>
              {submitted ? (
                <GlassPanel className="text-center py-12">
                  <span className="material-symbols-outlined text-5xl text-primary-container mb-4">check_circle</span>
                  <h3 className="font-headline-lg text-headline-lg text-on-surface mb-2">Mesajınız Gönderildi!</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                    En kısa sürede size dönüş yapacağız.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="bg-primary-container text-on-primary-container font-label-bold text-label-bold px-6 py-2 rounded hover:bg-primary-container/90 transition-colors"
                  >
                    Yeni Mesaj Gönder
                  </button>
                </GlassPanel>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label className="font-label-bold text-label-bold text-on-surface block mb-2">Ad Soyad</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-surface-container border border-outline-variant rounded px-4 py-3 text-on-surface font-body-md focus:border-primary-container focus:outline-none transition-colors"
                      placeholder="Adınız ve soyadınız"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="font-label-bold text-label-bold text-on-surface block mb-2">E-posta</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full bg-surface-container border border-outline-variant rounded px-4 py-3 text-on-surface font-body-md focus:border-primary-container focus:outline-none transition-colors"
                        placeholder="ornek@mail.com"
                      />
                    </div>
                    <div>
                      <label className="font-label-bold text-label-bold text-on-surface block mb-2">Telefon</label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full bg-surface-container border border-outline-variant rounded px-4 py-3 text-on-surface font-body-md focus:border-primary-container focus:outline-none transition-colors"
                        placeholder="05XX XXX XX XX"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="font-label-bold text-label-bold text-on-surface block mb-2">Mesajınız</label>
                    <textarea
                      rows={5}
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full bg-surface-container border border-outline-variant rounded px-4 py-3 text-on-surface font-body-md focus:border-primary-container focus:outline-none transition-colors resize-none"
                      placeholder="Projeniz hakkında bilgi verin..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-primary-container text-on-primary-container font-label-bold text-label-bold px-8 py-4 rounded hover:bg-primary-container/90 transition-all shadow-lg shadow-black/20 glow-hover disabled:opacity-50"
                  >
                    {loading ? "Gönderiliyor..." : "Gönder"}
                  </button>
                </form>
              )}
            </div>
            <div className="space-y-6">
              <GlassPanel>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-2xl text-primary-container">person</span>
                  <div>
                    <div className="font-label-bold text-label-bold text-on-surface">Ali Berkant Karabulut</div>
                    <a href="tel:05308451754" className="font-body-md text-body-md text-primary-container hover:underline">0530 845 1754</a>
                  </div>
                </div>
              </GlassPanel>
              <GlassPanel>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-2xl text-primary-container">person</span>
                  <div>
                    <div className="font-label-bold text-label-bold text-on-surface">Engin TOPGÜL</div>
                    <a href="tel:05412042908" className="font-body-md text-body-md text-primary-container hover:underline">0541 204 2908</a>
                  </div>
                </div>
              </GlassPanel>
              <GlassPanel>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-2xl text-primary-container">location_on</span>
                  <div>
                    <div className="font-label-bold text-label-bold text-on-surface">Adres</div>
                    <div className="font-body-md text-body-md text-on-surface-variant">İstanbul, Türkiye</div>
                  </div>
                </div>
              </GlassPanel>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
