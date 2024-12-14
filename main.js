document.addEventListener('DOMContentLoaded', () => {
    initializeParticles();
    initializeAOS();
    initializeNavbar();
    initializeTestimonials();
    initializeCounters();
});

// Initialize Particles.js
function initializeParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#ffffff'
                },
                shape: {
                    type: 'circle'
                },
                opacity: {
                    value: 0.5,
                    random: false
                },
                size: {
                    value: 3,
                    random: true
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#ffffff',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                }
            },
            retina_detect: true
        });
    }
}

// Initialize AOS (Animate On Scroll)
function initializeAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    }
}

// Enhanced Navbar Scroll Effect
function initializeNavbar() {
    const navbar = document.querySelector('.navbar-glass');
    const navbarHeight = navbar.offsetHeight;
    const heroSection = document.querySelector('.hero');

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        
        if (scrollPosition > navbarHeight) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Parallax effect for hero section
        if (heroSection) {
            heroSection.style.transform = `translateY(${scrollPosition * 0.3}px)`;
        }
    });
}

// Initialize Testimonials Slider
function initializeTestimonials() {
    const testimonials = [
        {
            name: "John Doe",
            role: "CEO, TechCorp",
            image: "assets/images/testimonial1.jpg",
            text: "BookPro has transformed how we handle appointments. The AI-powered scheduling is a game-changer!"
        },
        // Add more testimonials
    ];

    const slider = document.querySelector('.testimonial-slider');
    if (slider) {
        renderTestimonials(testimonials, slider);
        initializeSlider(slider);
    }
}

function renderTestimonials(testimonials, container) {
    const testimonialHTML = testimonials.map(testimonial => `
        <div class="testimonial-card" data-aos="fade-up">
            <div class="testimonial-content">
                <div class="testimonial-image">
                    <img src="${testimonial.image}" alt="${testimonial.name}">
                </div>
                <p class="testimonial-text">${testimonial.text}</p>
                <div class="testimonial-author">
                    <h4>${testimonial.name}</h4>
                    <p>${testimonial.role}</p>
                </div>
            </div>
        </div>
    `).join('');

    container.innerHTML = testimonialHTML;
}

// Animated Counters
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-item h3');
    const speed = 200;

    counters.forEach(counter => {
        const animate = () => {
            const value = +counter.getAttribute('data-target');
            const data = +counter.innerText;
            const time = value / speed;

            if (data < value) {
                counter.innerText = Math.ceil(data + time);
                setTimeout(animate, 1);
            } else {
                counter.innerText = value;
            }
        }
        animate();
    });
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
