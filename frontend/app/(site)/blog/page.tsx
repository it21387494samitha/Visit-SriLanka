import type { Metadata } from 'next'
import { fetchBlogPosts } from '@/lib/api'

export const metadata: Metadata = {
  title: 'Travel Blog',
  description: 'Travel tips, guides, and stories from Sri Lanka.',
  alternates: { canonical: '/blog' },
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined }
}) {
  const { data: posts } = await fetchBlogPosts({ ...searchParams, per_page: 10 })

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="font-heading text-4xl font-bold mb-8">Travel Blog</h1>
      <div className="space-y-8">
        {posts?.map((post: any) => (
          <article key={post.id} className="border-b pb-8">
            <a href={`/blog/${post.slug}`}>
              <h2 className="font-heading text-2xl font-bold hover:text-brand-600 transition">
                {post.title}
              </h2>
            </a>
            <div className="flex gap-3 text-sm text-gray-500 mt-2 mb-3">
              <span>{post.author?.name}</span>
              <span>·</span>
              <time dateTime={post.published_at}>
                {new Date(post.published_at).toLocaleDateString('en-LK', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
            <p className="text-gray-600">{post.excerpt}</p>
            <a
              href={`/blog/${post.slug}`}
              className="mt-3 inline-block text-brand-600 font-semibold hover:underline"
            >
              Read more →
            </a>
          </article>
        ))}
      </div>
    </div>
  )
}
