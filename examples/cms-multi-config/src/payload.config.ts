import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

import { Users } from './payload/collections/Users.js'
import { Media } from './payload/collections/Media.js'
import { Pages } from './payload/collections/Pages.js'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
  },
  editor: lexicalEditor(),
  collections: [Users, Media, Pages],
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || process.env.SQLITE_DB_FILE || 'file:' + path.resolve(dirname, '.data/sqlite.db'),
    },
  }),
  sharp,
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  cors: [
    process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
  ],
})
