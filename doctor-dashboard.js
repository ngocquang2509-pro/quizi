// Doctor Dashboard JavaScript

// Global variables
let currentSection = 'overview';
let currentAppointmentFilter = 'all';
let currentFeedbackFilter = 'all';

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    initializeDoctorDashboard();
    setupDoctorEventListeners();
    updateCurrentDate();
});

function initializeDoctorDashboard() {
    // Show default section
    showSection('overview');

    // Initialize current date
    updateCurrentDate();
}

// Update current date display
function updateCurrentDate() {
    const now = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    const formattedDate = now.toLocaleDateString('vi-VN', options);
    document.getElementById('currentDate').textContent = formattedDate;
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

// Appointment Functions
function filterAppointments(filter) {
    currentAppointmentFilter = filter;

    // Update filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    event.target.classList.add('active');

    // Filter appointments (implement logic based on filter)
    console.log('Filtering appointments:', filter);

    // Here you would typically filter the appointments list
    // For demo purposes, we'll just show an alert
    showSuccess(`Đã lọc theo: ${getFilterLabel(filter)}`);
}

function getFilterLabel(filter) {
    const labels = {
        'all': 'Tất cả',
        'waiting': 'Chờ khám',
        'in-progress': 'Đang khám',
        'completed': 'Hoàn thành'
    };
    return labels[filter] || filter;
}

function startConsultation(appointmentId) {
    // Open consultation modal
    document.getElementById('consultationModal').style.display = 'block';
    document.body.style.overflow = 'hidden';

    // Load patient data (mock data for demo)
    console.log('Starting consultation for appointment:', appointmentId);
}

function completeConsultation(appointmentId) {
    if (confirm('Bạn có chắc muốn hoàn thành buổi khám này?')) {
        // Update appointment status
        console.log('Completing consultation for appointment:', appointmentId);
        showSuccess('Buổi khám đã được hoàn thành thành công!');

        // Refresh appointments list
        // In a real app, this would trigger a data refresh
    }
}

function viewPatientRecord(patientId) {
    // Navigate to patient records section
    showSection('medical-records');
    console.log('Viewing patient record:', patientId);
}

function rescheduleAppointment(appointmentId) {
    const newDate = prompt('Nhập ngày mới (DD/MM/YYYY):');
    const newTime = prompt('Nhập giờ mới (HH:MM):');

    if (newDate && newTime) {
        console.log('Rescheduling appointment:', appointmentId, 'to', newDate, newTime);
        showSuccess('Lịch khám đã được dời thành công!');
    }
}

function addPrescription(appointmentId) {
    // Open prescription modal or navigate to prescription section
    showSection('prescriptions');
    console.log('Adding prescription for appointment:', appointmentId);
}

function viewConsultationSummary(appointmentId) {
    // Show consultation summary modal
    console.log('Viewing consultation summary for appointment:', appointmentId);
    alert('Tính năng xem tóm tắt khám sẽ được triển khai trong phiên bản tiếp theo.');
}

// Medical Records Functions
function createNewRecord() {
    alert('Tính năng tạo hồ sơ mới sẽ được triển khai trong phiên bản tiếp theo.');
}

function updateRecord(recordId) {
    console.log('Updating record:', recordId);
    alert('Tính năng cập nhật hồ sơ sẽ được triển khai trong phiên bản tiếp theo.');
}

function viewFullRecord(recordId) {
    console.log('Viewing full record:', recordId);
    alert('Tính năng xem hồ sơ đầy đủ sẽ được triển khai trong phiên bản tiếp theo.');
}

function addNote(recordId) {
    const note = prompt('Nhập ghi chú mới:');
    if (note) {
        console.log('Adding note to record:', recordId, note);
        showSuccess('Ghi chú đã được thêm thành công!');
    }
}

// Feedback Functions
function filterFeedback(filter) {
    currentFeedbackFilter = filter;

    // Update filter tabs
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.classList.remove('active');
    });

    event.target.classList.add('active');

    // Filter feedback (implement logic based on filter)
    console.log('Filtering feedback:', filter);
}

function replyToFeedback(feedbackId) {
    const reply = prompt('Nhập phản hồi của bạn:');
    if (reply) {
        console.log('Replying to feedback:', feedbackId, reply);
        showSuccess('Phản hồi đã được gửi thành công!');
    }
}

// Consultation Modal Functions
function closeConsultationModal() {
    document.getElementById('consultationModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function saveDraft() {
    // Save consultation data as draft
    console.log('Saving consultation draft...');
    showSuccess('Dữ liệu đã được lưu nháp!');
}

function completeConsultationModal() {
    if (confirm('Bạn có chắc muốn hoàn thành buổi khám này?')) {
        // Validate required fields
        const requiredFields = document.querySelectorAll('#consultationModal input[required], #consultationModal textarea[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = '#e74c3c';
                isValid = false;
            } else {
                field.style.borderColor = '#2ecc71';
            }
        });

        if (isValid) {
            // Save consultation data
            console.log('Completing consultation...');

            // Close modal
            closeConsultationModal();

            // Show success message
            showSuccess('Buổi khám đã được hoàn thành thành công!');

            // Refresh dashboard
            showSection('overview');
        } else {
            alert('Vui lòng điền đầy đủ thông tin bắt buộc!');
        }
    }
}

