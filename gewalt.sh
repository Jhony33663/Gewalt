#!/bin/bash
# GEWALT - gestion del stack de produccion
set -e
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
COMPOSE="docker compose -f $DIR/docker-compose.prod.yml"

case "${1:-status}" in
  up)      $COMPOSE up -d ;;
  down)    $COMPOSE down ;;
  restart) $COMPOSE restart ;;
  rebuild) $COMPOSE build saleor frontend && $COMPOSE up -d ;;
  logs)    $COMPOSE logs -f --tail=200 "${2:-saleor}" ;;
  status)  $COMPOSE ps ;;
  psql)    $COMPOSE exec db psql -U saleor -d saleor ;;
  shell)   $COMPOSE exec -e RSA_PRIVATE_KEY="$(printf '%s' "$($COMPOSE exec -T saleor printenv RSA_PRIVATE_KEY_B64)" | base64 -d 2>/dev/null || true)" saleor python manage.py shell ;;
  migrate) $COMPOSE exec -T saleor sh -c 'export RSA_PRIVATE_KEY="$(printf "%s" "$RSA_PRIVATE_KEY_B64" | base64 -d)"; python manage.py migrate --no-input' ;;
  *)
    echo "Uso: $0 {up|down|restart|rebuild|logs [svc]|status|psql|shell|migrate}" >&2
    exit 1 ;;
esac
