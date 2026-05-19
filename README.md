# ALEN METAL — Güvenlikte Kalite, İşte Güç!

ALEN METAL resmi web sitesi ve yönetim paneli. Metal güvenlik çözümleri, çit sistemleri, otomatik kapı ve dekoratif metal ürünleri için full-stack kurumsal web uygulaması.

## Özellikler

**Ziyaretçi (Public)**
- Ana sayfa: Hero, Avantajlar, Hizmetler, Proje Galerisi
- Hizmetler sayfası — her hizmet için ikon, görsel, açıklama ve özellik listesi
- Kurumsal sayfası — misyon, vizyon, neden biz
- Proje galerisi — kategorilere göre proje görselleri
- İletişim formu — isim, e-posta, telefon ve mesaj alanları, DB'ye kaydedilir
- Gizlilik Politikası ve Kullanım Koşulları sayfaları
- Responsive tasarım (mobil/tablet/masaüstü)

**Admin Paneli (`/admin`)**
- Dashboard — genel bakış
- Hizmetler CRUD — ikon seçici, bilgisayardan görsel yükleme, özellik listesi
- Projeler CRUD — çoklu görsel desteği
- İstatistikler CRUD
- Mesajlar — gelen iletişim formu mesajlarını görüntüleme
- Medya kütüphanesi — dosya yükleme / listeleme / silme
- Kullanıcı yönetimi (ADMIN yetkisi gerektirir)
- Site ayarları — hero, iletişim bilgileri, kurumsal metinler

## Teknolojiler

| Alan | Teknoloji |
|------|-----------|
| Framework | Next.js 16 (App Router) |
| Dil | TypeScript |
| Stil | Tailwind CSS v4 |
| ORM | Prisma v6 |
| Veritabanı | PostgreSQL 16 |
| Auth | NextAuth.js v5 (Credentials + JWT) |
| Tasarım | "Industrial Precision" dark theme |
| İkonlar | Google Material Symbols |

## Hızlı Başlangıç

### 1. Bağımlılıkları yükle

```bash
npm install
```

### 2. Ortam değişkenleri

`.env` dosyası oluşturun:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/alen_metal"
NEXTAUTH_SECRET="rastgele-güvenli-bir-string"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. PostgreSQL başlat (Docker)

```bash
docker run -d \
  --name alen-metal-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=alen_metal \
  -p 5432:5432 \
  postgres:16
```

### 4. Veritabanı migration ve seed

```bash
npx prisma migrate dev --name init
npm run db:seed
```

Seed verileri: admin kullanıcı, 9 hizmet, 3 istatistik, 6 proje, site yapılandırması.

### 5. Geliştirme sunucusu

```bash
npm run dev          # http://localhost:3000
```

## Komutlar

