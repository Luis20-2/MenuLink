# MenuLink - Guía Completa de Instalación y Uso

## 🎉 Bienvenido a MenuLink

MenuLink es una plataforma completa para la gestión de menús digitales de restaurantes. Este documento te guiará a través de todo el proceso de instalación, configuración y uso.

## 📋 Contenidos

1. [Requisitos del Sistema](#requisitos-del-sistema)
2. [Instalación](#instalación)
3. [Estructura del Proyecto](#estructura-del-proyecto)
4. [Ejecución de la Aplicación](#ejecución-de-la-aplicación)
5. [Uso de la Aplicación](#uso-de-la-aplicación)
6. [Solución de Problemas](#solución-de-problemas)
7. [Funcionalidades](#funcionalidades)

## 🖥️ Requisitos del Sistema

- **Node.js**: v16 o superior
- **npm**: v7 o superior (viene con Node.js)
- **SQL Server**: Para la base de datos del backend
- **Navegador**: Chrome, Firefox, Safari o Edge (versión reciente)

Verifica que tengas Node.js instalado:
```powershell
node --version
npm --version
```

## 📥 Instalación

### Paso 1: Backend

El backend ya está configurado en la carpeta `src/`. Solo necesitas instalar las dependencias:

```powershell
# Ve a la carpeta del backend
cd src

# Instala las dependencias
npm install

# Vuelve a la carpeta raíz
cd ..
```

### Paso 2: Frontend

El frontend se encuent en la carpeta `frontend/` y sus dependencias ya están instaladas:

```powershell
# Ve a la carpeta del frontend
cd frontend

# Verifica que las dependencias están instaladas
npm install

# Vuelve a la carpeta raíz
cd ..
```

### Paso 3: Configuración

Asegúrate de tener un archivo `.env` en la carpeta `src/` con la configuración de tu base de datos.

También verifica que `frontend/.env` contenga:
```
VITE_API_BASE_URL=http://localhost:3000
```

## 📁 Estructura del Proyecto

```
MenuLink/
├── src/                          # Backend - API REST
│   ├── app.js                    # Aplicación principal
│   ├── config/
│   │   ├── database.js           # Configuración de BD
│   │   ├── jwt.js                # Configuración JWT
│   │   └── config.js
│   ├── controllers/              # Lógica de negocio
│   ├── models/                   # Modelos de BD
│   ├── routes/                   # Rutas de la API
│   ├── services/                 # Servicios
│   ├── middlewares/              # Middlewares
│   ├── repositories/             # Acceso a datos
│   └── package.json
│
├── frontend/                     # Frontend - React + Vite
│   ├── src/
│   │   ├── components/           # Componentes reutilizables
│   │   ├── pages/                # Páginas principales
│   │   ├── services/             # Servicios API
│   │   ├── context/              # Context API
│   │   ├── styles/               # Estilos CSS
│   │   ├── App.jsx               # Componente raíz
│   │   └── main.jsx              # Punto de entrada
│   ├── public/                   # Archivos estáticos
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── .env
│
├── start.bat                     # Script para Windows
├── start.sh                      # Script para Linux/Mac
├── Generete_secret.js            # Generador de secretos JWT
├── Readme.md                     # Readme del proyecto
└── package.json                  # Dependencias raíz
```

## 🚀 Ejecución de la Aplicación

### Opción 1: Usar el Script de Inicio (Recomendado)

#### En Windows:
```powershell
# Simplemente haz doble clic en start.bat
# O ejecuta:
.\start.bat
```

#### En Linux/Mac:
```bash
chmod +x start.sh
./start.sh
```

### Opción 2: Iniciar Manualmente

Necesitarás dos terminales:

**Terminal 1 - Backend:**
```powershell
cd src
npm run dev
```

El backend estará disponible en: `http://localhost:3000`

**Terminal 2 - Frontend:**
```powershell
cd frontend
npm run dev
```

El frontend estará disponible en: `http://localhost:5173`

### Acceso a la Aplicación

Una vez que ambos servidores estén ejecutándose:

1. Abre tu navegador
2. Ve a: `http://localhost:5173`
3. ¡Bienvenido a MenuLink!

## 💻 Uso de la Aplicación

### Registro de Restaurante

1. Haz clic en "Registrarse" en la página de inicio
2. Completa el formulario con:
   - Nombre del restaurante
   - Email
   - Contraseña (mínimo 6 caracteres)
   - Teléfono y dirección (opcionales)
3. Haz clic en "Registrarse"

### Inicio de Sesión

1. Haz clic en "Iniciar Sesión"
2. Ingresa tu email y contraseña
3. Serás redirigido al panel de control

### Gestión de Categorías

1. Ve a "Categorías" en el menú
2. Haz clic en "Nueva Categoría"
3. Completa:
   - Nombre de la categoría (requerido)
   - Descripción (opcional)
   - Orden de visualización
4. Haz clic en "Crear Categoría"

**Ejemplos de categorías:**
- Entradas
- Platos Principales
- Postres
- Bebidas
- Ensaladas

### Gestión de Items del Menú

1. Ve a "Items de Menú" en el menú
2. Haz clic en "Nuevo Item"
3. Completa:
   - Nombre del item (requerido)
   - Descripción
   - Precio (requerido)
   - Categoría (requerido)
   - URL de imagen (opcional)
   - Orden de visualización
4. Haz clic en "Crear Item"

### Vista Previa

1. Ve a "Vista Previa" en el menú
2. Aquí verás cómo tus clientes verán tu menú
3. Haz clic en las pestañas de categorías para cambiar entre ellas

### Panel de Control

1. Ve a "Dashboard" desde el menú
2. Aquí encuentras accesos rápidos a:
   - Gestión de categorías
   - Gestión de items
   - Vista previa
   - Información de tu restaurante

## 🔒 Autenticación y Seguridad

### Cómo funciona la autenticación:

1. **Registro**: Se crea un nuevo usuario con contraseña cifrada
2. **Login**: Se genera un token JWT válido por 24 horas
3. **Protección de rutas**: Las rutas protegidas requieren un token válido
4. **Almacenamiento**: El token se guarda en localStorage del navegador
5. **Cierre de sesión**: Se elimina el token, invalidando la sesión

### Buenas prácticas de seguridad:

- Nunca compartas tu contraseña
- Cierra sesión cuando termines
- No guardes datos sensibles en el navegador
- Usa contraseñas fuertes (mínimo 8 caracteres)

## 🔧 Solución de Problemas

### Error: "Cannot connect to backend"

**Solución:**
1. Verifica que el backend está ejecutándose en `http://localhost:3000`
2. Comprueba que no hay otro programa usando el puerto 3000
3. Reinicia el backend

### Error: "401 Unauthorized"

**Solución:**
1. Tu token ha expirado, inicia sesión nuevamente
2. Borra los cookies/cache del navegador y vuelve a intentar
3. Verifica que tu contraseña es correcta

### Error: "Cannot GET /api/..."

**Solución:**
1. Asegúrate de que el endpoint existe en el backend
2. Verifica que el método HTTP es correcto (GET, POST, etc.)
3. Comprueba la URL del API en `.env`

### Problema: El frontend no se carga

**Solución:**
1. Verifica que Vite se está ejecutando correctamente
2. Prueba acceder a `http://localhost:5173` directamente
3. Borra la carpeta `node_modules` y reinstala: `npm install`
4. Borra el caché: presiona `Ctrl+Shift+Del` y limpia caché/cookies

### Problema: Los estilos CSS no se cargan

**Solución:**
1. Recarga la página: `Ctrl+R` o `Cmd+R`
2. Limpia el caché: `Ctrl+Shift+Del`
3. Abre la consola (F12) y busca errores

## ✨ Funcionalidades Principales

### Gestión de Menús
- ✅ Crear, editar y eliminar categorías
- ✅ Crear, editar y eliminar items
- ✅ Organizar items con orden de visualización
- ✅ Agregar imágenes a los items
- ✅ Gestionar precios

### Autenticación
- ✅ Registro de restaurantes
- ✅ Login seguro con JWT
- ✅ Sesiones persistentes
- ✅ Cierre de sesión

### Interfaz de Usuario
- ✅ Dashboard intuitivo
- ✅ Formularios validados
- ✅ Alertas y notificaciones
- ✅ Modalas para edición
- ✅ Vista previa en tiempo real

### Seguridad
- ✅ Cifrado de contraseñas con bcryptjs
- ✅ Tokens JWT para autenticación
- ✅ Rutas protegidas
- ✅ Validación de entrada

## 📊 Endpoints de API Disponibles

### Autenticación
- `POST /api/auth/register` - Registrar nuevo restaurante
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/profile` - Obtener perfil (requiere token)

### Categorías
- `GET /api/categories` - Obtener todas las categorías
- `GET /api/categories/:id` - Obtener categoría específica
- `POST /api/categories` - Crear nueva categoría
- `PUT /api/categories/:id` - Actualizar categoría
- `DELETE /api/categories/:id` - Eliminar categoría

### Items de Menú
- `GET /api/menu-items` - Obtener todos los items
- `GET /api/menu-items/:id` - Obtener item específico
- `GET /api/menu-items/category/:categoryId` - Items por categoría
- `POST /api/menu-items` - Crear nuevo item
- `PUT /api/menu-items/:id` - Actualizar item
- `DELETE /api/menu-items/:id` - Eliminar item

### Público
- `GET /api/public/menu/:slug` - Obtener menú público
- `GET /api/public/restaurants` - Listar restaurantes activos

## 🎓 Conceptos Importantes

### JWT (JSON Web Token)
- Token de autenticación seguro
- Se envía en cada petición al backend
- Válido por 24 horas
- Se almacena en localStorage

### React Hooks
- `useState` - Manejo de estado local
- `useEffect` - Efectos secundarios
- `useContext` - Contexto global
- `useNavigate` - Navegación entre páginas

### Context API
- AuthContext - Gestión de autenticación global
- Proporciona `user`, `login`, `logout`, `register`

### Servicios API
- `apiClient` - Cliente HTTP configurado con Axios
- `authService` - Funciones de autenticación
- `categoryService` - Funciones de categorías
- `menuItemService` - Funciones de items
- `publicService` - Funciones públicas

## 🚀 Próximas Mejoras Planificadas

- [ ] Publicación compartida de menús
- [ ] Subida de imágenes a servidor
- [ ] Historial de cambios
- [ ] Exportación a PDF
- [ ] Integración de pagos
- [ ] Sistema de valoraciones
- [ ] App móvil nativa

## 📞 Soporte

Si encuentras algún problema:

1. Verifica los logs en la consola (F12)
2. Comprueba que ambos servidores están ejecutándose
3. Reinicia la aplicación
4. Borra caché y cookies del navegador
5. Contacta al equipo de desarrollo

## 📄 Licencia

Este proyecto es parte de un trabajo académico de Backend II.

---

**¡Estamos listos!** Ahora puedes usar MenuLink para gestionar tus menús digitales. 🎉
