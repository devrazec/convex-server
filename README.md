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
  -e INSTANCE_SECRET='past_here_the_secret_generated' \
  --entrypoint ./generate_admin_key.sh \
  ghcr.io/get-convex/convex-backend:latest

add the admin key to render environment keys as CONVEX_SELF_HOSTED_ADMIN_KEY

# to open the dashboard

docker run -e 'NEXT_PUBLIC_DEPLOYMENT_URL=https://convex-server.onrender.com' -p '6791:6791' ghcr.io/get-convex/convex-dashboard:latest

# Update convex schema

add to env.local CONVEX_SELF_HOSTED_URL NEXT_PUBLIC_DEPLOYMENT_URL CONVEX_SELF_HOSTED_ADMIN_KEY

npx convex deploy

# Deploy on convex free account

npx convex login status

npx convex login --force

npx convex dev --once --configure new

npx convex deployment token create ci-token --save-env

npx convex dev

npx convex dev --once --configure existing --team devrazec --project jota --dev-deployment cloud

npx convex deploy

npx convex deploy --dry-run 2>&1 | head -60

# Create a new Convex DB to Lapidus App

Create a new .env.local file and add 4 keys

CONVEX_DEPLOY_KEY=''     // Get from your Convex Comtrol Panel Team Access Tokens https://dashboard.convex.dev/t/maxchip/settings/access-tokens

CONVEX_DEPLOYMENT=       // It will be add after the creation of the DB
CONVEX_URL=              // It will be add after the creation of the DB
CONVEX_SITE_URL=         // It will be add after the creation of the DB

npx convex login status                    // check if you are loged
npx convex dev --once --configure new      // Create the DB

Project name: lapidus
Europe (Ireland)
Created project lapidus, manage it at https://dashboard.convex.dev/t/maxchip/lapidus
? Set up Convex AI files? (guidelines, AGENTS.md, agent skills) (Y/n) n

copy the CONVEX_URL from the .env.local to the App.js DEFAULT_CONVEX_URL

# Setup Convex DB for E-JOTA
CONVEX_DEPLOY_KEY='dev:little-elephant-254|eyJ2MiI6IjRhZWEzNDljNzQ1NjQ3ZjA4YWZhZDlhYTkxYzNiMGI3In0='
CONVEX_DEPLOYMENT=dev:little-elephant-254 # team: maxchip, project: e-jota
CONVEX_URL=https://little-elephant-254.convex.cloud
CONVEX_SITE_URL=https://little-elephant-254.convex.site

# 1 - Setup Convex DB for Lapidus

CONVEX_DEPLOY_KEY="dev:posh-shrimp-946|eyJ2MiI6ImYyYWEyYWVlZDMxNTQ4M2JiZjMzZDlhNzg2YmRjOGNiIn0="
CONVEX_DEPLOYMENT=dev:posh-shrimp-946 # team: maxchip, project: lapidus
CONVEX_URL=https://posh-shrimp-946.eu-west-1.convex.cloud
CONVEX_SITE_URL=https://posh-shrimp-946.eu-west-1.convex.site

# 2 - Delete all records from a table

npx convex login status or npx convex login --force

npx convex import --table content --replace --format jsonLines /dev/null -y

# 3 - Update fields in Convex DB from Lapidus App

Edit files or if it's a new table create this file with all CRUD functions
convex/schema.js
convex/content.js

npx convex deploy
npx convex dev --once

# 4 - Import new data

npx convex import --table content --replace data/content-lapidus.json

# 5 - Create Tokens for Convex authentication

node generateKeys.mjs and copy the code and execute the commands

