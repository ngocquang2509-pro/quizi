// Chatbot JavaScript

// Global variables
let isChatbotOpen = false;
let isMinimized = false;
let conversationHistory = [];
let isTyping = false;

// Knowledge base for responses
const knowledgeBase = {
    greetings: [
        'Xin chào! Tôi có thể giúp gì cho bạn?',
        'Chào bạn! MedBot sẵn sàng hỗ trợ bạn.',
        'Hi! Tôi là trợ lý AI của MedBooking.'
    ],

    booking: {
        keywords: ['đặt lịch', 'đặt hẹn', 'khám bệnh', 'booking', 'appointment'],
        responses: [
            'Để đặt lịch khám, bạn có thể:\n\n1. Truy cập trang "Đặt lịch" trên website\n2. Chọn chuyên khoa và bác sĩ mong muốn\n3. Chọn thời gian phù hợp\n4. Điền thông tin cá nhân\n5. Thanh toán và xác nhận\n\nBạn cần tôi hướng dẫn chi tiết bước nào?',
            'Đặt lịch khám rất đơn giản! Bạn chỉ cần:\n\n• Chọn dịch vụ y tế\n• Tìm bác sĩ phù hợp\n• Chọn thời gian khám\n• Điền thông tin và thanh toán\n\nBạn muốn đặt lịch cho chuyên khoa nào?'
        ]
    },

    services: {
        keywords: ['dịch vụ', 'khám', 'xét nghiệm', 'tiêm', 'service', 'examination'],
        responses: [
            'MedBooking cung cấp các dịch vụ y tế:\n\n🏥 Khám tổng quát\n🧪 Xét nghiệm máu, siêu âm\n💉 Tiêm chủng vaccine\n🦷 Khám răng hàm mặt\n👶 Khám sản phụ khoa\n👁️ Khám mắt\n\nBạn quan tâm đến dịch vụ nào?',
            'Chúng tôi có đầy đủ các dịch vụ y tế:\n\n• Khám chữa bệnh chuyên khoa\n• Xét nghiệm và chẩn đoán hình ảnh\n• Tiêm chủng và phòng ngừa\n• Tư vấn sức khỏe từ xa\n• Chăm sóc sức khỏe định kỳ\n\nBạn cần thông tin về dịch vụ cụ thể nào?'
        ]
    },

    doctors: {
        keywords: ['bác sĩ', 'doctor', 'chuyên khoa'],
        responses: [
            'Chúng tôi hợp tác với hơn 200 bác sĩ chuyên khoa đầu ngành từ các bệnh viện uy tín:\n\n• Việt Đức, Chợ Rẫy, Bach Mai\n• Bệnh viện Trung ương Huế\n• Bệnh viện Đa khoa Cần Thơ\n\nBạn cần tìm bác sĩ chuyên khoa nào?',
            'Đội ngũ bác sĩ của chúng tôi đều là những chuyên gia hàng đầu:\n\n• Trình độ chuyên môn cao\n• Kinh nghiệm nhiều năm\n• Luôn cập nhật kiến thức mới\n• Thái độ phục vụ tận tình\n\nBạn muốn tìm bác sĩ cho bệnh lý gì?'
        ]
    },

    payment: {
        keywords: ['thanh toán', 'tiền', 'phí', 'payment', 'fee', 'cost'],
        responses: [
            'Chúng tôi hỗ trợ nhiều phương thức thanh toán:\n\n💳 Thẻ tín dụng/ghi nợ\n📱 Ví điện tử (MOMO, VNPAY)\n🏦 Chuyển khoản ngân hàng\n💵 Thanh toán tại quầy\n\nPhí khám từ 150,000 - 500,000 VND tùy dịch vụ.',
            'Thông tin thanh toán:\n\n• Thanh toán online an toàn 100%\n• Hỗ trợ MOMO, VNPAY, thẻ tín dụng\n• Hoàn tiền nếu hủy trước 24h\n• Bảo mật thông tin theo chuẩn quốc tế\n\nBạn cần hỗ trợ thanh toán?'
        ]
    },

    health: {
        keywords: ['sức khỏe', 'bệnh', 'triệu chứng', 'đau', 'ốm', 'health', 'symptoms'],
        responses: [
            'Tôi có thể cung cấp thông tin chung về sức khỏe, nhưng không thể thay thế chẩn đoán y tế chuyên nghiệp.\n\nNếu bạn có triệu chứng bất thường, hãy:\n\n1. Khám bác sĩ chuyên khoa\n2. Thực hiện các xét nghiệm cần thiết\n3. Tuân thủ phác đồ điều trị\n4. Chăm sóc sức khỏe định kỳ\n\nBạn có triệu chứng gì cụ thể?',
            'Để duy trì sức khỏe tốt:\n\n• Khám sức khỏe định kỳ 6 tháng/lần\n• Ăn uống cân bằng, đủ chất\n• Tập luyện thể dục đều đặn\n• Ngủ đủ giấc, quản lý stress\n• Tránh hút thuốc, hạn chế rượu\n\nBạn cần tư vấn về vấn đề sức khỏe nào?'
        ]
    },

    technical: {
        keywords: ['hỗ trợ', 'lỗi', 'không được', 'sai', 'technical', 'help', 'error'],
        responses: [
            'Tôi có thể giúp bạn với các vấn đề:\n\n🔧 Hướng dẫn sử dụng hệ thống\n📱 Khắc phục lỗi thường gặp\n📧 Liên hệ hỗ trợ kỹ thuật\n📞 Hotline: 1900-xxxx\n\nBạn gặp vấn đề gì?',
            'Hỗ trợ kỹ thuật:\n\n• Hướng dẫn đăng ký tài khoản\n• Khắc phục lỗi đăng nhập\n• Hướng dẫn đặt lịch khám\n• Giải đáp thắc mắc về thanh toán\n\nBạn cần hỗ trợ vấn đề nào?'
        ]
    },

    fallback: [
        'Tôi chưa hiểu rõ câu hỏi của bạn. Bạn có thể:\n\n• Nêu rõ hơn vấn đề cần hỗ trợ\n• Chọn một trong các chủ đề gợi ý\n• Liên hệ hotline 1900-xxxx\n\nBạn muốn hỏi về gì?',
        'Xin lỗi, tôi chưa nắm được thông tin bạn cần. Bạn có thể thử:\n\n• Đặt lịch khám bệnh\n• Tìm hiểu dịch vụ y tế\n• Tư vấn sức khỏe\n• Hỗ trợ kỹ thuật\n\nHoặc mô tả chi tiết hơn vấn đề của bạn.'
    ]
};

