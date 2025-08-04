1. INTRODUCCIÓN
El presente informe detalla el desarrollo de una aplicación web fullstack para la gestión de inventario, desarrollada como parte de una tarea académica. El sistema permite registrar, actualizar, consultar y eliminar productos, con autenticación de usuarios, control de stock y diseño responsive.
El proyecto sigue buenas prácticas de desarrollo web moderno, con estructura modular, separación clara entre frontend y backend, y persistencia de datos en una base de datos relacional.
2. OBJETIVO
Desarrollar una aplicación web completa que permita a una empresa o negocio administrar su inventario, con funcionalidades CRUD, autenticación de usuarios y control de stock, utilizando tecnologías modernas y accesibles.
3. TECNOLOGÍAS UTILIZADAS
- Frontend: React, Vite, Tailwind CSS
- Backend: Node.js, Express, Prisma
- Base de datos: MySQL (XAMPP)
- Autenticación: JWT (JSON Web Tokens)
- Estilos: Tailwind CSS
- Control de versiones: Git (opcional)
4. FUNCIONALIDADES PRINCIPALES
- Registro e inicio de sesión de usuarios
- Gestión completa de productos (Crear, Leer, Actualizar, Eliminar)
- Búsqueda de productos por nombre
- Filtro para mostrar solo productos con stock bajo
- Alertas visuales para productos con stock crítico (< 5 unidades)
- Diseño responsive (compatible con móviles y escritorio)
- Barra lateral de navegación
- Protección de rutas con autenticación
5. ESTRUCTURA DEL PROYECTO
El sistema está dividido en dos partes principales:
5.1 BACKEND
- Ubicación: /backend
- Contiene:
  - controllers: lógica de negocio
  - routes: definición de rutas API
  - middleware: autenticación JWT
  - prisma: esquema y migraciones
  - server.js: servidor Express principal

5.2 FRONTEND
- Ubicación: /frontend
- Contiene:
  - components: componentes reutilizables
  - pages: páginas principales (Login, Dashboard)
  - App.jsx: enrutamiento
  - Tailwind CSS: estilos modernos
6. BASE DE DATOS
Se utiliza MySQL a través de XAMPP. El esquema incluye:
- Tabla `users`: para gestionar usuarios
- Tabla `products`: para almacenar productos
- Tabla `categories`: para clasificar productos
- Tabla `movements`: para registrar entradas y salidas
Las migraciones se gestionan con Prisma.
7. CÓMO EJECUTAR EL SISTEMA
7.1 REQUISITOS
- Node.js v18+
- XAMPP (para MySQL)
- Navegador web

7.2 PASOS PARA INSTALAR

1. Iniciar XAMPP y activar MySQL.
2. Crear la base de datos `inventario_db` en phpMyAdmin.
3. Abrir terminal en la carpeta `backend` y ejecutar:
   npm install
   npx prisma migrate dev --name init
   node server.js
4. Abrir otra terminal en `frontend` y ejecutar:
   npm install
   npm run dev
5. Acceder a: http://localhost:5173

7.3 CREDENCIALES DE PRUEBA
- Email: ana@example.com
- Contraseña: 123456

8. CÓMO HACERLO PORTABLE
Para facilitar la revisión.
- Comprimir la carpeta del proyecto (sin node_modules)
- Incluir el archivo README.md
- El profesor solo necesita seguir las instrucciones del README

9. CONCLUSIONES
El sistema cumple con todos los requisitos solicitados:
- CRUD completo
- Autenticación de usuarios
- Base de datos operativa
- Interfaz moderna y responsive
- Documentación detallada



