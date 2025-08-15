# CMS Multi-Config Example (Phase 1: CMS)

A Next.js + Payload example that uses only existing Payload UI/UX (no custom admin UI). This demonstrates the CMS configuration with env-gated scaffolds for Netflix OSS microservices, Clerk, Convex, Storj (Uplink-first), Bunny CDN, and optional AI orchestration via camel-ai/owl.

- Admin UI: served entirely via @payloadcms/next using Payload’s Default admin
- Collections: Users (auth), Media (uploads with optional CDN URL rewrite), Pages (draft/publish)
- Database: SQLite for local development
- Runtimes: pnpm or Bun supported

Quick Start
1) cp .env.example .env
2) pnpm install (or bun install)
3) pnpm generate:types
4) pnpm generate:importmap
5) PAYLOAD_SECRET=test pnpm dev
6) Open http://localhost:3000/admin and create the first user

Build locally
- PAYLOAD_SECRET=test pnpm build

Scripts
- pnpm dev
- pnpm build
- pnpm generate:types
- pnpm generate:importmap

Environment
Required
- PAYLOAD_SECRET
- NEXT_PUBLIC_SERVER_URL (default http://localhost:3000)
- SQLITE_DB_FILE (default ./.data/sqlite.db)

Optional (env-gated)
- Clerk
  - CLERK_PUBLISHABLE_KEY
  - CLERK_SECRET_KEY
- Convex
  - CONVEX_DEPLOYMENT
  - CONVEX_SITE_URL
- Storj (Uplink-first)
  - STORJ_ENABLE=false
  - STORJ_BUCKET
  - STORJ_ACCESS
  - STORJ_SECRET
- Bunny CDN
  - BUNNY_CDN_BASE_URL
- Netflix OSS / Gateway
  - EUREKA_URL=http://localhost:8761/eureka
  - GATEWAY_HYSTRIX_ENABLED=false
- Netflix Conductor
  - CONDUCTOR_URL=http://localhost:7101
- camel-ai/owl adapter
  - OWL_ENABLED=false
  - OWL_ADAPTER_URL=http://localhost:7010

What’s included (Phase 1 scaffolds)
- gRPC microservices stubs and proto/ definitions
- Java Zuul/Ribbon API gateway with Hystrix circuit-breaking (env-gated) and Eureka discovery
- Optional orchestration via Netflix Conductor
- Optional AI orchestration bridge via owl-adapter
- Polyglot service stubs for Node, Python, Rust, and Go
- Docker Compose for optional services
- CI workflow that type-checks, generates Payload import map, and builds this example

Admin UI and Routes
- The admin is provided via Payload’s existing UI:
  - src/app/(payload)/admin/[[...slug]]/page.tsx exports the default admin from @payloadcms/next
- No custom admin components are added
- Root layout is defined to satisfy Next.js App Router:
  - src/app/layout.tsx re-exports the segment layout at src/app/(payload)/layout.tsx

Docker Compose (optional services)
From the repo root:
- docker compose build
- docker compose up eureka conductor-server conductor-ui owl-adapter java-gateway node-cms

Service UIs
- Eureka: http://localhost:8761
- Conductor UI: http://localhost:5000

Notes and Constraints
- UI/UX strictly reuses Payload components; no custom admin UI introduced
- No AWS usage; storage via Storj, CDN via Bunny
- Optional integrations are disabled by default and controlled via environment variables
- Provide real credentials in your local .env to activate optional services

Where to look
- Next.js app: examples/cms-multi-config
- Proto definitions: proto/
- Services: services/
- Docker Compose: docker-compose.yml
