# Project Convex Server on Docker

# Create a Node.js Project

npm init -y
npm i -S convex
npx convex dev
npx convex dev --configure new --dev-deployment local --once

# Start Localhost Docker

docker-compose up -d
docker-compose down

# Get an admin key

docker compose exec backend ./generate_admin_key.sh

# Enable Convex Authentication (Password provider)

npm install @convex-dev/auth @auth/core@0.41.1

# convex/schema.ts, convex/auth.ts, convex/auth.config.ts, convex/http.ts
# are already scaffolded for the Password provider. JWT_PRIVATE_KEY and
# JWKS are deployment-level env vars (not container env vars) — set them
# on the local self-hosted deployment with:
#
#   CONVEX_SELF_HOSTED_URL='http://localhost:3210' \
#   CONVEX_SELF_HOSTED_ADMIN_KEY='<from .env.local>' \
#   npx convex env set JWT_PRIVATE_KEY "..."
#   npx convex env set JWKS "..."
#
# (generate a fresh pair with the `generateKeys.mjs` script in
# node_modules/@convex-dev/auth's docs, or ask for one — see
# docs/pages/setup/manual.mdx in get-convex/convex-auth)

# Deploy on Render

# The backend needs two public origins (CONVEX_CLOUD_ORIGIN on 3210 and
# CONVEX_SITE_ORIGIN on 3211, the latter serving Convex Auth's HTTP
# actions/JWKS endpoint), but a single Render web service only exposes one
# public port. render.yaml therefore defines two services:
#
#   - convex-server       Dockerfile.backend, plan: starter (needs a
#                          persistent disk — Render's free plan has no
#                          disks, so backend data would be wiped on every
#                          idle spin-down). Public URL:
#                          https://convex-server.onrender.com
#   - convex-server-site   Dockerfile.site-proxy, a stateless Caddy proxy
#                          forwarding to convex-server's private port 3211.
#                          Stays on the free plan. Public URL:
#                          https://convex-server-site.onrender.com
#
# Deploy via a Render Blueprint pointed at this repo (render.yaml), then
# generate an admin key on convex-server the same way as local:
#
#   render ssh convex-server -- ./generate_admin_key.sh


# Render Dashboard

maxchip@outlook.com

https://convex-server.onrender.com

http://localhost:6791/

# first time to create the admin key

openssl rand -hex 32

add this key to render environment keys as INSTANCE_SECRET

docker run --rm \
  -e INSTANCE_SECRET='9cf3b2bbe3fc4ce81759390083a4b41040dc04631ad3dda4d9dcfe3ed09b8d92' \
  --entrypoint ./generate_admin_key.sh \
  ghcr.io/get-convex/convex-backend:latest

add the admin key to render environment keys as CONVEX_SELF_HOSTED_ADMIN_KEY

# to open the dashboard

docker run -e 'NEXT_PUBLIC_DEPLOYMENT_URL=https://convex-server.onrender.com' -p '6791:6791' ghcr.io/get-convex/convex-dashboard:latest

# Update convex schema

add to env.local CONVEX_SELF_HOSTED_URL NEXT_PUBLIC_DEPLOYMENT_URL CONVEX_SELF_HOSTED_ADMIN_KEY

npx convex deploy
