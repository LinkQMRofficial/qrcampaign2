// Enhanced interactions for El Pelón's bold landing page

document.addEventListener('DOMContentLoaded', function() {
    initializeEffects();
    trackSocialClicks();
    addInteractivity();
    preventImageDrag();
});

// Initialize visual effects
function initializeEffects() {
    createFloatingDots();
    addMouseTracker();
}

// Create floating dots effect
function createFloatingDots() {
    const container = document.querySelector('.geometric-bg');
    const dotCount = 20;
    
    for (let i = 0; i < dotCount; i++) {
        const dot = document.createElement('div');
        dot.style.position = 'absolute';
        dot.style.width = Math.random() * 6 + 3 + 'px';
        dot.style.height = dot.style.width;
        dot.style.background = i % 2 === 0 ? '#f79c1c' : '#10a8e0';
        dot.style.borderRadius = '50%';
        dot.style.opacity = Math.random() * 0.4 + 0.2;
        dot.style.top = Math.random() * 100 + '%';
        dot.style.left = Math.random() * 100 + '%';
        dot.style.pointerEvents = 'none';
        dot.style.filter = 'blur(1px)';
        
        const duration = Math.random() * 15 + 10 + 's';
        const delay = Math.random() * 5 + 's';
        
        dot.style.animation = `floatDot ${duration} ${delay} infinite ease-in-out`;
        
        container.appendChild(dot);
    }
}

// Add CSS for dot animation
const style = document.createElement('style');
style.textContent = `
    @keyframes floatDot {
        0%, 100% {
            transform: translate(0, 0);
        }
        25% {
            transform: translate(50px, -50px);
        }
        50% {
            transform: translate(-30px, -100px);
        }
        75% {
            transform: translate(30px, -50px);
        }
    }
`;
document.head.appendChild(style);

// Mouse tracker effect
function addMouseTracker() {
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateCursor() {
        const diffX = mouseX - cursorX;
        const diffY = mouseY - cursorY;
        
        cursorX += diffX * 0.1;
        cursorY += diffY * 0.1;
        
        // Apply parallax to shapes
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.02;
            const x = (cursorX - window.innerWidth / 2) * speed;
            const y = (cursorY - window.innerHeight / 2) * speed;
            shape.style.transform = `translate(${x}px, ${y}px)`;
        });
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
}

// Track social media clicks
function trackSocialClicks() {
    const socialBtns = document.querySelectorAll('.social-btn');
    
    socialBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const platform = this.getAttribute('data-platform');
            const timestamp = new Date().toISOString();
            
            console.log(`🎯 Click en ${platform} - ${timestamp}`);
            
            // Store analytics
            storeClick(platform);
            
            // Visual feedback
            createClickExplosion(this, e);
        });
    });
}

function storeClick(platform) {
    try {
        let analytics = JSON.parse(localStorage.getItem('elPelonAnalytics') || '{}');
        analytics[platform] = (analytics[platform] || 0) + 1;
        analytics.lastClick = new Date().toISOString();
        analytics.totalClicks = (analytics.totalClicks || 0) + 1;
        localStorage.setItem('elPelonAnalytics', JSON.stringify(analytics));
    } catch (e) {
        console.log('Analytics no disponibles');
    }
}

// Create explosion effect on click
function createClickExplosion(element, event) {
    const colors = ['#f79c1c', '#10a8e0'];
    const particleCount = 12;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.position = 'fixed';
        particle.style.width = '8px';
        particle.style.height = '8px';
        particle.style.background = color;
        particle.style.borderRadius = '50%';
        particle.style.left = event.clientX + 'px';
        particle.style.top = event.clientY + 'px';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        particle.style.boxShadow = `0 0 10px ${color}`;
        
        document.body.appendChild(particle);
        
        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = 100 + Math.random() * 50;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        
        particle.animate([
            {
                transform: 'translate(0, 0) scale(1)',
                opacity: 1
            },
            {
                transform: `translate(${tx}px, ${ty}px) scale(0)`,
                opacity: 0
            }
        ], {
            duration: 800,
            easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)'
        }).onfinish = () => particle.remove();
    }
}

