document.addEventListener('DOMContentLoaded', () => {
    initializeAuth();
});

function initializeAuth() {
    // Initialize form handling
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Initialize password toggle
    const toggleButtons = document.querySelectorAll('.toggle-password');
    toggleButtons.forEach(button => {
        button.addEventListener('click', togglePasswordVisibility);
    });

    // Initialize form validation
    const inputs = document.querySelectorAll('.form-control');
    inputs.forEach(input => {
        input.addEventListener('input', validateInput);
        input.addEventListener('blur', validateInput);
    });
}

async function handleLogin(e) {
    e.preventDefault();
    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const email = form.querySelector('#email').value;
    const password = form.querySelector('#password').value;

    // Basic validation
    if (!validateEmail(email)) {
        showError('email', 'Please enter a valid email address');
        return;
    }

    if (!password) {
        showError('password', 'Password is required');
        return;
    }

    // Show loading state
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Signing in...';

    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('token', data.token); // Store JWT token
            alert(data.message); // Show success message
            window.location.href = '../dashboard/user/index.html'; // Redirect to dashboard
        } else {
            showError('general', data.message || 'Invalid credentials');
        }
    } catch (error) {
        showError('general', 'An error occurred. Please try again.');
    } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = 'Sign In <i class="bi bi-arrow-right"></i>';
    }
}


function validateInput(e) {
    const input = e.target;
    const inputId = input.id;
    const value = input.value;

    switch (inputId) {
        case 'email':
            if (!validateEmail(value)) {
                showError(inputId, 'Please enter a valid email address');
            } else {
                clearError(inputId);
            }
            break;
        case 'password':
            if (value.length < 6) {
                showError(inputId, 'Password must be at least 6 characters');
            } else {
                clearError(inputId);
            }
            break;
    }
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function togglePasswordVisibility(e) {
    const button = e.target.closest('.toggle-password');
    const input = button.closest('.input-group').querySelector('input');
    const icon = button.querySelector('i');

    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.replace('bi-eye', 'bi-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.replace('bi-eye-slash', 'bi-eye');
    }
}

function showError(inputId, message) {
    const input = document.getElementById(inputId);
    const formGroup = input.closest('.form-group');
    let errorDiv = formGroup.querySelector('.error-message');

    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error-message text-danger mt-1';
        formGroup.appendChild(errorDiv);
    }

    input.classList.add('is-invalid');
    errorDiv.textContent = message;
}

function clearError(inputId) {
    const input = document.getElementById(inputId);
    const formGroup = input.closest('.form-group');
    const errorDiv = formGroup.querySelector('.error-message');

    input.classList.remove('is-invalid');
    if (errorDiv) {
        errorDiv.remove();
    }
}
const API_BASE_URL = 'http://localhost:5000/api/auth'; // Replace with your backend URL if deployed

// Function to register a new user
const registerUser = async (name, email, password) => {
    try {
        const response = await fetch(`${API_BASE_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        });
        if (!response.ok) throw new Error('Registration failed');
        const data = await response.json();
        alert('Registration successful!');
        console.log(data);
        return data;
    } catch (error) {
        alert(error.message);
    }
};

// Function to log in an existing user
const loginUser = async (email, password) => {
    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        if (!response.ok) throw new Error('Login failed');
        const data = await response.json();
        localStorage.setItem('token', data.token); // Store token in local storage
        alert('Login successful!');
        console.log(data);
        return data;
    } catch (error) {
        alert(error.message);
    }
};
const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Call the loginUser function
    await loginUser(email, password);
});
