import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { Server, ServerCredentials, loadPackageDefinition } from '@grpc/grpc-js'
import { loadSync as loadProtobufSync } from '@grpc/proto-loader'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const protoPath = path.resolve(dirname, '../../proto/cms.proto')
const packageDef = loadProtobufSync(protoPath, {
  enums: String,
  longs: String,
  defaults: true,
  oneofs: true,
})
const grpcObj = loadPackageDefinition(packageDef) as any
const cmsPkg = grpcObj.cms

const server = new Server()

server.addService(cmsPkg.CMSProcessing.service, {
  ProcessContent: (call: any, callback: any) => {
    const { content_id, content_text } = call.request
    const summary = (content_text || '').slice(0, 120)
    callback(null, { content_id, summary, ok: true })
  },
})

const port = process.env.PORT || '50051'
server.bindAsync(`0.0.0.0:${port}`, ServerCredentials.createInsecure(), () => {
  server.start()
})
