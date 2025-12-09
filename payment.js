// Payment Page JavaScript

// Global variables
let selectedPaymentMethod = '';
let selectedBank = '';

// Initialize payment page
document.addEventListener('DOMContentLoaded', function() {
    initializePayment();
    setupPaymentEventListeners();
});

// Initialize payment page
function initializePayment() {
    // Set default payment method
    selectPaymentMethod('momo');

    // Format card number input
    setupCardFormatting();
}

// Setup event listeners
function setupPaymentEventListeners() {
    // File upload for bank transfer
    const fileInput = document.getElementById('transferReceipt');
    if (fileInput) {
        fileInput.addEventListener('change', handleFileUpload);
    }

    // Card expiry formatting
    const expiryInput = document.getElementById('expiryDate');
    if (expiryInput) {
        expiryInput.addEventListener('input', formatExpiryDate);
    }

    // CVV validation
    const cvvInput = document.getElementById('cvv');
    if (cvvInput) {
        cvvInput.addEventListener('input', validateCVV);
    }
}

// Select payment method
function selectPaymentMethod(method) {
    selectedPaymentMethod = method;

    // Update radio buttons
    const radios = document.querySelectorAll('input[name="paymentMethod"]');
    radios.forEach(radio => {
        radio.checked = radio.value === method;
    });

    // Hide all payment panels
    const panels = document.querySelectorAll('.payment-detail-panel');
    panels.forEach(panel => {
        panel.classList.remove('active');
    });

    // Show selected payment panel
    const selectedPanel = document.getElementById(method + 'Panel');
    if (selectedPanel) {
        selectedPanel.classList.add('active');
    }

    // Update pay button text
    updatePayButton();
}

// Update pay button based on selected method
function updatePayButton() {
    const payButton = document.getElementById('payButton');
    if (!payButton) return;

    let buttonText = 'Thanh toán 280,000 VND';
    let buttonIcon = 'fas fa-lock';

    switch (selectedPaymentMethod) {
        case 'momo':
            buttonText = 'Thanh toán MOMO';
            buttonIcon = 'fas fa-mobile-alt';
            break;
        case 'vnpay':
            buttonText = 'Thanh toán VNPAY';
            buttonIcon = 'fas fa-credit-card';
            break;
        case 'bank':
            buttonText = 'Xác nhận chuyển khoản';
            buttonIcon = 'fas fa-university';
            break;
        case 'card':
            buttonText = 'Thanh toán thẻ';
            buttonIcon = 'fas fa-credit-card';
            break;
    }

    payButton.innerHTML = `<i class="${buttonIcon}"></i> ${buttonText}`;
}

// Select bank for VNPAY
function selectBank(bankCode) {
    selectedBank = bankCode;

    // Remove selected class from all banks
    document.querySelectorAll('.bank-option').forEach(option => {
        option.classList.remove('selected');
    });

    // Add selected class to clicked bank
    event.target.closest('.bank-option').classList.add('selected');
}

// Process payment
function processPayment() {
    // Validate terms acceptance
    const acceptTerms = document.getElementById('acceptTerms').checked;
    if (!acceptTerms) {
        showError('Vui lòng đồng ý với điều khoản sử dụng!');
        return;
    }

    // Validate payment method specific requirements
    if (!validatePaymentMethod()) {
        return;
    }

    // Show processing modal
    showProcessingModal();

    // Simulate payment processing
    setTimeout(() => {
        hideProcessingModal();
        showSuccessModal();
    }, 3000);
}

// Validate payment method specific requirements
function validatePaymentMethod() {
    switch (selectedPaymentMethod) {
        case 'momo':
            return validateMomoPayment();
        case 'vnpay':
            return validateVnpayPayment();
        case 'bank':
            return validateBankPayment();
        case 'card':
            return validateCardPayment();
        default:
            showError('Vui lòng chọn phương thức thanh toán!');
            return false;
    }
}

// Validate MOMO payment
function validateMomoPayment() {
    // MOMO validation is handled by the user confirming they've paid
    return true;
}

// Validate VNPAY payment
function validateVnpayPayment() {
    if (!selectedBank) {
        showError('Vui lòng chọn ngân hàng!');
        return false;
    }
    return true;
}

// Validate bank transfer
function validateBankPayment() {
    const fileInput = document.getElementById('transferReceipt');
    if (!fileInput.files || fileInput.files.length === 0) {
        // Allow payment without receipt, but show warning
        return confirm('Bạn chưa tải lên hóa đơn chuyển khoản. Hệ thống sẽ xác nhận thanh toán trong vòng 5-15 phút. Tiếp tục?');
    }
    return true;
}

