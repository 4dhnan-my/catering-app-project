document.addEventListener('DOMContentLoaded', () => {
    const loginView = document.getElementById('login-view');
    const registerView = document.getElementById('register-view');
    const showRegisterLink = document.getElementById('show-register');
    const showLoginLink = document.getElementById('show-login');

    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    const loginError = document.getElementById('login-error');
    const registerError = document.getElementById('register-error');
    const registerSuccess = document.getElementById('register-success');

    // View toggling
    showRegisterLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginView.classList.remove('active');
        registerView.classList.add('active');
    });

    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        registerView.classList.remove('active');
        loginView.classList.add('active');
    });

    // Function to get users from localStorage
    const getUsers = () => {
        const users = localStorage.getItem('users');
        // Initialize with default users if none exist
        if (!users) {
            const defaultUsers = [
                { username: 'student', password: 'password', role: 'student' },
                { username: 'company', password: 'password', role: 'company' }
            ];
            localStorage.setItem('users', JSON.stringify(defaultUsers));
            return defaultUsers;
        }
        return JSON.parse(users);
    };
    
    // Function to save users to localStorage
    const saveUsers = (users) => {
        localStorage.setItem('users', JSON.stringify(users));
    };


    // Registration logic
    registerForm.addEventListener('submit', (event) => {
        event.preventDefault();
        registerError.classList.add('hidden');
        registerSuccess.classList.add('hidden');

        const username = document.getElementById('register-username').value;
        const password = document.getElementById('register-password').value;
        const role = document.getElementById('register-role').value;

        const users = getUsers();
        
        if (users.find(user => user.username === username)) {
            registerError.classList.remove('hidden');
        } else {
            users.push({ username, password, role });
            saveUsers(users);
            registerSuccess.classList.remove('hidden');
            registerForm.reset();
        }
    });

    // Login logic
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        loginError.classList.add('hidden');

        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        const users = getUsers();
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            localStorage.setItem('userRole', user.role);
            window.location.href = 'app.html';
        } else {
            loginError.classList.remove('hidden');
        }
    });
    
    // Initialize users in localStorage on first visit
    getUsers();
});
