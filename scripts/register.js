// Partículas (ya lo tenías)
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

    if (Math.random() > 0.7) particle.classList.add('glow');

    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 20 + 's';
    particle.style.animationDuration = (15 + Math.random() * 15) + 's';

    container.appendChild(particle);
  }
}

// Validaciones
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

const validators = {
  nombre: (v) => v.trim().length >= 2,
  apellido: (v) => v.trim().length >= 2,
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
  password: (v) => v.length >= 6
};

// Configuración de validación en tiempo real
function setupValidation() {
  const fields = [
    { id: 'nombre', message: 'El nombre debe tener al menos 2 caracteres' },
    { id: 'apellido', message: 'El apellido debe tener al menos 2 caracteres' },
    { id: 'email', message: 'Ingresa un email válido' },
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
document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value.trim();
  const apellido = document.getElementById('apellido').value.trim();
  const correo = document.getElementById('email').value.trim(); // 👈 el backend espera "correo"
  const password = document.getElementById('password').value.trim();
  const termsCheckbox = document.getElementById('terms');

  if (!termsCheckbox.checked) {
    alert('Debes aceptar los términos y condiciones');
    return;
  }

  // Validación rápida
  if (!validators.nombre(nombre) || !validators.apellido(apellido) || !validators.email(correo) || !validators.password(password)) {
    alert('Por favor corrige los errores antes de continuar');
    return;
  }

  const btn = document.getElementById('submitBtn');
  const originalText = btn.textContent;
  btn.textContent = 'Creando cuenta...';
  btn.disabled = true;

  try {
    const res = await fetch("https://proyecto-express-backend-aparicio-s.vercel.app/api/v1/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: `${nombre} ${apellido}`, // 👈 unimos nombre + apellido
        correo,                          // 👈 importante, el backend espera "correo"
        password,
        rol: "user"                      // 👈 por defecto todos "user"
      })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.msg || `❌ Error ${res.status} al registrar`);
      return;
    }

    btn.textContent = '✓ Cuenta creada';
    btn.style.background = 'linear-gradient(135deg, #10B981, #059669)';

    setTimeout(() => {
      alert('✅ ¡Cuenta creada exitosamente!\n\nAhora inicia sesión en KarenFlix');
      window.location.href = './login.html';
    }, 1000);
  } catch (err) {
    console.error("Error en registro:", err);
    alert("❌ No se pudo conectar con el servidor.");
  } finally {
    btn.disabled = false;
    btn.textContent = originalText;
    btn.style.background = 'linear-gradient(135deg, #8B5CF6, #A855F7)';
  }
});

// Efectos de inputs
document.querySelectorAll('.form-input').forEach(input => {
  input.addEventListener('focus', function () {
    this.parentElement.style.transform = 'scale(1.01)';
  });
  input.addEventListener('blur', function () {
    this.parentElement.style.transform = 'scale(1)';
  });
});

// Efecto de movimiento
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
