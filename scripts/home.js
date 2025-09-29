const BASE_URL = "https://proyecto-express-backend-aparicio-s.vercel.app/api/v1";

function renderStars(rating) {
  const maxStars = 5;
  const filled = Math.round(rating);
  let html = "";
  for (let i = 0; i < maxStars; i++) {
    html += `<span class="star ${i < filled ? "active" : ""}">★</span>`;
  }
  return `<div class="stars">${html}</div>`;
}

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

async function loadCategories() {
  const dropdownMenu = document.querySelector(".dropdown-menu");
  if (!dropdownMenu) return;

  const staticGenres = [
    { id: "28", name: "Acción", icon: "bi-lightning" },
    { id: "12", name: "Aventura", icon: "bi-compass" },
    { id: "16", name: "Animación", icon: "bi-palette" },
    { id: "35", name: "Comedia", icon: "bi-emoji-laughing" },
    { id: "80", name: "Crimen", icon: "bi-shield-exclamation" },
    { id: "99", name: "Documental", icon: "bi-camera-video" },
    { id: "18", name: "Drama", icon: "bi-emoji-tear" },
    { id: "10751", name: "Familia", icon: "bi-house-heart" },
    { id: "14", name: "Fantasía", icon: "bi-magic" },
    { id: "36", name: "Historia", icon: "bi-book" },
    { id: "27", name: "Terror", icon: "bi-moon" },
    { id: "10402", name: "Música", icon: "bi-music-note" },
    { id: "9648", name: "Misterio", icon: "bi-question-circle" },
    { id: "10749", name: "Romance", icon: "bi-heart" },
    { id: "878", name: "Ciencia Ficción", icon: "bi-rocket" },
    { id: "53", name: "Suspenso", icon: "bi-exclamation-triangle" }
  ];

  try {
    const categories = await fetchData("/genres");
    
    if (categories && categories.length > 0) {
      dropdownMenu.innerHTML = categories
        .map(
          (cat) =>
            `<a href="#" data-category="${cat._id}">
              <i class="bi bi-collection"></i> ${cat.nombre}
            </a>`
        )
        .join("");
    } else {
      dropdownMenu.innerHTML = staticGenres
        .map(
          (genre) =>
            `<a href="#" data-category="${genre.id}">
              <i class="${genre.icon}"></i> ${genre.name}
            </a>`
        )
        .join("");
    }
  } catch (error) {
    dropdownMenu.innerHTML = staticGenres
      .map(
        (genre) =>
          `<a href="#" data-category="${genre.id}">
            <i class="${genre.icon}"></i> ${genre.name}
          </a>`
      )
      .join("");
  }

  dropdownMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", async (e) => {
      e.preventDefault();
      const categoryId = link.getAttribute("data-category");
      const genreName = link.textContent.trim();
      
      document.getElementById("genre-section").style.display = "block";
      document.getElementById("genre-title").textContent = `Buscando ${genreName}...`;
      document.getElementById("genre-movies").innerHTML = '<p style="color: rgba(255,255,255,0.7); text-align:center; padding:20px;">Cargando...</p>';
      
      try {
        const movies = await fetchData(`/movies?categoria=${categoryId}`);
        renderMoviesGrid(movies, "genre-movies");
        document.getElementById("genre-title").textContent = `Resultados en "${genreName}"`;
      } catch (error) {
        document.getElementById("genre-movies").innerHTML = '<p style="color: rgba(255,255,255,0.7); text-align:center; padding:20px;">No se pudieron cargar las películas de este género</p>';
        document.getElementById("genre-title").textContent = `Error al cargar ${genreName}`;
      }
    });
  });
}

function setupSearch() {
  const searchInput = document.getElementById("search-input");
  const searchToggle = document.getElementById("search-toggle");
  const searchContainer = document.getElementById("search-container");
  
  if (!searchInput || !searchToggle || !searchContainer) return;

  searchToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    searchContainer.classList.toggle("active");
    if (searchContainer.classList.contains("active")) {
      searchInput.focus();
    }
  });

  document.addEventListener("click", (e) => {
    if (!searchContainer.contains(e.target) && !searchToggle.contains(e.target)) {
      searchContainer.classList.remove("active");
    }
  });

  searchInput.addEventListener("keypress", async (e) => {
    if (e.key === "Enter") {
      const query = searchInput.value.trim();
      if (!query) return;

      const movies = await fetchData(`/movies?titulo=${encodeURIComponent(query)}`);
      renderMoviesGrid(movies, "genre-movies");
      document.getElementById("genre-section").style.display = "block";
      document.getElementById("genre-title").textContent =
        `Resultados para "${query}"`;
      
      searchContainer.classList.remove("active");
    }
  });
}

