"use client";

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
        <button className="text-primary-container">
          <span className="material-symbols-outlined text-3xl">menu</span>
        </button>
      </nav>
    </>
  );
}
