// Professional interactions with cinematic animations for El Pelón

// State management
const state = {
    analytics: {
        visits: 0,
        clicks: {},
        sessions: []
    }
};

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    initAnalytics();
    initLinkTracking();
    initIntersectionObserver();
    initAdvancedAnimations();
    preventDefaults();
});

/* ============================================
   CUSTOM CURSOR
   ============================================ */
function initCursor() {
    const cursor = document.querySelector('.cursor-follower');
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let isHovering = false;

    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth cursor follow
    function animateCursor() {
        const distX = mouseX - cursorX;
        const distY = mouseY - cursorY;

        cursorX += distX * 0.2;
        cursorY += distY * 0.2;

        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Cursor hover effects
    const interactiveElements = document.querySelectorAll('a, button, .logo-core');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
            cursor.style.borderColor = 'var(--blue)';
            cursor.style.backgroundColor = 'rgba(16, 168, 224, 0.2)';
        });

        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.borderColor = 'var(--orange)';
            cursor.style.backgroundColor = 'transparent';
        });
    });
}

/* ============================================
   ANALYTICS & TRACKING
   ============================================ */
function initAnalytics() {
    try {
        // Load existing analytics
        const stored = localStorage.getItem('elPelonProAnalytics');
        if (stored) {
            state.analytics = JSON.parse(stored);
        }

        // Track visit
        state.analytics.visits++;
        state.analytics.sessions.push({
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            viewport: `${window.innerWidth}x${window.innerHeight}`
        });

        // Keep only last 50 sessions
        if (state.analytics.sessions.length > 50) {
            state.analytics.sessions = state.analytics.sessions.slice(-50);
        }

        saveAnalytics();
        logWelcome();
    } catch (e) {
        console.log('Analytics initialization failed');
    }
}

function saveAnalytics() {
    try {
        localStorage.setItem('elPelonProAnalytics', JSON.stringify(state.analytics));
    } catch (e) {
        console.log('Could not save analytics');
    }
}

function logWelcome() {
    console.log(
        '%c✨ EL PELÓN - PRO VERSION ✨',
        'font-size: 28px; font-weight: bold; background: linear-gradient(90deg, #f79c1c, #10a8e0); -webkit-background-clip: text; color: transparent; padding: 20px;'
    );
    console.log(
        `%c📊 Visita #${state.analytics.visits}`,
        'font-size: 14px; color: #10a8e0; font-weight: bold;'
    );
    console.log(
        '%cEscribe verEstadisticas() para ver métricas completas',
        'font-size: 12px; color: #f79c1c;'
    );
}

/* ============================================
   LINK TRACKING
   ============================================ */
function initLinkTracking() {
    const links = document.querySelectorAll('.link-card');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const platform = this.dataset.platform;
            trackClick(platform);
            createRippleEffect(this, e);
            triggerSuccessAnimation(this);
        });
    });
}

function trackClick(platform) {
    if (!state.analytics.clicks[platform]) {
        state.analytics.clicks[platform] = 0;
    }
    state.analytics.clicks[platform]++;
    state.analytics.lastClick = {
        platform,
        timestamp: new Date().toISOString()
    };
    saveAnalytics();

    console.log(
        `%c🎯 ${platform.toUpperCase()}`,
        'font-size: 14px; color: #f79c1c; font-weight: bold;',
        `• Click #${state.analytics.clicks[platform]}`
    );
}

/* ============================================
   VISUAL EFFECTS
   ============================================ */
function createRippleEffect(element, event) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    Object.assign(ripple.style, {
        position: 'absolute',
        left: x + 'px',
        top: y + 'px',
        width: '0',
        height: '0',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.6)',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: '100'
    });

    const cardInner = element.querySelector('.card-inner');
    cardInner.style.position = 'relative';
    cardInner.appendChild(ripple);

    ripple.animate([
        { width: '0', height: '0', opacity: 1 },
        { width: '300px', height: '300px', opacity: 0 }
    ], {
        duration: 800,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    }).onfinish = () => ripple.remove();
}

function triggerSuccessAnimation(element) {
    // Create particle burst
    const colors = ['#f79c1c', '#10a8e0'];
    const particleCount = 20;
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < particleCount; i++) {
        createParticle(centerX, centerY, colors[i % 2]);
    }
}

function createParticle(x, y, color) {
    const particle = document.createElement('div');
    
    Object.assign(particle.style, {
        position: 'fixed',
        left: x + 'px',
        top: y + 'px',
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        background: color,
        pointerEvents: 'none',
        zIndex: '10000',
        boxShadow: `0 0 10px ${color}`
    });

    document.body.appendChild(particle);

    const angle = Math.random() * Math.PI * 2;
    const velocity = 100 + Math.random() * 100;
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
        duration: 1000 + Math.random() * 500,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    }).onfinish = () => particle.remove();
}

