"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { GlassPanel } from "@/components/ui/GlassPanel";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string | null;
  order: number;
  active: boolean;
}

export default function HizmetlerPage() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    fetch("/api/services").then((r) => r.json()).then(setServices);
  }, []);

  const activeServices = services.filter((s) => s.active);

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <h1 className="font-display-lg text-display-lg text-primary-container mb-4">Hizmetlerimiz</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-12 max-w-2xl">
            Metal gücümüz ve tecrübemizle, yaşam alanlarınız için güvenli çözümler üretiyoruz.
          </p>
          {activeServices.length === 0 ? (
            <p className="text-on-surface-variant font-body-md text-center py-20">
              Henüz hizmet eklenmedi.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter max-w-7xl mx-auto">
              {activeServices.map((s) => {
                const featureList = s.features
                  ? s.features.split(",").map((f) => f.trim()).filter(Boolean)
                  : [];
                return (
                  <GlassPanel key={s.id} className="hover:-translate-y-1 transition-transform">
                    <span className="material-symbols-outlined text-4xl text-primary-container mb-4">
                      {s.icon}
                    </span>
                    <h3 className="font-headline-lg text-headline-lg text-on-surface mb-3">{s.title}</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant mb-4">{s.description}</p>
                    {featureList.length > 0 && (
                      <ul className="space-y-2">
                        {featureList.map((f) => (
                          <li key={f} className="flex items-center gap-2 font-label-bold text-label-bold text-on-surface-variant">
                            <span className="material-symbols-outlined text-sm text-primary-container">check</span>
                            {f}
                          </li>
                        ))}
                      </ul>
                    )}
                  </GlassPanel>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
