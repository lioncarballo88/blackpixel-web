// Menú hamburguesa móvil
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
        const isHidden = mobileMenu.classList.toggle('hidden');
        menuBtn.setAttribute('aria-expanded', String(!isHidden));
    });
}
function closeMobileMenu() {
    if (mobileMenu) mobileMenu.classList.add('hidden');
    if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
}

// Dots para carruseles móviles
function initCarouselDots(carouselId, dotsContainerId) {
    const carousel = document.getElementById(carouselId);
    const dotsContainer = document.getElementById(dotsContainerId);
    if (!carousel || !dotsContainer) return;
    const dots = dotsContainer.querySelectorAll('span');
    carousel.addEventListener('scroll', () => {
        const index = Math.round(carousel.scrollLeft / carousel.offsetWidth);
        dots.forEach((d, i) => {
            d.classList.toggle('bg-cyan-400', i === index);
            d.classList.toggle('bg-zinc-600', i !== index);
        });
    }, { passive: true });
}
initCarouselDots('metodoCarousel', 'metodoDots');

try {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800, // Duración global de la animación en milisegundos
            once: true,    // La animación solo sucede una vez al bajar
            mirror: false, // No se repite al subir (mantiene el minimalismo)
        });
    } else {
        console.warn('AOS library no cargó, las animaciones estarán deshabilitadas');
    }
} catch (error) {
    console.warn('Error inicializando AOS:', error);
}

// ==========================================
// Funciones para Modales
// ==========================================
let openModalId = null;

function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    openModalId = id;
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Evita el scroll detrás del modal
    
    // Pequeño timeout para permitir que la transición de opacidad suceda
    setTimeout(() => {
        modal.querySelector('div').classList.add('scale-100', 'opacity-100');
        modal.querySelector('div').classList.remove('scale-95', 'opacity-0');
    }, 10);
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    if (openModalId === id) openModalId = null;
    modal.querySelector('div').classList.remove('scale-100', 'opacity-100');
    modal.querySelector('div').classList.add('scale-95', 'opacity-0');
    
    // Espera a que termine la animación para ocultar el div y reactivar el scroll
    setTimeout(() => {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto'; // Reactiva el scroll
    }, 300);
}

// Cerrar al hacer clic fuera del contenido
window.addEventListener('click', function(event) {
    if (event.target.classList.contains('fixed') && !event.target.classList.contains('hidden')) {
        closeModal(event.target.id);
    }
});

// Cerrar con la tecla Escape (accesibilidad)
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && openModalId) {
        closeModal(openModalId);
    }
});

