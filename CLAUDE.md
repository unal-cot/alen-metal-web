# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Current State (2026-05-18)

**What's working:**
- All public pages: Ana Sayfa, Hizmetler (5 services), Kurumsal, Galeri, İletişim
- Admin panel: Dashboard, Services/Projects/Stats CRUD, Messages, Media, Users, Settings
- Contact form submits to DB, admin sees messages at `/admin/mesajlar` with phone + email
- PostgreSQL in Docker container `alen-metal-postgres` on port 5432
- Logo at `public/logo.png` (PNG, transparent bg). Used with plain `<img>` tags (NOT next/image — avoids caching issues). Sizes via inline `style={{ height }}`. Cache-busting with `?v=5` query param.

**Recent changes:**
- Removed "Çelik Konstrüksiyon" from all pages and DB
- Removed StatsSection (istatistikler) from homepage and kurumsal
- Navbar active link highlighting works (usePathname)
- ALEN METAL logo links to home page
- Gallery fetches from `/api/projects` (6 seed projects)
- Logo is 88px desktop nav, 56px mobile nav, 112px footer, 180px login

## Project

ALEN METAL premium web design — React/Next.js full-stack app with admin panel and PostgreSQL. Turkish company in metal fabrication & security solutions (fencing, gates, steel construction).

## Commands

```bash
npm run dev          # Development server (localhost:3000)
npm run build        # Production build
npm run lint         # ESLint
npm run db:migrate   # Prisma migrate dev
npm run db:push      # Prisma db push (skip migrations)
npm run db:seed      # Seed DB (admin user, services, stats, config)
npm run db:studio    # Prisma Studio GUI
```

## Architecture

**Stack:** Next.js 16 (App Router) + Tailwind CSS v4 + Prisma v6 + PostgreSQL + NextAuth.js v5

**Design system:** Dark-only "Industrial Precision" theme from `DESIGN.md` (parent project). Metallic Gold (#FFD700) primary, deep anthracite surfaces, Montserrat/Inter fonts, glassmorphism effects. All theme tokens in `src/app/globals.css` via Tailwind v4 `@theme` directive.

```
src/
├── app/
│   ├── page.tsx                    # Ana Sayfa (public)
│   ├── {hizmetler,kurumsal,galeri,iletisim}/page.tsx
│   ├── admin/
│   │   ├── giris/page.tsx          # Login (no sidebar)
│   │   └── (dashboard)/           # Route group — pages with sidebar
│   │       ├── layout.tsx          # Admin layout (Sidebar + content)
│   │       └── {page,hizmetler,projeler,istatistikler,
│   │           kullanicilar,mesajlar,medya,ayarlar}/
│   └── api/                        # REST: services, projects, stats,
│       site-config, contact-messages, media, users, auth
├── components/
│   ├── ui/                         # Navbar, Footer, GlassPanel
│   ├── sections/                   # Hero, Advantages, ServicesGrid, StatsSection
│   └── admin/                      # Sidebar
├── lib/
│   ├── prisma.ts                   # Prisma client singleton
│   ├── auth.ts                     # NextAuth config (Credentials + JWT)
│   └── utils.ts                    # cn() helper
└── proxy.ts                        # Protects /admin/* → redirects to /admin/giris
```

**Key patterns:**
- Public pages are server components; admin pages are `"use client"` with fetch-based CRUD
- Public GET endpoints are open; write operations check `auth()` from NextAuth
- `/api/users` restricted to ADMIN role; other admin APIs accept any authenticated user
- NextAuth v5 beta with Credentials provider; JWT callback stores `role`
- File uploads → `public/uploads/` via `/api/media`

**Database:** PostgreSQL + Prisma. Models: User (ADMIN|EDITOR), Service, Project, Stat, SiteConfig, ContactMessage, Media. See `prisma/schema.prisma`.

## Auth

Login at `/admin/giris`. Default seed admin: `admin@alenmetal.com` / `admin123`.

## Language

All UI is Turkish. Key terms: Teklif Al (Get Quote), Detayları Gör (See Details), Gönder (Submit), Çıkış Yap (Logout).
