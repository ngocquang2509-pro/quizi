// News Page JavaScript

// Global variables
let currentArticles = [];
let filteredArticles = [];
let currentCategory = 'all';
let currentSort = 'newest';

// Sample articles data
const articlesData = [
    {
        id: 1,
        title: 'Phòng ngừa bệnh tim mạch hiệu quả từ lối sống',
        category: 'suc-khoe-tim-mach',
        excerpt: 'Bệnh tim mạch là nguyên nhân gây tử vong hàng đầu trên thế giới. Bài viết này cung cấp các giải pháp phòng ngừa hiệu quả thông qua chế độ ăn uống và tập luyện phù hợp.',
        content: 'Bệnh tim mạch là một trong những nguyên nhân gây tử vong hàng đầu trên toàn cầu...',
        author: 'BS. Nguyễn Văn A',
        authorAvatar: 'https://via.placeholder.com/50x50/4A90E2/FFFFFF?text=Dr',
        date: '2024-11-25',
        views: 2456,
        likes: 128,
        shares: 23,
        image: 'https://via.placeholder.com/400x300/4A90E2/FFFFFF?text=Heart+Health',
        tags: ['Tim mạch', 'Phòng ngừa', 'Lối sống', 'Sức khỏe'],
        featured: true
    },
    {
        id: 2,
        title: 'Các dấu hiệu sớm của bệnh tim mạch',
        category: 'suc-khoe-tim-mach',
        excerpt: 'Nhận biết sớm các triệu chứng của bệnh tim mạch giúp điều trị kịp thời và hiệu quả hơn.',
        content: 'Bệnh tim mạch thường phát triển âm thầm trong nhiều năm...',
        author: 'BS. Trần Thị B',
        authorAvatar: 'https://via.placeholder.com/50x50/E94B3C/FFFFFF?text=Dr',
        date: '2024-11-20',
        views: 1890,
        likes: 95,
        shares: 18,
        image: 'https://via.placeholder.com/400x300/E94B3C/FFFFFF?text=Heart+Signs',
        tags: ['Tim mạch', 'Triệu chứng', 'Chẩn đoán']
    },
    {
        id: 3,
        title: 'Chế độ ăn tốt cho người mắc bệnh tim',
        category: 'dinh-duong',
        excerpt: 'Những thực phẩm nên ăn và kiêng kỵ đối với người bệnh tim mạch.',
        content: 'Chế độ ăn uống đóng vai trò quan trọng trong việc kiểm soát bệnh tim mạch...',
        author: 'BS. Lê Văn C',
        authorAvatar: 'https://via.placeholder.com/50x50/50E3C2/FFFFFF?text=Dr',
        date: '2024-11-18',
        views: 1654,
        likes: 87,
        shares: 15,
        image: 'https://via.placeholder.com/400x300/50E3C2/FFFFFF?text=Heart+Diet',
        tags: ['Dinh dưỡng', 'Tim mạch', 'Chế độ ăn']
    },
    {
        id: 4,
        title: 'Bài tập tốt cho sức khỏe tim mạch',
        category: 'tap-luyen',
        excerpt: 'Các bài tập aerobic và anaerobic phù hợp cho người muốn cải thiện sức khỏe tim mạch.',
        content: 'Tập luyện thể dục là một phần quan trọng trong việc duy trì sức khỏe tim mạch...',
        author: 'HLV. Phạm Thị D',
        authorAvatar: 'https://via.placeholder.com/50x50/9B59B6/FFFFFF?text=Coach',
        date: '2024-11-15',
        views: 1423,
        likes: 76,
        shares: 12,
        image: 'https://via.placeholder.com/400x300/9B59B6/FFFFFF?text=Heart+Exercise',
        tags: ['Tập luyện', 'Tim mạch', 'Thể dục']
    },
    {
        id: 5,
        title: 'Hiểu về bệnh tiểu đường type 2',
        category: 'benh-hoc',
        excerpt: 'Toàn bộ thông tin về nguyên nhân, triệu chứng và cách điều trị bệnh tiểu đường type 2.',
        content: 'Bệnh tiểu đường type 2 là một rối loạn chuyển hóa...',
        author: 'BS. Hoàng Văn E',
        authorAvatar: 'https://via.placeholder.com/50x50/F39C12/FFFFFF?text=Dr',
        date: '2024-11-12',
        views: 2134,
        likes: 112,
        shares: 28,
        image: 'https://via.placeholder.com/400x300/F39C12/FFFFFF?text=Diabetes',
        tags: ['Tiểu đường', 'Bệnh học', 'Nội tiết']
    },
    {
        id: 6,
        title: 'Cách phòng ngừa đột quỵ hiệu quả',
        category: 'phong-ngua',
        excerpt: 'Các biện pháp phòng ngừa đột quỵ từ lối sống đến kiểm tra sức khỏe định kỳ.',
        content: 'Đột quỵ là một cấp cứu y tế nghiêm trọng...',
        author: 'BS. Vũ Thị F',
        authorAvatar: 'https://via.placeholder.com/50x50/2ECC71/FFFFFF?text=Dr',
        date: '2024-11-10',
        views: 1876,
        likes: 93,
        shares: 21,
        image: 'https://via.placeholder.com/400x300/2ECC71/FFFFFF?text=Stroke+Prevention',
        tags: ['Đột quỵ', 'Phòng ngừa', 'Sức khỏe']
    },
    {
        id: 7,
        title: 'Quản lý stress trong cuộc sống hiện đại',
        category: 'suc-khoe-tam-than',
        excerpt: 'Các kỹ thuật quản lý stress hiệu quả giúp cải thiện sức khỏe tinh thần.',
        content: 'Stress là phản ứng tự nhiên của cơ thể đối với áp lực...',
        author: 'TS. Nguyễn Thị G',
        authorAvatar: 'https://via.placeholder.com/50x50/3498DB/FFFFFF?text=Dr',
        date: '2024-11-08',
        views: 1654,
        likes: 145,
        shares: 35,
        image: 'https://via.placeholder.com/400x300/3498DB/FFFFFF?text=Stress+Management',
        tags: ['Stress', 'Tâm thần', 'Sức khỏe tinh thần']
    },
    {
        id: 8,
        title: 'Dinh dưỡng cho người cao tuổi',
        category: 'dinh-duong',
        excerpt: 'Chế độ ăn uống phù hợp giúp người cao tuổi duy trì sức khỏe tốt.',
        content: 'Tuổi tác ảnh hưởng đến nhu cầu dinh dưỡng của cơ thể...',
        author: 'BS. Trần Văn H',
        authorAvatar: 'https://via.placeholder.com/50x50/E67E22/FFFFFF?text=Dr',
        date: '2024-11-05',
        views: 1345,
        likes: 78,
        shares: 16,
        image: 'https://via.placeholder.com/400x300/E67E22/FFFFFF?text=Elderly+Nutrition',
        tags: ['Dinh dưỡng', 'Người cao tuổi', 'Sức khỏe']
    },
    {
        id: 9,
        title: 'Các bệnh lý phổ biến ở trẻ em',
        category: 'benh-hoc',
        excerpt: 'Tổng quan về các bệnh thường gặp ở trẻ em và cách phòng ngừa.',
        content: 'Trẻ em có hệ miễn dịch non nớt nên dễ mắc các bệnh truyền nhiễm...',
        author: 'BS. Lê Thị I',
        authorAvatar: 'https://via.placeholder.com/50x50/1ABC9C/FFFFFF?text=Dr',
        date: '2024-11-03',
        views: 1987,
        likes: 134,
        shares: 29,
        image: 'https://via.placeholder.com/400x300/1ABC9C/FFFFFF?text=Child+Diseases',
        tags: ['Trẻ em', 'Bệnh học', 'Phòng ngừa']
    },
    {
        id: 10,
        title: 'Tầm quan trọng của ngủ đủ giấc',
        category: 'suc-khoe-tong-quat',
        excerpt: 'Tác hại của thiếu ngủ và cách cải thiện chất lượng giấc ngủ.',
        content: 'Ngủ là quá trình phục hồi tự nhiên của cơ thể...',
        author: 'BS. Phạm Văn K',
        authorAvatar: 'https://via.placeholder.com/50x50/9B59B6/FFFFFF?text=Dr',
        date: '2024-11-01',
        views: 2234,
        likes: 167,
        shares: 42,
        image: 'https://via.placeholder.com/400x300/9B59B6/FFFFFF?text=Sleep+Health',
        tags: ['Ngủ', 'Sức khỏe', 'Phục hồi']
    }
];

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    initializeNews();
});

