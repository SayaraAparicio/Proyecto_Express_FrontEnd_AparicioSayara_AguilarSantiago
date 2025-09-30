// Datos mockeados para panel
let mockUsers = [
    {
        id: 1,
        name: 'Karen González',
        email: 'karen@karenflix.com',
        role: 'user',
        status: 'active',
        reviews: 15,
        registrationDate: '2024-01-15',
        avatar: 'K'
    },
    {
        id: 2,
        name: 'Juan Pérez',
        email: 'juan@email.com',
        role: 'user',
        status: 'active',
        reviews: 8,
        registrationDate: '2024-02-20',
        avatar: 'J'
    },
    {
        id: 3,
        name: 'Ana López',
        email: 'ana@email.com',
        role: 'user',
        status: 'inactive',
        reviews: 23,
        registrationDate: '2024-01-10',
        avatar: 'A'
    },
    {
        id: 4,
        name: 'Carlos Admin',
        email: 'admin@karenflix.com',
        role: 'admin',
        status: 'active',
        reviews: 45,
        registrationDate: '2023-12-01',
        avatar: 'C'
    },
    {
        id: 5,
        name: 'María Torres',
        email: 'maria@email.com',
        role: 'user',
        status: 'active',
        reviews: 12,
        registrationDate: '2024-03-05',
        avatar: 'M'
    }
];

let mockMovies = [
    {
    id: 1,
    title: 'Stranger Things 4',
    category: 'Ciencia Ficción',
    year: 2022,
    status: 'approved',
    rating: 4.7,
    reviews: 320,
    poster: 'https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg',
    type: 'series'
},
{
    id: 2,
    title: 'Avengers: Endgame',
    category: 'Acción',
    year: 2019,
    status: 'approved',
    rating: 4.8,
    reviews: 10500,
    poster: 'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
    type: 'movie'
},
{
    id: 3,
    title: 'Minions: Nace un Villano',
    category: 'Animación',
    year: 2022,
    status: 'approved',
    rating: 4.1,
    reviews: 210,
    poster: 'https://image.tmdb.org/t/p/w500/wKiOkZTN9lUUUNZLmtnwubZYONg.jpg',
    type: 'movie'
},
{
    id: 4,
    title: 'Wednesday',
    category: 'Terror',
    year: 2022,
    status: 'approved',
    rating: 4.2,
    reviews: 234,
    poster: 'https://image.tmdb.org/t/p/w500/9PFonBhy4cQy7Jz20NpMygczOkv.jpg',
    type: 'series'
},
{
    id: 5,
    title: 'The Batman',
    category: 'Acción',
    year: 2022,
    status: 'approved',
    rating: 4.4,
    reviews: 289,
    poster: 'https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg',
    type: 'movie'
},
{
    id: 6,
    title: 'Top Gun: Maverick',
    category: 'Acción',
    year: 2022,
    status: 'approved',
    rating: 4.8,
    reviews: 450,
    poster: 'https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg',
    type: 'movie'
},
{
    id: 7,
    title: 'Thor: Love and Thunder',
    category: 'Fantasia',
    year: 2022,
    status: 'pending',
    rating: 3.9,
    reviews: 178,
    poster: 'https://image.tmdb.org/t/p/w500/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg',
    type: 'movie'
},
{
    id: 8,
    title: 'House of the Dragon',
    category: 'Fantasia',
    year: 2022,
    status: 'approved',
    rating: 4.6,
    reviews: 198,
    poster: 'https://image.tmdb.org/t/p/w500/1X4h40fcB4WWUmIBK0auT4zRBAV.jpg',
    type: 'series'
},
{
    id: 9,
    title: 'Black Panther: Wakanda Forever',
    category: 'Acción',
    year: 2022,
    status: 'approved',
    rating: 4.0,
    reviews: 145,
    poster: 'https://image.tmdb.org/t/p/w500/sv1xJUazXeYqALzczSZ3O6nkH75.jpg',
    type: 'movie'
},
{
    id: 10,
    title: 'The Last of Us',
    category: 'Drama',
    year: 2023,
    status: 'approved',
    rating: 4.8,
    reviews: 156,
    poster: 'https://image.tmdb.org/t/p/w500/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg',
    type: 'series'
},
{
    id: 11,
    title: 'Doctor Strange en el Multiverso de la Locura',
    category: 'Fantasia',
    year: 2022,
    status: 'approved',
    rating: 4.1,
    reviews: 210,
    poster: 'https://image.tmdb.org/t/p/w500/wRnbWt44nKjsFPrqSmwYki5vZtF.jpg',
    type: 'movie'
},
{
    id: 12,
    title: 'Andor',
    category: 'Ciencia Ficción',
    year: 2022,
    status: 'approved',
    rating: 4.3,
    reviews: 120,
    poster: 'https://image.tmdb.org/t/p/w500/59SVNwLfoMnZPPB6ukW6dlPxAdI.jpg',
    type: 'series'
},
{
    id: 13,
    title: 'John Wick 4',
    category: 'Acción',
    year: 2023,
    status: 'pending',
    rating: 4.3,
    reviews: 67,
    poster: 'https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg',
    type: 'movie'
},
{
    id: 14,
    title: 'She-Hulk: Defensora de Héroes',
    category: 'Comedia',
    year: 2022,
    status: 'approved',
    rating: 3.7,
    reviews: 95,
    poster: 'https://image.tmdb.org/t/p/w500/zNugnnR5KEmq9EzLcl0Me1UmHYk.jpg',
    type: 'series'
},
{
    id: 15,
    title: 'Avatar: El Camino del Agua',
    category: 'Ciencia Ficción',
    year: 2022,
    status: 'approved',
    rating: 4.5,
    reviews: 89,
    poster: 'https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg',
    type: 'movie'
}

];

