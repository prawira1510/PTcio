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
                    // Panggil instance Collapse Bootstrap untuk menyembunyikan
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

    // ==========================================================
    // MENYATUKAN FUNGSI TOGGLE PANAH KLIEN & MITRA DI SINI
    // ==========================================================
    setupPartnerToggleButton();
    
    // ==========================================================
    // FUNGSI BARU: TOGGLE PANAH PROYEK DITAMBAHKAN DI SINI
    // ==========================================================
    setupProjectToggleButton();

    // Initialize carousels
    initializeCarousels();

    // Set up image error handling
    setupImageErrorHandling();
}

/**
 * Mengatur perubahan ikon panah pada tombol Klien & Mitra
 */
function setupPartnerToggleButton() {
    const collapseElement = document.getElementById('morePartners');
    const toggleButton = document.getElementById('partnerToggleButton');

    if (collapseElement && toggleButton) {
        // Saat collapse mulai terlihat (show.bs.collapse)
        collapseElement.addEventListener('show.bs.collapse', function () {
            toggleButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
        });

        // Saat collapse mulai tersembunyi (hide.bs.collapse)
        collapseElement.addEventListener('hide.bs.collapse', function () {
            toggleButton.innerHTML = '<i class="fas fa-chevron-down"></i>';
        });
    }
}

/**
 * Mengatur perubahan teks dan ikon panah pada tombol Proyek
 * (Sesuai permintaan: panah berputar & teks berubah)
 */
function setupProjectToggleButton() {
    const moreProjects = document.getElementById('moreProjects');
    const toggleProjectBtn = document.getElementById('toggleProjectBtn');

    if (moreProjects && toggleProjectBtn) {
        const btnText = document.getElementById('btnText');
        const icon = toggleProjectBtn.querySelector('.toggle-icon');

        // Saat collapse ditampilkan
        moreProjects.addEventListener('show.bs.collapse', function () {
            // Perbarui teks tombol
            if (btnText) {
                btnText.textContent = 'Sembunyikan Proyek';
            }
            // Putar ikon
            if (icon) {
                icon.classList.add('rotate');
            }
        });

        // Saat collapse disembunyikan
        moreProjects.addEventListener('hide.bs.collapse', function () {
            // Perbarui teks tombol
            if (btnText) {
                btnText.textContent = 'Lihat Proyek Lainnya';
            }
            // Kembalikan ikon
            if (icon) {
                icon.classList.remove('rotate');
            }
        });
        
        // Tambahkan CSS custom untuk transisi rotasi ikon
        const style = document.createElement('style');
        style.innerHTML = `
            /* Untuk efek putaran panah */
            .toggle-icon {
                transition: transform 0.3s ease;
            }
            .toggle-icon.rotate {
                transform: rotate(180deg);
            }
        `;
        document.head.appendChild(style);
    }
}


function initializeCarousels() {
    // Hero carousel
    const heroCarousel = document.getElementById('heroCarousel');
    if (heroCarousel) {
        // Pastikan objek 'bootstrap' tersedia
        if (typeof bootstrap !== 'undefined' && bootstrap.Carousel) {
            new bootstrap.Carousel(heroCarousel, {
                interval: 5000,
                wrap: true,
                pause: 'hover',
                touch: true,
                keyboard: true
            });
        }
    }
    
    // Documentation carousel
    const dokumentasiCarousel = document.getElementById('dokumentasiCarousel');
    if (dokumentasiCarousel) {
        if (typeof bootstrap !== 'undefined' && bootstrap.Carousel) {
            new bootstrap.Carousel(dokumentasiCarousel, {
                interval: 4000,
                wrap: true,
                pause: 'hover'
            });
        }
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