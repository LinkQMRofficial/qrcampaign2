// Professional Landing Page - El Pelón
// Blue-themed corporate design with advanced interactions

'use strict';

// Global state
const ElPelon = {
    analytics: {
        visits: 0,
        clicks: {},
        engagement: [],
        startTime: Date.now()
    },
    
    init() {
        this.loadAnalytics();
        this.setupEventListeners();
        this.initAnimations();
        this.trackSession();
        this.preventDefaults();
        this.logWelcome();
    },

    // Load analytics from storage
    loadAnalytics() {
        try {
            const stored = localStorage.getItem('elPelonCorporate');
            if (stored) {
                this.analytics = { ...this.analytics, ...JSON.parse(stored) };
            }
            this.analytics.visits++;
            this.analytics.startTime = Date.now();
        } catch (e) {
            console.log('Analytics load failed');
        }
    },

    // Save analytics to storage
    saveAnalytics() {
        try {
            localStorage.setItem('elPelonCorporate', JSON.stringify(this.analytics));
        } catch (e) {
            console.log('Analytics save failed');
        }
    },

    // Setup event listeners
    setupEventListeners() {
        const socialLinks = document.querySelectorAll('.social-link');
        
        socialLinks.forEach(link => {
            // Click tracking
            link.addEventListener('click', (e) => {
                this.trackClick(link, e);
            });

            // Hover effects
            link.addEventListener('mouseenter', () => {
                this.createHoverEffect(link);
            });

            // Touch support
            link.addEventListener('touchstart', () => {
                link.style.transform = 'translateY(-5px)';
            });

            link.addEventListener('touchend', () => {
                link.style.transform = '';
            });
        });

        // Logo interaction
        const hexagon = document.querySelector('.hexagon-shape');
        if (hexagon) {
            hexagon.addEventListener('click', () => {
                this.triggerLogoAnimation();
            });
        }
    },

    // Track clicks
    trackClick(link, event) {
        const platform = link.dataset.platform;
        
        // Update analytics
        if (!this.analytics.clicks[platform]) {
            this.analytics.clicks[platform] = 0;
        }
        this.analytics.clicks[platform]++;

        // Track engagement
        this.analytics.engagement.push({
            platform,
            timestamp: new Date().toISOString(),
            timeOnPage: Math.round((Date.now() - this.analytics.startTime) / 1000)
        });

        // Keep last 100 engagements
        if (this.analytics.engagement.length > 100) {
            this.analytics.engagement = this.analytics.engagement.slice(-100);
        }

        this.saveAnalytics();

        // Visual feedback
        this.createClickEffect(link, event);
        
        // Console log
        console.log(
            `%c✓ ${platform.toUpperCase()}`,
            'color: #10a8e0; font-weight: bold; font-size: 14px;',
            `| Click #${this.analytics.clicks[platform]}`
        );
    },

    // Create click effect
    createClickEffect(element, event) {
        // Ripple effect
        const ripple = document.createElement('div');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        Object.assign(ripple.style, {
            position: 'absolute',
            width: size + 'px',
            height: size + 'px',
            top: y + 'px',
            left: x + 'px',
            background: 'radial-gradient(circle, rgba(16, 168, 224, 0.6) 0%, transparent 70%)',
            borderRadius: '50%',
            transform: 'scale(0)',
            pointerEvents: 'none',
            zIndex: '10'
        });

        const linkContent = element.querySelector('.link-content');
        linkContent.style.position = 'relative';
        linkContent.appendChild(ripple);

        // Animate ripple
        ripple.animate([
            { transform: 'scale(0)', opacity: 1 },
            { transform: 'scale(2)', opacity: 0 }
        ], {
            duration: 600,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        }).onfinish = () => ripple.remove();

        // Particle burst
        this.createParticleBurst(event.clientX, event.clientY);

        // Success pulse
        this.pulseElement(element);
    },

    // Create hover effect
    createHoverEffect(element) {
        const icon = element.querySelector('.icon-circle');
        if (icon) {
            icon.animate([
                { transform: 'scale(1) rotate(0deg)' },
                { transform: 'scale(1.1) rotate(10deg)' },
                { transform: 'scale(1) rotate(0deg)' }
            ], {
                duration: 400,
                easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
            });
        }
    },

    // Create particle burst
    createParticleBurst(x, y) {
        const colors = ['#10a8e0', '#f79c1c'];
        const particleCount = 16;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            const color = colors[i % colors.length];
            const size = Math.random() * 6 + 4;

            Object.assign(particle.style, {
                position: 'fixed',
                left: x + 'px',
                top: y + 'px',
                width: size + 'px',
                height: size + 'px',
                background: color,
                borderRadius: '50%',
                pointerEvents: 'none',
                zIndex: '10000',
                boxShadow: `0 0 10px ${color}`
            });

            document.body.appendChild(particle);

            const angle = (Math.PI * 2 * i) / particleCount;
            const velocity = 80 + Math.random() * 60;
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
                duration: 800 + Math.random() * 400,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
            }).onfinish = () => particle.remove();
        }
    },

    // Pulse element
    pulseElement(element) {
        element.animate([
            { transform: 'translateY(-8px) scale(1)' },
            { transform: 'translateY(-12px) scale(1.02)' },
            { transform: 'translateY(-8px) scale(1)' }
        ], {
            duration: 300,
            easing: 'ease-out'
        });
    },

    // Trigger logo animation
    triggerLogoAnimation() {
        const hexagonShape = document.querySelector('.hexagon-shape');
        const hexagonBorder = document.querySelector('.hexagon-border');
        
        if (hexagonShape) {
            hexagonShape.animate([
                { transform: 'translateY(0) rotate(0deg) scale(1)' },
                { transform: 'translateY(-20px) rotate(360deg) scale(1.1)' },
                { transform: 'translateY(0) rotate(720deg) scale(1)' }
            ], {
                duration: 1000,
                easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
            });
        }

        if (hexagonBorder) {
            hexagonBorder.style.animationPlayState = 'paused';
            setTimeout(() => {
                hexagonBorder.style.animationPlayState = 'running';
            }, 1000);
        }

        // Create burst at logo
        const rect = hexagonShape.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        this.createParticleBurst(centerX, centerY);

        console.log('%c🎉 ¡Logo activado!', 'color: #f79c1c; font-size: 16px; font-weight: bold;');
    },

    // Initialize animations
    initAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements
        document.querySelectorAll('.social-link').forEach(el => {
            observer.observe(el);
        });

        // Parallax effect on scroll
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const waves = document.querySelectorAll('.wave');
            
            waves.forEach((wave, index) => {
                const speed = (index + 1) * 0.5;
                wave.style.transform = `translateX(${scrolled * speed * 0.05}px)`;
            });
        });

        // Smooth scroll for internal links
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
    },

    // Track session
    trackSession() {
        // Track time on page
        window.addEventListener('beforeunload', () => {
            const timeOnPage = Math.round((Date.now() - this.analytics.startTime) / 1000);
            console.log(`⏱️ Tiempo en página: ${timeOnPage}s`);
        });

        // Track visibility changes
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                console.log('%c👋 Bienvenido de vuelta', 'color: #10a8e0;');
            }
        });
    },

    // Prevent defaults
    preventDefaults() {
        // Prevent image dragging
        document.querySelectorAll('img').forEach(img => {
            img.addEventListener('dragstart', (e) => e.preventDefault());
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                const focused = document.activeElement;
                if (focused.classList.contains('social-link')) {
                    e.preventDefault();
                    focused.click();
                }
            }
        });
    },

    // Welcome message
    logWelcome() {
        console.clear();
        console.log(
            '%c█▀▀ █░░   █▀█ █▀▀ █░░ █▀█ █▄░█',
            'color: #10a8e0; font-size: 14px; font-weight: bold;'
        );
        console.log(
            '%c██▄ █▄▄   █▀▀ ██▄ █▄▄ █▄█ █░▀█',
            'color: #10a8e0; font-size: 14px; font-weight: bold;'
        );
        console.log(
            '\n%c🎯 VERSIÓN PROFESIONAL - DISEÑO CORPORATIVO',
            'color: #f79c1c; font-size: 16px; font-weight: bold;'
        );
        console.log(
            `%c📊 Visita #${this.analytics.visits}`,
            'color: #10a8e0; font-size: 14px;'
        );
        console.log(
            '%cEscribe: verEstadisticas() para métricas completas',
            'color: #6c757d; font-size: 12px;'
        );
        console.log('%c' + '─'.repeat(50), 'color: #10a8e0;');
    }
};

