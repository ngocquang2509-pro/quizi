// Authentication JavaScript

// Global variables
let currentForm = 'login';
let passwordStrength = 0;

// Initialize authentication
document.addEventListener('DOMContentLoaded', function() {
    initializeAuth();
    setupAuthEventListeners();
});

// Initialize authentication page
function initializeAuth() {
    // Check if user is already logged in
    const isLoggedIn = localStorage.getItem('medbooking_logged_in');
    if (isLoggedIn) {
        // Redirect to appropriate dashboard based on user role
        const userRole = localStorage.getItem('medbooking_user_role') || 'patient';
        redirectToDashboard(userRole);
        return;
    }

    // Show login form by default
    showForm('login');

    // Check URL parameters for form switching
    const urlParams = new URLSearchParams(window.location.search);
    const form = urlParams.get('form');
    if (form === 'register') {
        switchToRegister();
    } else if (form === 'forgot') {
        showForgotPassword();
    }
}

// Show specific form
function showForm(formType) {
    // Hide all forms
    document.querySelectorAll('.auth-form').forEach(form => {
        form.classList.remove('active');
    });

    // Show selected form
    document.getElementById(formType + 'Form').classList.add('active');
    currentForm = formType;

    // Update URL without page reload
    const newUrl = formType === 'login' ? 'login.html' : `login.html?form=${formType}`;
    window.history.replaceState({}, '', newUrl);
}

// Switch to login form
function switchToLogin() {
    showForm('login');
}

// Switch to register form
function switchToRegister() {
    showForm('register');
}

// Show forgot password form
function showForgotPassword() {
    showForm('forgotPassword');
}

// Toggle password visibility
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const toggleBtn = input.nextElementSibling;

    if (input.type === 'password') {
        input.type = 'text';
        toggleBtn.innerHTML = '<i class="fas fa-eye-slash"></i>';
    } else {
        input.type = 'password';
        toggleBtn.innerHTML = '<i class="fas fa-eye"></i>';
    }
}

// Check password strength
function checkPasswordStrength(password) {
    let strength = 0;
    const strengthBar = document.getElementById('passwordStrength');

    // Length check
    if (password.length >= 8) strength++;
    // Lowercase check
    if (/[a-z]/.test(password)) strength++;
    // Uppercase check
    if (/[A-Z]/.test(password)) strength++;
    // Number check
    if (/[0-9]/.test(password)) strength++;
    // Special character check
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    passwordStrength = strength;

    // Update strength bar
    const percentage = (strength / 5) * 100;
    strengthBar.style.setProperty('--strength-width', percentage + '%');

    // Update color based on strength
    if (strength <= 2) {
        strengthBar.style.setProperty('--strength-color', '#e74c3c');
    } else if (strength <= 3) {
        strengthBar.style.setProperty('--strength-color', '#f39c12');
    } else if (strength <= 4) {
        strengthBar.style.setProperty('--strength-color', '#27ae60');
    } else {
        strengthBar.style.setProperty('--strength-color', '#27ae60');
    }
}

