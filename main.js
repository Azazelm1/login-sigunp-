
// Firebase configuration
const firebaseConfig = {
    apiKey: "......",
    authDomain: ".....",
    projectId: ".....",
    storageBucket: "....",
    messagingSenderId: "ضيف",
    appId: ضيف"",
    measurementId: "ضيف"
};
firebase.initializeApp(firebaseConfig);

// Login function
function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            Swal.fire({
                title: 'تسلم إيدك يهندسة',
                icon: 'success',
                confirmButtonText: 'استمرار'
            }).then(() => {
                window.location.href = 'profile2.html';
            });
        })
        .catch((error) => {
            Swal.fire({
                title: 'خطأ!',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'حسناً'
            });
        });
}

// Sign Up function
function signUp() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Update display name after sign up
            const user = userCredential.user;
            const username = document.getElementById('username').value; // Assuming you have an input field for username
            return user.updateProfile({
                displayName: username
            });
        })
        .then(() => {
            Swal.fire({
                title: 'تسلم إيدك يهندسة',
                icon: 'success',
                confirmButtonText: 'استمرار'
            }).then(() => {
                window.location.href = 'profile2.html';
            });
        })
        .catch((error) => {
            Swal.fire({
                title: 'خطأ!',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'حسناً'
            });
        });
}

// Profile and Logout function
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // Display username and email
        document.getElementById('user-username').textContent = user.displayName || 'Unknown';
        document.getElementById('user-email').textContent = user.email;
    } else {
        // If no user is signed in, redirect to login page
        if (window.location.pathname.includes('profile2.html')) {
            window.location.href = 'login.html';
        }
    }
});

function logout() {
    firebase.auth().signOut().then(() => {
        // Redirect to login page after successful logout
        window.location.href = 'login.html';
    }).catch((error) => {
        Swal.fire({
            title: 'خطأ!',
            text: error.message,
            icon: 'error',
            confirmButtonText: 'حسناً'
        });
    });
}