let mockReviews = [
    {
        id: 1,
        userId: 1,
        userName: 'Karen González',
        movieId: 1,
        movieTitle: 'Avatar: El Camino del Agua',
        title: 'Increíble experiencia visual',
        content: 'Una película que te transporta a otro mundo. Los efectos visuales son impresionantes...',
        rating: 4.5,
        likes: 23,
        dislikes: 2,
        date: '2024-01-20',
        status: 'approved'
    },
    {
        id: 2,
        userId: 2,
        userName: 'Juan Pérez',
        movieId: 2,
        movieTitle: 'The Last of Us',
        title: 'Mejor que el juego',
        content: 'No esperaba que fuera tan buena. La actuación es perfecta y la historia te atrapa...',
        rating: 5.0,
        likes: 45,
        dislikes: 1,
        date: '2024-02-15',
        status: 'approved'
    },
    {
        id: 3,
        userId: 3,
        userName: 'Ana López',
        movieId: 3,
        movieTitle: 'John Wick 4',
        title: 'Acción pura',
        content: 'Si te gusta la acción, esta película es para ti. Keanu Reeves sigue siendo increíble...',
        rating: 4.3,
        likes: 12,
        dislikes: 0,
        date: '2024-03-10',
        status: 'pending'
    },
    {
        id: 4,
        userId: 5,
        userName: 'María Torres',
        movieId: 4,
        movieTitle: 'Wednesday',
        title: 'Jenna Ortega brillante',
        content: 'La interpretación de Jenna Ortega es perfecta. La serie tiene el tono perfecto...',
        rating: 4.2,
        likes: 67,
        dislikes: 3,
        date: '2024-01-25',
        status: 'approved'
    },
    {
        id: 5,
        userId: 1,
        userName: 'Karen González',
        movieId: 5,
        movieTitle: 'Black Panther: Wakanda Forever',
        title: 'Un homenaje emotivo',
        content: 'Difícil tarea hacer una secuela sin Chadwick Boseman, pero lo lograron...',
        rating: 4.0,
        likes: 34,
        dislikes: 5,
        date: '2024-02-28',
        status: 'approved'
    },{
    id: 6,
    userId: 2,
    userName: 'Luis Ramírez',
    movieId: 2,
    movieTitle: 'The Last of Us',
    title: 'Fiel al videojuego',
    content: 'Una adaptación impresionante, la química entre Pedro Pascal y Bella Ramsey es increíble.',
    rating: 4.9,
    likes: 120,
    dislikes: 3,
    date: '2024-03-01',
    status: 'approved'
},
{
    id: 7,
    userId: 3,
    userName: 'María López',
    movieId: 10,
    movieTitle: 'Top Gun: Maverick',
    title: 'Más que nostalgia',
    content: 'Una secuela que supera a la original, llena de adrenalina y emoción.',
    rating: 4.8,
    likes: 98,
    dislikes: 7,
    date: '2024-03-05',
    status: 'approved'
},
{
    id: 8,
    userId: 4,
    userName: 'Carlos Pérez',
    movieId: 8,
    movieTitle: 'The Batman',
    title: 'Oscura y atrapante',
    content: 'Robert Pattinson sorprende con un Batman distinto, más detectivesco y sombrío.',
    rating: 4.4,
    likes: 76,
    dislikes: 12,
    date: '2024-03-10',
    status: 'approved'
},
{
    id: 9,
    userId: 5,
    userName: 'Ana Torres',
    movieId: 4,
    movieTitle: 'Wednesday',
    title: 'La sorpresa del año',
    content: 'Jenna Ortega se roba la serie. El tono gótico y el misterio están muy bien logrados.',
    rating: 4.3,
    likes: 142,
    dislikes: 10,
    date: '2024-03-15',
    status: 'approved'
},
{
    id: 10,
    userId: 6,
    userName: 'Diego Fernández',
    movieId: 3,
    movieTitle: 'John Wick 4',
    title: 'Acción sin descanso',
    content: 'Keanu Reeves demuestra por qué es el rey del cine de acción. Escenas coreografiadas de manera brutal.',
    rating: 4.5,
    likes: 88,
    dislikes: 6,
    date: '2024-03-20',
    status: 'approved'
}

];

