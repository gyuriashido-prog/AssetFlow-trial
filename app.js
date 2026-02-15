document.addEventListener("DOMContentLoaded", () => {
    
    /* 1. MOBILE VIEWPORT HEIGHT FIX */
    const setAppHeight = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    window.addEventListener('resize', setAppHeight);
    setAppHeight();

    /* 2. MOBILE REFRESH -> LOAD HOME PAGE (Scroll to Top) */
    // This ensures if a user refreshes anywhere, they start at the top
    if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
        window.scrollTo(0, 0);
    }

    /* 3. SMOOTH SCROLLING */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                // Offset calculation for the sticky navbar
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* 4. HERO INTERACTION */
    const heroSection = document.getElementById('hero-trigger');
    if (heroSection) {
        heroSection.addEventListener('click', (e) => {
            if (!e.target.closest('a') && !e.target.closest('button')) {
                window.location.href = 'login.html';
            }
        });
    }

    /* 5. LOGIN WRAPPER LOGIC */
    const loginWrapper = document.querySelector('.login-wrapper');
    const loginCard = document.querySelector('.login-card');
    if (loginWrapper && loginCard) {
        loginWrapper.addEventListener('click', (e) => {
            if (!loginCard.contains(e.target)) {
                window.location.href = 'index.html';
            }
        });
    }
});
