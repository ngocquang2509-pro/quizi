// Appointment Booking JavaScript

// Global variables
let currentDoctors = [];
let filteredDoctors = [];
let selectedDoctor = null;
let selectedDate = '';
let selectedTime = '';
let currentSort = 'rating';

// Sample doctors data
const doctorsData = [
    {
        id: 1,
        name: 'BS. Nguyễn Văn A',
        specialty: 'Tim mạch',
        hospital: 'Bệnh viện Việt Đức',
        location: 'viet-duc',
        rating: 4.8,
        reviews: 120,
        experience: 15,
        price: 300000,
        image: 'https://via.placeholder.com/400x300/4A90E2/FFFFFF?text=Dr.+Nguyen',
        bio: 'Bác sĩ chuyên khoa Tim mạch với hơn 15 năm kinh nghiệm trong lĩnh vực chẩn đoán và điều trị các bệnh lý tim mạch.',
        specialties: ['Chẩn đoán và điều trị bệnh tim mạch', 'Can thiệp tim mạch', 'Siêu âm tim mạch', 'Điện tâm đồ'],
        certifications: ['Bác sĩ chuyên khoa cấp II Tim mạch', 'Giấy phép hành nghề số: 123456789', 'Chứng chỉ can thiệp tim mạch (Hàn Quốc)', 'Hội viên Hội Tim mạch Việt Nam'],
        address: '40 Tràng Thi, Hoàn Kiếm, Hà Nội',
        phone: '024 3856 4133'
    },
    {
        id: 2,
        name: 'BS. Trần Thị B',
        specialty: 'Sản phụ khoa',
        hospital: 'Bệnh viện Phụ sản Hà Nội',
        location: 'phu-san',
        rating: 4.9,
        reviews: 95,
        experience: 12,
        price: 250000,
        image: 'https://via.placeholder.com/400x300/E94B3C/FFFFFF?text=Dr.+Tran',
        bio: 'Bác sĩ chuyên khoa Sản phụ khoa với chuyên môn sâu về sản khoa và phụ khoa.',
        specialties: ['Khám thai', 'Siêu âm thai', 'Khám phụ khoa', 'Điều trị vô sinh'],
        certifications: ['Bác sĩ chuyên khoa cấp I Sản phụ khoa', 'Chứng chỉ siêu âm sản khoa', 'Hội viên Hội Sản phụ khoa Việt Nam'],
        address: '929 La Thành, Ba Đình, Hà Nội',
        phone: '024 3845 7797'
    },
    {
        id: 3,
        name: 'BS. Lê Văn C',
        specialty: 'Nhi khoa',
        hospital: 'Bệnh viện Nhi Trung ương',
        location: 'nhi-trung-uong',
        rating: 4.7,
        reviews: 85,
        experience: 10,
        price: 200000,
        image: 'https://via.placeholder.com/400x300/50E3C2/FFFFFF?text=Dr.+Le',
        bio: 'Bác sĩ chuyên khoa Nhi khoa với tâm huyết chăm sóc sức khỏe trẻ em.',
        specialties: ['Khám nhi sơ sinh', 'Tiêm chủng', 'Điều trị bệnh trẻ em', 'Tư vấn dinh dưỡng'],
        certifications: ['Bác sĩ chuyên khoa cấp I Nhi khoa', 'Chứng chỉ nhi khoa nhiếp ảnh', 'Hội viên Hội Nhi khoa Việt Nam'],
        address: '18/879 La Thành, Đống Đa, Hà Nội',
        phone: '024 3974 2356'
    },
    {
        id: 4,
        name: 'BS. Hoàng Thị D',
        specialty: 'Da liễu',
        hospital: 'Bệnh viện Da liễu Trung ương',
        location: 'da-lieu',
        rating: 4.6,
        reviews: 78,
        experience: 8,
        price: 180000,
        image: 'https://via.placeholder.com/400x300/9B59B6/FFFFFF?text=Dr.+Hoang',
        bio: 'Bác sĩ chuyên khoa Da liễu với kinh nghiệm điều trị các bệnh lý da.',
        specialties: ['Điều trị mụn', 'Da liễu thẩm mỹ', 'Ung bướu da', 'Dị ứng da'],
        certifications: ['Bác sĩ chuyên khoa cấp I Da liễu', 'Chứng chỉ laser da liễu', 'Hội viên Hội Da liễu Việt Nam'],
        address: '15A Phương Mai, Đống Đa, Hà Nội',
        phone: '024 3836 2222'
    },
    {
        id: 5,
        name: 'BS. Phạm Văn E',
        specialty: 'Mắt',
        hospital: 'Bệnh viện Mắt Trung ương',
        location: 'mat-trung-uong',
        rating: 4.8,
        reviews: 92,
        experience: 14,
        price: 220000,
        image: 'https://via.placeholder.com/400x300/F39C12/FFFFFF?text=Dr.+Pham',
        bio: 'Bác sĩ chuyên khoa Mắt với chuyên môn sâu về phẫu thuật đục thủy tinh thể và cận thị.',
        specialties: ['Phẫu thuật đục thủy tinh thể', 'Điều trị cận thị', 'Khám mắt trẻ em', 'Viêm mí mắt'],
        certifications: ['Bác sĩ chuyên khoa cấp II Mắt', 'Chứng chỉ phẫu thuật mắt', 'Hội viên Hội Mắt Việt Nam'],
        address: '85 Bà Triệu, Hai Bà Trưng, Hà Nội',
        phone: '024 3843 3624'
    }
];

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    initializeAppointmentBooking();
});

