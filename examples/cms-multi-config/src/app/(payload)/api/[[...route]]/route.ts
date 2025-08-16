import config from '@payload-config'
import { REST_DELETE, REST_GET, REST_OPTIONS, REST_PATCH, REST_POST, REST_PUT } from '@payloadcms/next/routes'

const createHandler = (handler: any) => {
  return async (request: Request, context: any) => {
    try {
      let params = context?.params
      if (params && typeof params.then === 'function') {
        params = await params
      }
      
      if (params?.route && typeof params.route === 'string') {
        params = { ...params, route: [params.route] }
      }
      
      const newContext = { ...context, params }
      return await handler(request, newContext)
    } catch (error) {
      console.error('API Route Error:', error)
      return new Response(JSON.stringify({ error: 'Internal server error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      })
    }
  }
}

export const GET = createHandler(REST_GET(config))
export const POST = createHandler(REST_POST(config))
export const PUT = createHandler(REST_PUT(config))
export const PATCH = createHandler(REST_PATCH(config))
export const DELETE = createHandler(REST_DELETE(config))
export const OPTIONS = createHandler(REST_OPTIONS(config))

export const dynamic = 'force-dynamic'
