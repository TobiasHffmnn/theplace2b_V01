'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'

type PostDetail = {
  title: string
  excerpt?: string
  body?: any[]
  publishedAt?: string
  cover?: { asset?: { url?: string } }
  tags?: string[]
}

// Datum hübsch formatiert anzeigen
function formatDate(dateString?: string) {
  if (!dateString) return null
  const d = new Date(dateString)
  if (isNaN(d.getTime())) return null

  return d.toLocaleDateString('de-DE', {
    weekday: 'short',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

export default function BlogPostPage() {
  const pathname = usePathname()

  // slug = letzter Teil der URL, z.B. "inner-drivers" bei /blog/inner-drivers
  const slug = pathname?.split('/').filter(Boolean).pop() || null

  const [post, setPost] = useState<PostDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) {
      setError('Kein Slug in der URL gefunden.')
      setIsLoading(false)
      return
    }

    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

    if (!projectId || !dataset) {
      console.error('Sanity ENV Variablen fehlen')
      setError('Konfiguration für Sanity fehlt.')
      setIsLoading(false)
      return
    }

    // GROQ-Query direkt als String mit Slug – wie bei den Workshops
    const query = encodeURIComponent(`*[_type == "post" && slug.current == "${slug}"][0]{
      title,
      excerpt,
      body,
      publishedAt,
      cover{asset->{url}},
      tags
    }`)

    const url = `https://${projectId}.api.sanity.io/v2023-10-01/data/query/${dataset}?query=${query}`

    async function fetchPost() {
      try {
        const res = await fetch(url)
        if (!res.ok) throw new Error('HTTP ' + res.status)
        const data = await res.json()
        setPost(data.result ?? null)
      } catch (err) {
        console.error(err)
        setError('Beitrag konnte nicht geladen werden.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchPost()
  }, [slug])

  // Ladezustand
  if (isLoading) {
    return (
      <main className="bg-black text-neutral-100 min-h-screen">
        <section className="mx-auto max-w-3xl px-6 py-16">
          <p className="text-neutral-400 text-sm">Lade Text …</p>
        </section>
      </main>
    )
  }

  // Fehlerzustand
  if (error) {
    return (
      <main className="bg-black text-neutral-100 min-h-screen">
        <section className="mx-auto max-w-3xl px-6 py-16">
          <h1 className="text-2xl font-semibold mb-4">Fehler</h1>
          <p className="text-neutral-400">{error}</p>
          <p className="mt-6">
            <Link
              href="/blog"
              className="text-sm text-neutral-400 hover:text-white underline underline-offset-4"
            >
              ← zurück zu den Texten
            </Link>
          </p>
        </section>
      </main>
    )
  }

  // Nichts gefunden – hier zeigen wir zusätzlich den Slug, damit du siehst, was gesucht wurde
  if (!post) {
    return (
      <main className="bg-black text-neutral-100 min-h-screen">
        <section className="mx-auto max-w-3xl px-6 py-16">
          <h1 className="text-2xl font-semibold mb-4">Kein Beitrag gefunden</h1>
          <p className="text-neutral-400">
            Es wurde kein Beitrag für diese URL gefunden.
          </p>
          <p className="mt-2 text-neutral-500 text-sm">
            (gesuchter Slug: <code>{slug}</code>)
          </p>
          <p className="mt-6">
            <Link
              href="/blog"
              className="text-sm text-neutral-400 hover:text-white underline underline-offset-4"
            >
              ← zurück zu den Texten
            </Link>
          </p>
        </section>
      </main>
    )
  }

  const formattedDate = formatDate(post.publishedAt)

  return (
    <main className="bg-black text-neutral-100 min-h-screen">
      {/* Header wie auf der Startseite / Angebotsdetailseite */}
      <header className="sticky top-0 z-30 bg-black/70 backdrop-blur supports-[backdrop-filter]:bg-black/50">
        <div className="mx-auto max-w-5xl px-6 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="text-sm tracking-wide text-neutral-300 hover:text-white transition"
          >
            theplace2b
          </Link>
          <nav className="flex gap-6 text-sm text-neutral-400">
            <a className="hover:text-white transition" href="/#angebote">
              angebote
            </a>
            <a className="hover:text-white transition" href="/#texte">
              texte
            </a>
            <a className="hover:text-white transition" href="/#uebermich">
              über mich
            </a>
            <a className="hover:text-white transition" href="/#kontakt">
              kontakt
            </a>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-3xl px-6 py-16">
        {/* Zurück-Link */}
        <Link
          href="/blog"
          className="text-sm text-neutral-400 hover:text-white underline underline-offset-4"
        >
          ← zurück zu den Texten
        </Link>

        {/* Titel */}
        <h1 className="mt-6 text-3xl md:text-4xl font-semibold">
          {post.title}
        </h1>

        {/* Datum + Tags */}
        {(formattedDate || (post.tags && post.tags.length > 0)) && (
          <div className="mt-3 text-sm text-neutral-500 flex flex-wrap gap-3 items-center">
            {formattedDate && <span>{formattedDate}</span>}
            {post.tags && post.tags.length > 0 && (
              <span className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-neutral-700 px-3 py-1 text-xs uppercase tracking-wide"
                  >
                    {tag}
                  </span>
                ))}
              </span>
            )}
          </div>
        )}

        {/* Excerpt */}
        {post.excerpt && (
          <p className="mt-4 text-neutral-300">
            {post.excerpt}
          </p>
        )}
		

        {/* Coverbild */}
        {post.cover?.asset?.url && (
          <div className="mt-8">
            <img
              src={post.cover.asset.url}
              alt=""
              className="w-full max-h-80 object-cover rounded-2xl border border-neutral-800"
            />
          </div>
        )}

        {/* Inhalt (Richtext) */}
        {post.body && post.body.length > 0 && (
          <div className="mt-10 prose prose-invert prose-neutral max-w-none">
            <PortableText
              value={post.body}
              components={{
                types: {
                  image: ({ value }) =>
                    value?.asset?.url ? (
                      <img
                        src={value.asset.url}
                        alt=""
                        className="my-6 rounded-xl border border-neutral-800"
                      />
                    ) : null,
                },
                block: {
                  normal: ({ children }) => (
                    <p className="mb-4 text-neutral-200 leading-relaxed">
                      {children}
                    </p>
                  ),
                  h2: ({ children }) => (
                    <h2 className="mt-8 mb-4 text-2xl font-semibold text-white">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="mt-6 mb-3 text-xl font-semibold text-white">
                      {children}
                    </h3>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-neutral-700 pl-4 italic text-neutral-400 my-4">
                      {children}
                    </blockquote>
                  ),
                },
                marks: {
                  strong: ({ children }) => (
                    <strong className="font-semibold text-white">
                      {children}
                    </strong>
                  ),
                  em: ({ children }) => <em className="italic">{children}</em>,
                  link: ({ value, children }) => (
                    <a
                      href={value?.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2 text-neutral-300 hover:text-white"
                    >
                      {children}
                    </a>
                  ),
                },
                list: {
                  bullet: ({ children }) => (
                    <ul className="list-disc ml-6 mt-2 mb-4 space-y-1 text-neutral-200">
                      {children}
                    </ul>
                  ),
                  number: ({ children }) => (
                    <ol className="list-decimal ml-6 mt-2 mb-4 space-y-1 text-neutral-200">
                      {children}
                    </ol>
                  ),
                },
                listItem: {
                  bullet: ({ children }) => <li>{children}</li>,
                  number: ({ children }) => <li>{children}</li>,
                },
              }}
            />
          </div>
        )}
      </section>
    </main>
  )
}
