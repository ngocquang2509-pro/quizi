// Services Page JavaScript

// Global variables
let currentServices = [];
let filteredServices = [];
let currentCategory = 'all';

// Sample services data
const servicesData = [
    {
        id: 1,
        name: 'Khám Tổng Quát',
        category: 'kham-chua-benh',
        icon: 'fas fa-stethoscope',
        description: 'Khám sức khỏe tổng thể, phát hiện sớm bệnh tật và tư vấn phòng ngừa.',
        rating: 4.8,
        reviews: 245,
        duration: '30-45 phút',
        price: 300000,
        image: 'https://via.placeholder.com/400x300/4A90E2/FFFFFF?text=General+Checkup',
        badge: 'Phổ biến',
        overview: {
            description: 'Khám tổng quát là dịch vụ khám sức khỏe toàn diện, giúp phát hiện sớm các bệnh tật và có kế hoạch phòng ngừa hiệu quả.',
            benefits: [
                'Phát hiện sớm bệnh tật',
                'Tư vấn chế độ ăn uống hợp lý',
                'Hướng dẫn tập luyện phù hợp',
                'Theo dõi sức khỏe định kỳ'
            ],
            target: 'Người lớn từ 18 tuổi trở lên muốn kiểm tra sức khỏe định kỳ hoặc có dấu hiệu bất thường về sức khỏe.',
            duration: '30-45 phút'
        },
        details: {
            process: [
                { step: 1, title: 'Đón tiếp và khai thác thông tin', description: 'Bác sĩ hỏi về tiền sử bệnh, triệu chứng và thói quen sống' },
                { step: 2, title: 'Khám lâm sàng', description: 'Kiểm tra các dấu hiệu sinh tồn và khám tổng thể' },
                { step: 3, title: 'Yêu cầu cận lâm sàng', description: 'Chỉ định các xét nghiệm cần thiết nếu có' },
                { step: 4, title: 'Kết luận và tư vấn', description: 'Bác sĩ đưa ra kết luận và lời khuyên chăm sóc sức khỏe' }
            ],
            preparation: [
                'Nhịn ăn 8-10 tiếng nếu cần xét nghiệm máu',
                'Mang theo kết quả xét nghiệm cũ nếu có',
                'Chuẩn bị danh sách thuốc đang dùng',
                'Mang theo giấy tờ tùy thân'
            ],
            aftercare: 'Theo dõi các triệu chứng nếu có và tái khám theo lịch hẹn của bác sĩ.'
        },
        pricing: [
            { name: 'Khám tổng quát cơ bản', details: 'Khám lâm sàng + tư vấn', price: 250000 },
            { name: 'Khám tổng quát nâng cao', details: 'Khám lâm sàng + XN máu + siêu âm bụng', price: 450000, featured: true },
            { name: 'Khám tổng quát VIP', details: 'Khám đầy đủ + tất cả xét nghiệm', price: 750000 }
        ]
    },
    {
        id: 2,
        name: 'Xét Nghiệm Máu',
        category: 'xet-nghiem',
        icon: 'fas fa-flask',
        description: 'Phân tích các chỉ số máu để đánh giá sức khỏe tổng thể.',
        rating: 4.6,
        reviews: 189,
        duration: '15-20 phút',
        price: 150000,
        image: 'https://via.placeholder.com/400x300/27ae60/FFFFFF?text=Blood+Test',
        overview: {
            description: 'Xét nghiệm máu giúp đánh giá chức năng các cơ quan, phát hiện sớm các bệnh lý và theo dõi hiệu quả điều trị.',
            benefits: [
                'Đánh giá chức năng gan thận',
                'Kiểm tra đường huyết',
                'Phát hiện thiếu máu',
                'Theo dõi cholesterol'
            ],
            target: 'Người cần kiểm tra sức khỏe định kỳ hoặc theo dõi bệnh lý mạn tính.',
            duration: '15-20 phút'
        },
        details: {
            process: [
                { step: 1, title: 'Chuẩn bị', description: 'Nhân viên y tế hướng dẫn quy trình lấy máu' },
                { step: 2, title: 'Lấy mẫu', description: 'Lấy máu từ tĩnh mạch cánh tay' },
                { step: 3, title: 'Xử lý mẫu', description: 'Mẫu máu được xử lý và phân tích trong phòng thí nghiệm' },
                { step: 4, title: 'Trả kết quả', description: 'Kết quả được trả trong 24-48 giờ' }
            ],
            preparation: [
                'Nhịn ăn 8-10 tiếng trước khi lấy máu',
                'Uống đủ nước',
                'Mang theo đơn thuốc nếu có',
                'Thông báo nếu đang dùng thuốc'
            ],
            aftercare: 'Có thể ăn uống bình thường sau khi lấy máu. Theo dõi kết quả và tái khám nếu cần.'
        },
        pricing: [
            { name: 'Xét nghiệm máu cơ bản', details: 'Công thức máu + đường huyết', price: 150000 },
            { name: 'Xét nghiệm máu toàn diện', details: '15 chỉ số quan trọng', price: 350000 },
            { name: 'Xét nghiệm chuyên sâu', details: '25+ chỉ số chuyên môn', price: 550000 }
        ]
    },
    {
        id: 3,
        name: 'Siêu Âm Tim Mạch',
        category: 'xet-nghiem',
        icon: 'fas fa-heartbeat',
        description: 'Chụp siêu âm tim mạch để đánh giá chức năng tim.',
        rating: 4.9,
        reviews: 156,
        duration: '20-30 phút',
        price: 400000,
        image: 'https://via.placeholder.com/400x300/e67e22/FFFFFF?text=Echo+Cardiac',
        badge: 'Khuyên dùng',
        overview: {
            description: 'Siêu âm tim mạch sử dụng sóng siêu âm để tạo hình ảnh tim, đánh giá chức năng và phát hiện các bất thường.',
            benefits: [
                'Đánh giá chức năng tim',
                'Phát hiện bệnh van tim',
                'Kiểm tra cơ tim',
                'Theo dõi bệnh tim bẩm sinh'
            ],
            target: 'Người có triệu chứng tim mạch hoặc cần kiểm tra sức khỏe tim mạch định kỳ.',
            duration: '20-30 phút'
        },
        details: {
            process: [
                { step: 1, title: 'Chuẩn bị', description: 'Tháo đồ trang sức, cởi áo khoác ngoài' },
                { step: 2, title: 'Ống gel', description: 'Bôi gel siêu âm lên vùng ngực' },
                { step: 3, title: 'Chụp siêu âm', description: 'Sử dụng đầu dò siêu âm để chụp tim' },
                { step: 4, title: 'Đọc kết quả', description: 'Bác sĩ phân tích và kết luận' }
            ],
            preparation: [
                'Không cần nhịn ăn',
                'Mặc áo thoải mái',
                'Mang theo kết quả siêu âm cũ',
                'Thông báo tiền sử bệnh tim'
            ],
            aftercare: 'Có thể sinh hoạt bình thường. Nhận kết quả trong ngày hoặc 1-2 ngày sau.'
        },
        pricing: [
            { name: 'Siêu âm tim cơ bản', details: 'Đánh giá chức năng tim', price: 400000 },
            { name: 'Siêu âm tim nâng cao', details: 'Bao gồm Doppler màu', price: 550000 },
            { name: 'Siêu âm tim thai nhi', details: 'Siêu âm tim thai nhi', price: 350000 }
        ]
    },
    {
        id: 4,
        name: 'Tiêm Chủng Vaccine',
        category: 'cham-soc-suc-khoe',
        icon: 'fas fa-syringe',
        description: 'Tiêm vaccine phòng ngừa các bệnh truyền nhiễm.',
        rating: 4.7,
        reviews: 203,
        duration: '10-15 phút',
        price: 200000,
        image: 'https://via.placeholder.com/400x300/9b59b6/FFFFFF?text=Vaccination',
        overview: {
            description: 'Dịch vụ tiêm chủng vaccine phòng ngừa các bệnh truyền nhiễm cho trẻ em và người lớn.',
            benefits: [
                'Phòng ngừa bệnh truyền nhiễm',
                'Tạo miễn dịch chủ động',
                'Bảo vệ sức khỏe cộng đồng',
                'Giảm nguy cơ biến chứng'
            ],
            target: 'Trẻ em và người lớn cần tiêm vaccine phòng ngừa theo khuyến cáo của Bộ Y Tế.',
            duration: '10-15 phút'
        },
        details: {
            process: [
                { step: 1, title: 'Tư vấn', description: 'Bác sĩ tư vấn về loại vaccine và lịch tiêm' },
                { step: 2, title: 'Khám sàng lọc', description: 'Kiểm tra sức khỏe trước tiêm' },
                { step: 3, title: 'Tiêm vaccine', description: 'Tiêm vaccine theo đúng quy trình' },
                { step: 4, title: 'Theo dõi', description: 'Theo dõi phản ứng sau tiêm' }
            ],
            preparation: [
                'Mang theo sổ tiêm chủng',
                'Thông báo tiền sử dị ứng',
                'Ăn uống bình thường',
                'Mặc áo ngắn tay'
            ],
            aftercare: 'Theo dõi tại chỗ 30 phút. Tiêm mũi tiếp theo theo lịch hẹn.'
        },
        pricing: [
            { name: 'Vaccine 6 trong 1', details: 'Phòng 6 bệnh truyền nhiễm', price: 200000 },
            { name: 'Vaccine sởi', details: 'Phòng bệnh sởi', price: 150000 },
            { name: 'Vaccine thủy đậu', details: 'Phòng bệnh thủy đậu', price: 180000 },
            { name: 'Vaccine cúm', details: 'Phòng bệnh cúm mùa', price: 250000 }
        ]
    },
    {
        id: 5,
        name: 'Khám Sản Phụ Khoa',
        category: 'kham-chua-benh',
        icon: 'fas fa-baby',
        description: 'Khám và tư vấn sức khỏe sinh sản cho phụ nữ.',
        rating: 4.8,
        reviews: 178,
        duration: '20-30 phút',
        price: 250000,
        image: 'https://via.placeholder.com/400x300/e91e63/FFFFFF?text=Gynecology',
        overview: {
            description: 'Khám sản phụ khoa bao gồm kiểm tra sức khỏe sinh sản, tầm soát ung bướu và tư vấn chăm sóc sức khỏe phụ nữ.',
            benefits: [
                'Kiểm tra sức khỏe sinh sản',
                'Tầm soát ung bướu cổ tử cung',
                'Tư vấn kế hoạch hóa gia đình',
                'Chăm sóc sức khỏe phụ nữ'
            ],
            target: 'Phụ nữ từ 18 tuổi trở lên cần kiểm tra sức khỏe sinh sản định kỳ.',
            duration: '20-30 phút'
        },
        details: {
            process: [
                { step: 1, title: 'Thăm khám', description: 'Thăm khám và hỏi bệnh sử' },
                { step: 2, title: 'Khám bụng', description: 'Khám bụng và vùng chậu' },
                { step: 3, title: 'Khám trong', description: 'Khám phụ khoa nội tiết' },
                { step: 4, title: 'Tư vấn', description: 'Tư vấn và hướng dẫn chăm sóc' }
            ],
            preparation: [
                'Tránh quan hệ trước khám 2-3 ngày',
                'Không dùng dung dịch vệ sinh phụ khoa',
                'Mang theo kết quả khám cũ',
                'Thông báo kinh nguyệt'
            ],
            aftercare: 'Có thể sinh hoạt bình thường. Tái khám theo lịch hẹn của bác sĩ.'
        },
        pricing: [
            { name: 'Khám sản phụ khoa cơ bản', details: 'Khám thường quy', price: 250000 },
            { name: 'Khám sản phụ khoa nâng cao', details: 'Bao gồm siêu âm', price: 400000 },
            { name: 'Tầm soát ung bướu', details: 'Pap smear + HPV', price: 350000 }
        ]
    },
    {
        id: 6,
        name: 'Khám Răng Hàm Mặt',
        category: 'kham-chua-benh',
        icon: 'fas fa-tooth',
        description: 'Khám và điều trị các bệnh lý răng miệng.',
        rating: 4.5,
        reviews: 134,
        duration: '30-45 phút',
        price: 150000,
        image: 'https://via.placeholder.com/400x300/2ecc71/FFFFFF?text=Dentistry',
        overview: {
            description: 'Khám răng miệng bao gồm kiểm tra răng, nha chu, phát hiện sớm bệnh lý và điều trị kịp thời.',
            benefits: [
                'Phát hiện sâu răng sớm',
                'Kiểm tra bệnh nha chu',
                'Tư vấn chăm sóc răng miệng',
                'Điều trị các bệnh lý răng miệng'
            ],
            target: 'Người lớn và trẻ em cần kiểm tra sức khỏe răng miệng định kỳ.',
            duration: '30-45 phút'
        },
        details: {
            process: [
                { step: 1, title: 'Khám tổng quát', description: 'Kiểm tra toàn bộ răng miệng' },
                { step: 2, title: 'Chụp X-quang', description: 'Chụp phim nếu cần thiết' },
                { step: 3, title: 'Lên kế hoạch', description: 'Lập kế hoạch điều trị' },
                { step: 4, title: 'Điều trị', description: 'Thực hiện điều trị cần thiết' }
            ],
            preparation: [
                'Đánh răng trước khi đến',
                'Mang theo kết quả khám cũ',
                'Thông báo dị ứng thuốc',
                'Ăn uống bình thường'
            ],
            aftercare: 'Theo dõi răng miệng và tái khám theo lịch hẹn của bác sĩ.'
        },
        pricing: [
            { name: 'Khám răng cơ bản', details: 'Khám tổng quát', price: 150000 },
            { name: 'Trám răng', details: 'Điều trị sâu răng', price: 300000 },
            { name: 'Nhổ răng', details: 'Nhổ răng khôn', price: 500000 },
            { name: 'Cạo vôi răng', details: 'Vệ sinh răng miệng', price: 250000 }
        ]
    }
];

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    initializeServices();
});

