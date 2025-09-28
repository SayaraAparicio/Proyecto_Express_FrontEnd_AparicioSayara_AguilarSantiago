// funcion para detectar si es celular
function isMobile() {
    return window.innerWidth <= 768;
}


function showSection(sectionName, clickedElement) {
    
    if (isMobile()) return;
    
    console.log('Showing section:', sectionName);
    
    
    const tendenciasEl = document.getElementById('tendencias');
    const planesEl = document.getElementById('planes');
    
    if (tendenciasEl) {
        tendenciasEl.classList.add('hidden');
        tendenciasEl.style.display = 'none';
    }
    if (planesEl) {
        planesEl.classList.add('hidden');
        planesEl.style.display = 'none';
    }
    
    
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.remove('hidden');
        targetSection.style.display = 'block';
        console.log('Section shown:', sectionName);
    } else {
        console.log('Section not found:', sectionName); 
    }
    
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
  
    if (clickedElement) {
        clickedElement.classList.add('active');
    }
    
    
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}


function handleScroll() {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(0, 0, 0, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.5)';
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.8)';
            header.style.boxShadow = 'none';
        }
    }
}


function animateOnScroll() {
    const cards = document.querySelectorAll('.trending-item, .plan-card');
    const triggerBottom = window.innerHeight / 5 * 4;

    cards.forEach(card => {
        if (card) {
            const cardTop = card.getBoundingClientRect().top;
            
            if (cardTop < triggerBottom) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        }
    });
}


function initAnimations() {
    const cards = document.querySelectorAll('.trending-item, .plan-card');
    cards.forEach(card => {
        if (card) {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px)';
            card.style.transition = 'all 0.6s ease';
        }
    });
}


function handleResize() {
    const mobileHero = document.querySelector('.mobile-hero');
    const mainContent = document.querySelector('.main-content');
    const nav = document.querySelector('.nav');
    
    if (isMobile()) {
        
        if (mobileHero) mobileHero.style.display = 'flex';
        if (mainContent) mainContent.style.display = 'none';
        if (nav) nav.style.display = 'none';
    } else {
        
        if (mobileHero) mobileHero.style.display = 'none';
        if (mainContent) mainContent.style.display = 'block';
        if (nav) nav.style.display = 'flex';
        
        
        setupNavListeners();
    }
}


function setupNavListeners() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
       
        const newLink = link.cloneNode(true);
        link.parentNode.replaceChild(newLink, link);
        
        newLink.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Nav link clicked:', this.getAttribute('data-section')); // Debug
            const sectionName = this.getAttribute('data-section');
            if (sectionName) {
                showSection(sectionName, this);
                trackUserInteraction(sectionName);
            }
        });
    });
}


function initializePage() {
    console.log('Initializing page...'); // Debug
    
    if (!isMobile()) {
        const tendenciasSection = document.getElementById('tendencias');
        if (tendenciasSection) {
            tendenciasSection.classList.remove('hidden');
            tendenciasSection.style.display = 'block';
            console.log('Default section shown: tendencias'); // Debug
        }
        
        // Marcar el primer nav link como activo
        const firstNavLink = document.querySelector('.nav-link[data-section="tendencias"]');
        if (firstNavLink) {
            firstNavLink.classList.add('active');
        }
        
        // Configurar event listeners
        setupNavListeners();
    }
    
    // Inicializar animaciones
    setTimeout(() => {
        initAnimations();
        animateOnScroll();
    }, 100);
}

// Event listeners principales
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded'); // Debug
    initializePage();
    
    // Manejar resize de ventana
    window.addEventListener('resize', handleResize);
});

// Event listeners para scroll
window.addEventListener('scroll', function() {
    handleScroll();
    animateOnScroll();
});

function trackUserInteraction(section) {
    if (section) {
        console.log(`User interacted with: ${section}`);
       
    }
}

document.addEventListener('DOMContentLoaded', function() {
   
    setTimeout(() => {
        const planButtons = document.querySelectorAll('.plan-card .btn');
        planButtons.forEach(button => {
            if (button) {
                button.addEventListener('click', function() {
                    const planCard = this.closest('.plan-card');
                    const planNameEl = planCard ? planCard.querySelector('.plan-name') : null;
                    const planName = planNameEl ? planNameEl.textContent : 'unknown';
                    trackUserInteraction(`plan-${planName.toLowerCase()}`);
                });
            }
        });
    }, 100);
});


function preloadImages() {
    const images = [
        './storage/fondo.gif',
        './storage/logo.png',
        './storage/icon.png'
    ];
    
    images.forEach(src => {
        if (src) {
            const img = new Image();
            img.src = src;
        }
    });
}


window.addEventListener('load', preloadImages);

function handleImageError(img) {
    if (img) {
        img.style.display = 'none';
        console.log('Error loading image:', img.src);
    }
}


document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img) {
            img.addEventListener('error', function() {
                handleImageError(this);
            });
        }
    });
});