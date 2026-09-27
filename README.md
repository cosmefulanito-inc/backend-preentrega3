# API de Servicios - Sistema de Turnos y Reservas

API REST desarrollada con Node.js y Express para gestionar servicios (crear, consultar, actualizar y eliminar). Los datos se almacenan en un archivo JSON.

## Tecnologías

- Node.js
- Express
- dotenv
- ES Modules

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/[tu-usuario]/[nombre-del-repo].git
cd [nombre-del-repo]
```

2. Instalar dependencias:

```bash
npm install
```

3. Crear un archivo `.env` en la raíz, tomando como base `.env.example`:

```
PORT=8080
```

4. Iniciar el servidor:

```bash
npm start
```

El servidor queda disponible en `http://localhost:8080`.

## Estructura del proyecto

```
src/
├── config/env.config.js       # Carga de variables de entorno
├── managers/ServiceManager.js # Lógica de acceso a los datos
├── routes/services.router.js  # Endpoints del recurso services
├── data/services.json         # Almacenamiento de servicios
├── app.js                     # Configuración de Express
└── server.js                  # Punto de entrada
```

## Endpoints

Ruta base: `/api/services`

| Método | Ruta | Descripción | Respuestas |
|--------|------|-------------|------------|
| GET | `/api/services` | Lista todos los servicios. Acepta filtros opcionales. | 200 |
| GET | `/api/services/:sid` | Devuelve un servicio por id. | 200, 404 |
| POST | `/api/services` | Crea un servicio. El id se genera automáticamente. | 201, 400 |
| PUT | `/api/services/:sid` | Actualiza un servicio. El id no se puede modificar. | 200, 404 |
| DELETE | `/api/services/:sid` | Elimina un servicio. | 200, 404 |

### Filtros disponibles (query params)

- `category`: filtra por categoría (no distingue mayúsculas). Ejemplo: `/api/services?category=salud`
- `available`: filtra por disponibilidad (`true` o `false`). Ejemplo: `/api/services?available=true`

Se pueden combinar: `/api/services?category=salud&available=true`

### Ejemplo de body para POST

```json
{
  "name": "[nombre de ejemplo]",
  "duration": [número],
  "price": [número],
  "category": "salud",
  "available": true
}
```

Todos los campos son obligatorios. Si falta alguno, la API responde con 400.

## Autor

Gastón Daix