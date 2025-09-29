// admin

document.addEventListener('DOMContentLoaded', function() {
    checkAdminAccess();
});

function checkAdminAccess() {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    if (!token || !userStr) {
        redirectToLogin('Debes iniciar sesión para acceder al panel de administración');
        return false;
    }
    
    try {
        const user = JSON.parse(userStr);
        
        // Verificar si es admin
        if (user.role !== 'admin') {
            redirectToLogin('❌ No tienes permisos de administrador');
            return false;
        }
        
        // Si llegamos aquí, es admin válido
        console.log('✅ Admin autenticado:', user.name);
        
        // Actualizar nombre del admin en la interfaz
        updateAdminInterface(user);
        
        return true;
        
    } catch (error) {
        console.error('Error al verificar autenticación:', error);
        redirectToLogin('Error en la autenticación');
        return false;
    }
}

function updateAdminInterface(user) {
    // Actualizar título del hero con el nombre del admin
    const heroTitle = document.getElementById('hero-title');
    if (heroTitle) {
        heroTitle.textContent = `Bienvenido ${user.name}`;
    }
    
    // Actualizar meta información
    const heroDirector = document.getElementById('hero-director');
    if (heroDirector) {
        heroDirector.textContent = `Admin: ${user.name}`;
    }
}

function redirectToLogin(message = '') {
    if (message) {
        alert(`🚫 ${message}\n\nSerás redirigido al login.`);
    }
    
    // Limpiar localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    
    // Redirigir al login
    setTimeout(() => {
        window.location.href = '../html/login.html';
    }, 2000);
}

function logout() {
    const confirmLogout = confirm('¿Estás seguro de que quieres cerrar sesión?');
    
    if (confirmLogout) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated');
        
        alert('✅ Sesión cerrada exitosamente');
        window.location.href = '../html/login.html';
    }
}


window.logout = logout;