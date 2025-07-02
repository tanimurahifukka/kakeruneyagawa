// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorDot = document.querySelector('.cursor-dot');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
});

document.addEventListener('mousedown', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
});

document.addEventListener('mouseup', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
});

// Mobile Navigation Toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const navMenu = document.querySelector('.nav-menu');

mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    const spans = mobileToggle.querySelectorAll('span');
    spans[0].style.transform = navMenu.classList.contains('active') 
        ? 'rotate(45deg) translateY(8px)' 
        : 'none';
    spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
    spans[2].style.transform = navMenu.classList.contains('active') 
        ? 'rotate(-45deg) translateY(-8px)' 
        : 'none';
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth Scrolling
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = targetSection.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            navMenu.classList.remove('active');
            const spans = mobileToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
});

// Active Navigation Link
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navHeight = navbar.offsetHeight;
    const scrollPosition = window.scrollY + navHeight + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Matrix Rain Effect
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const matrixContainer = document.querySelector('.matrix-rain');
    
    matrixContainer.appendChild(canvas);
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    const matrixArray = matrix.split("");
    
    const fontSize = 10;
    const columns = canvas.width / fontSize;
    
    const drops = [];
    for(let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
    
    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00D4FF';
        ctx.font = fontSize + 'px monospace';
        
        for(let i = 0; i < drops.length; i++) {
            const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if(drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(drawMatrix, 35);
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

createMatrixRain();

// Particle Effect
const particleContainer = document.getElementById('particleContainer');

function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 4 + 1;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    const duration = Math.random() * 20 + 10;
    particle.style.animation = `float ${duration}s infinite ease-in-out`;
    
    particleContainer.appendChild(particle);
    
    setTimeout(() => particle.remove(), duration * 1000);
}

// Initial particles
for (let i = 0; i < 50; i++) {
    setTimeout(createParticle, i * 100);
}

// Continuous particle generation
setInterval(createParticle, 500);

// Background Lines
const bgAnimation = document.getElementById('bgAnimation');

function createLine() {
    const line = document.createElement('div');
    line.className = 'bg-line';
    line.style.top = Math.random() * 100 + '%';
    line.style.width = Math.random() * 300 + 100 + 'px';
    line.style.animationDuration = Math.random() * 10 + 5 + 's';
    line.style.opacity = Math.random() * 0.3;
    
    bgAnimation.appendChild(line);
    
    setTimeout(() => line.remove(), 15000);
}

setInterval(createLine, 1000);

// Typing Effect
const typingText = document.querySelector('.typing-text');
if (typingText) {
    const text = typingText.textContent;
    typingText.textContent = '';
    let index = 0;
    
    function type() {
        if (index < text.length) {
            typingText.textContent += text.charAt(index);
            index++;
            setTimeout(type, 100);
        }
    }
    
    setTimeout(type, 1000);
}

// Counter Animation
const statNumbers = document.querySelectorAll('.stat-number');

const observerOptions = {
    threshold: 0.5
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const finalValue = parseInt(target.getAttribute('data-value'));
            let currentValue = 0;
            
            const increment = finalValue / 50;
            
            const counter = setInterval(() => {
                currentValue += increment;
                if (currentValue >= finalValue) {
                    currentValue = finalValue;
                    clearInterval(counter);
                }
                target.textContent = Math.floor(currentValue);
            }, 30);
            
            counterObserver.unobserve(target);
        }
    });
}, observerOptions);

statNumbers.forEach(number => {
    counterObserver.observe(number);
});

// Skill Level Animation
const skillItems = document.querySelectorAll('.skill-item');

skillItems.forEach(item => {
    const level = item.querySelector('.skill-level');
    const value = level.getAttribute('data-level');
    level.style.setProperty('--level', value + '%');
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Hero Text Animation
gsap.from(".hero-title span", {
    y: 100,
    opacity: 0,
    duration: 1.5,
    stagger: 0.2,
    ease: "power4.out",
    delay: 0.5
});

gsap.from(".hero-subtitle", {
    y: 50,
    opacity: 0,
    duration: 1,
    delay: 1,
    ease: "power3.out"
});

gsap.from(".hero-description", {
    y: 30,
    opacity: 0,
    duration: 1,
    delay: 1.3,
    ease: "power3.out"
});

gsap.from(".formula-item", {
    scale: 0,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    delay: 1.5,
    ease: "back.out(1.7)"
});

gsap.from(".hero-buttons .btn", {
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    delay: 2,
    ease: "power3.out"
});

// Section Animations
gsap.utils.toArray('.section-title').forEach(title => {
    gsap.from(title, {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: title,
            start: "top 80%"
        }
    });
});

gsap.utils.toArray('.about-card').forEach(card => {
    gsap.from(card, {
        x: -100,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: card,
            start: "top 80%"
        }
    });
});

gsap.utils.toArray('.code-window').forEach(window => {
    gsap.from(window, {
        x: 100,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: window,
            start: "top 80%"
        }
    });
});

gsap.utils.toArray('.project-card').forEach((card, index) => {
    gsap.from(card, {
        y: 100,
        opacity: 0,
        duration: 1,
        delay: index * 0.1,
        scrollTrigger: {
            trigger: card,
            start: "top 80%"
        }
    });
});

gsap.utils.toArray('.skill-category').forEach((category, index) => {
    gsap.from(category, {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: index * 0.2,
        scrollTrigger: {
            trigger: category,
            start: "top 80%"
        }
    });
});

// 3D Card Effect
document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// Form Handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Here you would typically send the form data to a server
    alert(`Thank you for your message, ${name}! I'll get back to you at ${email} soon.`);
    
    contactForm.reset();
});

// Parallax Effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Float Animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translate(${Math.random() * 200 - 100}px, -100vh) rotate(${Math.random() * 360}deg);
        }
    }
`;
document.head.appendChild(style);