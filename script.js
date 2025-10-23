// JavaScript for PT Cipta Infra Optima Website

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

function initializeWebsite() {
    // Navbar scroll effect - lebih smooth
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 30) { // Threshold diperkecil dari 50
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('.navbar-nav .nav-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Skip for dropdown items
            if (this.classList.contains('dropdown-toggle')) return;
            
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Calculate offset for fixed navbar - diperkecil
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight - 10; // Kurangi 10px lagi
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu after clicking a link
                const navbarCollapse = document.querySelector('.navbar-collapse');
                
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            }
        });
    });

    // Disable carousel autoplay and make it static
    disableCarouselAutoPlay();

    // Initialize image optimization
    optimizeImages();

    // Active navigation link highlighting
    function highlightActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        
        let currentSection = '';
        const scrollPosition = window.pageYOffset + 80; // Diperkecil dari 100
        
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

    // Set up image error handling
    setupImageErrorHandling();
    
    // Fix initial layout
    fixInitialLayout();
}

function disableCarouselAutoPlay() {
    // Nonaktifkan carousel hero (hanya tampilkan slide pertama)
    const heroCarousel = document.getElementById('heroCarousel');
    if (heroCarousel) {
        // Hentikan carousel
        const carousel = new bootstrap.Carousel(heroCarousel, {
            interval: false,
            wrap: false
        });
        
        // Pastikan hanya slide pertama yang aktif
        carousel.to(0);
    }
}

function optimizeImages() {
    // Optimize image loading and display
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Add loading lazy for better performance
        if (!img.getAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
        
        // Ensure images don't overflow
        img.style.maxWidth = '100%';
        img.style.height = 'auto';
    });
}

function setupImageErrorHandling() {
    // Add error handling for all images
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            console.warn('Gambar gagal dimuat:', this.src);
            this.alt = 'Gambar tidak tersedia';
            
            // Fallback styling
            const parent = this.parentElement;
            if (parent) {
                parent.style.backgroundColor = '#f8f9fa';
                parent.style.display = 'flex';
                parent.style.alignItems = 'center';
                parent.style.justifyContent = 'center';
                parent.style.minHeight = '120px'; // Diperkecil
                parent.style.borderRadius = '8px';
            }
            
            this.style.display = 'none';
            
            // Add error message
            const errorMsg = document.createElement('div');
            errorMsg.textContent = 'Gambar tidak tersedia';
            errorMsg.style.color = '#6c757d';
            errorMsg.style.fontStyle = 'italic';
            errorMsg.style.textAlign = 'center';
            errorMsg.style.fontSize = '0.9rem'; // Diperkecil
            
            if (parent) {
                parent.appendChild(errorMsg);
            }
        });
    });
}

function fixInitialLayout() {
    // Fix initial layout issues
    const navbar = document.querySelector('.navbar');
    const hero = document.querySelector('.hero-carousel');
    
    if (navbar && hero) {
        // Ensure hero starts right below navbar
        hero.style.marginTop = '0';
        hero.style.paddingTop = '0';
    }
    
    // Remove any excessive margins/paddings
    document.querySelectorAll('section').forEach(section => {
        section.style.margin = '0';
        section.style.padding = '0';
    });
}

// Handle window resize
window.addEventListener('resize', function() {
    // Re-calculate image sizes on resize
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.style.maxWidth = '100%';
        img.style.height = 'auto';
    });
});

// Initialize when page is fully loaded
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Final optimization after load
    optimizeImages();
    fixInitialLayout();
});