// Initialize chatbot
document.addEventListener('DOMContentLoaded', function() {
    initializeChatbot();
});

// Initialize chatbot
function initializeChatbot() {
    setupChatbotEvents();

    // Auto-show chatbot after 30 seconds
    setTimeout(() => {
        if (!isChatbotOpen) {
            showNotificationBadge();
        }
    }, 30000);

    // Save conversation history
    loadConversationHistory();
}

// Setup event listeners
function setupChatbotEvents() {
    const toggleBtn = document.getElementById('chatbotToggle');
    const minimizeBtn = document.getElementById('minimizeBtn');
    const closeBtn = document.getElementById('closeBtn');
    const sendBtn = document.getElementById('sendBtn');
    const chatInput = document.getElementById('chatInput');
    const voiceBtn = document.getElementById('voiceBtn');
    const attachBtn = document.getElementById('attachBtn');

    // Toggle chatbot
    toggleBtn.addEventListener('click', toggleChatbot);

    // Minimize/maximize
    minimizeBtn.addEventListener('click', toggleMinimize);

    // Close chatbot
    closeBtn.addEventListener('click', closeChatbot);

    // Send message
    sendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Voice input (placeholder)
    voiceBtn.addEventListener('click', startVoiceInput);

    // File attachment (placeholder)
    attachBtn.addEventListener('click', attachFile);

    // Input validation
    chatInput.addEventListener('input', function() {
        const sendBtn = document.getElementById('sendBtn');
        sendBtn.disabled = !this.value.trim();
    });
}

// Toggle chatbot visibility
function toggleChatbot() {
    const container = document.getElementById('chatbotContainer');
    const toggleBtn = document.getElementById('chatbotToggle');

    isChatbotOpen = !isChatbotOpen;

    if (isChatbotOpen) {
        container.style.display = 'flex';
        toggleBtn.innerHTML = '<i class="fas fa-times"></i>';
        hideNotificationBadge();

        // Focus input
        setTimeout(() => {
            document.getElementById('chatInput').focus();
        }, 300);
    } else {
        container.style.display = 'none';
        toggleBtn.innerHTML = '<i class="fas fa-comments"></i>';
    }
}