// Public API
window.verEstadisticas = function() {
    console.clear();
    console.log(
        '%c📊 DASHBOARD DE ANALYTICS',
        'background: linear-gradient(90deg, #10a8e0, #f79c1c); color: white; padding: 12px 24px; font-size: 20px; font-weight: bold; border-radius: 8px;'
    );

    const totalClicks = Object.values(ElPelon.analytics.clicks).reduce((a, b) => a + b, 0);
    const avgTimePerVisit = ElPelon.analytics.engagement.length > 0
        ? Math.round(ElPelon.analytics.engagement.reduce((sum, e) => sum + e.timeOnPage, 0) / ElPelon.analytics.engagement.length)
        : 0;

    console.log('\n%c📈 MÉTRICAS GENERALES', 'color: #10a8e0; font-size: 16px; font-weight: bold;');
    console.table({
        'Total Visitas': ElPelon.analytics.visits,
        'Total Clicks': totalClicks,
        'Tiempo Promedio': avgTimePerVisit + 's',
        'Facebook': ElPelon.analytics.clicks.facebook || 0,
        'Instagram': ElPelon.analytics.clicks.instagram || 0,
        'TikTok': ElPelon.analytics.clicks.tiktok || 0,
        'Twitter': ElPelon.analytics.clicks.twitter || 0
    });

    // Engagement rate
    const engagementRate = ElPelon.analytics.visits > 0
        ? ((totalClicks / ElPelon.analytics.visits) * 100).toFixed(2)
        : 0;

    console.log(
        `%c💪 Tasa de Engagement: ${engagementRate}%`,
        'color: #f79c1c; font-size: 16px; font-weight: bold;'
    );

    // Recent interactions
    if (ElPelon.analytics.engagement.length > 0) {
        console.log('\n%c🕐 INTERACCIONES RECIENTES', 'color: #10a8e0; font-size: 16px; font-weight: bold;');
        console.table(
            ElPelon.analytics.engagement.slice(-10).map((e, i) => ({
                '#': ElPelon.analytics.engagement.length - 9 + i,
                'Plataforma': e.platform.toUpperCase(),
                'Tiempo en página': e.timeOnPage + 's',
                'Fecha': new Date(e.timestamp).toLocaleString('es-BO')
            }))
        );
    }

    console.log('\n%c✨ ¡Únete al cambio!', 'color: #10a8e0; font-size: 18px; font-weight: bold;');
};

window.resetearDatos = function() {
    if (confirm('¿Seguro que quieres resetear todas las estadísticas?')) {
        localStorage.removeItem('elPelonCorporate');
        ElPelon.analytics = {
            visits: 0,
            clicks: {},
            engagement: [],
            startTime: Date.now()
        };
        console.log('%c✅ Datos reseteados correctamente', 'color: #10a8e0; font-weight: bold;');
        location.reload();
    }
};

// Performance monitoring
if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        // DNS prefetch
        ['facebook.com', 'instagram.com', 'tiktok.com', 'x.com'].forEach(domain => {
            const link = document.createElement('link');
            link.rel = 'dns-prefetch';
            link.href = `https://${domain}`;
            document.head.appendChild(link);
        });
    });
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => ElPelon.init());
} else {
    ElPelon.init();
}

// Performance metrics
window.addEventListener('load', () => {
    if ('performance' in window) {
        const perfData = performance.getEntriesByType('navigation')[0];
        const loadTime = Math.round(perfData.loadEventEnd - perfData.fetchStart);
        console.log(`%c⚡ Página cargada en ${loadTime}ms`, 'color: #10a8e0;');
    }
});
