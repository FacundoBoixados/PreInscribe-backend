# PreInscribe – Backend

API REST desarrollada con **NestJS, TypeScript y PostgreSQL** para gestionar el sistema de preinscripciones multi-escuelas.

El proyecto forma parte del Trabajo Final Integrador (TFI) y busca centralizar y simplificar el proceso de preinscripción, permitiendo gestionar usuarios, alumnos, escuelas, vacantes y solicitudes de inscripción en diferentes escuelas.

---

## Descripción del proyecto

PreInscribe es un sistema web orientado a facilitar la gestión de preinscripciones escolares.

El backend proporciona una API REST que permite:

- Gestionar usuarios y sus roles.
- Registrar y administrar alumnos.
- Consultar y administrar escuelas.
- Gestionar niveles educativos y grados.
- Administrar ciclos lectivos y períodos de preinscripción.
- Gestionar solicitudes de preinscripción.
- Administrar documentación asociada.
- Gestionar vacantes disponibles.
- Registrar usuarios e iniciar sesión mediante autenticación JWT.

## Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| Node.js | Entorno de ejecución |
| NestJS | Framework backend |
| TypeScript | Lenguaje de programación |
| PostgreSQL | Base de datos relacional |
| Prisma ORM | Acceso y consultas a la base de datos |
| JWT | Autenticación mediante tokens |
| bcrypt | Encriptación y verificación de contraseñas |
| class-validator | Validación de datos de entrada |

## Requisitos previos

Antes de instalar el proyecto, es necesario contar con:

- Node.js.
- npm.
- PostgreSQL.
- Git.

## Instalación

Clonar el repositorio:

```bash
git clone URL_DEL_REPOSITORIO
```

Ingresar a la carpeta del proyecto:

```bash
cd PreInscribe-backend
```

Instalar las dependencias:

```bash
npm install
```

## Configuración de variables de entorno

Crear un archivo `.env` en la raíz del proyecto.

Configurar las siguientes variables:

```env
PORT=4000
DATABASE_URL="postgresql://USUARIO:CONTRASEÑA@localhost:5432/tfi_preinscripciones?schema=preinscripciones"
JWT_SECRET="TU_SECRETO_JWT"
```

**Importante:**

- Reemplazar los datos de conexión por los correspondientes al entorno local.
- `DATABASE_URL` debe apuntar a la base de datos PostgreSQL y al esquema utilizado por el proyecto.
- `JWT_SECRET` se utiliza para firmar los tokens de autenticación.
- El archivo `.env` contiene información sensible y no debe subirse al repositorio.

## Base de datos

El proyecto utiliza PostgreSQL como sistema de gestión de base de datos y Prisma ORM para interactuar con ella.

La base de datos utilizada durante el desarrollo se denomina `tfi_preinscripciones` y trabaja con el esquema `preinscripciones`.

Prisma permite consultar, crear, modificar y eliminar registros mediante los servicios del backend.

## Ejecución del proyecto

Iniciar el servidor en modo desarrollo:

```bash
npm run start:dev
```

Ejecutar en modo normal:

```bash
npm run start
```

Ejecutar en modo producción:

```bash
npm run start:prod
```

Por defecto, el servidor utiliza el puerto `4000`.

## Estructura del proyecto

La organización principal del backend es la siguiente:

```text
src/
├── modules/
│   ├── auth/
│   ├── usuarios/
│   ├── alumnos/
│   ├── preinscripciones/
│   ├── documentos/
│   ├── escuelas/
│   ├── niveles-grados/
│   └── vacantes/
│
├── prisma/
│   ├── prisma.module.ts
│   └── prisma.service.ts
│
├── app.module.ts
└── main.ts

prisma/
└── schema.prisma

prisma.config.ts
.env
README.md
```

Cada módulo contiene sus controladores, servicios y DTOs correspondientes.

- **Controllers:** reciben las solicitudes HTTP y exponen los endpoints.
- **Services:** contienen la lógica de negocio y las operaciones con la base de datos.
- **DTOs:** definen y validan los datos recibidos por la API.
- **PrismaService:** centraliza el acceso a PostgreSQL mediante Prisma.

## Módulos y endpoints

### Autenticación – `/auth`

| Método | Endpoint | Descripción |
|---|---|---|
| POST | `/auth/register` | Registrar un usuario |
| POST | `/auth/login` | Iniciar sesión y obtener un JWT |

Las contraseñas se almacenan mediante hashes generados con bcrypt.

### Usuarios – `/usuarios`

Operaciones de creación, consulta, modificación y eliminación de usuarios.

### Alumnos – `/alumnos`

Operaciones para registrar, consultar, modificar y eliminar alumnos.

### Preinscripciones – `/preinscripciones`

Operaciones para gestionar las solicitudes de preinscripción.

### Documentos – `/documentos`

Operaciones para gestionar los documentos asociados a las preinscripciones.

### Escuelas – `/escuelas`

Operaciones de administración y consulta de escuelas.

### Niveles y grados – `/niveles-grados`

Permite gestionar:

- Niveles educativos.
- Grados.
- Ciclos lectivos.
- Períodos de preinscripción.

### Vacantes – `/vacantes`

Operaciones para administrar y consultar las vacantes disponibles.

## Autenticación

El módulo de autenticación permite registrar usuarios e iniciar sesión.

El proceso de inicio de sesión verifica las credenciales mediante bcrypt y, si son correctas, genera un token JWT.

La respuesta incluye:

- Token de acceso (`access_token`).
- Información del usuario autenticado.
- Rol asociado al usuario.

## Pruebas

Las solicitudes de la API pueden probarse utilizando Postman.

Entre las pruebas realizadas se encuentran:

- Registro de usuarios.
- Validación de usuarios duplicados.
- Inicio de sesión exitoso.
- Rechazo de credenciales incorrectas.
- Generación de tokens JWT.

## Licencia

Proyecto académico desarrollado como parte del Trabajo Final Integrador (TFI).
