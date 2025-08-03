# Landing Page TécnicoIT

Una landing page profesional y moderna para servicios de técnico IT freelance con panel de administración completo.

## 🚀 Características

- **Landing Page Profesional**: Diseño moderno y minimalista
- **Panel de Administración**: Gestión completa del contenido
- **Contenido Dinámico**: Todo editable desde el panel admin
- **Diseño Responsivo**: Optimizado para móviles y desktop
- **Autenticación Segura**: Sistema de login protegido
- **Base de Datos**: Supabase como backend
- **Tecnologías Modernas**: Next.js 15, React, TypeScript, Tailwind CSS

## 📋 Secciones de la Landing Page

1. **Inicio (Hero)**: Presentación principal con call-to-actions
2. **Sobre Mí**: Información profesional y experiencia
3. **Servicios**: Lista de servicios ofrecidos (editable)
4. **Contacto**: Formulario de contacto e información

## 🛠️ Tecnologías Utilizadas

- **Frontend**: Next.js 15, React 18, TypeScript
- **Estilos**: Tailwind CSS
- **Backend**: Supabase (Base de datos + Autenticación)
- **Iconos**: Lucide React
- **Formularios**: React Hook Form + Zod
- **Despliegue**: Vercel (recomendado)

## 📦 Instalación y Configuración

### 1. Clonar el Repositorio

```bash
git clone <tu-repositorio>
cd landing-page-it
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Configurar Variables de Entorno

Copia el archivo de ejemplo y configura tus variables:

```bash
cp .env.local.example .env.local
```

Edita `.env.local` con tus credenciales de Supabase:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima_de_supabase
SUPABASE_SERVICE_ROLE_KEY=tu_clave_de_servicio_de_supabase

# Admin Authentication
ADMIN_EMAIL=tu_email_admin@ejemplo.com
ADMIN_PASSWORD=tu_contraseña_segura

# Next.js Configuration
NEXTAUTH_SECRET=tu_secreto_nextauth
NEXTAUTH_URL=http://localhost:3000
```

### 4. Configurar Supabase

1. Crea una cuenta en [Supabase](https://supabase.com)
2. Crea un nuevo proyecto
3. Ve a SQL Editor y ejecuta el contenido de `supabase-schema.sql`
4. Copia las credenciales del proyecto a tu `.env.local`

### 5. Ejecutar en Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## 🔐 Panel de Administración

### Acceso
- URL: `http://localhost:3000/admin/login`
- Credenciales por defecto:
  - Email: `admin@example.com`
  - Contraseña: `admin123`

### Funcionalidades

1. **Gestión de Contenido**: Editar textos de todas las secciones
2. **Gestión de Servicios**: Crear, editar, activar/desactivar servicios
3. **Información de Contacto**: Actualizar datos de contacto y redes sociales

## 📱 Diseño Responsivo

El sitio está completamente optimizado para:
- 📱 Móviles (320px+)
- 📱 Tablets (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Pantallas grandes (1440px+)

## 🎨 Paleta de Colores

- **Principal**: Rojo (#dc2626)
- **Texto**: Negro (#111827)
- **Secundario**: Gris (#6b7280)
- **Fondo**: Blanco (#ffffff)
- **Acentos**: Grises variados

## 🚀 Despliegue en Vercel

### 1. Preparar el Repositorio

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Conectar con Vercel

1. Ve a [Vercel](https://vercel.com)
2. Conecta tu repositorio de GitHub
3. Configura las variables de entorno en Vercel
4. Despliega automáticamente

### 3. Variables de Entorno en Vercel

Configura estas variables en el dashboard de Vercel:

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
ADMIN_EMAIL
ADMIN_PASSWORD
NEXTAUTH_SECRET
NEXTAUTH_URL
```

## 📝 Personalización

### Cambiar Contenido

1. Accede al panel de administración
2. Edita el contenido desde la interfaz web
3. Los cambios se guardan automáticamente en Supabase

### Modificar Estilos

- Edita `tailwind.config.js` para cambiar colores
- Modifica `src/app/globals.css` para estilos globales
- Actualiza componentes en `src/components/`

### Agregar Nuevos Servicios

1. Ve al panel de administración
2. Sección "Servicios"
3. Haz clic en "Nuevo Servicio"
4. Completa la información y guarda

## 🔧 Estructura del Proyecto

```
landing-page-it/
├── src/
│   ├── app/                 # Páginas de Next.js
│   │   ├── admin/          # Panel de administración
│   │   ├── globals.css     # Estilos globales
│   │   ├── layout.tsx      # Layout principal
│   │   └── page.tsx        # Página principal
│   ├── components/         # Componentes React
│   │   ├── admin/          # Componentes del admin
│   │   ├── sections/       # Secciones de la landing
│   │   └── ui/             # Componentes UI reutilizables
│   ├── hooks/              # Hooks personalizados
│   ├── lib/                # Utilidades y configuración
│   └── utils/              # Funciones auxiliares
├── public/                 # Archivos estáticos
├── supabase-schema.sql     # Schema de la base de datos
├── tailwind.config.js      # Configuración de Tailwind
└── package.json            # Dependencias del proyecto
```

## 🐛 Solución de Problemas

### Error de Conexión a Supabase
- Verifica que las variables de entorno estén correctas
- Asegúrate de que el proyecto de Supabase esté activo
- Revisa que el schema SQL se haya ejecutado correctamente

### Problemas de Autenticación
- Verifica que `ADMIN_EMAIL` y `ADMIN_PASSWORD` estén configurados
- Asegúrate de usar las credenciales correctas en el login

### Errores de Compilación
- Ejecuta `npm install` para instalar dependencias
- Verifica que todas las variables de entorno estén definidas
- Revisa la consola para errores específicos

## 📞 Soporte

Si necesitas ayuda con la configuración o personalización:

1. Revisa la documentación de [Next.js](https://nextjs.org/docs)
2. Consulta la documentación de [Supabase](https://supabase.com/docs)
3. Verifica la configuración de [Tailwind CSS](https://tailwindcss.com/docs)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Puedes usarlo libremente para proyectos personales y comerciales.

---

**¡Tu landing page profesional está lista! 🎉**

Recuerda actualizar el contenido desde el panel de administración y configurar tus credenciales reales de Supabase antes del despliegue en producción.

