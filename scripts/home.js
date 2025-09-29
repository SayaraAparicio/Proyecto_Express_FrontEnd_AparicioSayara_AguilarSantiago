const BASE_URL = "https://proyecto-express-backend-aparicio-s.vercel.app/api/v1";

// ⭐ Renderizar estrellas
function renderStars(rating) {
  const maxStars = 5;
  const filled = Math.round(rating);
  let html = "";
  for (let i = 0; i < maxStars; i++) {
    html += `<span class="star ${i < filled ? "active" : ""}">★</span>`;
  }
  return `<div class="stars">${html}</div>`;
}

// Renderizar tarjetas de películas/series
function createMovieCard(movie) {
  const posterUrl = movie.imagen
    ? movie.imagen
    : "https://placehold.co/200x300?text=Sin+Imagen";

  let rating = 0;
  if (movie.promedioRating !== undefined && movie.promedioRating !== null) {
    rating = Number(movie.promedioRating).toFixed(1);
  } else if (movie.popularidad !== undefined && movie.popularidad !== null) {
    rating = Number(movie.popularidad).toFixed(1);
  }

  const year = movie.anno || "N/A";
  const title = movie.titulo || "Sin título";

  return `
  <article class="movie-card" onclick="openMovie('${movie._id}', '${title}')">
    <div class="movie-poster" style="background-image: url('${posterUrl}')">
      <div class="movie-rating">★ ${rating}</div>
    </div>
    <div class="movie-info">
      <h3 class="movie-title">${title}</h3>
      <p class="movie-year">${year}</p>
    </div>
  </article>
`;

}

// Renderizar grillas
function renderMoviesGrid(movies, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (!movies || movies.length === 0) {
    container.innerHTML =
      '<p style="color: rgba(255,255,255,0.7); text-align:center; padding:20px;">No se encontraron resultados</p>';
    return;
  }

  const html = movies.map((m) => createMovieCard(m)).join("");
  container.innerHTML = html;
}

// Fetch helper
async function fetchData(endpoint) {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`);
    if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Error en fetchData:", err);
    return [];
  }
}

// 📂 Cargar categorías en el dropdown
async function loadCategories() {
  const categories = await fetchData("/genres");
  const dropdownMenu = document.querySelector(".dropdown-menu");
  if (!dropdownMenu) return;

  dropdownMenu.innerHTML = categories
    .map(
      (cat) =>
        `<a href="#" data-category="${cat._id}">
          <i class="bi bi-collection"></i> ${cat.nombre}
        </a>`
    )
    .join("");

  // Click en categoría
  dropdownMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", async (e) => {
      e.preventDefault();
      const categoryId = link.getAttribute("data-category");
      const movies = await fetchData(`/movies?categoria=${categoryId}`);
      renderMoviesGrid(movies, "genre-movies");
      document.getElementById("genre-section").style.display = "block";
      document.getElementById("genre-title").textContent =
        `Resultados en "${link.textContent.trim()}"`;
    });
  });
}

// 🔍 Buscador
function setupSearch() {
  const searchInput = document.getElementById("search-input");
  if (!searchInput) return;

  searchInput.addEventListener("keypress", async (e) => {
    if (e.key === "Enter") {
      const query = searchInput.value.trim();
      if (!query) return;

      const movies = await fetchData(`/movies?titulo=${encodeURIComponent(query)}`);
      renderMoviesGrid(movies, "genre-movies");
      document.getElementById("genre-section").style.display = "block";
      document.getElementById("genre-title").textContent =
        `Resultados para "${query}"`;
    }
  });
}

// Inicializar home
async function initializeApp() {
  try {
    const [peliculas, series, populares, ultimos] = await Promise.all([
      fetchData("/movies"),
      fetchData("/movies?tipo=serie"),
      fetchData("/popular"),
      fetchData("/movies?sort=creadaEn"), // 👈 últimos lanzamientos
    ]);

    renderMoviesGrid(peliculas.slice(0, 12), "movies-section");
    renderMoviesGrid(series.slice(0, 12), "series-section");
    renderMoviesGrid(populares.slice(0, 12), "popular-section");
    renderMoviesGrid(ultimos.slice(0, 12), "upcoming-section");

    await loadCategories();
    setupSearch();
  } catch (err) {
    console.error("Error inicializando app:", err);
  }
}
// Mostrar reseñas
async function displayReviews(movieId) {
  const reviews = await fetchData(`/reviews/${movieId}`);
  const container = document.getElementById("reviews-section");
  if (!container) return;

  if (!reviews || reviews.length === 0) {
    container.innerHTML = "<p>No hay reseñas aún</p>";
    return;
  }

  container.innerHTML = reviews.map(r => `
    <div class="review-card">
      <h4>${r.titulo} - ★ ${r.rating}</h4>
      <p>${r.comentario}</p>
      <small>por ${r.idUsuario}</small>
      <button onclick="toggleReaction('${r._id}', 'like')">👍 ${r.likes?.length || 0}</button>
      <button onclick="toggleReaction('${r._id}', 'dislike')">👎 ${r.dislikes?.length || 0}</button>
    </div>
  `).join("");
}

// Enviar nueva reseña
async function submitReview(movieId, titulo, comentario, rating) {
  const token = localStorage.getItem("token");
  if (!token) return alert("Debes iniciar sesión");

  const res = await fetch(`${BASE_URL}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ idPelicula: movieId, titulo, comentario, rating })
  });

  if (!res.ok) {
    alert("Error al enviar reseña");
    return;
  }
  alert("✅ Reseña publicada");
  displayReviews(movieId);
}

