// Modal Functions
function showLoginModal() {
    document.getElementById('loginModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function showRegisterModal() {
    document.getElementById('registerModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('loginModal').style.display = 'none';
    document.getElementById('registerModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function switchToRegister() {
    closeModal();
    setTimeout(() => showRegisterModal(), 300);
}

function switchToLogin() {
    closeModal();
    setTimeout(() => showLoginModal(), 300);
}

// Chatbot Functions
function showChatbot() {
    document.getElementById('chatbot').style.display = 'flex';
    document.querySelector('.chatbot-toggle').style.display = 'none';
}

function closeChatbot() {
    document.getElementById('chatbot').style.display = 'none';
    document.querySelector('.chatbot-toggle').style.display = 'flex';
}

function toggleChatbot() {
    const chatbot = document.getElementById('chatbot');
    const toggle = document.querySelector('.chatbot-toggle');

    if (chatbot.style.display === 'flex') {
        closeChatbot();
    } else {
        showChatbot();
    }
}

// Navigation Functions
function scrollToServices() {
    document.getElementById('services').scrollIntoView({
        behavior: 'smooth'
    });
}

// Chatbot Message Handling
document.addEventListener('DOMContentLoaded', function() {
    const chatInput = document.querySelector('.chat-input');
    const chatSend = document.querySelector('.chat-send');
    const chatMessages = document.querySelector('.chat-messages');

    // Predefined responses
    const responses = {
        'xin chào': 'Xin chào! Tôi có thể giúp bạn tìm hiểu về các dịch vụ y tế, đặt lịch khám, hoặc trả lời câu hỏi về sức khỏe.',
        'đặt lịch': 'Để đặt lịch khám, bạn có thể chọn bác sĩ và thời gian mong muốn. Bạn muốn khám chuyên khoa nào?',
        'bác sĩ': 'Chúng tôi có đội ngũ bác sĩ chuyên khoa giàu kinh nghiệm. Bạn có thể xem thông tin chi tiết của từng bác sĩ trong phần "Bác sĩ" trên website.',
        'giá': 'Giá khám phụ thuộc vào từng dịch vụ. Bạn có thể xem chi tiết giá cả trong phần "Dịch vụ" hoặc liên hệ hotline để được tư vấn.',
        'thời gian': 'Thời gian làm việc của bệnh viện thường từ 7:00 - 17:00 các ngày trong tuần. Một số dịch vụ có thể làm việc ngoài giờ.',
        'default': 'Tôi sẽ chuyển câu hỏi của bạn đến đội ngũ hỗ trợ. Vui lòng để lại thông tin liên hệ để được hỗ trợ nhanh nhất.'
    };

    function addMessage(content, isBot = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isBot ? 'bot' : 'user'}`;

        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.innerHTML = `<p>${content}</p>`;

        messageDiv.appendChild(messageContent);
        chatMessages.appendChild(messageDiv);

        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function getResponse(message) {
        const lowerMessage = message.toLowerCase();

        for (const [key, response] of Object.entries(responses)) {
            if (lowerMessage.includes(key)) {
                return response;
            }
        }

        return responses.default;
    }

    function sendMessage() {
        const message = chatInput.value.trim();
        if (message === '') return;

        // Add user message
        addMessage(message, false);

        // Clear input
        chatInput.value = '';

        // Simulate bot response after delay
        setTimeout(() => {
            const response = getResponse(message);
            addMessage(response, true);
        }, 1000);
    }

    // Event listeners
    chatSend.addEventListener('click', sendMessage);

    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        const loginModal = document.getElementById('loginModal');
        const registerModal = document.getElementById('registerModal');

        if (event.target === loginModal) {
            closeModal();
        }
        if (event.target === registerModal) {
            closeModal();
        }
    });

    // Smooth scrolling for navigation
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
    function validateForm(form) {
        const inputs = form.querySelectorAll('input[required]');
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

    // Login form submission
    document.querySelector('#loginModal form').addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateForm(this)) {
            alert('Đăng nhập thành công!');
            closeModal();
        }
    });

    // Register form submission
    document.querySelector('#registerModal form').addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateForm(this)) {
            alert('Đăng ký thành công! Vui lòng kiểm tra email để kích hoạt tài khoản.');
            closeModal();
        }
    });

    // Service card hover effects
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Doctor card hover effects
    document.querySelectorAll('.doctor-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // News card hover effects
    document.querySelectorAll('.news-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Header scroll effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }

        lastScrollTop = scrollTop;
    });

    // Initialize chatbot greeting
    setTimeout(() => {
        if (document.querySelector('.chat-messages .message')) {
            // Greeting already exists
            return;
        }

        addMessage('Xin chào! Tôi là trợ lý AI của MedBooking. Tôi có thể giúp bạn tìm hiểu về dịch vụ y tế, đặt lịch khám hoặc trả lời các câu hỏi về sức khỏe. Bạn cần hỗ trợ gì?', true);
    }, 2000);
});



