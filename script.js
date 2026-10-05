/* ===================== NAVBAR SCROLL ===================== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    updateActiveLink();
});

/* ===================== MENU MOBILE ===================== */
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('open');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('open');
    });
});

/* ===================== LINK ATIVO ===================== */
const sections = document.querySelectorAll('section[id]');
function updateActiveLink() {
    const scrollY = window.scrollY + 150;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-link[href="#${id}"]`);
        if (link) {
            link.classList.toggle('active', scrollY >= top && scrollY < top + height);
        }
    });
}

/* ===================== CONTADOR ANIMADO ===================== */
const counters = document.querySelectorAll('.stat-num');
const animateCounter = (el) => {
    const target = +el.dataset.count;
    const duration = 1800;
    const start = performance.now();

    const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target);
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target;
    };
    requestAnimationFrame(step);
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

counters.forEach(c => counterObserver.observe(c));

/* ===================== TIMELINE ANIMADA ===================== */
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 150);
            timelineObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

timelineItems.forEach(item => timelineObserver.observe(item));

/* ===================== SCROLL REVEAL SERVIÇOS ===================== */
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px)';
    card.style.transition = `all 0.6s ease ${i * 0.1}s`;
});

const serviceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            serviceObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

serviceCards.forEach(card => serviceObserver.observe(card));

/* ===================== FORMULÁRIO ===================== */
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = document.getElementById('nome').value.trim();

    formStatus.textContent = '⏳ Enviando mensagem...';
    formStatus.style.color = '#64748b';

    setTimeout(() => {
        formStatus.textContent = `✅ Obrigada, ${nome}! Sua mensagem foi enviada com sucesso.`;
        formStatus.style.color = '#22c55e';
        contactForm.reset();
        setTimeout(() => formStatus.textContent = '', 5000);
    }, 1400);
});

/* ===================== CARTÃO 3D INTERATIVO ===================== */
const businessCard = document.getElementById('businessCard');

businessCard.addEventListener('mousemove', (e) => {
    const rect = businessCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    businessCard.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
});

businessCard.addEventListener('mouseleave', () => {
    businessCard.style.transform = 'perspective(1200px) rotateX(0) rotateY(0) translateY(0) scale(1)';
});

/* ===================== SMOOTH SCROLL ===================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

/* ===================== PARALLAX DOS BLOBS ===================== */
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    document.querySelectorAll('.blob').forEach((blob, i) => {
        blob.style.transform = `translateY(${scrolled * (0.05 + i * 0.03)}px)`;
    });
});

/* ===================== INICIALIZA ===================== */
window.addEventListener('load', () => {
    updateActiveLink();
});