// Validate email format
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validate phone format
function validatePhone(phone) {
    const phoneRegex = /^(\+84|84|0)[3|5|7|8|9][0-9]{8}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Format phone number
function formatPhoneNumber(phone) {
    // Remove all non-digits
    const cleaned = phone.replace(/\D/g, '');

    // Format Vietnamese phone numbers
    if (cleaned.length === 10 && cleaned.startsWith('0')) {
        return cleaned.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
    } else if (cleaned.length === 9 && !cleaned.startsWith('0')) {
        return cleaned.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3');
    }

    return phone;
}

// Login form submission
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginFormContent');
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const email = document.getElementById('loginEmail').value.trim();
            const password = document.getElementById('loginPassword').value;
            const rememberMe = document.getElementById('rememberMe').checked;

            // Basic validation
            if (!email || !password) {
                showError('Vui lòng điền đầy đủ thông tin!');
                return;
            }

            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang đăng nhập...';
            submitBtn.classList.add('loading');

            try {
                // Simulate API call
                await simulateApiCall();

                // Mock login logic
                let userRole = 'patient'; // Default role

                // Check for special emails (demo purposes)
                if (email.includes('doctor') || email.includes('bacsi')) {
                    userRole = 'doctor';
                } else if (email.includes('staff') || email.includes('nhanvien')) {
                    userRole = 'staff';
                } else if (email.includes('admin')) {
                    userRole = 'admin';
                }

                // Store login info
                localStorage.setItem('medbooking_logged_in', 'true');
                localStorage.setItem('medbooking_user_role', userRole);
                localStorage.setItem('medbooking_user_email', email);

                if (rememberMe) {
                    localStorage.setItem('medbooking_remember_login', 'true');
                }

                // Show success message
                showSuccess('Đăng nhập thành công!');

                // Redirect to appropriate dashboard
                setTimeout(() => {
                    redirectToDashboard(userRole);
                }, 1000);

            } catch (error) {
                showError('Đăng nhập thất bại. Vui lòng kiểm tra thông tin và thử lại.');
                submitBtn.innerHTML = originalText;
                submitBtn.classList.remove('loading');
            }
        });
    }

    // Register form submission
    const registerForm = document.getElementById('registerFormContent');
    if (registerForm) {
        registerForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const firstName = document.getElementById('firstName').value.trim();
            const lastName = document.getElementById('lastName').value.trim();
            const email = document.getElementById('registerEmail').value.trim();
            const phone = document.getElementById('registerPhone').value.trim();
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const userRole = document.querySelector('input[name="userRole"]:checked').value;
            const agreeTerms = document.getElementById('agreeTerms').checked;

            // Validation
            if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
                showError('Vui lòng điền đầy đủ thông tin!');
                return;
            }

            if (!validateEmail(email)) {
                showError('Email không hợp lệ!');
                return;
            }

            if (!validatePhone(phone)) {
                showError('Số điện thoại không hợp lệ!');
                return;
            }

            if (password.length < 8) {
                showError('Mật khẩu phải có ít nhất 8 ký tự!');
                return;
            }

            if (password !== confirmPassword) {
                showError('Mật khẩu xác nhận không khớp!');
                return;
            }

            if (passwordStrength < 3) {
                showError('Mật khẩu quá yếu. Vui lòng chọn mật khẩu mạnh hơn!');
                return;
            }

            if (!agreeTerms) {
                showError('Vui lòng đồng ý với điều khoản sử dụng!');
                return;
            }

            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang đăng ký...';
            submitBtn.classList.add('loading');

            try {
                // Simulate API call
                await simulateApiCall();

                // Show success modal
                document.getElementById('successModal').style.display = 'block';

                // Reset form
                this.reset();

            } catch (error) {
                showError('Đăng ký thất bại. Vui lòng thử lại.');
                submitBtn.innerHTML = originalText;
                submitBtn.classList.remove('loading');
            }
        });
    }

    // Forgot password form submission
    const forgotPasswordForm = document.getElementById('forgotPasswordFormContent');
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const email = document.getElementById('resetEmail').value.trim();

            if (!email) {
                showError('Vui lòng nhập email!');
                return;
            }

            if (!validateEmail(email)) {
                showError('Email không hợp lệ!');
                return;
            }

            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang gửi...';
            submitBtn.classList.add('loading');

            try {
                // Simulate API call
                await simulateApiCall();

                showSuccess('Hướng dẫn đặt lại mật khẩu đã được gửi đến email của bạn!');
                switchToLogin();

            } catch (error) {
                showError('Gửi email thất bại. Vui lòng thử lại.');
            } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.classList.remove('loading');
            }
        });
    }

    // Password strength checking
    const passwordInput = document.getElementById('registerPassword');
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            checkPasswordStrength(this.value);
        });
    }

    // Phone number formatting
    const phoneInput = document.getElementById('registerPhone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            this.value = formatPhoneNumber(this.value);
        });
    }

    // Role selection change
    const roleInputs = document.querySelectorAll('input[name="userRole"]');
    roleInputs.forEach(input => {
        input.addEventListener('change', function() {
            // Update role selection visual
            document.querySelectorAll('.role-card').forEach(card => {
                card.classList.remove('selected');
            });

            if (this.checked) {
                this.parentElement.querySelector('.role-card').classList.add('selected');
            }
        });
    });
});

// Setup event listeners
function setupAuthEventListeners() {
    // Real-time validation
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });

        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });

    // Enter key support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && currentForm !== 'forgotPassword') {
            const activeForm = document.querySelector('.auth-form.active form');
            if (activeForm) {
                activeForm.dispatchEvent(new Event('submit'));
            }
        }
    });
}

// Validate individual field
function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name || field.id;

    // Clear previous error
    clearFieldError(field);

    // Required field validation
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'Trường này là bắt buộc');
        return false;
    }

    // Email validation
    if (field.type === 'email' && value && !validateEmail(value)) {
        showFieldError(field, 'Email không hợp lệ');
        return false;
    }

    // Phone validation
    if (field.type === 'tel' && value && !validatePhone(value)) {
        showFieldError(field, 'Số điện thoại không hợp lệ');
        return false;
    }

    // Password confirmation
    if (field.id === 'confirmPassword') {
        const password = document.getElementById('registerPassword').value;
        if (value && value !== password) {
            showFieldError(field, 'Mật khẩu xác nhận không khớp');
            return false;
        }
    }

    return true;
}

