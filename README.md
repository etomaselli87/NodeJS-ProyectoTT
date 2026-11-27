# PFI - API Rest - Backend E-commerce - Emmanuel Tomaselli - 26225

API REST desarrollada en Node.js para un e-commerce de piedras preciosas. Expone operaciones de lectura y administración de productos (listado, búsqueda por categoría, detalle, creación y eliminación) con autenticación JWT para las acciones de escritura y persistencia en **Firebase Firestore**.

## Tecnologías utilizadas

- **Node.js** con módulos ES (`type: "module"`)
- **Express 5** — servidor y enrutamiento
- **Firebase / Firestore** — base de datos de productos
- **jsonwebtoken (JWT)** — autenticación de rutas protegidas
- **dotenv** — gestión de variables de entorno
- **body-parser** — parseo del cuerpo de las peticiones a JSON
- **cors** — habilitación de peticiones desde otros orígenes
- **nodemon** — recarga automática durante el desarrollo

## Requisitos previos

- Node.js (versión 18 o superior recomendada)
- npm
- Un proyecto de Firebase con la colección `products` en Firestore

## Instalación

```bash
npm install
```

## Configuración

Crear un archivo `.env` en la raíz del proyecto (ya ignorado por Git) con las credenciales de Firebase y la clave JWT:

```env
FIREBASE_API_KEY=tu_api_key
FIREBASE_AUTH_DOMAIN=tu_auth_domain.firebaseapp.com
FIREBASE_STORAGE_BUCKET=tu_bucket.appspot.com
FIREBASE_APP_ID=tu_app_id
JWT_SECRET_KEY=tu_clave_secreta_jwt
```

> El `projectId` (`proyectott-nodejs`) y el `messagingSenderId` están definidos directamente en `src/data/data.js`. Si se utiliza otro proyecto de Firebase, actualizar esos valores en dicho archivo.

## Ejecución

```bash
# Producción
npm start

# Desarrollo (recarga automática con nodemon)
npm run dev
```

El servidor queda disponible en `http://localhost:3000`.

## Arquitectura

El proyecto sigue una arquitectura por capas, separando responsabilidades:

```
index.js                          Configuración de Express, CORS, middlewares y puertos
src/
├── data/
│   ├── data.js                   Inicialización de Firebase y Firestore
│   └── data.json                 Datos de ejemplo (legado, no usado en la API actual)
├── routes/
│   ├── auth.routes.js            Ruta de autenticación
│   └── products.routes.js        Rutas de productos
├── controllers/
│   ├── auth.controller.js        Lógica de login y emisión del token
│   └── products.controllers.js   Manejo de peticiones y respuestas HTTP
├── services/
│   └── products.services.js      Reglas de negocio / intermedio entre controlador y modelo
├── models/
│   ├── products.models.js        Consultas a la colección Firestore
│   └── products_old.models.js    Implementación anterior (referencia)
├── middlewares/
│   └── authentication.js         Verificación del token JWT
└── utils/
    └── token-generator.js        Generación de tokens JWT con expiración de 1 hora
```

El flujo de una petición es: **rutas → controladores → servicios → modelos → Firestore**.

## Base de datos

Los productos se almacenan en la colección `products` de Firestore. Los documentos creados con la API conservan la estructura enviada en el cuerpo de la petición; un producto típico contiene:

```json
{
  "titulo": "Zafiro azul natural",
  "precio": 450,
  "descripcion": "Piedra preciosa certificada, talla brillante",
  "categoria": "piedras-preciosas",
  "image": "https://ejemplo.com/zafiro.jpg",
  "rating": { "rate": 4.8, "count": 25 }
}
```

> **Importante:** el filtro por categoría busca el campo `categoria` (con tilde). Los documentos deben usar exactamente ese nombre de campo para que el filtro funcione.

## Autenticación

Las rutas de creación y eliminación de productos están protegidas con JWT. Para obtener un token:

**`POST /auth/login`** — público

```json
{
  "email": "xxxxx",
  "password": "xxxxx"
}
```

Respuesta:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

Las credenciales de demostración se encuentran definidas en `src/controllers/auth.controller.js`. El token tiene una validez de **1 hora** y se envía en las rutas protegidas mediante la cabecera:

```
Authorization: Bearer <token>
```

- Sin token: `401 Unauthorized`
- Token inválido o expirado: `403 Forbidden`

## Endpoints

Base URL: `http://localhost:3000`

| Método | Ruta | Autenticación | Descripción |
| --- | --- | --- | --- |
| `POST` | `/auth/login` | No | Inicia sesión y devuelve un token JWT |
| `GET` | `/api/products` | No | Lista todos los productos |
| `GET` | `/api/products?category=amuletos (=dijes) ` | No | Lista productos filtrados por categoría |
| `GET` | `/api/products/:id` | No | Devuelve un producto por su ID de Firestore |
| `POST` | `/api/products/create` | Sí | Crea un producto |
| `DELETE` | `/api/products/:id` | Sí | Elimina un producto por su ID |

Cualquier otra ruta devuelve `404` con un objeto `{ error, mensaje }`.

### Ejemplos de uso

Listar productos:

```bash
curl http://localhost:3000/api/products
```

Filtrar por categoría:

```bash
curl "http://localhost:3000/api/products?category=dijes o amuletos"
```

Crear producto (requiere token):

```bash
curl -X POST http://localhost:3000/api/products/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"nombre":"Rubí birmano","precio":890,"categoria":"piedras-preciosas"}'
```

Eliminar producto (requiere token):

```bash
curl -X DELETE http://localhost:3000/api/products/<id> \
  -H "Authorization: Bearer <token>"
```

## Respuestas habituales

| Código | Significado |
| --- | --- |
| `200` | Operación exitosa (incluye `message` y, cuando corresponde, `data`) |
| `400` | Falta el ID o el cuerpo del producto en la petición |
| `401` | No se envió el token / credenciales incorrectas |
| `403` | Token inválido o expirado |
| `404` | Producto o ruta no encontrada |
| `500` | Error interno del servidor |

## Notas adicionales

- CORS está configurado con `origin: "*"`, por lo que la API acepta peticiones desde cualquier origen.
- El servidor registra en consola el método y la URL de cada petición recibida.
- El puerto está fijado en `3000` dentro de `index.js`.
- No se incluyen pruebas automatizadas (`npm test` no está configurado).
- `src/data/data.json` y `src/models/products_old.models.js` son artifacts de versiones anteriores; la API actual obtiene los datos desde Firestore.
