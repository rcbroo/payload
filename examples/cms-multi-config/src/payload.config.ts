import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

import { Users } from './payload/collections/Users'
import { Media } from './payload/collections/Media'
import { Pages } from './payload/collections/Pages'

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
    filename: process.env.SQLITE_DB_FILE || './.data/sqlite.db',
  }),
  sharp,
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
