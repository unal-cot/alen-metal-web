"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const links = [
  { href: "/admin", label: "Dashboard", icon: "dashboard" },
  { href: "/admin/hizmetler", label: "Hizmetler", icon: "construction" },
  { href: "/admin/projeler", label: "Projeler", icon: "photo_library" },
  { href: "/admin/istatistikler", label: "İstatistikler", icon: "bar_chart" },
  { href: "/admin/mesajlar", label: "Mesajlar", icon: "mail" },
  { href: "/admin/medya", label: "Medya", icon: "perm_media" },
  { href: "/admin/kullanicilar", label: "Kullanıcılar", icon: "people" },
  { href: "/admin/ayarlar", label: "Ayarlar", icon: "settings" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-surface-container-low border-r border-outline-variant/30 p-4 flex flex-col">
      <Link href="/admin" className="flex items-center gap-3 mb-8 hover:opacity-90 transition-opacity">
        <img src="/logo.png?v=5" alt="ALEN METAL" style={{ height: "80px", width: "auto", objectFit: "contain" }} />
        <span className="font-headline-lg text-headline-lg text-primary-container">ALEN METAL</span>
      </Link>
      <nav className="flex flex-col gap-1 flex-1">
        {links.map((link) => {
          const active = pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href));
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded text-body-md font-body-md transition-colors ${
                active
                  ? "bg-primary-container/15 text-primary-container"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
              }`}
            >
              <span className="material-symbols-outlined text-xl">{link.icon}</span>
              {link.label}
            </Link>
          );
        })}
      </nav>
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="flex items-center gap-3 px-3 py-2.5 rounded text-on-surface-variant hover:text-error hover:bg-surface-container-high transition-colors font-label-bold text-label-bold"
      >
        <span className="material-symbols-outlined text-xl">logout</span>
        Çıkış Yap
      </button>
    </aside>
  );
}
