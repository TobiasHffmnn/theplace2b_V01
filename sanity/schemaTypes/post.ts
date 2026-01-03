export default {
  name: 'post',
  title: 'Blogposts',
  type: 'document',
  fields: [
    { name: 'title', title: 'Titel', type: 'string', validation: (r:any)=>r.required() },
    { name: 'slug',  title: 'Slug',  type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (r:any)=>r.required() },
    { name: 'publishedAt', title: 'Veröffentlicht am', type: 'datetime' },
    { name: 'excerpt', title: 'Teaser', type: 'text' },
    { name: 'cover', title: 'Titelbild', type: 'image', options: { hotspot: true } },
    { name: 'body', title: 'Inhalt', type: 'array', of: [{ type: 'block' }] },
    { name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] },
	{ name: 'showOnLanding', title: 'Auf Startseite zeigen?', type: 'boolean', initialValue: false },
  ],
  preview: { select: { title: 'title', media: 'cover' } },
}