// Initialize services page
function initializeServices() {
    // Load initial services
    currentServices = [...servicesData];
    filteredServices = [...currentServices];

    // Display services
    displayServices(filteredServices);

    // Setup event listeners
    setupServicesEventListeners();
}

// Setup event listeners
function setupServicesEventListeners() {
    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            searchServices();
        });
    }
}

// Filter services by category
function filterServices(category) {
    currentCategory = category;

    // Update active category button
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    const activeBtn = document.querySelector(`[onclick="filterServices('${category}')"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }

    // Filter services
    if (category === 'all') {
        filteredServices = [...currentServices];
    } else {
        filteredServices = currentServices.filter(service => service.category === category);
    }

    displayServices(filteredServices);
}

// Search services
function searchServices() {
    const searchTerm = document.querySelector('.search-box input').value.toLowerCase().trim();

    if (!searchTerm) {
        // If search is empty, apply current category filter
        filterServices(currentCategory);
        return;
    }

    // Search in service names and descriptions
    filteredServices = currentServices.filter(service => {
        const nameMatch = service.name.toLowerCase().includes(searchTerm);
        const descriptionMatch = service.description.toLowerCase().includes(searchTerm);

        // Also check category filter
        const categoryMatch = currentCategory === 'all' || service.category === currentCategory;

        return (nameMatch || descriptionMatch) && categoryMatch;
    });

    displayServices(filteredServices);
}

// Display services
function displayServices(services) {
    const servicesGrid = document.getElementById('servicesGrid');
    const loadMore = document.getElementById('loadMore');

    if (!servicesGrid) return;

    if (services.length === 0) {
        servicesGrid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-search"></i>
                <h3>Không tìm thấy dịch vụ</h3>
                <p>Thử thay đổi từ khóa tìm kiếm hoặc chọn danh mục khác</p>
            </div>
        `;
        if (loadMore) loadMore.style.display = 'none';
        return;
    }

    // Display services (limit to first 6 for initial load)
    const displayCount = Math.min(services.length, 6);
    const servicesToShow = services.slice(0, displayCount);

    servicesGrid.innerHTML = servicesToShow.map(service => createServiceCard(service)).join('');

    // Show/hide load more button
    if (loadMore) {
        loadMore.style.display = services.length > displayCount ? 'block' : 'none';
    }
}