let mockCategories = [
    { id: 1, name: 'Acción', count: 45, status: 'active' },
    { id: 2, name: 'Drama', count: 67, status: 'active' },
    { id: 3, name: 'Comedia', count: 34, status: 'active' },
    { id: 4, name: 'Ciencia Ficción', count: 28, status: 'active' },
    { id: 5, name: 'Terror', count: 19, status: 'active' },
    { id: 6, name: 'Romance', count: 23, status: 'inactive' },
    { id: 7, name: 'Animación', count: 15, status: 'active' },
    { id: 8, name: 'Documental', count: 12, status: 'active' }
];

// para buscar
let currentTab = 'users';
let searchFilters = {
    users: '',
    movies: '',
    reviews: '',
    categories: ''
};

// inicializar panel
function initializeAdminPanel() {
    updateStatistics();
    renderUsersTable();
    renderMoviesTable();
    renderReviewsTable();
    renderCategoriesTable();
    initializeSearch();
    initializeAdminDropdowns();
    initializeAdminHamburger();
}

// para actualizar
function updateStatistics() {
    document.getElementById('total-users').textContent = mockUsers.length;
    document.getElementById('total-movies').textContent = mockMovies.length;
    document.getElementById('total-reviews').textContent = mockReviews.length;
    document.getElementById('pending-approvals').textContent = mockMovies.filter(m => m.status === 'pending').length + mockReviews.filter(r => r.status === 'pending').length;
}

// al cambiar pestaña
function switchTab(tabName) {
    // Ocultar todas las pestañas
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.style.display = 'none';
    });
    
    // Remover clase active de todos los botones
    document.querySelectorAll('.admin-tab').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Mostrar pestaña activa
    const activeTab = document.getElementById(`${tabName}-tab`);
    if (activeTab) {
        activeTab.style.display = 'block';
    }
    
    // const para buscar el botón activo
    const buttons = document.querySelectorAll('.admin-tab');
    buttons.forEach(btn => {
        if (btn.textContent.toLowerCase().includes(tabName) || 
            (tabName === 'users' && btn.textContent.includes('Usuarios')) ||
            (tabName === 'movies' && btn.textContent.includes('Películas')) ||
            (tabName === 'reviews' && btn.textContent.includes('Reseñas')) ||
            (tabName === 'categories' && btn.textContent.includes('Categorías'))) {
            btn.classList.add('active');
        }
    });
    
    currentTab = tabName;
    
    // cerrar automatico los dropdowns
    const genresDropdown = document.querySelector('.dropdown');
    const profileDropdown = document.querySelector('.profile-dropdown');
    if (genresDropdown) genresDropdown.classList.remove('active');
    if (profileDropdown) profileDropdown.classList.remove('active');
}

