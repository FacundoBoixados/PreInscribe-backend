-- CreateTable
CREATE TABLE "Rol" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(30) NOT NULL,

    CONSTRAINT "Rol_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "rolId" INTEGER NOT NULL,
    "nombre" VARCHAR(80) NOT NULL,
    "apellido" VARCHAR(80) NOT NULL,
    "dni" VARCHAR(8) NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "telefono" VARCHAR(30),
    "passwordHash" VARCHAR(255) NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PasswordResetToken" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "tokenHash" VARCHAR(255) NOT NULL,
    "expiraEn" TIMESTAMPTZ(3) NOT NULL,
    "usado" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PasswordResetToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Localidad" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "provincia" VARCHAR(100) NOT NULL,

    CONSTRAINT "Localidad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Escuela" (
    "id" SERIAL NOT NULL,
    "localidadId" INTEGER NOT NULL,
    "nombre" VARCHAR(150) NOT NULL,
    "cue" VARCHAR(15),
    "direccion" VARCHAR(200) NOT NULL,
    "telefono" VARCHAR(30),
    "email" VARCHAR(150),
    "tipoGestion" VARCHAR(10) NOT NULL DEFAULT 'PUBLICA',
    "activa" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Escuela_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminEscuela" (
    "usuarioId" INTEGER NOT NULL,
    "escuelaId" INTEGER NOT NULL,

    CONSTRAINT "AdminEscuela_pkey" PRIMARY KEY ("usuarioId","escuelaId")
);

