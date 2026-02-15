document.addEventListener("DOMContentLoaded", () => {
    
    /* 1. REFRESH TO TOP LOGIC */
    // Forces the browser to ignore previous scroll position on refresh
    if (history.scrollRestoration) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    /* 2. STICKY NAV BACKGROUND TOGGLE */
    const nav = document.getElementById('main-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    /* 3. MOBILE VIEWPORT HEIGHT FIX */
    const setAppHeight = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    window.addEventListener('resize', setAppHeight);
    setAppHeight();

    /* 4. HERO CLICK REDIRECT */
    const heroSection = document.getElementById('hero-trigger');
    if (heroSection) {
        heroSection.addEventListener('click', (e) => {
            if (!e.target.closest('a') && !e.target.closest('button')) {
                window.location.href = 'login.html';
            }
        });
    }

    /* 5. SMOOTH SCROLLING */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
