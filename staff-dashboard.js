// Staff Dashboard JavaScript

// Global variables
let currentSection = 'overview';
let selectedAppointments = [];
let currentAppointmentFilter = 'all';

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    initializeStaffDashboard();
    setupStaffEventListeners();
    updateCurrentDate();
});

function initializeStaffDashboard() {
    // Show default section
    showSection('overview');

    // Initialize current date
    updateCurrentDate();

    // Initialize tooltips and other UI elements
    initializeUI();
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
function filterAppointments() {
    const filterValue = document.querySelector('.filter-select').value;
    currentAppointmentFilter = filterValue;

    // Filter appointments based on status
    console.log('Filtering appointments by status:', filterValue);

    // Here you would typically filter the table rows
    // For demo purposes, we'll just show a message
    showSuccess(`Đã lọc theo: ${getStatusLabel(filterValue)}`);
}

function filterByDoctor() {
    const doctorValue = document.querySelectorAll('.filter-select')[1].value;

    // Filter appointments based on doctor
    console.log('Filtering appointments by doctor:', doctorValue);

    // Here you would typically filter the table rows
    showSuccess(`Đã lọc theo bác sĩ: ${doctorValue}`);
}

function getStatusLabel(status) {
    const labels = {
        'all': 'Tất cả',
        'pending': 'Chờ xác nhận',
        'confirmed': 'Đã xác nhận',
        'in-progress': 'Đang khám',
        'completed': 'Hoàn thành',
        'cancelled': 'Đã hủy'
    };
    return labels[status] || status;
}

function confirmAppointment(appointmentId) {
    if (confirm('Bạn có chắc muốn xác nhận lịch hẹn này?')) {
        console.log('Confirming appointment:', appointmentId);
        showSuccess('Lịch hẹn đã được xác nhận thành công!');
        // Update UI to reflect the change
    }
}

function editAppointment(appointmentId) {
    const newTime = prompt('Nhập thời gian mới (HH:MM):');
    if (newTime) {
        console.log('Editing appointment:', appointmentId, 'new time:', newTime);
        showSuccess('Lịch hẹn đã được cập nhật!');
    }
}

function cancelAppointment(appointmentId) {
    const reason = prompt('Lý do hủy lịch hẹn:');
    if (reason) {
        console.log('Cancelling appointment:', appointmentId, 'reason:', reason);
        showSuccess('Lịch hẹn đã được hủy!');
    }
}

function viewAppointment(appointmentId) {
    console.log('Viewing appointment details:', appointmentId);
    // Open appointment details modal
    alert('Tính năng xem chi tiết lịch hẹn sẽ được triển khai trong phiên bản tiếp theo.');
}

function checkInPatient(appointmentId) {
    if (confirm('Xác nhận bệnh nhân đã check-in?')) {
        console.log('Checking in patient for appointment:', appointmentId);
        showSuccess('Bệnh nhân đã check-in thành công!');
    }
}

function viewProgress(appointmentId) {
    console.log('Viewing consultation progress:', appointmentId);
    alert('Tính năng theo dõi tiến trình khám sẽ được triển khai trong phiên bản tiếp theo.');
}

function completeAppointment(appointmentId) {
    if (confirm('Xác nhận hoàn thành buổi khám?')) {
        console.log('Completing appointment:', appointmentId);
        showSuccess('Buổi khám đã được hoàn thành!');
    }
}

function viewDetails(appointmentId) {
    console.log('Viewing appointment completion details:', appointmentId);
    alert('Tính năng xem chi tiết hoàn thành sẽ được triển khai trong phiên bản tiếp theo.');
}

function searchAppointments() {
    const searchTerm = document.querySelector('.search-box input').value.toLowerCase();
    console.log('Searching appointments:', searchTerm);

    // Here you would typically filter table rows based on search term
    if (searchTerm) {
        showSuccess(`Tìm thấy kết quả cho: "${searchTerm}"`);
    }
}

// Bulk Actions
function bulkConfirm() {
    if (selectedAppointments.length === 0) {
        alert('Vui lòng chọn ít nhất một lịch hẹn!');
        return;
    }

    if (confirm(`Xác nhận ${selectedAppointments.length} lịch hẹn?`)) {
        console.log('Bulk confirming appointments:', selectedAppointments);
        showSuccess(`${selectedAppointments.length} lịch hẹn đã được xác nhận!`);
        selectedAppointments = [];
        updateBulkActions();
    }
}

function bulkReschedule() {
    if (selectedAppointments.length === 0) {
        alert('Vui lòng chọn ít nhất một lịch hẹn!');
        return;
    }

    const newDate = prompt('Nhập ngày mới (DD/MM/YYYY):');
    if (newDate) {
        console.log('Bulk rescheduling appointments:', selectedAppointments, 'to:', newDate);
        showSuccess(`${selectedAppointments.length} lịch hẹn đã được dời!`);
        selectedAppointments = [];
        updateBulkActions();
    }
}

function bulkCancel() {
    if (selectedAppointments.length === 0) {
        alert('Vui lòng chọn ít nhất một lịch hẹn!');
        return;
    }

    const reason = prompt('Lý do hủy hàng loạt:');
    if (reason) {
        console.log('Bulk cancelling appointments:', selectedAppointments, 'reason:', reason);
        showSuccess(`${selectedAppointments.length} lịch hẹn đã được hủy!`);
        selectedAppointments = [];
        updateBulkActions();
    }
}

function updateBulkActions() {
    const selectedCount = document.getElementById('selectedCount');
    if (selectedCount) {
        selectedCount.textContent = selectedAppointments.length;
    }
}

// Check-in Functions
function quickCheckIn() {
    const checkinCode = document.getElementById('checkinCode').value.trim();

    if (!checkinCode) {
        alert('Vui lòng nhập mã lịch hẹn hoặc số điện thoại!');
        return;
    }

    console.log('Quick check-in for:', checkinCode);
    showSuccess('Check-in thành công! Bệnh nhân có thể vào phòng khám.');
    document.getElementById('checkinCode').value = '';
}

function viewPatientStatus(patientId) {
    console.log('Viewing patient status:', patientId);
    alert('Tính năng xem trạng thái bệnh nhân sẽ được triển khai trong phiên bản tiếp theo.');
}

function checkoutPatient(patientId) {
    if (confirm('Xác nhận bệnh nhân đã check-out?')) {
        console.log('Checking out patient:', patientId);
        showSuccess('Bệnh nhân đã check-out thành công!');
    }
}

// Inquiry Functions
function respondToInquiry(inquiryId) {
    // Open response modal
    document.getElementById('responseModal').style.display = 'block';
    document.body.style.overflow = 'hidden';

    // Load inquiry details (mock data for demo)
    loadInquiryDetails(inquiryId);

    console.log('Responding to inquiry:', inquiryId);
}

function loadInquiryDetails(inquiryId) {
    // Mock data - in real app this would come from API
    const inquiries = {
        1: {
            customer: 'Nguyễn Thị A',
            type: 'Cuộc gọi • 5 phút trước',
            message: 'Hỏi về kết quả xét nghiệm máu',
            avatar: 'https://via.placeholder.com/60x60/E94B3C/FFFFFF?text=NA'
        },
        2: {
            customer: 'Trần Văn B',
            type: 'Email • 15 phút trước',
            message: 'Hỏi về cách đặt lịch khám từ xa',
            avatar: 'https://via.placeholder.com/60x60/50E3C2/FFFFFF?text=TB'
        }
    };

    const inquiry = inquiries[inquiryId];
    if (inquiry) {
        document.getElementById('inquiryAvatar').src = inquiry.avatar;
        document.getElementById('inquiryCustomer').textContent = inquiry.customer;
        document.getElementById('inquiryType').textContent = inquiry.type;
        document.getElementById('inquiryMessage').textContent = inquiry.message;
    }
}

function viewInquiryDetails(inquiryId) {
    console.log('Viewing inquiry details:', inquiryId);
    respondToInquiry(inquiryId); // Reuse the response modal
}

function markAsResolved(inquiryId) {
    if (confirm('Đánh dấu thắc mắc này đã được giải quyết?')) {
        console.log('Marking inquiry as resolved:', inquiryId);
        showSuccess('Thắc mắc đã được đánh dấu là đã giải quyết!');
    }
}

function useTemplate(templateId) {
    const templates = {
        1: 'Giờ làm việc của bệnh viện: 7:00 - 17:00 từ thứ 2 đến thứ 7.',
        2: 'Để đặt lịch khám qua ứng dụng:\n1. Tải app MedBooking\n2. Đăng ký tài khoản\n3. Chọn bác sĩ và thời gian\n4. Thanh toán và xác nhận',
        3: 'Về bảo hiểm y tế:\n- Bệnh viện chấp nhận thẻ BHYT tất cả các loại\n- Đảm bảo thẻ còn hạn sử dụng\n- Mang theo CMND/CCCD khi đến khám',
        4: 'Hướng dẫn đến bệnh viện:\n- Địa chỉ: 40 Tràng Thi, Hoàn Kiếm, Hà Nội\n- Có chỗ đậu xe miễn phí\n- Lối vào chính từ đường Tràng Thi'
    };

    const responseText = document.getElementById('responseText');
    if (responseText) {
        responseText.value = templates[templateId] || '';
    }
}

function closeResponseModal() {
    document.getElementById('responseModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    // Clear form
    document.getElementById('responseText').value = '';
    document.getElementById('markResolved').checked = false;
    document.getElementById('sendEmail').checked = false;
}

function sendResponse() {
    const responseText = document.getElementById('responseText').value.trim();
    const markResolved = document.getElementById('markResolved').checked;
    const sendEmail = document.getElementById('sendEmail').checked;

    if (!responseText) {
        alert('Vui lòng nhập nội dung phản hồi!');
        return;
    }

    console.log('Sending response:', {
        text: responseText,
        markResolved: markResolved,
        sendEmail: sendEmail
    });

    showSuccess('Phản hồi đã được gửi thành công!');
    closeResponseModal();
}

// Utility Functions
function initializeUI() {
    // Initialize any UI components that need JavaScript
    console.log('UI initialized');
}

// Event Listeners
function setupStaffEventListeners() {
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

    // Close response modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeResponseModal();
            document.getElementById('notificationDropdown').style.display = 'none';
            document.getElementById('userDropdown').style.display = 'none';
        }
    });

    // Enter key for quick check-in
    const checkinInput = document.getElementById('checkinCode');
    if (checkinInput) {
        checkinInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                quickCheckIn();
            }
        });
    }

    // Checkbox selection for bulk actions
    document.addEventListener('change', function(e) {
        if (e.target.type === 'checkbox' && e.target.closest('.appointment-row')) {
            const row = e.target.closest('.appointment-row');
            const appointmentId = row.querySelector('td:first-child').textContent.trim();

            if (e.target.checked) {
                selectedAppointments.push(appointmentId);
            } else {
                const index = selectedAppointments.indexOf(appointmentId);
                if (index > -1) {
                    selectedAppointments.splice(index, 1);
                }
            }

            updateBulkActions();
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

        // Ctrl/Cmd + Enter to send response
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            if (document.getElementById('responseModal').style.display === 'block') {
                sendResponse();
            }
        }
    });

    // Auto-refresh data every 5 minutes
    setInterval(() => {
        if (currentSection === 'overview') {
            console.log('Auto-refreshing overview data...');
            // In a real app, this would refresh the stats and lists
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

    // Form validation
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const inputs = this.querySelectorAll('input[required], textarea[required]');
            let isValid = true;

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.style.borderColor = '#e74c3c';
                    isValid = false;
                } else {
                    input.style.borderColor = '#2ecc71';
                }
            });

            if (isValid) {
                console.log('Form submitted:', this);
                showSuccess('Thông tin đã được lưu thành công!');
            } else {
                alert('Vui lòng điền đầy đủ thông tin bắt buộc!');
            }
        });
    });
}