-- CreateTable
CREATE TABLE "NivelEducativo" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(30) NOT NULL,

    CONSTRAINT "NivelEducativo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Grado" (
    "id" SERIAL NOT NULL,
    "nivelId" INTEGER NOT NULL,
    "nombre" VARCHAR(40) NOT NULL,
    "orden" INTEGER NOT NULL,
    "edadMinima" INTEGER NOT NULL,
    "edadMaxima" INTEGER NOT NULL,

    CONSTRAINT "Grado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CicloLectivo" (
    "id" SERIAL NOT NULL,
    "anio" INTEGER NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "CicloLectivo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PeriodoPreinscripcion" (
    "id" SERIAL NOT NULL,
    "escuelaId" INTEGER NOT NULL,
    "cicloId" INTEGER NOT NULL,
    "fechaInicio" DATE NOT NULL,
    "fechaFin" DATE NOT NULL,

    CONSTRAINT "PeriodoPreinscripcion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vacante" (
    "id" SERIAL NOT NULL,
    "escuelaId" INTEGER NOT NULL,
    "gradoId" INTEGER NOT NULL,
    "cicloId" INTEGER NOT NULL,
    "cupoTotal" INTEGER NOT NULL,

    CONSTRAINT "Vacante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Alumno" (
    "id" SERIAL NOT NULL,
    "tutorId" INTEGER NOT NULL,
    "nombre" VARCHAR(80) NOT NULL,
    "apellido" VARCHAR(80) NOT NULL,
    "dni" VARCHAR(8) NOT NULL,
    "fechaNacimiento" DATE NOT NULL,
    "parentesco" VARCHAR(30) NOT NULL DEFAULT 'HIJO/A',
    "domicilio" VARCHAR(200),
    "observaciones" TEXT,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Alumno_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EstadoPreinscripcion" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(30) NOT NULL,
    "esFinal" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "EstadoPreinscripcion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Preinscripcion" (
    "id" SERIAL NOT NULL,
    "alumnoId" INTEGER NOT NULL,
    "escuelaId" INTEGER NOT NULL,
    "gradoId" INTEGER NOT NULL,
    "cicloId" INTEGER NOT NULL,
    "estadoId" INTEGER NOT NULL,
    "tieneHermanoEnEscuela" BOOLEAN NOT NULL DEFAULT false,
    "observaciones" TEXT,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Preinscripcion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HistorialEstado" (
    "id" SERIAL NOT NULL,
    "preinscripcionId" INTEGER NOT NULL,
    "estadoId" INTEGER NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "comentario" TEXT,
    "fecha" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HistorialEstado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TipoDocumento" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(60) NOT NULL,
    "obligatorio" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "TipoDocumento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Documento" (
    "id" SERIAL NOT NULL,
    "preinscripcionId" INTEGER NOT NULL,
    "tipoDocumentoId" INTEGER NOT NULL,
    "nombreArchivo" VARCHAR(200) NOT NULL,
    "rutaArchivo" VARCHAR(400) NOT NULL,
    "mimeType" VARCHAR(100) NOT NULL,
    "tamanoBytes" INTEGER NOT NULL,
    "subidoEn" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Documento_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Rol_nombre_key" ON "Rol"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_dni_key" ON "Usuario"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE INDEX "Usuario_rolId_idx" ON "Usuario"("rolId");

-- CreateIndex
CREATE INDEX "PasswordResetToken_usuarioId_idx" ON "PasswordResetToken"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "Localidad_nombre_provincia_key" ON "Localidad"("nombre", "provincia");

-- CreateIndex
CREATE UNIQUE INDEX "Escuela_cue_key" ON "Escuela"("cue");

-- CreateIndex
CREATE INDEX "Escuela_localidadId_idx" ON "Escuela"("localidadId");

-- CreateIndex
CREATE UNIQUE INDEX "NivelEducativo_nombre_key" ON "NivelEducativo"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Grado_nivelId_nombre_key" ON "Grado"("nivelId", "nombre");

-- CreateIndex
CREATE UNIQUE INDEX "CicloLectivo_anio_key" ON "CicloLectivo"("anio");

-- CreateIndex
CREATE UNIQUE INDEX "PeriodoPreinscripcion_escuelaId_cicloId_key" ON "PeriodoPreinscripcion"("escuelaId", "cicloId");

-- CreateIndex
CREATE UNIQUE INDEX "Vacante_escuelaId_gradoId_cicloId_key" ON "Vacante"("escuelaId", "gradoId", "cicloId");

-- CreateIndex
CREATE UNIQUE INDEX "Alumno_dni_key" ON "Alumno"("dni");

-- CreateIndex
CREATE INDEX "Alumno_tutorId_idx" ON "Alumno"("tutorId");

-- CreateIndex
CREATE UNIQUE INDEX "EstadoPreinscripcion_nombre_key" ON "EstadoPreinscripcion"("nombre");

-- CreateIndex
CREATE INDEX "Preinscripcion_escuelaId_cicloId_idx" ON "Preinscripcion"("escuelaId", "cicloId");

-- CreateIndex
CREATE INDEX "Preinscripcion_estadoId_idx" ON "Preinscripcion"("estadoId");

-- CreateIndex
CREATE INDEX "Preinscripcion_alumnoId_idx" ON "Preinscripcion"("alumnoId");

-- CreateIndex
CREATE UNIQUE INDEX "Preinscripcion_alumnoId_escuelaId_gradoId_cicloId_key" ON "Preinscripcion"("alumnoId", "escuelaId", "gradoId", "cicloId");

-- CreateIndex
CREATE INDEX "HistorialEstado_preinscripcionId_idx" ON "HistorialEstado"("preinscripcionId");

-- CreateIndex
CREATE UNIQUE INDEX "TipoDocumento_nombre_key" ON "TipoDocumento"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Documento_preinscripcionId_tipoDocumentoId_key" ON "Documento"("preinscripcionId", "tipoDocumentoId");

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_rolId_fkey" FOREIGN KEY ("rolId") REFERENCES "Rol"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PasswordResetToken" ADD CONSTRAINT "PasswordResetToken_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Escuela" ADD CONSTRAINT "Escuela_localidadId_fkey" FOREIGN KEY ("localidadId") REFERENCES "Localidad"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminEscuela" ADD CONSTRAINT "AdminEscuela_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminEscuela" ADD CONSTRAINT "AdminEscuela_escuelaId_fkey" FOREIGN KEY ("escuelaId") REFERENCES "Escuela"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grado" ADD CONSTRAINT "Grado_nivelId_fkey" FOREIGN KEY ("nivelId") REFERENCES "NivelEducativo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PeriodoPreinscripcion" ADD CONSTRAINT "PeriodoPreinscripcion_escuelaId_fkey" FOREIGN KEY ("escuelaId") REFERENCES "Escuela"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PeriodoPreinscripcion" ADD CONSTRAINT "PeriodoPreinscripcion_cicloId_fkey" FOREIGN KEY ("cicloId") REFERENCES "CicloLectivo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vacante" ADD CONSTRAINT "Vacante_escuelaId_fkey" FOREIGN KEY ("escuelaId") REFERENCES "Escuela"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vacante" ADD CONSTRAINT "Vacante_gradoId_fkey" FOREIGN KEY ("gradoId") REFERENCES "Grado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vacante" ADD CONSTRAINT "Vacante_cicloId_fkey" FOREIGN KEY ("cicloId") REFERENCES "CicloLectivo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alumno" ADD CONSTRAINT "Alumno_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Preinscripcion" ADD CONSTRAINT "Preinscripcion_alumnoId_fkey" FOREIGN KEY ("alumnoId") REFERENCES "Alumno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Preinscripcion" ADD CONSTRAINT "Preinscripcion_estadoId_fkey" FOREIGN KEY ("estadoId") REFERENCES "EstadoPreinscripcion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Preinscripcion" ADD CONSTRAINT "Preinscripcion_escuelaId_gradoId_cicloId_fkey" FOREIGN KEY ("escuelaId", "gradoId", "cicloId") REFERENCES "Vacante"("escuelaId", "gradoId", "cicloId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistorialEstado" ADD CONSTRAINT "HistorialEstado_preinscripcionId_fkey" FOREIGN KEY ("preinscripcionId") REFERENCES "Preinscripcion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistorialEstado" ADD CONSTRAINT "HistorialEstado_estadoId_fkey" FOREIGN KEY ("estadoId") REFERENCES "EstadoPreinscripcion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistorialEstado" ADD CONSTRAINT "HistorialEstado_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Documento" ADD CONSTRAINT "Documento_preinscripcionId_fkey" FOREIGN KEY ("preinscripcionId") REFERENCES "Preinscripcion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Documento" ADD CONSTRAINT "Documento_tipoDocumentoId_fkey" FOREIGN KEY ("tipoDocumentoId") REFERENCES "TipoDocumento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
