// Script de prueba para verificar la conexión entre frontend y backend
// Ejecutar en la consola del navegador cuando el frontend esté corriendo

// 1. Verificar que el backend esté respondiendo
fetch('http://localhost:3000/')
    .then(res => res.json())
    .then(data => console.log('✅ Backend responde:', data))
    .catch(err => console.error('❌ Error conectando al backend:', err))

// 2. Obtener productos públicos (no requiere autenticación)
fetch('http://localhost:3000/products')
    .then(res => res.json())
    .then(data => console.log('✅ Productos obtenidos:', data))
    .catch(err => console.error('❌ Error obteniendo productos:', err))

// 3. Probar registro de usuario
const testRegister = async () => {
    const userData = {
        email: 'test@ejemplo.com',
        password: 'password123'
    }

    try {
        const response = await fetch('http://localhost:3000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        const data = await response.json()
        console.log('✅ Usuario registrado:', data)
    } catch (error) {
        console.error('❌ Error en registro:', error)
    }
}

// Descomenta para probar registro:
// testRegister()

console.log('🔗 Script de prueba cargado. Revisa los logs arriba para verificar la conexión.')