| Komut | Açıklama |
|-------|----------|
| `npm run dev` | Geliştirme sunucusu (Turbopack) |
| `npm run build` | Production build |
| `npm start` | Production sunucusu |
| `npm run lint` | ESLint |
| `npm run db:migrate` | Prisma migrate dev |
| `npm run db:push` | Prisma db push (migration'sız) |
| `npm run db:seed` | Veritabanı seed |
| `npm run db:studio` | Prisma Studio GUI |

## Sayfalar

| Yol | Sayfa | Erişim |
|-----|-------|--------|
| `/` | Ana Sayfa | Herkese açık |
| `/hizmetler` | Hizmetlerimiz | Herkese açık |
| `/kurumsal` | Kurumsal | Herkese açık |
| `/galeri` | Proje Galerisi | Herkese açık |
| `/iletisim` | İletişim | Herkese açık |
| `/gizlilik-politikasi` | Gizlilik Politikası (KVKK) | Herkese açık |
| `/kullanim-kosullari` | Kullanım Koşulları | Herkese açık |
| `/admin/giris` | Admin Girişi | Herkese açık |
| `/admin` | Dashboard | Oturum gerekli |
| `/admin/hizmetler` | Hizmet Yönetimi | Oturum gerekli |
| `/admin/projeler` | Proje Yönetimi | Oturum gerekli |
| `/admin/istatistikler` | İstatistik Yönetimi | Oturum gerekli |
| `/admin/mesajlar` | Gelen Mesajlar | Oturum gerekli |
| `/admin/medya` | Medya Kütüphanesi | Oturum gerekli |
| `/admin/kullanicilar` | Kullanıcı Yönetimi | ADMIN yetkisi |
| `/admin/ayarlar` | Site Ayarları | Oturum gerekli |

## API

| Endpoint | Metod | Yetki |
|----------|-------|-------|
| `/api/services` | GET | Açık |
| `/api/services` | POST / PUT / DELETE | Oturum |
| `/api/projects` | GET | Açık |
| `/api/projects` | POST / PUT / DELETE | Oturum |
| `/api/stats` | GET | Açık |
| `/api/stats` | POST / PUT / DELETE | Oturum |
| `/api/site-config` | GET | Açık |
| `/api/site-config` | POST / PUT | Oturum |
| `/api/contact-messages` | GET | Oturum |
| `/api/contact-messages` | POST | Açık |
| `/api/media` | GET | Oturum |
| `/api/media` | POST | Oturum |
| `/api/users` | Tümü | ADMIN |
| `/api/auth/[...nextauth]` | — | NextAuth |

## Veritabanı Modelleri

| Model | Alanlar |
|-------|---------|
| User | id, name, email, password, role (ADMIN\|EDITOR) |
| Service | id, title, description, icon, imageUrl, features, order, active |
| Project | id, title, description, imageUrl, category, active, images[] |
| ProjectImage | id, url, order, projectId |
| Stat | id, label, value, order, active |
| SiteConfig | id, key, value |
| ContactMessage | id, name, email, phone, message, read |
| Media | id, filename, url, size, mimeType |

## Klasör Yapısı

```
src/
├── app/
│   ├── page.tsx                     # Ana Sayfa
│   ├── hizmetler/page.tsx           # Hizmetler
│   ├── kurumsal/page.tsx            # Kurumsal
│   ├── galeri/page.tsx              # Proje Galerisi
│   ├── iletisim/page.tsx            # İletişim
│   ├── gizlilik-politikasi/         # KVKK Gizlilik Politikası
│   ├── kullanim-kosullari/          # Kullanım Koşulları
│   ├── admin/
│   │   ├── giris/page.tsx           # Login (sidebar yok)
│   │   └── (dashboard)/            # Route group — sidebar'lı
│   │       ├── layout.tsx           # Admin layout
│   │       ├── page.tsx             # Dashboard
│   │       ├── hizmetler/           # Hizmet CRUD
│   │       ├── projeler/            # Proje CRUD
│   │       ├── istatistikler/       # İstatistik CRUD
│   │       ├── mesajlar/            # Mesajlar
│   │       ├── medya/               # Medya
│   │       ├── kullanicilar/       # Kullanıcılar
│   │       └── ayarlar/             # Site Ayarları
│   ├── api/                         # REST API endpoints
│   └── uploads/[...file]/          # Dosya serve route'u
├── components/
│   ├── ui/                          # Navbar, Footer, GlassPanel
│   ├── sections/                    # Hero, ServicesGrid, Advantages
│   └── admin/                       # Sidebar
└── lib/                             # Prisma, Auth, Utils

prisma/                              # Schema, migration, seed
storage/uploads/                     # Yüklenen dosyalar (gitignore)
```

## Admin Girişi

- URL: `http://localhost:3000/admin/giris`
- E-posta: `admin@alenmetal.com`
- Şifre: `admin123`
- Rol: ADMIN

## Tasarım

Dark-only "Industrial Precision" teması:
- **Primary:** Metallic Gold #FFD700
- **Yüzeyler:** Derin antrasit tonları
- **Font:** Montserrat (başlık), Inter (gövde)
- **Efektler:** Glassmorphism, card gradient, glow hover
- Tüm tema token'ları `src/app/globals.css` içinde Tailwind v4 `@theme` direktifi ile tanımlı

## Dil

Tüm arayüz Türkçe. Anahtar terimler: Teklif Al, Detayları Gör, Gönder, Çıkış Yap.
