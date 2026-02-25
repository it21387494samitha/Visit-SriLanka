import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { fetchBlogPost } from '@/lib/api'

type Props = { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await fetchBlogPost(params.slug)
  if (!post) return {}
  return {
    title: post.meta_title ?? post.title,
    description: post.meta_description ?? post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.meta_title ?? post.title,
      description: post.meta_description ?? post.excerpt,
      publishedTime: post.published_at,
      authors: [post.author?.name],
      images: post.og_image ? [{ url: post.og_image }] : [],
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const post = await fetchBlogPost(params.slug)
  if (!post) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    author: { '@type': 'Person', name: post.author?.name },
    datePublished: post.published_at,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`,
    image: post.og_image ?? undefined,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="font-heading text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex gap-3 text-sm text-gray-500 mb-8">
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
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </>
  )
}