// Like/Dislike
async function toggleReaction(reviewId, tipo) {
  const token = localStorage.getItem("token");
  if (!token) return alert("Debes iniciar sesión");

  await fetch(`${BASE_URL}/reactions/${reviewId}/react`, {
    method: "POST",
    headers: { "Authorization": `Bearer ${token}` },
    body: JSON.stringify({ tipo })
  });

  alert(tipo === "like" ? "👍 Like registrado" : "👎 Dislike registrado");
}

// Abrir película/serie y mostrar reseñas
function openMovie(movieId, movieTitle) {
  const reviewsContainer = document.getElementById("reviews-section");
  reviewsContainer.innerHTML = `
    <h2>Reseñas para ${movieTitle}</h2>
    <form id="reviewForm">
      <input type="text" id="reviewTitle" placeholder="Título" required>
      <textarea id="reviewComment" placeholder="Escribe tu reseña..." required></textarea>
      <label>Calificación: 
        <select id="reviewRating">
          <option value="1">★</option>
          <option value="2">★★</option>
          <option value="3">★★★</option>
          <option value="4">★★★★</option>
          <option value="5">★★★★★</option>
        </select>
      </label>
      <button type="submit">Enviar</button>
    </form>
    <div id="reviews-list"></div>
  `;

  // cargar reseñas existentes
  displayReviews(movieId);

  // enviar reseña
  document.getElementById("reviewForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const titulo = document.getElementById("reviewTitle").value.trim();
    const comentario = document.getElementById("reviewComment").value.trim();
    const rating = Number(document.getElementById("reviewRating").value);
    submitReview(movieId, titulo, comentario, rating);
  });
}

// =============== RESEÑAS: utilidades mínimas ===============
const TOKEN = () => localStorage.getItem("token");

function isValidObjectId(id) {
  return typeof id === "string" && /^[a-f\d]{24}$/i.test(id);
}

async function ensureMovieId(movieId) {
  if (isValidObjectId(movieId)) return movieId;
  // Fallback: tomo la primera película de /movies
  try {
    const res = await fetch(`${BASE_URL}/movies`);
    const arr = await res.json();
    if (Array.isArray(arr) && arr.length > 0 && arr[0]._id) {
      return arr[0]._id;
    }
  } catch (e) {}
  alert("No se pudo determinar una película para reseñar.");
  throw new Error("No movie id available");
}

