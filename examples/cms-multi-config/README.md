# CMS Multi-Config Example

- Next.js + Payload using only existing Payload admin UI via @payloadcms/next/routes
- Collections: Users, Media, Pages
- Optional integrations toggled by envs

## Scripts
- pnpm generate:types
- pnpm generate:importmap
- pnpm build
- pnpm dev

## Env
See .env.example for optional toggles:
- BUNNY_CDN_BASE_URL
- EUREKA_URL, GATEWAY_HYSTRIX_ENABLED
- CONDUCTOR_URL
- OWL_ENABLED, OWL_ADAPTER_URL

## Docker services
- docker compose build
- docker compose up eureka conductor-server conductor-ui owl-adapter java-gateway node-cms

Eureka UI: http://localhost:8761
Conductor UI: http://localhost:5000
# CMS Multi-Configuration Example (Phase 1: CMS)

This example demonstrates a functional Payload CMS running inside a Next.js app using only existing Payload UI components.

Key features:
- Collections: Users (auth), Media (uploads), Pages (draft/publish)
- Database: SQLite (local dev-friendly)
- Bun support: use Bun or pnpm to run
- Integration stubs: Clerk, Convex, gRPC, Storj, Bunny (env-driven, optional)

Quick start
1. cp .env.example .env
2. pnpm install (or bun install)
3. pnpm dev (or bun run dev)
4. Open http://localhost:3000/admin to create the first user

Environment variables
- PAYLOAD_SECRET
- SQLITE_DB_FILE (default ./.data/sqlite.db)
- NEXT_PUBLIC_SERVER_URL
- CLERK_PUBLISHABLE_KEY, CLERK_SECRET_KEY (optional)
- CONVEX_* (optional)
- STORJ_* (optional), BUNNY_CDN_BASE_URL (optional)

Integrations (stubs)
- Clerk: add middleware and server-side checks in a follow-up step with your keys
- Convex: initialize a convex/ folder and connect; live updates can be toggled
- gRPC: see services/ and proto/ folders in repo root for microservice scaffolding
- Storj: use S3-compatible gateway or Uplink; default disabled
- Bunny: set BUNNY_CDN_BASE_URL to rewrite media URLs via CDN

Notes
- Admin UI uses only components from Payload
- No secrets are committed
