import type { Metadata } from 'next'
import config from '@payload-config'
import { RootPage, generatePageMetadata } from '@payloadcms/next/views'
import { importMap } from '../importMap.js'

export const metadata: Metadata = generatePageMetadata({ config })

export default async function AdminPage(props: any) {
  return RootPage({
    ...props,
    config,
    importMap,
  })
}
