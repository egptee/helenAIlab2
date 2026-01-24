// ========================================
// Language Toggle
// ========================================

const langToggle = document.getElementById('langToggle');
let currentLang = 'en'; // Default to English

langToggle.addEventListener('click', () => {
    if (currentLang === 'en') {
        document.body.classList.remove('lang-en');
        langToggle.textContent = 'EN';
        currentLang = 'cn';
    } else {
        document.body.classList.add('lang-en');
        langToggle.textContent = '中文';
        currentLang = 'en';
    }
});

// ========================================
// Smooth Scroll with Offset for Fixed Nav
// ========================================

// Add click event listeners to all anchor tags with href starting with #
document.addEventListener('DOMContentLoaded', function() {
    const anchors = document.querySelectorAll('a[href^="#"]');
    
    anchors.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Scroll to the target element with an offset for the fixed navigation
                const offset = 80;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// ========================================
// Scroll Reveal Animation
// ========================================

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

// Observe all cards and glass cards
const animatedElements = document.querySelectorAll('.card, .glass-card');
animatedElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// ========================================
// Parallax Effect on Hero Background
// ========================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-bg');

    if (heroBackground && scrolled < window.innerHeight) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroBackground.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// ========================================
// Dynamic Gradient Movement on Mouse Move
// ========================================

const hero = document.querySelector('.hero');

hero.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    const xPercent = (clientX / innerWidth) * 100;
    const yPercent = (clientY / innerHeight) * 100;

    document.querySelector('.hero-bg').style.backgroundPosition =
        `${xPercent}% ${yPercent}%`;
});

// ========================================
// Add Active State to Nav Links on Scroll
// ========================================

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ========================================
// Add Glow Effect to Cards on Hover
// ========================================

const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// ========================================
// Typing Effect for Hero Title (Optional)
// ========================================

// Uncomment if you want a typing effect
/*
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title .cn-text');
    if (heroTitle) {
        const text = heroTitle.textContent;
        typeWriter(heroTitle, text, 80);
    }
});
*/

// ========================================
// Performance: Reduce Animations on Low-End Devices
// ========================================

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('*').forEach(el => {
        el.style.animation = 'none';
        el.style.transition = 'none';
    });
}

// ========================================
// Add Loading State
// ========================================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add CSS for loaded state
const style = document.createElement('style');
style.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    body.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(style);
