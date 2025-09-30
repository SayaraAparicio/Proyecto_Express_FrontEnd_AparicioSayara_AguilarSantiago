// Animaciones opcionales
if (typeof generateMovieBackground === "function") generateMovieBackground();
if (typeof generateParticles === "function") generateParticles();

// Efectos de foco en inputs
document.querySelectorAll(".form-input").forEach(input => {
  input.addEventListener("focus", () => {
    input.parentElement.style.transform = "scale(1.02)";
  });
  input.addEventListener("blur", () => {
    input.parentElement.style.transform = "scale(1)";
  });

  // Mostrar credenciales en consola para desarrollo
  console.log("=== ACCESO ADMINISTRADOR ===");
  console.log("Email: admin@karenflix.com");
  console.log("Password: admin123");
  console.log("===========================");
});

// Función helper para login rápido de admin (útil en desarrollo)
window.quickAdminLogin = function() {
  document.getElementById("email").value = "admin@karenflix.com";
  document.getElementById("password").value = "admin123";
  console.log("Credenciales de admin cargadas. Haz click en 'Iniciar sesión'");
};

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const emailEl = document.getElementById("email");
  const passEl = document.getElementById("password");

  if (!form || !emailEl || !passEl) {
    console.error("Login: faltan elementos en el DOM (form/email/password).");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = emailEl.value.trim();
    const password = passEl.value.trim();

    if (!email || !password) {
      alert("Por favor ingresa email y contraseña.");
      return;
    }

    const btn = form.querySelector(".login-btn");
    const originalText = btn ? btn.textContent : null;
    if (btn) {
      btn.disabled = true;
      btn.textContent = "Iniciando sesión…";
    }

    // Primero verificar si es el admin (offline)
    if (email.toLowerCase() === 'admin@karenflix.com' && password === 'admin123') {
      const adminData = {
        name: 'Admin Karenflix',
        email: 'admin@karenflix.com',
        role: 'admin',
        loginTime: new Date().toISOString()
      };
      
      localStorage.setItem("token", "admin_token_karenflix");
      localStorage.setItem("user", JSON.stringify(adminData));
      localStorage.setItem("isAdmin", "true");
      
      if (btn) {
        btn.textContent = "✅ Bienvenido Admin!";
      }
      
      alert("Bienvenido Administrador!");
      
      setTimeout(() => {
        window.location.href = "../html/admin.html";
      }, 600);
      return;
    }

    // Si no es admin, intentar login con la API
    try {
      const res = await fetch("https://proyecto-express-backend-aparicio-s.vercel.app/api/v1/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo: email, password }), 
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.msg || `Error ${res.status} al iniciar sesión`);
        if (btn) {
          btn.disabled = false;
          btn.textContent = originalText;
        }
        return;
      }

      // IMPORTANTE: Guardar el token REAL del backend
      if (data.token) {
        localStorage.setItem("token", data.token);
        console.log("Token guardado correctamente");
      } else {
        console.error("El backend no devolvió un token");
        alert("Error: No se recibió token de autenticación");
        if (btn) {
          btn.disabled = false;
          btn.textContent = originalText;
        }
        return;
      }

      // Guardar info del usuario
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      // Feedback visual
      if (btn) {
        btn.textContent = "✅ Bienvenido";
      }

      // Redirección
      setTimeout(() => {
        window.location.href = "../html/home.html";
      }, 600);

    } catch (err) {
      console.error("Error en login:", err);
      alert("No se pudo conectar con el servidor.");
      if (btn) {
        btn.disabled = false;
        btn.textContent = originalText;
      }
    }
  });
});