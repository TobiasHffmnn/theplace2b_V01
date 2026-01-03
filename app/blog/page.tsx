import Link from 'next/link'
import { groq } from 'next-sanity'
import { client } from '@/sanity/lib/client'

export async function BlogTeaserSection() {
  // 👉 Nur Posts mit showOnLanding == true
  const posts = await client.fetch(
    groq`*[_type == "post" && showOnLanding == true] 
          | order(publishedAt desc)[0...3]{
      _id,
      title,
      slug,
      excerpt,
      publishedAt
    }`
  )

  return (
    <section id="texte" className="mx-auto max-w-5xl px-6 py-16">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-semibold">Texte</h2>
          <p className="mt-2 text-sm text-neutral-400">
            Ausgewählte Beiträge aus meinem Blog.
          </p>
        </div>
        <Link
          href="/blog"
          className="text-xs text-neutral-400 hover:text-white underline underline-offset-4"
        >
          alle Texte ansehen
        </Link>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {posts.map((post: any) => (
          <Link
            key={post._id}
            href={`/blog/${post.slug.current}`}
            className="rounded-2xl border border-neutral-800 bg-neutral-950/50 p-5 hover:border-neutral-600 hover:bg-neutral-900/40 transition"
          >
            <h3 className="text-base font-medium text-neutral-50">
              {post.title}
            </h3>
            {post.publishedAt && (
              <p className="mt-1 text-xs text-neutral-500">
                {new Date(post.publishedAt).toLocaleDateString('de-DE')}
              </p>
            )}
            {post.excerpt && (
              <p className="mt-2 text-sm text-neutral-300">
                {post.excerpt}
              </p>
            )}
          </Link>
        ))}

        {posts.length === 0 && (
          <p className="text-sm text-neutral-500">
            Noch keine Texte ausgewählt.
          </p>
        )}
      </div>
    </section>
  )
}
