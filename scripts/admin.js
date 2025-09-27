// API 
const API_KEY = ''; // API key 
const BASE_URL = ''; // URL base de la API
const IMAGE_BASE_URL = ''; // URL base para imágenes pequeñas
const IMAGE_BASE_URL_ORIGINAL = ''; // URL base para imágenes originales

// API Endpoints 
const ENDPOINTS = {
    popular: ``, // Endpoint para películas populares
    topRated: ``, // Endpoint para películas mejor valoradas
    popularTv: ``, // Endpoint para series populares
    upcoming: ``, // Endpoint para próximos estrenos
    topRatedTv: ``, // Endpoint para series mejor valoradas
    search: `` // Endpoint para búsqueda
};

// State
let currentFeaturedIndex = 0;
let featuredSeries = [];

// Fetch helpers
async function fetchContent(endpoint) {
    try {
        const response = await fetch(`${endpoint}?api_key=${API_KEY}&language=es-ES&page=1`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching content:', error);
        return [];
    }
}

async function searchMovies(query) {
    try {
        const response = await fetch(`${ENDPOINTS.search}?api_key=${API_KEY}&language=es-ES&query=${encodeURIComponent(query)}&page=1`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error searching movies:', error);
        return [];
    }
}

// UI builders
function createMovieCard(item, isMovie = true) {
    const title = item.title || item.name;
    const releaseDate = item.release_date || item.first_air_date;
    const releaseYear = releaseDate ? new Date(releaseDate).getFullYear() : 'N/A';
    const rating = item.vote_average ? item.vote_average.toFixed(1) : 'N/A';
    const posterUrl = item.poster_path ? `${IMAGE_BASE_URL}${item.poster_path}` : 'https://via.placeholder.com/200x300?text=Sin+Imagen';

    return `
        <article class="movie-card" onclick="selectContent(${item.id}, ${isMovie})">
            <div class="movie-poster" style="background-image: url('${posterUrl}')">
                <div class="movie-rating">★ ${rating}</div>
            </div>
            <div class="movie-info">
                <h3 class="movie-title">${title}</h3>
                <p class="movie-year">${releaseYear}</p>
            </div>
        </article>
    `;
}

function createFeaturedCard(series, index) {
    const title = series.name || series.title;
    const releaseYear = series.first_air_date ? new Date(series.first_air_date).getFullYear() : 'N/A';
    const rating = series.vote_average ? series.vote_average.toFixed(1) : 'N/A';
    const posterUrl = series.poster_path ? `${IMAGE_BASE_URL}${series.poster_path}` : 'https://via.placeholder.com/80x80?text=Sin+Imagen';

    return `
        <article class="movie-card" onclick="selectFeatured(${index})">
            <div class="movie-poster" style="background-image: url('${posterUrl}')"></div>
            <div class="movie-info">
                <h3 class="movie-title">#${index + 1} ${title}</h3>
                <p class="movie-year">★ ${rating} • ${releaseYear}</p>
            </div>
        </article>
    `;
}

function renderMoviesGrid(movies, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    if (movies.length === 0) {
        container.innerHTML = '<p style="color: rgba(255,255,255,0.7); text-align: center; padding: 40px;">No se pudo cargar el contenido</p>';
        return;
    }

    const moviesHtml = movies.map(movie => createMovieCard(movie, true)).join('');
    container.innerHTML = moviesHtml;
}

function renderFeaturedTrack(series) {
    const track = document.getElementById('featured-track');
    if (!track || series.length === 0) return;

    const html = series.slice(0, 10).map((item, index) => createFeaturedCard(item, index)).join('');
    track.innerHTML = html;
}

function updateHeroSection(item) {
    if (!item) return;

    const title = item.title || item.name;
    const releaseDate = item.release_date || item.first_air_date;
    const releaseYear = releaseDate ? new Date(releaseDate).getFullYear() : 'N/A';
    const backdropUrl = item.backdrop_path ? `${IMAGE_BASE_URL_ORIGINAL}${item.backdrop_path}` : '';
    const rating = item.vote_average ? Math.round(item.vote_average / 2) : 5;

    document.getElementById('hero-title').textContent = title;
    document.getElementById('hero-year').textContent = releaseYear;
    document.getElementById('hero-description').textContent = item.overview || 'Descripción no disponible.';
    
    if (backdropUrl) {
        document.getElementById('hero-bg').style.backgroundImage = `url('${backdropUrl}')`;
    }

    const stars = document.querySelectorAll('#hero-rating .star');
    stars.forEach((star, index) => {
        star.style.color = index < rating ? '#ffd700' : '#555';
    });
}

function updateFeaturedSection(series, index) {
    if (!series || series.length === 0) return;
    
    const item = series[index];
    const title = item.name || item.title;
    const releaseYear = item.first_air_date ? new Date(item.first_air_date).getFullYear() : 'N/A';
    const backdropUrl = item.backdrop_path ? `${IMAGE_BASE_URL_ORIGINAL}${item.backdrop_path}` : '';

    document.getElementById('f-year').textContent = releaseYear;
    document.getElementById('f-title').textContent = title;
    document.getElementById('f-meta').textContent = 'Top 10 Series';
    document.getElementById('f-desc').textContent = item.overview || 'Descripción no disponible.';

    const bgImg = index % 2 === 0 ? 'featured-bg-a' : 'featured-bg-b';
    const otherBg = index % 2 === 0 ? 'featured-bg-b' : 'featured-bg-a';
    
    if (backdropUrl) {
        document.getElementById(bgImg).style.backgroundImage = `url('${backdropUrl}')`;
        document.getElementById(bgImg).style.opacity = '1';
        document.getElementById(otherBg).style.opacity = '0';
    }
}

function selectFeatured(index) {
    currentFeaturedIndex = index;
    updateFeaturedSection(featuredSeries, index);
}

// Initialize
async function initializeApp() {
    try {
        const [
            movies,
            series,
            upcoming,
            topRatedMovies,
            topSeries
        ] = await Promise.all([
            fetchContent(ENDPOINTS.popular),
            fetchContent(ENDPOINTS.popularTv),
            fetchContent(ENDPOINTS.upcoming),
            fetchContent(ENDPOINTS.topRated),
            fetchContent(ENDPOINTS.topRatedTv)
        ]);

        // Render películas
        renderMoviesGrid(movies.slice(0, 12), 'movies-section');

        // Render series
        renderMoviesGrid(series.slice(0, 12), 'series-section');

        // Render populares (mezcla de ambas)
        renderMoviesGrid([...movies.slice(0, 6), ...series.slice(0, 6)], 'popular-section');

        // Render últimos lanzamientos
        renderMoviesGrid(upcoming.slice(0, 12), 'upcoming-section');

        // Hero aleatoria
        if (topRatedMovies.length > 0) {
            const randomIndex = Math.floor(Math.random() * topRatedMovies.length);
            updateHeroSection(topRatedMovies[randomIndex]);
        }

        // Top 10 series
        featuredSeries = topSeries.slice(0, 10);
        renderFeaturedTrack(featuredSeries);
        if (featuredSeries.length > 0) {
            updateFeaturedSection(featuredSeries, 0);
        }

    } catch (error) {
        console.error('Error initializing app:', error);
    }
}

// Rotación automática de Top 10
function startFeaturedRotation() {
    setInterval(() => {
        if (featuredSeries.length > 0) {
            currentFeaturedIndex = (currentFeaturedIndex + 1) % featuredSeries.length;
            updateFeaturedSection(featuredSeries, currentFeaturedIndex);
        }
    }, 8000);
}

// Dropdowns
function initializeDropdowns() {
    const genresToggle = document.querySelector('.dropdown-toggle');
    const genresDropdown = document.querySelector('.dropdown');
    const genresMenu = document.querySelector('.dropdown-menu');

    if (genresToggle && genresDropdown && genresMenu) {
        genresToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const profileDropdown = document.querySelector('.profile-dropdown');
            if (profileDropdown && profileDropdown.classList.contains('active')) {
                profileDropdown.classList.remove('active');
            }

            genresDropdown.classList.toggle('active');
        });

        genresDropdown.addEventListener('mouseenter', () => {
            if (window.innerWidth > 768) {
                genresDropdown.classList.add('active');
            }
        });

        genresDropdown.addEventListener('mouseleave', () => {
            if (window.innerWidth > 768) {
                setTimeout(() => {
                    genresDropdown.classList.remove('active');
                }, 150);
            }
        });

        genresMenu.addEventListener('mouseenter', () => {
            if (window.innerWidth > 768) {
                genresDropdown.classList.add('active');
            }
        });
    }

    const profileToggle = document.getElementById('profile-toggle');
    const profileDropdown = document.querySelector('.profile-dropdown');

    if (profileToggle && profileDropdown) {
        profileToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            if (genresDropdown && genresDropdown.classList.contains('active')) {
                genresDropdown.classList.remove('active');
            }

            profileDropdown.classList.toggle('active');
        });
    }

    document.addEventListener('click', (e) => {
        if (genresDropdown && !genresDropdown.contains(e.target)) {
            genresDropdown.classList.remove('active');
        }
        if (profileDropdown && !profileDropdown.contains(e.target)) {
            profileDropdown.classList.remove('active');
        }
    });

    document.addEventListener('click', (e) => {
        if (e.target.hasAttribute('data-genre')) {
            e.preventDefault();
            e.stopPropagation();
            
            const genreId = e.target.getAttribute('data-genre');
            const genreText = e.target.textContent || e.target.innerText;
            const genreName = genreText.replace(/^[^\w\s]+\s*/, '').trim();
            
            selectGenre(genreId, genreName);
            
            if (genresDropdown) {
                genresDropdown.classList.remove('active');
            }
        }
    });
}

