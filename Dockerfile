ARG CONVEX_REV=latest

# Backend image equivalent to docker-compose service `backend`.
FROM ghcr.io/get-convex/convex-backend:${CONVEX_REV} AS backend

STOPSIGNAL SIGINT

ENV APPLICATION_MAX_CONCURRENT_MUTATIONS=16 \
		APPLICATION_MAX_CONCURRENT_NODE_ACTIONS=16 \
		APPLICATION_MAX_CONCURRENT_QUERIES=16 \
		APPLICATION_MAX_CONCURRENT_V8_ACTIONS=16 \
		CONVEX_CLOUD_ORIGIN=http://127.0.0.1:3210 \
		CONVEX_SITE_ORIGIN=http://127.0.0.1:3211 \
		DISABLE_METRICS_ENDPOINT=true \
		DOCUMENT_RETENTION_DELAY=172800 \
		RUST_LOG=info

EXPOSE 3210 3211
VOLUME ["/convex/data"]

HEALTHCHECK --interval=5s --start-period=10s --timeout=5s --retries=3 \
	CMD curl -fsS http://localhost:3210/version || exit 1


# Dashboard image equivalent to docker-compose service `dashboard`.
FROM ghcr.io/get-convex/convex-dashboard:${CONVEX_REV} AS dashboard

STOPSIGNAL SIGINT

ENV NEXT_PUBLIC_DEPLOYMENT_URL=http://127.0.0.1:3210

EXPOSE 6791
