import type { Metadata } from 'next'
import config from '@payload-config'
import { NotFoundPage, generatePageMetadata } from '@payloadcms/next/views'
import { importMap } from '../importMap.js'

export const metadata: Metadata = generatePageMetadata({ config })

export default function AdminNotFound() {
  return NotFoundPage({ config, importMap })
}