// Initialize appointment booking page
function initializeAppointmentBooking() {
    // Load initial doctors
    currentDoctors = [...doctorsData];
    filteredDoctors = [...currentDoctors];

    // Display doctors
    displayDoctors(filteredDoctors);

    // Setup event listeners
    setupAppointmentEventListeners();

    // Initialize price range
    updatePriceRange();
}

// Setup event listeners
function setupAppointmentEventListeners() {
    // Price range change
    const priceRange = document.getElementById('priceRange');
    if (priceRange) {
        priceRange.addEventListener('input', updatePriceRange);
    }

    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            searchDoctors();
        });
    }
}

// Update price range display
function updatePriceRange() {
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');

    if (priceRange && priceValue) {
        const value = priceRange.value;
        priceValue.textContent = formatCurrency(value * 1000);
    }
}

// Search doctors
function searchDoctors() {
    const specialty = document.getElementById('specialtySelect').value;
    const location = document.getElementById('locationSelect').value;

    // Filter doctors based on search criteria
    filteredDoctors = currentDoctors.filter(doctor => {
        const specialtyMatch = !specialty || doctor.specialty.toLowerCase().includes(specialty.toLowerCase());
        const locationMatch = !location || doctor.location === location;

        return specialtyMatch && locationMatch;
    });

    // Apply additional filters
    applyFilters();

    // Display results
    displayDoctors(filteredDoctors);
}

// Apply filters
function applyFilters() {
    let filtered = [...filteredDoctors];

    // Specialty filters
    const selectedSpecialties = Array.from(document.querySelectorAll('.filter-options input[type="checkbox"]:checked'))
        .map(cb => cb.value);

    if (selectedSpecialties.length > 0) {
        filtered = filtered.filter(doctor =>
            selectedSpecialties.some(specialty => doctor.specialty.toLowerCase().includes(specialty))
        );
    }

    // Hospital filters
    const selectedHospitals = Array.from(document.querySelectorAll('.filter-options input[type="checkbox"]:checked'))
        .filter(cb => ['viet-duc', 'cho-ray', 'bach-mai', 'hue-central'].includes(cb.value))
        .map(cb => cb.value);

    if (selectedHospitals.length > 0) {
        filtered = filtered.filter(doctor =>
            selectedHospitals.includes(doctor.location)
        );
    }

    // Price filter
    const maxPrice = document.getElementById('priceRange').value * 1000;
    filtered = filtered.filter(doctor => doctor.price <= maxPrice);

    // Rating filter
    const ratingFilter = document.querySelector('input[name="rating"]:checked');
    if (ratingFilter) {
        const minRating = parseFloat(ratingFilter.value);
        filtered = filtered.filter(doctor => doctor.rating >= minRating);
    }

    filteredDoctors = filtered;
    displayDoctors(filteredDoctors);
}

// Sort doctors
function sortDoctors() {
    const sortBy = document.getElementById('sortSelect').value;

    filteredDoctors.sort((a, b) => {
        switch (sortBy) {
            case 'rating':
                return b.rating - a.rating;
            case 'experience':
                return b.experience - a.experience;
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'name':
                return a.name.localeCompare(b.name);
            default:
                return 0;
        }
    });

    displayDoctors(filteredDoctors);
}

