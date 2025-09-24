
function generateParticles() {
    const container = document.querySelector('.particles');
    if (!container) return;

    const particleCount = 25;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        const types = ['', 'type-2', 'type-3'];
        const randomType = types[Math.floor(Math.random() * types.length)];
        if (randomType) particle.classList.add(randomType);

        if (Math.random() > 0.7) {
            particle.classList.add('glow');
        }

        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (15 + Math.random() * 15) + 's';

        container.appendChild(particle);
    }
}

// Validación de formulario
function validateField(field, errorElement, validationFn, errorMessage) {
    const isValid = validationFn(field.value);

    if (isValid) {
        field.classList.remove('invalid');
        field.classList.add('valid');
        errorElement.textContent = '';
        return true;
    } else {
        field.classList.remove('valid');
        field.classList.add('invalid');
        errorElement.textContent = errorMessage;
        return false;
    }
}

// Funciones de validación
const validators = {
    nombre: (value) => value.trim().length >= 2,
    apellido: (value) => value.trim().length >= 2,
    email: (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[\+]?[\d\s\-\(\)]{8,}$/;
        return emailRegex.test(value) || phoneRegex.test(value);
    },
    password: (value) => value.length >= 6
};

// Configurar validación en tiempo real
function setupValidation() {
    const fields = [
        { id: 'nombre', message: 'El nombre debe tener al menos 2 caracteres' },
        { id: 'apellido', message: 'El apellido debe tener al menos 2 caracteres' },
        { id: 'email', message: 'Ingresa un email válido o número de celular' },
        { id: 'password', message: 'La contraseña debe tener al menos 6 caracteres' }
    ];

    fields.forEach(({ id, message }) => {
        const field = document.getElementById(id);
        const errorElement = document.getElementById(id + 'Error');

        field.addEventListener('blur', () => {
            validateField(field, errorElement, validators[id], message);
        });

        field.addEventListener('input', () => {
            if (field.classList.contains('invalid')) {
                validateField(field, errorElement, validators[id], message);
            }
        });
    });
}

// Manejar envío del formulario
document.getElementById('registerForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Validar todos los campos
    const fields = ['nombre', 'apellido', 'email', 'password'];
    const messages = [
        'El nombre debe tener al menos 2 caracteres',
        'El apellido debe tener al menos 2 caracteres',
        'Ingresa un email válido o número de celular',
        'La contraseña debe tener al menos 6 caracteres'
    ];

    let isValid = true;

    fields.forEach((fieldId, index) => {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(fieldId + 'Error');
        const fieldValid = validateField(field, errorElement, validators[fieldId], messages[index]);
        if (!fieldValid) isValid = false;
    });

    // Verificar términos y condiciones
    const termsCheckbox = document.getElementById('terms');
    if (!termsCheckbox.checked) {
        alert('Debes aceptar los términos y condiciones');
        return;
    }

    if (!isValid) {
        alert('Por favor, corrige los errores en el formulario');
        return;
    }

    // Procesar registro
    const btn = document.getElementById('submitBtn');
    const originalText = btn.textContent;
    btn.textContent = 'Creando cuenta...';
    btn.disabled = true;
    btn.style.background = 'linear-gradient(135deg, #6366F1, #8B5CF6)';

    setTimeout(() => {
        btn.textContent = '✓ Cuenta creada';
        btn.style.background = 'linear-gradient(135deg, #10B981, #059669)';

        setTimeout(() => {
            alert('¡Cuenta creada exitosamente!\n\nBienvenido a KarenFlix');
            // Aquí iría la redirección real
            // window.location.href = 'login.html';
            btn.textContent = originalText;
            btn.disabled = false;
            btn.style.background = 'linear-gradient(135deg, #8B5CF6, #A855F7)';
        }, 2000);
    }, 2000);
});

// Efectos en los inputs
document.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('focus', function () {
        this.parentElement.style.transform = 'scale(1.01)';
    });

    input.addEventListener('blur', function () {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// Efecto de movimiento del mouse
document.addEventListener('mousemove', (e) => {
    const container = document.querySelector('.register-container');
    if (container) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        container.style.transform = `translate(-50%, -50%) rotateY(${(x - 0.5) * 3}deg) rotateX(${(y - 0.5) * -3}deg)`;
    }
});


// Inicializar
document.addEventListener('DOMContentLoaded', function () {
    generateParticles();
    setupValidation();
});

// También ejecutar inmediatamente
generateParticles();
setupValidation();
