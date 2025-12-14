# MenuLink Frontend 🍽️

Frontend de React para la plataforma de gestión de menús digitales MenuLink.

## Descripción

MenuLink Frontend es una aplicación web moderna construida con **React** y **Vite** que permite a los restaurantes gestionar sus menús digitales de forma fácil e intuitiva.

### Características

- ✨ **Autenticación segura** con JWT
- 📂 **Gestión de categorías** de menú
- 🍽️ **Gestión de items** del menú
- 👁️ **Vista previa** del menú digital
- 📱 **Diseño responsivo** para cualquier dispositivo
- 🎨 **Interfaz moderna y limpia**
- 🔐 **Protección de rutas** para usuarios autenticados

## Tecnologías Utilizadas

- **React 18.2** - Librería UI
- **Vite** - Herramienta de construcción y desarrollo
- **React Router 6** - Enrutamiento
- **Axios** - Cliente HTTP
- **React Icons** - Iconos SVG
- **CSS3** - Estilos personalizados

## Instalación

### Requisitos Previos

- Node.js v16 o superior
- npm o yarn
- Backend MenuLink ejecutándose en `http://localhost:3000`

### Pasos de Instalación

1. **Instalar dependencias:**
```bash
npm install
```

2. **Configurar variables de entorno:**
```bash
cp .env.example .env
```

Edita `.env` y asegúrate de que `VITE_API_BASE_URL` apunta a tu backend:
```
VITE_API_BASE_URL=http://localhost:3000
```

3. **Iniciar el servidor de desarrollo:**
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Vista previa de la compilación de producción
- `npm run lint` - Ejecuta ESLint para verificar el código

## Estructura de Carpetas

```
frontend/
├── public/               # Archivos estáticos
├── src/
│   ├── components/       # Componentes reutilizables
│   │   ├── Alert.jsx     # Componente de alertas
│   │   ├── ItemCard.jsx  # Tarjeta para mostrar items
│   │   ├── Modal.jsx     # Componente modal
│   │   ├── Navbar.jsx    # Barra de navegación
│   │   └── ...
│   ├── pages/            # Páginas principales
│   │   ├── Dashboard.jsx # Panel de control
│   │   ├── Categories.jsx # Gestión de categorías
│   │   ├── MenuItems.jsx  # Gestión de items
│   │   ├── Login.jsx      # Página de login
│   │   ├── Register.jsx   # Página de registro
│   │   └── ...
│   ├── services/         # Servicios API
│   │   ├── apiClient.js  # Cliente HTTP configurado
│   │   ├── authService.js
│   │   ├── categoryService.js
│   │   ├── menuItemService.js
│   │   └── publicService.js
│   ├── context/          # Context API para estado global
│   │   └── AuthContext.jsx
│   ├── styles/           # Estilos CSS
│   │   ├── global.css
│   │   ├── components.css
│   │   └── forms.css
│   ├── App.jsx           # Componente principal
│   └── main.jsx          # Punto de entrada
├── index.html
├── package.json
├── vite.config.js
└── .env
```

## Flujo de Autenticación

1. El usuario se registra o inicia sesión
2. Se genera un token JWT que se guarda en localStorage
3. Axios intercepta automáticamente las peticiones y agrega el token
4. Si el token expira o es inválido, se redirige al login
5. Las rutas protegidas redirigen a login si no hay usuario autenticado

## Páginas Principales

### Públicas
- **`/`** - Página de inicio
- **`/login`** - Iniciar sesión
- **`/register`** - Registrar nuevo restaurante

### Protegidas (Requieren autenticación)
- **`/dashboard`** - Panel de control principal
- **`/categories`** - Gestión de categorías del menú
- **`/menu-items`** - Gestión de items del menú
- **`/preview`** - Vista previa del menú digital

## Endpoints de API Utilizados

### Autenticación
- `POST /api/auth/register` - Registrar nuevo restaurante
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/profile` - Obtener perfil del usuario

### Categorías
- `GET /api/categories` - Obtener todas las categorías
- `POST /api/categories` - Crear nueva categoría
- `PUT /api/categories/:id` - Actualizar categoría
- `DELETE /api/categories/:id` - Eliminar categoría

### Items de Menú
- `GET /api/menu-items` - Obtener todos los items
- `POST /api/menu-items` - Crear nuevo item
- `PUT /api/menu-items/:id` - Actualizar item
- `DELETE /api/menu-items/:id` - Eliminar item

### Público
- `GET /api/public/menu/:slug` - Obtener menú público
- `GET /api/public/restaurants` - Listar restaurantes activos

## Componentes Principales

### Alert
Componente para mostrar mensajes de éxito, error, info o advertencia.

```jsx
<Alert 
  type="success" 
  message="¡Operación completada!" 
  onClose={() => setAlert('')}
/>
```

### Modal
Componente modal reutilizable para formularios y confirmaciones.

```jsx
<Modal
  isOpen={isOpen}
  title="Mi Modal"
  onClose={() => setIsOpen(false)}
>
  {/* Contenido */}
</Modal>
```

### ProtectedRoute
Componente para proteger rutas que requieren autenticación.

```jsx
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

## Estilos y Temas

La aplicación utiliza una paleta de colores consistente:
- **Primary**: `#4CAF50` (Verde)
- **Secondary**: `#2196F3` (Azul)
- **Danger**: `#f44336` (Rojo)
- **Dark**: `#2c3e50` (Gris oscuro)

Todos los estilos están en archivos CSS modular para fácil mantenimiento.

## Mejoras Futuras

- [ ] Publicación compartida de menús con enlaces únicos
- [ ] Subida de imágenes en lugar de URLs
- [ ] Historial de cambios
- [ ] Exportación a PDF
- [ ] Integración de pagos
- [ ] Sistema de valoraciones
- [ ] App móvil nativa

## Troubleshooting

### Error: "Cannot GET /api/..."
Asegúrate de que el backend está ejecutándose en `http://localhost:3000`

### Error: "401 Unauthorized"
Tu token JWT ha expirado. Inicia sesión de nuevo.

### Problemas CORS
Verifica que el backend tiene CORS habilitado correctamente.

## Licencia

Este proyecto es parte de un trabajo académico.

## Contacto

Para más información, contacta al equipo de desarrollo.
