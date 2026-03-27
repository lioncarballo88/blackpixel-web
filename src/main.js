// Inicializar AOS (Animate On Scroll)
AOS.init({
    duration: 800, // Duración global de la animación en milisegundos
    once: true,    // La animación solo sucede una vez al bajar
    mirror: false, // No se repite al subir (mantiene el minimalismo)
});

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
    // 1. Configuración: Inicializar cliente
    const SUPABASE_URL = 'https://baamgvzfyyjemnvjvuel.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhYW1ndnpmeXlqZW1udmp2dWVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1OTI4NDQsImV4cCI6MjA5MDE2ODg0NH0.lK_ZB2Ae5244eqlTsIBz3uVy2ppcY_ZFh3wWe5RoBco'; 
    
    const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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
                console.error('Error enviando a Supabase:', error.message);
                alert(`Error al enviar: ${error.message}. Por favor revisa la consola (F12).`);
                
                // Restaurar botón en caso de error
                submitBtn.innerText = btnTextOriginal;
                submitBtn.disabled = false;
                submitBtn.classList.remove('opacity-70', 'cursor-not-allowed');
            }
        });
    }
});