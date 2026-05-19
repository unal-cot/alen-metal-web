"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";

interface ProjectImage {
  url: string;
  order: number;
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

export default function GaleriPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [lightbox, setLightbox] = useState<{ project: Project; imageIndex: number } | null>(null);

  useEffect(() => {
    fetch("/api/projects").then((r) => r.json()).then(setProjects);
  }, []);

  const activeProjects = projects.filter((p) => p.active);

  const allImages = (p: Project): string[] => {
    if (p.images?.length) return p.images.map((i) => i.url);
    if (p.imageUrl) return [p.imageUrl];
    return [];
  };

  const openLightbox = (project: Project, index: number) => {
    setLightbox({ project, imageIndex: index });
  };

  const closeLightbox = () => setLightbox(null);

  const lightboxImages = lightbox ? allImages(lightbox.project) : [];
  const lightboxUrl = lightbox ? lightboxImages[lightbox.imageIndex] : "";

  const goNext = () => {
    if (!lightbox) return;
    setLightbox({ ...lightbox, imageIndex: (lightbox.imageIndex + 1) % lightboxImages.length });
  };

  const goPrev = () => {
    if (!lightbox) return;
    setLightbox({ ...lightbox, imageIndex: (lightbox.imageIndex - 1 + lightboxImages.length) % lightboxImages.length });
  };

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
              {activeProjects.map((item) => {
                const imgs = allImages(item);
                const coverImg = imgs[0];
                return (
                  <div key={item.id} className="glass-panel rounded-lg overflow-hidden group hover:-translate-y-1 transition-transform">
                    <div
                      className="aspect-[4/3] overflow-hidden cursor-pointer relative"
                      onClick={() => openLightbox(item, 0)}
                    >
                      <img
                        alt={item.title}
                        src={coverImg}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {imgs.length > 1 && (
                        <span className="absolute top-2 right-2 bg-black/60 text-white text-xs font-label-bold px-2 py-1 rounded">
                          +{imgs.length - 1}
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <span className="font-label-bold text-label-bold text-primary-container">{item.category}</span>
                      <h3 className="font-headline-lg text-headline-lg text-on-surface mt-1">{item.title}</h3>
                      {item.description && (
                        <p className="font-body-md text-body-md text-on-surface-variant mt-2 line-clamp-2">{item.description}</p>
                      )}
                      {imgs.length > 1 && (
                        <div className="flex gap-2 mt-3">
                          {imgs.map((url, i) => (
                            <img
                              key={i}
                              src={url}
                              alt=""
                              className="w-10 h-10 rounded object-cover cursor-pointer border border-outline-variant/30 hover:border-primary-container transition-colors"
                              onClick={(e) => { e.stopPropagation(); openLightbox(item, i); }}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-[300] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeLightbox}>
          <button onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-primary-container transition-colors z-10">
            <span className="material-symbols-outlined text-4xl">close</span>
          </button>

          {lightboxImages.length > 1 && (
            <>
              <button onClick={(e) => { e.stopPropagation(); goPrev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-primary-container transition-colors z-10 bg-black/30 rounded-full p-2">
                <span className="material-symbols-outlined text-4xl">chevron_left</span>
              </button>
              <button onClick={(e) => { e.stopPropagation(); goNext(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-primary-container transition-colors z-10 bg-black/30 rounded-full p-2">
                <span className="material-symbols-outlined text-4xl">chevron_right</span>
              </button>
            </>
          )}

          <div className="max-w-5xl max-h-[90vh] w-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <img src={lightboxUrl} alt={lightbox.project.title}
              className="w-full h-auto max-h-[78vh] object-contain rounded-lg" />
            <div className="text-center mt-4">
              <span className="font-label-bold text-label-bold text-primary-container">{lightbox.project.category}</span>
              <h3 className="font-headline-lg text-headline-lg text-on-surface mt-1">{lightbox.project.title}</h3>
              {lightboxImages.length > 1 && (
                <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                  {lightbox.imageIndex + 1} / {lightboxImages.length}
                </p>
              )}
            </div>
            {/* Thumbnail strip */}
            {lightboxImages.length > 1 && (
              <div className="flex gap-2 mt-3">
                {lightboxImages.map((url, i) => (
                  <img key={i} src={url} alt=""
                    className={`w-12 h-12 rounded object-cover cursor-pointer border-2 transition-colors ${
                      i === lightbox.imageIndex ? "border-primary-container" : "border-transparent hover:border-outline-variant"
                    }`}
                    onClick={(e) => { e.stopPropagation(); setLightbox({ ...lightbox, imageIndex: i }); }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
