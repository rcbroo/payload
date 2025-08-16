import 'dotenv/config'
import payloadConfig from '../src/payload.config'
import { getPayload } from 'payload'

async function run() {
  const payload = await getPayload({ config: payloadConfig })

  const createAdmin = process.env.SEED_CREATE_ADMIN === 'true'
  const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@example.com'
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'Admin123!'

  if (createAdmin) {
    const existing = await payload.find({
      collection: 'users',
      where: { email: { equals: adminEmail } },
      limit: 1,
    })
    if (!existing.docs?.length) {
      await payload.create({
        collection: 'users',
        data: { email: adminEmail, password: adminPassword, roles: ['admin'] },
      })
    }
  }

  const ensurePage = async (title: string, slug: string) => {
    const existing = await payload.find({
      collection: 'pages',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    if (!existing.docs?.length) {
      await payload.create({
        collection: 'pages',
        data: { title, slug, _status: 'published' as const },
      })
    }
  }

  await ensurePage('Home', 'home')
  await ensurePage('About', 'about')
}

run().then(() => process.exit(0)).catch(() => process.exit(1))