// tabla de usuarios
function renderUsersTable() {
    const tbody = document.getElementById('users-table-body');
    if (!tbody) return;
    
    const filteredUsers = mockUsers.filter(user => 
        user.name.toLowerCase().includes(searchFilters.users.toLowerCase()) ||
        user.email.toLowerCase().includes(searchFilters.users.toLowerCase())
    );
    
    tbody.innerHTML = filteredUsers.map(user => `
        <tr>
            <td>
                <div style="display: flex; align-items: center; gap: 15px;">
                    <div class="user-avatar">${user.avatar}</div>
                    <span>${user.name}</span>
                </div>
            </td>
            <td>${user.email}</td>
            <td>
                <span class="status-badge ${user.role === 'admin' ? 'status-pending' : 'status-active'}">${user.role}</span>
            </td>
            <td>
                <span class="status-badge ${user.status === 'active' ? 'status-active' : 'status-inactive'}">${user.status}</span>
            </td>
            <td>${user.reviews}</td>
            <td>${formatDate(user.registrationDate)}</td>
            <td>
                <button class="action-btn btn-edit" onclick="editUser(${user.id})">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="action-btn btn-delete" onclick="deleteUser(${user.id})">
                    <i class="bi bi-trash"></i>
                </button>
                ${user.status === 'active' ? 
                    `<button class="action-btn btn-delete" onclick="toggleUserStatus(${user.id}, 'inactive')">
                        <i class="bi bi-pause"></i>
                    </button>` :
                    `<button class="action-btn btn-approve" onclick="toggleUserStatus(${user.id}, 'active')">
                        <i class="bi bi-play"></i>
                    </button>`
                }
            </td>
        </tr>
    `).join('');
}

