# Colección Bruno - Backend UTN API

Esta carpeta contiene la colección completa de Bruno para probar todos los endpoints de la API.

## 📦 ¿Qué es Bruno?

Bruno es una herramienta alternativa a Postman para testing de APIs. Es open source, rápida y almacena las colecciones como archivos de texto plano.

## 🚀 Instalación de Bruno

1. Descarga Bruno desde: https://www.usebruno.com/
2. Instala la aplicación en tu sistema
3. Abre Bruno

## 📂 Importar esta Colección

1. Abre Bruno
2. Click en "Open Collection"
3. Navega a esta carpeta: `backend_utn/bruno-collection`
4. Selecciona la carpeta completa

La colección se cargará automáticamente con todos los requests organizados.

## ⚙️ Configuración

### Variables de Entorno

La colección usa estas variables (ya configuradas en `bruno.json`):

- `baseUrl`: URL base de tu API
  - **Local**: `http://localhost:3000`
  - **Producción**: `https://tu-app.onrender.com`

- `token`: Token JWT (se guarda automáticamente al hacer login)

### Cambiar entre Local y Producción

Para probar en producción:

1. En Bruno, abre la configuración de environment
2. Cambia `baseUrl` a tu URL de Render
3. Guarda los cambios

## 🎯 Orden de Ejecución Recomendado

### 1. **Auth - Register** ✅
- Crea una cuenta de prueba
- Email: `test@ejemplo.com`
- Password: `password123`

### 2. **Auth - Login** ✅
- Inicia sesión con las credenciales
- **El token se guarda automáticamente** en la variable `{{token}}`
- Verás un mensaje en consola: "✅ Token guardado automáticamente"

### 3. **Products - Get All Products** 🔓
- Ver todos los productos (público, no requiere auth)

### 4. **Products - Get All with Filters** 🔓
- Probar filtros: nombre, precio, categoría, stock
- Modificar los query params según necesites

### 5. **Products - Get Product by ID** 🔓
- **IMPORTANTE**: Reemplaza `PRODUCT_ID_HERE` en la URL con un ID real
- Copia un ID de la respuesta de "Get All Products"

### 6. **Products - Create Product** 🔒
- Requiere autenticación (usa el token del login)
- Crea un producto de prueba
- Verifica que devuelve status 201

### 7. **Products - Update Product** 🔒
- **IMPORTANTE**: Reemplaza `PRODUCT_ID_HERE` en la URL
- Modifica el body con los campos que quieras actualizar
- Requiere autenticación

### 8. **Products - Delete Product** 🔒  
- **IMPORTANTE**: Reemplaza `PRODUCT_ID_HERE` en la URL
- ⚠️ Acción irreversible
- Requiere autenticación

## 🔐 Autenticación

### Endpoints que NO requieren auth (🔓):
- GET /products (todos)
- GET /products (con filtros)
- GET /products/:id (uno específico)
- POST /auth/register
- POST /auth/login

### Endpoints que SÍ requieren auth (🔒):
- POST /products (crear)
- PATCH /products/:id (actualizar)
- DELETE /products/:id (eliminar)

Los requests que requieren auth tienen configurado `auth: bearer` con `token: {{token}}`.

## 🧪 Tests Automáticos

Cada request incluye tests que se ejecutan automáticamente después de recibir la respuesta:

- ✅ Verifican el status code correcto
- ✅ Validan la estructura de la respuesta
- ✅ Comprueban que los datos sean del tipo esperado

Para ver los resultados:
1. Ejecuta un request
2. Ve a la pestaña "Tests" en la respuesta
3. Verás qué tests pasaron (✓) o fallaron (✗)

## 📸 Capturas para la Entrega

Para tu entrega del proyecto, toma capturas de pantalla mostrando:

1. **Register**: Request y response exitoso (201)
2. **Login**: Request y response con el token
3. **Get All Products**: Lista de productos
4. **Get All with Filters**: Productos filtrados
5. **Create Product**: Producto creado (201) con el header Authorization
6. **Update Product**: Producto actualizado con el header Authorization
7. **Delete Product**: Producto eliminado con el header Authorization

### Cómo tomar capturas en Bruno:

- Asegúrate de mostrar:
  - La URL y método HTTP
  - El body del request (si aplica)
  - Los headers (especialmente Authorization en requests protegidos)
  - La respuesta completa
  - El status code

## ⏱️ Rate Limiting

**IMPORTANTE**: Las rutas de autenticación tienen límite:

- **10 peticiones cada 15 minutos**
- Si haces más de 10 registros/logins en 15 min, recibirás error 429

Para demostrar el rate limiting en tu video:
1. Haz 11 peticiones rápidas a `/auth/login`
2. La petición #11 debe devolver 429 con mensaje de límite

## 🔄 Reiniciar el Token

El token JWT expira en **1 hora**. Si recibes error 401:

1. Vuelve a ejecutar **Auth - Login**
2. El nuevo token se guardará automáticamente
3. Repite los requests protegidos

## 💡 Tips

- **IDs de MongoDB**: Son strings de 24 caracteres hexadecimales (ej: `507f1f77bcf86cd799439011`)
- **Validaciones**: Si recibes error 400, lee el mensaje de error que indica exactamente qué campo falló
- **CORS**: Si pruebas desde el navegador y ves errores de CORS, verifica que `FRONTEND_URL` en el backend esté configurado correctamente
- **Producción**: Recuerda cambiar `baseUrl` cuando pruebes el deploy en Render

## 📚 Recursos

- [Documentación de Bruno](https://docs.usebruno.com/)
- [README del Backend](../README.md) - Documentación completa de la API
- [.env.example](../.env.example) - Variables de entorno necesarias

---

**¡Listo para probar tu API!** 🚀

Si tienes dudas, consulta la documentación completa en el README del proyecto.