// ==========================================
// Configuración de Supabase y Formulario
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const BLOG_POSTS = [
        {
            slug: 'estrategia-digital-2026',
            title: 'Estrategia Digital para Emprendedores en 2026',
            excerpt: 'Descubre las tendencias que marcarán el futuro del marketing digital y cómo preparar tu negocio para el éxito.',
            author: 'Noé Sánchez Carballo',
            published_at: '2026-04-03T10:00:00Z',
            image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
            content: `
                <h2>Las Tendencias que Cambiarán tu Negocio</h2>
                <p>2026 no es solo otro año. Es el momento en que la tecnología digital deja de ser una opción y se convierte en una necesidad básica para cualquier emprendedor que quiera sobrevivir en el mercado actual.</p>

                <h3>1. IA Generativa en el Marketing Local</h3>
                <p>Ya no se trata de usar ChatGPT para escribir posts. La IA generativa está revolucionando cómo los negocios locales crean contenido personalizado, automatizan respuestas y analizan el comportamiento de sus clientes.</p>

                <h3>2. Comercio Electrónico Hiperlocal</h3>
                <p>Las tiendas físicas necesitan presencia digital. Pero no cualquier presencia: necesitan comercio electrónico que entienda la realidad local de Veracruz, con entregas en menos de 2 horas y pagos en efectivo.</p>

                <h3>3. Marketing Basado en Datos</h3>
                <p>Olvídate de las "buenas vibras". En 2026, el marketing que funciona es el que se mide. Cada peso invertido debe generar resultados rastreables.</p>

                <h3>¿Estás Preparado?</h3>
                <p>La pregunta no es si adoptar estas tecnologías, sino cuándo. Los emprendedores que esperen, quedarán atrás. Los que actúen ahora, liderarán el mercado local.</p>

                <p><strong>¿Quieres saber exactamente cómo implementar estas estrategias en tu negocio?</strong> Contáctanos y te ayudamos a crear un plan personalizado para 2026.</p>
            `
        },
        {
            slug: 'diseno-web-rapido',
            title: 'Por qué tu Página Web Debe Cargar en Menos de 3 Segundos',
            excerpt: 'La velocidad de carga impacta directamente en tus conversiones. Aprende a optimizar tu sitio web.',
            author: 'Noé Sánchez Carballo',
            published_at: '2026-04-02T10:00:00Z',
            image_url: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=800&q=80',
            content: `
                <h2>La Velocidad Mata Conversiones</h2>
                <p>Cada segundo cuenta. Literalmente. Según estudios recientes, el 53% de los usuarios móviles abandonan un sitio que tarda más de 3 segundos en cargar.</p>

                <h3>¿Qué Significa Esto para tu Negocio?</h3>
                <p>Si tu página web es lenta, estás perdiendo dinero. Simple y claro. En un mercado competitivo como Veracruz, donde los clientes tienen múltiples opciones, la velocidad puede ser la diferencia entre vender o no vender.</p>

                <h3>Los 5 Factores que Matan tu Velocidad</h3>
                <ol>
                    <li><strong>Imágenes sin optimizar:</strong> Una imagen de 5MB puede hacer que tu sitio tarde 10 segundos en cargar.</li>
                    <li><strong>Código innecesario:</strong> Plugins y scripts que no usas ralentizan todo.</li>
                    <li><strong>Servidor lento:</strong> Si tu hosting es barato, tu sitio será lento.</li>
                    <li><strong>Fuentes pesadas:</strong> Google Fonts puede agregar segundos extras.</li>
                    <li><strong>Contenido no optimizado:</strong> Videos e iframes que cargan automáticamente.</li>
                </ol>

                <h3>Nuestra Solución</h3>
                <p>En Black Pixel, optimizamos cada aspecto de tu sitio web. Desde la compresión de imágenes hasta la configuración del servidor, garantizamos que tu página cargue en menos de 2 segundos.</p>

                <p><strong>¿Cuánto tiempo tarda tu sitio actual en cargar?</strong> Haz la prueba y descubre si estás perdiendo ventas por velocidad.</p>
            `
        },
        {
            slug: 'branding-emprendedores',
            title: 'Branding que Vende: Cómo Crear una Marca que Conecte',
            excerpt: 'Más allá del logo: construye una identidad que genere confianza y lealtad en tus clientes.',
            author: 'Noé Sánchez Carballo',
            published_at: '2026-04-01T10:00:00Z',
            image_url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80',
            content: `
                <h2>Más Allá del Logo Bonito</h2>
                <p>Un logo no es una marca. Una marca es la promesa que haces a tus clientes. Es la emoción que generan tus productos. Es la razón por la que te eligen a ti y no a la competencia.</p>

                <h3>El Error Más Común de los Emprendedores</h3>
                <p>Crear un logo en Canva y pensar que ya tienes marca. El branding no se trata de verse bonito en Instagram. Se trata de crear una conexión emocional con tu cliente ideal.</p>

                <h3>Los 3 Pilares de un Branding que Vende</h3>

                <h4>1. Propósito Claro</h4>
                <p>¿Por qué existe tu negocio? ¿Qué problema solucionas? ¿Cuál es tu misión más allá de ganar dinero?</p>

                <h4>2. Identidad Auténtica</h4>
                <p>Sé tú mismo. Los clientes detectan la falsedad a kilómetros. Muestra tus valores reales, tus fortalezas y hasta tus imperfecciones.</p>

                <h4>3. Consistencia Total</h4>
                <p>Desde tu feed de Instagram hasta cómo contestas el teléfono. Todo debe comunicar el mismo mensaje.</p>

                <h3>Cómo Aplicarlo en tu Negocio Local</h3>
                <p>En Veracruz, el branding local funciona diferente. Tus clientes quieren conocer la persona detrás del negocio. Quieren historias reales, no marketing corporativo.</p>

                <p><strong>¿Quieres crear una marca que conecte con tus clientes?</strong> Te ayudamos a definir tu propósito y crear una identidad que venda.</p>
            `
        },
        {
            slug: 'redes-sociales-veracruz',
            title: 'Marketing en Redes Sociales para Negocios Locales',
            excerpt: 'Estrategias específicas para emprendedores de Veracruz que quieren dominar Instagram y Facebook.',
            author: 'Noé Sánchez Carballo',
            published_at: '2026-03-31T10:00:00Z',
            image_url: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=800&q=80',
            content: `
                <h2>Instagram y Facebook en Veracruz</h2>
                <p>Las redes sociales no son lo mismo en todas partes. En Veracruz, el marketing digital funciona diferente. Aquí te contamos las estrategias que realmente funcionan para negocios locales.</p>

                <h3>La Realidad del Mercado Local</h3>
                <p>En Veracruz, tus clientes pasan más tiempo en Facebook que en Instagram. Usan WhatsApp para hacer preguntas y esperan respuestas rápidas. El "influencer marketing" no vende tanto como las recomendaciones de amigos.</p>

                <h3>Estrategia de Contenido que Funciona</h3>

                <h4>1. Historias Locales</h4>
                <p>Muestra tu día a día. Tus clientes quieren conocer a la persona detrás del negocio. Comparte tus procesos, tus errores y tus victorias.</p>

                <h4>2. Contenido Educativo</h4>
                <p>Enseña algo útil. Si vendes comida, comparte recetas. Si ofreces servicios, da tips gratis. Posiciónate como experto en tu nicho.</p>

                <h4>3. Interacción Real</h4>
                <p>Responde todos los mensajes. Crea conversaciones. Los clientes de Veracruz valoran el contacto personal.</p>

                <h3>¿Qué NO Hacer?</h3>
                <ul>
                    <li>No copies estrategias de influencers de CDMX</li>
                    <li>No ignores los mensajes de WhatsApp</li>
                    <li>No compres seguidores falsos</li>
                    <li>No publiques solo para vender</li>
                </ul>

                <h3>Nuestros Resultados</h3>
                <p>Hemos ayudado a más de 15 negocios locales a duplicar sus ventas a través de redes sociales. Desde restaurantes hasta consultorías, la fórmula funciona.</p>

                <p><strong>¿Quieres que tus redes sociales vendan?</strong> Analizamos tu presencia actual y creamos una estrategia personalizada.</p>
            `
        },
        {
            slug: 'apps-moviles-emprendimiento',
            title: '¿Necesita tu Negocio una App Móvil?',
            excerpt: 'Cuándo invertir en desarrollo móvil y cómo elegir la tecnología correcta para tu emprendimiento.',
            author: 'Noé Sánchez Carballo',
            published_at: '2026-03-30T10:00:00Z',
            image_url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
            content: `
                <h2>Apps Móviles: Inversión o Gasto Innecesario?</h2>
                <p>No todos los negocios necesitan una app móvil. Pero si tu negocio encaja en ciertos patrones, una app puede ser la diferencia entre crecer o estancarte.</p>

                <h3>¿Cuándo SÍ Necesitas una App?</h3>

                <h4>1. Interacción Diaria con Clientes</h4>
                <p>Si tus clientes te buscan diariamente (gimnasios, restaurantes, delivery), una app mantiene tu marca presente en sus teléfonos.</p>

                <h4>2. Proceso Complejo de Compra</h4>
                <p>Si vender requiere múltiples pasos, una app simplifica el proceso y reduce el abandono de carrito.</p>

                <h4>3. Comunidad Fiel</h4>
                <p>Si tienes clientes recurrentes, una app crea lealtad y facilita la comunicación directa.</p>

                <h4>4. Datos Valiosos</h4>
                <p>Si necesitas recopilar información de clientes para mejorar tu servicio, una app es perfecta para eso.</p>

                <h3>¿Cuándo NO Necesitas una App?</h3>
                <ul>
                    <li>Si tu negocio es estacional</li>
                    <li>Si tienes pocos clientes recurrentes</li>
                    <li>Si un sitio web responsive basta</li>
                    <li>Si no tienes presupuesto para mantenimiento</li>
                </ul>

                <h3>Tecnologías que Recomendamos</h3>

                <h4>Apps Nativas vs Híbridas</h4>
                <p>Para negocios locales, recomendamos apps híbridas (React Native o Flutter). Son más económicas y cubren tanto iOS como Android.</p>

                <h4>Funcionalidades Esenciales</h4>
                <ul>
                    <li>Perfil de usuario</li>
                    <li>Notificaciones push</li>
                    <li>Carrito de compras</li>
                    <li>Historial de pedidos</li>
                    <li>Chat integrado</li>
                </ul>

                <h3>Costo Real de una App</h3>
                <p>Una app básica cuesta entre $15,000 y $30,000 MXN. El mantenimiento anual es aproximadamente el 20% del costo inicial.</p>

                <p><strong>¿Tu negocio necesita una app móvil?</strong> Hagamos un análisis gratuito y te decimos si vale la inversión.</p>
            `
        },
        {
            slug: 'google-ads-emprendedores',
            title: 'Google Ads: De Principiante a Experto en 30 Días',
            excerpt: 'Guía completa para crear campañas efectivas que traigan clientes reales a tu negocio local.',
            author: 'Noé Sánchez Carballo',
            published_at: '2026-03-29T10:00:00Z',
            image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
            content: `
                <h2>Google Ads Sin Perder Dinero</h2>
                <p>Google Ads puede ser la mejor inversión de marketing para tu negocio local. Pero también puede ser un pozo sin fondo si no sabes lo que haces. Aquí te enseñamos a hacerlo bien.</p>

                <h3>Por Qué Funciona Google Ads</h3>
                <p>Cuando alguien busca exactamente lo que vendes, aparece tu anuncio. Es marketing directo, medible y escalable. En Veracruz, donde la competencia es alta, Google Ads nivela el campo de juego.</p>

                <h3>Los 5 Errores Más Comunes</h3>
                <ol>
                    <li><strong>Pujas demasiado altas:</strong> No necesitas ser el primero para vender.</li>
                    <li><strong>Palabras clave genéricas:</strong> "Restaurante" no convierte. "Restaurante italiano Veracruz centro" sí.</li>
                    <li><strong>Sin landing page optimizada:</strong> Tu anuncio lleva a una página que no vende.</li>
                    <li><strong>No medir resultados:</strong> Si no sabes qué funciona, estás tirando dinero.</li>
                    <li><strong>Campañas sin estrategia:</strong> Anunciar por anunciar no funciona.</li>
                </ol>

                <h3>Tu Plan de 30 Días</h3>

                <h4>Días 1-7: Investigación</h4>
                <p>Define tu cliente ideal. ¿Qué buscan? ¿Qué palabras usan? Crea una lista de 50 palabras clave relevantes.</p>

                <h4>Días 8-14: Configuración</h4>
                <p>Crea tu cuenta de Google Ads. Configura conversiones. Establece presupuesto diario ($500-2000 MXN para empezar).</p>

                <h4>Días 15-21: Primera Campaña</h4>
                <p>Lanza campaña de búsqueda. Crea 3-5 grupos de anuncios. Escribe títulos y descripciones que vendan.</p>

                <h4>Días 22-28: Optimización</h4>
                <p>Analiza qué funciona. Pausa lo que no. Ajusta pujas. Mejora calidad de anuncios.</p>

                <h4>Días 29-30: Escalado</h4>
                <p>Duplica presupuesto en campañas ganadoras. Prueba nuevas palabras clave.</p>

                <h3>Herramientas que Necesitas</h3>
                <ul>
                    <li>Google Keyword Planner (gratis)</li>
                    <li>Google Analytics</li>
                    <li>Cuenta de Google Ads</li>
                    <li>Herramienta de seguimiento de conversiones</li>
                </ul>

                <h3>¿Cuánto Costará?</h3>
                <p>Para un negocio local en Veracruz, puedes empezar con $1000 MXN diarios. El costo por clic promedio es de $5-15 MXN, dependiendo de tu nicho.</p>

                <p><strong>¿Quieres que configuremos tus primeras campañas de Google Ads?</strong> Te garantizamos resultados o te devolvemos tu inversión del primer mes.</p>
            `
        },
        {
            slug: 'seo-local-emprendedores',
            title: 'SEO Local: Cómo Aparecer Primero en Google Maps',
            excerpt: 'Domina las búsquedas locales y atrae clientes de tu zona. Estrategias probadas para negocios de Veracruz.',
            author: 'Noé Sánchez Carballo',
            published_at: '2026-03-28T10:00:00Z',
            image_url: 'https://images.unsplash.com/photo-1562577309-2592ab84b1bc?auto=format&fit=crop&w=800&q=80',
            content: `
                <h2>Domina las Búsquedas Locales</h2>
                <p>El 97% de las personas buscan negocios locales en Google. Si no apareces en los primeros resultados, es como si no existieras. El SEO local es la forma más efectiva de atraer clientes de tu zona.</p>

                <h3>Por Qué el SEO Local es Crucial</h3>
                <p>En Veracruz, donde la competencia es feroz, aparecer en Google Maps puede significar la diferencia entre tener clientes o no tenerlos. Las búsquedas "cerca de mí" han aumentado un 900% en los últimos años.</p>

                <h3>Los Fundamentos del SEO Local</h3>

                <h4>1. Google My Business Optimizado</h4>
                <p>Tu perfil de Google My Business es lo más importante. Asegúrate de que esté completo, con fotos de calidad, horarios actualizados y reseñas positivas.</p>

                <h4>2. Palabras Clave Locales</h4>
                <p>No optimices para "restaurante", optimiza para "mejor restaurante Veracruz centro" o "comida italiana Boca del Río".</p>

                <h4>3. Contenido Local Relevante</h4>
                <p>Crea contenido sobre tu comunidad. Eventos locales, noticias del barrio, colaboraciones con otros negocios. Google ama el contenido local.</p>

                <h4>4. Enlaces Locales</h4>
                <p>Consigue backlinks de directorios locales, cámaras de comercio, periódicos regionales. Los enlaces locales valen más que los genéricos.</p>

                <h3>Estrategias Avanzadas</h3>

                <h4>Schema Markup Local</h4>
                <p>Implementa datos estructurados para que Google entienda mejor tu negocio. Incluye dirección, teléfono, horarios, reseñas.</p>

                <h4>Reseñas y Reputación</h4>
                <p>Anima a tus clientes a dejar reseñas. Responde todas las reseñas, positivas y negativas. Una buena reputación online vende.</p>

                <h4>Contenido Evergreen Local</h4>
                <p>Crea guías como "Los mejores lugares para comer en Veracruz" o "Guía de servicios en Boca del Río". Este contenido atrae tráfico constante.</p>

                <h3>Herramientas para SEO Local</h3>
                <ul>
                    <li><strong>Google My Business:</strong> Gratis y esencial</li>
                    <li><strong>SEMrush o Ahrefs:</strong> Para investigación de palabras clave</li>
                    <li><strong>BrightLocal:</strong> Especializado en SEO local</li>
                    <li><strong>WhitePages, Yelp, YellowPages:</strong> Directorios locales</li>
                </ul>

                <h3>Caso de Éxito</h3>
                <p>Un cliente nuestro, un taller mecánico en Veracruz, pasó de no aparecer en Google a ser el primer resultado para "taller mecánico urgente Veracruz". Sus llamadas aumentaron un 300%.</p>

                <p><strong>¿Quieres aparecer primero en Google Maps?</strong> Auditamos tu SEO local actual y creamos un plan personalizado para dominar tu nicho local.</p>
            `
        },
        {
            slug: 'email-marketing-efectivo',
            title: 'Email Marketing que Convierte: Construye tu Lista de Clientes',
            excerpt: 'Aprende a crear newsletters que no van al spam y generan ventas recurrentes para tu emprendimiento.',
            author: 'Noé Sánchez Carballo',
            published_at: '2026-03-27T10:00:00Z',
            image_url: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&w=800&q=80',
            content: `
                <h2>El Email Marketing No Está Muerto</h2>
                <p>Al contrario. Con un 4200% de ROI promedio, el email marketing sigue siendo una de las mejores inversiones para cualquier negocio. El truco está en hacerlo bien.</p>

                <h3>Por Qué Funciona el Email Marketing</h3>
                <p>El email llega directamente al bolsillo de tu cliente. No hay algoritmos que lo oculten. Si alguien se suscribe a tu lista, es porque está interesado en lo que ofreces.</p>

                <h3>Construye tu Lista de la Forma Correcta</h3>

                <h4>1. Lead Magnets Irresistibles</h4>
                <p>Ofrece algo de valor real a cambio del email. No un descuento cualquiera, sino algo que resuelva un problema específico de tu cliente ideal.</p>

                <h4>2. Formularios Optimizados</h4>
                <p>Menos campos = más conversiones. Solo pide nombre y email. Haz que el proceso sea lo más simple posible.</p>

                <h4>3. Contenido de Valor Primero</h4>
                <p>Antes de vender, educa. Envía contenido útil que posicione tu expertise. Las ventas vendrán después.</p>

                <h4>4. Segmentación Inteligente</h4>
                <p>No envíes el mismo email a todos. Segmenta por intereses, comportamiento de compra, etapa del customer journey.</p>

                <h3>Estrategias de Email que Vendem</h3>

                <h4>Welcome Series</h4>
                <p>Los primeros emails después de la suscripción son cruciales. Crea una secuencia que presente tu marca y ofrezca valor inmediato.</p>

                <h4>Newsletter Semanal</h4>
                <p>Envía contenido consistente. Tips, noticias de tu industria, ofertas exclusivas. Mantén el engagement alto.</p>

                <h4>Emails de Reactivación</h4>
                <p>Para suscriptores inactivos, envía ofertas especiales o pide feedback. El 60% de los suscriptores se pueden reactivar.</p>

                <h4>Emails Automatizados</h4>
                <p>Configura secuencias basadas en acciones: bienvenida, abandono de carrito, cumpleaños, etc.</p>

                <h3>Herramientas Recomendadas</h3>
                <ul>
                    <li><strong>Mailchimp:</strong> Ideal para principiantes, gratis hasta 2000 contactos</li>
                    <li><strong>ConvertKit:</strong> Enfocado en creadores de contenido</li>
                    <li><strong>ActiveCampaign:</strong> Automatización avanzada</li>
                    <li><strong>Sendinblue:</strong> Buena relación precio-calidad</li>
                </ul>

                <h3>Métricas que Importan</h3>
                <ul>
                    <li><strong>Open Rate:</strong> Debe estar por encima del 25%</li>
                    <li><strong>Click Rate:</strong> Mide engagement, apunta al 3-5%</li>
                    <li><strong>Conversion Rate:</strong> Lo más importante, mide ventas</li>
                    <li><strong>Unsubscribe Rate:</strong> Manténlo bajo, ideal menos del 1%</li>
                </ul>

                <h3>Errores Comunes a Evitar</h3>
                <ol>
                    <li>Comprar listas de emails</li>
                    <li>Enviar emails sin permiso</li>
                    <li>No limpiar tu lista regularmente</li>
                    <li>Enfocarte solo en vender</li>
                    <li>Ignorar el mobile responsive</li>
                </ol>

                <p><strong>¿Quieres construir una lista de emails que genere ventas recurrentes?</strong> Te ayudamos a crear tu estrategia completa de email marketing.</p>
            `
        },
        {
            slug: 'analisis-datos-negocio',
            title: 'Análisis de Datos: Toma Decisiones Inteligentes para tu Negocio',
            excerpt: 'Cómo usar Google Analytics y otras herramientas para entender a tus clientes y optimizar tus ventas.',
            author: 'Noé Sánchez Carballo',
            published_at: '2026-03-26T10:00:00Z',
            image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
            content: `
                <h2>Datos que Generan Resultados</h2>
                <p>Los negocios exitosos no se basan en intuición. Se basan en datos. En 2026, cualquier emprendedor que quiera crecer necesita entender y usar datos para tomar decisiones.</p>

                <h3>Por Qué los Datos son Cruciales</h3>
                <p>Imagina saber exactamente qué productos venden más, a qué hora llegan más clientes, cuáles campañas de marketing funcionan mejor. Con datos, dejas de adivinar y empiezas a saber.</p>

                <h3>Herramientas Gratuitas para Empezar</h3>

                <h4>Google Analytics 4</h4>
                <p>Gratis y poderoso. Te dice quiénes son tus visitantes, de dónde vienen, qué hacen en tu sitio y si convierten en clientes.</p>

                <h4>Google Search Console</h4>
                <p>Ve qué palabras clave te traen tráfico orgánico. Descubre oportunidades de SEO que no estás aprovechando.</p>

                <h4>Google Data Studio</h4>
                <p>Crea dashboards visuales con tus datos. Comparte reportes con tu equipo sin necesidad de ser experto en Excel.</p>

                <h4>Facebook Pixel + Analytics</h4>
                <p>Mide el rendimiento de tus campañas de Facebook e Instagram. Ve qué publicaciones generan más engagement.</p>

                <h3>Métricas que Debes Rastrear</h3>

                <h4>Métricas de Negocio</h4>
                <ul>
                    <li>Ingresos por mes</li>
                    <li>Costo de adquisición de cliente</li>
                    <li>Valor de vida del cliente</li>
                    <li>Margen de ganancia por producto</li>
                </ul>

                <h4>Métricas Digitales</h4>
                <ul>
                    <li>Tráfico orgánico vs pago</li>
                    <li>Tasa de conversión del sitio web</li>
                    <li>Tasa de rebote</li>
                    <li>Tiempo promedio en página</li>
                </ul>

                <h4>Métricas de Marketing</h4>
                <ul>
                    <li>ROI por campaña</li>
                    <li>Costo por lead</li>
                    <li>Tasa de apertura de emails</li>
                    <li>Engagement en redes sociales</li>
                </ul>

                <h3>Cómo Interpretar los Datos</h3>

                <h4>Establece Benchmarks</h4>
                <p>No mires los números en aislamiento. Compara con tu competencia, con tu industria, con tus metas.</p>

                <h4>Busca Patrones</h4>
                <p>¿Los viernes vendes más? ¿Tu email del martes tiene mejor open rate? Identifica patrones para optimizar.</p>

                <h4>Prueba y Mide</h4>
                <p>No asumas. Prueba diferentes precios, horarios, mensajes. Mide qué funciona mejor.</p>

                <h4>Automatiza Reportes</h4>
                <p>Crea dashboards que se actualicen automáticamente. Revisa métricas semanalmente, no mensualmente.</p>

                <h3>Herramientas Avanzadas</h3>
                <p>Cuando crezcas, considera herramientas como Mixpanel (para producto), Hotjar (para UX), o Tableau (para visualización avanzada).</p>

                <h3>Caso de Éxito</h3>
                <p>Un cliente nuestro, una tienda de ropa en Veracruz, usó datos para descubrir que el 70% de sus ventas venían de Instagram los fines de semana. Duplicaron su presupuesto en esa plataforma y aumentaron ventas un 150%.</p>

                <p><strong>¿Quieres tomar decisiones basadas en datos, no en intuición?</strong> Configuramos tu sistema de analítica completo y te enseñamos a interpretarlo.</p>
            `
        },
        {
            slug: 'ecommerce-veracruz',
            title: 'Tienda Online para tu Negocio: Vende 24/7 en Veracruz',
            excerpt: 'Plataformas, costos y estrategias para crear una tienda virtual que funcione en el mercado local.',
            author: 'Noé Sánchez Carballo',
            published_at: '2026-03-25T10:00:00Z',
            image_url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80',
            content: `
                <h2>E-commerce en el Mercado Local</h2>
                <p>En Veracruz, el comercio electrónico no es opcional. Es necesario. Tus clientes esperan poder comprar online, especialmente después de las restricciones de movilidad que vivimos.</p>

                <h3>¿Por Qué Necesitas E-commerce?</h3>
                <p>El 80% de los consumidores mexicanos investigan productos online antes de comprar. Si no tienes presencia digital, tus competidores te están ganando terreno.</p>

                <h3>Plataformas Recomendadas para Veracruz</h3>

                <h4>Shopify</h4>
                <p>La más fácil de usar. Perfecta para principiantes. Precio: $29/mes. Tiene apps para todo, incluyendo envíos locales.</p>

                <h4>WooCommerce (WordPress)</h4>
                <p>Gratis si ya tienes WordPress. Muy flexible. Ideal si quieres control total. Necesitas hosting y mantenimiento.</p>

                <h4>Mercado Libre</h4>
                <p>Popular en México. Fácil de empezar, pero menos control de marca. Comisiones del 12-16% por venta.</p>

                <h4>Tiendanube</h4>
                <p>Popular en Latinoamérica. Buena relación precio-calidad. Desde $19/mes. Fácil integración con pagos mexicanos.</p>

                <h3>Funcionalidades Esenciales</h3>
                <ul>
                    <li><strong>Catálogo de productos:</strong> Fotos profesionales, descripciones detalladas</li>
                    <li><strong>Carrito de compras:</strong> Simple y seguro</li>
                    <li><strong>Métodos de pago:</strong> Tarjeta, PayPal, efectivo en tienda</li>
                    <li><strong>Envíos:</strong> Integración con paqueterías locales</li>
                    <li><strong>SEO optimizado:</strong> Para aparecer en Google</li>
                </ul>

                <h3>Estrategias de Éxito en Veracruz</h3>

                <h4>Entregas Locales Rápidas</h4>
                <p>Ofrece entregas en menos de 24 horas en la zona metropolitana. Usa mensajería local para reducir costos.</p>

                <h4>Pagos en Efectivo</h4>
                <p>Muchos clientes prefieren pagar en efectivo al recibir. Integra opciones como pago contra entrega.</p>

                <h4>Atención Personalizada</h4>
                <p>WhatsApp integrado para consultas. Respuestas en menos de 1 hora. Construye confianza personal.</p>

                <h4>Contenido Local</h4>
                <p>Muestra tu tienda física, tu equipo, eventos locales. Los clientes de Veracruz valoran lo local.</p>

                <h3>Costos Reales</h3>
                <ul>
                    <li><strong>Plataforma:</strong> $500-2000 MXN/mes</li>
                    <li><strong>Dominio:</strong> $300 MXN/año</li>
                    <li><strong>Fotos profesionales:</strong> $2000-5000 MXN inicial</li>
                    <li><strong>Marketing inicial:</strong> $3000-10000 MXN</li>
                    <li><strong>Mantenimiento:</strong> $2000-5000 MXN/mes</li>
                </ul>

                <h3>Errores Comunes</h3>
                <ol>
                    <li>Fotos de mala calidad</li>
                    <li>Descripciones pobres</li>
                    <li>Proceso de compra complicado</li>
                    <li>Falta de stock actualizado</li>
                    <li>No responder consultas rápidamente</li>
                </ol>

                <h3>Cómo Empezar Hoy</h3>
                <ol>
                    <li>Elige tu plataforma</li>
                    <li>Registra dominio .com.mx</li>
                    <li>Toma fotos profesionales</li>
                    <li>Configura métodos de pago</li>
                    <li>Sube 10-20 productos iniciales</li>
                    <li>Promociona en redes sociales</li>
                </ol>

                <p><strong>¿Quieres vender online pero no sabes por dónde empezar?</strong> Creamos tu tienda completa, desde el diseño hasta la configuración de pagos y envíos.</p>
            `
        },
        {
            slug: 'contenido-visual-redes',
            title: 'Contenido Visual que Engancha: Diseña Posts que Vendan',
            excerpt: 'Tips de diseño gráfico para crear contenido atractivo en Instagram, Facebook y TikTok.',
            author: 'Noé Sánchez Carballo',
            published_at: '2026-03-24T10:00:00Z',
            image_url: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=800&q=80',
            content: `
                <h2>Visuales que Convierten</h2>
                <p>En un mar de contenido, solo el visual impactante sobrevive. Tus posts en redes sociales tienen 3 segundos para captar atención. Aprende a crear contenido que no solo se vea bien, sino que venda.</p>

                <h3>La Psicología del Contenido Visual</h3>
                <p>El cerebro procesa imágenes 60,000 veces más rápido que texto. Un buen visual no solo informa, sino que emociona y motiva a la acción.</p>

                <h3>Herramientas para Crear Contenido Visual</h3>

                <h4>Canva Pro</h4>
                <p>$12.99/mes. Plantillas profesionales, elementos gráficos, redimensionamiento automático para todas las plataformas.</p>

                <h4>Adobe Creative Suite</h4>
                <p>$52.99/mes. Para profesionales. Photoshop, Illustrator, Premiere para contenido avanzado.</p>

                <h4>CapCut</h4>
                <p>Gratis. Excelente para videos cortos. Edición móvil profesional.</p>

                <h4>Unsplash + Pexels</h4>
                <p>Imágenes gratis de alta calidad. Busca por conceptos, no por palabras literales.</p>

                <h3>Tipos de Contenido que Funcionan</h3>

                <h4>Carousels Educativos</h4>
                <p>Series de 3-5 slides que enseñan algo valioso. Alto engagement, posicionan expertise.</p>

                <h4>Videos Cortos</h4>
                <p>15-30 segundos. Muestran procesos, behind the scenes, tips rápidos. TikTok e Instagram Reels.</p>

                <h4>Infografías</h4>
                <p>Datos visuales fáciles de digerir. Estadísticas, procesos, comparaciones.</p>

                <h4>Stories Interactivos</h4>
                <p>Preguntas, encuestas, quizzes. Aumentan interacción 3x más que posts normales.</p>

                <h4>Contenido Generado por Usuarios</h4>
                <p>Comparte fotos de clientes usando tus productos. Construye comunidad y confianza.</p>

                <h3>Paleta de Colores que Vende</h3>
                <ul>
                    <li><strong>Rojo:</strong> Urgencia, pasión (usar con cuidado)</li>
                    <li><strong>Azul:</strong> Confianza, profesionalismo</li>
                    <li><strong>Verde:</strong> Crecimiento, naturaleza</li>
                    <li><strong>Naranja:</strong> Energía, llamado a acción</li>
                    <li><strong>Negro:</strong> Lujo, sofisticación</li>
                </ul>

                <h3>Tipografía que Comunica</h3>
                <ul>
                    <li><strong>Sans Serif:</strong> Moderna, limpia (Arial, Helvetica)</li>
                    <li><strong>Serif:</strong> Tradicional, confiable (Times New Roman)</li>
                    <li><strong>Script:</strong> Elegante, personal (solo para títulos)</li>
                    <li><strong>Display:</strong> Atención, creativo (para destacar)</li>
                </ul>

                <h3>Fórmulas de Posts que Convierten</h3>

                <h4>Estructura AIDA</h4>
                <p><strong>Atención:</strong> Imagen impactante<br>
                <strong>Interés:</strong> Información valiosa<br>
                <strong>Deseo:</strong> Beneficios claros<br>
                <strong>Acción:</strong> Llamado claro</p>

                <h4>Problema + Solución</h4>
                <p>Identifica dolor del cliente, ofrece solución específica.</p>

                <h4>Antes + Después</h4>
                <p>Muestra transformación, resultados tangibles.</p>

                <h3>Calendario de Contenido</h3>
                <p>Planifica 2-3 semanas adelantado. Mezcla tipos de contenido. Mantén consistencia visual.</p>

                <h3>Mide y Optimiza</h3>
                <p>Usa insights de Instagram/Facebook. ¿Qué posts tienen más engagement? ¿Qué genera más leads? Duplica lo que funciona.</p>

                <p><strong>¿Tu contenido visual no está generando resultados?</strong> Creamos tu estrategia visual completa y diseñamos posts que vendan.</p>
            `
        },
        {
            slug: 'automatizacion-marketing',
            title: 'Automatización de Marketing: Trabaja Menos, Vende Más',
            excerpt: 'Herramientas y estrategias para automatizar tus ventas, emails y redes sociales sin perder el toque personal.',
            author: 'Noé Sánchez Carballo',
            published_at: '2026-03-23T10:00:00Z',
            image_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=800&q=80',
            content: `
                <h2>Sistemas que Trabajan por Ti</h2>
                <p>La automatización de marketing no es ciencia ficción. Es la realidad de los negocios exitosos. Imagina tener un equipo de ventas que trabaja 24/7 sin cansarse nunca.</p>

                <h3>Por Qué Automatizar</h3>
                <p>Los humanos somos limitados: dormimos, nos enfermamos, tenemos días malos. Los sistemas automatizados no. Trabajan constantemente, sin errores, escalando tu negocio mientras duermes.</p>

                <h3>Herramientas de Automatización</h3>

                <h4>Zapier</h4>
                <p>$19.99/mes. Conecta todas tus apps. Cuando alguien compra en tu tienda, automáticamente se agrega a tu lista de email y se envía confirmación.</p>

                <h4>Make (Integromat)</h4>
                <p>$9/mes. Similar a Zapier pero más visual. Ideal para flujos complejos.</p>

                <h4>ActiveCampaign</h4>
                <p>$29/mes. Email marketing + automatización. Crea secuencias complejas basadas en comportamiento del cliente.</p>

                <h4>HubSpot CRM</h4>
                <p>Gratis versión básica. CRM completo con automatización incluida.</p>

                <h3>Automatizaciones Esenciales</h3>

                <h4>Email Sequences</h4>
                <p>Bienvenida automática para nuevos suscriptores. Secuencias de nurturing para leads. Emails de reactivación para clientes inactivos.</p>

                <h4>Social Media Posting</h4>
                <p>Buffer, Hootsuite o Later. Programa posts semanales. Ahorra 5-10 horas por semana.</p>

                <h4>Lead Nurturing</h4>
                <p>Cuando alguien descarga tu lead magnet, automáticamente recibe una serie de emails educacionales que lo llevan a comprar.</p>

                <h4>Customer Onboarding</h4>
                <p>Nuevos clientes reciben automáticamente guías, videos tutoriales, y check-ins programados.</p>

                <h4>Abandoned Cart Recovery</h4>
                <p>Si alguien deja productos en el carrito, recibe emails recordatorios con incentivos para completar la compra.</p>

                <h3>Cómo Empezar con Automatización</h3>

                <h4>Paso 1: Mapea tus Procesos</h4>
                <p>Identifica tareas repetitivas que puedes automatizar. Desde respuestas de email hasta reportes semanales.</p>

                <h4>Paso 2: Elige Herramientas</h4>
                <p>Empieza con 1-2 herramientas. No intentes automatizar todo de golpe.</p>

                <h4>Paso 3: Crea Flujos Simples</h4>
                <p>Comienza con automatizaciones básicas: email de bienvenida, notificaciones de pedido.</p>

                <h4>Paso 4: Mide y Optimiza</h4>
                <p>¿Cuánto tiempo ahorraste? ¿Aumentaron las conversiones? Ajusta basado en resultados.</p>

                <h3>Casos de Éxito</h3>

                <h4>E-commerce Local</h4>
                <p>Un cliente automatizó sus emails de seguimiento post-compra. Aumentó ventas repetidas 40% sin esfuerzo adicional.</p>

                <h4>Servicios Profesionales</h4>
                <p>Automatizó cotizaciones y seguimientos. Convirtió 3x más leads en clientes pagando.</p>

                <h4>Restaurante</h4>
                <p>Sistema automático de recordatorios de reservaciones. Redujo no-shows 60%.</p>

                <h3>Errores a Evitar</h3>
                <ol>
                    <li>Automatizar sin estrategia clara</li>
                    <li>Ignorar el toque humano cuando es necesario</li>
                    <li>No probar las automatizaciones</li>
                    <li>Crear flujos demasiado complejos</li>
                    <li>Olvidar actualizar datos de contacto</li>
                </ol>

                <h3>ROI de la Automatización</h3>
                <p>La mayoría de negocios ven retorno de inversión en 3-6 meses. El tiempo ahorrado se traduce en crecimiento del negocio.</p>

                <p><strong>¿Quieres que tu negocio crezca automáticamente?</strong> Diseñamos e implementamos sistemas de automatización personalizados para tu negocio.</p>
            `
        }
    ];

    const BLOG_POSTS_BY_SLUG = BLOG_POSTS.reduce((map, post) => {
        map[post.slug] = post;
        return map;
    }, {});

    const blogPostsContainer = document.getElementById('blog-posts-container');

    function getBlogPostBySlug(slug) {
        return BLOG_POSTS_BY_SLUG[slug] || null;
    }

    function renderBlogPosts(posts) {
        if (!blogPostsContainer) return;
        const fragment = document.createDocumentFragment();
        posts.forEach((post, index) => {
            const a = document.createElement('a');
            a.href = `post-detail.html?slug=${post.slug}`;
            a.className = 'block bg-zinc-800 rounded-lg overflow-hidden shadow-lg hover:shadow-cyan-500/20 transition-shadow duration-300 fade-in-up';
            a.style.animationDelay = `${index * 60}ms`;
            a.innerHTML = `
                <img src="${post.image_url || 'assets/images/placeholder-blog.jpg'}" alt="${post.title}" class="w-full h-48 object-cover">
                <div class="p-6">
                    <h3 class="text-xl font-bold text-white mb-2">${post.title}</h3>
                    <p class="text-gray-400 text-sm mb-4">${post.excerpt || ''}</p>
                    <span class="text-cyan-400 text-xs uppercase font-semibold">Leer más &rarr;</span>
                </div>
            `;
            fragment.appendChild(a);
        });
        blogPostsContainer.innerHTML = '';
        blogPostsContainer.appendChild(fragment);
    }

    // 1. Configuración: Inicializar cliente de Supabase solo en páginas con formulario
    let supabaseClient = null;
    if (document.getElementById('contactForm')) {
        try {
            if (typeof window.supabase !== 'undefined') {
                const SUPABASE_URL = 'https://baamgvzfyyjemnvjvuel.supabase.co';
                const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhYW1ndnpmeXlqZW1udmp2dWVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1OTI4NDQsImV4cCI6MjA5MDE2ODg0NH0.lK_ZB2Ae5244eqlTsIBz3uVy2ppcY_ZFh3wWe5RoBco';

                supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
            } else {
                console.warn('Supabase library no cargó, el formulario funcionará en modo local');
            }
        } catch (error) {
            console.warn('Error inicializando Supabase:', error);
        }
    }
    // 2. Manejador del Formulario
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formStatus = document.getElementById('formStatus');
    const formWhatsApp = document.getElementById('formWhatsApp');
    const WHATSAPP_NUMBER = '529842044965';

    function setFormStatus(message, type) {
        if (!formStatus) return;
        formStatus.classList.remove('hidden', 'text-green-600', 'text-red-600');
        formStatus.textContent = message;
        if (!message) {
            formStatus.classList.add('hidden');
            return;
        }
        formStatus.classList.add(type === 'ok' ? 'text-green-600' : 'text-red-600');
    }

    if (form && submitBtn) {
        const btnTextOriginal = submitBtn.textContent.trim();
        let sending = false;

        form.addEventListener('submit', async (e) => {
            e.preventDefault(); // Evita que la página recargue

            if (sending) return;

            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim();
            const mensaje = document.getElementById('mensaje').value.trim();
            const honeypot = document.getElementById('website');

            // Honeypot: solo un bot rellena este campo. Fingimos éxito y no enviamos nada.
            if (honeypot && honeypot.value.trim() !== '') {
                form.reset();
                setFormStatus('¡Gracias! Tu mensaje fue recibido.', 'ok');
                return;
            }

            if (!nombre || !email || !mensaje) {
                setFormStatus('Completa tu nombre, email y mensaje.', 'error');
                return;
            }

            sending = true;
            submitBtn.textContent = 'ENVIANDO...';
            submitBtn.disabled = true;
            submitBtn.setAttribute('aria-busy', 'true');
            submitBtn.classList.add('opacity-70', 'cursor-not-allowed');
            setFormStatus('', 'idle');
            if (formWhatsApp) formWhatsApp.classList.add('hidden');

            try {
                if (!supabaseClient) {
                    throw new Error('El servicio de mensajes no está disponible.');
                }

                // Tiempo máximo de espera para no dejar el botón colgado
                const { error } = await Promise.race([
                    supabaseClient.from('contactos').insert([{ nombre, email, mensaje }]),
                    new Promise((resolve, reject) => {
                        setTimeout(() => reject(new Error('Tiempo de espera agotado.')), 12000);
                    })
                ]);

                if (error) throw error;

                form.reset();
                submitBtn.textContent = '¡MENSAJE ENVIADO!';
                submitBtn.classList.replace('bg-black', 'bg-green-500');
                setFormStatus('Mensaje enviado. Te contactamos en menos de 24 horas.', 'ok');

                setTimeout(() => {
                    submitBtn.textContent = btnTextOriginal;
                    submitBtn.classList.replace('bg-green-500', 'bg-black');
                    submitBtn.disabled = false;
                    submitBtn.removeAttribute('aria-busy');
                    submitBtn.classList.remove('opacity-70', 'cursor-not-allowed');
                }, 4000);
            } catch (error) {
                // Sin falso positivo: avisamos del fallo y ofrecemos WhatsApp con el mensaje ya escrito.
                console.error('Error enviando mensaje:', error);
                submitBtn.textContent = btnTextOriginal;
                submitBtn.disabled = false;
                submitBtn.removeAttribute('aria-busy');
                submitBtn.classList.remove('opacity-70', 'cursor-not-allowed');

                setFormStatus('No pudimos enviar tu mensaje. Intenta de nuevo o escríbenos directo:', 'error');

                if (formWhatsApp) {
                    const texto = `Hola Black Pixel, soy ${nombre}. Mi email es ${email}. Mensaje: ${mensaje}`;
                    formWhatsApp.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`;
                    formWhatsApp.classList.remove('hidden');
                }
            } finally {
                sending = false;
            }
        });
    }

    // ==========================================
    // Lógica para el Blog
    // Se activa por la presencia del contenedor, no por el nombre del archivo:
    // Netlify sirve URLs limpias (/blog) y comprobar `pathname.includes('blog.html')`
    // dejaba el listado vacío en producción.
    // ==========================================
    if (blogPostsContainer) {
        renderBlogPosts(BLOG_POSTS);
    }

    // ==========================================
    // Lógica para el Detalle de Post
    // Mismo criterio: el contenedor existe solo en post-detail.
    // ==========================================
    const blogPostContent = document.getElementById('blog-post-content');

    if (blogPostContent) {
        const postTitleElement = document.getElementById('post-title');

        function renderPostDetail(post) {
            postTitleElement.innerText = post.title;
            document.title = post.title + ' | Black Pixel';

            // Metadatos por artículo (compartir en redes y buscadores)
            const pageUrl = window.location.origin + window.location.pathname + '?slug=' + encodeURIComponent(post.slug);
            const metaValues = [
                ['meta[name="description"]', (post.excerpt || '').slice(0, 155)],
                ['meta[property="og:title"]', post.title + ' | Black Pixel'],
                ['meta[property="og:description"]', (post.excerpt || '').slice(0, 155)],
                ['meta[property="og:url"]', pageUrl],
                ['meta[name="twitter:title"]', post.title + ' | Black Pixel'],
                ['meta[name="twitter:description"]', (post.excerpt || '').slice(0, 155)]
            ];
            if (post.image_url) {
                metaValues.push(['meta[property="og:image"]', post.image_url]);
                metaValues.push(['meta[name="twitter:image"]', post.image_url]);
            }
            metaValues.forEach(([selector, value]) => {
                if (!value) return;
                let el = document.querySelector(selector);
                if (!el) {
                    const match = selector.match(/^meta\[(name|property)="([^"]+)"\]$/);
                    if (!match) return;
                    el = document.createElement('meta');
                    el.setAttribute(match[1], match[2]);
                    document.head.appendChild(el);
                }
                el.setAttribute('content', value);
            });

            blogPostContent.classList.add('fade-in-up');
            blogPostContent.innerHTML = `
                <h1 class="text-4xl md:text-5xl font-black uppercase text-white mb-6 leading-tight">${post.title}</h1>
                <p class="text-gray-500 text-sm mb-8">Por ${post.author || 'Black Pixel'} el ${new Date(post.published_at).toLocaleDateString()}</p>
                <img src="${post.image_url || 'assets/images/placeholder-blog.jpg'}" alt="${post.title}" class="w-full h-64 object-cover rounded-lg mb-8">
                <div class="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-4">
                    ${post.content}
                </div>
                <div class="mt-12 pt-8 border-t border-zinc-800">
                    <a href="blog.html" class="text-cyan-400 hover:text-white transition-colors text-sm uppercase font-semibold">&larr; Volver al Blog</a>
                </div>
            `;
        }

        const urlParams = new URLSearchParams(window.location.search);
        const slug = urlParams.get('slug');

        if (!slug) {
            blogPostContent.innerHTML = '<p class="text-red-500 text-center">Slug de post no encontrado.</p>';
            postTitleElement.innerText = 'Post No Encontrado';
            return;
        }

        const post = getBlogPostBySlug(slug);

        if (post) {
            renderPostDetail(post);
        } else {
            blogPostContent.innerHTML = '<p class="text-gray-400 text-center">Post no encontrado.</p>';
            postTitleElement.innerText = 'Post No Encontrado';
        }
    }

    // ==========================================
    // Casos de estudio (proyecto.html)
    // Se activa por la existencia del contenedor, no por el nombre del
    // archivo: funciona igual con URLs limpias (/proyecto) o con .html.
    // ==========================================
    const PROJECTS = [
        {
            slug: 'zavala-ashane',
            name: 'Zavala Ashane Builders',
            category: 'Diseño Web • Construcción',
            tagline: 'Un sitio propio para una constructora que vivía solo de recomendaciones boca a boca.',
            year: '2026',
            location: 'The Woodlands, Texas',
            services: ['Diseño web', 'Identidad digital', 'Arquitectura de contenido', 'SEO local'],
            site: 'https://zavalaashanebuilders.com',
            summary: 'Zavala Ashane Builders construye casas, terrenos y proyectos multifamiliares en The Woodlands, Texas. Su trabajo se movía por referidos y redes sociales, pero no existía un lugar oficial donde un cliente potencial pudiera ver la obra, conocer el proceso y pedir una cotización sin depender de un mensaje suelto.',
            challenge: [
                'Quien buscaba la empresa en Google no encontraba un sitio oficial, solo perfiles sociales dispersos.',
                'La obra es el mejor argumento de venta, pero no había un espacio ordenado para mostrarla.',
                'Los prospectos llegaban por WhatsApp sin contexto: había que responder siempre lo mismo.',
                'El público está en Estados Unidos: el contenido debía ir en inglés, cargar rápido y leerse perfecto en el celular.'
            ],
            solution: [
                {
                    title: 'Contenido antes que decoración',
                    text: 'Reordenamos el sitio para que primero se vea la obra y luego, en una sección aparte, las propiedades en venta: casas, terrenos, multifamiliar y comercial.'
                },
                {
                    title: 'Una identidad sobria',
                    text: 'Paleta oscura, tipografía de peso alto y mucho aire. El diseño no compite con las fotos de los proyectos: las enmarca.'
                },
                {
                    title: 'Captación sin fricción',
                    text: 'Formulario de contacto con validación, mensajes de estado claros y accesos directos a WhatsApp desde cada sección.'
                },
                {
                    title: 'Rendimiento primero',
                    text: 'Sitio estático sin frameworks ni build: HTML, CSS y JavaScript propios, animaciones discretas y navegación móvil completa.'
                }
            ],
            results: [
                'Dominio propio y sitio publicado (zavalaashanebuilders.com).',
                'Secciones de proyectos, propiedades en venta, servicios, proceso y testimonios.',
                'Filtros de portafolio por tipo de proyecto y ficha por propiedad con estado (en venta, en contrato, vendida).',
                'Formulario de contacto en producción con respaldo por WhatsApp.',
                'Medición de tráfico y leads pendiente: es el siguiente paso con Search Console y analítica.'
            ],
            stack: ['HTML5', 'CSS3', 'JavaScript vanilla', 'Deploy estático']
        },
        {
            slug: 'repro-ai',
            name: 'Repro AI Asistente',
            category: 'App Móvil • IA',
            tagline: 'Una app que responde con inteligencia en lugar de mandar al usuario a buscar en un menú.',
            year: '2026',
            location: 'Producto propio',
            services: ['Diseño de producto', 'Interfaz móvil', 'Integración de IA'],
            site: 'https://polite-pasca-922737.netlify.app/',
            summary: 'Repro AI nació como un experimento de producto: tomar la lógica de un asistente conversacional y aplicarla a una app móvil ligera, sin la fricción de un panel con veinte opciones.',
            challenge: [
                'Las apps de asistencia suelen castigar al usuario con menús y formularios antes de dar una respuesta.',
                'Integrar un modelo de lenguaje sin que la interfaz se sienta lenta o rota.',
                'Mantener una identidad visual propia dentro de las limitaciones de una interfaz conversacional.'
            ],
            solution: [
                {
                    title: 'Conversación como navegación',
                    text: 'La pantalla principal es el chat: se elimina el menú y se deja que el usuario escriba lo que necesita.'
                },
                {
                    title: 'Estados siempre visibles',
                    text: 'Indicadores de carga, errores y respuestas parciales para que la app nunca parezca congelada.'
                },
                {
                    title: 'Identidad mínima',
                    text: 'Tipografía y color trabajados para que la app se reconozca sin necesidad de ilustraciones pesadas.'
                }
            ],
            results: [
                'Prototipo funcional publicado y navegable en móvil.',
                'Flujo de conversación completo, desde el saludo hasta la respuesta.',
                'Base reutilizable para futuros asistentes verticales de otros clientes.'
            ],
            stack: ['JavaScript', 'Interfaz móvil', 'Integración de IA', 'Deploy estático']
        },
        {
            slug: 'interprete-legal',
            name: 'Intérprete Legal',
            category: 'Identidad • Corporativo',
            tagline: 'Seriedad visual para un servicio que se juega la confianza en los primeros cinco segundos.',
            year: '2026',
            location: 'Servicios legales',
            services: ['Identidad digital', 'Diseño web', 'Contenido'],
            site: 'https://interpretelegaldocu.netlify.app/',
            summary: 'Un servicio de interpretación legal necesita proyectar exactitud. El proyecto arrancó con una página de presentación que ordena los servicios y transmite autoridad sin caer en el cliché del despacho jurídico.',
            challenge: [
                'El sector legal abusa del azul marino, la balanza y la serif genérica: nada memorable.',
                'El cliente potencial necesita entender el servicio en segundos y saber cómo contratar.',
                'El sitio debía verse serio tanto para un particular como para un despacho.'
            ],
            solution: [
                {
                    title: 'Jerarquía estricta',
                    text: 'Un mensaje principal, los servicios y una sola llamada a la acción. Nada más compitiendo por atención.'
                },
                {
                    title: 'Contraste y sobriedad',
                    text: 'Fondo oscuro, tipografía fuerte y acentos medidos para transmitir precisión.'
                },
                {
                    title: 'Contacto directo',
                    text: 'El camino a la contratación queda a un clic desde cualquier punto de la página.'
                }
            ],
            results: [
                'Sitio publicado con identidad visual definida.',
                'Servicios y proceso explicados sin jerga.',
                'Base de marca lista para extenderse a tarjetas y documentación.'
            ],
            stack: ['HTML5', 'CSS3', 'JavaScript vanilla', 'Deploy estático']
        }
    ];

    const projectCaseContainer = document.getElementById('project-case');

    if (projectCaseContainer) {
        const setMeta = (selector, value) => {
            if (!value) return;
            let el = document.querySelector(selector);
            if (!el) {
                const match = selector.match(/^meta\[(name|property)="([^"]+)"\]$/);
                if (!match) return;
                el = document.createElement('meta');
                el.setAttribute(match[1], match[2]);
                document.head.appendChild(el);
            }
            el.setAttribute('content', value);
        };

        const renderProjectCase = (project, projects) => {
            const index = projects.indexOf(project);
            const next = projects[(index + 1) % projects.length];
            const host = (() => {
                try { return new URL(project.site).hostname.replace(/^www\./, ''); }
                catch (e) { return project.site; }
            })();

            const metaRows = [
                ['Cliente', project.name],
                ['Año', project.year],
                ['Ubicación', project.location],
                ['Sitio', host]
            ].concat([['Servicios', project.services.join(' · ')]]);

            projectCaseContainer.innerHTML = `
                <header class="mb-12 fade-in-up">
                    <span class="inline-block bg-black text-cyan-400 font-black uppercase text-[10px] tracking-[0.4em] px-4 py-2 border border-zinc-800 mb-6">
                        ${project.category}
                    </span>
                    <h1 class="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter text-white leading-none mb-5">
                        ${project.name}
                    </h1>
                    <p class="text-gray-400 text-lg md:text-xl max-w-3xl font-light leading-relaxed mb-8">
                        ${project.tagline}
                    </p>
                    <div class="flex flex-col sm:flex-row gap-4">
                        <a href="${project.site}" target="_blank" rel="noopener noreferrer" class="bg-cyan-400 text-black px-8 py-4 font-black uppercase text-[11px] tracking-[0.2em] hover:bg-white transition-colors duration-500 text-center">
                            Visitar el sitio &nearr;
                        </a>
                        <a href="index.html#contacto" class="border border-zinc-700 bg-black text-white px-8 py-4 font-black uppercase text-[11px] tracking-[0.2em] hover:border-cyan-500 hover:text-cyan-400 transition-colors duration-500 text-center">
                            Quiero algo así
                        </a>
                    </div>
                </header>

                <div class="relative overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950 shadow-2xl mb-16 fade-in-up" style="animation-delay:100ms">
                    <div class="flex items-center gap-1.5 px-4 py-3 border-b border-zinc-800 bg-zinc-900">
                        <span class="w-2.5 h-2.5 rounded-full bg-zinc-700"></span>
                        <span class="w-2.5 h-2.5 rounded-full bg-zinc-700"></span>
                        <span class="w-2.5 h-2.5 rounded-full bg-zinc-700"></span>
                        <span class="ml-3 text-[10px] uppercase tracking-widest text-gray-500 truncate">${host}</span>
                    </div>
                    <div class="relative aspect-[16/10]">
                        <div class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-zinc-900 via-black to-zinc-800">
                            <span class="px-6 text-center text-2xl md:text-4xl font-black uppercase tracking-tighter text-white/10">${project.name}</span>
                        </div>
                        <iframe src="${project.site}" title="Vista previa del sitio de ${project.name}" sandbox="allow-scripts allow-same-origin allow-popups" class="absolute inset-0 w-full h-full border-0 pointer-events-none" loading="lazy"></iframe>
                    </div>
                </div>

                <section aria-label="Ficha del proyecto" class="mb-16 fade-in-up" style="animation-delay:150ms">
                    <dl class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800 border border-zinc-800">
                        ${metaRows.map(([label, value]) => `
                            <div class="bg-zinc-950 p-5">
                                <dt class="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2">${label}</dt>
                                <dd class="text-white text-sm font-bold">${value}</dd>
                            </div>
                        `).join('')}
                    </dl>
                </section>

                <section class="mb-16">
                    <h2 class="text-3xl md:text-4xl font-black uppercase text-white mb-6">El <span class="text-[#22D3EE]">reto</span></h2>
                    <p class="text-gray-400 leading-relaxed max-w-3xl mb-8">${project.summary}</p>
                    <ul class="space-y-4 max-w-3xl">
                        ${project.challenge.map(item => `
                            <li class="flex items-start gap-4 text-gray-400 leading-relaxed">
                                <span class="text-cyan-400 font-black mt-1">→</span>
                                <span>${item}</span>
                            </li>
                        `).join('')}
                    </ul>
                </section>

                <section class="mb-16">
                    <h2 class="text-3xl md:text-4xl font-black uppercase text-white mb-8">La <span class="text-[#22D3EE]">solución</span></h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        ${project.solution.map((item, i) => `
                            <article class="border border-zinc-800 bg-[#0a0a0a] p-8 hover:border-cyan-400/60 transition-colors">
                                <span class="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400 block mb-3">${String(i + 1).padStart(2, '0')}</span>
                                <h3 class="text-lg font-black uppercase text-white mb-3">${item.title}</h3>
                                <p class="text-sm text-gray-500 leading-relaxed">${item.text}</p>
                            </article>
                        `).join('')}
                    </div>
                </section>

                <section class="mb-16">
                    <h2 class="text-3xl md:text-4xl font-black uppercase text-white mb-8">Los <span class="text-[#22D3EE]">resultados</span></h2>
                    <ul class="space-y-4 max-w-3xl">
                        ${project.results.map(item => `
                            <li class="flex items-start gap-4 text-gray-400 leading-relaxed">
                                <svg class="w-4 h-4 text-cyan-400 mt-1.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
                                <span>${item}</span>
                            </li>
                        `).join('')}
                    </ul>
                    <div class="flex flex-wrap gap-2 mt-10">
                        ${project.stack.map(tech => `
                            <span class="border border-zinc-800 bg-zinc-950 text-gray-400 text-[10px] font-black uppercase tracking-widest px-4 py-2">${tech}</span>
                        `).join('')}
                    </div>
                </section>

                <section class="border-t border-zinc-800 pt-12 mb-16">
                    <p class="text-3xl md:text-4xl font-black uppercase text-white leading-none mb-6">¿Tu proyecto es el <span class="text-[#22D3EE]">siguiente?</span></p>
                    <a href="index.html#contacto" class="inline-block bg-cyan-400 text-black px-10 py-5 font-black uppercase text-[11px] tracking-[0.2em] hover:bg-white transition-colors duration-500">
                        Diagnóstico de mi marca
                    </a>
                </section>

                <nav aria-label="Siguiente proyecto" class="border-t border-zinc-800 pt-8">
                    <a href="proyecto.html?slug=${next.slug}" class="group flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <span class="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Siguiente proyecto</span>
                        <span class="flex items-center gap-3 text-white font-black uppercase text-xl md:text-2xl tracking-tighter group-hover:text-cyan-400 transition-colors">
                            ${next.name}
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                        </span>
                    </a>
                </nav>
            `;
        };

        const params = new URLSearchParams(window.location.search);
        const projectSlug = params.get('slug');
        const currentProject = PROJECTS.find(p => p.slug === projectSlug);

        if (currentProject) {
            renderProjectCase(currentProject, PROJECTS);
            document.title = currentProject.name + ' | Caso de estudio — Black Pixel';
            const summaryMeta = currentProject.summary.slice(0, 155);
            const caseUrl = window.location.origin + window.location.pathname + '?slug=' + encodeURIComponent(currentProject.slug);
            setMeta('meta[name="description"]', summaryMeta);
            setMeta('meta[property="og:title"]', currentProject.name + ' | Caso de estudio — Black Pixel');
            setMeta('meta[property="og:description"]', summaryMeta);
            setMeta('meta[property="og:url"]', caseUrl);
            setMeta('meta[name="twitter:title"]', currentProject.name + ' | Caso de estudio — Black Pixel');
            setMeta('meta[name="twitter:description"]', summaryMeta);
        } else if (projectSlug) {
            projectCaseContainer.innerHTML = `
                <div class="text-center py-20">
                    <p class="text-2xl font-black uppercase text-white mb-4">Proyecto no encontrado</p>
                    <p class="text-gray-500 mb-8">El caso de estudio que buscas no existe o cambió de nombre.</p>
                    <a href="index.html#portafolio" class="inline-block bg-cyan-400 text-black px-8 py-4 font-black uppercase text-[11px] tracking-[0.2em] hover:bg-white transition-colors">Ver todos los proyectos</a>
                </div>
            `;
        } else {
            projectCaseContainer.innerHTML = `
                <div class="mb-14">
                    <h1 class="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-4">Casos de <span class="text-[#22D3EE]">estudio</span></h1>
                    <p class="text-gray-400 max-w-2xl leading-relaxed">El reto, la solución y lo que quedó funcionando en cada proyecto.</p>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    ${PROJECTS.map(p => `
                        <a href="proyecto.html?slug=${p.slug}" class="group border border-zinc-800 bg-[#0a0a0a] p-8 hover:border-cyan-400/60 transition-colors">
                            <span class="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400 block mb-3">${p.category}</span>
                            <h2 class="text-2xl font-black uppercase text-white mb-3 group-hover:text-cyan-400 transition-colors">${p.name}</h2>
                            <p class="text-sm text-gray-500 leading-relaxed mb-6">${p.tagline}</p>
                            <span class="text-[10px] font-black uppercase tracking-widest text-white border-b border-zinc-700 pb-1 group-hover:border-cyan-400 transition-colors">Leer el caso</span>
                        </a>
                    `).join('')}
                </div>
            `;
            document.title = 'Casos de estudio | Black Pixel';
        }
    }
});
