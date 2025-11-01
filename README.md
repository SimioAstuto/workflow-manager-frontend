# Workflow Manager (Productos, Categorías y Usuarios)

Este frontend permite interactuar con la API del backend para gestionar **Usuarios**, **Categorías** y **Productos**.  
Incluye pantallas para **iniciar sesión**, **registrarse**, ver listados, crear nuevos registros y modificarlos.

La interfaz está desarrollada con **React** y se conecta al backend mediante **Axios**.  
Cuando el usuario inicia sesión, se almacena un **token** que permite acceder a las funciones protegidas (crear, editar y eliminar).

---

## ✅ Funcionalidades principales

- Registro e inicio de sesión de usuarios
- Listado de productos y categorías
- Creación y edición de productos
- Creación y edición de categorías
- Manejo automático del **token JWT**
- Navegación utilizando **React Router**
- Interfaz simple y clara para uso práctico

---

## 🔧 Tecnologías utilizadas

| Tecnología | Descripción |
|----------|-------------|
| React | Framework del lado del cliente |
| React Router DOM | Navegación entre pantallas |
| Axios | Comunicación con la API |
| Vite | Servidor de desarrollo y empaquetado |
| LocalStorage | Almacenamiento del token |

---

## 📂 Estructura del Proyecto
```
src/
├── api/
│ └── axios.js # Configuración del cliente Axios con baseURL y token
│
├── pages/ # Cada pantalla de la aplicación
│ ├── Login.jsx
│ ├── Register.jsx
│ ├── Dashboard.jsx
│ ├── CategoryManager.jsx
│ └── ProductManager.jsx
│
├── components/ # Componentes reutilizables
│ ├── Navbar.jsx
│ └── Footer.jsx
│
├── context/
│ └── AuthContext.jsx # Manejo global del usuario y token
│
├── App.jsx # Rutas principales
└── main.jsx # Punto de entrada del proyecto
```
---

## ⚙️ Configuración e instalación

1) Clonar el repositorio:
```
git clone <URL_DEL_REPOSITORIO_FRONTEND>
```
Entrar al proyecto:
```
cd frontend
```
Instalar dependencias:
```
npm install
```
Crear archivo .env:
```
VITE_API_URL=http://localhost:5000
```
Si el backend está desplegado en la nube, reemplazar por la URL pública
Ej: VITE_API_URL=https://workflow-manager.onrender.com

Ejecutar:
```
npm run dev
```
Abrir en el navegador:
```
http://localhost:5173
```
🔐 Cómo funciona la autenticación
---
El usuario inicia sesión → el backend devuelve un token.

El frontend guarda ese token en localStorage.

Cualquier petición protegida (crear, editar o borrar) enviará el token automáticamente.

Si el token es inválido o expira, se bloquean las acciones protegidas.

Esto se maneja automáticamente en:
```
src/api/axios.js
```
