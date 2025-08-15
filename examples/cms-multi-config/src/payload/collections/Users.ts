import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  access: {
    read: ({ req }) => Boolean(req.user),
  },
  fields: [],
}