// Add interactivity
function addInteractivity() {
    const socialBtns = document.querySelectorAll('.social-btn');
    
    // Touch feedback
    socialBtns.forEach(btn => {
        btn.addEventListener('touchstart', function() {
            this.style.transform = 'translateX(5px) scale(0.98)';
        });
        
        btn.addEventListener('touchend', function() {
            this.style.transform = '';
        });
        
        // Add visual feedback on hover
        btn.addEventListener('mouseenter', function() {
            const pulse = this.querySelector('.btn-pulse');
            if (pulse) {
                pulse.style.animation = 'none';
                setTimeout(() => {
                    pulse.style.animation = 'pulse 2s ease-in-out infinite';
                }, 10);
            }
        });
    });
    
    // Logo interaction
    const logo = document.querySelector('.logo');
    const logoFrame = document.querySelector('.logo-frame');
    
    if (logo && logoFrame) {
        logoFrame.addEventListener('click', function() {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'frameRotate 20s linear infinite, logoReveal 1s cubic-bezier(0.34, 1.56, 0.64, 1)';
            }, 10);
        });
    }
}

// Prevent image drag
function preventImageDrag() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('dragstart', (e) => e.preventDefault());
    });
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        const focused = document.activeElement;
        if (focused.classList.contains('social-btn')) {
            e.preventDefault();
            focused.click();
        }
    }
});

// Track page visits
function trackVisit() {
    try {
        let visits = parseInt(localStorage.getItem('elPelonVisits') || '0');
        visits++;
        localStorage.setItem('elPelonVisits', visits.toString());
        localStorage.setItem('elPelonLastVisit', new Date().toISOString());
        console.log(`📊 Total de visitas: ${visits}`);
    } catch (e) {
        console.log('Tracking de visitas no disponible');
    }
}

trackVisit();

// Export analytics function
window.verEstadisticas = function() {
    try {
        const analytics = JSON.parse(localStorage.getItem('elPelonAnalytics') || '{}');
        const visits = localStorage.getItem('elPelonVisits');
        const lastVisit = localStorage.getItem('elPelonLastVisit');
        
        console.log('%c📊 ESTADÍSTICAS DE EL PELÓN', 'font-size: 20px; font-weight: bold; color: #f79c1c;');
        console.table({
            'Total Visitas': visits || 0,
            'Última Visita': lastVisit || 'N/A',
            'Total Clicks': analytics.totalClicks || 0,
            'Clicks Facebook': analytics.facebook || 0,
            'Clicks Instagram': analytics.instagram || 0,
            'Clicks TikTok': analytics.tiktok || 0,
            'Clicks Twitter': analytics.twitter || 0,
            'Último Click': analytics.lastClick || 'N/A'
        });
        
        // Calculate engagement
        const engagement = visits > 0 ? ((analytics.totalClicks || 0) / visits * 100).toFixed(1) : 0;
        console.log(`%c💪 Tasa de engagement: ${engagement}%`, 'font-size: 14px; color: #10a8e0;');
        
    } catch (e) {
        console.log('No hay datos disponibles');
    }
};

// Performance optimization
if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        // Prefetch social media domains
        const domains = [
            'https://www.facebook.com',
            'https://www.instagram.com',
            'https://www.tiktok.com',
            'https://x.com'
        ];
        
        domains.forEach(domain => {
            const link = document.createElement('link');
            link.rel = 'dns-prefetch';
            link.href = domain;
            document.head.appendChild(link);
        });
    });
}

// Visibility change tracking
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        console.log('👋 ¡Bienvenido de vuelta!');
    }
});

// Easter egg
let clickCount = 0;
document.querySelector('.logo')?.addEventListener('click', function() {
    clickCount++;
    if (clickCount === 5) {
        console.log('%c🎉 ¡Descubriste el easter egg! El Pelón te saluda', 'font-size: 18px; color: #f79c1c; font-weight: bold;');
        clickCount = 0;
    }
});

console.log('%c¡BIENVENIDO A LA CAMPAÑA DE EL PELÓN! 🚀', 'font-size: 24px; font-weight: bold; color: #f79c1c; text-shadow: 2px 2px #10a8e0;');
console.log('%cPara ver estadísticas completas, escribe: verEstadisticas()', 'font-size: 14px; color: #10a8e0;');
console.log('%c¡Únete al cambio! 💪', 'font-size: 16px; color: #f79c1c;');
