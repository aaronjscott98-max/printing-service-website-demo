document.addEventListener('DOMContentLoaded', () => {
    
    /* --- 1. GLOBAL: STICKY NAVBAR EFFECT --- */
    const mainNav = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            mainNav.classList.add('nav-scrolled');
        } else {
            mainNav.classList.remove('nav-scrolled');
        }
    });

    // --- 1. Navigation & Mobile Menu ---
    const navLinks = document.getElementById('navLinks');
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');

    // Toggle menu function
    window.toggleMenu = (btn) => {
        const isOpen = navLinks.classList.toggle('open');
        btn.classList.toggle('active');
        btn.setAttribute('aria-expanded', isOpen);
    };

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            if (hamburger) hamburger.classList.remove('active');
        });
    });

    /* --- 3. PAGE 1: SCROLL REVEAL ANIMATION --- */
    const revealElements = document.querySelectorAll('.info-card, .stat-item, .hero-tech');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        el.classList.add('reveal-hidden');
        revealObserver.observe(el);
    });

    /* --- 4. PAGE 2: SERVICES FILTER LOGIC --- */
    const filterButtons = document.querySelectorAll('.svc-filter-btn');
    const productCards = document.querySelectorAll('.svc-product-card');

    if (filterButtons.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // UI: Update active button state
                filterButtons.forEach(b => b.classList.remove('is-active'));
                btn.classList.add('is-active');

                // Logic: Filter cards based on data-category
                const filterValue = btn.getAttribute('data-filter');

                productCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filterValue === 'all' || filterValue === category) {
                        card.classList.remove('svc-hidden');
                    } else {
                        card.classList.add('svc-hidden');
                    }
                });
            });
        });
    }

    /* --- 5. PAGE 1: NEWSLETTER FORM INTERACTION --- */
    const newsForm = document.querySelector('.newsletter-form');
    if(newsForm) {
        newsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = newsForm.querySelector('input');
            const btn = newsForm.querySelector('button');
            
            btn.innerText = "Welcome aboard!";
            input.classList.add('form-success-glow');
            input.value = "Check your inbox! 🚀";
            input.disabled = true;
        });
    }
});

const fileInput = document.getElementById('file-upload');
const dropArea = document.querySelector('.file-drop-area');
const fileMsg = document.querySelector('.file-msg');

if (fileInput) {
    fileInput.addEventListener('change', function() {
        if (this.files && this.files[0]) {
            // Update the text to show the filename
            fileMsg.innerHTML = `Selected: <span class="accent-text">${this.files[0].name}</span>`;
            dropArea.classList.add('file-active');
        }
    });
}

// Quote Form Submission handling
const quoteForm = document.getElementById('quote-form');
if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = quoteForm.querySelector('button');
        
        // Visual feedback
        submitBtn.innerText = "Sending...";
        submitBtn.style.opacity = "0.7";
        
        setTimeout(() => {
            quoteForm.innerHTML = `
                <div style="text-align: center; padding: 40px;">
                    <h3 style="color: var(--accent-tech);">Request Received!</h3>
                    <p>Our team is reviewing your files. We will be in touch shortly.</p>
                </div>
            `;
        }, 1500);
    });
}