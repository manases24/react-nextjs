# Todo App with PostgreSQL and Docker

Este proyecto es una aplicación que utiliza PostgreSQL como base de datos y está configurado con Docker Compose para facilitar el desarrollo.

## Prerrequisitos

1. Tener instalado [Docker](https://www.docker.com/) y [Docker Compose](https://docs.docker.com/compose/).
2. Crear un archivo `.env` con las siguientes variables de entorno:
   ```env
   POSTGRES_USER=tu_usuario
   POSTGRES_PASSWORD=tu_contraseña
   POSTGRES_DB=tu_base_de_datos
   PGADMIN_DEFAULT_EMAIL=admin@example.com
   PGADMIN_DEFAULT_PASSWORD=admin
   ```

## Estructura del proyecto

```
.
├── docker-compose.yml
├── .env
├── postgres/    # Carpeta donde se almacenarán los datos persistentes de PostgreSQL
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

Esto hará lo siguiente:

- Iniciar un contenedor para PostgreSQL.
- Iniciar un contenedor para pgAdmin, una interfaz gráfica para administrar PostgreSQL.

### 2. Verificar los contenedores en ejecución

Comprueba que los contenedores estén corriendo:

```bash
docker ps
```

Deberías ver dos contenedores en ejecución: `todos-db` y `pgadmin`.

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

- Si necesitas conectarte directamente a PostgreSQL desde tu máquina local, utiliza:

  - **Host**: `localhost`
  - **Puerto**: `5432`
  - **Usuario/Contraseña**: los definidos en tu archivo `.env`.

- Si experimentas problemas, asegúrate de que los puertos `5432` (para PostgreSQL) y `5050` (para pgAdmin) no estén en uso por otras aplicaciones.

## Futuras mejoras

- Agregar un servicio para la aplicación principal (API o frontend).
- Configurar scripts de inicialización de datos en PostgreSQL.
