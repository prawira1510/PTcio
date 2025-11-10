// JavaScript untuk PT Cipta Infra Optima Website

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

function initializeWebsite() {
    // 1. Efek Navbar scroll
    setupNavbarScrollEffect();

    // 2. Smooth scrolling untuk navigation links
    setupSmoothScrolling();
    
    // 3. Active navigation link highlighting
    setupActiveNavHighlighting();

    // 4. Mengatur fungsi toggle panah Klien & Mitra
    setupPartnerToggleButton();
    
    // 5. Mengatur tombol Proyek secara generik (Panah putar)
    setupGenericProjectToggle();

    // 6. Initialize carousels
    initializeCarousels();

    // 7. Set up image error handling
    setupImageErrorHandling();
    
    // 8. SETUP FUNGSI MODAL DETAIL PROYEK BARU
    setupProjectModalTrigger(); 
}

/**
 * Mengatur efek scroll pada navbar.
 */
function setupNavbarScrollEffect() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/**
 * Mengatur smooth scrolling untuk tautan navigasi.
 */
function setupSmoothScrolling() {
    document.querySelectorAll('.navbar-nav .nav-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            
            // Skip jika targetnya adalah dropdown atau link kosong
            if (this.classList.contains('dropdown-toggle') || !targetId || targetId === '#') return;
            
            // Cek apakah ini tautan internal yang menunjuk ke section
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetElement.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Tutup menu mobile setelah mengklik tautan
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                        // Memanggil fungsi Bootstrap Collapse secara efisien
                        if (typeof bootstrap !== 'undefined' && bootstrap.Collapse) {
                            const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });
                            bsCollapse.hide();
                        }
                    }
                }
            }
        });
    });
}

/**
 * Menyoroti tautan navigasi aktif berdasarkan posisi scroll.
 */
function setupActiveNavHighlighting() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    function highlightActiveNav() {
        let currentSection = '';
        // Offset sedikit lebih besar (misalnya 120px) untuk memastikan bagian tersebut terlihat di bawah navbar
        const scrollPosition = window.pageYOffset + 120; 
        
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
}

/**
 * Mengatur perubahan ikon panah pada tombol Klien & Mitra.
 */
function setupPartnerToggleButton() {
    const collapseElement = document.getElementById('morePartners');
    const toggleButton = document.getElementById('partnerToggleButton');

    if (collapseElement && toggleButton) {
        
        // Saat collapse mulai terlihat (show.bs.collapse)
        collapseElement.addEventListener('show.bs.collapse', function () {
            const icon = toggleButton.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            }
        });

        // Saat collapse mulai tersembunyi (hide.bs.collapse)
        collapseElement.addEventListener('hide.bs.collapse', function () {
            const icon = toggleButton.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            }
        });
    }
}

/**
 * MENGATUR TOMBOL PROYEK SECARA GENERIK
 * Mengelola semua tombol dengan class .toggle-project-btn dan memutar ikonnya
 * secara INDEPENDEN menggunakan CSS Transform.
 */
function setupGenericProjectToggle() {
    const toggleButtons = document.querySelectorAll('.toggle-project-btn');

    toggleButtons.forEach(button => {
        const targetSelector = button.getAttribute('href') || button.getAttribute('data-bs-target');
        const targetElement = document.querySelector(targetSelector);
        
        if (targetElement) {
            const icon = button.querySelector('.toggle-icon');

            // Saat collapse ditampilkan (konten terbuka)
            targetElement.addEventListener('show.bs.collapse', function () {
                if (icon) {
                    // Panah ke ATAS
                    icon.style.transform = 'rotate(180deg)';
                }
                
                // Opsional: ganti teks tombol dari "Lihat Proyek Lainnya" menjadi "Sembunyikan Proyek"
                const btnText = button.querySelector('#btnText');
                if (btnText) {
                    btnText.textContent = 'Sembunyikan Proyek';
                }
            });

            // Saat collapse disembunyikan (konten tertutup)
            targetElement.addEventListener('hide.bs.collapse', function () {
                if (icon) {
                    // Panah ke BAWAH (kembali ke normal)
                    icon.style.transform = 'rotate(0deg)'; 
                }
                 // Opsional: ganti teks tombol kembali
                const btnText = button.querySelector('#btnText');
                if (btnText) {
                    btnText.textContent = 'Lihat Proyek Lainnya';
                }
            });

            // Tambahkan CSS transisi langsung via JavaScript untuk memastikan terload
            if (icon) {
                 icon.style.transition = 'transform 0.3s ease';
            }
        }
    });
}


/**
 * Menginisialisasi semua carousel Bootstrap.
 */
function initializeCarousels() {
    // Pastikan objek 'bootstrap' tersedia
    if (typeof bootstrap === 'undefined' || !bootstrap.Carousel) return;
    
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

/**
 * Menangani gambar yang gagal dimuat (error).
 */
function setupImageErrorHandling() {
    // Add error handling for all images
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            console.warn('Gambar gagal dimuat:', this.src);
            this.alt = 'Gambar tidak tersedia';
            // Tambahkan fallback styling
            this.style.backgroundColor = '#f8f9fa';
            this.style.padding = '20px';
            this.style.display = 'block'; 
            this.style.color = '#6c757d';
            this.style.fontStyle = 'italic';
            this.style.textAlign = 'center';
            this.style.lineHeight = '1.5';
            this.style.height = 'auto'; 
        });
    });
}

/**
 * MENGATUR MODAL DETAIL PROYEK
 * Mengatur semua kartu proyek dengan kelas '.modal-trigger' agar dapat 
 * diklik dan menampilkan detail proyek di modal tunggal.
 */
function setupProjectModalTrigger() {
    // 1. Ambil elemen-elemen modal
    const detailModal = document.getElementById('projectDetailModal');
    if (!detailModal) return;

    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalLocation = document.getElementById('modalLocation');

    // 2. Tambahkan event listener untuk semua kartu proyek yang memiliki kelas 'modal-trigger'
    document.querySelectorAll('.project-card-custom.modal-trigger').forEach(card => {
        
        // Atur kursor menjadi pointer untuk indikasi klik
        card.style.cursor = 'pointer';

        card.addEventListener('click', function() {
            // Ambil data dari data attributes kartu yang diklik
            const imgSrc = this.getAttribute('data-img-src');
            const projectTitle = this.getAttribute('data-project-title');
            const projectLocation = this.getAttribute('data-project-location');
            
            // Perbarui konten modal
            modalImage.src = imgSrc;
            modalImage.alt = projectTitle; // Alt text yang bagus
            modalTitle.textContent = projectTitle;
            modalLocation.textContent = projectLocation;
            
            // Tambahkan transisi visual saat gambar dimuat di modal (opsional)
            modalImage.style.opacity = 0;
            setTimeout(() => {
                modalImage.style.opacity = 1;
                modalImage.style.transition = 'opacity 0.2s ease-in-out';
            }, 50);
        });
    });
}


// Tambahkan kelas 'loaded' ke body saat halaman selesai dimuat sepenuhnya (untuk preloader/animasi inisial)
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

  document.querySelectorAll('.project-img').forEach(img => {
    img.addEventListener('click', function () {
      const modalImg = document.getElementById('modalImage');
      modalImg.src = this.src;
      const myModal = new bootstrap.Modal(document.getElementById('imageModal'));
      myModal.show();
    });
  });
