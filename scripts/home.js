const BASE_URL = "https://proyecto-express-backend-aparicio-s.vercel.app/api/v1";

// Renderizar tarjetas de películas/series
function createMovieCard(movie) {
  const posterUrl = movie.imagen
    ? movie.imagen
    : "https://placehold.co/200x300?text=Sin+Imagen";

  let rating = "N/A";
  if (movie.promedioRating !== undefined && movie.promedioRating !== null) {
    rating = Number(movie.promedioRating).toFixed(1);
  } else if (movie.popularidad !== undefined && movie.popularidad !== null) {
    rating = movie.popularidad;
  }

  const year = movie.anno || "N/A";
  const title = movie.titulo || "Sin título";

  return `
    <article class="movie-card">
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

// Inicializar home
async function initializeApp() {
  try {
    const [peliculas, series, populares, ultimos] = await Promise.all([
      fetchData("/movies"), 
      fetchData("/movies?tipo=serie"),
      fetchData("/popular"),
      fetchData("/movies?sort=creadaEn"), // 👈 nuevo query param
    ]);

    renderMoviesGrid(peliculas.slice(0, 12), "movies-section");
    renderMoviesGrid(series.slice(0, 12), "series-section");
    renderMoviesGrid(populares.slice(0, 12), "popular-section");
    renderMoviesGrid(ultimos.slice(0, 12), "upcoming-section");
  } catch (err) {
    console.error("Error inicializando app:", err);
  }
}


// Lanzar
document.addEventListener("DOMContentLoaded", initializeApp);