function ensureReviewsSection() {
  let sec = document.getElementById("reviews-section");
  if (!sec) {
    sec = document.createElement("section");
    sec.id = "reviews-section";
    sec.className = "section";
    sec.innerHTML = `<h2 class="section-title">RESEÑAS</h2><div id="reviews-list"></div>`;
    document.querySelector(".main-content").appendChild(sec);
  }
  return sec;
}

function reviewCard(r) {
  const likes = Array.isArray(r.likes) ? r.likes.length : (r.totalLikes ?? 0);
  const dislikes = Array.isArray(r.dislikes) ? r.dislikes.length : (r.totalDislikes ?? 0);
  const title = r.titulo || "Sin título";
  const txt = r.comentario || "";
  const rating = r.rating ?? "N/A";
  const id = r._id;

  return `
    <div class="review-card" style="background:rgba(255,255,255,0.04);padding:14px;border-radius:10px;margin-bottom:12px;">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <h4 style="margin:0;font-weight:600">${title} — ★ ${rating}</h4>
        <small style="opacity:.7">${r.creadaEn ? new Date(r.creadaEn).toLocaleDateString() : ""}</small>
      </div>
      <p style="margin:8px 0 12px 0;opacity:.9">${txt}</p>
      <div style="display:flex;gap:8px;">
        <button onclick="reactReview('${id}','like','${r.idPelicula}')" style="background:#1f2937;color:#fff;border:0;border-radius:8px;padding:6px 10px;cursor:pointer;">👍 ${likes}</button>
        <button onclick="reactReview('${id}','dislike','${r.idPelicula}')" style="background:#1f2937;color:#fff;border:0;border-radius:8px;padding:6px 10px;cursor:pointer;">👎 ${dislikes}</button>
      </div>
    </div>
  `;
}

// =============== VER RESEÑAS (botón del hero) ===============
async function displayMovieReviews(movieId) {
  try {
    const realId = await ensureMovieId(String(movieId));
    const sec = ensureReviewsSection();
    const list = sec.querySelector("#reviews-list");
    list.innerHTML = `<div style="opacity:.8;padding:8px">Cargando reseñas…</div>`;

    const res = await fetch(`${BASE_URL}/reviews/${realId}`);
    if (!res.ok) {
      list.innerHTML = `<div style="opacity:.8;padding:8px">No se pudieron cargar reseñas (HTTP ${res.status}).</div>`;
      return;
    }
    const reviews = await res.json();
    if (!Array.isArray(reviews) || reviews.length === 0) {
      list.innerHTML = `<div style="opacity:.8;padding:8px">Aún no hay reseñas. ¡Sé el primero en opinar!</div>`;
      return;
    }
    list.innerHTML = reviews.map(reviewCard).join("");
    sec.scrollIntoView({ behavior: "smooth" });
  } catch (e) {
    alert("No se pudieron mostrar las reseñas.");
    console.error(e);
  }
}

