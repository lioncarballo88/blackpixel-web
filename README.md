# Black Pixel - Sitio Web

Página web estática para la agencia digital Black Pixel, especializada en diseño web, desarrollo de apps y marketing digital.

## Descripción

Este proyecto contiene el sitio web de Black Pixel, una agencia digital ubicada en Tres Valles, Veracruz. El sitio incluye:

- Página de inicio con hero section y portafolio
- Sección de servicios (Planificación, Diseño Web, Publicidad)
- Testimonios de clientes
- Formulario de contacto integrado con Supabase
- Modales informativos

## Tecnologías Utilizadas

- **HTML5** - Estructura del sitio
- **Tailwind CSS** - Framework de estilos
- **JavaScript** - Interactividad y animaciones
- **AOS (Animate On Scroll)** - Librería de animaciones
- **Supabase** - Base de datos para formularios de contacto
- **Vercel** - Plataforma de despliegue

## Estructura del Proyecto

```
blackpixelwebpage/
├── bin/                    # Archivos de producción
│   ├── index.html         # Página principal
│   ├── main.js            # JavaScript principal
│   ├── style.css          # Estilos CSS
│   └── assets/            # Recursos estáticos
│       └── images/        # Imágenes del sitio
├── lib/                   # Dependencias (si aplica)
├── .vscode/               # Configuración de VS Code
├── vercel.json            # Configuración de Vercel
├── README.md              # Este archivo
└── .gitignore             # Archivos ignorados por Git
```

## Instalación y Uso

1. **Clonar el repositorio:**
   ```bash
   git clone <url-del-repositorio>
   cd blackpixelwebpage
   ```

2. **Ejecutar localmente:**
   - Navegar a la carpeta `bin/`
   - Iniciar un servidor HTTP local:
     ```bash
     python -m http.server 8000
     ```
   - Abrir `http://localhost:8000` en el navegador

3. **Despliegue:**
   - El proyecto está configurado para desplegarse automáticamente en Vercel
   - Los archivos en `bin/` son los que se despliegan

## Configuración

### Supabase
El formulario de contacto utiliza Supabase para almacenar los mensajes. Las credenciales están configuradas en `main.js`. Para producción, considera moverlas a variables de entorno.

### Placeholders
Antes del despliegue final, actualizar:
- URLs de Open Graph en `index.html`
- Enlaces de redes sociales en el footer
- Información de contacto si es necesario

## Desarrollo

- Los archivos fuente están en `bin/` (versión optimizada)
- Usa Tailwind CSS para estilos
- AOS para animaciones al hacer scroll
- El formulario envía datos a una tabla 'contactos' en Supabase

## Contacto

- Email: hola@blackpixel.mx
- Ubicación: Tres Valles, Veracruz

## Licencia

© 2026 Black Pixel. Todos los derechos reservados.
