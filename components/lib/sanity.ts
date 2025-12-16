import { createClient } from '@sanity/client'

export const sanity = createClient({
  projectId: "12122025",
  dataset: "production",
  apiVersion: "2023-10-10",
  useCdn: true
})
