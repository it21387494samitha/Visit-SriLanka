# Visit Sri Lanka 🌴

A tourism website for Sri Lanka built with a **Laravel + Filament** backend and a **Next.js** frontend, served via **Cloudflare CDN**.

---

## Architecture

```
Visit-SriLanka/
├── backend/   ← Laravel 11 API + Filament admin panel
└── frontend/  ← Next.js 14 (App Router) public site
```

| Layer        | Technology                         | URL                           |
|--------------|------------------------------------|-------------------------------|
| API          | Laravel 11 + Sanctum               | `http://localhost:8000`       |
| Admin panel  | Filament v3                        | `http://localhost:8000/admin` |
| Public site  | Next.js 14 (App Router)            | `http://localhost:3000`       |
| CDN          | Cloudflare                         | Production                    |

---

## Backend Setup

### Requirements
- PHP 8.2+
- Composer
- MySQL 8+ (or SQLite for local dev)

### Install

```bash
cd backend
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate
php artisan db:seed

# Create an admin user
php artisan make:filament-user

# Serve
php artisan serve
```

Open the admin panel at **http://localhost:8000/admin**

### Key packages
| Package | Purpose |
|---------|---------|
| `filament/filament` v3 | Admin CRUD panel |
| `spatie/laravel-medialibrary` | Image uploads |
| `spatie/laravel-sluggable` | Auto-generate slugs |
| `laravel/sanctum` | API token auth |

### Filament Resources
- **Destinations** – places to visit with geo, province, and SEO fields
- **Hotels** – accommodation with star ratings and amenities
- **Tours** – multi-day packages with itinerary and pricing
- **Categories** – organise destinations
- **Blog Posts** – travel articles with full SEO meta

---

## Frontend Setup

### Requirements
- Node.js 20+
- npm / pnpm

### Install

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

Open the site at **http://localhost:3000**

### Key pages
| Route | Description |
|-------|-------------|
| `/` | Homepage with featured destinations |
| `/destinations` | All destinations (paginated) |
| `/destinations/[slug]` | Individual destination + JSON-LD |
| `/hotels` | Hotel listing |
| `/hotels/[slug]` | Hotel detail + JSON-LD |
| `/tours` | Tour listing |
| `/tours/[slug]` | Tour detail + JSON-LD |
| `/blog` | Travel blog |
| `/blog/[slug]` | Article + JSON-LD |
| `/about` | About page |
| `/contact` | Contact form |
| `/sitemap.xml` | Auto-generated sitemap |
| `/robots.txt` | Search engine directives |

### SEO features
- `generateMetadata()` on every page (title, description, OG, Twitter cards)
- JSON-LD structured data (`TouristDestination`, `Hotel`, `TouristTrip`, `BlogPosting`)
- Dynamic `sitemap.ts` pulls slugs from the Laravel API
- `robots.ts` – blocks admin and API paths
- Cloudflare CDN cache headers for static assets
- ISR (Incremental Static Regeneration) on all API fetches (`revalidate: 60`)

---

## Cloudflare CDN

1. Point your domain's DNS to Cloudflare.
2. Enable **Cloudflare Images** for optimised image delivery.
3. Update `NEXT_PUBLIC_SITE_URL` and the `remotePatterns` in `frontend/next.config.ts`.
4. Set `APP_URL` in `backend/.env` to your production domain.
5. The `Cache-Control: public, max-age=31536000, immutable` header is already applied to Next.js static assets.

---

## Environment Variables

### Backend (`backend/.env`)
| Variable | Description |
|----------|-------------|
| `APP_URL` | Laravel app URL |
| `DB_*` | Database credentials |
| `FRONTEND_URL` | Allowed CORS origin |
| `FILAMENT_FILESYSTEM_DISK` | Storage disk for Filament uploads |

### Frontend (`frontend/.env.local`)
| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Public site URL (used in sitemap/OG) |
| `NEXT_PUBLIC_API_URL` | Laravel backend URL |