// Renderizar tabla de películas
function renderMoviesTable() {
    const tbody = document.getElementById('movies-table-body');
    if (!tbody) return;
    
    const filteredMovies = mockMovies.filter(movie => 
        movie.title.toLowerCase().includes(searchFilters.movies.toLowerCase()) ||
        movie.category.toLowerCase().includes(searchFilters.movies.toLowerCase())
    );
    
    tbody.innerHTML = filteredMovies.map(movie => `
        <tr>
            <td>
                <div style="display: flex; align-items: center; gap: 15px;">
                    <img src="${movie.poster}" alt="${movie.title}" class="movie-poster">
                    <div>
                        <strong>${movie.title}</strong>
                        <br>
                        <small>${movie.type === 'movie' ? 'Película' : 'Serie'}</small>
                    </div>
                </div>
            </td>
            <td>${movie.category}</td>
            <td>${movie.year}</td>
            <td>
                <span class="status-badge ${movie.status === 'approved' ? 'status-active' : 'status-pending'}">${movie.status}</span>
            </td>
            <td>
                <span class="rating-stars">★</span> ${movie.rating}
            </td>
            <td>${movie.reviews} reseñas</td>
            <td>
                <button class="action-btn btn-edit" onclick="editMovie(${movie.id})">
                    <i class="bi bi-pencil"></i>
                </button>
                ${movie.status === 'pending' ? 
                    `<button class="action-btn btn-approve" onclick="approveMovie(${movie.id})">
                        <i class="bi bi-check"></i>
                    </button>` : ''
                }
                <button class="action-btn btn-delete" onclick="deleteMovie(${movie.id})">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Renderizar tabla de reseñas
function renderReviewsTable() {
    const tbody = document.getElementById('reviews-table-body');
    if (!tbody) return;
    
    const filteredReviews = mockReviews.filter(review => 
        review.title.toLowerCase().includes(searchFilters.reviews.toLowerCase()) ||
        review.userName.toLowerCase().includes(searchFilters.reviews.toLowerCase()) ||
        review.movieTitle.toLowerCase().includes(searchFilters.reviews.toLowerCase())
    );
    
    tbody.innerHTML = filteredReviews.map(review => `
        <tr>
            <td>
                <div>
                    <strong>${review.title}</strong>
                    <br>
                    <small>por ${review.userName}</small>
                </div>
            </td>
            <td>${review.movieTitle}</td>
            <td>
                <span class="rating-stars">★</span> ${review.rating}
            </td>
            <td>${review.likes} likes, ${review.dislikes} dislikes</td>
            <td>${formatDate(review.date)}</td>
            <td>
                <span class="status-badge ${review.status === 'approved' ? 'status-active' : 'status-pending'}">${review.status}</span>
            </td>
            <td>
                <button class="action-btn btn-edit" onclick="viewReview(${review.id})">
                    <i class="bi bi-eye"></i>
                </button>
                ${review.status === 'pending' ? 
                    `<button class="action-btn btn-approve" onclick="approveReview(${review.id})">
                        <i class="bi bi-check"></i>
                    </button>` : ''
                }
                <button class="action-btn btn-delete" onclick="deleteReview(${review.id})">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Renderizar tabla de categorías
function renderCategoriesTable() {
    const tbody = document.getElementById('categories-table-body');
    if (!tbody) return;
    
    const filteredCategories = mockCategories.filter(category => 
        category.name.toLowerCase().includes(searchFilters.categories.toLowerCase())
    );
    
    tbody.innerHTML = filteredCategories.map(category => `
        <tr>
            <td>${category.name}</td>
            <td>${category.count} títulos</td>
            <td>
                <span class="status-badge ${category.status === 'active' ? 'status-active' : 'status-inactive'}">${category.status}</span>
            </td>
            <td>
                <button class="action-btn btn-edit" onclick="editCategory(${category.id})">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="action-btn btn-delete" onclick="deleteCategory(${category.id})">
                    <i class="bi bi-trash"></i>
                </button>
                ${category.status === 'active' ? 
                    `<button class="action-btn btn-delete" onclick="toggleCategoryStatus(${category.id}, 'inactive')">
                        <i class="bi bi-pause"></i>
                    </button>` :
                    `<button class="action-btn btn-approve" onclick="toggleCategoryStatus(${category.id}, 'active')">
                        <i class="bi bi-play"></i>
                    </button>`
                }
            </td>
        </tr>
    `).join('');
}

// Funciones de acciones de usuario
function editUser(userId) {
    const user = mockUsers.find(u => u.id === userId);
    if (user) {
        const newName = prompt('Nuevo nombre:', user.name);
        const newEmail = prompt('Nuevo email:', user.email);
        
        if (newName && newEmail) {
            user.name = newName;
            user.email = newEmail;
            renderUsersTable();
            showNotification('Usuario actualizado correctamente', 'success');
        }
    }
}

function deleteUser(userId) {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
        mockUsers = mockUsers.filter(u => u.id !== userId);
        renderUsersTable();
        updateStatistics();
        showNotification('Usuario eliminado correctamente', 'success');
    }
}

function toggleUserStatus(userId, newStatus) {
    const user = mockUsers.find(u => u.id === userId);
    if (user) {
        user.status = newStatus;
        renderUsersTable();
        showNotification(`Usuario ${newStatus === 'active' ? 'activado' : 'desactivado'} correctamente`, 'success');
    }
}

// Funciones de acciones de películas
function editMovie(movieId) {
    const movie = mockMovies.find(m => m.id === movieId);
    if (movie) {
        const newTitle = prompt('Nuevo título:', movie.title);
        const newCategory = prompt('Nueva categoría:', movie.category);
        
        if (newTitle && newCategory) {
            movie.title = newTitle;
            movie.category = newCategory;
            renderMoviesTable();
            showNotification('Película actualizada correctamente', 'success');
        }
    }
}

function approveMovie(movieId) {
    const movie = mockMovies.find(m => m.id === movieId);
    if (movie) {
        movie.status = 'approved';
        renderMoviesTable();
        updateStatistics();
        showNotification('Película aprobada correctamente', 'success');
    }
}

function deleteMovie(movieId) {
    if (confirm('¿Estás seguro de eliminar esta película/serie?')) {
        mockMovies = mockMovies.filter(m => m.id !== movieId);
        renderMoviesTable();
        updateStatistics();
        showNotification('Película eliminada correctamente', 'success');
    }
}

// Funciones de acciones de reseñas
function viewReview(reviewId) {
    const review = mockReviews.find(r => r.id === reviewId);
    if (review) {
        alert(`Reseña: ${review.title}\n\nContenido: ${review.content}\n\nRating: ${review.rating}/5\nPor: ${review.userName}`);
    }
}

function approveReview(reviewId) {
    const review = mockReviews.find(r => r.id === reviewId);
    if (review) {
        review.status = 'approved';
        renderReviewsTable();
        updateStatistics();
        showNotification('Reseña aprobada correctamente', 'success');
    }
}

function deleteReview(reviewId) {
    if (confirm('¿Estás seguro de eliminar esta reseña?')) {
        mockReviews = mockReviews.filter(r => r.id !== reviewId);
        renderReviewsTable();
        updateStatistics();
        showNotification('Reseña eliminada correctamente', 'success');
    }
}

// Funciones de acciones de categorías
function editCategory(categoryId) {
    const category = mockCategories.find(c => c.id === categoryId);
    if (category) {
        const newName = prompt('Nuevo nombre de categoría:', category.name);
        if (newName) {
            category.name = newName;
            renderCategoriesTable();
            showNotification('Categoría actualizada correctamente', 'success');
        }
    }
}

function deleteCategory(categoryId) {
    if (confirm('¿Estás seguro de eliminar esta categoría?')) {
        mockCategories = mockCategories.filter(c => c.id !== categoryId);
        renderCategoriesTable();
        showNotification('Categoría eliminada correctamente', 'success');
    }
}

function toggleCategoryStatus(categoryId, newStatus) {
    const category = mockCategories.find(c => c.id === categoryId);
    if (category) {
        category.status = newStatus;
        renderCategoriesTable();
        showNotification(`Categoría ${newStatus === 'active' ? 'activada' : 'desactivada'} correctamente`, 'success');
    }
}

// Funciones de búsqueda
function initializeSearch() {
    const searchInputs = ['users-search', 'movies-search', 'reviews-search', 'categories-search'];
    
    searchInputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            const tabName = inputId.split('-')[0];
            input.addEventListener('input', (e) => {
                searchFilters[tabName] = e.target.value;
                switch(tabName) {
                    case 'users':
                        renderUsersTable();
                        break;
                    case 'movies':
                        renderMoviesTable();
                        break;
                    case 'reviews':
                        renderReviewsTable();
                        break;
                    case 'categories':
                        renderCategoriesTable();
                        break;
                }
            });
        }
    });
}

// Función para mostrar notificaciones
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? 'rgba(16, 185, 129, 0.9)' : type === 'info' ? 'rgba(59, 130, 246, 0.9)' : 'rgba(239, 68, 68, 0.9)'};
        color: white;
        border-radius: 10px;
        z-index: 10000;
        font-weight: 600;
        backdrop-filter: blur(10px);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Función para formatear fechas
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
}

// Función para cerrar sesión
function logout() {
    if (confirm('¿Estás seguro que quieres cerrar sesión?')) {
        sessionStorage.clear();
        window.location.href = '../index.html';
    }
}

// Inicializar dropdowns del admin
function initializeAdminDropdowns() {
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
}

// Inicializar hamburger del admin
function initializeAdminHamburger() {
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

// Event listener principal
document.addEventListener('DOMContentLoaded', initializeAdminPanel);