'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'

type OfferDetail = {
  title: string
  kurztext?: string
  beschreibung?: any[]          // Richtext aus Sanity
  datum?: string
  ort?: string
  startzeit?: string
  endzeit?: string
  preisHinweis?: string
  icon?: { asset?: { url?: string } } // optionales Bild/Icon
    ctaText?: string      // NEU
  ctaUrl?: string       // NEU
}

// Datum hübsch formatiert anzeigen (z.B. So, 09.11.2025)
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

export default function AngebotDetailPage() {
  const pathname = usePathname()

  // slug = letzter Teil der URL, z.B. "InnerDrivers" bei /angebote/InnerDrivers
  const slug = pathname?.split('/').filter(Boolean).pop() || null

  const [offer, setOffer] = useState<OfferDetail | null>(null)
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

    // GROQ-Query direkt als String mit Slug
    const query = encodeURIComponent(`*[_type == "angebot" && slug.current == "${slug}"][0]{
      title,
      kurztext,
      beschreibung,
      datum,
      ort,
      startzeit,
      endzeit,
      preisHinweis,
	    ctaText,
  ctaUrl,
      icon{asset->{url}}
    }`)

    const url = `https://${projectId}.api.sanity.io/v2023-10-01/data/query/${dataset}?query=${query}`

    async function fetchOffer() {
      try {
        const res = await fetch(url)
        if (!res.ok) throw new Error('HTTP ' + res.status)
        const data = await res.json()
        setOffer(data.result ?? null)
      } catch (err) {
        console.error(err)
        setError('Angebot konnte nicht geladen werden.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchOffer()
  }, [slug])

  // Ladezustand
  if (isLoading) {
    return (
      <main className="bg-black text-neutral-100 min-h-screen">
		<section className="mx-auto max-w-3xl px-6 py-16 border-t border-neutral-800">
          <p className="text-neutral-400 text-sm">Lade Angebot …</p>
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
              href="/#angebote"
              className="text-sm text-neutral-400 hover:text-white underline underline-offset-4"
            >
              ← zurück zu den Angeboten
            </Link>
          </p>
        </section>
      </main>
    )
  }

  // Nichts gefunden
  if (!offer) {
    return (
      <main className="bg-black text-neutral-100 min-h-screen">
        <section className="mx-auto max-w-3xl px-6 py-16">
          <h1 className="text-2xl font-semibold mb-4">Kein Angebot gefunden</h1>
          <p className="text-neutral-400">
            Es wurde kein Angebot für diese URL gefunden.
          </p>
          <p className="mt-6">
            <Link
              href="/#angebote"
              className="text-sm text-neutral-400 hover:text-white underline underline-offset-4"
            >
              ← zurück zu den Angeboten
            </Link>
          </p>
        </section>
      </main>
    )
  }

  const formattedDate = formatDate(offer.datum)
  const dateAndPlace = [formattedDate, offer.ort].filter(Boolean).join(' · ')
  const timeRange = [offer.startzeit, offer.endzeit].filter(Boolean).join(' – ')

  return (
    <main className="bg-black text-neutral-100 min-h-screen">
      {/* Header wie auf der Startseite */}
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
          href="/#angebote"
          className="text-sm text-neutral-400 hover:text-white underline underline-offset-4"
        >
          ← zurück zu den Angeboten
        </Link>

        {/* Titel */}
        <h1 className="mt-6 text-3xl md:text-4xl font-semibold">
          {offer.title}
        </h1>

        {/* Kurzbeschreibung */}
        {offer.kurztext && (
          <p className="mt-4 text-neutral-300">
            {offer.kurztext}
          </p>
        )}

        {/* Optionales Bild/Icon */}
        {offer.icon?.asset?.url && (
          <div className="mt-8">
            <img
              src={offer.icon.asset.url}
              alt=""
              className="w-full max-h-72 object-cover rounded-2xl border border-neutral-800"
            />
          </div>
        )}

        {/* Meta-Infos in einem strukturierten Block */}
        <div className="mt-8">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-950/50 p-5 text-sm text-neutral-300 space-y-3">
            {dateAndPlace && (
              <p>
                <span className="block text-xs uppercase tracking-wide text-neutral-500">
                  Wann &amp; Wo
                </span>
                <span className="mt-1 inline-block text-neutral-200">
                  {dateAndPlace}
                </span>
              </p>
            )}

            {timeRange && (
              <p>
                <span className="block text-xs uppercase tracking-wide text-neutral-500">
                  Uhrzeit
                </span>
                <span className="mt-1 inline-block text-neutral-200">
                  {timeRange} Uhr
                </span>
              </p>
            )}

            {offer.preisHinweis && (
              <p>
                <span className="block text-xs uppercase tracking-wide text-neutral-500">
                  Beitrag / Modalitäten
                </span>
                <span className="mt-1 inline-block text-neutral-200">
                  {offer.preisHinweis}
                </span>
              </p>
            )}
          </div>
        </div>

        {/* Lange Beschreibung aus Sanity (Richtext) */}
                {/* Lange Beschreibung aus Sanity (Richtext) */}
        {offer.beschreibung && offer.beschreibung.length > 0 && (
          <div className="mt-10 prose prose-invert prose-neutral max-w-none">
            <PortableText
              value={offer.beschreibung}
              components={{
                // deine Custom-Components – die du vorher schon definiert hast
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
                    <p className="mb-4 text-neutral-200 leading-relaxed">{children}</p>
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
                    <strong className="font-semibold text-white">{children}</strong>
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

        {/* Call-to-Action-Button unten */}
        {offer.ctaText && offer.ctaUrl && (
          <div className="mt-12">
            <a
              href={offer.ctaUrl}
              // Bei https-Links im neuen Tab, bei mailto im selben
              target={offer.ctaUrl.startsWith('http') ? '_blank' : undefined}
              rel={offer.ctaUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-neutral-200 transition"
            >
              {offer.ctaText}
            </a>
          </div>
        )}
      </section>
    </main>

  )
}
