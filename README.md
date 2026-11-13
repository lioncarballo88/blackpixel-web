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
- Meta Pixel (eventos `PageView` y `Lead`)
- Netlify para despliegue estático (`vercel.json` y `wrangler.jsonc` quedan como alternativas)

## Lo que resuelve

- Hero, portafolio, servicios, testimonios y contacto en una sola landing
- Casos de estudio por proyecto (`proyecto.html?slug=...`)
- Landing de anuncios "Tarjeta Digital" (`tarjeta-digital.html`) con vista previa en vivo
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
│   ├── proyecto.html        # caso de estudio por proyecto
│   ├── tarjeta-digital.html # landing para anuncios (noindex)
│   ├── main.js
│   ├── style.css
│   ├── tailwind-fallback.css
│   ├── robots.txt
│   └── assets/
│       ├── meta-pixel.js    # código base del píxel (ID en un solo lugar)
│       └── images/
├── vercel.json
├── wrangler.jsonc
├── netlify.toml          # publish = "bin"
└── README.md
```

## Cómo correrlo

1. Entra a la carpeta `bin/`.
2. Levanta un servidor local:

```bash
python -m http.server 8000
```

3. Abre `http://localhost:8000`.

## Dominio y SEO

Mientras el dominio propio no esté publicado, el sitio usa como base:

```text
https://blackpixelmkt.netlify.app
```

Aparece en `canonical`, `og:url`, `og:image` y `twitter:image` de las cuatro páginas HTML.
Cuando el dominio definitivo esté activo, hay que reemplazar esa base en `bin/*.html`
y descomentar la línea `Sitemap` en `bin/robots.txt`.

## Landing de anuncios (Tarjeta Digital)

`bin/tarjeta-digital.html` es una landing independiente para campañas de Meta:

```text
https://blackpixelmkt.netlify.app/tarjeta-digital
```

- Lleva `noindex` para no competir con el sitio principal en Google.
- El formulario arma el mensaje y abre WhatsApp con los datos ya escritos
  (nombre, tipo de tarjeta, servicios y plan elegido).
- Píxel de Meta (`assets/meta-pixel.js`, ID `29146698098325912`):
  `PageView` en todas las páginas, `Lead` al enviar el formulario de la landing
  o el de contacto del sitio, y `PremiumClick` en la CTA de la tarjeta Premium.
- Las fotos viven en `bin/assets/images/tarjeta-*.jpg`, fuera del HTML, para que
  el navegador pueda cachearlas.

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
- WhatsApp: [274 139 0272](https://wa.me/522741390272)
- Email: lioncarballo@gmail.com

## Licencia

© 2026 Black Pixel. Todos los derechos reservados.
