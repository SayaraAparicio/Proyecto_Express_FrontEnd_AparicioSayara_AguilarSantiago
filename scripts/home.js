// API
        const API_KEY = '8265bd1679663a7ea12ac168da84d2e8';
        const BASE_URL = 'https://api.themoviedb.org/3';
        const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
        const IMAGE_BASE_URL_ORIGINAL = 'https://image.tmdb.org/t/p/original';

        // API Endpoints
        const ENDPOINTS = {
            popular: `${BASE_URL}/movie/popular`,
            topRated: `${BASE_URL}/movie/top_rated`,
            upcoming: `${BASE_URL}/movie/upcoming`,
            nowPlaying: `${BASE_URL}/movie/now_playing`,
            popularTv: `${BASE_URL}/tv/popular`,
            topRatedTv: `${BASE_URL}/tv/top_rated`,
            byGenre: `${BASE_URL}/discover/movie`
        };

        // State
        let currentFeaturedIndex = 0;
        let featuredSeries = [];

        // Fetch content from TMDB API
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

        // Fetch movies by genre
        async function fetchMoviesByGenre(genreId) {
            try {
                const response = await fetch(`${ENDPOINTS.byGenre}?api_key=${API_KEY}&language=es-ES&with_genres=${genreId}&page=1&sort_by=popularity.desc`);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                return data.results;
            } catch (error) {
                console.error('Error fetching movies by genre:', error);
                return [];
            }
        }

        // Get genre names from IDs
        function getGenreNames(genreIds) {
            const GENRES = {
                28: 'Acción', 12: 'Aventura', 16: 'Animación', 35: 'Comedia',
                80: 'Crimen', 99: 'Documental', 18: 'Drama', 10751: 'Familia',
                14: 'Fantasía', 36: 'Historia', 27: 'Terror', 10402: 'Música',
                9648: 'Misterio', 10749: 'Romance', 878: 'Ciencia Ficción',
                53: 'Suspenso', 10752: 'Guerra', 37: 'Western'
            };
            
            if (!genreIds || genreIds.length === 0) return 'General';
            return genreIds.slice(0, 2).map(id => GENRES[id] || 'General').join(' • ');
        }

        // Create movie card HTML
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

        // Create featured card for top series section
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

        // Render content to track (for carousels)
        function renderTrack(content, trackId, isMovie = true) {
            const track = document.getElementById(trackId);
            if (!track) return;
            
            if (content.length === 0) {
                track.innerHTML = '<p style="color: rgba(255,255,255,0.7); text-align: center; padding: 40px;">No se pudo cargar el contenido</p>';
                return;
            }

            const html = content.map(item => createMovieCard(item, isMovie)).join('');
            track.innerHTML = html;
        }

        // Render movies grid (for grid sections)
        function renderMoviesGrid(movies, containerId) {
            const container = document.getElementById(containerId);
            if (!container) return;
            
            if (movies.length === 0) {
                container.innerHTML = '<p style="color: rgba(255,255,255,0.7); text-align: center; padding: 40px;">No se pudieron cargar las películas</p>';
                return;
            }

            const moviesHtml = movies.map(movie => createMovieCard(movie, true)).join('');
            container.innerHTML = moviesHtml;
        }

        // Render featured track
        function renderFeaturedTrack(series) {
            const track = document.getElementById('featured-track');
            if (!track || series.length === 0) return;

            const html = series.slice(0, 10).map((item, index) => createFeaturedCard(item, index)).join('');
            track.innerHTML = html;
        }

        // Update hero section
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

            // Update star rating
            const stars = document.querySelectorAll('#hero-rating .star');
            stars.forEach((star, index) => {
                star.style.color = index < rating ? '#ffd700' : '#555';
            });
        }

        // Update featured section
        function updateFeaturedSection(series, index) {
            if (!series || series.length === 0) return;
            
            const item = series[index];
            const title = item.name || item.title;
            const releaseYear = item.first_air_date ? new Date(item.first_air_date).getFullYear() : 'N/A';
            const backdropUrl = item.backdrop_path ? `${IMAGE_BASE_URL_ORIGINAL}${item.backdrop_path}` : '';

            document.getElementById('f-year').textContent = releaseYear;
            document.getElementById('f-title').textContent = title;
            document.getElementById('f-meta').textContent = getGenreNames(item.genre_ids);
            document.getElementById('f-desc').textContent = item.overview || 'Descripción no disponible.';

            // Update background
            const bgImg = index % 2 === 0 ? 'featured-bg-a' : 'featured-bg-b';
            const otherBg = index % 2 === 0 ? 'featured-bg-b' : 'featured-bg-a';
            
            if (backdropUrl) {
                document.getElementById(bgImg).style.backgroundImage = `url('${backdropUrl}')`;
                document.getElementById(bgImg).style.opacity = '1';
                document.getElementById(otherBg).style.opacity = '0';
            }
        }

        // Scroll row horizontally
        function scrollRow(trackId, direction) {
            const track = document.getElementById(`${trackId}-track`);
            if (!track) return;
            
            const scrollAmount = 220; // Card width + gap
            track.scrollBy({
                left: direction * scrollAmount,
                behavior: 'smooth'
            });
        }

        // Select content (movies/series)
        function selectContent(id, isMovie) {
            console.log(`Selected ${isMovie ? 'movie' : 'series'} ID:`, id);
            alert(`${isMovie ? 'Película' : 'Serie'} seleccionada (ID: ${id}). Funcionalidad pendiente de implementar.`);
        }

        // Select featured series
        function selectFeatured(index) {
            currentFeaturedIndex = index;
            updateFeaturedSection(featuredSeries, index);
        }

        // Handle genre selection
        async function selectGenre(genreId, genreName) {
            // Hide all other sections
            document.querySelectorAll('.row-section').forEach(section => {
                section.style.display = 'none';
            });
            document.querySelectorAll('.section:not(#genre-section)').forEach(section => {
                section.style.display = 'none';
            });
            document.getElementById('featured-section').style.display = 'none';

            // Show genre section
            const genreSection = document.getElementById('genre-section');
            genreSection.style.display = 'block';
            document.getElementById('genre-title').textContent = `PELÍCULAS DE ${genreName.toUpperCase()}`;

            // Show loading
            document.getElementById('genre-movies').innerHTML = `
                <div class="loading">
                    <div class="spinner"></div>
                    Cargando películas de ${genreName}...
                </div>
            `;

            // Fetch and render
            const movies = await fetchMoviesByGenre(genreId);
            renderMoviesGrid(movies.slice(0, 20), 'genre-movies');

            // Update hero
            if (movies.length > 0) {
                updateHeroSection(movies[0]);
            }
        }

        // Show all sections (home view)
        function showAllSections() {
            document.querySelectorAll('.row-section').forEach(section => {
                section.style.display = 'block';
            });
            document.querySelectorAll('.section:not(#genre-section)').forEach(section => {
                section.style.display = 'block';
            });
            document.getElementById('featured-section').style.display = 'block';
            document.getElementById('genre-section').style.display = 'none';
        }

        // Initialize the application
        async function initializeApp() {
            try {
                // Fetch all content
                const [
                    upcomingMovies,
                    popularMovies,
                    topRatedMovies,
                    topSeries,
                    popularSeriesData
                ] = await Promise.all([
                    fetchContent(ENDPOINTS.upcoming),
                    fetchContent(ENDPOINTS.popular),
                    fetchContent(ENDPOINTS.topRated),
                    fetchContent(ENDPOINTS.topRatedTv),
                    fetchContent(ENDPOINTS.popularTv)
                ]);

                // Render carousel tracks
                renderTrack(upcomingMovies.slice(0, 15), 'latest-track', true);
                renderTrack([...popularMovies.slice(0, 10), ...popularSeriesData.slice(0, 10)], 'popular-content-track', true);

                // Render grid sections
                renderMoviesGrid(popularMovies.slice(0, 12), 'popular-movies');
                renderMoviesGrid(topRatedMovies.slice(0, 12), 'top-rated-movies');
                renderMoviesGrid(upcomingMovies.slice(0, 12), 'upcoming-movies');

                // Setup featured section
                featuredSeries = topSeries.slice(0, 10);
                renderFeaturedTrack(featuredSeries);
                if (featuredSeries.length > 0) {
                    updateFeaturedSection(featuredSeries, 0);
                }

                // Update hero with popular movie
                if (popularMovies.length > 0) {
                    updateHeroSection(popularMovies[0]);
                }

            } catch (error) {
                console.error('Error initializing app:', error);
            }
        }

        // Auto-rotate featured series
        function startFeaturedRotation() {
            setInterval(() => {
                if (featuredSeries.length > 0) {
                    currentFeaturedIndex = (currentFeaturedIndex + 1) % featuredSeries.length;
                    updateFeaturedSection(featuredSeries, currentFeaturedIndex);
                }
            }, 8000); // Change every 8 seconds
        }

        // Event listeners
        document.addEventListener('DOMContentLoaded', () => {
            initializeApp();
            startFeaturedRotation();

            // Manual dropdown toggle for better compatibility
            const dropdownToggle = document.querySelector('.dropdown-toggle');
            const dropdownMenu = document.querySelector('.dropdown-menu');
            const dropdown = document.querySelector('.dropdown');

            if (dropdownToggle && dropdownMenu) {
                // Show dropdown on hover
                dropdown.addEventListener('mouseenter', () => {
                    dropdownMenu.classList.add('show');
                });

                // Hide dropdown when mouse leaves
                dropdown.addEventListener('mouseleave', () => {
                    dropdownMenu.classList.remove('show');
                });

                // Click to toggle (for touch devices)
                dropdownToggle.addEventListener('click', (e) => {
                    e.preventDefault();
                    dropdownMenu.classList.toggle('show');
                });
            }

            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!dropdown.contains(e.target)) {
                    dropdownMenu.classList.remove('show');
                }
            });

            // Genre dropdown links - Improved event handling
            document.addEventListener('click', (e) => {
                // Check if clicked element has data-genre attribute
                if (e.target.hasAttribute('data-genre')) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const genreId = e.target.getAttribute('data-genre');
                    const genreName = e.target.textContent.trim();
                    
                    console.log('Genre selected:', genreName, 'ID:', genreId); // Debug log
                    
                    selectGenre(genreId, genreName);
                    
                    // Close dropdown after selection
                    if (dropdownMenu) {
                        dropdownMenu.classList.remove('show');
                    }
                }
            });

            // Main navigation
            document.querySelectorAll('.nav a:not(.dropdown-toggle):not([data-genre])').forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const href = link.getAttribute('href');
                    
                    if (href === '#inicio') {
                        showAllSections();
                        initializeApp();
                    } else {
                        // Smooth scroll to section if exists
                        const targetId = href.substring(1);
                        const targetElement = document.querySelector(`[id*="${targetId}"]`);
                        if (targetElement) {
                            targetElement.scrollIntoView({ behavior: 'smooth' });
                        }
                    }
                });
            });
        });