// Show field error
function showFieldError(field, message) {
    field.classList.add('error');
    field.classList.remove('success');

    // Create or update error message
    let errorElement = field.parentElement.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        field.parentElement.appendChild(errorElement);
    }
    errorElement.textContent = message;
}

// Clear field error
function clearFieldError(field) {
    field.classList.remove('error');
    field.classList.add('success');

    const errorElement = field.parentElement.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
}

// Social login functions
function loginWithGoogle() {
    showInfo('Đang chuyển hướng đến Google...');
    // Simulate OAuth redirect
    setTimeout(() => {
        // Mock successful login
        localStorage.setItem('medbooking_logged_in', 'true');
        localStorage.setItem('medbooking_user_role', 'patient');
        redirectToDashboard('patient');
    }, 2000);
}

function loginWithFacebook() {
    showInfo('Đang chuyển hướng đến Facebook...');
    // Simulate OAuth redirect
    setTimeout(() => {
        // Mock successful login
        localStorage.setItem('medbooking_logged_in', 'true');
        localStorage.setItem('medbooking_user_role', 'patient');
        redirectToDashboard('patient');
    }, 2000);
}

function registerWithGoogle() {
    showInfo('Đang chuyển hướng đến Google...');
    // Simulate OAuth redirect
    setTimeout(() => {
        // Show success modal
        document.getElementById('successModal').style.display = 'block';
    }, 2000);
}

function registerWithFacebook() {
    showInfo('Đang chuyển hướng đến Facebook...');
    // Simulate OAuth redirect
    setTimeout(() => {
        // Show success modal
        document.getElementById('successModal').style.display = 'block';
    }, 2000);
}

// Redirect to appropriate dashboard
function redirectToDashboard(role) {
    let dashboardUrl;

    switch (role) {
        case 'doctor':
            dashboardUrl = 'doctor-dashboard.html';
            break;
        case 'staff':
            dashboardUrl = 'staff-dashboard.html';
            break;
        case 'admin':
            dashboardUrl = 'admin-dashboard.html';
            break;
        default:
            dashboardUrl = 'patient-dashboard.html';
    }

    window.location.href = dashboardUrl;
}

// Close success modal
function closeSuccessModal() {
    document.getElementById('successModal').style.display = 'none';
    switchToLogin();
}

// Simulate API call
function simulateApiCall() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate random success/failure (90% success rate)
            if (Math.random() > 0.1) {
                resolve();
            } else {
                reject(new Error('API Error'));
            }
        }, 1500 + Math.random() * 1000); // 1.5-2.5 seconds
    });
}

// Notification functions
function showError(message) {
    // Remove existing notifications
    removeNotifications();

    // Create error notification
    const notification = document.createElement('div');
    notification.className = 'notification error';
    notification.innerHTML = `
        <i class="fas fa-exclamation-triangle"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

function showSuccess(message) {
    // Remove existing notifications
    removeNotifications();

    // Create success notification
    const notification = document.createElement('div');
    notification.className = 'notification success';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

function showInfo(message) {
    // Remove existing notifications
    removeNotifications();

    // Create info notification
    const notification = document.createElement('div');
    notification.className = 'notification info';
    notification.innerHTML = `
        <i class="fas fa-info-circle"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;

    document.body.appendChild(notification);

    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 3000);
}

function removeNotifications() {
    document.querySelectorAll('.notification').forEach(notification => {
        notification.remove();
    });
}

// Add notification styles dynamically
const notificationStyles = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border-radius: 8px;
        padding: 15px 20px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        min-width: 300px;
    }

    .notification.error {
        border-left: 4px solid #e74c3c;
    }

    .notification.error i {
        color: #e74c3c;
    }

    .notification.success {
        border-left: 4px solid #27ae60;
    }

    .notification.success i {
        color: #27ae60;
    }

    .notification.info {
        border-left: 4px solid #3498db;
    }

    .notification.info i {
        color: #3498db;
    }

    .notification button {
        background: none;
        border: none;
        font-size: 18px;
        color: #666;
        cursor: pointer;
        margin-left: auto;
    }

    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;

const notificationStyleSheet = document.createElement('style');
notificationStyleSheet.textContent = notificationStyles;
document.head.appendChild(notificationStyleSheet);

// Password strength bar styles
const passwordStrengthStyles = `
    .password-strength::after {
        background: var(--strength-color, #e1e5e9);
        width: var(--strength-width, 0%);
    }
`;

const passwordStyleSheet = document.createElement('style');
passwordStyleSheet.textContent = passwordStrengthStyles;
document.head.appendChild(passwordStyleSheet);






