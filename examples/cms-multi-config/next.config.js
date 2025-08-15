import { withPayload } from '@payloadcms/next/withPayload'

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.__NEXT_PRIVATE_ORIGIN || process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      ...[process.env.BUNNY_CDN_BASE_URL || NEXT_PUBLIC_SERVER_URL].filter(Boolean).map((item) => {
        try {
          const url = new URL(item)
          return {
            hostname: url.hostname,
            protocol: url.protocol.replace(':', ''),
          }
        } catch {
          return null
        }
      }).filter(Boolean),
    ],
  },
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }
    return config
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
