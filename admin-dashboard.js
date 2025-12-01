// Admin Dashboard JavaScript

// Global variables
let currentSection = 'overview';
let currentUserFilter = 'all';
let currentUserStatusFilter = 'all';

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    initializeAdminDashboard();
    setupAdminEventListeners();
    initializeCharts();
});

function initializeAdminDashboard() {
    // Show default section
    showSection('overview');

    // Initialize system monitoring
    startSystemMonitoring();
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

// Chart Initialization
function initializeCharts() {
    // Initialize Chart.js if available
    if (typeof Chart !== 'undefined') {
        // Appointments Chart
        const appointmentsCtx = document.getElementById('appointmentsChart');
        if (appointmentsCtx) {
            new Chart(appointmentsCtx, {
                type: 'line',
                data: {
                    labels: ['Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11'],
                    datasets: [{
                        label: 'Lịch hẹn',
                        data: [650, 780, 920, 1100, 1350, 1547],
                        borderColor: '#4A90E2',
                        backgroundColor: 'rgba(74, 144, 226, 0.1)',
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }

        // Users Chart
        const usersCtx = document.getElementById('usersChart');
        if (usersCtx) {
            new Chart(usersCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Bệnh nhân', 'Bác sĩ', 'Nhân viên', 'Admin'],
                    datasets: [{
                        data: [12456, 89, 45, 5],
                        backgroundColor: [
                            '#4A90E2',
                            '#27ae60',
                            '#f39c12',
                            '#9b59b6'
                        ],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });
        }
    }
}

// System Monitoring
function startSystemMonitoring() {
    // Update system status every 30 seconds
    setInterval(() => {
        updateSystemStatus();
    }, 30000);

    // Initial status update
    updateSystemStatus();
}

function updateSystemStatus() {
    // Simulate system status updates
    const statuses = ['healthy', 'warning', 'healthy', 'healthy'];
    const statusElements = document.querySelectorAll('.health-info p:first-of-type .status');

    statusElements.forEach((element, index) => {
        const status = statuses[index];
        element.className = 'status ' + status;
        element.textContent = status === 'healthy' ? 'Hoạt động tốt' : 'Quá tải nhẹ';
    });
}

// User Management Functions
function filterUsers() {
    const roleFilter = document.querySelector('.filter-select').value;
    currentUserFilter = roleFilter;

    // Filter users based on role
    console.log('Filtering users by role:', roleFilter);

    // Here you would typically filter the table rows
    showSuccess(`Đã lọc theo vai trò: ${getRoleLabel(roleFilter)}`);
}

function filterUserStatus() {
    const statusFilter = document.querySelectorAll('.filter-select')[1].value;
    currentUserStatusFilter = statusFilter;

    // Filter users based on status
    console.log('Filtering users by status:', statusFilter);

    // Here you would typically filter the table rows
    showSuccess(`Đã lọc theo trạng thái: ${getStatusLabel(statusFilter)}`);
}

function getRoleLabel(role) {
    const labels = {
        'all': 'Tất cả',
        'patient': 'Bệnh nhân',
        'doctor': 'Bác sĩ',
        'staff': 'Nhân viên',
        'admin': 'Quản trị viên'
    };
    return labels[role] || role;
}

function getStatusLabel(status) {
    const labels = {
        'all': 'Tất cả',
        'active': 'Hoạt động',
        'inactive': 'Không hoạt động',
        'suspended': 'Tạm khóa'
    };
    return labels[status] || status;
}

function searchUsers() {
    const searchTerm = document.querySelector('.search-box input').value.toLowerCase();
    console.log('Searching users:', searchTerm);

    // Here you would typically filter table rows based on search term
    if (searchTerm) {
        showSuccess(`Tìm thấy kết quả cho: "${searchTerm}"`);
    }
}

function addNewUser() {
    // Reset form
    document.getElementById('userForm').reset();
    document.getElementById('userModalTitle').textContent = 'Thêm người dùng mới';
    document.getElementById('doctorFields').style.display = 'none';

    // Show modal
    document.getElementById('userModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function viewUser(userId) {
    console.log('Viewing user:', userId);
    // Open user details modal or navigate to user details page
    alert('Tính năng xem chi tiết người dùng sẽ được triển khai trong phiên bản tiếp theo.');
}

function editUser(userId) {
    // Load user data and show modal
    document.getElementById('userModalTitle').textContent = 'Chỉnh sửa người dùng';

    // Mock data loading
    document.getElementById('userFirstName').value = 'Nguyễn';
    document.getElementById('userLastName').value = 'Thị A';
    document.getElementById('userEmail').value = 'nguyenthia@email.com';
    document.getElementById('userPhone').value = '0987654321';
    document.getElementById('userRole').value = 'patient';
    document.getElementById('userStatus').value = 'active';

    // Show modal
    document.getElementById('userModal').style.display = 'block';
    document.body.style.overflow = 'hidden';

    console.log('Editing user:', userId);
}

function suspendUser(userId) {
    if (confirm('Bạn có chắc muốn khóa tài khoản này?')) {
        console.log('Suspending user:', userId);
        showSuccess('Tài khoản đã được khóa thành công!');
    }
}

function closeUserModal() {
    document.getElementById('userModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Settings Functions
function editSetting(settingKey) {
    const newValue = prompt(`Nhập giá trị mới cho ${settingKey}:`);
    if (newValue) {
        console.log('Updating setting:', settingKey, 'to:', newValue);
        showSuccess('Cài đặt đã được cập nhật thành công!');
    }
}

function backupNow() {
    if (confirm('Bắt đầu sao lưu dữ liệu? Quá trình này có thể mất vài phút.')) {
        // Show loading state
        const btn = event.target;
        const originalText = btn.textContent;
        btn.textContent = 'Đang sao lưu...';
        btn.disabled = true;

        // Simulate backup process
        setTimeout(() => {
            btn.textContent = originalText;
            btn.disabled = false;
            showSuccess('Sao lưu dữ liệu hoàn thành thành công!');
        }, 3000);
    }
}

function clearCache() {
    if (confirm('Xóa tất cả cache? Hành động này không thể hoàn tác.')) {
        console.log('Clearing system cache...');
        showSuccess('Cache đã được xóa thành công!');
    }
}

function checkUpdates() {
    // Show loading state
    const btn = event.target;
    const originalText = btn.textContent;
    btn.textContent = 'Đang kiểm tra...';
    btn.disabled = true;

    // Simulate update check
    setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        alert('Hệ thống đã cập nhật phiên bản mới nhất!');
    }, 2000);
}

// Form Handling
document.addEventListener('DOMContentLoaded', function() {
    // User role change handler
    const userRoleSelect = document.getElementById('userRole');
    if (userRoleSelect) {
        userRoleSelect.addEventListener('change', function() {
            const doctorFields = document.getElementById('doctorFields');
            if (this.value === 'doctor') {
                doctorFields.style.display = 'block';
            } else {
                doctorFields.style.display = 'none';
            }
        });
    }

    // User form submission
    const userForm = document.getElementById('userForm');
    if (userForm) {
        userForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Validate form
            const requiredFields = this.querySelectorAll('input[required], select[required]');
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
                // Collect form data
                const formData = new FormData(this);
                const userData = Object.fromEntries(formData);

                console.log('Saving user:', userData);

                // Close modal and show success
                closeUserModal();
                showSuccess('Người dùng đã được lưu thành công!');

                // Reset form
                this.reset();
            } else {
                alert('Vui lòng điền đầy đủ thông tin bắt buộc!');
            }
        });
    }
});

// Event Listeners
function setupAdminEventListeners() {
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

    // Close modals with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeUserModal();
            document.getElementById('notificationDropdown').style.display = 'none';
            document.getElementById('userDropdown').style.display = 'none';
        }
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

    // Toggle switches
    document.addEventListener('change', function(e) {
        if (e.target.type === 'checkbox' && e.target.closest('.toggle-switch')) {
            const toggle = e.target.closest('.toggle-switch');
            const setting = toggle.previousElementSibling.textContent.toLowerCase().replace(/\s+/g, '');

            console.log('Toggling setting:', setting, e.target.checked);

            if (e.target.checked) {
                showSuccess('Tính năng đã được bật!');
            } else {
                showSuccess('Tính năng đã được tắt!');
            }
        }
    });

    // Auto-refresh dashboard data every 5 minutes
    setInterval(() => {
        if (currentSection === 'overview') {
            console.log('Auto-refreshing dashboard data...');
            // In a real app, this would refresh metrics and charts
        }
    }, 300000); // 5 minutes

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

    // Real-time notifications simulation
    setInterval(() => {
        // Simulate random system events
        const events = [
            'Máy chủ database đã được tối ưu hóa',
            'Backup hàng tuần hoàn thành',
            '5 bác sĩ mới đăng ký thành công',
            'Doanh thu tháng đạt 98% mục tiêu'
        ];

        if (Math.random() < 0.1) { // 10% chance every 30 seconds
            const randomEvent = events[Math.floor(Math.random() * events.length)];
            showNotification(randomEvent, 'info');
        }
    }, 30000);
}

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
        notificationItem.className = `notification-item unread ${type}`;
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
        new Notification('MedBooking - Admin', {
            body: message,
            icon: '/favicon.ico'
        });
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission();
    }
}

function getNotificationIcon(type) {
    const icons = {
        'critical': 'exclamation-triangle',
        'warning': 'exclamation-circle',
        'appointment': 'calendar-plus',
        'user': 'user-plus',
        'payment': 'credit-card',
        'system': 'cogs',
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
const adminToastStyles = `
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
const adminStyleSheet = document.createElement('style');
adminStyleSheet.textContent = adminToastStyles;
document.head.appendChild(adminStyleSheet);

// Hospital Management Functions
function filterHospitals() {
    const filter = document.querySelector('.hospital-filters select').value;
    console.log('Filtering hospitals by:', filter);
    showSuccess(`Đã lọc bệnh viện theo: ${getHospitalFilterLabel(filter)}`);
}

function filterHospitalType() {
    const filter = document.querySelectorAll('.hospital-filters select')[1].value;
    console.log('Filtering hospitals by type:', filter);
    showSuccess(`Đã lọc theo loại: ${getHospitalTypeLabel(filter)}`);
}

function getHospitalFilterLabel(filter) {
    const labels = {
        'all': 'Tất cả',
        'active': 'Đang hoạt động',
        'inactive': 'Tạm ngừng',
        'maintenance': 'Bảo trì'
    };
    return labels[filter] || filter;
}

function getHospitalTypeLabel(type) {
    const labels = {
        'all': 'Tất cả',
        'public': 'Công lập',
        'private': 'Tư nhân',
        'international': 'Quốc tế'
    };
    return labels[type] || type;
}

function searchHospitals() {
    const searchTerm = document.querySelector('.hospital-toolbar .search-box input').value.toLowerCase();
    console.log('Searching hospitals:', searchTerm);
    if (searchTerm) {
        showSuccess(`Tìm thấy kết quả cho: "${searchTerm}"`);
    }
}

function addNewHospital() {
    alert('Tính năng thêm bệnh viện mới sẽ được triển khai trong phiên bản tiếp theo.');
}

function viewHospital(id) {
    console.log('Viewing hospital:', id);
    alert('Tính năng xem chi tiết bệnh viện sẽ được triển khai trong phiên bản tiếp theo.');
}

function editHospital(id) {
    console.log('Editing hospital:', id);
    alert('Tính năng chỉnh sửa bệnh viện sẽ được triển khai trong phiên bản tiếp theo.');
}

function deactivateHospital(id) {
    if (confirm('Bạn có chắc muốn tạm ngừng hoạt động của bệnh viện này?')) {
        console.log('Deactivating hospital:', id);
        showSuccess('Bệnh viện đã được tạm ngừng hoạt động.');
    }
}

// Services Management Functions
function filterServices() {
    const filter = document.querySelector('.services-toolbar select').value;
    console.log('Filtering services by:', filter);
    showSuccess(`Đã lọc dịch vụ theo: ${getServiceFilterLabel(filter)}`);
}

function filterServiceCategory() {
    const filter = document.querySelectorAll('.services-toolbar select')[1].value;
    console.log('Filtering services by category:', filter);
    showSuccess(`Đã lọc theo chuyên khoa: ${getServiceCategoryLabel(filter)}`);
}

function getServiceFilterLabel(filter) {
    const labels = {
        'all': 'Tất cả',
        'active': 'Đang hoạt động',
        'inactive': 'Tạm ngừng',
        'new': 'Mới'
    };
    return labels[filter] || filter;
}

function getServiceCategoryLabel(category) {
    const labels = {
        'all': 'Tất cả',
        'general': 'Khám tổng quát',
        'specialty': 'Chuyên khoa',
        'tests': 'Xét nghiệm',
        'vaccination': 'Tiêm chủng'
    };
    return labels[category] || category;
}

function searchServices() {
    const searchTerm = document.querySelector('.services-toolbar .search-box input').value.toLowerCase();
    console.log('Searching services:', searchTerm);
    if (searchTerm) {
        showSuccess(`Tìm thấy kết quả cho: "${searchTerm}"`);
    }
}

function addNewService() {
    alert('Tính năng thêm dịch vụ mới sẽ được triển khai trong phiên bản tiếp theo.');
}

function viewService(id) {
    console.log('Viewing service:', id);
    alert('Tính năng xem chi tiết dịch vụ sẽ được triển khai trong phiên bản tiếp theo.');
}

function editService(id) {
    console.log('Editing service:', id);
    alert('Tính năng chỉnh sửa dịch vụ sẽ được triển khai trong phiên bản tiếp theo.');
}

function deactivateService(id) {
    if (confirm('Bạn có chắc muốn tạm ngừng dịch vụ này?')) {
        console.log('Deactivating service:', id);
        showSuccess('Dịch vụ đã được tạm ngừng.');
    }
}

// Appointments Management Functions
function filterAppointments() {
    const filter = document.querySelector('.appointments-toolbar select').value;
    console.log('Filtering appointments by:', filter);
    showSuccess(`Đã lọc lịch hẹn theo: ${getAppointmentFilterLabel(filter)}`);
}

function filterAppointmentDate() {
    const filter = document.querySelectorAll('.appointments-toolbar select')[1].value;
    console.log('Filtering appointments by date:', filter);
    showSuccess(`Đã lọc theo thời gian: ${getAppointmentDateLabel(filter)}`);
}

function getAppointmentFilterLabel(filter) {
    const labels = {
        'all': 'Tất cả',
        'pending': 'Chờ xác nhận',
        'confirmed': 'Đã xác nhận',
        'completed': 'Hoàn thành',
        'cancelled': 'Đã hủy',
        'no-show': 'Vắng mặt'
    };
    return labels[filter] || filter;
}

function getAppointmentDateLabel(date) {
    const labels = {
        'all': 'Tất cả',
        'today': 'Hôm nay',
        'week': 'Tuần này',
        'month': 'Tháng này',
        'upcoming': 'Sắp tới'
    };
    return labels[date] || date;
}

function searchAppointments() {
    const searchTerm = document.querySelector('.appointments-toolbar .search-box input').value.toLowerCase();
    console.log('Searching appointments:', searchTerm);
    if (searchTerm) {
        showSuccess(`Tìm thấy kết quả cho: "${searchTerm}"`);
    }
}

function exportAppointments() {
    alert('Đang xuất dữ liệu lịch hẹn...');
    setTimeout(() => {
        showSuccess('Dữ liệu lịch hẹn đã được xuất thành công!');
    }, 2000);
}

function viewAppointment(id) {
    console.log('Viewing appointment:', id);
    alert('Tính năng xem chi tiết lịch hẹn sẽ được triển khai trong phiên bản tiếp theo.');
}

function editAppointment(id) {
    console.log('Editing appointment:', id);
    alert('Tính năng chỉnh sửa lịch hẹn sẽ được triển khai trong phiên bản tiếp theo.');
}

function cancelAppointment(id) {
    if (confirm('Bạn có chắc muốn hủy lịch hẹn này?')) {
        console.log('Cancelling appointment:', id);
        showSuccess('Lịch hẹn đã được hủy thành công.');
    }
}

function confirmAppointment(id) {
    console.log('Confirming appointment:', id);
    showSuccess('Lịch hẹn đã được xác nhận thành công.');
}

function viewMedicalRecord(id) {
    console.log('Viewing medical record for appointment:', id);
    alert('Tính năng xem hồ sơ bệnh án sẽ được triển khai trong phiên bản tiếp theo.');
}

// Reports Functions
function changeReportType() {
    const reportType = document.getElementById('reportType').value;

    // Hide all report sections
    document.querySelectorAll('.report-section').forEach(section => {
        section.classList.remove('active');
    });

    // Show selected report
    document.getElementById(reportType + '-report').classList.add('active');

    console.log('Changed report type to:', reportType);
}

function changeReportPeriod() {
    const period = document.getElementById('reportPeriod').value;
    const customRange = document.getElementById('customDateRange');

    if (period === 'custom') {
        customRange.style.display = 'flex';
    } else {
        customRange.style.display = 'none';
    }

    console.log('Changed report period to:', period);
}

function generateReport() {
    const reportType = document.getElementById('reportType').value;
    const period = document.getElementById('reportPeriod').value;

    // Show loading
    const btn = event.target;
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang tạo...';
    btn.disabled = true;

    // Simulate report generation
    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
        showSuccess(`Báo cáo ${getReportTypeLabel(reportType)} đã được tạo thành công!`);
    }, 3000);
}

function exportReport() {
    alert('Đang xuất báo cáo...');
    setTimeout(() => {
        showSuccess('Báo cáo đã được xuất thành công!');
    }, 2000);
}

function getReportTypeLabel(type) {
    const labels = {
        'overview': 'tổng quan',
        'appointments': 'lịch hẹn',
        'revenue': 'doanh thu',
        'users': 'người dùng',
        'services': 'dịch vụ'
    };
    return labels[type] || type;
}

// Payments Functions
function filterPayments() {
    const filter = document.querySelector('.payments-toolbar select').value;
    console.log('Filtering payments by:', filter);
    showSuccess(`Đã lọc thanh toán theo: ${getPaymentFilterLabel(filter)}`);
}

function filterPaymentMethod() {
    const filter = document.querySelectorAll('.payments-toolbar select')[1].value;
    console.log('Filtering payments by method:', filter);
    showSuccess(`Đã lọc theo phương thức: ${getPaymentMethodLabel(filter)}`);
}

function getPaymentFilterLabel(filter) {
    const labels = {
        'all': 'Tất cả',
        'completed': 'Hoàn thành',
        'pending': 'Đang xử lý',
        'failed': 'Thất bại',
        'refunded': 'Hoàn tiền'
    };
    return labels[filter] || filter;
}

function getPaymentMethodLabel(method) {
    const labels = {
        'all': 'Tất cả',
        'momo': 'MOMO',
        'vnpay': 'VNPAY',
        'card': 'Thẻ tín dụng',
        'bank': 'Chuyển khoản'
    };
    return labels[method] || method;
}

function searchPayments() {
    const searchTerm = document.querySelector('.payments-toolbar .search-box input').value.toLowerCase();
    console.log('Searching payments:', searchTerm);
    if (searchTerm) {
        showSuccess(`Tìm thấy kết quả cho: "${searchTerm}"`);
    }
}

function exportPayments() {
    alert('Đang xuất dữ liệu thanh toán...');
    setTimeout(() => {
        showSuccess('Dữ liệu thanh toán đã được xuất thành công!');
    }, 2000);
}

function viewPayment(id) {
    console.log('Viewing payment:', id);
    alert('Tính năng xem chi tiết thanh toán sẽ được triển khai trong phiên bản tiếp theo.');
}

function refundPayment(id) {
    if (confirm('Bạn có chắc muốn hoàn tiền cho giao dịch này?')) {
        console.log('Processing refund for payment:', id);
        showSuccess('Yêu cầu hoàn tiền đã được gửi thành công.');
    }
}

function cancelPayment(id) {
    if (confirm('Bạn có chắc muốn hủy giao dịch này?')) {
        console.log('Cancelling payment:', id);
        showSuccess('Giao dịch đã được hủy thành công.');
    }
}

// Content Management Functions
function filterContent() {
    const filter = document.querySelector('.content-toolbar select').value;
    console.log('Filtering content by:', filter);
    showSuccess(`Đã lọc nội dung theo: ${getContentFilterLabel(filter)}`);
}

function filterContentStatus() {
    const filter = document.querySelectorAll('.content-toolbar select')[1].value;
    console.log('Filtering content by status:', filter);
    showSuccess(`Đã lọc theo trạng thái: ${getContentStatusLabel(filter)}`);
}

function getContentFilterLabel(filter) {
    const labels = {
        'all': 'Tất cả',
        'news': 'Tin tức',
        'articles': 'Bài viết',
        'announcements': 'Thông báo',
        'guides': 'Hướng dẫn'
    };
    return labels[filter] || filter;
}

function getContentStatusLabel(status) {
    const labels = {
        'all': 'Tất cả',
        'published': 'Đã xuất bản',
        'draft': 'Bản nháp',
        'scheduled': 'Lên lịch',
        'archived': 'Đã lưu trữ'
    };
    return labels[status] || status;
}

function searchContent() {
    const searchTerm = document.querySelector('.content-toolbar .search-box input').value.toLowerCase();
    console.log('Searching content:', searchTerm);
    if (searchTerm) {
        showSuccess(`Tìm thấy kết quả cho: "${searchTerm}"`);
    }
}

function addNewContent() {
    alert('Tính năng thêm nội dung mới sẽ được triển khai trong phiên bản tiếp theo.');
}

function viewContent(id) {
    console.log('Viewing content:', id);
    alert('Tính năng xem nội dung sẽ được triển khai trong phiên bản tiếp theo.');
}

function editContent(id) {
    console.log('Editing content:', id);
    alert('Tính năng chỉnh sửa nội dung sẽ được triển khai trong phiên bản tiếp theo.');
}

function deleteContent(id) {
    if (confirm('Bạn có chắc muốn xóa nội dung này?')) {
        console.log('Deleting content:', id);
        showSuccess('Nội dung đã được xóa thành công.');
    }
}

function publishContent(id) {
    console.log('Publishing content:', id);
    showSuccess('Nội dung đã được xuất bản thành công.');
}

// Security Functions
function editSecuritySetting(setting) {
    const newValue = prompt(`Nhập giá trị mới cho ${setting}:`);
    if (newValue) {
        console.log('Updating security setting:', setting, 'to:', newValue);
        showSuccess('Cài đặt bảo mật đã được cập nhật thành công!');
    }
}

function viewAllLogs() {
    alert('Tính năng xem tất cả nhật ký bảo mật sẽ được triển khai trong phiên bản tiếp theo.');
}

function exportSecurityLogs() {
    alert('Đang xuất nhật ký bảo mật...');
    setTimeout(() => {
        showSuccess('Nhật ký bảo mật đã được xuất thành công!');
    }, 2000);
}

function runSecurityScan() {
    // Show loading
    const btn = event.target;
    const originalText = btn.textContent;
    btn.textContent = 'Đang quét...';
    btn.disabled = true;

    // Simulate security scan
    setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        showSuccess('Quét bảo mật hoàn thành! Không tìm thấy lỗ hổng.');
    }, 5000);
}

function checkSecurityUpdates() {
    alert('Đang kiểm tra bản vá bảo mật...');
    setTimeout(() => {
        showSuccess('Hệ thống đã được cập nhật bản vá bảo mật mới nhất!');
    }, 3000);
}

function emergencyBackup() {
    if (confirm('Tạo bản sao lưu khẩn cấp? Quá trình này có thể mất vài phút.')) {
        // Show loading
        const btn = event.target;
        const originalText = btn.textContent;
        btn.textContent = 'Đang sao lưu...';
        btn.disabled = true;

        // Simulate emergency backup
        setTimeout(() => {
            btn.textContent = originalText;
            btn.disabled = false;
            showSuccess('Sao lưu khẩn cấp hoàn thành thành công!');
        }, 10000);
    }
}

// Initialize additional charts for reports
function initializeAdditionalCharts() {
    if (typeof Chart !== 'undefined') {
        // Revenue Chart
        const revenueCtx = document.getElementById('revenueChart');
        if (revenueCtx) {
            new Chart(revenueCtx, {
                type: 'bar',
                data: {
                    labels: ['Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11'],
                    datasets: [{
                        label: 'Doanh thu (VND)',
                        data: [185000000, 210000000, 245000000, 278000000, 312000000, 285000000],
                        backgroundColor: '#4A90E2',
                        borderColor: '#357ABD',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function(value) {
                                    return (value / 1000000) + 'M';
                                }
                            }
                        }
                    }
                }
            });
        }

        // Services Chart
        const servicesCtx = document.getElementById('servicesChart');
        if (servicesCtx) {
            new Chart(servicesCtx, {
                type: 'pie',
                data: {
                    labels: ['Khám tổng quát', 'Siêu âm', 'Xét nghiệm máu', 'Khám chuyên khoa', 'Khác'],
                    datasets: [{
                        data: [35, 25, 20, 15, 5],
                        backgroundColor: [
                            '#4A90E2',
                            '#27ae60',
                            '#f39c12',
                            '#e74c3c',
                            '#9b59b6'
                        ],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });
        }

        // Appointment Status Chart
        const appointmentStatusCtx = document.getElementById('appointmentStatusChart');
        if (appointmentStatusCtx) {
            new Chart(appointmentStatusCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Hoàn thành', 'Đã xác nhận', 'Chờ xác nhận', 'Đã hủy'],
                    datasets: [{
                        data: [68, 22, 8, 2],
                        backgroundColor: [
                            '#27ae60',
                            '#4A90E2',
                            '#f39c12',
                            '#e74c3c'
                        ],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });
        }

        // Appointment Time Chart
        const appointmentTimeCtx = document.getElementById('appointmentTimeChart');
        if (appointmentTimeCtx) {
            new Chart(appointmentTimeCtx, {
                type: 'bar',
                data: {
                    labels: ['8:00', '9:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
                    datasets: [{
                        label: 'Số lịch hẹn',
                        data: [12, 18, 25, 22, 28, 20, 15],
                        backgroundColor: '#4A90E2',
                        borderColor: '#357ABD',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    }
}

// Update initialization
document.addEventListener('DOMContentLoaded', function() {
    initializeAdminDashboard();
    setupAdminEventListeners();
    initializeCharts();
    initializeAdditionalCharts();
});

// Export functions for global access
window.showSection = showSection;
window.toggleNotifications = toggleNotifications;
window.toggleUserMenu = toggleUserMenu;
window.filterUsers = filterUsers;
window.filterUserStatus = filterUserStatus;
window.searchUsers = searchUsers;
window.addNewUser = addNewUser;
window.viewUser = viewUser;
window.editUser = editUser;
window.suspendUser = suspendUser;
window.closeUserModal = closeUserModal;
window.editSetting = editSetting;
window.backupNow = backupNow;
window.clearCache = clearCache;
window.checkUpdates = checkUpdates;

// New export functions
window.filterHospitals = filterHospitals;
window.filterHospitalType = filterHospitalType;
window.searchHospitals = searchHospitals;
window.addNewHospital = addNewHospital;
window.viewHospital = viewHospital;
window.editHospital = editHospital;
window.deactivateHospital = deactivateHospital;

window.filterServices = filterServices;
window.filterServiceCategory = filterServiceCategory;
window.searchServices = searchServices;
window.addNewService = addNewService;
window.viewService = viewService;
window.editService = editService;
window.deactivateService = deactivateService;

window.filterAppointments = filterAppointments;
window.filterAppointmentDate = filterAppointmentDate;
window.searchAppointments = searchAppointments;
window.exportAppointments = exportAppointments;
window.viewAppointment = viewAppointment;
window.editAppointment = editAppointment;
window.cancelAppointment = cancelAppointment;
window.confirmAppointment = confirmAppointment;
window.viewMedicalRecord = viewMedicalRecord;

window.changeReportType = changeReportType;
window.changeReportPeriod = changeReportPeriod;
window.generateReport = generateReport;
window.exportReport = exportReport;

window.filterPayments = filterPayments;
window.filterPaymentMethod = filterPaymentMethod;
window.searchPayments = searchPayments;
window.exportPayments = exportPayments;
window.viewPayment = viewPayment;
window.refundPayment = refundPayment;
window.cancelPayment = cancelPayment;

window.filterContent = filterContent;
window.filterContentStatus = filterContentStatus;
window.searchContent = searchContent;
window.addNewContent = addNewContent;
window.viewContent = viewContent;
window.editContent = editContent;
window.deleteContent = deleteContent;
window.publishContent = publishContent;

window.editSecuritySetting = editSecuritySetting;
window.viewAllLogs = viewAllLogs;
window.exportSecurityLogs = exportSecurityLogs;
window.runSecurityScan = runSecurityScan;
window.checkSecurityUpdates = checkSecurityUpdates;
window.emergencyBackup = emergencyBackup;


