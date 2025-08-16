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

  const ensurePage = async (title: string, slug: string, content?: any) => {
    const existing = await payload.find({
      collection: 'pages',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    if (!existing.docs?.length) {
      await payload.create({
        collection: 'pages',
        data: { 
          title, 
          slug, 
          content: content || {
            root: {
              children: [
                {
                  children: [{ detail: 0, format: 0, mode: 'normal', style: '', text: `Welcome to the ${title} page!`, type: 'text', version: 1 }],
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                  type: 'paragraph',
                  version: 1
                }
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              type: 'root',
              version: 1
            }
          },
          _status: 'published' as const 
        },
      })
    }
  }

  await ensurePage('Home', 'home', {
    root: {
      children: [
        {
          children: [{ detail: 0, format: 0, mode: 'normal', style: '', text: 'Welcome to our CMS-powered homepage!', type: 'text', version: 1 }],
          direction: 'ltr',
          format: '',
          indent: 0,
          type: 'paragraph',
          version: 1
        },
        {
          children: [{ detail: 0, format: 0, mode: 'normal', style: '', text: 'This content is managed through Payload CMS and demonstrates the multi-config example with rich text content.', type: 'text', version: 1 }],
          direction: 'ltr',
          format: '',
          indent: 0,
          type: 'paragraph',
          version: 1
        },
        {
          children: [{ detail: 0, format: 0, mode: 'normal', style: '', text: 'You can edit this content through the admin panel at /admin.', type: 'text', version: 1 }],
          direction: 'ltr',
          format: '',
          indent: 0,
          type: 'paragraph',
          version: 1
        }
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      type: 'root',
      version: 1
    }
  })
  await ensurePage('About', 'about', {
    root: {
      children: [
        {
          children: [{ detail: 0, format: 0, mode: 'normal', style: '', text: 'About Our CMS Example', type: 'text', version: 1 }],
          direction: 'ltr',
          format: '',
          indent: 0,
          type: 'paragraph',
          version: 1
        },
        {
          children: [{ detail: 0, format: 0, mode: 'normal', style: '', text: 'This is a multi-config Payload CMS example showcasing how to build a content management system with Next.js 15 and modern web technologies.', type: 'text', version: 1 }],
          direction: 'ltr',
          format: '',
          indent: 0,
          type: 'paragraph',
          version: 1
        }
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      type: 'root',
      version: 1
    }
  })
}

run().then(() => process.exit(0)).catch(() => process.exit(1))
