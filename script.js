// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 70;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link based on scroll position
// Header shadow on scroll
// Parallax effect for hero section
const header = document.querySelector('.header');
const hero = document.querySelector('.hero');
let ticking = false;

function updateOnScroll() {
    // Active navigation
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });

    // Header shadow
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    }

    // Parallax effect
    if (hero) {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }

    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateOnScroll();
        });
        ticking = true;
    }
});

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('.newsletter-input');
        const email = emailInput.value;
        
        if (email) {
            // Show success message
            alert(`Thank you for subscribing with ${email}! Stay tuned for the latest fashion trends.`);
            emailInput.value = '';
        }
    });
}

// Collection cards hover effect - add interactive elements
const collectionCards = document.querySelectorAll('.collection-card');
collectionCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all collection cards
const cards = document.querySelectorAll('.collection-card');
cards.forEach(card => observer.observe(card));

// Page load animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add click tracking for collection links (for analytics)
const collectionLinks = document.querySelectorAll('.collection-link');
collectionLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const collectionTitle = link.closest('.collection-card').querySelector('.collection-title').textContent;
        console.log(`Collection clicked: ${collectionTitle}`);
        // Here you would typically send analytics data
        alert(`Viewing ${collectionTitle} - This would navigate to the collection page.`);
    });
});

// Dynamic year update in footer
const currentYear = new Date().getFullYear();
const footerText = document.querySelector('.footer-bottom p');
if (footerText && !footerText.textContent.includes(currentYear)) {
    footerText.textContent = `© ${currentYear} TrendLine Fashion. All rights reserved.`;
}

// Keyboard accessibility improvements
document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape key
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Console welcome message
console.log('%c Welcome to TrendLine Fashion! ', 'background: #667eea; color: white; font-size: 20px; padding: 10px;');
console.log('%c Discover the latest trends 2024-2026 ', 'background: #764ba2; color: white; font-size: 14px; padding: 5px;');
