// lib/sanity.client.ts
import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-10-01', // oder dein aktuelles Datum
  useCdn: true, // true = schneller, nur Lesezugriffe
})
