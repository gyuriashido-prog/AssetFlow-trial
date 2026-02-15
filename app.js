document.addEventListener("DOMContentLoaded", () => {
    
    /* 1. MOBILE REFRESH TO HOME */
    // This resets the scroll position to the top whenever the page is reloaded
    if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
        window.scrollTo(0, 0);
    }

    /* 2. MOBILE VIEWPORT HEIGHT FIX */
    const setAppHeight = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    window.addEventListener('resize', setAppHeight);
    setAppHeight();


    /* 3. SMOOTH SCROLLING */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });


    /* 4. HERO INTERACTION */
    const heroSection = document.getElementById('hero-trigger');
    if (heroSection) {
        heroSection.addEventListener('click', (e) => {
            if (e.target.closest('a') || e.target.closest('button')) return; 
            window.location.href = 'login.html';
        });
    }


    /* 5. LOGIN CARD INTERACTION */
    const loginWrapper = document.querySelector('.login-wrapper');
    const loginCard = document.querySelector('.login-card');
    if (loginWrapper && loginCard) {
        loginWrapper.addEventListener('click', (e) => {
            if (loginCard.contains(e.target)) return;
            window.location.href = 'index.html';
        });
    }
});
