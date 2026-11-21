# Black Pixel

Sitio web estático tipo portafolio/agencia para practicar maquetación, UI responsiva y manejo de datos desde frontend.

**Demo:** [bpmkt.netlify.app](https://bpmkt.netlify.app/)

## Resumen

Este proyecto muestra una landing page principal, un blog estático y una página de detalle por post. Está pensado para que un reclutador pueda revisar rápido:

- criterio visual
- estructura del proyecto
- manejo de componentes reutilizables
- formularios con Netlify Forms y respaldo por WhatsApp
- accesibilidad básica y diseño responsive

## Stack

- HTML5
- Tailwind CSS compilado (3.4, sin CDN)
- JavaScript vanilla
- AOS para animaciones
- Formulario de contacto con Netlify Forms (solo funciona desplegado en Netlify) y respaldo por WhatsApp
- Meta Pixel (eventos `PageView` y `Lead`)
- Netlify para el despliegue estático (`vercel.json` y `wrangler.jsonc` quedan como alternativas)

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
│   ├── tailwind.css         # generado: no editar a mano
│   ├── tailwind-fallback.css
│   ├── robots.txt
│   ├── sitemap.xml
│   └── assets/
│       └── images/
├── package.json             # scripts de build y servidor local
├── tailwind.config.js       # qué archivos escanea Tailwind
├── input.css                # directivas base de Tailwind
├── vercel.json
├── wrangler.jsonc
├── netlify.toml          # publish = "bin"
└── README.md
```

## Cómo correrlo

1. Instala dependencias (solo la primera vez): `npm install`
2. Levanta un servidor local apuntando a `bin/`:

```bash
npm run serve
```

3. Abre `http://localhost:3000` (o el puerto que indique `serve`).

Alternativa sin Node, desde la carpeta `bin/`:

```bash
python -m http.server 8000
```

## Tailwind CSS

El sitio usa un CSS compilado (`bin/tailwind.css`, ~28 KB), no el CDN.

Si agregas clases nuevas en el HTML o en `main.js`, hay que regenerarlo:

```bash
npm install
npm run build:css
```

`tailwind.config.js` escanea `index.html`, `blog.html`, `post-detail.html`,
`proyecto.html` y `main.js`. Si agregas una página nueva que use Tailwind,
añádela ahí o sus clases no se generarán.

`tarjeta-digital.html` no usa Tailwind: tiene su propio CSS embebido.

## Despliegue

El sitio se publica en Netlify con `netlify.toml` (`publish = "bin"`). Cada push a
`master` redepliega. El sitio se llama `bpmkt` y su URL base es
`https://bpmkt.netlify.app`; si cambia de nombre, reemplaza esa base en
`bin/*.html`, `bin/sitemap.xml` y `bin/robots.txt`.

El proyecto debe estar en **Project visibility: Public**
(**Project configuration → General → Visitor access**). Los proyectos nuevos de
Netlify nacen privados y responden `401` hasta que se hacen públicos.

El formulario de contacto usa Netlify Forms: el deploy detecta el form `contacto`
de `bin/index.html` y los envíos quedan en **Project configuration → Forms**. Para
recibir aviso por correo, activa una notificación en ese panel después del primer
envío. En Vercel, Cloudflare o local el POST de Netlify Forms no existe y el
formulario ofrece el respaldo por WhatsApp con los datos ya escritos.

`vercel.json` y `wrangler.jsonc` quedan como alternativas de despliegue.

## Dominio y SEO

Mientras el dominio propio no esté publicado, el sitio usa como base:

```text
https://bpmkt.netlify.app
```

Aparece en `canonical`, `og:url`, `og:image` y `twitter:image` de las páginas HTML,
en `bin/sitemap.xml` y en `bin/robots.txt`. Cuando el dominio definitivo esté activo,
hay que reemplazar esa base en `bin/*.html`, `bin/sitemap.xml` y `bin/robots.txt`.

## Landing de anuncios (Tarjeta Digital)

`bin/tarjeta-digital.html` es una landing independiente para campañas de Meta:

```text
https://bpmkt.netlify.app/tarjeta-digital
```

- Lleva `noindex` para no competir con el sitio principal en Google.
- El formulario arma el mensaje y abre WhatsApp con los datos ya escritos
  (nombre, tipo de tarjeta, servicios y plan elegido).
- Píxel de Meta: código base **inline en el `<head>`** de las 5 páginas (formato
  oficial de Meta), ID `29146698098325912`. Si cambias de píxel, hay que
  reemplazar el ID en las 5 páginas.
  Eventos: `PageView` en todas, `Lead` al enviar el formulario de la landing o el
  de contacto del sitio, y `PremiumClick` en la CTA de la tarjeta Premium.
- Las fotos viven en `bin/assets/images/tarjeta-*.jpg`, fuera del HTML, para que
  el navegador pueda cachearlas.

## Decisiones técnicas

- El sitio es estático para mantener despliegue simple y rápido.
- La lógica de UI vive en un solo archivo JS para no depender de framework.
- El blog se renderiza desde datos internos del frontend para evitar backend extra.
- El formulario usa Netlify Forms: los envíos quedan en el panel de Netlify
  (Forms) y se pueden notificar por correo. No hay claves ni SDK en el cliente.
  Solo funciona desplegado en Netlify; en Vercel, Cloudflare o local el POST
  devuelve error y el sitio ofrece el respaldo por WhatsApp.

## Mejoras pendientes

- Separar `main.js` por responsabilidades.
- Mover contenido del blog a una sola fuente de verdad.
- Reemplazar assets faltantes por imágenes finales propias.
- Sustituir los enlaces externos de los proyectos por capturas locales (Zavala Ashane e Intérprete Legal dan 404; Repro AI da 429).
- Sacar `node_modules/` del repositorio con `git rm -r --cached node_modules` (ya está en `.gitignore`).
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
