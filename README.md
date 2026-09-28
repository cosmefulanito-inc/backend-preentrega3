# Sistema de Turnos y Reservas - API REST

Primera versión funcional del backend de un sistema de turnos y reservas, desarrollada con Node.js, Express y FileSystem. La API gestiona dos recursos, **servicios** y **reservas**, con persistencia en archivos JSON.

## Tecnologías

- Node.js
- Express
- dotenv
- FileSystem (`fs/promises`) para la persistencia
- ES Modules

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/cosmefulanito-inc/backend-preentrega3
cd backend-preentrega3
```

2. Instalar dependencias:

```bash
npm install
```

3. Crear un archivo `.env` en la raíz del proyecto con la siguiente variable:

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
├── config/
│   └── env.config.js         # Carga de variables de entorno
├── data/
│   ├── services.json         # Almacenamiento de servicios
│   └── bookings.json         # Almacenamiento de reservas
├── managers/
│   ├── ServiceManager.js     # Lógica de acceso a los servicios
│   └── BookingManager.js     # Lógica de acceso a las reservas
├── routes/
│   ├── services.router.js    # Endpoints de servicios
│   └── bookings.router.js    # Endpoints de reservas
├── app.js                    # Configuración de Express y montaje de routers
└── server.js                 # Punto de entrada
package.json
.gitignore
README.md
```

---

## Recurso: Servicios

Ruta base: `/api/services`

### Modelo

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | string | Generado automáticamente (UUID). No se envía en el body. |
| `name` | string | Nombre del servicio |
| `description` | string | Descripción del servicio |
| `duration` | number | Duración en minutos |
| `price` | number | Precio |
| `category` | string | Categoría del servicio |
| `available` | boolean | Indica si el servicio está disponible |

### Endpoints

| Método | Ruta | Descripción | Respuestas |
|--------|------|-------------|------------|
| GET | `/api/services` | Devuelve todos los servicios. | 200 |
| GET | `/api/services/:sid` | Devuelve un servicio por id. | 200, 404 |
| POST | `/api/services` | Crea un servicio. Todos los campos son obligatorios. | 201, 400 |
| PUT | `/api/services/:sid` | Actualiza un servicio. El id no se puede modificar. | 200, 404 |
| DELETE | `/api/services/:sid` | Elimina un servicio. | 200, 404 |

### Ejemplo de body para crear un servicio

```json
{
  "name": "Masaje descontracturante",
  "description": "Sesión de masaje de espalda y cuello",
  "duration": 60,
  "price": 15000,
  "category": "salud",
  "available": true
}
```

---

## Recurso: Reservas

Ruta base: `/api/bookings`

### Modelo

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | string | Generado automáticamente (UUID). No se envía en el body. |
| `clientName` | string | Nombre del cliente |
| `clientEmail` | string | Email del cliente |
| `date` | string | Fecha de la reserva |
| `time` | string | Hora de la reserva |
| `status` | string | Estado de la reserva. Se asigna automáticamente como `"pending"` al crearla. |
| `services` | array | Servicios incluidos en la reserva. Se inicia vacío. |

Cada elemento del array `services` guarda solo la referencia al servicio y la cantidad:

```json
{ "service": "id-del-servicio", "quantity": 1 }
```

Si se agrega a una reserva un servicio que ya contiene, no se duplica el elemento: se incrementa su `quantity`.

### Endpoints

| Método | Ruta | Descripción | Respuestas |
|--------|------|-------------|------------|
| POST | `/api/bookings` | Crea una reserva con `services` vacío. | 201, 400 |
| GET | `/api/bookings/:bid` | Devuelve una reserva por id. | 200, 404 |
| POST | `/api/bookings/:bid/services/:sid` | Agrega un servicio a una reserva existente. Valida que ambos existan. | 200, 404 |

### Ejemplo de body para crear una reserva

Los campos `clientName`, `clientEmail`, `date` y `time` son obligatorios. Si falta alguno, la API responde con 400.

```json
{
  "clientName": "Laura Gómez",
  "clientEmail": "laura@mail.com",
  "date": "2026-10-15",
  "time": "10:30"
}
```

### Ejemplo de reserva con servicios agregados

Resultado después de agregar un servicio dos veces y otro servicio una vez:

```json
{
  "id": "a1b2c3d4-...",
  "clientName": "Laura Gómez",
  "clientEmail": "laura@mail.com",
  "date": "2026-10-15",
  "time": "10:30",
  "status": "pending",
  "services": [
    { "service": "id-del-servicio-1", "quantity": 2 },
    { "service": "id-del-servicio-2", "quantity": 1 }
  ]
}
```

---

## Formato de las respuestas

Las respuestas exitosas tienen la forma:

```json
{
  "status": "success",
  "data": { }
}
```

Las respuestas con error tienen la forma:

```json
{
  "status": "error",
  "message": "Descripción del error"
}
```

## Autor

[Tu nombre]
