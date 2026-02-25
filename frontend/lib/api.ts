const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'

async function apiFetch<T>(
  path: string,
  params?: Record<string, string | number | boolean | undefined>,
  options?: RequestInit
): Promise<T> {
  const url = new URL(`${API_BASE}/api/v1${path}`)

  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== '') url.searchParams.set(k, String(v))
    })
  }

  const res = await fetch(url.toString(), {
    next: { revalidate: 60 }, // ISR – revalidate every minute
    ...options,
  })

  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${path}`)
  }

  return res.json() as Promise<T>
}

// ── Destinations ─────────────────────────────────────────────────────────────

export async function fetchDestinations(params?: Record<string, any>) {
  return apiFetch<{ data: any[]; meta: any }>('/destinations', params)
}

export async function fetchDestination(slug: string) {
  try {
    return await apiFetch<any>(`/destinations/${slug}`)
  } catch {
    return null
  }
}

// ── Hotels ───────────────────────────────────────────────────────────────────

export async function fetchHotels(params?: Record<string, any>) {
  return apiFetch<{ data: any[]; meta: any }>('/hotels', params)
}

export async function fetchHotel(slug: string) {
  try {
    return await apiFetch<any>(`/hotels/${slug}`)
  } catch {
    return null
  }
}

// ── Tours ────────────────────────────────────────────────────────────────────

export async function fetchTours(params?: Record<string, any>) {
  return apiFetch<{ data: any[]; meta: any }>('/tours', params)
}

export async function fetchTour(slug: string) {
  try {
    return await apiFetch<any>(`/tours/${slug}`)
  } catch {
    return null
  }
}

// ── Blog ─────────────────────────────────────────────────────────────────────

export async function fetchBlogPosts(params?: Record<string, any>) {
  return apiFetch<{ data: any[]; meta: any }>('/blog', params)
}

export async function fetchBlogPost(slug: string) {
  try {
    return await apiFetch<any>(`/blog/${slug}`)
  } catch {
    return null
  }
}

// ── Categories ───────────────────────────────────────────────────────────────

export async function fetchCategories() {
  return apiFetch<any[]>('/categories')
}
