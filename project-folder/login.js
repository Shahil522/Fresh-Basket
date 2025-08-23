
const loginForm = document.getElementById('loginForm');
const loginMessage = document.getElementById('loginMessage');

if (loginForm && loginMessage && typeof auth !== 'undefined') {
    const loginContainer = document.querySelector('.login-container');
    if (loginContainer && typeof auth !== 'undefined') {
        const loginForm = loginContainer.querySelector('#loginForm');
        const loginMessage = loginContainer.querySelector('#loginMessage');
        const emailInput = loginContainer.querySelector('#email');
        const passwordInput = loginContainer.querySelector('#password');
        const rememberMeInput = loginContainer.querySelector('#rememberMe');

        if (loginForm && loginMessage && emailInput && passwordInput && rememberMeInput) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = emailInput.value.trim();
                const password = passwordInput.value.trim();
                const rememberMe = rememberMeInput.checked;
                console.log('Login attempt:', { email, password });
                loginMessage.innerText = '';
                if (!email || !password) {
                    loginMessage.style.color = 'red';
                    loginMessage.innerText = 'Please enter both email and password.';
                    return;
                }
                auth.setPersistence(
                    rememberMe
                        ? firebase.auth.Auth.Persistence.LOCAL
                        : firebase.auth.Auth.Persistence.SESSION
                )
                    .then(() => auth.signInWithEmailAndPassword(email, password))
                    .then((userCredential) => {
                        loginMessage.style.color = 'green';
                        loginMessage.innerText = 'Login successful! Redirecting...';
                        setTimeout(() => {
                            window.location.assign('/project-folder/dashboard.html');
                        }, 1500);
                    })
                    .catch((error) => {
                        loginMessage.style.color = 'red';
                        switch (error.code) {
                            case 'auth/invalid-email':
                                loginMessage.innerText = 'Invalid email format.';
                                break;
                            case 'auth/user-disabled':
                                loginMessage.innerText = 'This user has been disabled.';
                                break;
                            case 'auth/user-not-found':
                                loginMessage.innerText = 'No user found with this email.';
                                break;
                            case 'auth/wrong-password':
                                loginMessage.innerText = 'Incorrect password.';
                                break;
                            default:
                                loginMessage.innerText = error.message;
                                break;
                        }
                        console.error(error);
                    });
            });
        }
    }
}