npx convex env set JWT_PRIVATE_KEY="-----BEGIN PRIVATE KEY----- MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDO7+157Dy6TACr URFIs4Wb8N9z2U9suD0NjqYGn695igf8+5DRdUjYzySPG1enRxVuTHMteOEs/u9B kqstINRYLYUpBcQ3R6wAZFQw3BmTi1Tg4x4nRE6re2n7Q7gyRq+nWvvMDB5Jd4rV Fqw2DOCyCd2q1dmAkvCXlYBTQ2IvSii+vt9n5L7MH6gCUed00948apZdRmJ4En8e 1Dgc26lvM+nTQUqKSJGVNb4VD7HrlEC2HIAAfvTQqsCBNmkMM8Py8yXUd1ILMP/M 3F9rHIm0ZCXq8Mog1EFE8uyDO7/tdafTm/ahnFRyYVc1yKmab6WOqFMq0iODqTqi UDrhcEK/AgMBAAECggEABOpx15JzPjEIV7Qqdxx99ok0zbGNBPX6y/kmXC7r7LUI 4TYap8HOVAmBAqicHvGogoEXaq5ImcMz7M4D+fj3LQxmcZCHq5Esy/+WI75UGeCr 81cB2YidCSQlODOmIFpJ2Zhm4InYfayfeYC7Njd9GPhKB0ENlH5+b6NnXn2nIJy/ 5Md2Ow0nKEnA4v3oRsPddCp0GrdjE5ii4cuiyjsvJnDC7ANzKZT9dlfePofmXMBg obwWKVOE2oTuWCsmCUiE1z0Joy/jmWQBDcCou9FjJlR1suHaTxX7LC0ewdxTLFmk RxZUksPAdskdvSTBmGj+Awv87l0kl60fTY9KheQUqQKBgQD883tv+yIQ5kyiQ1Tz cXX9hd1TpW82rI/tKsUThqPQcIo8Mw6vTwiOW0LGECAzdTR83A3Zd/rkOuCf7CoA 5wN+bLzehgkQPStjwAWCEfzsVrGROWgmaLMnSGLQGjD4zdz9G4IqtTbC/92VHJzO NVY7LZy7FVDbugLveGOTqOnYyQKBgQDRbnZ9uofU4Pzzzz8ROiDO+e5e5BpLj7PS iIPL5S3kLvB9nrYgZGqRIot4Grof4vjm4ryIGXbaV5z8CJfzw0/8xg+L+fX6xu8l T/L8SxlfF1QGdGHiIgiO2PgZukmdReK5dA+oR6kIHAIKknGl+wX/WhyP4vS/1Bxc wYTvYOCLRwKBgQDob9zX089D9DwrRvADHBmuM5pjyLtfZEaFSy35eVmCqkd8dfZi hZ95IMdFNYBBiMwIiDV5xlSX8LqEegFG/wEo5UbQvB4L/AmpCcSF932Qt0FID5Zy 5PbrfArA67BgkNsnAmYkVIzTt0aoRLiajEyG6K0DBN1ea5lS8C+gejEYcQKBgQDB yFQbQd0tPIDRl5HjfsWcveWyJ52tDOp2g5pvrz8nQ8eCdLhQgJmacTxbhV9y4bEs 8d9Aj09J+IdpLQpsouwAF8OK4V6ZDDl7bN6IU3TGZ+93iXiIpLUGd/wY0iYLP/7p WlqieqwMtN2uqpI94mdKPzbubDHKzZjwup8mX51lQQKBgDVSgd36TAcfTGtqPC9E uR6sMG0GwlSP18/YJ93Sb9//hFitO4ii4Jj8BKX2qIEfFPEesev2htqaCYMe7Jil TO4doukjdcH8usg2UldW3e436bilfkgpc+COogcbOAflZW18xpQ2lIG5bhupEZF+ jxBFh/wOaOwPHMhBCYCUZEJx -----END PRIVATE KEY-----"

npx convex env set JWKS '{"keys":[{"use":"sig","kty":"RSA","n":"zu_teew8ukwAq1ERSLOFm_Dfc9lPbLg9DY6mBp-veYoH_PuQ0XVI2M8kjxtXp0cVbkxzLXjhLP7vQZKrLSDUWC2FKQXEN0esAGRUMNwZk4tU4OMeJ0ROq3tp-0O4Mkavp1r7zAweSXeK1RasNgzgsgndqtXZgJLwl5WAU0NiL0oovr7fZ-S-zB-oAlHndNPePGqWXUZieBJ_HtQ4HNupbzPp00FKikiRlTW-FQ-x65RAthyAAH700KrAgTZpDDPD8vMl1HdSCzD_zNxfaxyJtGQl6vDKINRBRPLsgzu_7XWn05v2oZxUcmFXNcipmm-ljqhTKtIjg6k6olA64XBCvw","e":"AQAB"}]}'

npx convex env set SITE_URL http://localhost:3000

npx convex env set SITE_URL https://lapidus-dev.vercel.app/

npx convex env list