# 🚀 Guía Rápida de Despliegue

Esta guía te ayudará a desplegar tu landing page en producción paso a paso.

## ✅ Pre-requisitos

- [ ] Cuenta de GitHub
- [ ] Cuenta de Vercel
- [ ] Cuenta de Supabase

## 📋 Pasos de Despliegue

### 1. Configurar Supabase (5 minutos)

1. **Crear proyecto en Supabase**:
   - Ve a [supabase.com](https://supabase.com)
   - Crea una nueva cuenta o inicia sesión
   - Haz clic en "New Project"
   - Elige un nombre y contraseña para tu base de datos

2. **Configurar la base de datos**:
   - Ve a "SQL Editor" en el dashboard
   - Copia todo el contenido del archivo `supabase-schema.sql`
   - Pégalo en el editor y ejecuta (botón "Run")

3. **Obtener credenciales**:
   - Ve a "Settings" > "API"
   - Copia:
     - Project URL
     - anon/public key
     - service_role key (mantén esto privado)

### 2. Subir Código a GitHub (3 minutos)

1. **Crear repositorio**:
   ```bash
   # En tu terminal, dentro del proyecto
   git init
   git add .
   git commit -m "Initial commit: Landing page TécnicoIT"
   ```

2. **Crear repositorio en GitHub**:
   - Ve a [github.com](https://github.com)
   - Haz clic en "New repository"
   - Nombra tu repositorio (ej: "landing-page-tecnicoit")
   - NO inicialices con README (ya tienes uno)

3. **Conectar y subir**:
   ```bash
   git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
   git branch -M main
   git push -u origin main
   ```

### 3. Desplegar en Vercel (5 minutos)

1. **Conectar repositorio**:
   - Ve a [vercel.com](https://vercel.com)
   - Inicia sesión con GitHub
   - Haz clic en "New Project"
   - Selecciona tu repositorio

2. **Configurar variables de entorno**:
   En la sección "Environment Variables", agrega:
   
   ```
   NEXT_PUBLIC_SUPABASE_URL = tu_project_url_de_supabase
   NEXT_PUBLIC_SUPABASE_ANON_KEY = tu_anon_key_de_supabase
   SUPABASE_SERVICE_ROLE_KEY = tu_service_role_key_de_supabase
   ADMIN_EMAIL = tu_email_admin@ejemplo.com
   ADMIN_PASSWORD = tu_contraseña_segura
   NEXTAUTH_SECRET = genera_un_string_aleatorio_largo
   NEXTAUTH_URL = https://tu-dominio.vercel.app
   ```

3. **Desplegar**:
   - Haz clic en "Deploy"
   - Espera 2-3 minutos
   - ¡Tu sitio estará en línea!

### 4. Configurar Contenido (10 minutos)

1. **Acceder al panel admin**:
   - Ve a `https://tu-dominio.vercel.app/admin/login`
   - Usa las credenciales que configuraste

2. **Personalizar contenido**:
   - **Contenido del Sitio**: Edita textos de cada sección
   - **Servicios**: Agrega/edita tus servicios reales
   - **Información de Contacto**: Actualiza con tus datos reales

3. **Verificar funcionamiento**:
   - Revisa que todo se vea correcto
   - Prueba el formulario de contacto
   - Verifica en móvil y desktop

## 🔧 Configuraciones Adicionales

### Dominio Personalizado (Opcional)

1. En Vercel, ve a tu proyecto > "Settings" > "Domains"
2. Agrega tu dominio personalizado
3. Configura los DNS según las instrucciones
4. Actualiza `NEXTAUTH_URL` con tu nuevo dominio

### Configurar Email (Opcional)

Para que el formulario de contacto envíe emails reales:
1. Configura un servicio como EmailJS o Resend
2. Actualiza el componente de contacto
3. Agrega las credenciales como variables de entorno

### Analytics (Opcional)

Para rastrear visitantes:
1. Crea cuenta en Google Analytics
2. Agrega el código de seguimiento
3. Configura eventos personalizados

## ✅ Lista de Verificación Final

- [ ] Supabase configurado y funcionando
- [ ] Código subido a GitHub
- [ ] Sitio desplegado en Vercel
- [ ] Variables de entorno configuradas
- [ ] Panel de admin accesible
- [ ] Contenido personalizado
- [ ] Formulario de contacto funcionando
- [ ] Diseño responsivo verificado
- [ ] Dominio personalizado (opcional)

## 🆘 Solución de Problemas Comunes

### "Error de conexión a Supabase"
- Verifica que las URLs y keys estén correctas
- Asegúrate de que no haya espacios extra
- Revisa que el proyecto de Supabase esté activo

### "No puedo acceder al admin"
- Verifica `ADMIN_EMAIL` y `ADMIN_PASSWORD`
- Asegúrate de que `NEXTAUTH_SECRET` esté configurado
- Revisa que `NEXTAUTH_URL` sea correcto

### "El sitio no carga"
- Revisa los logs en Vercel
- Verifica que todas las variables de entorno estén configuradas
- Asegúrate de que el build se completó exitosamente

## 📞 ¿Necesitas Ayuda?

Si tienes problemas durante el despliegue:

1. **Revisa los logs**: En Vercel > tu proyecto > "Functions" > logs
2. **Verifica variables**: En Vercel > tu proyecto > "Settings" > "Environment Variables"
3. **Consulta documentación**: 
   - [Vercel Docs](https://vercel.com/docs)
   - [Supabase Docs](https://supabase.com/docs)

---

**¡Felicidades! Tu landing page profesional está en línea 🎉**

Recuerda mantener actualizado tu contenido desde el panel de administración.

