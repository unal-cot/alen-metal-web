"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface ProjectImage {
  url: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  active: boolean;
  images: ProjectImage[];
}

export function ProjectsGallery() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch("/api/projects").then((r) => r.json()).then(setProjects);
  }, []);

  const activeProjects = projects.filter((p) => p.active);

  const coverImage = (p: Project) => p.images?.[0]?.url || p.imageUrl;

  if (activeProjects.length === 0) return null;

  return (
    <section className="py-20 px-margin-mobile md:px-margin-desktop">
      <div className="max-w-container-max mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display-lg text-display-lg text-primary-container mb-4">Projelerimiz</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Tamamladığımız projelerden örnekler. Kalite ve güvenin bir arada olduğu çalışmalarımız.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {activeProjects.slice(0, 6).map((p) => (
            <Link key={p.id} href="/galeri" className="group relative rounded-lg overflow-hidden border border-outline-variant/30 cursor-pointer aspect-[4/3]">
              <img
                src={coverImage(p)}
                alt={p.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {p.images?.length > 1 && (
                <span className="absolute top-2 right-2 bg-black/60 text-white text-xs font-label-bold px-2 py-1 rounded z-10">
                  +{p.images.length - 1}
                </span>
              )}
              <div className="absolute inset-0 card-gradient flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="font-label-bold text-label-bold text-primary-container">{p.category}</span>
                <h3 className="font-headline-lg text-headline-lg text-on-surface mt-1">{p.title}</h3>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/galeri"
            className="inline-flex items-center gap-2 bg-primary-container text-on-primary-container font-label-bold text-label-bold px-8 py-3 rounded hover:bg-primary-container/90 transition-all shadow-lg shadow-black/20 glow-hover"
          >
            Tüm Projeleri Gör
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
