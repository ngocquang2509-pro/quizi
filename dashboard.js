// Dashboard JavaScript

// Global variables
let currentSection = 'dashboard';
let currentBookingStep = 1;
let selectedSpecialty = '';
let selectedDoctor = '';
let selectedDate = '';
let selectedTime = '';

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
    setupEventListeners();
});

function initializeDashboard() {
    // Show default section
    showSection('dashboard');

    // Initialize booking form
    updateBookingForm();

    // Initialize profile tabs
    showProfileTab('personal');
}

// Navigation Functions
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });

    // Show selected section
    document.getElementById(sectionId + '-section').classList.add('active');

    // Update navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });

    document.querySelector(`[onclick="showSection('${sectionId}')"]`).classList.add('active');

    currentSection = sectionId;
}

// Notification Functions
function toggleNotifications() {
    const dropdown = document.getElementById('notificationDropdown');
    const userDropdown = document.getElementById('userDropdown');

    // Close user dropdown if open
    userDropdown.style.display = 'none';

    // Toggle notifications dropdown
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

function toggleUserMenu() {
    const dropdown = document.getElementById('userDropdown');
    const notificationDropdown = document.getElementById('notificationDropdown');

    // Close notifications dropdown if open
    notificationDropdown.style.display = 'none';

    // Toggle user dropdown
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

// Booking Functions
function selectSpecialty(specialty) {
    selectedSpecialty = specialty;
    nextStep();
}

function selectDoctor(doctorId) {
    selectedDoctor = doctorId;
    nextStep();
}

function selectDate(date) {
    selectedDate = date;
    // Remove selected class from all dates
    document.querySelectorAll('.calendar-day.available').forEach(day => {
        day.classList.remove('selected');
    });
    // Add selected class to clicked date
    event.target.classList.add('selected');
}

function selectTime(time) {
    selectedTime = time;
    // Remove selected class from all time slots
    document.querySelectorAll('.time-slot.available').forEach(slot => {
        slot.classList.remove('selected');
    });
    // Add selected class to clicked time slot
    event.target.classList.add('selected');
}

function updateBookingForm() {
    // Update step indicators
    document.querySelectorAll('.step').forEach((step, index) => {
        const stepNumber = index + 1;
        if (stepNumber < currentBookingStep) {
            step.classList.add('completed');
            step.classList.remove('active');
        } else if (stepNumber === currentBookingStep) {
            step.classList.add('active');
            step.classList.remove('completed');
        } else {
            step.classList.remove('active', 'completed');
        }
    });

    // Show current step content
    document.querySelectorAll('.booking-step').forEach((step, index) => {
        if (index + 1 === currentBookingStep) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });

    // Update navigation buttons
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    prevBtn.disabled = currentBookingStep === 1;
    nextBtn.textContent = currentBookingStep === 4 ? 'Xác nhận đặt lịch' : 'Tiếp tục';

    if (currentBookingStep === 4) {
        updateConfirmationDetails();
    }
}

function nextStep() {
    if (currentBookingStep < 4) {
        currentBookingStep++;
        updateBookingForm();
    } else {
        confirmBooking();
    }
}

function prevStep() {
    if (currentBookingStep > 1) {
        currentBookingStep--;
        updateBookingForm();
    }
}

function updateConfirmationDetails() {
    // Update confirmation details based on selections
    const doctorNames = {
        1: 'BS. Nguyễn Văn A',
        2: 'BS. Trần Văn B'
    };

    document.getElementById('confirm-doctor').textContent = doctorNames[selectedDoctor] || 'Chưa chọn';
    document.getElementById('confirm-date').textContent = selectedDate || 'Chưa chọn';
    document.getElementById('confirm-time').textContent = selectedTime || 'Chưa chọn';
}

function confirmBooking() {
    // Show success message
    alert('Đặt lịch thành công! Bạn sẽ nhận được xác nhận qua email và SMS.');

    // Reset booking form
    currentBookingStep = 1;
    selectedSpecialty = '';
    selectedDoctor = '';
    selectedDate = '';
    selectedTime = '';

    // Return to dashboard
    showSection('dashboard');

    updateBookingForm();
}

// Calendar Functions
function prevMonth() {
    // Implement calendar navigation
    console.log('Previous month');
}

function nextMonth() {
    // Implement calendar navigation
    console.log('Next month');
}

// Appointments Functions
function filterAppointments(filter) {
    // Update filter tabs
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.classList.remove('active');
    });

    event.target.classList.add('active');

    // Filter appointments (implement logic based on filter)
    console.log('Filtering appointments:', filter);
}

// Profile Functions
function showProfileTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.profile-tab').forEach(tab => {
        tab.classList.remove('active');
    });

    // Show selected tab
    document.getElementById(tabName + '-tab').classList.add('active');

    // Update navigation
    document.querySelectorAll('.profile-nav-item').forEach(item => {
        item.classList.remove('active');
    });

    event.target.classList.add('active');
}

// Form Validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (input.value.trim() === '') {
            input.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            input.style.borderColor = '#2ecc71';
        }
    });

    return isValid;
}

