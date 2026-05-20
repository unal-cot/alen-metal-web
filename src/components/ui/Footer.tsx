"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface SiteConfig {
  footer_description?: string;
  copyright?: string;
}

export function Footer() {
  const [cfg, setCfg] = useState<SiteConfig>({});

  useEffect(() => {
    fetch("/api/site-config").then((r) => r.json()).then(setCfg);
  }, []);

  return (
    <footer className="w-full py-16 px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row justify-between items-start gap-gutter bg-surface-container-lowest border-t border-outline-variant/20">
      <div className="flex flex-col gap-4 max-w-sm">
        <div className="flex items-center gap-4">
          <img src="/logo.png?v=5" alt="ALEN METAL" style={{ height: "112px", width: "auto", objectFit: "contain" }} />
          <span className="font-headline-lg text-headline-lg font-bold text-primary-container">
            ALEN METAL
          </span>
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant">
          {cfg.footer_description || "Güçlü Yapılar, Güvenli Yarınlar."}
        </p>
        <p className="font-label-bold text-label-bold text-primary-container mt-4">
          {cfg.copyright || "© 2024 Alen Metal. Güçlü Yapılar, Güvenli Yarınlar."}
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <h4 className="font-headline-lg text-headline-lg text-on-surface text-xl">Hızlı Linkler</h4>
        <Link href="/hizmetler" className="font-body-md text-body-md text-on-surface-variant hover:text-primary-container hover:translate-x-1 transition-all duration-200">Hizmetlerimiz</Link>
        <Link href="/kurumsal" className="font-body-md text-body-md text-on-surface-variant hover:text-primary-container hover:translate-x-1 transition-all duration-200">Kurumsal</Link>
        <Link href="/galeri" className="font-body-md text-body-md text-on-surface-variant hover:text-primary-container hover:translate-x-1 transition-all duration-200">Galeri</Link>
        <Link href="/#iletisim" className="font-body-md text-body-md text-on-surface-variant hover:text-primary-container hover:translate-x-1 transition-all duration-200">İletişim</Link>
      </div>
      <div className="flex flex-col gap-4">
        <h4 className="font-headline-lg text-headline-lg text-on-surface text-xl">Yasal</h4>
        <Link href="/gizlilik-politikasi" className="font-body-md text-body-md text-on-surface-variant hover:text-primary-container hover:translate-x-1 transition-all duration-200">Gizlilik Politikası</Link>
        <Link href="/kullanim-kosullari" className="font-body-md text-body-md text-on-surface-variant hover:text-primary-container hover:translate-x-1 transition-all duration-200">Kullanım Koşulları</Link>
      </div>
    </footer>
  );
}
