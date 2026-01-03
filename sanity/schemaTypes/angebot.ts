export default {
  name: 'angebot',
  title: 'Angebote',
  type: 'document',
  fields: [
    { name: 'title', title: 'Titel', type: 'string', validation: (r:any)=>r.required() },
    { name: 'slug',  title: 'Slug',  type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (r:any)=>r.required() },
    { name: 'kurztext', title: 'Kurzbeschreibung', type: 'text' },

    // ⬇️ NEU: Häkchen, ob Detailseite verlinkt werden soll
    {
      name: 'showDetailPage',
      title: 'Detailseite verlinken?',
      type: 'boolean',
      description: 'Wenn aus, ist dieses Angebot auf der Startseite nicht klickbar.',
      initialValue: true,
    },

    { name: 'beschreibung', title: 'Beschreibung', type: 'array', of: [{ type: 'block' }] },
    { name: 'icon', title: 'Icon/Bild', type: 'image', options: { hotspot: true } },
    { name: 'preisHinweis', title: 'Preis/Modalitäten (Text)', type: 'string' },
			{
		  name: 'showPriceOnLanding',
		  title: 'Preis auf Startseite anzeigen?',
		  type: 'boolean',
		  description: 'Wenn an, wird der Preis/Preis-Hinweis im Angebot-Teaser auf der Startseite gezeigt.',
		  initialValue: false,
		},

	{ name: 'datum', title: 'Datum (optional)', type: 'datetime', description: 'Für Workshops / Events; leer lassen für laufende Angebote.' },
	{
  name: 'startzeit',
  title: 'Startzeit (optional)',
  type: 'string',
  description: 'z.B. 18:00 Uhr – wird auf der Detailseite angezeigt.',
},
{
  name: 'endzeit',
  title: 'Endzeit (optional)',
  type: 'string',
  description: 'z.B. 20:30 Uhr – wird auf der Detailseite angezeigt.',
},
{
  name: 'ort',
  title: 'Ort (optional)',
  type: 'string',
  description: 'z.B. Berlin, Online, Zürich – wird neben dem Datum angezeigt.',
},


    // ⬇️ NEU: Button-Text und Link für die Detailseite
    {
      name: 'ctaText',
      title: 'Button-Text (optional)',
      type: 'string',
      description: 'z.B. "Jetzt anfragen" oder "Hier buchen".',
    },
    {
      name: 'ctaUrl',
      title: 'Button-Link (optional)',
      type: 'string',
      description: 'z.B. mailto:hallo@theplace2b.org oder https://dein-buchungslink.de',
    },


  ],
}
