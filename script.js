// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav__link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});


// Add scroll effect to header
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards
document.querySelectorAll('.service__card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});



// Form submission with email integration (using mailto as fallback)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const nombre = formData.get('nombre');
        const email = formData.get('email');
        const telefono = formData.get('telefono');
        const mensaje = formData.get('mensaje');
        
        // Create mailto link as fallback
        // In production, you would send this to a server endpoint
        const subject = encodeURIComponent(`Contacto desde web - ${nombre}`);
        const body = encodeURIComponent(`Nombre: ${nombre}\nEmail: ${email}\nTeléfono: ${telefono}\n\nMensaje:\n${mensaje}`);
        const mailtoLink = `mailto:rplestudiocontable@gmail.com?subject=${subject}&body=${body}`;
        
        // For now, show success message
        // In production, you would use fetch() to send to your backend
        alert('¡Gracias por contactarnos! Nos pondremos en contacto contigo pronto.\n\nEn producción, este formulario enviará los datos directamente a tu correo.');
        
        // Optionally open mailto (commented out by default)
        // window.location.href = mailtoLink;
        
        // Reset form
        contactForm.reset();
    });
}

// Modal functionality
const modal = document.getElementById('cotizacion-modal');
const cotizacionBtn = document.getElementById('cotizacion-btn');
const cotizacionBtnServices = document.getElementById('cotizacion-btn-services');
const modalClose = document.querySelector('.modal__close');
const modalCancel = document.querySelector('.modal__cancel');

// Open modal
function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

if (cotizacionBtn) {
    cotizacionBtn.addEventListener('click', openModal);
}

if (cotizacionBtnServices) {
    cotizacionBtnServices.addEventListener('click', openModal);
}

if (modalClose) {
    modalClose.addEventListener('click', closeModal);
}

if (modalCancel) {
    modalCancel.addEventListener('click', closeModal);
}

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// Conditional fields - Personal details
const tienePersonalRadios = document.querySelectorAll('input[name="tiene_personal"]');
const personalDetails = document.getElementById('personal-details');

tienePersonalRadios.forEach(radio => {
    radio.addEventListener('change', () => {
        if (radio.value === 'Sí') {
            personalDetails.style.display = 'block';
        } else {
            personalDetails.style.display = 'none';
            // Clear personal details inputs
            document.querySelectorAll('#personal-details input').forEach(input => {
                if (input.type !== 'radio' && input.type !== 'checkbox') {
                    input.value = '';
                } else {
                    input.checked = false;
                }
            });
        }
    });
});

// Conditional fields - Fecha límite
const tramitesUrgentesRadios = document.querySelectorAll('input[name="tramites_urgentes"]');
const fechaLimite = document.getElementById('fecha-limite');

tramitesUrgentesRadios.forEach(radio => {
    radio.addEventListener('change', () => {
        if (radio.value === 'Sí') {
            fechaLimite.style.display = 'block';
        } else {
            fechaLimite.style.display = 'none';
            document.querySelector('input[name="fecha_limite"]').value = '';
        }
    });
});

// Handle "Otra" option for tipo_negocio
const otraTipo = document.getElementById('otra-tipo');
const tipoOtraInput = document.getElementById('tipo-otra-input');

if (otraTipo && tipoOtraInput) {
    // Hide initially
    tipoOtraInput.style.display = 'none';
    tipoOtraInput.required = false;
    
    // Function to toggle input visibility
    function toggleTipoOtraInput() {
        if (otraTipo.checked) {
            tipoOtraInput.style.display = 'inline-block';
            tipoOtraInput.required = true;
        } else {
            tipoOtraInput.style.display = 'none';
            tipoOtraInput.required = false;
            tipoOtraInput.value = '';
        }
    }
    
    otraTipo.addEventListener('change', toggleTipoOtraInput);
    
    // Check other radios to hide input
    document.querySelectorAll('input[name="tipo_negocio"]').forEach(radio => {
        if (radio !== otraTipo) {
            radio.addEventListener('change', toggleTipoOtraInput);
        }
    });
}

// Handle "Otros" option for modalidades
const otrosModalidades = document.getElementById('otros-modalidades');
const modalidadesOtrosInput = document.getElementById('modalidades-otros-input');

if (otrosModalidades && modalidadesOtrosInput) {
    otrosModalidades.addEventListener('change', () => {
        if (otrosModalidades.checked) {
            modalidadesOtrosInput.style.display = 'inline-block';
        } else {
            modalidadesOtrosInput.style.display = 'none';
            modalidadesOtrosInput.value = '';
        }
    });
    
    // Hide initially
    modalidadesOtrosInput.style.display = 'none';
}

