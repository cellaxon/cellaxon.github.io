// CELLAXON AI Finder Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initScrollAnimations();
    initPricingCards();
    initContactForm();
    initSmoothScrolling();
    initFeatureCards();
    initFullpageNavigation();
    initWheelFullpage();
    initMobileTapNavigation();
    initEmailCanvasButtons();
    initParallax();
    initMobileMenu();
    initLazyLoading();
});

// Navigation functionality
function initNavigation() {
    // If nav doesn't exist (we removed it for fullpage layout), skip nav behaviors
    const nav = document.querySelector('nav');
    if (!nav) return;
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

// Email canvas buttons: render email text as image on a canvas to reduce scraping
function initEmailCanvasButtons() {
    const buttons = document.querySelectorAll('button.email-canvas');
    if (!buttons.length) return;

    buttons.forEach(btn => {
        const user = btn.dataset.user || 'contact';
        const domain = btn.dataset.domain || 'example.com';
        const email = `${user}@${domain}`;

        // create canvas
        const canvas = document.createElement('canvas');
        const width = 260;
        const height = 40;
        canvas.width = width;
        canvas.height = height;
        canvas.style.width = `${width/1.5}px`;
        canvas.style.height = `${height/1.5}px`;
        canvas.style.border = 'none';
        canvas.style.background = 'transparent';
        canvas.setAttribute('aria-hidden', 'true');

        const ctx = canvas.getContext('2d');
        // background rounded rect
        const radius = 8;
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.moveTo(radius, 0);
        ctx.lineTo(width - radius, 0);
        ctx.quadraticCurveTo(width, 0, width, radius);
        ctx.lineTo(width, height - radius);
        ctx.quadraticCurveTo(width, height, width - radius, height);
        ctx.lineTo(radius, height);
        ctx.quadraticCurveTo(0, height, 0, height - radius);
        ctx.lineTo(0, radius);
        ctx.quadraticCurveTo(0, 0, radius, 0);
        ctx.closePath();
        ctx.fill();

        // icon circle
        ctx.fillStyle = '#667eea';
        ctx.beginPath();
        ctx.arc(24, height/2, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.font = '16px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('@', 24, height/2 + 1);

        // email text
        ctx.fillStyle = '#333';
        ctx.font = 'bold 14px system-ui, -apple-system, Segoe UI, Roboto, Arial';
        ctx.textAlign = 'left';
        ctx.fillText(email, 48, height/2 + 1);

        // append canvas to button
        btn.appendChild(canvas);

        // click opens mail client
        btn.addEventListener('click', function() {
            window.location.href = `mailto:${email}`;
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
    
    // Observe elements for animation (exclude feature-card to remove the upward float effect)
    const animateElements = document.querySelectorAll('.pricing-card, .animate-on-scroll');
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
            const href = this.getAttribute('href');
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            // If a fixed nav exists, keep the legacy offset. Otherwise scroll to exact section top
            const hasFixedNav = !!document.querySelector('nav');
            const navOffset = hasFixedNav ? 80 : 0;
            const top = target.offsetTop - navOffset;
            window.scrollTo({ top: top, behavior: 'smooth' });
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

// Fullpage navigation: right-side dots + keyboard support
function initFullpageNavigation() {
    const sections = Array.from(document.querySelectorAll('.fullpage-section'));
    if (!sections.length) return;

    // Create indicator
    const indicator = document.createElement('div');
    indicator.className = 'page-indicator';
    sections.forEach((s, i) => {
        const btn = document.createElement('button');
        btn.setAttribute('aria-label', `Go to section ${i+1}`);
        btn.addEventListener('click', () => {
            window.scrollTo({ top: s.offsetTop, behavior: 'smooth' });
        });
        indicator.appendChild(btn);
    });
    document.body.appendChild(indicator);

    const buttons = Array.from(indicator.querySelectorAll('button'));

    function updateActive() {
        const scrollTop = window.scrollY;
        let activeIndex = 0;
        sections.forEach((sec, idx) => {
            if (scrollTop >= sec.offsetTop - sec.clientHeight/2) {
                activeIndex = idx;
            }
        });
        buttons.forEach(b => b.classList.remove('active'));
        if (buttons[activeIndex]) buttons[activeIndex].classList.add('active');
    }

    // Initial active
    updateActive();

    let scrollTimeout;
    window.addEventListener('scroll', () => {
        // throttle updates
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(updateActive, 80);
    });

    // Keyboard navigation
    window.addEventListener('keydown', (e) => {
        if (document.activeElement && ['INPUT','TEXTAREA','SELECT','BUTTON'].includes(document.activeElement.tagName)) return;
        if (e.key === 'ArrowDown' || e.key === 'PageDown') {
            e.preventDefault();
            const next = Math.min(sections.length - 1, buttons.findIndex(b => b.classList.contains('active')) + 1 || 1);
            sections[next] && window.scrollTo({ top: sections[next].offsetTop, behavior: 'smooth' });
        }
        if (e.key === 'ArrowUp' || e.key === 'PageUp') {
            e.preventDefault();
            const prevIdx = Math.max(0, (buttons.findIndex(b => b.classList.contains('active')) - 1) || 0);
            sections[prevIdx] && window.scrollTo({ top: sections[prevIdx].offsetTop, behavior: 'smooth' });
        }
    });
}

// Wheel-based fullpage scrolling: jump one section per wheel event (desktop only)
function initWheelFullpage() {
    const sections = Array.from(document.querySelectorAll('.fullpage-section'));
    if (!sections.length) return;

    let isLocked = false;
    const lockDuration = 800; // ms

    function getCurrentIndex() {
        const scrollTop = window.scrollY;
        let idx = 0;
        sections.forEach((sec, i) => {
            if (scrollTop >= sec.offsetTop - sec.clientHeight / 2) idx = i;
        });
        return idx;
    }

        // wheel handler (robust normalization for different event types)
        function onWheel(rawEvent) {
            const e = rawEvent || window.event;
            // disable on small screens / touch devices
            if (window.innerWidth <= 768) return;
            if (document.activeElement && ['INPUT','TEXTAREA','SELECT','BUTTON'].includes(document.activeElement.tagName)) return;
            if (isLocked) return;

            // Normalize delta from different event models
            let delta = 0;
            if (typeof e.deltaY === 'number') {
                delta = e.deltaY;
            } else if (typeof e.wheelDelta === 'number') {
                // wheelDelta is typically ±120 per tick, invert to match deltaY direction
                delta = -e.wheelDelta;
            } else if (typeof e.detail === 'number') {
                delta = e.detail * 16;
            }

            // Normalize deltaMode (1 = lines)
            if (e.deltaMode === 1) {
                delta = delta * 16;
            }

            // Small noise guard
            if (Math.abs(delta) < 0.5) return;

            // Prevent default scrolling when we will snap
            try { e.preventDefault(); } catch (err) {}

            const current = getCurrentIndex();
            const nextIndex = Math.max(0, Math.min(sections.length - 1, current + (delta > 0 ? 1 : -1)));
            if (nextIndex === current) return;

            isLocked = true;
            window.scrollTo({ top: sections[nextIndex].offsetTop, behavior: 'smooth' });
            setTimeout(() => { isLocked = false; }, lockDuration);
        }

        // Register wheel-like events with passive:false if supported; fallback to legacy addEventListener signature
        const addListener = (target, name) => {
            try {
                target.addEventListener(name, onWheel, { passive: false, capture: true });
            } catch (err) {
                try { target.addEventListener(name, onWheel, false); } catch (err2) {}
            }
        };

        ['wheel', 'mousewheel', 'DOMMouseScroll'].forEach(evt => {
            addListener(window, evt);
            addListener(document, evt);
        });

    window.addEventListener('wheel', onWheel, { passive: false });
}

// Mobile tap navigation: touch top/bottom areas to go prev/next (mobile only)
function initMobileTapNavigation() {
    const sections = Array.from(document.querySelectorAll('.fullpage-section'));
    if (!sections.length) return;

    let isLocked = false;
    const lockDuration = 600; // ms

    function getCurrentIndex() {
        const scrollTop = window.scrollY;
        let idx = 0;
        sections.forEach((sec, i) => {
            if (scrollTop >= sec.offsetTop - sec.clientHeight / 2) idx = i;
        });
        return idx;
    }

    function onTouchEnd(e) {
        if (window.innerWidth > 768) return; // only mobile
        if (!e.changedTouches || e.changedTouches.length === 0) return;
        // ignore if interacting with form elements
        if (document.activeElement && ['INPUT','TEXTAREA','SELECT','BUTTON'].includes(document.activeElement.tagName)) return;
        if (isLocked) return;

        const touch = e.changedTouches[0];
        const y = touch.clientY;
        const h = window.innerHeight;

        // Define top/bottom zones (top 25%, bottom 25%)
        const topZone = h * 0.25;
        const bottomZone = h * 0.75;

        const current = getCurrentIndex();
        let targetIndex = null;
        if (y <= topZone) {
            targetIndex = Math.max(0, current - 1);
        } else if (y >= bottomZone) {
            targetIndex = Math.min(sections.length - 1, current + 1);
        } else {
            return; // middle tap: ignore
        }

        if (targetIndex === current || targetIndex === null) return;

        isLocked = true;
        window.scrollTo({ top: sections[targetIndex].offsetTop, behavior: 'smooth' });
        setTimeout(() => { isLocked = false; }, lockDuration);
    }

    // Use touchend to detect taps; don't interfere with scrolling gestures
    window.addEventListener('touchend', onTouchEnd, { passive: true });
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

// Smooth scrolling between sections when reaching the bottom of a section
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.fullpage-section');
    let isScrolling = false;

    window.addEventListener('scroll', () => {
        if (isScrolling) return;

        const currentSection = Array.from(sections).find(section => {
            const rect = section.getBoundingClientRect();
            return rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
        });

        if (!currentSection) return;

        const rect = currentSection.getBoundingClientRect();

        if (rect.bottom <= window.innerHeight && window.scrollY + window.innerHeight < document.body.scrollHeight) {
            isScrolling = true;
            const nextSection = currentSection.nextElementSibling;
            if (nextSection && nextSection.classList.contains('fullpage-section')) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
                setTimeout(() => (isScrolling = false), 1000);
            } else {
                isScrolling = false;
            }
        }

        // Scroll to the previous section when reaching the top
        if (rect.top >= 0 && window.scrollY > 0) {
            isScrolling = true;
            const prevSection = currentSection.previousElementSibling;
            if (prevSection && prevSection.classList.contains('fullpage-section')) {
                prevSection.scrollIntoView({ behavior: 'smooth' });
                setTimeout(() => (isScrolling = false), 1000);
            } else {
                isScrolling = false;
            }
        }
    });
});

// Redirect users based on browser language
document.addEventListener('DOMContentLoaded', () => {
    const userLang = navigator.language || navigator.userLanguage;
    const isKorean = userLang.startsWith('ko');

    // Redirect to Korean page if the user's language is Korean
    if (isKorean) {
        const currentPath = window.location.pathname;
        if (!currentPath.startsWith('/ko/')) {
            window.location.href = '/ko/' + currentPath;
        }
    }
});