// Real-time updates simulation
function simulateRealTimeUpdates() {
    // Simulate new appointment
    setTimeout(() => {
        showNotification('Lịch hẹn mới cần xác nhận: Hoàng Thị E - 11:00', 'appointment');
    }, 60000); // 1 minute

    // Simulate new inquiry
    setTimeout(() => {
        showNotification('Thắc mắc mới từ bệnh nhân Lê Văn F', 'inquiry');
    }, 120000); // 2 minutes

    // Simulate check-in reminder
    setTimeout(() => {
        showNotification('Nhắc nhở: Bệnh nhân Trần Văn B sắp đến check-in', 'reminder');
    }, 180000); // 3 minutes
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
        new Notification('MedBooking - Nhân viên', {
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
        'inquiry': 'question-circle',
        'reminder': 'clock',
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
const staffToastStyles = `
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
const staffStyleSheet = document.createElement('style');
staffStyleSheet.textContent = staffToastStyles;
document.head.appendChild(staffStyleSheet);

// Scheduling Functions
function filterDoctors() {
    const doctorValue = document.querySelector('.scheduling-filters .filter-select').value;
    console.log('Filtering doctors by specialty:', doctorValue);
    showSuccess(`Đã lọc theo chuyên khoa: ${doctorValue}`);
}

function filterWeek() {
    const weekValue = document.querySelectorAll('.scheduling-filters .filter-select')[1].value;
    console.log('Filtering by week:', weekValue);
    showSuccess(`Đã lọc theo: ${weekValue}`);
}

function editScheduleSlot(doctorId, day) {
    const time = prompt('Nhập thời gian làm việc (VD: 08:00-12:00,14:00-17:00):');
    if (time) {
        console.log('Editing schedule for doctor:', doctorId, 'day:', day, 'time:', time);
        showSuccess('Lịch làm việc đã được cập nhật!');
    }
}

function copyPreviousWeek() {
    if (confirm('Bạn có muốn sao chép lịch từ tuần trước?')) {
        console.log('Copying previous week schedule');
        showSuccess('Đã sao chép lịch từ tuần trước!');
    }
}

function publishSchedule() {
    if (confirm('Xuất bản lịch làm việc này? Tất cả bác sĩ sẽ nhận được thông báo.')) {
        console.log('Publishing schedule');
        showSuccess('Lịch làm việc đã được xuất bản!');
    }
}

// Patients Functions
function filterPatients() {
    const filterValue = document.querySelector('.patient-filters .filter-select').value;
    console.log('Filtering patients by status:', filterValue);
    showSuccess(`Đã lọc theo: ${filterValue}`);
}

function searchPatients() {
    const searchTerm = document.querySelector('.patients-toolbar .search-box input').value.toLowerCase();
    console.log('Searching patients:', searchTerm);
    if (searchTerm) {
        showSuccess(`Tìm thấy kết quả cho: "${searchTerm}"`);
    }
}

function addNewPatient() {
    alert('Tính năng thêm bệnh nhân mới sẽ được triển khai trong phiên bản tiếp theo.');
}

function viewPatientDetails(patientId) {
    console.log('Viewing patient details:', patientId);
    alert('Tính năng xem chi tiết bệnh nhân sẽ được triển khai trong phiên bản tiếp theo.');
}

function editPatient(patientId) {
    console.log('Editing patient:', patientId);
    alert('Tính năng chỉnh sửa thông tin bệnh nhân sẽ được triển khai trong phiên bản tiếp theo.');
}

function scheduleAppointmentForPatient(patientId) {
    console.log('Scheduling appointment for patient:', patientId);
    alert('Tính năng đặt lịch cho bệnh nhân sẽ được triển khai trong phiên bản tiếp theo.');
}

// Rooms Functions
function filterRooms() {
    const roomValue = document.querySelector('.room-filters .filter-select').value;
    console.log('Filtering rooms by type:', roomValue);
    showSuccess(`Đã lọc theo loại phòng: ${roomValue}`);
}

function filterRoomStatus() {
    const statusValue = document.querySelectorAll('.room-filters .filter-select')[1].value;
    console.log('Filtering rooms by status:', statusValue);
    showSuccess(`Đã lọc theo trạng thái: ${statusValue}`);
}

function addNewRoom() {
    alert('Tính năng thêm phòng mới sẽ được triển khai trong phiên bản tiếp theo.');
}

function exportRoomStatus() {
    console.log('Exporting room status report');
    showSuccess('Báo cáo tình trạng phòng đã được xuất!');
}

function viewRoomDetails(roomId) {
    console.log('Viewing room details:', roomId);
    alert('Tính năng xem chi tiết phòng sẽ được triển khai trong phiên bản tiếp theo.');
}

function scheduleRoomCleaning(roomId) {
    if (confirm('Lên lịch dọn dẹp phòng này?')) {
        console.log('Scheduling cleaning for room:', roomId);
        showSuccess('Đã lên lịch dọn dẹp phòng!');
    }
}

function assignDoctorToRoom(roomId) {
    const doctor = prompt('Nhập tên bác sĩ:');
    if (doctor) {
        console.log('Assigning doctor:', doctor, 'to room:', roomId);
        showSuccess(`Đã gán BS. ${doctor} cho phòng ${roomId}!`);
    }
}

function extendRoomTime(roomId) {
    const minutes = prompt('Gia hạn thêm bao nhiêu phút?');
    if (minutes) {
        console.log('Extending time for room:', roomId, 'by:', minutes, 'minutes');
        showSuccess(`Đã gia hạn ${minutes} phút cho phòng ${roomId}!`);
    }
}

function endConsultation(roomId) {
    if (confirm('Kết thúc buổi khám trong phòng này?')) {
        console.log('Ending consultation in room:', roomId);
        showSuccess('Buổi khám đã được kết thúc!');
    }
}

function markRoomReady(roomId) {
    if (confirm('Đánh dấu phòng này đã sẵn sàng?')) {
        console.log('Marking room as ready:', roomId);
        showSuccess(`Phòng ${roomId} đã sẵn sàng sử dụng!`);
    }
}

function scheduleMaintenance(roomId) {
    alert('Tính năng lên lịch bảo trì sẽ được triển khai trong phiên bản tiếp theo.');
}

// Reports Functions
function changeReportType() {
    const reportType = document.getElementById('reportType').value;
    console.log('Changing report type to:', reportType);
    showSuccess(`Đã chuyển sang báo cáo: ${reportType}`);
}

function changeReportPeriod() {
    const reportPeriod = document.getElementById('reportPeriod').value;
    console.log('Changing report period to:', reportPeriod);
    showSuccess(`Đã chuyển sang khoảng thời gian: ${reportPeriod}`);
}

function generateReport() {
    console.log('Generating report');
    showSuccess('Báo cáo đang được tạo...');
    // Simulate report generation
    setTimeout(() => {
        showSuccess('Báo cáo đã được tạo thành công!');
    }, 2000);
}

function exportReport() {
    console.log('Exporting report');
    showSuccess('Báo cáo đang được xuất...');
    // Simulate export
    setTimeout(() => {
        showSuccess('Báo cáo đã được xuất thành công!');
    }, 1500);
}

// Messages Functions
function searchMessages() {
    const searchTerm = document.querySelector('.messages-search .search-box input').value.toLowerCase();
    console.log('Searching messages:', searchTerm);
    if (searchTerm) {
        showSuccess(`Tìm thấy kết quả cho: "${searchTerm}"`);
    }
}

function openMessageThread(threadId) {
    // Update active thread
    document.querySelectorAll('.message-thread').forEach(thread => {
        thread.classList.remove('active');
    });
    event.currentTarget.classList.add('active');

    console.log('Opening message thread:', threadId);

    // Load thread messages (mock data)
    loadMessageThread(threadId);
}

function loadMessageThread(threadId) {
    // Mock data for different threads
    const threads = {
        1: {
            name: 'Nguyễn Thị A',
            type: 'Bệnh nhân • BN001234',
            avatar: 'https://via.placeholder.com/40x40/E94B3C/FFFFFF?text=NA'
        },
        2: {
            name: 'Trần Văn B',
            type: 'Bệnh nhân • BN001235',
            avatar: 'https://via.placeholder.com/40x40/50E3C2/FFFFFF?text=TB'
        },
        3: {
            name: 'BS. Nguyễn Văn D',
            type: 'Bác sĩ • Tim mạch',
            avatar: 'https://via.placeholder.com/40x40/4A90E2/FFFFFF?text=BS'
        },
        4: {
            name: 'NV. Trần Thị G',
            type: 'Nhân viên • Dọn dẹp',
            avatar: 'https://via.placeholder.com/40x40/F39C12/FFFFFF?text=NV'
        }
    };

    const thread = threads[threadId];
    if (thread) {
        document.querySelector('.chat-header img').src = thread.avatar;
        document.querySelector('.chat-info h4').textContent = thread.name;
        document.querySelector('.chat-info p').textContent = thread.type;
    }
}

function viewPatientRecord(patientId) {
    console.log('Viewing patient record:', patientId);
    alert('Tính năng xem hồ sơ bệnh nhân sẽ được triển khai trong phiên bản tiếp theo.');
}

function callPatient(patientId) {
    if (confirm('Gọi điện cho bệnh nhân này?')) {
        console.log('Calling patient:', patientId);
        showSuccess('Đang gọi...');
    }
}

function scheduleForPatient(patientId) {
    console.log('Scheduling appointment for patient:', patientId);
    alert('Tính năng đặt lịch sẽ được triển khai trong phiên bản tiếp theo.');
}

function sendStaffMessage() {
    const message = document.getElementById('staffMessageInput').value.trim();
    if (!message) {
        alert('Vui lòng nhập nội dung tin nhắn!');
        return;
    }

    console.log('Sending message:', message);
    showSuccess('Tin nhắn đã được gửi!');

    // Clear input
    document.getElementById('staffMessageInput').value = '';
}

function attachStaffFile() {
    alert('Tính năng đính kèm file sẽ được triển khai trong phiên bản tiếp theo.');
}

function useStaffTemplate() {
    const templates = {
        1: 'Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của chúng tôi.',
        2: 'Vui lòng đến trước giờ hẹn 15 phút để hoàn tất thủ tục check-in.',
        3: 'Nếu bạn có bất kỳ câu hỏi nào, đừng ngần ngại liên hệ với chúng tôi.',
        4: 'Chúc bạn sức khỏe và hẹn gặp lại!'
    };

    const templateId = Math.floor(Math.random() * 4) + 1;
    const template = templates[templateId];
    document.getElementById('staffMessageInput').value = template;
}

function handleMessageKeyPress(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendStaffMessage();
    }
}

// Export functions for global access
window.showSection = showSection;
window.toggleNotifications = toggleNotifications;
window.toggleUserMenu = toggleUserMenu;
window.filterAppointments = filterAppointments;
window.filterByDoctor = filterByDoctor;
window.confirmAppointment = confirmAppointment;
window.editAppointment = editAppointment;
window.cancelAppointment = cancelAppointment;
window.viewAppointment = viewAppointment;
window.checkInPatient = checkInPatient;
window.viewProgress = viewProgress;
window.completeAppointment = completeAppointment;
window.viewDetails = viewDetails;
window.searchAppointments = searchAppointments;
window.bulkConfirm = bulkConfirm;
window.bulkReschedule = bulkReschedule;
window.bulkCancel = bulkCancel;
window.quickCheckIn = quickCheckIn;
window.viewPatientStatus = viewPatientStatus;
window.checkoutPatient = checkoutPatient;
window.respondToInquiry = respondToInquiry;
window.viewInquiryDetails = viewInquiryDetails;
window.markAsResolved = markAsResolved;
window.useTemplate = useTemplate;
window.closeResponseModal = closeResponseModal;
window.sendResponse = sendResponse;

// New functions for additional sections
window.filterDoctors = filterDoctors;
window.filterWeek = filterWeek;
window.editScheduleSlot = editScheduleSlot;
window.copyPreviousWeek = copyPreviousWeek;
window.publishSchedule = publishSchedule;
window.filterPatients = filterPatients;
window.searchPatients = searchPatients;
window.addNewPatient = addNewPatient;
window.viewPatientDetails = viewPatientDetails;
window.editPatient = editPatient;
window.scheduleAppointmentForPatient = scheduleAppointmentForPatient;
window.filterRooms = filterRooms;
window.filterRoomStatus = filterRoomStatus;
window.addNewRoom = addNewRoom;
window.exportRoomStatus = exportRoomStatus;
window.viewRoomDetails = viewRoomDetails;
window.scheduleRoomCleaning = scheduleRoomCleaning;
window.assignDoctorToRoom = assignDoctorToRoom;
window.extendRoomTime = extendRoomTime;
window.endConsultation = endConsultation;
window.markRoomReady = markRoomReady;
window.scheduleMaintenance = scheduleMaintenance;
window.changeReportType = changeReportType;
window.changeReportPeriod = changeReportPeriod;
window.generateReport = generateReport;
window.exportReport = exportReport;
window.searchMessages = searchMessages;
window.openMessageThread = openMessageThread;
window.viewPatientRecord = viewPatientRecord;
window.callPatient = callPatient;
window.scheduleForPatient = scheduleForPatient;
window.sendStaffMessage = sendStaffMessage;
window.attachStaffFile = attachStaffFile;
window.useStaffTemplate = useStaffTemplate;
window.handleMessageKeyPress = handleMessageKeyPress;


