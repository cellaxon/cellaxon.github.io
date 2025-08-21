// CELLAXON AI Finder Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initScrollAnimations();
    initPricingCards();
    initContactForm();
    initSmoothScrolling();
    initFeatureCards();
});

// Navigation functionality
function initNavigation() {
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    // Add scroll effect to navigation
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            nav.classList.add('bg-white/95', 'backdrop-blur-sm');
        } else {
            nav.classList.remove('bg-white/95', 'backdrop-blur-sm');
        }
    });
    
    // Active navigation highlighting
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('nav-active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('nav-active');
            }
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .pricing-card, .animate-on-scroll');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
}

// Pricing cards interaction
function initPricingCards() {
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('shadow-hover');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('shadow-hover');
        });
        
        // Add click handlers for pricing buttons
        const button = card.querySelector('button');
        if (button) {
            button.addEventListener('click', function() {
                const planName = card.querySelector('h3').textContent;
                handlePricingClick(planName);
            });
        }
    });
}

// Handle pricing button clicks
function handlePricingClick(planName) {
    if (planName === 'Enterprise') {
        // Scroll to contact section for enterprise inquiries
        document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
    } else {
        // Show download modal or redirect to app store
        showDownloadModal(planName);
    }
}

// Download modal
function showDownloadModal(planName) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white rounded-lg p-8 max-w-md mx-4">
            <h3 class="text-2xl font-bold mb-4">${planName} 플랜 다운로드</h3>
            <p class="text-gray-600 mb-6">${planName} 플랜을 다운로드하시겠습니까?</p>
            <div class="flex space-x-4">
                <button class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700" onclick="downloadApp('${planName}')">
                    다운로드
                </button>
                <button class="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400" onclick="closeModal()">
                    취소
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal on outside click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// Download app function
function downloadApp(planName) {
    // Here you would implement the actual download logic
    // For now, we'll just show a success message
    closeModal();
    showNotification(`${planName} 플랜 다운로드가 시작되었습니다.`, 'success');
}

// Close modal
function closeModal() {
    const modal = document.querySelector('.fixed.inset-0');
    if (modal) {
        modal.remove();
    }
}

// Contact form handling
function initContactForm() {
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this);
        });
    }
}

// Handle form submission
function handleFormSubmission(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Basic validation
    if (!data.name || !data.email || !data.message) {
        showNotification('모든 필드를 입력해주세요.', 'error');
        return;
    }
    
    if (!isValidEmail(data.email)) {
        showNotification('유효한 이메일 주소를 입력해주세요.', 'error');
        return;
    }
    
    // Simulate form submission
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="loading"></span> 전송 중...';
    
    setTimeout(() => {
        showNotification('문의가 성공적으로 접수되었습니다. 빠른 시일 내에 답변드리겠습니다.', 'success');
        form.reset();
        submitButton.disabled = false;
        submitButton.textContent = originalText;
    }, 2000);
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
        type === 'success' ? 'bg-green-500 text-white' :
        type === 'error' ? 'bg-red-500 text-white' :
        'bg-blue-500 text-white'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
    
    // Remove on click
    notification.addEventListener('click', function() {
        this.remove();
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navigation
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Feature cards interaction
function initFeatureCards() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('shadow-hover');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('shadow-hover');
        });
    });
}

// Parallax effect for hero section
function initParallax() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero-section');
        if (parallax) {
            const rate = scrolled * -0.5;
            parallax.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Mobile menu toggle (if needed)
function initMobileMenu() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

// Performance optimization: Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Analytics tracking (example)
function trackEvent(eventName, properties = {}) {
    // Here you would implement your analytics tracking
    // For example, Google Analytics, Mixpanel, etc.
    console.log('Event tracked:', eventName, properties);
}

// Track user interactions
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        trackEvent('navigation_click', {
            target: e.target.getAttribute('href'),
            text: e.target.textContent
        });
    }
    
    if (e.target.matches('button')) {
        trackEvent('button_click', {
            text: e.target.textContent,
            section: e.target.closest('section')?.id || 'unknown'
        });
    }
});

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    initParallax();
    initMobileMenu();
    initLazyLoading();
});