/* ============================================
   INTERSECTION OBSERVER
   ============================================ */
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const elements = document.querySelectorAll('.link-card, .section-label');
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
}

/* ============================================
   ADVANCED ANIMATIONS
   ============================================ */
function initAdvancedAnimations() {
    // Logo sphere parallax
    const logoSphere = document.querySelector('.logo-sphere');
    if (logoSphere) {
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;
            logoSphere.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg)`;
        });
    }

    // Logo core interaction
    const logoCore = document.querySelector('.logo-core');
    if (logoCore) {
        logoCore.addEventListener('click', () => {
            logoCore.style.animation = 'none';
            setTimeout(() => {
                logoCore.style.animation = 'coreGlow 4s ease-in-out infinite, sphereEntry 1s cubic-bezier(0.34, 1.56, 0.64, 1)';
            }, 10);

            // Create explosion effect
            const rect = logoCore.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            for (let i = 0; i < 30; i++) {
                createParticle(centerX, centerY, i % 2 === 0 ? '#f79c1c' : '#10a8e0');
            }
        });
    }

    // Smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
}

/* ============================================
   UTILITY FUNCTIONS
   ============================================ */
function preventDefaults() {
    // Prevent image dragging
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('dragstart', (e) => e.preventDefault());
    });

    // Keyboard accessibility
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            const focused = document.activeElement;
            if (focused.classList.contains('link-card')) {
                e.preventDefault();
                focused.click();
            }
        }
    });
}

/* ============================================
   PUBLIC API
   ============================================ */
window.verEstadisticas = function() {
    console.clear();
    console.log(
        '%c📊 ESTADÍSTICAS COMPLETAS - EL PELÓN',
        'font-size: 24px; font-weight: bold; color: #f79c1c; padding: 10px 0;'
    );

    console.log('\n%c🎯 MÉTRICAS DE ENGAGEMENT', 'font-size: 16px; color: #10a8e0; font-weight: bold;');
    console.table({
        'Total de Visitas': state.analytics.visits,
        'Total de Clicks': Object.values(state.analytics.clicks).reduce((a, b) => a + b, 0),
        'Facebook': state.analytics.clicks.facebook || 0,
        'Instagram': state.analytics.clicks.instagram || 0,
        'TikTok': state.analytics.clicks.tiktok || 0,
        'Twitter': state.analytics.clicks.twitter || 0
    });

    if (state.analytics.lastClick) {
        console.log(
            '%c🕐 Último Click:',
            'font-weight: bold;',
            state.analytics.lastClick.platform.toUpperCase(),
            '•',
            new Date(state.analytics.lastClick.timestamp).toLocaleString('es-BO')
        );
    }

    // Calculate engagement rate
    const totalClicks = Object.values(state.analytics.clicks).reduce((a, b) => a + b, 0);
    const engagementRate = state.analytics.visits > 0 
        ? ((totalClicks / state.analytics.visits) * 100).toFixed(2)
        : 0;

    console.log(
        `%c📈 Tasa de Engagement: ${engagementRate}%`,
        'font-size: 14px; color: #f79c1c; font-weight: bold; padding-top: 10px;'
    );

    // Show recent sessions
    if (state.analytics.sessions.length > 0) {
        console.log('\n%c📅 SESIONES RECIENTES', 'font-size: 16px; color: #10a8e0; font-weight: bold;');
        console.table(state.analytics.sessions.slice(-5).map((session, i) => ({
            '#': state.analytics.sessions.length - 4 + i,
            'Fecha': new Date(session.timestamp).toLocaleString('es-BO'),
            'Viewport': session.viewport
        })));
    }

    console.log(
        '\n%c💪 ¡Únete al cambio!',
        'font-size: 18px; color: #f79c1c; font-weight: bold;'
    );
};

window.resetearEstadisticas = function() {
    if (confirm('¿Estás seguro de que quieres resetear todas las estadísticas?')) {
        localStorage.removeItem('elPelonProAnalytics');
        state.analytics = { visits: 0, clicks: {}, sessions: [] };
        console.log('%c✅ Estadísticas reseteadas', 'color: #10a8e0; font-weight: bold;');
    }
};

/* ============================================
   PERFORMANCE MONITORING
   ============================================ */
if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        // Prefetch external domains
        ['facebook.com', 'instagram.com', 'tiktok.com', 'x.com'].forEach(domain => {
            const link = document.createElement('link');
            link.rel = 'dns-prefetch';
            link.href = `https://${domain}`;
            document.head.appendChild(link);
        });
    });
}

// Page visibility tracking
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        console.log('%c👋 Bienvenido de vuelta', 'color: #10a8e0;');
    }
});

// Performance metrics
window.addEventListener('load', () => {
    if ('performance' in window) {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log(
            '%c⚡ Tiempo de carga:',
            'color: #10a8e0;',
            `${Math.round(perfData.loadEventEnd - perfData.fetchStart)}ms`
        );
    }
});
