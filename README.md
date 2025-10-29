# WorkFlow Manager

**WorkFlow Manager** es una aplicación web profesional desarrollada por [SimioAstuto](https://github.com/SimioAstuto), pensada para gestionar trabajos, clientes y categorías de servicios de forma modular, eficiente y visualmente personalizada. Este proyecto forma parte de una entrega académica final, con enfoque en arquitectura backend, diseño frontend adaptable y despliegue completo en Vercel y Render.

---

## 🚀 Tecnologías utilizadas

- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **Base de datos:** MongoDB
- **Autenticación:** JWT
- **Despliegue:** Vercel (frontend) + Render (backend)
- **Estilo:** CSS personalizado con fondo geométrico y paleta SimioAstuto

---

## 📦 Estructura del proyecto

- `/src/components`: Componentes reutilizables como NavBar, Footer, etc.
- `/src/routes`: Vistas principales (Dashboard, Login, Registro, JobForm)
- `/src/utils`: Funciones auxiliares (API, auth, validaciones)
- `/public`: Archivos estáticos como fondo y logo

---

## 🧠 Funcionalidades principales

- Registro de trabajos con cliente, tipo, categoría, cotización y fecha
- Visualización de trabajos en tabla con acciones (terminar, eliminar)
- Dashboard con gráfico de trabajos por mes y resumen financiero
- Gestión de categorías de servicio
- Flujo de autenticación con recuperación de contraseña
- Interfaz responsive y estética personalizada

---

## 📊 Dashboard

- Gráfico de barras con trabajos agrupados por mes
- Tabla con trabajos pendientes y finalizados (ordenados)
- Resumen financiero con totales en pesos argentinos

---

## 🔐 Seguridad

- Validación de sesión con tokens JWT
- Acceso protegido a rutas privadas
- Sanitización de inputs y manejo de errores

---

## 🛠 Instalación local

```bash
git clone https://github.com/SimioAstuto/workflow-manager.git
cd workflow-manager
npm install
npm run dev