// Event Listeners
function setupEventListeners() {
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(event) {
        const notifications = document.querySelector('.notifications');
        const userMenu = document.querySelector('.user-menu');
        const notificationDropdown = document.getElementById('notificationDropdown');
        const userDropdown = document.getElementById('userDropdown');

        if (!notifications.contains(event.target)) {
            notificationDropdown.style.display = 'none';
        }

        if (!userMenu.contains(event.target)) {
            userDropdown.style.display = 'none';
        }
    });

    // Calendar day selection
    document.querySelectorAll('.calendar-day.available').forEach(day => {
        day.addEventListener('click', function() {
            selectDate(this.textContent);
        });
    });

    // Time slot selection
    document.querySelectorAll('.time-slot.available').forEach(slot => {
        slot.addEventListener('click', function() {
            selectTime(this.textContent);
        });
    });

    // Form submissions
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            if (validateForm(this)) {
                // Handle form submission
                const formData = new FormData(this);
                console.log('Form submitted:', Object.fromEntries(formData));

                // Show success message
                alert('Cập nhật thông tin thành công!');

                // Reset form validation
                this.querySelectorAll('input, select, textarea').forEach(input => {
                    input.style.borderColor = '#e1e5e9';
                });
            } else {
                alert('Vui lòng điền đầy đủ thông tin!');
            }
        });
    });

    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            // Implement search logic
            console.log('Searching:', searchTerm);
        });
    }

    // Specialty selection
    document.querySelectorAll('.specialty-card').forEach(card => {
        card.addEventListener('click', function() {
            // Remove selected class from all cards
            document.querySelectorAll('.specialty-card').forEach(c => c.classList.remove('selected'));
            // Add selected class to clicked card
            this.classList.add('selected');
        });
    });

    // Doctor selection
    document.querySelectorAll('.doctor-card.selectable').forEach(card => {
        card.addEventListener('click', function() {
            // Remove selected class from all cards
            document.querySelectorAll('.doctor-card.selectable').forEach(c => c.classList.remove('selected'));
            // Add selected class to clicked card
            this.classList.add('selected');
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Close dropdowns with Escape key
        if (e.key === 'Escape') {
            document.getElementById('notificationDropdown').style.display = 'none';
            document.getElementById('userDropdown').style.display = 'none';
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Utility Functions
function formatDate(date) {
    return new Intl.DateTimeFormat('vi-VN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(new Date(date));
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);
}

// Responsive adjustments
function handleResize() {
    const width = window.innerWidth;

    if (width <= 768) {
        // Mobile adjustments
        document.querySelectorAll('.stats-grid').forEach(grid => {
            grid.style.gridTemplateColumns = '1fr';
        });
    } else {
        // Desktop adjustments
        document.querySelectorAll('.stats-grid').forEach(grid => {
            grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(250px, 1fr))';
        });
    }
}

// Initialize responsive handling
window.addEventListener('resize', handleResize);
handleResize();

// Loading states
function showLoading(element) {
    element.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang tải...';
    element.disabled = true;
}

function hideLoading(element, originalText) {
    element.innerHTML = originalText;
    element.disabled = false;
}

// Error handling
function showError(message) {
    // Create error toast
    const toast = document.createElement('div');
    toast.className = 'error-toast';
    toast.innerHTML = `
        <i class="fas fa-exclamation-triangle"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;

    // Add to page
    document.body.appendChild(toast);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (toast.parentElement) {
            toast.remove();
        }
    }, 5000);
}

// Success messages
function showSuccess(message) {
    // Create success toast
    const toast = document.createElement('div');
    toast.className = 'success-toast';
    toast.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;

    // Add to page
    document.body.appendChild(toast);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (toast.parentElement) {
            toast.remove();
        }
    }, 5000);
}

// Add toast styles dynamically
const toastStyles = `
    .error-toast, .success-toast {
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
    }

    .error-toast {
        border-left: 4px solid #e74c3c;
    }

    .error-toast i {
        color: #e74c3c;
    }

    .success-toast {
        border-left: 4px solid #27ae60;
    }

    .success-toast i {
        color: #27ae60;
    }

    .error-toast button, .success-toast button {
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

// Add styles to head
const styleSheet = document.createElement('style');
styleSheet.textContent = toastStyles;
document.head.appendChild(styleSheet);

// Prescriptions Functions
function filterPrescriptions() {
    const filter = document.querySelector('.prescription-filters select').value;
    console.log('Filtering prescriptions by:', filter);
    showSuccess(`Đã lọc đơn thuốc theo: ${getPrescriptionFilterLabel(filter)}`);
}

function filterPrescriptionDate() {
    const filter = document.querySelectorAll('.prescription-filters select')[1].value;
    console.log('Filtering prescriptions by date:', filter);
    showSuccess(`Đã lọc theo thời gian: ${getPrescriptionDateLabel(filter)}`);
}

function getPrescriptionFilterLabel(filter) {
    const labels = {
        'all': 'Tất cả',
        'active': 'Đang sử dụng',
        'completed': 'Đã hoàn thành',
        'expired': 'Đã hết hạn'
    };
    return labels[filter] || filter;
}

function getPrescriptionDateLabel(date) {
    const labels = {
        'all': 'Tất cả',
        'recent': 'Gần đây',
        'month': 'Tháng này',
        'year': 'Năm nay'
    };
    return labels[date] || date;
}

function searchPrescriptions() {
    const searchTerm = document.querySelector('.prescriptions-toolbar .search-box input').value.toLowerCase();
    console.log('Searching prescriptions:', searchTerm);
    if (searchTerm) {
        showSuccess(`Tìm thấy kết quả cho: "${searchTerm}"`);
    }
}

function viewPrescription(id) {
    console.log('Viewing prescription:', id);
    alert('Tính năng xem chi tiết đơn thuốc sẽ được triển khai trong phiên bản tiếp theo.');
}

function requestRefill(id) {
    if (confirm('Bạn có chắc muốn yêu cầu cấp lại đơn thuốc này?')) {
        console.log('Requesting refill for prescription:', id);
        showSuccess('Yêu cầu cấp lại đơn thuốc đã được gửi thành công.');
    }
}

function downloadPrescription(id) {
    console.log('Downloading prescription:', id);
    alert('Đang tải xuống đơn thuốc...');
    setTimeout(() => {
        showSuccess('Đơn thuốc đã được tải xuống thành công!');
    }, 2000);
}

// Payments Functions
function filterPayments() {
    const filter = document.querySelector('.payment-filters select').value;
    console.log('Filtering payments by:', filter);
    showSuccess(`Đã lọc thanh toán theo: ${getPaymentFilterLabel(filter)}`);
}

function filterPaymentDate() {
    const filter = document.querySelectorAll('.payment-filters select')[1].value;
    console.log('Filtering payments by date:', filter);
    showSuccess(`Đã lọc theo thời gian: ${getPaymentDateLabel(filter)}`);
}

function getPaymentFilterLabel(filter) {
    const labels = {
        'all': 'Tất cả',
        'completed': 'Hoàn thành',
        'pending': 'Đang xử lý',
        'failed': 'Thất bại'
    };
    return labels[filter] || filter;
}

function getPaymentDateLabel(date) {
    const labels = {
        'all': 'Tất cả',
        'month': 'Tháng này',
        'quarter': 'Quý này',
        'year': 'Năm nay'
    };
    return labels[date] || date;
}

function searchPayments() {
    const searchTerm = document.querySelector('.payments-toolbar .search-box input').value.toLowerCase();
    console.log('Searching payments:', searchTerm);
    if (searchTerm) {
        showSuccess(`Tìm thấy kết quả cho: "${searchTerm}"`);
    }
}

function exportPayments() {
    alert('Đang xuất lịch sử thanh toán...');
    setTimeout(() => {
        showSuccess('Lịch sử thanh toán đã được xuất thành công!');
    }, 2000);
}

function viewPayment(id) {
    console.log('Viewing payment:', id);
    alert('Tính năng xem chi tiết thanh toán sẽ được triển khai trong phiên bản tiếp theo.');
}

function downloadReceipt(id) {
    console.log('Downloading receipt for payment:', id);
    alert('Đang tải xuống hóa đơn...');
    setTimeout(() => {
        showSuccess('Hóa đơn đã được tải xuống thành công!');
    }, 2000);
}

// Feedback Functions
function showAddFeedbackModal() {
    alert('Tính năng thêm đánh giá mới sẽ được triển khai trong phiên bản tiếp theo.');
}

function editFeedback(id) {
    console.log('Editing feedback:', id);
    alert('Tính năng chỉnh sửa đánh giá sẽ được triển khai trong phiên bản tiếp theo.');
}

function deleteFeedback(id) {
    if (confirm('Bạn có chắc muốn xóa đánh giá này?')) {
        console.log('Deleting feedback:', id);
        showSuccess('Đánh giá đã được xóa thành công.');
    }
}

// Export functions for global access
window.showSection = showSection;
window.toggleNotifications = toggleNotifications;
window.toggleUserMenu = toggleUserMenu;
window.selectSpecialty = selectSpecialty;
window.selectDoctor = selectDoctor;
window.selectDate = selectDate;
window.selectTime = selectTime;
window.updateBookingForm = updateBookingForm;
window.nextStep = nextStep;
window.prevStep = prevStep;
window.confirmBooking = confirmBooking;
window.prevMonth = prevMonth;
window.nextMonth = nextMonth;
window.filterAppointments = filterAppointments;
window.showProfileTab = showProfileTab;

// New export functions
window.filterPrescriptions = filterPrescriptions;
window.filterPrescriptionDate = filterPrescriptionDate;
window.searchPrescriptions = searchPrescriptions;
window.viewPrescription = viewPrescription;
window.requestRefill = requestRefill;
window.downloadPrescription = downloadPrescription;

window.filterPayments = filterPayments;
window.filterPaymentDate = filterPaymentDate;
window.searchPayments = searchPayments;
window.exportPayments = exportPayments;
window.viewPayment = viewPayment;
window.downloadReceipt = downloadReceipt;

window.showAddFeedbackModal = showAddFeedbackModal;
window.editFeedback = editFeedback;
window.deleteFeedback = deleteFeedback;

