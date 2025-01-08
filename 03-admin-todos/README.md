# Todo App with PostgreSQL, Prisma, and Docker

Este proyecto es una aplicación que utiliza PostgreSQL como base de datos, Prisma como ORM, y está configurado con Docker Compose para facilitar el desarrollo.

## Prerrequisitos

1. Tener instalado [Docker](https://www.docker.com/) y [Docker Compose](https://docs.docker.com/compose/).
2. Tener instalado [Node.js](https://nodejs.org/) y [Prisma CLI](https://www.prisma.io/docs).
3. Crear un archivo `.env` con las siguientes variables de entorno:
   ```env
   POSTGRES_USER=tu_usuario
   POSTGRES_PASSWORD=tu_contraseña
   POSTGRES_DB=tu_base_de_datos
   PGADMIN_DEFAULT_EMAIL=admin@example.com
   PGADMIN_DEFAULT_PASSWORD=admin
   DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:5432/${POSTGRES_DB}
   ```

## Estructura del proyecto

```
.
├── docker-compose.yml
├── .env
├── prisma/
│   ├── schema.prisma  # Archivo de esquema de Prisma
├── postgres/          # Carpeta donde se almacenarán los datos persistentes de PostgreSQL
└── README.md
```

## Configuración

### 1. Variables de entorno

Crea un archivo `.env` en el directorio raíz con las siguientes variables de entorno:

```env
POSTGRES_USER=tu_usuario
POSTGRES_PASSWORD=tu_contraseña
POSTGRES_DB=todo_app
PGADMIN_DEFAULT_EMAIL=admin@example.com
PGADMIN_DEFAULT_PASSWORD=admin
DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:5432/${POSTGRES_DB}
```

### 2. Configurar permisos en la carpeta `postgres`

Asegúrate de que la carpeta `postgres/` exista y tenga los permisos adecuados para que Docker pueda escribir en ella:

```bash
mkdir postgres
chmod -R 777 postgres
```

## Uso

### 1. Levantar los servicios

Para levantar PostgreSQL y pgAdmin, ejecuta:

```bash
docker-compose up -d
```

### 2. Configurar Prisma

#### 2.1. Instalar dependencias de Prisma

Si aún no has instalado Prisma en tu proyecto, usa el siguiente comando:

```bash
npm install prisma @prisma/client

```

#### 2.2. Generar cliente de Prisma

Asegúrate de que tu archivo `prisma/schema.prisma` esté configurado correctamente y ejecuta:

```bash
npx prisma generate
```

#### 2.3. Migrar la base de datos

Si necesitas crear o actualizar la base de datos según el esquema de Prisma, ejecuta:

```bash
npx prisma migrate dev --name init
```

#### 2.4. Acceder a la interfaz de Prisma Studio (opcional)

Para explorar y editar tus datos de forma visual, ejecuta:

```bash
npx prisma studio
```

### 3. Acceder a pgAdmin

1. Abre tu navegador y ve a `http://localhost:5050`.
2. Inicia sesión con las credenciales definidas en el archivo `.env` (`PGADMIN_DEFAULT_EMAIL` y `PGADMIN_DEFAULT_PASSWORD`).
3. Agrega un servidor para conectar a PostgreSQL:
   - **Nombre**: `Todo Database`
   - **Host**: `todos-db` (nombre del servicio o `hostname` definido en `docker-compose.yml`).
   - **Puerto**: `5432`.
   - **Usuario**: el valor de `POSTGRES_USER`.
   - **Contraseña**: el valor de `POSTGRES_PASSWORD`.

### 4. Detener los servicios

Cuando hayas terminado, puedes detener y eliminar los contenedores con:

```bash
docker-compose down
```

Esto detendrá los contenedores pero mantendrá los datos persistentes en la carpeta `postgres/`.

## Notas

- Si experimentas problemas con la conexión, asegúrate de que la variable `DATABASE_URL` esté correctamente configurada.
- Prisma requiere que las migraciones sean aplicadas para reflejar los cambios en la base de datos.

## Futuras mejoras

- Agregar más servicios o microservicios según las necesidades del proyecto.
- Configurar una herramienta de CI/CD para automatizar despliegues.