// Event Listeners
function setupDoctorEventListeners() {
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

    // Close consultation modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeConsultationModal();
            document.getElementById('notificationDropdown').style.display = 'none';
            document.getElementById('userDropdown').style.display = 'none';
        }
    });

    // Search functionality
    const searchInputs = document.querySelectorAll('.search-box input');
    searchInputs.forEach(input => {
        input.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            console.log('Searching:', searchTerm);
            // Implement search logic here
        });
    });

    // Filter selects
    const filterSelects = document.querySelectorAll('.filter-select');
    filterSelects.forEach(select => {
        select.addEventListener('change', function() {
            const filterValue = this.value;
            console.log('Filtering by:', filterValue);
            // Implement filter logic here
        });
    });

    // Form validation for consultation modal
    document.querySelectorAll('#consultationModal input, #consultationModal textarea').forEach(field => {
        field.addEventListener('blur', function() {
            if (this.value.trim()) {
                this.style.borderColor = '#2ecc71';
            } else if (this.hasAttribute('required')) {
                this.style.borderColor = '#e74c3c';
            } else {
                this.style.borderColor = '#e1e5e9';
            }
        });
    });

    // Auto-resize textareas
    document.querySelectorAll('textarea').forEach(textarea => {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });
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

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K for search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.querySelector('.search-box input');
            if (searchInput) {
                searchInput.focus();
            }
        }

        // Ctrl/Cmd + 1-9 for quick navigation
        if (e.ctrlKey || e.metaKey) {
            const number = parseInt(e.key);
            if (number >= 1 && number <= 9) {
                e.preventDefault();
                const navItems = document.querySelectorAll('.nav-item');
                if (navItems[number - 1]) {
                    const sectionId = navItems[number - 1].getAttribute('onclick').match(/showSection\('(.+?)'\)/)[1];
                    showSection(sectionId);
                }
            }
        }
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

function formatTime(time) {
    return time; // Assuming time is already in HH:MM format
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);
}

// Real-time updates simulation
function simulateRealTimeUpdates() {
    // Simulate new appointment notification
    setTimeout(() => {
        showNotification('Lịch hẹn mới với bệnh nhân Trần Thị D vào 14:00', 'appointment');
    }, 30000); // 30 seconds

    // Simulate appointment reminder
    setTimeout(() => {
        showNotification('Nhắc nhở: Lịch khám với bệnh nhân Lê Văn E trong 15 phút', 'reminder');
    }, 60000); // 1 minute
}

// Start real-time updates
simulateRealTimeUpdates();

// Notification system
function showNotification(message, type = 'info') {
    // Update notification badge
    const badge = document.querySelector('.notification-badge');
    if (badge) {
        const currentCount = parseInt(badge.textContent) || 0;
        badge.textContent = currentCount + 1;
        badge.style.display = 'flex';
    }

    // Add to notification dropdown
    const notificationList = document.querySelector('.notification-list');
    if (notificationList) {
        const notificationItem = document.createElement('div');
        notificationItem.className = `notification-item unread`;
        notificationItem.innerHTML = `
            <div class="notification-icon">
                <i class="fas fa-${getNotificationIcon(type)}"></i>
            </div>
            <div class="notification-content">
                <p>${message}</p>
                <span class="notification-time">Bây giờ</span>
            </div>
        `;

        notificationList.insertBefore(notificationItem, notificationList.firstChild);
    }

    // Show browser notification if permitted
    if (Notification.permission === 'granted') {
        new Notification('MedBooking - Thông báo mới', {
            body: message,
            icon: '/favicon.ico'
        });
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission();
    }
}

function getNotificationIcon(type) {
    const icons = {
        'appointment': 'calendar-plus',
        'reminder': 'clock',
        'message': 'envelope',
        'feedback': 'star',
        'info': 'info-circle'
    };
    return icons[type] || 'bell';
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
const doctorToastStyles = `
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
const doctorStyleSheet = document.createElement('style');
doctorStyleSheet.textContent = doctorToastStyles;
document.head.appendChild(doctorStyleSheet);

// Export functions for global access
window.showSection = showSection;
window.toggleNotifications = toggleNotifications;
window.toggleUserMenu = toggleUserMenu;
window.filterAppointments = filterAppointments;
window.startConsultation = startConsultation;
window.completeConsultation = completeConsultation;
window.viewPatientRecord = viewPatientRecord;
window.rescheduleAppointment = rescheduleAppointment;
window.addPrescription = addPrescription;
window.viewConsultationSummary = viewConsultationSummary;
window.createNewRecord = createNewRecord;
window.updateRecord = updateRecord;
window.viewFullRecord = viewFullRecord;
window.addNote = addNote;
window.filterFeedback = filterFeedback;
window.replyToFeedback = replyToFeedback;
window.closeConsultationModal = closeConsultationModal;
window.saveDraft = saveDraft;
window.completeConsultationModal = completeConsultationModal;






