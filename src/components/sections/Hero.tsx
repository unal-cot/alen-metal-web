"use client";

import { useEffect, useState } from "react";

interface HeroConfig {
  tagline?: string;
  hero_description?: string;
  hero_image_url?: string;
  phone_1?: string;
}

const DEFAULT_HERO_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuA353CKxl5bI0gk8uvabHaHTch4K72ByMLEZtAsIsooGwaJlqIdn0iAugUYqzeu1s9Y1CgQd86iEsk2o7OMgSVuI02EbbQHe-JKzwvBRrYPWffROa7a05dTNn1jX_b6djUWun45oYYy2HCLUMkF7hWgimsbYP9nSVr-9S5l6JsUCRts9RxuM_1-QAgJGtjYlwnNf1N0yTxGN0P7aiRb6ax4NsZphF268zOcUJdGU0YYp43kQahbklMRbzovTem12ZjOxKkJt0DKYSEL";

export function Hero() {
  const [cfg, setCfg] = useState<HeroConfig>({});

  useEffect(() => {
    fetch("/api/site-config").then((r) => r.json()).then(setCfg);
  }, []);

  const phone = cfg.phone_1?.replace(/\s/g, "") || "05308451754";

  return (
    <header className="relative h-screen min-h-[800px] flex items-center pt-20">
      <div className="absolute inset-0 z-0">
        <img
          alt="Hero Background"
          className="w-full h-full object-cover"
          src={cfg.hero_image_url || DEFAULT_HERO_IMAGE}
        />
        <div className="absolute inset-0 hero-overlay" />
      </div>
      <div className="relative z-10 w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="max-w-2xl">
          <h1 className="font-display-lg text-display-lg text-primary-container mb-6 drop-shadow-lg">
            {cfg.tagline || "Güvenlikte Kalite, İşte Güç!"}
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface mb-10 max-w-xl">
            {cfg.hero_description || "Metal gücümüz ve tecrübemizle, yaşam alanlarınız için güvenli çözümler üretiyoruz. Dayanıklılık ve estetiği bir araya getiren premium uygulamalar."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/iletisim"
              className="bg-primary-container text-on-primary-container font-label-bold text-label-bold px-8 py-4 rounded hover:bg-primary-container/90 transition-all shadow-lg shadow-black/20 glow-hover w-full sm:w-auto text-center"
            >
              Teklif Al
            </a>
            <a
              href={`tel:${phone}`}
              className="bg-transparent border border-primary-container text-primary-container font-label-bold text-label-bold px-8 py-4 rounded hover:bg-primary-container/10 transition-all w-full sm:w-auto text-center flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">call</span>
              Bizi Ara
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
