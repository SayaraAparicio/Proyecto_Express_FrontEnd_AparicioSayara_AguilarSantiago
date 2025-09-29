if (typeof generateMovieBackground === "function") generateMovieBackground();
if (typeof generateParticles === "function") generateParticles();

document.querySelectorAll(".form-input").forEach(input => {
  input.addEventListener("focus", () => {
    input.parentElement.style.transform = "scale(1.02)";
  });
  input.addEventListener("blur", () => {
    input.parentElement.style.transform = "scale(1)";
  });
});


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

    try {
      const res = await fetch("https://proyecto-express-backend-aparicio-s.vercel.app/api/v1/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo: email, password }), 
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.msg || `❌ Error ${res.status} al iniciar sesión`);
        return;
      }

      // Guardar token e info de usuario
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Feedback y redirección
      if (btn) {
        btn.textContent = "✓ Bienvenido";
      }
      setTimeout(() => {
        window.location.href = "../html/home.html";
      }, 600);
    } catch (err) {
      console.error("Error en login:", err);
      alert("❌ No se pudo conectar con el servidor.");
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.textContent = originalText;
      }
    }
  });
});

// admin
const ADMIN_USER = {
  email: 'admin@karenflix.com',
  password: 'admin123',
  name: 'Admin Karenflix',
  role: 'admin'
};

// Animaciones (opcionales)
if (typeof generateMovieBackground === "function") generateMovieBackground();
if (typeof generateParticles === "function") generateParticles();

// Efectos de foco
document.querySelectorAll(".form-input").forEach(input => {
  input.addEventListener("focus", () => {
    input.parentElement.style.transform = "scale(1.02)";
  });
  input.addEventListener("blur", () => {
    input.parentElement.style.transform = "scale(1)";
  });
});

// Esperar a que el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const emailEl = document.getElementById("email");
  const passEl = document.getElementById("password");

  if (!form || !emailEl || !passEl) {
    console.error("Login: faltan elementos en el DOM");
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
      btn.textContent = "Verificando...";
    }

    // Simular delay
    await new Promise(resolve => setTimeout(resolve, 800));

    try {
      // Verificar si es el usuario admin
      if (email.toLowerCase() === ADMIN_USER.email && password === ADMIN_USER.password) {
        // Login de admin exitoso
        const adminData = {
          name: ADMIN_USER.name,
          email: ADMIN_USER.email,
          role: ADMIN_USER.role,
          loginTime: new Date().toISOString()
        };
        
        // Guardar datos del admin
        localStorage.setItem("token", "admin_token_karenflix");
        localStorage.setItem("user", JSON.stringify(adminData));
        localStorage.setItem("isAuthenticated", "true");
        
        if (btn) {
          btn.textContent = "✅ Bienvenido Admin!";
        }
        
        alert("🎉 ¡Bienvenido Administrador!\nSerás redirigido al panel de control.");
        
        setTimeout(() => {
          window.location.href = "../html/admin.html";
        }, 1000);
        
      } else {
        // Cualquier otro usuario va al home normal
        const userData = {
          name: "Usuario Karenflix",
          email: email,
          role: "user",
          loginTime: new Date().toISOString()
        };
        
        localStorage.setItem("token", "user_token_karenflix");
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("isAuthenticated", "true");
        
        if (btn) {
          btn.textContent = "✅ Bienvenido!";
        }
        
        alert("✅ Login exitoso!");
        
        setTimeout(() => {
          window.location.href = "../html/home.html";
        }, 1000);
      }
      
    } catch (error) {
      console.error("Error en login:", error);
      alert("❌ Error al iniciar sesión");
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.textContent = originalText;
      }
    }
  });

  // Mostrar credenciales de admin en consola
  console.log("=== CREDENCIALES DE ADMINISTRADOR ===");
  console.log("📧 Email: admin@karenflix.com");
  console.log("🔑 Password: admin123");
  console.log("=====================================");
});

// Función para login rápido de admin 
window.quickAdminLogin = function() {
  document.getElementById("email").value = ADMIN_USER.email;
  document.getElementById("password").value = ADMIN_USER.password;
  alert("✅ Credenciales de admin cargadas!\nAhora haz click en 'Iniciar sesión'");
};