// Validate credit card payment
function validateCardPayment() {
    const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
    const expiryDate = document.getElementById('expiryDate').value;
    const cvv = document.getElementById('cvv').value;
    const cardName = document.getElementById('cardName').value.trim();

    // Card number validation
    if (!cardNumber || cardNumber.length < 13 || cardNumber.length > 19) {
        showError('Số thẻ không hợp lệ!');
        return false;
    }

    // Expiry date validation
    if (!expiryDate || !/^\d{2}\/\d{2}$/.test(expiryDate)) {
        showError('Ngày hết hạn không hợp lệ!');
        return false;
    }

    // CVV validation
    if (!cvv || cvv.length < 3 || cvv.length > 4) {
        showError('CVV không hợp lệ!');
        return false;
    }

    // Card name validation
    if (!cardName) {
        showError('Vui lòng nhập tên chủ thẻ!');
        return false;
    }

    return true;
}

// Confirm MOMO payment
function confirmMomoPayment() {
    if (confirm('Bạn đã thanh toán qua MOMO?')) {
        selectPaymentMethod('momo');
        processPayment();
    }
}

// Open MOMO app
function openMomoApp() {
    // In a real implementation, this would open the MOMO app
    alert('Đang mở ứng dụng MOMO...');
    window.open('https://momo.vn/', '_blank');
}

// Proceed to VNPAY
function proceedToVnpay() {
    if (!validateVnpayPayment()) return;

    // In a real implementation, this would redirect to VNPAY
    alert('Đang chuyển hướng đến cổng thanh toán VNPAY...');
    window.open('https://vnpay.vn/', '_blank');
}

// Confirm bank transfer
function confirmBankTransfer() {
    if (confirm('Bạn đã chuyển khoản thành công?')) {
        selectPaymentMethod('bank');
        processPayment();
    }
}

// Process card payment
function processCardPayment() {
    if (validateCardPayment()) {
        selectPaymentMethod('card');
        processPayment();
    }
}

// Handle file upload for bank transfer
function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
        if (!allowedTypes.includes(file.type)) {
            showError('Chỉ chấp nhận file ảnh (JPG, PNG, GIF) hoặc PDF!');
            event.target.value = '';
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            showError('File không được vượt quá 5MB!');
            event.target.value = '';
            return;
        }

        showSuccess('Đã tải lên hóa đơn chuyển khoản thành công!');
    }
}

// Setup card formatting
function setupCardFormatting() {
    const cardNumberInput = document.getElementById('cardNumber');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', formatCardNumber);
    }
}

// Format card number
function formatCardNumber(event) {
    let value = event.target.value.replace(/\s/g, '');
    value = value.replace(/\D/g, '');
    value = value.replace(/(\d{4})/g, '$1 ').trim();
    event.target.value = value;
}

// Format expiry date
function formatExpiryDate(event) {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    event.target.value = value;
}

// Validate CVV
function validateCVV(event) {
    let value = event.target.value.replace(/\D/g, '');
    event.target.value = value;
}

// Go back to previous page
function goBack() {
    if (confirm('Bạn có chắc muốn quay lại? Thông tin thanh toán sẽ không được lưu.')) {
        window.history.back();
    }
}

// Show processing modal
function showProcessingModal() {
    document.getElementById('processingModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Hide processing modal
function hideProcessingModal() {
    document.getElementById('processingModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Show success modal
function showSuccessModal() {
    // Update transaction details
    const now = new Date();
    document.getElementById('transactionTime').textContent = now.toLocaleString('vi-VN');

    const methodNames = {
        'momo': 'MOMO',
        'vnpay': 'VNPAY',
        'bank': 'Chuyển khoản ngân hàng',
        'card': 'Thẻ tín dụng'
    };
    document.getElementById('paymentMethodUsed').textContent = methodNames[selectedPaymentMethod] || selectedPaymentMethod;

    // Show modal
    document.getElementById('successModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Download receipt
function downloadReceipt() {
    // In a real implementation, this would download a PDF receipt
    alert('Đang tải hóa đơn...');
    // Simulate download
    setTimeout(() => {
        showSuccess('Hóa đơn đã được tải xuống!');
    }, 1000);
}

// Go to dashboard
function goToDashboard() {
    // Redirect to patient dashboard
    window.location.href = 'patient-dashboard.html';
}

// Utility functions
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

// Social login placeholders
function loginWithGoogle() {
    alert('Đăng nhập bằng Google sẽ được triển khai trong phiên bản tiếp theo.');
}

function loginWithFacebook() {
    alert('Đăng nhập bằng Facebook sẽ được triển khai trong phiên bản tiếp theo.');
}

function registerWithGoogle() {
    alert('Đăng ký bằng Google sẽ được triển khai trong phiên bản tiếp theo.');
}

function registerWithFacebook() {
    alert('Đăng ký bằng Facebook sẽ được triển khai trong phiên bản tiếp theo.');
}