function setupMobileMenu() {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  
  if (!hamburger || !navMenu) return;

  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  document.addEventListener("click", (e) => {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    }
  });

  navMenu.querySelectorAll("a:not(.dropdown-toggle)").forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });
}

function setupDropdowns() {
  const dropdowns = document.querySelectorAll(".dropdown");
  
  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector(".dropdown-toggle");
    const menu = dropdown.querySelector(".dropdown-menu");
    
    if (!toggle || !menu) return;

    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      dropdowns.forEach(otherDropdown => {
        if (otherDropdown !== dropdown) {
          otherDropdown.classList.remove("active");
        }
      });
      
      dropdown.classList.toggle("active");
    });

    if (window.innerWidth > 768) {
      dropdown.addEventListener("mouseenter", () => {
        dropdown.classList.add("active");
      });

      dropdown.addEventListener("mouseleave", () => {
        dropdown.classList.remove("active");
      });
    }
  });

  document.addEventListener("click", (e) => {
    dropdowns.forEach(dropdown => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove("active");
      }
    });
  });
}

function setupProfileDropdown() {
  const profileToggle = document.getElementById("profile-toggle");
  const profileDropdown = document.querySelector(".profile-dropdown");
  
  if (!profileToggle || !profileDropdown) {
    return;
  }

  const newToggle = profileToggle.cloneNode(true);
  profileToggle.parentNode.replaceChild(newToggle, profileToggle);
  
  newToggle.addEventListener("click", function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    document.querySelectorAll('.dropdown').forEach(dropdown => {
      dropdown.classList.remove('active');
    });
    
    profileDropdown.classList.toggle("active");
  });

  const profileMenu = profileDropdown.querySelector(".profile-menu");
  if (profileMenu) {
    profileMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", function(e) {
        profileDropdown.classList.remove("active");
      });
    });
  }
}

async function initializeApp() {
  try {
    const [peliculas, series, populares, ultimos] = await Promise.all([
      fetchData("/movies"),
      fetchData("/movies?tipo=serie"),
      fetchData("/popular"),
      fetchData("/movies?sort=creadaEn"),
    ]);

    renderMoviesGrid(peliculas.slice(0, 12), "movies-section");
    renderMoviesGrid(series.slice(0, 12), "series-section");
    renderMoviesGrid(populares.slice(0, 12), "popular-section");
    renderMoviesGrid(ultimos.slice(0, 12), "upcoming-section");

    await loadCategories();
    setupSearch();
    setupMobileMenu();
    setupDropdowns();
    setupProfileDropdown();
  } catch (err) {
    console.error("Error inicializando app:", err);
  }
}

