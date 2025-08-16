import config from '@payload-config'
import { getPayload } from 'payload'

export default async function Page() {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    limit: 1,
    depth: 0,
  })
  const home = result.docs?.[0] as any
  return (
    <main style={{ padding: 24 }}>
      <h1>{home?.title || 'Home'}</h1>
      {!home && <p>Open /admin to create your first page.</p>}
    </main>
  )
}
