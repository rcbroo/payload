import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  versions: {
    drafts: true,
  },
  access: {
    read: ({ req }) => {
      if (req.user) return true
      return {
        _status: {
          equals: 'published',
        },
      }
    },
  },
  fields: [
    {
      type: 'text',
      name: 'title',
      required: true,
    },
    {
      type: 'richText',
      name: 'content',
      required: true,
    },
  ],
}
