// Smooth scrolling and animations
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initScrollAnimations();
    initParallaxEffects();
    initNavbarScrollEffect();
    initThemeSwitching();
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Intersection Observer for scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animationType = element.getAttribute('data-animation');
                
                switch(animationType) {
                    case 'fade-up':
                        element.classList.add('animate-in');
                        break;
                    case 'slide-left':
                        element.classList.add('slide-in-left');
                        break;
                    case 'slide-right':
                        element.classList.add('slide-in-right');
                        break;
                    default:
                        element.classList.add('animate-in');
                }
                
                // Add staggered animation for feature cards
                if (element.classList.contains('feature-card')) {
                    const cards = document.querySelectorAll('.feature-card');
                    const index = Array.from(cards).indexOf(element);
                    element.style.transitionDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);

    // Observe elements with animation attributes
    document.querySelectorAll('[data-animation]').forEach(el => {
        observer.observe(el);
    });

    // Observe feature cards
    document.querySelectorAll('.feature-card').forEach(el => {
        observer.observe(el);
    });

    // Observe theme cards
    document.querySelectorAll('.theme-card').forEach(el => {
        observer.observe(el);
    });

    // Observe UX elements
    document.querySelectorAll('.ux-feature-card, .ux-stats, .central-phone').forEach(el => {
        observer.observe(el);
    });
}

// Parallax effects
function initParallaxEffects() {
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Hero background parallax
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            heroBackground.style.transform = `translate3d(0, ${rate}px, 0)`;
        }
        
        // Phone mockup parallax
        const heroPhone = document.querySelector('.hero-phone');
        if (heroPhone) {
            const phoneRate = scrolled * -0.3;
            heroPhone.style.transform = `translate3d(0, ${phoneRate}px, 0)`;
        }
        
        // Screenshot phones parallax
        const screenshotPhones = document.querySelectorAll('.screenshot-phone');
        screenshotPhones.forEach((phone, index) => {
            const phoneRate = scrolled * -0.2 * (index % 2 === 0 ? 1 : -1);
            phone.style.transform = `translate3d(0, ${phoneRate}px, 0)`;
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// Navbar scroll effect
function initNavbarScrollEffect() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(255, 248, 225, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(255, 193, 7, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 248, 225, 0.95)';
            navbar.style.boxShadow = 'none';
        }
        
        // Hide/show navbar based on scroll direction
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Phone mockup interactive effects
document.addEventListener('DOMContentLoaded', function() {
    const phoneMockups = document.querySelectorAll('.phone-mockup, .phone-mockup-large');
    
    phoneMockups.forEach(phone => {
        phone.addEventListener('mouseenter', function() {
            this.style.transform = this.style.transform.replace(/scale\([^)]*\)/, '') + ' scale(1.05)';
        });
        
        phone.addEventListener('mouseleave', function() {
            this.style.transform = this.style.transform.replace(/scale\([^)]*\)/, '');
        });
    });
});

// Add smooth reveal animation for sections
function revealSection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
        }
    });
}

const sectionObserver = new IntersectionObserver(revealSection, {
    threshold: 0.15
});

document.querySelectorAll('section').forEach(section => {
    sectionObserver.observe(section);
});

// Add CSS for revealed sections
const style = document.createElement('style');
style.textContent = `
    section {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease;
    }
    
    section.revealed {
        opacity: 1;
        transform: translateY(0);
    }
    
    .hero {
        opacity: 1;
        transform: none;
    }
`;
document.head.appendChild(style);

// Enhanced scroll animations with stagger effect
function initEnhancedAnimations() {
    const animateElements = document.querySelectorAll('.feature-card, .ux-feature-card, .stat-item');
    
    const enhancedObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) translateX(0)';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animateElements.forEach(el => {
        enhancedObserver.observe(el);
    });
}

// Call enhanced animations
initEnhancedAnimations();

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Performance optimization: throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
const throttledParallax = throttle(function() {
    // Parallax logic here
}, 16); // ~60fps

// Theme switching functionality
function initThemeSwitching() {
    const themeCards = document.querySelectorAll('.theme-card');
    
    // Set initial theme (fruitful)
    document.documentElement.setAttribute('data-theme', 'fruitful');
    updateActiveThemeCard('fruitful');
    
    themeCards.forEach(card => {
        card.addEventListener('click', function() {
            const themeName = this.getAttribute('data-theme');
            
            // Apply theme
            document.documentElement.setAttribute('data-theme', themeName);
            updateActiveThemeCard(themeName);
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Save theme preference
            localStorage.setItem('selectedTheme', themeName);
        });
    });
    
    // Load saved theme preference
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateActiveThemeCard(savedTheme);
    }
}

function updateActiveThemeCard(themeName) {
    const themeCards = document.querySelectorAll('.theme-card');
    
    themeCards.forEach(card => {
        card.classList.remove('active');
        if (card.getAttribute('data-theme') === themeName) {
            card.classList.add('active');
        }
    });
}