# MenuLink - Arquitectura del Sistema

## 🏗️ Diagrama de Arquitectura General

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENTE (NAVEGADOR)                      │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                  FRONTEND - REACT                    │  │
│  │                                                      │  │
│  │  ┌────────────────────────────────────────────────┐ │  │
│  │  │            PÁGINAS (7)                         │ │  │
│  │  │  ├─ Home          (pública)                   │ │  │
│  │  │  ├─ Login         (pública)                   │ │  │
│  │  │  ├─ Register      (pública)                   │ │  │
│  │  │  ├─ Dashboard     (protegida)                 │ │  │
│  │  │  ├─ Categories    (protegida)                 │ │  │
│  │  │  ├─ MenuItems     (protegida)                 │ │  │
│  │  │  └─ Preview       (protegida)                 │ │  │
│  │  └────────────────────────────────────────────────┘ │  │
│  │                                                      │  │
│  │  ┌────────────────────────────────────────────────┐ │  │
│  │  │          COMPONENTES (6)                       │ │  │
│  │  │  ├─ Navbar                                    │ │  │
│  │  │  ├─ ProtectedRoute                            │ │  │
│  │  │  ├─ Alert                                     │ │  │
│  │  │  ├─ Modal                                     │ │  │
│  │  │  ├─ ItemCard                                  │ │  │
│  │  │  └─ LoadingSpinner                            │ │  │
│  │  └────────────────────────────────────────────────┘ │  │
│  │                                                      │  │
│  │  ┌────────────────────────────────────────────────┐ │  │
│  │  │        CONTEXT API                            │ │  │
│  │  │  └─ AuthContext (autenticación global)        │ │  │
│  │  └────────────────────────────────────────────────┘ │  │
│  │                                                      │  │
│  │  ┌────────────────────────────────────────────────┐ │  │
│  │  │        SERVICIOS (5)                          │ │  │
│  │  │  ├─ apiClient.js (Axios + interceptores)      │ │  │
│  │  │  ├─ authService.js                            │ │  │
│  │  │  ├─ categoryService.js                        │ │  │
│  │  │  ├─ menuItemService.js                        │ │  │
│  │  │  └─ publicService.js                          │ │  │
│  │  └────────────────────────────────────────────────┘ │  │
│  │                                                      │  │
│  │  ┌────────────────────────────────────────────────┐ │  │
│  │  │        ESTILOS (3)                            │ │  │
│  │  │  ├─ global.css                                │ │  │
│  │  │  ├─ components.css                            │ │  │
│  │  │  └─ forms.css                                 │ │  │
│  │  └────────────────────────────────────────────────┘ │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│           http://localhost:5173 (VITE DEV SERVER)         │
└─────────────────────────────────────────────────────────────┘
                            │
                    HTTP/REST API
                            │
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                   BACKEND - EXPRESS                         │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │            RUTAS (4 principales)                    │  │
│  │  ├─ /api/auth/*          (autenticación)           │  │
│  │  ├─ /api/categories/*    (categorías)              │  │
│  │  ├─ /api/menu-items/*    (items del menú)          │  │
│  │  └─ /api/public/*        (acceso público)          │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │        CONTROLLERS (Lógica de Negocio)              │  │
│  │  ├─ authController.js                              │  │
│  │  ├─ categoryController.js                           │  │
│  │  ├─ menuItemController.js                           │  │
│  │  └─ publicController.js                             │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │          SERVICIOS (Lógica específica)              │  │
│  │  ├─ authService.js                                 │  │
│  │  ├─ categoryService.js                              │  │
│  │  ├─ menuItemService.js                              │  │
│  │  └─ publicService.js                                │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │      REPOSITORIOS (Acceso a Datos)                  │  │
│  │  ├─ categoryRepository.js                           │  │
│  │  ├─ menuItemRepository.js                           │  │
│  │  └─ restaurantRepository.js                         │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         MODELOS (ORM - Sequelize)                   │  │
│  │  ├─ Restaurant                                      │  │
│  │  ├─ Category                                        │  │
│  │  ├─ MenuItem                                        │  │
│  │  └─ Relaciones                                      │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │      MIDDLEWARES (Procesamiento de Peticiones)      │  │
│  │  ├─ authMiddleware.js       (validar tokens)        │  │
│  │  ├─ validationMiddleware.js (validar datos)         │  │
│  │  ├─ errorHandler.js         (manejo de errores)     │  │
│  │  └─ logger.js               (logs)                  │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │          CONFIGURACIÓN                              │  │
│  │  ├─ database.js    (conexión BD)                    │  │
│  │  ├─ jwt.js         (tokens JWT)                     │  │
│  │  └─ config.js      (variables globales)             │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│           http://localhost:3000 (EXPRESS SERVER)           │
└─────────────────────────────────────────────────────────────┘
                            │
                    Query SQL
                            │
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                   BASE DE DATOS                             │
│                   SQL SERVER                                │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │          TABLAS                                      │  │
│  │  ├─ Restaurants         (restaurantes)              │  │
│  │  │   ├─ id (PK)                                     │  │
│  │  │   ├─ name                                        │  │
│  │  │   ├─ email (UNIQUE)                              │  │
│  │  │   ├─ password (hash)                             │  │
│  │  │   ├─ address                                     │  │
│  │  │   ├─ phone                                       │  │
│  │  │   ├─ slug (UNIQUE)                               │  │
│  │  │   └─ timestamps                                  │  │
│  │  │                                                   │  │
│  │  ├─ Categories         (categorías)                 │  │
│  │  │   ├─ id (PK)                                     │  │
│  │  │   ├─ name                                        │  │
│  │  │   ├─ description                                 │  │
│  │  │   ├─ restaurant_id (FK)                          │  │
│  │  │   ├─ display_order                               │  │
│  │  │   └─ timestamps                                  │  │
│  │  │                                                   │  │
│  │  └─ MenuItems          (items de menú)              │  │
│  │      ├─ id (PK)                                     │  │
│  │      ├─ name                                        │  │
│  │      ├─ description                                 │  │
│  │      ├─ price                                       │  │
│  │      ├─ image_url                                   │  │
│  │      ├─ category_id (FK)                            │  │
│  │      ├─ restaurant_id (FK)                          │  │
│  │      ├─ display_order                               │  │
│  │      └─ timestamps                                  │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 📊 Flujo de Datos

### 1. Registro de Usuario

```
[Frontend]                    [Backend]               [Database]
   │                             │                        │
   ├─ Ingresa datos ─────────────>                        │
   │                             ├─ Valida entrada        │
   │                             ├─ Hashea contraseña     │
   │                             ├─ Verifica email único ─>│
   │                             ├─ Crea restaurant ─────>│
   │                             <─ Devuelve respuesta ───┤
   <─ Success / Error ───────────┤                        │
   │                             │                        │
```

### 2. Login

```
[Frontend]                    [Backend]               [Database]
   │                             │                        │
   ├─ email + password ────────────>                      │
   │                             ├─ Busca usuario ───────>│
   │                             <─ Devuelve usuario ────┤
   │                             ├─ Verifica contraseña   │
   │                             ├─ Genera JWT token      │
   │                             <─ Envía token ─────────┤
   <─ Token en respuesta ────────┤                        │
   │                             │                        │
   └─ Guarda en localStorage     │                        │
```

### 3. Petición Protegida (Crear Categoría)

```
[Frontend]                    [Backend]               [Database]
   │                             │                        │
   ├─ Datos + JWT token ────────────>                     │
   │                             ├─ authMiddleware        │
   │                             ├─ Verifica JWT válido   │
   │                             ├─ Extrae restaurant_id  │
   │                             ├─ Valida datos          │
   │                             ├─ Crea categoría ─────>│
   │                             <─ Devuelve categoría ──┤
   <─ Success + categoría ──────┤                        │
   │                             │                        │
```

---

## 🔐 Flujo de Autenticación

```
1. Usuario se registra
   ↓
2. Contraseña se hashea con bcryptjs
   ↓
3. Se guarda en base de datos
   ↓
4. Usuario intenta login
   ↓
5. Se verifica contraseña contra hash
   ↓
6. Si es válido, se genera JWT token
   ↓
7. Frontend guarda token en localStorage
   ↓
8. Cada petición incluye token en header
   ↓
9. Backend verifica token antes de procesar
   ↓
10. Si expira, se redirige a login
```

---

## 🔄 Ciclo de Vida de una Petición

### Frontend (React)

```
Usuario interactúa
         ↓
   Evento click/submit
         ↓
   Componente actualiza estado
         ↓
   Llama a servicio (ej: categoryService.create())
         ↓
   Servicio llama apiClient
         ↓
   apiClient agrega JWT token
         ↓
   Envía petición al backend
         ↓
   Espera respuesta
         ↓
   Maneja éxito o error
         ↓
   Actualiza UI con resultado
```

### Backend (Express)

```
Recibe petición HTTP
         ↓
   express.json() parsea body
         ↓
   Middlewares (CORS, auth)
         ↓
   Valida JWT token
         ↓
   Valida datos de entrada
         ↓
   Controller procesa lógica
         ↓
   Service executa reglas de negocio
         ↓
   Repository accede a base de datos
         ↓
   Devuelve resultado
         ↓
   Error handler captura errores
         ↓
   Envia respuesta JSON al cliente
```

---

## 🗄️ Modelo de Datos

### Relaciones

```
Restaurant (1) ──────┬──────── (N) Category
                     │
                     └──────── (N) MenuItem


Category (1) ──────────── (N) MenuItem
```

### Estructura de Tablas

#### Restaurants
```
- id (INT, PK, AUTO_INCREMENT)
- name (VARCHAR(255), NOT NULL)
- email (VARCHAR(255), UNIQUE, NOT NULL)
- password (VARCHAR(255), NOT NULL) [hash]
- address (VARCHAR(255), NULL)
- phone (VARCHAR(20), NULL)
- slug (VARCHAR(255), UNIQUE, NOT NULL)
- is_active (BOOLEAN, DEFAULT true)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

#### Categories
```
- id (INT, PK, AUTO_INCREMENT)
- name (VARCHAR(255), NOT NULL)
- description (TEXT, NULL)
- restaurant_id (INT, FK -> Restaurants.id)
- display_order (INT, DEFAULT 1)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

#### MenuItems
```
- id (INT, PK, AUTO_INCREMENT)
- name (VARCHAR(255), NOT NULL)
- description (TEXT, NULL)
- price (DECIMAL(10,2), NOT NULL)
- image_url (VARCHAR(255), NULL)
- category_id (INT, FK -> Categories.id)
- restaurant_id (INT, FK -> Restaurants.id)
- display_order (INT, DEFAULT 1)
- is_available (BOOLEAN, DEFAULT true)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

---

## 🚀 Stack Tecnológico

### Frontend
- **React 18.2** - Librería UI
- **Vite 5.0** - Build tool
- **React Router 6.20** - Routing
- **Axios 1.6** - HTTP client
- **CSS3** - Estilos nativos
- **React Icons 4.12** - Iconos

### Backend
- **Node.js** - Runtime
- **Express 5.1** - Framework web
- **Sequelize 6.37** - ORM
- **JWT 9.0.3** - Autenticación
- **bcryptjs 3.0.3** - Hash de contraseñas
- **Swagger UI 5.0.1** - Documentación API

### Base de Datos
- **SQL Server** - DBMS
- **Tedious 19.1.3** - Driver para Node.js

---

## 🔌 Endpoints Principales

### Autenticación
```
POST   /api/auth/register      - Registrar restaurante
POST   /api/auth/login         - Iniciar sesión
GET    /api/auth/profile       - Obtener perfil (protegido)
```

### Categorías
```
GET    /api/categories         - Obtener todas (protegido)
POST   /api/categories         - Crear nueva (protegido)
GET    /api/categories/:id     - Obtener una (protegido)
PUT    /api/categories/:id     - Actualizar (protegido)
DELETE /api/categories/:id     - Eliminar (protegido)
```

### Items de Menú
```
GET    /api/menu-items         - Obtener todos (protegido)
POST   /api/menu-items         - Crear nuevo (protegido)
GET    /api/menu-items/:id     - Obtener uno (protegido)
PUT    /api/menu-items/:id     - Actualizar (protegido)
DELETE /api/menu-items/:id     - Eliminar (protegido)
```

### Público
```
GET    /api/public/menu/:slug  - Obtener menú público
GET    /api/public/restaurants - Listar restaurantes
```

---

## 🎯 Patrones de Diseño Utilizados

### Frontend
- **Component Pattern** - Componentes reutilizables
- **Custom Hooks** - Lógica extraída y reutilizable
- **Context API** - Estado global
- **Service Pattern** - Servicios para llamadas API
- **Router Pattern** - Enrutamiento con React Router

### Backend
- **MVC Pattern** - Separación de responsabilidades
- **Repository Pattern** - Abstracción de datos
- **Service Pattern** - Lógica de negocio
- **Middleware Pattern** - Procesamiento de peticiones
- **Singleton Pattern** - Conexión a BD

---

## 📈 Escalabilidad

### Frontend
- Componentes modular facilita agregar nuevos
- Services desacoplados del UI
- Context API listo para Redux si es necesario

### Backend
- Estructura MVC es escalable
- Fácil agregar nuevos controllers/services
- ORM permite cambiar BD fácilmente
- Rutas modularizadas por dominio

---

## 🔒 Seguridad

### Frontend
- Tokens guardados en localStorage (seguro para este caso)
- Rutas protegidas con ProtectedRoute
- Validación de entrada en formularios
- HTTPS ready

### Backend
- JWT para autenticación
- bcryptjs para hash de contraseñas
- Validación de entrada
- CORS configurado
- SQL injection prevención (ORM)
- Rate limiting preparado

---

**Arquitectura diseñada para ser simple, mantenible y escalable.**
