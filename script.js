// JavaScript for PT Cipta Infra Optima Website

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

function initializeWebsite() {
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links - DIPERBAIKI
    document.querySelectorAll('.navbar-nav .nav-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Skip for dropdown items
            if (this.classList.contains('dropdown-toggle')) return;
            
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Calculate offset for fixed navbar
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu after clicking a link
                const navbarToggler = document.querySelector('.navbar-toggler');
                const navbarCollapse = document.querySelector('.navbar-collapse');
                
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            }
        });
    });

    // Active navigation link highlighting - DIPERBAIKI
    function highlightActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        
        let currentSection = '';
        const scrollPosition = window.pageYOffset + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && href === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    // Initial highlight and on scroll
    highlightActiveNav();
    window.addEventListener('scroll', highlightActiveNav);

    // Initialize carousels
    initializeCarousels();

    // Set up image error handling
    setupImageErrorHandling();
}

function initializeCarousels() {
    // Hero carousel
    const heroCarousel = document.getElementById('heroCarousel');
    if (heroCarousel) {
        new bootstrap.Carousel(heroCarousel, {
            interval: 5000,
            wrap: true,
            pause: 'hover',
            touch: true,
            keyboard: true
        });
    }
    
    // Documentation carousel
    const dokumentasiCarousel = document.getElementById('dokumentasiCarousel');
    if (dokumentasiCarousel) {
        new bootstrap.Carousel(dokumentasiCarousel, {
            interval: 4000,
            wrap: true,
            pause: 'hover'
        });
    }
}

function setupImageErrorHandling() {
    // Add error handling for all images
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            console.warn('Gambar gagal dimuat:', this.src);
            this.alt = 'Gambar tidak tersedia';
            // Tambahkan fallback styling
            this.style.backgroundColor = '#f8f9fa';
            this.style.padding = '20px';
            this.style.display = 'flex';
            this.style.alignItems = 'center';
            this.style.justifyContent = 'center';
            this.style.color = '#6c757d';
            this.style.fontStyle = 'italic';
        });
    });
}

// Initialize when page is fully loaded
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});