// Toggle minimize
function toggleMinimize() {
    const container = document.getElementById('chatbotContainer');
    const messages = document.getElementById('chatMessages');
    const inputContainer = document.getElementById('chatInputContainer');
    const quickActions = document.querySelector('.quick-actions');

    isMinimized = !isMinimized;

    if (isMinimized) {
        container.classList.add('minimized');
        messages.style.display = 'none';
        inputContainer.style.display = 'none';
        quickActions.style.display = 'none';
    } else {
        container.classList.remove('minimized');
        messages.style.display = 'block';
        inputContainer.style.display = 'block';
        quickActions.style.display = 'grid';
    }
}

// Close chatbot
function closeChatbot() {
    const container = document.getElementById('chatbotContainer');
    const toggleBtn = document.getElementById('chatbotToggle');

    isChatbotOpen = false;
    container.style.display = 'none';
    toggleBtn.innerHTML = '<i class="fas fa-comments"></i>';
}

// Send message
function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();

    if (!message) return;

    // Add user message
    addMessage(message, 'user');

    // Clear input
    input.value = '';
    document.getElementById('sendBtn').disabled = true;

    // Process message
    processMessage(message);

    // Save to history
    saveConversationHistory();
}

// Send quick message
function sendQuickMessage(message) {
    document.getElementById('chatInput').value = message;
    sendMessage();
}

// Process user message and generate response
function processMessage(message) {
    // Show typing indicator
    showTypingIndicator();

    // Simulate processing time
    setTimeout(() => {
        hideTypingIndicator();

        const response = generateResponse(message);
        addMessage(response, 'bot');

        // Save to history
        saveConversationHistory();
    }, 1000 + Math.random() * 2000); // 1-3 seconds
}

// Generate AI response based on message content
function generateResponse(message) {
    const lowerMessage = message.toLowerCase();

    // Check for keywords in each category
    for (const category in knowledgeBase) {
        if (category === 'greetings' || category === 'fallback') continue;

        const categoryData = knowledgeBase[category];
        const hasKeyword = categoryData.keywords.some(keyword =>
            lowerMessage.includes(keyword.toLowerCase())
        );

        if (hasKeyword) {
            const responses = categoryData.responses;
            return responses[Math.floor(Math.random() * responses.length)];
        }
    }

    // Check for greetings
    const greetingKeywords = ['xin chào', 'chào', 'hi', 'hello', 'chào buổi', 'good morning', 'good afternoon'];
    const isGreeting = greetingKeywords.some(keyword => lowerMessage.includes(keyword));

    if (isGreeting) {
        return knowledgeBase.greetings[Math.floor(Math.random() * knowledgeBase.greetings.length)];
    }

    // Fallback response
    return knowledgeBase.fallback[Math.floor(Math.random() * knowledgeBase.fallback.length)];
}

// Add message to chat
function addMessage(text, sender) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;

    const avatarSrc = sender === 'bot'
        ? 'https://via.placeholder.com/32x32/4A90E2/FFFFFF?text=AI'
        : 'https://via.placeholder.com/32x32/E94B3C/FFFFFF?text=You';

    messageDiv.innerHTML = `
        <div class="message-avatar">
            <img src="${avatarSrc}" alt="${sender}">
        </div>
        <div class="message-content">
            <div class="message-text">${formatMessage(text)}</div>
            <div class="message-time">${getCurrentTime()}</div>
            ${sender === 'bot' ? '<div class="message-options"><button class="message-option" onclick="copyMessage(this)"><i class="fas fa-copy"></i></button></div>' : ''}
        </div>
    `;

    messagesContainer.appendChild(messageDiv);
    scrollToBottom();
}

// Format message with line breaks
function formatMessage(text) {
    return text.replace(/\n/g, '<br>');
}

// Get current time
function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Scroll to bottom of messages
function scrollToBottom() {
    const messagesContainer = document.getElementById('chatMessages');
    setTimeout(() => {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 100);
}

// Show typing indicator
function showTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    indicator.style.display = 'flex';
    isTyping = true;
    scrollToBottom();
}

// Hide typing indicator
function hideTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    indicator.style.display = 'none';
    isTyping = false;
}

// Show notification badge
function showNotificationBadge() {
    const badge = document.getElementById('notificationBadge');
    badge.style.display = 'flex';
    badge.textContent = '1';
}

// Hide notification badge
function hideNotificationBadge() {
    const badge = document.getElementById('notificationBadge');
    badge.style.display = 'none';
}

