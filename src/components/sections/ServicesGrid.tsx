"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  imageUrl: string | null;
  features: string | null;
  order: number;
  active: boolean;
}

export function ServicesGrid() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    fetch("/api/services").then((r) => r.json()).then(setServices);
  }, []);

  const featured = services.slice(0, 3);
  const moreServices = services.slice(3);

  return (
    <section className="py-20 bg-surface-container-low">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <h2 className="font-headline-xl text-headline-xl text-primary-container mb-12 text-center">
          HİZMETLERİMİZ
        </h2>
        {services.length === 0 ? (
          <p className="text-on-surface-variant font-body-md text-center py-12">Henüz hizmet eklenmedi.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
              {featured.map((s) => (
                <Link
                  key={s.id}
                  href="/hizmetler"
                  className="group relative h-80 rounded-lg overflow-hidden border border-outline-variant/30 cursor-pointer block"
                >
                  {s.imageUrl ? (
                    <img
                      alt={s.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      src={s.imageUrl}
                    />
                  ) : (
                    <div className="w-full h-full bg-surface-container-high flex items-center justify-center">
                      <span className="material-symbols-outlined text-6xl text-primary-container/30">{s.icon}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 card-gradient flex flex-col justify-end p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="material-symbols-outlined text-primary-container">{s.icon}</span>
                      <h3 className="font-headline-lg text-headline-lg text-on-surface">{s.title}</h3>
                    </div>
                    <p className="font-body-md text-body-md text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-0 group-hover:h-auto overflow-hidden">
                      {s.description}
                    </p>
                    <span className="text-primary-container font-label-bold text-label-bold mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
                      Detayları Gör{" "}
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            {moreServices.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8 max-w-3xl mx-auto">
                {moreServices.map((s) => (
                  <Link
                    key={s.id}
                    href="/hizmetler"
                    className="glass-panel p-4 rounded-lg flex items-center gap-3 hover:bg-surface-container-high transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-primary-container">{s.icon}</span>
                    <span className="font-label-bold text-label-bold text-on-surface">{s.title}</span>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
