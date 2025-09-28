// Animaciones (opcionales)
if (typeof generateMovieBackground === "function") generateMovieBackground();
if (typeof generateParticles === "function") generateParticles();

// Efectos de foco (esto no rompe si no hay inputs)
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
