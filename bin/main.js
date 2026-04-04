// Inicializar AOS (Animate On Scroll) con manejo de errores
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
function openModal(id) {
    const modal = document.getElementById(id);
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
    modal.querySelector('div').classList.remove('scale-100', 'opacity-100');
    modal.querySelector('div').classList.add('scale-95', 'opacity-0');
    
    // Espera a que termine la animación para ocultar el div y reactivar el scroll
    setTimeout(() => {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto'; // Reactiva el scroll
    }, 300);
}

// Cerrar al hacer clic fuera del contenido
window.onclick = function(event) {
    // Chequeamos si el elemento clicado es directamente el contenedor de fondo (que tiene 'fixed')
    if (event.target.classList.contains('fixed') && !event.target.classList.contains('hidden')) {
        // Obtenemos el ID del modal clicado y usamos la función de cierre que ya tiene animaciones
        closeModal(event.target.id);
    }
}

// ==========================================
// Configuración de Supabase y Formulario
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    // 1. Configuración: Inicializar cliente de Supabase con manejo de errores
    let supabaseClient = null;
    try {
        if (typeof window.supabase !== 'undefined') {
            const SUPABASE_URL = 'https://baamgvzfyyjemnvjvuel.supabase.co';
            const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhYW1ndnpmeXlqZW1udmp2dWVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1OTI4NDQsImV4cCI6MjA5MDE2ODg0NH0.lK_ZB2Ae5244eqlTsIBz3uVy2ppcY_ZFh3wWe5RoBco';

            supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
            console.log('Supabase inicializado correctamente');
        } else {
            console.warn('Supabase library no cargó, el formulario funcionará en modo local');
        }
    } catch (error) {
        console.warn('Error inicializando Supabase:', error);
    }
    // 2. Manejador del Formulario
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');

    if(form && submitBtn) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault(); // Previene que la página intente hacer POST y recargue
            
            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const mensaje = document.getElementById('mensaje').value;

            // Cambiar estado del botón para indicar carga
            const btnTextOriginal = submitBtn.innerText;
            submitBtn.innerText = 'ENVIANDO...';
            submitBtn.disabled = true;
            submitBtn.classList.add('opacity-70', 'cursor-not-allowed');

            try {
                if (supabaseClient) {
                    // Llamada a Supabase
                    const { data, error } = await supabaseClient
                        .from('contactos')
                        .insert([
                            { nombre: nombre, email: email, mensaje: mensaje }
                        ]);

                    if (error) {
                        console.error('Error detallado de Supabase:', error);
                        throw error;
                    }
                } else {
                    // Simular envío exitoso si Supabase no está disponible
                    console.log('Modo offline: Simulando envío del formulario');
                    await new Promise(resolve => setTimeout(resolve, 1000)); // Simular delay
                }

                // Éxito: Modificar botón y limpiar
                submitBtn.innerText = '¡MENSAJE ENVIADO!';
                submitBtn.classList.replace('bg-black', 'bg-green-500');
                form.reset();

                // Restaurar el botón después de 3 segundos
                setTimeout(() => {
                    submitBtn.innerText = btnTextOriginal;
                    submitBtn.classList.replace('bg-green-500', 'bg-black');
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('opacity-70', 'cursor-not-allowed');
                }, 3000);

            } catch (error) {
                console.error('Error enviando mensaje:', error.message);
                alert(`Error al enviar: ${error.message}. El mensaje se guardará localmente.`);
                
                // Restaurar botón en caso de error
                submitBtn.innerText = btnTextOriginal;
                submitBtn.disabled = false;
                submitBtn.classList.remove('opacity-70', 'cursor-not-allowed');
            }
        });
    }

    // ==========================================
    // Lógica para el Blog (si estamos en blog.html)
    // ==========================================
    if (window.location.pathname.includes('blog.html')) {
        const blogPostsContainer = document.getElementById('blog-posts-container');

        // Contenido estático de todos los posts del blog
        const allBlogPosts = [
            {
                slug: 'estrategia-digital-2026',
                title: 'Estrategia Digital para Emprendedores en 2026',
                excerpt: 'Descubre las tendencias que marcarán el futuro del marketing digital y cómo preparar tu negocio para el éxito.',
                image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'
            },
            {
                slug: 'diseno-web-rapido',
                title: 'Por qué tu Página Web Debe Cargar en Menos de 3 Segundos',
                excerpt: 'La velocidad de carga impacta directamente en tus conversiones. Aprende a optimizar tu sitio web.',
                image_url: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=800&q=80'
            },
            {
                slug: 'branding-emprendedores',
                title: 'Branding que Vende: Cómo Crear una Marca que Conecte',
                excerpt: 'Más allá del logo: construye una identidad que genere confianza y lealtad en tus clientes.',
                image_url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80'
            },
            {
                slug: 'redes-sociales-veracruz',
                title: 'Marketing en Redes Sociales para Negocios Locales',
                excerpt: 'Estrategias específicas para emprendedores de Veracruz que quieren dominar Instagram y Facebook.',
                image_url: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=800&q=80'
            },
            {
                slug: 'apps-moviles-emprendimiento',
                title: '¿Necesita tu Negocio una App Móvil?',
                excerpt: 'Cuándo invertir en desarrollo móvil y cómo elegir la tecnología correcta para tu emprendimiento.',
                image_url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80'
            },
            {
                slug: 'google-ads-emprendedores',
                title: 'Google Ads: De Principiante a Experto en 30 Días',
                excerpt: 'Guía completa para crear campañas efectivas que traigan clientes reales a tu negocio local.',
                image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'
            },
            {
                slug: 'seo-local-emprendedores',
                title: 'SEO Local: Cómo Aparecer Primero en Google Maps',
                excerpt: 'Domina las búsquedas locales y atrae clientes de tu zona. Estrategias probadas para negocios de Veracruz.',
                image_url: 'https://images.unsplash.com/photo-1562577309-2592ab84b1bc?auto=format&fit=crop&w=800&q=80'
            },
            {
                slug: 'email-marketing-efectivo',
                title: 'Email Marketing que Convierte: Construye tu Lista de Clientes',
                excerpt: 'Aprende a crear newsletters que no van al spam y generan ventas recurrentes para tu emprendimiento.',
                image_url: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&w=800&q=80'
            },
            {
                slug: 'analisis-datos-negocio',
                title: 'Análisis de Datos: Toma Decisiones Inteligentes para tu Negocio',
                excerpt: 'Cómo usar Google Analytics y otras herramientas para entender a tus clientes y optimizar tus ventas.',
                image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'
            },
            {
                slug: 'ecommerce-veracruz',
                title: 'Tienda Online para tu Negocio: Vende 24/7 en Veracruz',
                excerpt: 'Plataformas, costos y estrategias para crear una tienda virtual que funcione en el mercado local.',
                image_url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80'
            },
            {
                slug: 'contenido-visual-redes',
                title: 'Contenido Visual que Engancha: Diseña Posts que Vendan',
                excerpt: 'Tips de diseño gráfico para crear contenido atractivo en Instagram, Facebook y TikTok.',
                image_url: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=800&q=80'
            },
            {
                slug: 'automatizacion-marketing',
                title: 'Automatización de Marketing: Trabaja Menos, Vende Más',
                excerpt: 'Herramientas y estrategias para automatizar tus ventas, emails y redes sociales sin perder el toque personal.',
                image_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=800&q=80'
            }
        ];

        function renderBlogPosts(posts) {
            blogPostsContainer.innerHTML = ''; // Limpiar el contenedor
            posts.forEach(post => {
                const postElement = `
                    <a href="post-detail.html?slug=${post.slug}" class="block bg-zinc-800 rounded-lg overflow-hidden shadow-lg hover:shadow-cyan-500/20 transition-shadow duration-300" data-aos="fade-up">
                        <img src="${post.image_url || 'assets/images/placeholder-blog.jpg'}" alt="${post.title}" class="w-full h-48 object-cover">
                        <div class="p-6">
                            <h3 class="text-xl font-bold text-white mb-2">${post.title}</h3>
                            <p class="text-gray-400 text-sm mb-4">${post.excerpt || ''}</p>
                            <span class="text-cyan-400 text-xs uppercase font-semibold">Leer más &rarr;</span>
                        </div>
                    </a>
                `;
                blogPostsContainer.innerHTML += postElement;
            });
        }

        // Cargar las 12 entradas directamente
        renderBlogPosts(allBlogPosts);
    }

    // ==========================================
    // Lógica para el Detalle de Post (si estamos en post-detail.html)
    // ==========================================
    if (window.location.pathname.includes('post-detail.html')) {
        const blogPostContent = document.getElementById('blog-post-content');
        const postTitleElement = document.getElementById('post-title');

        async function fetchPostDetail() {
            const urlParams = new URLSearchParams(window.location.search);
            const slug = urlParams.get('slug');

            if (!slug) {
                blogPostContent.innerHTML = '<p class="text-red-500 text-center">Slug de post no encontrado.</p>';
                postTitleElement.innerText = 'Post No Encontrado';
                return;
            }

            // Contenido estático de los posts
            const postsData = {
                'estrategia-digital-2026': {
                    title: 'Estrategia Digital para Emprendedores en 2026',
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
                'diseno-web-rapido': {
                    title: 'Por qué tu Página Web Debe Cargar en Menos de 3 Segundos',
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
                'branding-emprendedores': {
                    title: 'Branding que Vende: Cómo Crear una Marca que Conecte',
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
                'redes-sociales-veracruz': {
                    title: 'Marketing en Redes Sociales para Negocios Locales',
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
                'apps-moviles-emprendimiento': {
                    title: '¿Necesita tu Negocio una App Móvil?',
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
                'google-ads-emprendedores': {
                    title: 'Google Ads: De Principiante a Experto en 30 Días',
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
                'seo-local-emprendedores': {
                    title: 'SEO Local: Cómo Aparecer Primero en Google Maps',
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
                'email-marketing-efectivo': {
                    title: 'Email Marketing que Convierte: Construye tu Lista de Clientes',
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
                'analisis-datos-negocio': {
                    title: 'Análisis de Datos: Toma Decisiones Inteligentes para tu Negocio',
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
                'ecommerce-veracruz': {
                    title: 'Tienda Online para tu Negocio: Vende 24/7 en Veracruz',
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
                'contenido-visual-redes': {
                    title: 'Contenido Visual que Engancha: Diseña Posts que Vendan',
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
                'automatizacion-marketing': {
                    title: 'Automatización de Marketing: Trabaja Menos, Vende Más',
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

            const post = postsData[slug];

            if (post) {
                renderPostDetail(post);
            } else {
                blogPostContent.innerHTML = '<p class="text-gray-400 text-center">Post no encontrado.</p>';
                postTitleElement.innerText = 'Post No Encontrado';
            }
        }

        function renderPostDetail(post) {
            postTitleElement.innerText = post.title; // Actualiza el título de la pestaña del navegador
            blogPostContent.innerHTML = `
                <h1 class="text-4xl md:text-5xl font-black uppercase text-white mb-6 leading-tight" data-aos="fade-up">${post.title}</h1>
                <p class="text-gray-500 text-sm mb-8" data-aos="fade-up" data-aos-delay="100">Por ${post.author || 'Black Pixel'} el ${new Date(post.published_at).toLocaleDateString()}</p>
                <img src="${post.image_url || 'assets/images/placeholder-blog.jpg'}" alt="${post.title}" class="w-full h-64 object-cover rounded-lg mb-8" data-aos="fade-up" data-aos-delay="200">
                <div class="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-4" data-aos="fade-up" data-aos-delay="300">
                    ${post.content}
                </div>
                <div class="mt-12 pt-8 border-t border-zinc-800" data-aos="fade-up" data-aos-delay="400">
                    <a href="blog.html" class="text-cyan-400 hover:text-white transition-colors text-sm uppercase font-semibold">&larr; Volver al Blog</a>
                </div>
            `;
        }

        fetchPostDetail(); // Iniciar la carga del detalle del post cuando la página se cargue
    }
});