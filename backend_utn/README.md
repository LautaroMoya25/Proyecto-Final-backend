# Backend UTN - API REST con TypeScript

API REST profesional desarrollada con TypeScript, Express y MongoDB. Incluye autenticación JWT, gestión de productos, validaciones con Zod, rate limiting y más.

## 🚀 Tecnologías Utilizadas

- **TypeScript** - Lenguaje tipado
- **Express** - Framework web
- **MongoDB & Mongoose** - Base de datos NoSQL
- **JWT** - Autenticación con tokens
- **Bcrypt** - Hash de contraseñas
- **Zod** - Validación de schemas
- **Morgan** - Logger de peticiones HTTP
- **Express Rate Limit** - Limitación de peticiones
- **Multer** - Manejo de archivos
- **Nodemailer** - Envío de emails
- **CORS** - Control de acceso entre orígenes

## 📁 Estructura del Proyecto (Patrón MVC)

```
backend_utn/
├── src/
│   ├── config/         # Configuraciones (DB, logger)
│   ├── controllers/    # Lógica de controladores
│   ├── middleware/     # Middlewares (auth, rate limit, upload)
│   ├── model/          # Modelos de MongoDB
│   ├── routes/         # Definición de rutas
│   ├── services/       # Servicios (email)
│   ├── validators/     # Schemas de validación con Zod
│   ├── interfaces/     # Tipos TypeScript
│   └── index.ts        # Punto de entrada
├── dist/               # Código JavaScript compilado
├── uploads/            # Archivos subidos
└── logs/               # Archivos de log
```

## 🔧 Instalación Local

### Prerrequisitos

- Node.js v18 o superior
- MongoDB instalado y corriendo localmente, o cuenta en MongoDB Atlas
- npm o yarn

### Pasos de instalación

1. **Clonar el repositorio**
```bash
git clone <URL_DEL_REPOSITORIO>
cd backend_utn
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**

Copiar el archivo `.env.example` a `.env`:
```bash
cp .env.example .env
```

Editar el archivo `.env` con tus valores:
```env
PORT=3000
FRONTEND_URL=http://localhost:5173
JWT_SECRET=tu_clave_secreta_minimo_32_caracteres_de_largo
URI_DB=mongodb://localhost:27017/backend_utn
EMAIL_USER=tu_email@gmail.com
EMAIL_PASS=tu_contraseña_de_aplicacion
```

4. **Iniciar MongoDB** (si usas local)
```bash
mongod
```

## 📜 Scripts Disponibles

```bash
# Desarrollo - Ejecuta con ts-node-dev y hot reload
npm run dev

# Compilar TypeScript a JavaScript
npm run build

# Producción - Ejecuta el código compilado
npm start
```

## 📡 API Endpoints

### Base URL
- **Local**: `http://localhost:3000`
- **Producción**: `https://tu-app.onrender.com`

### Autenticación

#### 1. Registro de Usuario
```http
POST /auth/register
Content-Type: application/json

{
  "email": "usuario@ejemplo.com",
  "password": "contraseña123"
}
```

**Respuesta exitosa (201)**:
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "email": "usuario@ejemplo.com"
  }
}
```

#### 2. Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "usuario@ejemplo.com",
  "password": "contraseña123"
}
```

**Respuesta exitosa (200)**:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

> ⚠️ **Rate Limit**: Las rutas de autenticación tienen límite de 10 peticiones por 15 minutos por IP.

### Productos

#### 3. Obtener Todos los Productos (con filtros)
```http
GET /products
GET /products?name=laptop
GET /products?category=electrónica
GET /products?minPrice=100&maxPrice=500
GET /products?name=laptop&category=electrónica&minPrice=100&maxPrice=1000
```

**Query Parameters**:
- `name`: Búsqueda parcial por nombre (case insensitive)
- `category`: Filtrar por categoría (case insensitive)
- `stock`: Filtrar por stock exacto
- `minPrice`: Precio mínimo
- `maxPrice`: Precio máximo

**Respuesta exitosa (200)**:
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "name": "Laptop Dell",
      "description": "Laptop potente",
      "price": 999.99,
      "category": "Electrónica",
      "stock": 10,
      "image": "uploads/..."
    }
  ]
}
```

#### 4. Obtener Producto por ID
```http
GET /products/:id
```

**Respuesta exitosa (200)**:
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "Laptop Dell",
    "description": "Laptop potente",
    "price": 999.99,
    "category": "Electrónica",
    "stock": 10
  }
}
```

