# convex-server
Project Convex Server on Docker

# start the backend with:

docker-compose up -d
docker-compose down

# Get an admin key with:

docker compose exec backend ./generate_admin_key.sh

# Copy the printed value into `.env.local` as CONVEX_SELF_HOSTED_ADMIN_KEY

# Deploy Dev Convex DB

From the / directory:

npm init -y
npm i -S convex
npx convex dev


