"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  active: boolean;
}

export default function GaleriPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch("/api/projects").then((r) => r.json()).then(setProjects);
  }, []);

  const activeProjects = projects.filter((p) => p.active);

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <h1 className="font-display-lg text-display-lg text-primary-container mb-4">Galeri</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-12 max-w-2xl">
            Tamamladığımız projelerden örnekler ve ürünlerimizin detaylı görselleri.
          </p>
          {activeProjects.length === 0 ? (
            <p className="text-on-surface-variant font-body-md text-center py-20">
              Henüz proje eklenmedi. Admin panelinden galeriye proje ekleyebilirsiniz.
            </p>
          ) : (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-gutter space-y-gutter">
              {activeProjects.map((item) => (
                <div
                  key={item.id}
                  className="break-inside-avoid group relative rounded-lg overflow-hidden border border-outline-variant/30 cursor-pointer"
                >
                  <img
                    alt={item.title}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                    src={item.imageUrl}
                  />
                  <div className="absolute inset-0 card-gradient flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="font-label-bold text-label-bold text-primary-container">{item.category}</span>
                    <h3 className="font-headline-lg text-headline-lg text-on-surface">{item.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
