export default {
  name: 'seite',
  title: 'Seiten',
  type: 'document',
  fields: [
    { name: 'title', title: 'Seitentitel', type: 'string', validation: (r:any)=>r.required() },
    { name: 'slug',  title: 'Slug',  type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (r:any)=>r.required() },
    { name: 'body', title: 'Inhalt', type: 'array', of: [{ type: 'block' }] },
  ],
}