// Create service card HTML
function createServiceCard(service) {
    const iconClass = `service-icon ${service.category}`;
    const badgeHtml = service.badge ? `<div class="service-badge">${service.badge}</div>` : '';

    return `
        <div class="service-card" onclick="openServiceModal(${service.id})">
            <div class="service-image">
                <img src="${service.image}" alt="${service.name}">
                ${badgeHtml}
            </div>
            <div class="service-content">
                <div class="${iconClass}">
                    <i class="${service.icon}"></i>
                </div>
                <div class="service-name">${service.name}</div>
                <div class="service-description">${service.description}</div>
                <div class="service-details">
                    <div class="service-rating">
                        <div class="stars">${generateStars(service.rating)}</div>
                        <span>${service.rating} (${service.reviews})</span>
                    </div>
                    <div class="service-duration">
                        <i class="fas fa-clock"></i>
                        <span>${service.duration}</span>
                    </div>
                </div>
                <div class="service-details">
                    <div class="service-price">
                        <i class="fas fa-dollar-sign"></i>
                        <span>${formatCurrency(service.price)}</span>
                    </div>
                </div>
                <div class="service-actions">
                    <button class="btn btn-outline" onclick="event.stopPropagation(); openServiceModal(${service.id})">
                        <i class="fas fa-info-circle"></i>
                        Chi tiết
                    </button>
                    <button class="btn btn-primary" onclick="event.stopPropagation(); bookService(${service.id})">
                        <i class="fas fa-calendar-plus"></i>
                        Đặt lịch
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

// Open service modal
function openServiceModal(serviceId) {
    const service = servicesData.find(s => s.id === serviceId);
    if (!service) return;

    // Populate modal with service data
    document.getElementById('modalServiceIcon').className = service.icon;
    document.getElementById('modalServiceName').textContent = service.name;
    document.getElementById('modalServiceCategory').textContent = getCategoryName(service.category);
    document.getElementById('modalServiceStars').innerHTML = generateStars(service.rating);
    document.getElementById('modalServiceRating').textContent = `${service.rating} (${service.reviews} đánh giá)`;

    // Overview tab
    document.getElementById('modalServiceDescription').textContent = service.overview.description;

    const benefitsList = document.getElementById('modalServiceBenefits');
    benefitsList.innerHTML = service.overview.benefits.map(benefit => `<li>${benefit}</li>`).join('');

    document.getElementById('modalServiceTarget').textContent = service.overview.target;
    document.getElementById('modalServiceDuration').textContent = service.overview.duration;

    // Details tab
    const processSteps = document.getElementById('modalServiceProcess');
    processSteps.innerHTML = service.details.process.map(step => `
        <div class="step">
            <div class="step-number">${step.step}</div>
            <div class="step-content">
                <h4>${step.title}</h4>
                <p>${step.description}</p>
            </div>
        </div>
    `).join('');

    const preparationList = document.getElementById('modalServicePreparation');
    preparationList.innerHTML = service.details.preparation.map(item => `<li>${item}</li>`).join('');

    document.getElementById('modalServiceAftercare').textContent = service.details.aftercare;

    // Pricing tab
    const pricingBody = document.getElementById('modalServicePricing');
    pricingBody.innerHTML = service.pricing.map(item => `
        <div class="pricing-item ${item.featured ? 'featured' : ''}">
            <div class="pricing-info">
                <div class="pricing-name">${item.name}</div>
                <div class="pricing-details">${item.details}</div>
            </div>
            <div class="pricing-price">${formatCurrency(item.price)}</div>
            ${item.featured ? '<div class="pricing-badge">Phổ biến</div>' : ''}
        </div>
    `).join('');

    // Show modal
    document.getElementById('serviceModal').style.display = 'block';
    document.body.style.overflow = 'hidden';

    // Switch to overview tab
    switchServiceTab('overview');
}

// Close service modal
function closeServiceModal() {
    document.getElementById('serviceModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Switch service tab
function switchServiceTab(tabName) {
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

// Get category name
function getCategoryName(category) {
    const categories = {
        'kham-chua-benh': 'Khám chữa bệnh',
        'xet-nghiem': 'Xét nghiệm',
        'cham-soc-suc-khoe': 'Chăm sóc sức khỏe',
        'dich-vu-khac': 'Dịch vụ khác'
    };
    return categories[category] || category;
}

// Book service
function bookService(serviceId) {
    closeServiceModal();
    // Redirect to appointment booking page with service pre-selected
    window.location.href = `appointment-booking.html?service=${serviceId}`;
}

// Load more services
function loadMoreServices() {
    const servicesGrid = document.getElementById('servicesGrid');
    const loadMore = document.getElementById('loadMore');

    // Show all services
    displayServices(filteredServices);

    // Hide load more button
    if (loadMore) {
        loadMore.style.display = 'none';
    }
}

// Toggle FAQ
function toggleFaq(element) {
    const faqItem = element.parentElement;
    const isActive = faqItem.classList.contains('active');

    // Close all FAQs
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });

    // Open clicked FAQ if it wasn't active
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Contact form submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Basic validation
            const inputs = this.querySelectorAll('input[required], select[required], textarea[required]');
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
                // Show success message
                alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong vòng 24 giờ.');

                // Reset form
                this.reset();

                // Reset border colors
                inputs.forEach(input => {
                    input.style.borderColor = '#e1e5e9';
                });
            } else {
                alert('Vui lòng điền đầy đủ thông tin!');
            }
        });
    }
});



