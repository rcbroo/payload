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
    <main style={{ padding: 24, maxWidth: 800, margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ color: '#333', marginBottom: 24 }}>{home?.title || 'Home'}</h1>
      {home?.content && (
        <div style={{ lineHeight: 1.6, color: '#555' }}>
          {home.content.root?.children?.map((child: any, index: number) => (
            <p key={index} style={{ marginBottom: 16 }}>
              {child.children?.[0]?.text}
            </p>
          ))}
        </div>
      )}
      {!home && (
        <div style={{ padding: 20, backgroundColor: '#f5f5f5', borderRadius: 8 }}>
          <p>No content found. Open <a href="/admin" style={{ color: '#0066cc' }}>/admin</a> to create your first page.</p>
        </div>
      )}
    </main>
  )
}