async function displayReviews(idPelicula) {
  const reviews = await fetchData(`/reviews/${idPelicula}`);
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

async function submitReview(idPelicula, titulo, comentario, rating) {
  const token = localStorage.getItem("token");
  if (!token) return alert("Debes iniciar sesión");

  const res = await fetch(`${BASE_URL}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ idPelicula: idPelicula, titulo, comentario, rating })
  });

  if (!res.ok) {
    alert("Error al enviar reseña");
    return;
  }
  alert("✅ Reseña publicada");
  displayReviews(idPelicula);
}

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

function openMovie(idPelicula, movieTitle) {
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

  displayReviews(idPelicula);

  document.getElementById("reviewForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const titulo = document.getElementById("reviewTitle").value.trim();
    const comentario = document.getElementById("reviewComment").value.trim();
    const rating = Number(document.getElementById("reviewRating").value);
    submitReview(idPelicula, titulo, comentario, rating);
  });
}

const TOKEN = () => localStorage.getItem("token");

function isValidObjectId(id) {
  return typeof id === "string" && /^[a-f\d]{24}$/i.test(id);
}

async function ensureidPelicula(idPelicula) {
  if (isValidObjectId(idPelicula)) return idPelicula;
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
        <h4 style="margin:0;font-weight:600">${title} – ★ ${rating}</h4>
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

async function displayMovieReviews(idPelicula) {
  try {
    const realId = await ensureidPelicula(String(idPelicula));
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

async function openReviewModal(idPelicula, movieTitle = "Película", posterUrl = "") {
  try {
    const realId = await ensureidPelicula(String(idPelicula));
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
  const { id: idPelicula } = __currentMovieForReview;
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
      body: JSON.stringify({ idPelicula: idPelicula, titulo, comentario, rating })
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      alert(data.msg || "No se pudo crear la reseña.");
      return;
    }

    closeReviewModal();
    alert("✅ Reseña publicada");
    displayMovieReviews(idPelicula);
  } catch (e) {
    alert("Error de conexión al publicar la reseña.");
    console.error(e);
  }
}

async function reactReview(reviewId, tipo, idPelicula) {
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
    if (idPelicula) displayMovieReviews(idPelicula);
  } catch (e) {
    alert("Error de red al enviar reacción.");
    console.error(e);
  }
}

function searchGenre(genreName) {
  const genreSection = document.getElementById("genre-section");
  const genreTitle = document.getElementById("genre-title");
  const genreMovies = document.getElementById("genre-movies");
  
  if (genreSection && genreTitle && genreMovies) {
    genreSection.style.display = "block";
    genreTitle.textContent = `Género: ${genreName}`;
    genreMovies.innerHTML = `
      <p style="color: rgba(255,255,255,0.7); text-align:center; padding:20px;">
        Mostrando películas de ${genreName}...<br>
        (Conecta tu API para ver contenido real)
      </p>
    `;
  }
  
  document.querySelectorAll('.dropdown, .profile-dropdown').forEach(d => {
    d.classList.remove('active');
  });
  
  if (genreSection) {
    genreSection.scrollIntoView({ behavior: 'smooth' });
  }
}

document.addEventListener('DOMContentLoaded', function() {
  setTimeout(() => {
    setupProfileDropdown();
  }, 100);
  
  const genresToggle = document.querySelector('.dropdown-toggle');
  const genresDropdown = document.querySelector('.dropdown');
  const genresMenu = document.querySelector('.dropdown-menu');
  
  if (genresToggle && genresDropdown && genresMenu) {
    const newGenresToggle = genresToggle.cloneNode(true);
    genresToggle.parentNode.replaceChild(newGenresToggle, genresToggle);
    
    newGenresToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const profileDropdown = document.querySelector('.profile-dropdown');
      if (profileDropdown) {
        profileDropdown.classList.remove('active');
      }
      
      genresDropdown.classList.toggle('active');
    });
    
    genresMenu.innerHTML = `
      <a href="#" onclick="searchGenre('Acción')"><i class="bi bi-lightning"></i> Acción</a>
      <a href="#" onclick="searchGenre('Aventura')"><i class="bi bi-compass"></i> Aventura</a>
      <a href="#" onclick="searchGenre('Animación')"><i class="bi bi-palette"></i> Animación</a>
      <a href="#" onclick="searchGenre('Comedia')"><i class="bi bi-emoji-laughing"></i> Comedia</a>
      <a href="#" onclick="searchGenre('Crimen')"><i class="bi bi-shield-exclamation"></i> Crimen</a>
      <a href="#" onclick="searchGenre('Drama')"><i class="bi bi-emoji-tear"></i> Drama</a>
      <a href="#" onclick="searchGenre('Familia')"><i class="bi bi-house-heart"></i> Familia</a>
      <a href="#" onclick="searchGenre('Fantasía')"><i class="bi bi-magic"></i> Fantasía</a>
      <a href="#" onclick="searchGenre('Terror')"><i class="bi bi-moon"></i> Terror</a>
      <a href="#" onclick="searchGenre('Romance')"><i class="bi bi-heart"></i> Romance</a>
    `;
  }
  
  document.addEventListener('click', function(e) {
    const profileDropdown = document.querySelector('.profile-dropdown');
    const genresDropdown = document.querySelector('.dropdown');
    
    if (profileDropdown && !profileDropdown.contains(e.target)) {
      profileDropdown.classList.remove('active');
    }
    
    if (genresDropdown && !genresDropdown.contains(e.target)) {
      genresDropdown.classList.remove('active');
    }
  });
  
  setTimeout(() => {
    initializeApp();
  }, 200);
});

document.addEventListener("DOMContentLoaded", initializeApp);