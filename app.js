document.addEventListener("DOMContentLoaded", () => {
    
    /* 1. MOBILE REFRESH TO HOME (SCROLL TO TOP) */
    // This logic ensures if the user refreshes on a mobile device, 
    // it resets the scroll to the top of the page.
    window.onbeforeunload = function () {
        if (window.innerWidth <= 768) {
            window.scrollTo(0, 0);
        }
    };

    // Force scroll top on actual load/refresh
    if (history.scrollRestoration) {
        history.scrollRestoration = 'manual';
    } else {
        window.scrollTo(0, 0);
    }

    /* 2. MOBILE VIEWPORT HEIGHT FIX */
    const setAppHeight = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    window.addEventListener('resize', setAppHeight);
    setAppHeight();


    /* 3. SMOOTH SCROLLING WITH NAV OFFSET */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });


    /* 4. HERO CLICK -> LOGIN REDIRECT */
    const heroSection = document.getElementById('hero-trigger');
    if (heroSection) {
        heroSection.addEventListener('click', (e) => {
            // Don't redirect if clicking an actual link or button inside hero
            if (e.target.closest('a') || e.target.closest('button')) return; 
            window.location.href = 'login.html';
        });
    }


    /* 5. LOGIN WRAPPER CLICK -> HOME REDIRECT */
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
