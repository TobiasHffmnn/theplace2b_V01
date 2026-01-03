export default {
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    { name: 'title', title: 'SEO Title', type: 'string' },
    { name: 'description', title: 'Meta Description', type: 'text' },
    { name: 'ogImage', title: 'OpenGraph Bild', type: 'image', options: { hotspot: true } },
  ],
}
