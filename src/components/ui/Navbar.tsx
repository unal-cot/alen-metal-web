"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/hizmetler", label: "Hizmetlerimiz" },
  { href: "/kurumsal", label: "Kurumsal" },
  { href: "/galeri", label: "Galeri" },
  { href: "/iletisim", label: "İletişim" },
];

const LOGO_VERSION = "?v=5";

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      {/* Desktop Nav */}
      <nav className="fixed top-0 left-0 w-full z-[100] hidden md:flex justify-between items-center px-margin-desktop h-24 bg-secondary-container/70 backdrop-blur-md border-b border-outline-variant/30 shadow-md">
        <Link href="/" className="flex items-center gap-4 hover:opacity-90 transition-opacity">
          <img
            src={`/logo.png${LOGO_VERSION}`}
            alt="ALEN METAL"
            style={{ height: "88px", width: "auto", objectFit: "contain" }}
          />
          <span className="font-headline-xl text-headline-xl font-bold tracking-tighter text-primary-container">
            ALEN METAL
          </span>
        </Link>
        <div className="flex items-center gap-gutter">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-label-bold text-label-bold pb-1 transition-colors ${
                  isActive
                    ? "text-primary-container border-b-2 border-primary-container"
                    : "text-on-surface hover:text-primary-container"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
        <div>
          <Link href="/iletisim" className="bg-primary-container text-on-primary-container font-label-bold text-label-bold px-6 py-3 rounded hover:bg-primary-container/90 transition-colors shadow-lg shadow-black/20 glow-hover">
            Teklif Al
          </Link>
        </div>
      </nav>

      {/* Mobile Nav */}
      <nav className="fixed top-0 left-0 w-full z-[100] flex md:hidden justify-between items-center px-margin-mobile h-20 bg-secondary-container/70 backdrop-blur-md border-b border-outline-variant/30">
        <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
          <img
            src={`/logo.png${LOGO_VERSION}`}
            alt="ALEN METAL"
            style={{ height: "56px", width: "auto", objectFit: "contain" }}
          />
          <span className="font-headline-lg-mobile text-headline-lg-mobile font-bold tracking-tighter text-primary-container">
            ALEN METAL
          </span>
        </Link>
        <button onClick={() => setMobileOpen(true)} className="text-primary-container">
          <span className="material-symbols-outlined text-3xl">menu</span>
        </button>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[200] md:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-72 bg-secondary-container border-l border-outline-variant/30 shadow-2xl flex flex-col p-6 animate-[slideIn_0.2s_ease-out]">
            <div className="flex justify-between items-center mb-8">
              <span className="font-headline-lg text-headline-lg text-primary-container font-bold">Menü</span>
              <button onClick={() => setMobileOpen(false)} className="text-on-surface-variant hover:text-primary-container transition-colors">
                <span className="material-symbols-outlined text-3xl">close</span>
              </button>
            </div>
            <div className="flex flex-col gap-1 flex-1">
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`font-label-bold text-label-bold px-4 py-3 rounded transition-colors ${
                      isActive
                        ? "bg-primary-container/15 text-primary-container"
                        : "text-on-surface hover:bg-surface-container-high hover:text-primary-container"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
            <Link
              href="/iletisim"
              onClick={() => setMobileOpen(false)}
              className="bg-primary-container text-on-primary-container font-label-bold text-label-bold px-6 py-4 rounded hover:bg-primary-container/90 transition-all shadow-lg shadow-black/20 text-center mt-4"
            >
              Teklif Al
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
