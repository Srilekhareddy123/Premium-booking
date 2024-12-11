document.addEventListener('DOMContentLoaded', () => {
    initializeRegistration();
});

function initializeRegistration() {
    const registerForm = document.getElementById('registerForm');
    const passwordInput = document.getElementById('password');
    const strengthIndicator = document.getElementById('passwordStrength');

    if (registerForm) {
        registerForm.addEventListener('submit', handleRegistration);
    }

    if (passwordInput) {
        passwordInput.addEventListener('input', checkPasswordStrength);
    }
}

async function handleRegistration(e) {
    e.preventDefault();
    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Get form values
    const firstName = form.querySelector('#firstName').value;
    const lastName = form.querySelector('#lastName').value;
    const email = form.querySelector('#email').value;
    const password = form.querySelector('#password').value;
    const confirmPassword = form.querySelector('#confirmPassword').value;
    const terms = form.querySelector('#terms').checked;

    // Validate form
    if (!validateRegistrationForm(firstName, lastName, email, password, confirmPassword, terms)) {
        return;
    }

    // Show loading state
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Creating account...';

    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Show success message
        showSuccessMessage();
        
        // Redirect to email verification page
        setTimeout(() => {
            window.location.href = 'verify-email.html';
        }, 2000);
    } catch (error) {
        showError('general', 'An error occurred. Please try again.');
        submitButton.disabled = false;
        submitButton.innerHTML = 'Create Account <i class="bi bi-arrow-right"></i>';
    }
}