// Copy message to clipboard
function copyMessage(button) {
    const messageText = button.closest('.message').querySelector('.message-text').textContent;

    navigator.clipboard.writeText(messageText).then(() => {
        // Show temporary feedback
        const originalIcon = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i>';
        button.style.color = '#27ae60';

        setTimeout(() => {
            button.innerHTML = originalIcon;
            button.style.color = '';
        }, 1000);
    }).catch(() => {
        alert('Không thể sao chép tin nhắn');
    });
}

// Voice input (placeholder)
function startVoiceInput() {
    const voiceBtn = document.getElementById('voiceBtn');

    if (voiceBtn.classList.contains('active')) {
        // Stop recording
        voiceBtn.classList.remove('active');
        voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
        // Process voice input here
        alert('Tính năng giọng nói sẽ được triển khai trong phiên bản tiếp theo.');
    } else {
        // Start recording
        voiceBtn.classList.add('active');
        voiceBtn.innerHTML = '<i class="fas fa-stop"></i>';
        // Start voice recording here
        alert('Đang ghi âm... Nói "Dừng" để kết thúc.');
    }
}

// File attachment (placeholder)
function attachFile() {
    // Create file input
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*,.pdf,.doc,.docx';
    input.multiple = true;

    input.onchange = function(e) {
        const files = e.target.files;
        if (files.length > 0) {
            alert(`Đã chọn ${files.length} file. Tính năng đính kèm file sẽ được triển khai trong phiên bản tiếp theo.`);
        }
    };

    input.click();
}

// Save conversation history
function saveConversationHistory() {
    const messages = document.querySelectorAll('.message');
    conversationHistory = [];

    messages.forEach(message => {
        const isUser = message.classList.contains('user-message');
        const text = message.querySelector('.message-text').textContent;
        const time = message.querySelector('.message-time').textContent;

        conversationHistory.push({
            sender: isUser ? 'user' : 'bot',
            text: text,
            time: time
        });
    });

    localStorage.setItem('medbooking_chat_history', JSON.stringify(conversationHistory));
}

// Load conversation history
function loadConversationHistory() {
    const saved = localStorage.getItem('medbooking_chat_history');
    if (saved) {
        conversationHistory = JSON.parse(saved);

        // Restore last few messages
        const recentMessages = conversationHistory.slice(-5);
        const messagesContainer = document.getElementById('chatMessages');

        recentMessages.forEach(msg => {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${msg.sender}-message`;

            const avatarSrc = msg.sender === 'bot'
                ? 'https://via.placeholder.com/32x32/4A90E2/FFFFFF?text=AI'
                : 'https://via.placeholder.com/32x32/E94B3C/FFFFFF?text=You';

            messageDiv.innerHTML = `
                <div class="message-avatar">
                    <img src="${avatarSrc}" alt="${msg.sender}">
                </div>
                <div class="message-content">
                    <div class="message-text">${msg.text}</div>
                    <div class="message-time">${msg.time}</div>
                </div>
            `;

            messagesContainer.appendChild(messageDiv);
        });

        scrollToBottom();
    }
}

// Clear conversation
function clearConversation() {
    if (confirm('Bạn có chắc muốn xóa cuộc trò chuyện?')) {
        document.getElementById('chatMessages').innerHTML = '';
        conversationHistory = [];
        localStorage.removeItem('medbooking_chat_history');

        // Add welcome message back
        setTimeout(() => {
            const messagesContainer = document.getElementById('chatMessages');
            const welcomeMessage = document.createElement('div');
            welcomeMessage.className = 'message bot-message';
            welcomeMessage.innerHTML = `
                <div class="message-avatar">
                    <img src="https://via.placeholder.com/32x32/4A90E2/FFFFFF?text=AI" alt="Bot">
                </div>
                <div class="message-content">
                    <div class="message-text">Cuộc trò chuyện đã được xóa. Bạn cần hỗ trợ gì khác?</div>
                    <div class="message-time">${getCurrentTime()}</div>
                </div>
            `;
            messagesContainer.appendChild(welcomeMessage);
            scrollToBottom();
        }, 500);
    }
}

// Export conversation (placeholder)
function exportConversation() {
    const data = JSON.stringify(conversationHistory, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'medbooking_chat_history.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Make functions globally available
window.sendQuickMessage = sendQuickMessage;
window.copyMessage = copyMessage;
window.clearConversation = clearConversation;
window.exportConversation = exportConversation;