// Initialize news page
function initializeNews() {
    // Load initial articles
    currentArticles = [...articlesData];
    filteredArticles = [...currentArticles];

    // Display articles
    displayArticles(filteredArticles);

    // Setup event listeners
    setupNewsEventListeners();
}

// Setup event listeners
function setupNewsEventListeners() {
    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            searchArticles();
        });
    }
}

// Filter articles by category
function filterByCategory(category) {
    currentCategory = category;

    // Update active category
    document.querySelectorAll('.category-card').forEach(card => {
        card.classList.remove('active');
    });

    const activeCard = document.querySelector(`[onclick="filterByCategory('${category}')"]`);
    if (activeCard) {
        activeCard.classList.add('active');
    }

    // Filter articles
    if (category === 'all') {
        filteredArticles = [...currentArticles];
    } else {
        filteredArticles = currentArticles.filter(article => article.category === category);
    }

    // Apply sorting
    sortArticles();

    displayArticles(filteredArticles);
}

// Sort articles
function sortArticles() {
    const sortBy = document.getElementById('sortSelect').value;

    filteredArticles.sort((a, b) => {
        switch (sortBy) {
            case 'newest':
                return new Date(b.date) - new Date(a.date);
            case 'oldest':
                return new Date(a.date) - new Date(b.date);
            case 'popular':
                return b.views - a.views;
            case 'trending':
                return (b.likes + b.shares) - (a.likes + a.shares);
            default:
                return 0;
        }
    });

    displayArticles(filteredArticles);
}

