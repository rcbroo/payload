import type { CollectionConfig } from 'payload'

const withCdn = (url?: string): string | undefined => {
  const base = process.env.BUNNY_CDN_BASE_URL
  if (!base || !url) return url
  try {
    const u = new URL(url, process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000')
    const cdn = new URL(base)
    u.protocol = cdn.protocol
    u.host = cdn.host
    return u.toString()
  } catch {
    return url
  }
}

export const Media: CollectionConfig = {
  slug: 'media',
  upload: true,
  access: {
    read: () => true,
  },
  fields: [],
  hooks: {
    afterRead: [
      ({ doc }) => {
        if (doc && doc.url) {
          doc.url = withCdn(doc.url)
        }
        return doc
      },
    ],
  },
}
