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

// reseñas 

// Sistema de reseñas - Agregar estas funciones al final de home.js

// Datos mockeados para reseñas
let mockReviews = [
    {
        id: 1,
        movieId: 550,
        movieTitle: "Fight Club",
        userId: 1,
        userName: "Karen González",
        userAvatar: "K",
        title: "Una obra maestra del cine",
        content: "Esta película te hace cuestionar todo sobre la sociedad moderna. La actuación de Brad Pitt y Edward Norton es increíble, y el giro final te deja sin palabras.",
        rating: 5,
        likes: 23,
        dislikes: 2,
        userLiked: false,
        userDisliked: false,
        date: "2024-01-15",
        helpful: 21
    },
    {
        id: 2,
        movieId: 550,
        movieTitle: "Fight Club",
        userId: 2,
        userName: "Carlos Ramírez",
        userAvatar: "C",
        title: "Entretenida pero sobrevalorada",
        content: "Es una buena película pero creo que está un poco sobrevalorada. La cinematografía es excelente pero la historia se siente un poco forzada en algunos momentos.",
        rating: 3,
        likes: 8,
        dislikes: 12,
        userLiked: false,
        userDisliked: false,
        date: "2024-01-20",
        helpful: -4
    },
    {
        id: 3,
        movieId: 550,
        movieTitle: "Fight Club",
        userId: 3,
        userName: "Ana Martín",
        userAvatar: "A",
        title: "Imprescindible",
        content: "Una de esas películas que tienes que ver al menos una vez en la vida. David Fincher demuestra por qué es uno de los mejores directores contemporáneos.",
        rating: 4,
        likes: 15,
        dislikes: 1,
        userLiked: true,
        userDisliked: false,
        date: "2024-02-01",
        helpful: 14
    }
];

// Variables para el sistema de reseñas
let currentMovieForReview = null;
let userRating = 0;