// Display doctors
function displayDoctors(doctors) {
    const doctorsGrid = document.getElementById('doctorsGrid');
    const resultsCount = document.getElementById('resultsCount');
    const loadingState = document.getElementById('loadingState');
    const emptyState = document.getElementById('emptyState');

    // Update results count
    if (resultsCount) {
        resultsCount.textContent = doctors.length;
    }

    // Show/hide states
    if (loadingState) loadingState.style.display = 'none';

    if (doctors.length === 0) {
        if (emptyState) emptyState.style.display = 'block';
        if (doctorsGrid) doctorsGrid.innerHTML = '';
        return;
    }

    if (emptyState) emptyState.style.display = 'none';

    // Display doctors
    if (doctorsGrid) {
        doctorsGrid.innerHTML = doctors.map(doctor => createDoctorCard(doctor)).join('');
    }
}

// Create doctor card HTML
function createDoctorCard(doctor) {
    const stars = generateStars(doctor.rating);

    return `
        <div class="doctor-card" onclick="openDoctorModal(${doctor.id})">
            <div class="doctor-image">
                <img src="${doctor.image}" alt="${doctor.name}">
            </div>
            <div class="doctor-info">
                <div class="doctor-name">${doctor.name}</div>
                <div class="doctor-specialty">${doctor.specialty}</div>
                <div class="doctor-details">
                    <div class="doctor-rating">
                        <div class="stars">${stars}</div>
                        <span>${doctor.rating} (${doctor.reviews})</span>
                    </div>
                    <div class="doctor-price">${formatCurrency(doctor.price)}</div>
                </div>
                <div class="doctor-hospital">${doctor.hospital}</div>
                <div class="doctor-actions">
                    <button class="btn btn-primary" onclick="event.stopPropagation(); openDoctorModal(${doctor.id})">
                        Xem chi tiết
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Generate star rating HTML
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    let stars = '';

    // Full stars
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }

    // Half star
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }

    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }

    return stars;
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);
}

// Open doctor modal
function openDoctorModal(doctorId) {
    selectedDoctor = doctorsData.find(doctor => doctor.id === doctorId);
    if (!selectedDoctor) return;

    // Populate modal with doctor data
    document.getElementById('modalDoctorAvatar').src = selectedDoctor.image;
    document.getElementById('modalDoctorName').textContent = selectedDoctor.name;
    document.getElementById('modalDoctorSpecialty').textContent = selectedDoctor.specialty;
    document.getElementById('modalDoctorStars').innerHTML = generateStars(selectedDoctor.rating);
    document.getElementById('modalDoctorRating').textContent = `${selectedDoctor.rating} (${selectedDoctor.reviews} đánh giá)`;
    document.getElementById('modalDoctorExperience').textContent = `${selectedDoctor.experience} năm`;
    document.getElementById('modalDoctorPrice').textContent = formatCurrency(selectedDoctor.price);

    // Overview tab
    document.getElementById('modalDoctorBio').textContent = selectedDoctor.bio;

    const specialtiesList = document.getElementById('modalDoctorSpecialties');
    specialtiesList.innerHTML = selectedDoctor.specialties.map(specialty => `<li>${specialty}</li>`).join('');

    const certificationsList = document.getElementById('modalDoctorCertifications');
    certificationsList.innerHTML = selectedDoctor.certifications.map(cert => `<li>${cert}</li>`).join('');

    document.getElementById('modalDoctorHospital').textContent = selectedDoctor.hospital;
    document.getElementById('modalDoctorAddress').textContent = selectedDoctor.address;
    document.getElementById('modalDoctorPhone').textContent = selectedDoctor.phone;

    // Show modal
    document.getElementById('doctorModal').style.display = 'block';
    document.body.style.overflow = 'hidden';

    // Switch to overview tab
    switchTab('overview');
}

// Close doctor modal
function closeDoctorModal() {
    document.getElementById('doctorModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    selectedDoctor = null;
    selectedDate = '';
    selectedTime = '';
}

// Switch tab in doctor modal
function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-pane').forEach(tab => {
        tab.classList.remove('active');
    });

    // Show selected tab
    document.getElementById(tabName + 'Tab').classList.add('active');

    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    event.target.classList.add('active');
}

// Select time slot
function selectTimeSlot(date, time) {
    selectedDate = date;
    selectedTime = time;

    // Remove selected class from all time slots
    document.querySelectorAll('.time-slot').forEach(slot => {
        slot.classList.remove('selected');
    });

    // Add selected class to clicked slot
    event.target.classList.add('selected');
}

// Proceed to booking
function proceedToBooking() {
    if (!selectedDate || !selectedTime) {
        alert('Vui lòng chọn ngày và giờ khám!');
        return;
    }

    // Close doctor modal
    closeDoctorModal();

    // Open booking modal
    openBookingModal();
}

// Open booking modal
function openBookingModal() {
    if (!selectedDoctor) return;

    // Populate booking modal
    document.getElementById('bookingDoctorAvatar').src = selectedDoctor.image;
    document.getElementById('bookingDoctorName').textContent = selectedDoctor.name;
    document.getElementById('bookingDoctorSpecialty').textContent = selectedDoctor.specialty;
    document.getElementById('bookingDateTime').textContent = `${selectedDate} - ${selectedTime}`;
    document.getElementById('bookingFee').textContent = formatCurrency(selectedDoctor.price);
    document.getElementById('bookingHospital').textContent = selectedDoctor.hospital;
    document.getElementById('bookingAddress').textContent = selectedDoctor.address;

    // Show modal
    document.getElementById('bookingModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close booking modal
function closeBookingModal() {
    document.getElementById('bookingModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Confirm booking
function confirmBooking() {
    // Validate form
    const patientName = document.getElementById('patientName').value.trim();
    const patientPhone = document.getElementById('patientPhone').value.trim();
    const patientEmail = document.getElementById('patientEmail').value.trim();
    const reason = document.getElementById('bookingReason').value.trim();
    const agreeTerms = document.getElementById('agreeBooking').checked;

    if (!patientName || !patientPhone) {
        alert('Vui lòng điền đầy đủ thông tin bắt buộc!');
        return;
    }

    if (!validatePhone(patientPhone)) {
        alert('Số điện thoại không hợp lệ!');
        return;
    }

    if (patientEmail && !validateEmail(patientEmail)) {
        alert('Email không hợp lệ!');
        return;
    }

    if (!agreeTerms) {
        alert('Vui lòng đồng ý với điều khoản đặt lịch!');
        return;
    }

    // Show loading
    const confirmBtn = event.target;
    const originalText = confirmBtn.textContent;
    confirmBtn.textContent = 'Đang xử lý...';
    confirmBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
        // Success
        closeBookingModal();

        // Show success message
        alert(`Đặt lịch thành công!\n\nThông tin đặt lịch:\n- Bác sĩ: ${selectedDoctor.name}\n- Thời gian: ${selectedDate} ${selectedTime}\n- Bệnh viện: ${selectedDoctor.hospital}\n\nBạn sẽ nhận được xác nhận qua SMS và email.`);

        // Reset
        confirmBtn.textContent = originalText;
        confirmBtn.disabled = false;

        // Clear selected doctor and time
        selectedDoctor = null;
        selectedDate = '';
        selectedTime = '';

    }, 2000);
}

// Validate email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validate phone
function validatePhone(phone) {
    const phoneRegex = /^(\+84|84|0)[3|5|7|8|9][0-9]{8}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Clear filters
function clearFilters() {
    // Reset all filter checkboxes
    document.querySelectorAll('.filter-options input[type="checkbox"]').forEach(cb => {
        cb.checked = false;
    });

    // Reset price range
    document.getElementById('priceRange').value = 500000;
    updatePriceRange();

    // Reset rating filter
    document.querySelector('input[name="rating"]:checked').checked = false;

    // Reset search
    document.querySelector('.search-box input').value = '';

    // Show all doctors
    filteredDoctors = [...currentDoctors];
    displayDoctors(filteredDoctors);
}

// Load more doctors
function loadMoreDoctors() {
    // Simulate loading more doctors
    const loadMoreBtn = event.target;
    const originalText = loadMoreBtn.innerHTML;
    loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang tải...';
    loadMoreBtn.disabled = true;

    setTimeout(() => {
        // Add more doctors (in real app, this would load from API)
        const newDoctors = [
            {
                id: 6,
                name: 'BS. Vũ Thị F',
                specialty: 'Răng hàm mặt',
                hospital: 'Bệnh viện Răng hàm mặt Trung ương',
                location: 'rang-ham-mat',
                rating: 4.5,
                reviews: 67,
                experience: 9,
                price: 150000,
                image: 'https://via.placeholder.com/400x300/1ABC9C/FFFFFF?text=Dr.+Vu'
            }
        ];

        currentDoctors.push(...newDoctors);
        filteredDoctors = [...currentDoctors];
        displayDoctors(filteredDoctors);

        loadMoreBtn.innerHTML = originalText;
        loadMoreBtn.disabled = false;
    }, 1500);
}

// Calendar navigation
function prevWeek() {
    // Implement calendar navigation
    alert('Chức năng chuyển tuần trước sẽ được triển khai.');
}

function nextWeek() {
    // Implement calendar navigation
    alert('Chức năng chuyển tuần sau sẽ được triển khai.');
}

// Edit setting (placeholder)
function editSetting(settingKey) {
    alert(`Chức năng chỉnh sửa ${settingKey} sẽ được triển khai trong phiên bản tiếp theo.`);
}






