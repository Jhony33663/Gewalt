#!/bin/bash
set -e

REPO_URL="https://github.com/Jhony33663/Gewalt.git"
BRANCH="luna"
APP_DIR="/opt/gewalt"

echo "=============================="
echo " Gewalt - Deploy Produccion"
echo "=============================="

# 1. Instalar Docker si no existe
if ! command -v docker &> /dev/null; then
  echo "[+] Instalando Docker..."
  curl -fsSL https://get.docker.com | sh
  usermod -aG docker $USER
fi

# 2. Clonar o actualizar repo
if [ -d "$APP_DIR/.git" ]; then
  echo "[+] Actualizando repositorio..."
  cd "$APP_DIR"
  git fetch gewalt
  git reset --hard gewalt/$BRANCH
else
  echo "[+] Clonando repositorio..."
  git clone -b $BRANCH $REPO_URL $APP_DIR
  cd "$APP_DIR"
  git remote rename origin gewalt
fi

cd "$APP_DIR"

# 3. Verificar .env
if [ ! -f ".env" ]; then
  echo ""
  echo "[!] ERROR: No existe el archivo .env"
  echo "    Copia el contenido de .env.production y ajusta los valores:"
  echo "    nano $APP_DIR/.env"
  exit 1
fi

# 4. Levantar servicios
echo "[+] Levantando servicios con Docker Compose..."
docker compose -f docker-compose.prod.yml pull --quiet
docker compose -f docker-compose.prod.yml up -d --build

# 5. Esperar que la BD esté lista
echo "[+] Esperando base de datos..."
sleep 10

# 6. Migraciones
echo "[+] Ejecutando migraciones..."
docker compose -f docker-compose.prod.yml exec saleor python manage.py migrate --no-input

# 7. Collectstatic
echo "[+] Recolectando archivos estáticos..."
docker compose -f docker-compose.prod.yml exec saleor python manage.py collectstatic --no-input

echo ""
echo "=============================="
echo " Deploy completado!"
echo "=============================="
echo " API GraphQL : http://159.223.121.57:8000/graphql/"
echo " Dashboard   : http://159.223.121.57:9000/"
echo ""
echo " Para crear usuario admin:"
echo " docker compose -f docker-compose.prod.yml exec saleor python manage.py shell -c \""
echo "   from saleor.account.models import User"
echo "   u = User(email='admin@gewalt.com', is_staff=True, is_superuser=True, is_active=True)"
echo "   u.set_password('TU_CLAVE')"
echo "   u.save()"
echo "   print('Admin creado')"
echo "\""
echo ""
echo " Verificar logs: docker compose -f docker-compose.prod.yml logs -f saleor"