// Función para abrir el modal de reseña
function openReviewModal(movieId, movieTitle, posterUrl) {
    currentMovieForReview = { id: movieId, title: movieTitle, poster: posterUrl };
    
    // Crear o mostrar el modal
    createReviewModal(movieTitle, posterUrl);
    
    // Resetear valores
    userRating = 0;
    updateStarRating(0);
    document.getElementById('review-title').value = '';
    document.getElementById('review-content').value = '';
    
    document.getElementById('review-modal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Función para crear el modal de reseña
function createReviewModal(movieTitle, posterUrl) {
    // Verificar si ya existe el modal
    let modal = document.getElementById('review-modal');
    if (modal) {
        modal.querySelector('.movie-title-modal').textContent = movieTitle;
        modal.querySelector('.movie-poster-modal').src = posterUrl || 'https://via.placeholder.com/100x150?text=Sin+Imagen';
        return;
    }

    // Crear el modal
    const modalHTML = `
        <div class="modal-overlay" id="review-modal">
            <div class="modal-content review-modal">
                <div class="modal-header">
                    <h2>Escribir Reseña</h2>
                    <button class="close-modal" onclick="closeReviewModal()">
                        <i class="bi bi-x-lg"></i>
                    </button>
                </div>
                
                <div class="modal-body">
                    <div class="movie-info-modal">
                        <img class="movie-poster-modal" src="${posterUrl || 'https://via.placeholder.com/100x150?text=Sin+Imagen'}" alt="${movieTitle}">
                        <div class="movie-details-modal">
                            <h3 class="movie-title-modal">${movieTitle}</h3>
                            <p>Comparte tu opinión sobre esta película</p>
                        </div>
                    </div>

                    <div class="rating-section">
                        <h4>Tu Calificación</h4>
                        <div class="star-rating" id="star-rating">
                            ${[1,2,3,4,5].map(num => `
                                <span class="star-input" data-rating="${num}" onclick="setRating(${num})">★</span>
                            `).join('')}
                        </div>
                        <p class="rating-text" id="rating-text">Haz clic en las estrellas para calificar</p>
                    </div>

                    <div class="review-form">
                        <div class="form-group">
                            <label for="review-title">Título de tu reseña</label>
                            <input type="text" id="review-title" placeholder="Ej: Una obra maestra del cine" maxlength="100">
                        </div>
                        
                        <div class="form-group">
                            <label for="review-content">Tu reseña</label>
                            <textarea id="review-content" placeholder="Comparte tu opinión sobre la película..." maxlength="500" rows="4"></textarea>
                            <span class="char-counter">0/500 caracteres</span>
                        </div>
                    </div>
                </div>

                <div class="modal-footer">
                    <button class="btn-cancel" onclick="closeReviewModal()">Cancelar</button>
                    <button class="btn-submit" onclick="submitReview()">Publicar Reseña</button>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Agregar event listener para el contador de caracteres
    const textarea = document.getElementById('review-content');
    const counter = document.querySelector('.char-counter');
    
    textarea.addEventListener('input', function() {
        const count = this.value.length;
        counter.textContent = `${count}/500 caracteres`;
        counter.style.color = count > 450 ? '#ff6b6b' : 'rgba(255,255,255,0.6)';
    });
}

// Función para establecer la calificación
function setRating(rating) {
    userRating = rating;
    updateStarRating(rating);
    
    const ratingTexts = [
        'Haz clic en las estrellas para calificar',
        'Terrible',
        'Mala',
        'Regular', 
        'Buena',
        'Excelente'
    ];
    
    document.getElementById('rating-text').textContent = ratingTexts[rating];
}

// Función para actualizar la visualización de estrellas
function updateStarRating(rating) {
    const stars = document.querySelectorAll('.star-input');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

// Función para cerrar el modal
function closeReviewModal() {
    const modal = document.getElementById('review-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Función para enviar la reseña
function submitReview() {
    if (!currentMovieForReview) return;
    
    const title = document.getElementById('review-title').value.trim();
    const content = document.getElementById('review-content').value.trim();
    
    // Validaciones
    if (userRating === 0) {
        alert('Por favor, califica la película antes de continuar');
        return;
    }
    
    if (!title) {
        alert('Por favor, escribe un título para tu reseña');
        return;
    }
    
    if (content.length < 20) {
        alert('Tu reseña debe tener al menos 20 caracteres');
        return;
    }
    
    // Crear nueva reseña
    const newReview = {
        id: Date.now(),
        movieId: currentMovieForReview.id,
        movieTitle: currentMovieForReview.title,
        userId: 1, // Usuario actual (mockeado)
        userName: "Usuario Actual",
        userAvatar: "U",
        title: title,
        content: content,
        rating: userRating,
        likes: 0,
        dislikes: 0,
        userLiked: false,
        userDisliked: false,
        date: new Date().toISOString().split('T')[0],
        helpful: 0
    };
    
    // Agregar a las reseñas mockeadas
    mockReviews.unshift(newReview);
    
    // Mostrar notificación de éxito
    showNotification('¡Reseña publicada exitosamente!', 'success');
    
    // Cerrar modal
    closeReviewModal();
    
    // Actualizar la vista de reseñas si está visible
    if (document.getElementById('reviews-section')) {
        displayMovieReviews(currentMovieForReview.id);
    }
}

// Función para mostrar reseñas de una película
function displayMovieReviews(movieId) {
    const movieReviews = mockReviews.filter(review => review.movieId == movieId);
    
    // Crear o actualizar la sección de reseñas
    let reviewsSection = document.getElementById('reviews-section');
    if (!reviewsSection) {
        reviewsSection = document.createElement('section');
        reviewsSection.id = 'reviews-section';
        reviewsSection.className = 'section';
        document.querySelector('.main-content').appendChild(reviewsSection);
    }
    
    const avgRating = movieReviews.length > 0 
        ? (movieReviews.reduce((sum, review) => sum + review.rating, 0) / movieReviews.length).toFixed(1)
        : 0;
    
    reviewsSection.innerHTML = `
        <div class="reviews-header">
            <h2 class="section-title">RESEÑAS DE USUARIOS</h2>
            <div class="reviews-stats">
                <div class="avg-rating">
                    <span class="rating-number">${avgRating}</span>
                    <div class="rating-stars">
                        ${[1,2,3,4,5].map(num => 
                            `<span class="star ${num <= Math.round(avgRating) ? 'active' : ''}">★</span>`
                        ).join('')}
                    </div>
                    <span class="reviews-count">(${movieReviews.length} reseñas)</span>
                </div>
            </div>
        </div>
        
        <div class="reviews-container">
            ${movieReviews.length === 0 
                ? '<p class="no-reviews">Sé el primero en dejar una reseña</p>'
                : movieReviews.map(review => createReviewCard(review)).join('')
            }
        </div>
    `;
    
    reviewsSection.scrollIntoView({ behavior: 'smooth' });
}

// Función para crear una tarjeta de reseña
function createReviewCard(review) {
    const reviewDate = new Date(review.date).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    return `
        <div class="review-card">
            <div class="review-header">
                <div class="reviewer-info">
                    <div class="reviewer-avatar">${review.userAvatar}</div>
                    <div class="reviewer-details">
                        <h4 class="reviewer-name">${review.userName}</h4>
                        <div class="review-rating">
                            ${[1,2,3,4,5].map(num => 
                                `<span class="star ${num <= review.rating ? 'active' : ''}">★</span>`
                            ).join('')}
                            <span class="rating-number">${review.rating}/5</span>
                        </div>
                        <span class="review-date">${reviewDate}</span>
                    </div>
                </div>
            </div>
            
            <div class="review-content">
                <h3 class="review-title">${review.title}</h3>
                <p class="review-text">${review.content}</p>
            </div>
            
            <div class="review-actions">
                <button class="action-btn ${review.userLiked ? 'liked' : ''}" onclick="toggleReviewLike(${review.id}, 'like')">
                    <i class="bi bi-hand-thumbs-up"></i>
                    <span>${review.likes}</span>
                </button>
                <button class="action-btn ${review.userDisliked ? 'disliked' : ''}" onclick="toggleReviewLike(${review.id}, 'dislike')">
                    <i class="bi bi-hand-thumbs-down"></i>
                    <span>${review.dislikes}</span>
                </button>
                <span class="helpful-text">
                    ${review.helpful > 0 ? `${review.helpful} personas encontraron esto útil` : ''}
                </span>
            </div>
        </div>
    `;
}

// Función para dar like/dislike a una reseña
function toggleReviewLike(reviewId, action) {
    const review = mockReviews.find(r => r.id === reviewId);
    if (!review) return;
    
    if (action === 'like') {
        if (review.userLiked) {
            // Quitar like
            review.likes--;
            review.userLiked = false;
        } else {
            // Dar like
            review.likes++;
            review.userLiked = true;
            
            // Si tenía dislike, quitarlo
            if (review.userDisliked) {
                review.dislikes--;
                review.userDisliked = false;
            }
        }
    } else if (action === 'dislike') {
        if (review.userDisliked) {
            // Quitar dislike
            review.dislikes--;
            review.userDisliked = false;
        } else {
            // Dar dislike
            review.dislikes++;
            review.userDisliked = true;
            
            // Si tenía like, quitarlo
            if (review.userLiked) {
                review.likes--;
                review.userLiked = false;
            }
        }
    }
    
    // Recalcular helpful
    review.helpful = review.likes - review.dislikes;
    
    // Actualizar la vista
    displayMovieReviews(review.movieId);
    
    // Mostrar feedback
    const message = action === 'like' 
        ? (review.userLiked ? 'Te gusta esta reseña' : 'Like removido')
        : (review.userDisliked ? 'No te gusta esta reseña' : 'Dislike removido');
    
    showNotification(message, 'info');
}

// Función para mostrar notificaciones
function showNotification(message, type = 'info') {
    // Eliminar notificaciones anteriores
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? 'rgba(16, 185, 129, 0.9)' : type === 'info' ? 'rgba(59, 130, 246, 0.9)' : 'rgba(239, 68, 68, 0.9)'};
        color: white;
        border-radius: 10px;
        z-index: 10000;
        font-weight: 600;
        backdrop-filter: blur(10px);
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animación de entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Modificar la función selectContent para incluir el botón de reseña
function selectContent(movieId, isMovie) {
    // Aquí iría la lógica para mostrar detalles del contenido
    // Por ahora, simulamos datos básicos
    const movieTitle = "Película Seleccionada";
    const posterUrl = "https://via.placeholder.com/100x150?text=Poster";
    
    // Mostrar opciones
    const options = confirm(`¿Qué quieres hacer con "${movieTitle}"?\n\nOK = Ver Reseñas\nCancelar = Escribir Reseña`);
    
    if (options) {
        displayMovieReviews(movieId);
    } else {
        openReviewModal(movieId, movieTitle, posterUrl);
    }
}

// Cerrar modal al hacer clic fuera
document.addEventListener('click', function(e) {
    const modal = document.getElementById('review-modal');
    if (modal && e.target === modal) {
        closeReviewModal();
    }
});

// Cerrar modal con tecla Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeReviewModal();
    }
});