#!/bin/bash
set -e

echo "=== Despliegue Gewalt Saleor en DigitalOcean ==="

# Verificar que Docker está instalado
if ! command -v docker &> /dev/null; then
    echo "Instalando Docker..."
    curl -fsSL https://get.docker.com | sh
    sudo usermod -aG docker $USER
    echo "Docker instalado. Cierra y vuelve a abrir la sesion."
    exit 1
fi

# Directorio de trabajo
DEPLOY_DIR="/opt/gewalt"

# Clonar o actualizar repo
if [ -d "$DEPLOY_DIR" ]; then
    echo "Actualizando repositorio..."
    cd $DEPLOY_DIR
    git pull origin luna
else
    echo "Clonando repositorio..."
    sudo git clone -b luna https://github.com/Jhony33663/Gewalt.git $DEPLOY_DIR
    sudo chown -R $USER:$USER $DEPLOY_DIR
    cd $DEPLOY_DIR
fi

# Copiar archivos de configuracion si existen en /tmp
if [ -f "/tmp/.env.production" ]; then
    cp /tmp/.env.production .env
    echo ".env copiado desde /tmp"
fi

if [ -f "/tmp/docker-compose.prod.yml" ]; then
    cp /tmp/docker-compose.prod.yml .
    echo "docker-compose.prod.yml copiado desde /tmp"
fi

# Verificar que existe .env
if [ ! -f ".env" ]; then
    echo "ERROR: No se encontro archivo .env"
    exit 1
fi

# Detener servicios existentes
echo "Deteniendo servicios existentes..."
docker compose -f docker-compose.prod.yml down 2>/dev/null || true

# Construir y levantar servicios
echo "Construyendo e iniciando servicios..."
docker compose -f docker-compose.prod.yml up -d --build

# Esperar a que la base de datos este lista
echo "Esperando a que PostgreSQL este listo..."
sleep 15

# Verificar que los servicios estan corriendo
echo "Verificando servicios..."
docker compose -f docker-compose.prod.yml ps

echo ""
echo "=== Despliegue completado ==="
echo ""
echo "API GraphQL: http://159.223.121.57:8000/graphql/"
echo "Dashboard:   http://159.223.121.57:9000"
echo "Mailpit:     http://159.223.121.57:8025"
echo ""
echo "Para crear el usuario admin ejecuta:"
echo "docker compose -f docker-compose.prod.yml exec saleor python manage.py shell -c \""
echo "from saleor.account.models import User"
echo "u = User(email='admin@admin.com', is_staff=True, is_superuser=True, is_active=True)"
echo "u.set_password('admin')"
echo "u.save()"
echo "print('Usuario creado')\""
