# ALEN METAL - Güvenlikte Kalite, İşte Güç!

ALEN METAL resmi web sitesi ve yönetim paneli. Metal güvenlik çözümleri, çit sistemleri, otomatik kapı ve dekoratif metal ürünleri.

## Teknolojiler

- **Frontend:** Next.js 16 (App Router) + Tailwind CSS v4
- **Backend:** Next.js API Routes + Prisma ORM
- **Database:** PostgreSQL 16
- **Auth:** NextAuth.js v5 (Credentials + JWT)
- **Tasarım:** "Industrial Precision" dark theme

## Kurulum

```bash
npm install
```

`.env` dosyası oluşturun:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/alen_metal"
NEXTAUTH_SECRET="rastgele-bir-string"
NEXTAUTH_URL="http://localhost:3000"
```

PostgreSQL Docker ile:

```bash
docker run -d --name alen-metal-postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=alen_metal -p 5432:5432 postgres:16
```

Migration ve seed:

```bash
npx prisma migrate dev --name init
npm run db:seed
```

## Geliştirme

```bash
npm run dev        # http://localhost:3000
npm run build      # Production build
npx prisma studio  # Veritabanı GUI
```

## Admin Paneli

`/admin/giris` — İçerik yönetimi, mesajlar, medya kütüphanesi, kullanıcı yönetimi.

**Varsayılan giriş:** `admin@alenmetal.com` / `admin123`

## Sayfalar

| Sayfa | Açıklama |
|-------|----------|
| `/` | Ana sayfa |
| `/hizmetler` | Hizmetler |
| `/kurumsal` | Kurumsal bilgiler |
| `/galeri` | Proje galerisi |
| `/iletisim` | İletişim formu |

## Proje Yapısı

```
src/
├── app/                    # Next.js App Router
│   ├── admin/              # Yönetim paneli
│   └── api/                # REST API
├── components/
│   ├── ui/                 # Navbar, Footer, GlassPanel
│   ├── sections/           # Hero, ServicesGrid, Advantages
│   └── admin/              # Sidebar
└── lib/                    # Prisma, Auth, Utils
prisma/                     # Schema ve migration'lar
```
