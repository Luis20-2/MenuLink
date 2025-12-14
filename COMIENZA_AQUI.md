# 🚀 COMIENZA AQUI - Instrucciones Rápidas

## ⚡ Quick Start (30 segundos)

### Para Windows:
```powershell
cd "c:\Users\contr\OneDrive\Documentos\tarea\8 cuatrimestre\-DESARROLLO DE SOFTWARE BACKEND II\MenuLink"
.\start.bat
```

Abre tu navegador en: **http://localhost:5173**

---

## 📖 Para Leer Primero

Lee estos archivos en este orden:

1. 📄 **Este archivo** (lo que estás leyendo ahora)
2. 📋 **GUIA_COMPLETA.md** - Guía detallada de uso
3. 🧪 **DATOS_PRUEBA.md** - Datos para probar la app
4. 📝 **RESUMEN_IMPLEMENTACION.md** - Lo que se creó

---

## 🎯 Lo Que Necesitas Saber

### ✅ Ya Está Hecho
- ✨ Frontend completo con React + Vite
- 📦 Todas las páginas implementadas
- 🔐 Sistema de autenticación seguro
- 🎨 Diseño moderno y responsivo
- 📚 Documentación completa
- 🚀 Scripts de inicio automáticos

### 🔄 Próximos Pasos

1. **Asegúrate de que tu Backend está funcionando**
   - El backend debe estar en `http://localhost:3000`
   - Revisa que tienes variables de entorno configuradas en `src/.env`

2. **Inicia la aplicación**
   - Windows: Haz doble clic en `start.bat`
   - Linux/Mac: Ejecuta `./start.sh`

3. **Accede al frontend**
   - Abre: `http://localhost:5173`

4. **Registra un restaurante**
   - Haz clic en "Registrarse"
   - Completa el formulario
   - Inicia sesión

5. **Prueba la aplicación**
   - Crea categorías
   - Agrega items de menú
   - Visualiza la vista previa

---

## 📁 Estructura Principal

```
MenuLink/
├── src/                    ← Tu Backend (Express)
├── frontend/               ← Tu Frontend (React) ← NUEVO
├── GUIA_COMPLETA.md       ← Lee esto
├── DATOS_PRUEBA.md        ← Datos de ejemplo
├── RESUMEN_IMPLEMENTACION.md
├── start.bat              ← Click aquí (Windows)
└── start.sh               ← Ejecuta esto (Linux/Mac)
```

---

## 🔧 Requisitos

- ✅ Node.js v16+
- ✅ npm v7+
- ✅ Backend ejecutándose en puerto 3000
- ✅ SQL Server configurado

---

## 💻 Comandos Útiles

### Iniciar todo
```powershell
# Windows
.\start.bat

# Linux/Mac
./start.sh
```

### Iniciar solo frontend
```powershell
cd frontend
npm run dev
# Abre: http://localhost:5173
```

### Iniciar solo backend
```powershell
cd src
npm run dev
# Backend: http://localhost:3000
```

### Ver documentación de API
```
http://localhost:3000/api-docs
```

---

## 🎨 URLs Importantes

| Servicio | URL |
|----------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:3000 |
| Swagger API Docs | http://localhost:3000/api-docs |

---

## 🆘 Problemas Comunes

### Error: "Cannot connect to backend"
→ Asegúrate de que el backend está ejecutándose en puerto 3000

### Error: "Cannot find module"
→ Ejecuta: `cd src && npm install && cd ../frontend && npm install`

### Error: "Port already in use"
→ Cambia el puerto en `frontend/vite.config.js`

### Página en blanco
→ Abre la consola (F12) y busca errores

---

## 📞 Estructura de Carpetas del Frontend

```
frontend/
├── src/
│   ├── components/        # Componentes reutilizables
│   ├── pages/             # Páginas principales
│   ├── services/          # Servicios de API
│   ├── context/           # Autenticación global
│   ├── styles/            # Estilos CSS
│   ├── App.jsx            # Aplicación principal
│   └── main.jsx           # Punto de entrada
├── package.json
├── vite.config.js
└── .env
```

---

## 🎯 Flujo Principal

1. **Usuario accede** → `/`
2. **Se registra** → `/register`
3. **Inicia sesión** → `/login`
4. **Ve dashboard** → `/dashboard`
5. **Crea categorías** → `/categories`
6. **Agrega items** → `/menu-items`
7. **Visualiza** → `/preview`

---

## ✨ Características Principales

### 🔐 Autenticación
- Registro de restaurantes
- Login con JWT
- Sesiones persistentes
- Cierre de sesión seguro

### 📂 Gestión
- Crear/editar/eliminar categorías
- Crear/editar/eliminar items
- Gestionar precios
- Organizar con orden de visualización

### 👁️ Visualización
- Vista previa en tiempo real
- Interfaz responsiva
- Diseño moderno

---

## 🎓 Conceptos Usados

- **React Hooks** - useState, useEffect, useContext
- **React Router** - Navegación entre páginas
- **Context API** - Estado global de autenticación
- **Axios** - Cliente HTTP para APIs
- **JWT** - Tokens de autenticación seguros
- **CSS3** - Estilos sin frameworks

---

## ✅ Checklist para Iniciar

- [ ] Leí este archivo
- [ ] Tengo Node.js instalado
- [ ] El backend está funcionando
- [ ] Ejecuté `start.bat` (Windows) o `./start.sh` (Linux/Mac)
- [ ] Abierto `http://localhost:5173` en mi navegador
- [ ] Registré un restaurante
- [ ] Creé algunas categorías
- [ ] Agregué items al menú
- [ ] Visualicé el menú en "Vista Previa"

---

## 🎉 ¡Listo para Usar!

Tu aplicación MenuLink está **completamente lista**. Solo sigue los pasos de "Quick Start" arriba y ¡diviértete!

---

## 📚 Documentación Adicional

Para más información detallada, consulta:

- `GUIA_COMPLETA.md` - Guía exhaustiva
- `README.md` - Documentación técnica
- `DATOS_PRUEBA.md` - Datos de ejemplo
- `RESUMEN_IMPLEMENTACION.md` - Lo que se implementó

---

## 🚀 Próximas Mejoras Futuras

- [ ] Publicación compartida de menús
- [ ] Subida de imágenes a servidor
- [ ] Exportación a PDF
- [ ] Integración de pagos
- [ ] App móvil

---

**Creado con ❤️ para tu proyecto MenuLink**

¡Que disfrutes! 🍽️✨
