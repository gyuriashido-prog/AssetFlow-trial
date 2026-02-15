const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-id",
  appId: "your-app-id"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

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
        e.preventDefault(); // Prevents the browser from "jumping" instantly
        const targetId = this.getAttribute('href');
        
        // If targetId is just "#", it scrolls to the top
        const targetSection = targetId === "#" ? document.body : document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


/* 6. SIGN UP ID SCANNER LOGIC */
const idInput = document.getElementById('identifier-id');
if (idInput) {
    idInput.addEventListener('change', () => {
        console.log("ID Scanned: " + idInput.value);
        // You can add logic here to verify the ID or move focus to the next field
    });
}


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

const signupForm = document.getElementById('signup-form');

if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // 1. Capture the values from your specific fields
        const idNumber = document.getElementById('identifier-id').value;
        const fullName = signupForm.querySelector('input[placeholder="Full Name"]').value;
        const company = signupForm.querySelector('input[placeholder="Company Name"]').value;
        const email = signupForm.querySelector('input[placeholder="Email Address"]').value;
        const password = "CreateAPasswordField123"; // Ensure you add a password input to your HTML

        // 2. Create the User in Firebase Authentication
        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // 3. Store the Profile Data in Firestore
                // We use the unique User UID as the document name
                return db.collection("users").doc(userCredential.user.uid).set({
                    identifierID: idNumber,
                    name: fullName,
                    company: company,
                    email: email,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                });
            })
            .then(() => {
                alert("Account created and ID registered!");
                window.location.href = 'index.html'; // Redirect to home
            })
            .catch((error) => {
                alert("Error: " + error.message);
            });
    });
}
