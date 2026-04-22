# Black Pixel

Sitio web estático tipo portafolio/agencia para practicar maquetación, UI responsiva y manejo de datos desde frontend.

**Demo:** [blackpixelmkt.netlify.app](https://blackpixelmkt.netlify.app/)

## Resumen

Este proyecto muestra una landing page principal, un blog estático y una página de detalle por post. Está pensado para que un reclutador pueda revisar rápido:

- criterio visual
- estructura del proyecto
- manejo de componentes reutilizables
- formularios con Supabase desde frontend
- accesibilidad básica y diseño responsive

## Stack

- HTML5
- Tailwind CSS via CDN
- JavaScript vanilla
- AOS para animaciones
- Supabase para el formulario de contacto
- Vercel para despliegue estático

## Lo que resuelve

- Hero, portafolio, servicios, testimonios y contacto en una sola landing
- Blog con listado y detalle por `slug`
- Navegación móvil, carruseles y modales
- Formulario de contacto con feedback visual de envío

## Estructura

```text
blackpixelwebpage/
├── bin/
│   ├── index.html
│   ├── blog.html
│   ├── post-detail.html
│   ├── main.js
│   ├── style.css
│   ├── tailwind-fallback.css
│   └── assets/
│       └── images/
├── vercel.json
└── README.md
```

## Cómo correrlo

1. Entra a la carpeta `bin/`.
2. Levanta un servidor local:

```bash
python -m http.server 8000
```

3. Abre `http://localhost:8000`.

## Decisiones técnicas

- El sitio es estático para mantener despliegue simple y rápido.
- La lógica de UI vive en un solo archivo JS para no depender de framework.
- El blog se renderiza desde datos internos del frontend para evitar backend extra.
- El formulario usa Supabase como persistencia mínima viable.

## Mejoras pendientes

- Separar `main.js` por responsabilidades.
- Mover contenido del blog a una sola fuente de verdad.
- Reemplazar assets faltantes por imágenes finales propias.
- Extraer navbar y footer a parciales si el sitio sigue creciendo.

## Para reclutadores

Este repo intenta demostrar que puedo:

- construir interfaces limpias y responsivas
- mantener consistencia visual
- integrar servicios externos sin framework
- detectar y corregir deuda técnica

## Contacto

- GitHub: [lioncarballo88](https://github.com/lioncarballo88)
- Instagram: [lion_carballo](https://www.instagram.com/lion_carballo/)
- WhatsApp: [9842044965](https://wa.me/9842044965)
- Email: lioncarballo@gmail.com

## Licencia

© 2026 Black Pixel. Todos los derechos reservados.