// =============== ESCRIBIR RESEÑA (botón del hero) ===============
function buildReviewModal() {
  if (document.getElementById("review-modal")) return;
  const html = `
    <div id="review-modal" style="position:fixed;inset:0;background:rgba(0,0,0,.6);display:none;align-items:center;justify-content:center;z-index:9999;">
      <div style="width:min(520px,92vw);background:#0b1220;color:#fff;border-radius:14px;padding:18px 16px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
          <h3 style="margin:0;font-weight:700">Escribir reseña</h3>
          <button onclick="closeReviewModal()" style="background:transparent;color:#fff;border:0;font-size:20px;cursor:pointer;">×</button>
        </div>
        <form id="reviewForm">
          <input id="rv-title" placeholder="Título" required
                 style="width:100%;margin:6px 0 10px 0;padding:10px;border-radius:8px;border:1px solid #263149;background:#0f172a;color:#fff;"/>
          <textarea id="rv-text" placeholder="Tu reseña…" rows="4" required
                    style="width:100%;margin:6px 0 10px 0;padding:10px;border-radius:8px;border:1px solid #263149;background:#0f172a;color:#fff;"></textarea>
          <label style="display:block;margin:8px 0 12px 0;">Calificación:
            <select id="rv-rating" style="margin-left:8px;background:#0f172a;border:1px solid #263149;color:#fff;border-radius:6px;padding:6px;">
              <option value="1">★</option>
              <option value="2">★★</option>
              <option value="3">★★★</option>
              <option value="4">★★★★</option>
              <option value="5" selected>★★★★★</option>
            </select>
          </label>
          <div style="display:flex;gap:10px;justify-content:flex-end;">
            <button type="button" onclick="closeReviewModal()" style="background:#1f2937;border:0;color:#fff;padding:8px 12px;border-radius:8px;cursor:pointer;">Cancelar</button>
            <button type="submit" style="background:#6366f1;border:0;color:#fff;padding:8px 12px;border-radius:8px;cursor:pointer;">Publicar</button>
          </div>
        </form>
      </div>
    </div>`;
  document.body.insertAdjacentHTML("beforeend", html);
}

let __currentMovieForReview = { id: null, title: null, poster: null };

async function openReviewModal(movieId, movieTitle = "Película", posterUrl = "") {
  try {
    const realId = await ensureMovieId(String(movieId));
    __currentMovieForReview = { id: realId, title: movieTitle, poster: posterUrl };

    buildReviewModal();
    const modal = document.getElementById("review-modal");
    modal.style.display = "flex";

    const form = document.getElementById("reviewForm");
    form.onsubmit = async (e) => {
      e.preventDefault();
      await submitReview();
    };
  } catch (e) {
    console.error(e);
  }
}

function closeReviewModal() {
  const modal = document.getElementById("review-modal");
  if (modal) modal.style.display = "none";
}

async function submitReview() {
  if (!TOKEN()) {
    alert("Debes iniciar sesión para reseñar.");
    return;
  }
  const { id: movieId } = __currentMovieForReview;
  const titulo = document.getElementById("rv-title").value.trim();
  const comentario = document.getElementById("rv-text").value.trim();
  const rating = Number(document.getElementById("rv-rating").value);

  if (!titulo || !comentario || !rating) {
    alert("Completa título, reseña y calificación.");
    return;
  }

  try {
    const res = await fetch(`${BASE_URL}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${TOKEN()}`
      },
      body: JSON.stringify({ idPelicula: movieId, titulo, comentario, rating })
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      alert(data.msg || "No se pudo crear la reseña.");
      return;
    }

    closeReviewModal();
    alert("✅ Reseña publicada");
    // refrescar listado
    displayMovieReviews(movieId);
  } catch (e) {
    alert("Error de conexión al publicar la reseña.");
    console.error(e);
  }
}

// =============== Reacciones (like/dislike) ===============
async function reactReview(reviewId, tipo, movieId) {
  if (!TOKEN()) {
    alert("Debes iniciar sesión.");
    return;
  }
  try {
    const res = await fetch(`${BASE_URL}/reactions/${reviewId}/react`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${TOKEN()}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ tipo })
    });
    if (!res.ok) {
      const t = await res.json().catch(() => ({}));
      alert(t.msg || "No se pudo registrar la reacción.");
      return;
    }
    // refrescar reseñas de esa película
    if (movieId) displayMovieReviews(movieId);
  } catch (e) {
    alert("Error de red al enviar reacción.");
    console.error(e);
  }
}
  
// Lanzar
document.addEventListener("DOMContentLoaded", initializeApp);