// Hamburger
function initializeHamburger() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        navMenu.addEventListener('click', (e) => {
            if (e.target.tagName === 'A' && !e.target.classList.contains('dropdown-toggle')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    startFeaturedRotation();
    initializeDropdowns();
    initializeHamburger();

    // 🔍 Search
    const searchToggle = document.getElementById('search-toggle');
    const searchContainer = document.getElementById('search-container');
    const searchInput = document.getElementById('search-input');

    if (searchToggle && searchContainer && searchInput) {
        searchToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            searchContainer.classList.toggle('active');
            if (searchContainer.classList.contains('active')) {
                searchInput.focus();
            }
        });

        document.addEventListener('click', (e) => {
            if (!searchContainer.contains(e.target) && e.target !== searchToggle) {
                searchContainer.classList.remove('active');
            }
        });

        searchInput.addEventListener('keypress', async (e) => {
            if (e.key === 'Enter') {
                const query = searchInput.value.trim();
                if (query) {
                    document.querySelectorAll('.row-section, .section').forEach(sec => sec.style.display = 'none');
                    document.getElementById('featured-section').style.display = 'none';

                    const genreSection = document.getElementById('genre-section');
                    genreSection.style.display = 'block';
                    document.getElementById('genre-title').textContent = `RESULTADOS PARA "${query}"`;

                    const container = document.getElementById('genre-movies');
                    container.innerHTML = `
                        <div class="loading">
                            <div class="spinner"></div>
                            Buscando "${query}"...
                        </div>
                    `;

                    const results = await searchMovies(query);
                    renderMoviesGrid(results.slice(0, 20), 'genre-movies');

                    if (results.length > 0) {
                        updateHeroSection(results[0]);
                    }
                }
            }
        });
    }
});