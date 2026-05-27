document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initContactForm();
    initLogoClick();
    initCookieConsent();
});

// ========== МОБИЛЬНОЕ МЕНЮ ==========
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    
    if (!mobileMenuBtn || !mobileMenu) {
        console.warn('Элементы мобильного меню не найдены');
        return;
    }
    
    // Функция открытия
    const openMenu = () => {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    };
    
    // Функция закрытия
    const closeMenu = () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    };
    
    // Открытие по кнопке
    mobileMenuBtn.addEventListener('click', openMenu);
    
    // Закрытие по крестику
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMenu);
    }
    
    // Закрытие при клике на ссылки внутри меню
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    // Закрытие при клике на фон (тёмную область)
    mobileMenu.addEventListener('click', function(e) {
        if (e.target === mobileMenu) {
            closeMenu();
        }
    });
}

// ========== КЛИК ПО ЛОГОТИПУ ==========
function initLogoClick() {
    const logo = document.querySelector('.logo');
    const mobileLogo = document.querySelector('.mobile-logo');
    
    const goToHome = (e) => {
        e.preventDefault();
        window.location.href = 'index.html';
    };
    
    if (logo) {
        logo.style.cursor = 'pointer';
        logo.addEventListener('click', goToHome);
    }
    if (mobileLogo) {
        mobileLogo.style.cursor = 'pointer';
        mobileLogo.addEventListener('click', goToHome);
    }
}

// ========== ФОРМА И ВАЛИДАЦИЯ ==========
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = {
                name: document.getElementById('name').value.trim(),
                company: document.getElementById('company').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                email: document.getElementById('email').value.trim(),
                message: document.getElementById('message').value.trim()
            };
            if (validateForm(formData)) {
                submitForm(formData);
            }
        });
    }
}

function clearFormErrors() {
    document.querySelectorAll('.form-error').forEach(error => error.remove());
    document.querySelectorAll('.form-group input, .form-group textarea').forEach(field => {
        field.classList.remove('error');
    });
}

function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    field.classList.add('error');
    const existingError = field.parentNode.querySelector('.form-error');
    if (existingError) existingError.remove();
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error';
    errorDiv.innerHTML = `<span>${message}</span>`;
    field.parentNode.appendChild(errorDiv);
}

function validateForm(data) {
    clearFormErrors();
    let isValid = true;

    if (!data.name) {
        showFieldError('name', 'Заполните это поле');
        isValid = false;
    }
    if (!data.phone) {
        showFieldError('phone', 'Заполните это поле');
        isValid = false;
    } else if (!isValidPhone(data.phone)) {
        showFieldError('phone', 'Некорректный телефон (минимум 10 цифр)');
        isValid = false;
    }
    if (!data.email) {
        showFieldError('email', 'Заполните это поле');
        isValid = false;
    } else if (!isValidEmail(data.email)) {
        showFieldError('email', 'Некорректный email (пример: ivan@example.ru)');
        isValid = false;
    }
    if (!data.message) {
        showFieldError('message', 'Опишите вашу задачу');
        isValid = false;
    }
    return isValid;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
    return /^[\d\s\-\+\(\)]+$/.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

function submitForm(formData) {
    console.log('Отправка данных:', formData);
    showSuccessMessage('Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.');
    document.getElementById('contactForm').reset();
    clearFormErrors();
}

function showSuccessMessage(message) {
    const oldMsg = document.querySelector('.success-message');
    if (oldMsg) oldMsg.remove();

    const msg = document.createElement('div');
    msg.className = 'success-message';
    msg.innerHTML = `
        <div class="success-content">
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
            <button class="success-close">&times;</button>
        </div>
    `;
    document.body.appendChild(msg);
    setTimeout(() => msg.classList.add('show'), 10);
    
    const closeBtn = msg.querySelector('.success-close');
    closeBtn.addEventListener('click', () => {
        msg.classList.remove('show');
        setTimeout(() => msg.remove(), 400);
    });
    
    setTimeout(() => {
        if (msg && msg.parentNode) {
            msg.classList.remove('show');
            setTimeout(() => msg.remove(), 400);
        }
    }, 5000);
}

// ========== COOKIE СОГЛАСИЕ ==========
function initCookieConsent() {
    if (document.querySelector('.cookie-consent')) return;
    const consentKey = 'cookie_consent_accepted';
    if (localStorage.getItem(consentKey)) return;

    const cookieDiv = document.createElement('div');
    cookieDiv.className = 'cookie-consent';
    cookieDiv.innerHTML = `
        <p>Сайт использует cookie и аналогичные технологии для удобного и корректного отображения информации. Пользуясь нашим сервисом, вы соглашаетесь с их использованием.</p>
        <button class="cookie-btn" id="acceptCookie">Согласен</button>
    `;
    document.body.appendChild(cookieDiv);
    setTimeout(() => cookieDiv.classList.add('show'), 10);

    const acceptBtn = cookieDiv.querySelector('#acceptCookie');
    acceptBtn.addEventListener('click', () => {
        localStorage.setItem(consentKey, 'true');
        cookieDiv.classList.remove('show');
        setTimeout(() => cookieDiv.remove(), 400);
    });
}