// Search articles
function searchArticles() {
    const searchTerm = document.querySelector('.search-box input').value.toLowerCase().trim();

    if (!searchTerm) {
        // If search is empty, apply current category filter
        filterByCategory(currentCategory);
        return;
    }

    // Search in titles, excerpts, and tags
    filteredArticles = currentArticles.filter(article => {
        const titleMatch = article.title.toLowerCase().includes(searchTerm);
        const excerptMatch = article.excerpt.toLowerCase().includes(searchTerm);
        const tagMatch = article.tags.some(tag => tag.toLowerCase().includes(searchTerm));
        const authorMatch = article.author.toLowerCase().includes(searchTerm);

        // Also check category filter
        const categoryMatch = currentCategory === 'all' || article.category === currentCategory;

        return (titleMatch || excerptMatch || tagMatch || authorMatch) && categoryMatch;
    });

    displayArticles(filteredArticles);
}

// Display articles
function displayArticles(articles) {
    const articlesGrid = document.getElementById('articlesGrid');
    const loadMore = document.getElementById('loadMore');

    if (!articlesGrid) return;

    if (articles.length === 0) {
        articlesGrid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-search"></i>
                <h3>Không tìm thấy bài viết</h3>
                <p>Thử thay đổi từ khóa tìm kiếm hoặc chọn danh mục khác</p>
            </div>
        `;
        if (loadMore) loadMore.style.display = 'none';
        return;
    }

    // Display articles (limit to first 8 for initial load)
    const displayCount = Math.min(articles.length, 8);
    const articlesToShow = articles.slice(0, displayCount);

    articlesGrid.innerHTML = articlesToShow.map(article => createArticleCard(article)).join('');

    // Show/hide load more button
    if (loadMore) {
        loadMore.style.display = articles.length > displayCount ? 'block' : 'none';
    }
}

// Create article card HTML
function createArticleCard(article) {
    const formattedDate = formatDate(article.date);
    const categoryName = getCategoryName(article.category);

    return `
        <div class="article-card" onclick="openArticle(${article.id})">
            <div class="article-image">
                <img src="${article.image}" alt="${article.title}">
            </div>
            <div class="article-content">
                <div class="article-category">${categoryName}</div>
                <div class="article-title">${article.title}</div>
                <div class="article-excerpt">${article.excerpt}</div>
                <div class="article-meta">
                    <span class="article-author">
                        <i class="fas fa-user"></i>
                        ${article.author}
                    </span>
                    <span class="article-date">
                        <i class="fas fa-calendar"></i>
                        ${formattedDate}
                    </span>
                    <span class="article-views">
                        <i class="fas fa-eye"></i>
                        ${article.views}
                    </span>
                </div>
            </div>
        </div>
    `;
}

// Get category name
function getCategoryName(category) {
    const categories = {
        'suc-khoe-tong-quat': 'Sức khỏe tổng quát',
        'dinh-duong': 'Dinh dưỡng',
        'tap-luyen': 'Tập luyện',
        'benh-hoc': 'Bệnh học',
        'phong-ngua': 'Phòng ngừa',
        'suc-khoe-tam-than': 'Sức khỏe tâm thần',
        'suc-khoe-tim-mach': 'Sức khỏe tim mạch'
    };
    return categories[category] || category;
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

// Open article modal
function openArticle(articleId) {
    const article = articlesData.find(a => a.id === articleId);
    if (!article) return;

    // Populate modal with article data
    document.getElementById('modalArticleCategory').textContent = getCategoryName(article.category);
    document.getElementById('modalArticleTitle').textContent = article.title;

    document.getElementById('modalAuthorAvatar').src = article.authorAvatar;
    document.getElementById('modalAuthorName').textContent = article.author;
    document.getElementById('modalArticleDate').textContent = formatDate(article.date);
    document.getElementById('modalArticleViews').textContent = article.views;
    document.getElementById('modalArticleLikes').textContent = article.likes;
    document.getElementById('modalArticleShares').textContent = article.shares;

    document.getElementById('modalArticleImage').src = article.image;
    document.getElementById('modalImageCaption').textContent = 'Ảnh minh họa cho bài viết';

    document.getElementById('modalArticleBody').innerHTML = getFullArticleContent(article);

    // Display tags
    const tagsContainer = document.querySelector('.article-tags');
    if (tagsContainer) {
        tagsContainer.innerHTML = article.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
    }

    // Show modal
    document.getElementById('articleModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Get full article content
function getFullArticleContent(article) {
    // This would normally come from a full content field
    // For demo purposes, we'll return a formatted version
    return `
        <p>${article.content}</p>
        <p>Trong bài viết này, chúng tôi sẽ đi sâu vào phân tích các yếu tố nguy cơ, triệu chứng và phương pháp phòng ngừa hiệu quả nhất.</p>

        <h2>Các yếu tố nguy cơ chính</h2>
        <ul>
            <li>Di truyền gia đình</li>
            <li>Lối sống không lành mạnh</li>
            <li>Stress kéo dài</li>
            <li>Ô nhiễm môi trường</li>
        </ul>

        <h2>Triệu chứng thường gặp</h2>
        <p>Một số dấu hiệu cảnh báo sớm bao gồm:</p>
        <ul>
            <li>Mệt mỏi bất thường</li>
            <li>Đau đầu kéo dài</li>
            <li>Khó thở</li>
            <li>Tim đập nhanh</li>
        </ul>

        <h2>Biện pháp phòng ngừa</h2>
        <ol>
            <li>Khám sức khỏe định kỳ 6 tháng/lần</li>
            <li>Duy trì chế độ ăn uống cân bằng</li>
            <li>Tập luyện thể dục đều đặn</li>
            <li>Tránh stress và nghỉ ngơi hợp lý</li>
            <li>Không hút thuốc lá và hạn chế rượu bia</li>
        </ol>

        <p>Việc phát hiện sớm và điều trị kịp thời sẽ giúp bệnh nhân có cơ hội hồi phục tốt nhất. Nếu bạn có bất kỳ triệu chứng nào kể trên, hãy đến cơ sở y tế uy tín để được thăm khám.</p>

        <blockquote>
            "Sức khỏe là tài sản quý giá nhất của con người. Hãy chăm sóc bản thân ngay từ hôm nay!"
        </blockquote>

        <p>Bài viết này chỉ mang tính chất tham khảo. Để có chẩn đoán chính xác, vui lòng咨询 ý kiến bác sĩ chuyên khoa.</p>
    `;
}

// Close article modal
function closeArticleModal() {
    document.getElementById('articleModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Load more articles
function loadMoreArticles() {
    const articlesGrid = document.getElementById('articlesGrid');
    const loadMore = document.getElementById('loadMore');

    // Show all articles
    displayArticles(filteredArticles);

    // Hide load more button
    if (loadMore) {
        loadMore.style.display = 'none';
    }
}

// Subscribe to newsletter
function subscribeNewsletter() {
    const email = document.getElementById('newsletterEmail').value.trim();

    if (!email) {
        alert('Vui lòng nhập email!');
        return;
    }

    if (!validateEmail(email)) {
        alert('Email không hợp lệ!');
        return;
    }

    // Show success message
    alert('Cảm ơn bạn đã đăng ký! Bạn sẽ nhận được bản tin sức khỏe mới nhất qua email.');
    document.getElementById('newsletterEmail').value = '';

    // In a real app, this would send the email to the server
}

// Validate email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Article actions
function likeArticle() {
    alert('Cảm ơn bạn đã thích bài viết!');
    // In a real app, this would update the like count
}

function shareArticle() {
    if (navigator.share) {
        navigator.share({
            title: document.getElementById('modalArticleTitle').textContent,
            text: 'Đọc bài viết thú vị này về sức khỏe!',
            url: window.location.href
        });
    } else {
        // Fallback: copy URL to clipboard
        navigator.clipboard.writeText(window.location.href).then(() => {
            alert('Đã sao chép liên kết vào clipboard!');
        });
    }
}

function bookmarkArticle() {
    alert('Bài viết đã được lưu vào danh sách yêu thích!');
    // In a real app, this would save to user's bookmarks
}