// Cotización form submission
const cotizacionForm = document.getElementById('cotizacion-form');
if (cotizacionForm) {
    cotizacionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get all form data
        const formData = new FormData(cotizacionForm);
        
        // Build email body
        let emailBody = 'FORMULARIO DE SOLICITUD DE COTIZACIÓN - RPL Estudio Contable\n\n';
        emailBody += '═══════════════════════════════════════════════════════════\n\n';
        
        // Datos de contacto
        emailBody += '🔹 DATOS DE CONTACTO\n';
        emailBody += '─────────────────────────────────────────────────────────\n';
        emailBody += `Nombre completo: ${formData.get('nombre')}\n`;
        emailBody += `Documento/RUT/CI: ${formData.get('documento') || 'No especificado'}\n`;
        emailBody += `Correo electrónico: ${formData.get('email')}\n`;
        emailBody += `Teléfono / Celular: ${formData.get('telefono')}\n`;
        emailBody += `Ciudad / País: ${formData.get('ciudad') || 'No especificado'}\n\n`;
        
        // Sobre su empresa
        emailBody += '🔹 SOBRE SU EMPRESA / SITUACIÓN\n';
        emailBody += '─────────────────────────────────────────────────────────\n';
        emailBody += `Tipo de persona / negocio: ${formData.get('tipo_negocio')}`;
        if (formData.get('tipo_negocio') === 'Otra') {
            emailBody += ` - ${formData.get('tipo_negocio_otra')}`;
        }
        emailBody += '\n';
        emailBody += `Estado actual: ${formData.get('estado')}\n\n`;
        
        // Servicios
        emailBody += '🔹 SERVICIOS QUE NECESITA\n';
        emailBody += '─────────────────────────────────────────────────────────\n';
        const servicios = formData.getAll('servicios');
        if (servicios.length > 0) {
            servicios.forEach(servicio => {
                emailBody += `• ${servicio}\n`;
            });
        } else {
            emailBody += 'Ningún servicio seleccionado\n';
        }
        const otrosServicios = formData.get('otros_servicios');
        if (otrosServicios) {
            emailBody += `• Otros: ${otrosServicios}\n`;
        }
        emailBody += '\n';
        
        // Detalle operativos
        emailBody += '🔹 DETALLE OPERATIVOS\n';
        emailBody += '─────────────────────────────────────────────────────────\n';
        emailBody += `1. ¿Tiene personal a cargo? ${formData.get('tiene_personal')}\n`;
        if (formData.get('tiene_personal') === 'Sí') {
            emailBody += `   Cantidad de empleados: ${formData.get('cantidad_empleados') || 'No especificado'}\n`;
            const modalidades = formData.getAll('modalidades');
            if (modalidades.length > 0) {
                emailBody += `   Modalidades: ${modalidades.join(', ')}`;
                if (formData.get('modalidades_otros')) {
                    emailBody += ` - ${formData.get('modalidades_otros')}`;
                }
                emailBody += '\n';
            }
        }
        emailBody += `2. ¿Cuántos comprobantes mensuales maneja? ${formData.get('comprobantes')}\n`;
        emailBody += `3. ¿Su empresa tiene actividad gravada con…? ${formData.get('actividad_gravada')}\n`;
        emailBody += `4. ¿Requiere trámites urgentes? ${formData.get('tramites_urgentes')}\n`;
        if (formData.get('tramites_urgentes') === 'Sí') {
            emailBody += `   Fecha límite: ${formData.get('fecha_limite') || 'No especificada'}\n`;
        }
        emailBody += '\n';
        
        // Observaciones
        const observaciones = formData.get('observaciones');
        if (observaciones) {
            emailBody += '🔹 COMENTARIOS ADICIONALES\n';
            emailBody += '─────────────────────────────────────────────────────────\n';
            emailBody += `${observaciones}\n\n`;
        }
        
        // Contacto
        emailBody += '🔹 CÓMO DESEA SER CONTACTADO\n';
        emailBody += '─────────────────────────────────────────────────────────\n';
        const contactos = formData.getAll('contacto');
        if (contactos.length > 0) {
            contactos.forEach(contacto => {
                emailBody += `• ${contacto}\n`;
            });
        } else {
            emailBody += 'No especificado\n';
        }
        
        // Create mailto link
        const subject = encodeURIComponent('Nueva Solicitud de Cotización - RPL Estudio Contable');
        const body = encodeURIComponent(emailBody);
        const mailtoLink = `mailto:rplestudiocontable@gmail.com?subject=${subject}&body=${body}`;
        
        // Open mailto
        window.location.href = mailtoLink;
        
        // Show success message
        setTimeout(() => {
            alert('¡Gracias por su solicitud! Se ha abierto su cliente de correo para enviar la cotización.\n\nSi no se abrió automáticamente, por favor envíe un correo a rplestudiocontable@gmail.com con los datos del formulario.');
            closeModal();
            cotizacionForm.reset();
            // Reset conditional fields
            if (personalDetails) personalDetails.style.display = 'none';
            if (fechaLimite) fechaLimite.style.display = 'none';
            if (tipoOtraInput) tipoOtraInput.style.display = 'none';
            if (modalidadesOtrosInput) modalidadesOtrosInput.style.display = 'none';
        }, 500);
    });
}

