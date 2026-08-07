#!/usr/bin/env bash
#
# GEWALT - Demo temporal en Cloudflare (Quick Tunnel)
# Expone la web completa (frontend + API + media) en un hostname *.trycloudflare.com
# sin necesidad de cuenta Cloudflare ni login.
#
# Uso:  bash run-demo.sh
#
set -euo pipefail
cd "$(dirname "$0")/../.."

echo "==> [1/3] Ajustando URLs a rutas relativas (para que el tunel funcione)"
# El cliente abre el tunel en un dominio aleatorio; con rutas relativas
# el navegador resuelve /graphql y /media contra el mismo origen del tunel.
sed -i.bak 's|^MEDIA_URL=.*|MEDIA_URL=/media/|' .env
sed -i.bak 's|^STOREFRONT_URL=.*|STOREFRONT_URL=/|' .env

echo "==> [2/3] Reconstruyendo frontend con API relativa"
docker compose -f docker-compose.prod.yml build --build-arg NEXT_PUBLIC_API_URL=/graphql/ frontend
docker compose -f docker-compose.prod.yml up -d --no-deps --force-recreate frontend saleor api-proxy

echo "==> [3/3] Levantando gateway + tunel"
cd deployment/cloudflared-demo
docker compose -f docker-compose.demo.yml up -d

echo ""
echo "==> Tunel levantado. Busca el hostname en los logs:"
docker compose -f docker-compose.demo.yml logs -f cloudflared
