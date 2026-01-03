import type { StructureBuilder } from 'sanity/structure'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Inhalte')
    .items([
      // Alle Document-Types automatisch listen
      ...S.documentTypeListItems(),
      // Oder gezielt sortieren/gruppieren:
      // S.documentTypeListItem('post').title('Blogposts'),
      // S.documentTypeListItem('angebot').title('Angebote'),
      // S.documentTypeListItem('seite').title('Seiten'),
    ])
