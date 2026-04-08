# Black Pixel - Sitio Web

Página web estática para la agencia digital Black Pixel, especializada en diseño web, desarrollo de apps y marketing digital.

## Descripción

Sitio web de Black Pixel, agencia digital ubicada en Tres Valles, Veracruz. Incluye:

- Página de inicio con hero section y portafolio de proyectos
- Sección de servicios con modales informativos (Planificación, Diseño Web, Publicidad)
- Sección "Acerca del creador" con perfil del fundador
- El Método Black Pixel (4 pasos)
- Testimonios de clientes
- Formulario de contacto integrado con Supabase
- Blog con 12 artículos y páginas de detalle
- Diseño completamente responsivo con carruseles en móvil
- Menú hamburguesa en móvil

## Tecnologías Utilizadas

- **HTML5** - Estructura del sitio
- **Tailwind CSS** (CDN) - Framework de estilos
- **JavaScript** - Interactividad, modales, carruseles y formulario
- **AOS (Animate On Scroll)** - Animaciones al hacer scroll
- **Supabase** - Base de datos para el formulario de contacto
- **Vercel** - Plataforma de despliegue

## Estructura del Proyecto

```
blackpixelwebpage/
├── bin/                        # Archivos de producción
│   ├── index.html             # Página principal
│   ├── blog.html              # Listado del blog
│   ├── post-detail.html       # Detalle de post del blog
│   ├── main.js                # JavaScript principal
│   ├── style.css              # Estilos CSS personalizados
│   ├── tailwind-fallback.css  # Estilos críticos de respaldo
│   └── assets/
│       └── images/            # Imágenes del sitio
├── .vscode/                   # Configuración de VS Code
├── vercel.json                # Configuración de Vercel
├── README.md                  # Este archivo
└── .gitignore                 # Archivos ignorados por Git
```

## Instalación y Uso

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/lioncarballo88/blackpixel-web.git
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
   - Configurado para desplegarse automáticamente en Vercel desde la rama `master`
   - Los archivos en `bin/` son los que se despliegan

## Configuración

### Supabase
El formulario de contacto usa Supabase para almacenar mensajes en la tabla `contactos`. Las credenciales (anon key pública) están en `main.js`.

### Meta OG
Las URLs de Open Graph apuntan a `blackpixel.mx` con la imagen `assets/images/blackpixel-share.jpg`.

## Responsive

El sitio está optimizado para móvil:
- Menú hamburguesa funcional en pantallas pequeñas
- Carrusel horizontal para la sección "El Método" en móvil
- Carrusel horizontal para testimonios en móvil
- Portafolio con carrusel nativo en todas las pantallas
- Tipografía y padding adaptados por breakpoint

## Redes Sociales del Fundador

- GitHub: [github.com/lioncarballo88](https://github.com/lioncarballo88)
- Instagram: [instagram.com/lion_carballo](https://www.instagram.com/lion_carballo/)
- WhatsApp: [wa.me/9842044965](https://wa.me/9842044965)

## Contacto

- Email: lioncarballo@gmail.com
- Ubicación: Tres Valles, Veracruz

## Licencia

© 2026 Black Pixel. Todos los derechos reservados.