#### 5. Crear Producto (requiere autenticación)
```http
POST /products
Authorization: Bearer {token}
Content-Type: multipart/form-data

name=Laptop Dell
description=Laptop potente para gaming
price=999.99
category=Electrónica
stock=10
image=[archivo]
```

**Respuesta exitosa (201)**:
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "Laptop Dell",
    "description": "Laptop potente para gaming",
    "price": 999.99,
    "category": "Electrónica",
    "stock": 10,
    "image": "uploads/..."
  }
}
```

#### 6. Actualizar Producto (requiere autenticación)
```http
PATCH /products/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "price": 899.99,
  "stock": 15
}
```

**Respuesta exitosa (200)**:
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "Laptop Dell",
    "price": 899.99,
    "stock": 15
  }
}
```

#### 7. Eliminar Producto (requiere autenticación)
```http
DELETE /products/:id
Authorization: Bearer {token}
```

**Respuesta exitosa (200)**:
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "Laptop Dell"
  }
}
```

### Email

#### 8. Enviar Email
```http
POST /email/send
Content-Type: application/json

{
  "to": "destinatario@ejemplo.com",
  "subject": "Asunto del correo",
  "text": "Contenido del mensaje"
}
```

## 🔐 Autenticación

Para acceder a endpoints protegidos (crear, actualizar, eliminar productos), debes:

1. **Registrarte** o hacer **login** para obtener un token JWT
2. **Incluir el token** en el header `Authorization` de tus peticiones:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Ejemplo con Postman/Bruno:
1. Ir a la pestaña "Headers"
2. Agregar nuevo header:
   - Key: `Authorization`
   - Value: `Bearer TU_TOKEN_AQUI`

### Ejemplo con fetch (JavaScript):
```javascript
const response = await fetch('http://localhost:3000/products', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(productData)
});
```

## 🔍 Query Parameters - Filtrado de Productos

El filtrado se ejecuta **directamente en la base de datos** usando operadores de MongoDB:

```javascript
// Filtro por nombre (búsqueda parcial, case insensitive)
GET /products?name=laptop

// Filtro por categoría
GET /products?category=electrónica

// Filtro por rango de precio
GET /products?minPrice=100&maxPrice=500

// Combinación de filtros
GET /products?name=laptop&category=electrónica&minPrice=500&maxPrice=2000
```

## 🛡️ Seguridad Implementada

- ✅ **Autenticación JWT** con expiración de 1 hora
- ✅ **Hash de contraseñas** con bcrypt (10 rounds)
- ✅ **Rate Limiting** en rutas de autenticación (10 req/15min)
- ✅ **Validación de inputs** con Zod en todos los endpoints
- ✅ **Variables de entorno** para secrets
- ✅ **CORS configurado** para permitir solo orígenes específicos
- ✅ **Middleware de autenticación** para proteger rutas sensibles

## 📝 Logging

El proyecto incluye:
- **Morgan**: Logger de todas las peticiones HTTP (método, ruta, status, tiempo de respuesta)
- **Custom Logger**: Sistema de logs personalizado en `/logs`

## 🚀 Deploy en Render.com

### Backend

Ver guía completa en [DEPLOY.md](./DEPLOY.md)

**Pasos rápidos**:
1. Push del código a GitHub
2. Crear nuevo Web Service en Render
3. Conectar repositorio
4. Configurar:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
5. Agregar variables de entorno
6. Deploy

### Frontend (Vite)

Ver instrucciones detalladas en [DEPLOY.md](./DEPLOY.md)

**Pasos rápidos**:
1. Crear Static Site en Render
2. Build Command: `npm install && npm run build`
3. Publish Directory: `dist`
4. Agregar variable `VITE_API_URL` con la URL del backend

## 🧪 Probando la API

### Con Postman o Bruno:

1. Importar la colección de ejemplos (ver [API_EXAMPLES.md](./API_EXAMPLES.md))
2. Configurar la variable de entorno `base_url`
3. Ejecutar los endpoints en orden

### Workflow de prueba:

1. **Registrar usuario** → Obtener respuesta exitosa
2. **Login** → Copiar el token JWT
3. **Obtener productos** → Ver lista de productos
4. **Crear producto** → Usar token en Authorization header
5. **Actualizar producto** → Usar token en Authorization header
6. **Filtrar productos** → Probar query parameters
7. **Eliminar producto** → Usar token en Authorization header

## 🤝 Contribuir

1. Fork del proyecto
2. Crear rama de feature (`git checkout -b feature/AmazingFeature`)
3. Commit de cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

Backend UTN - Proyecto Final