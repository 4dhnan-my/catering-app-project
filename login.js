document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const loginError = document.getElementById('login-error');

    // Hardcoded credentials for demonstration
    const users = {
        student: { username: 'student', password: 'password' },
        company: { username: 'company', password: 'password' }
    };

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const role = document.getElementById('role').value;

        if (users[role] && users[role].username === username && users[role].password === password) {
            // Store user role in localStorage
            localStorage.setItem('userRole', role);
            // Redirect to the main application page
            window.location.href = 'app.html';
        } else {
            loginError.classList.remove('hidden');
        }
    });
});
