// DOM Elements
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const skillProgress = document.querySelectorAll('.skill-progress');
const contactForm = document.querySelector('.contact-form');

// Initialize EmailJS
(function() {
    emailjs.init('DYrbHtbwchaoNl8Hd');
})();

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links with proper offset
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const navbarHeight = navbar.offsetHeight;
            const offsetTop = targetSection.offsetTop - navbarHeight - 20;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Skill bars animation
const animateSkillBars = () => {
    skillProgress.forEach(progress => {
        const width = progress.getAttribute('data-width');
        progress.style.width = width;
    });
};

// Intersection Observer for skill bars
const skillsSection = document.querySelector('.skills');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
        }
    });
}, {
    threshold: 0.5
});

if (skillsSection) {
    skillObserver.observe(skillsSection);
}

// Form submission with EmailJS
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values using name attributes
    const name = document.querySelector('input[name="name"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const message = document.querySelector('textarea[name="message"]').value;
    
    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Basic validation
    if (!name || !email || !message) {
        alert('Please fill in all fields');
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
        return;
    }
    
    // Send email using EmailJS
    emailjs.send('service_qxzxnxv', 'template_r3tt3xr', {
        from_name: name,
        from_email: email,
        message: message
    })
    .then(() => {
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
    }, (error) => {
        console.error('Failed to send message:', error);
        alert('There was an error sending your message. Please try again later.');
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
    });
});

// Active navigation link based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.stat, .skill-card, .project-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animate');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);

// Typing effect for hero section
const typingEffect = () => {
    const text = "Frontend Developer";
    const subtitle = document.querySelector('.hero-subtitle');
    let index = 0;
    
    if (subtitle) {
        subtitle.textContent = '';
        
        const type = () => {
            if (index < text.length) {
                subtitle.textContent += text.charAt(index);
                index++;
                setTimeout(type, 80);
            } else {
                // Add blinking cursor effect
                subtitle.innerHTML += '<span class="cursor">|</span>';
                const cursor = subtitle.querySelector('.cursor');
                if (cursor) {
                    setInterval(() => {
                        cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
                    }, 500);
                }
            }
        };
        
        setTimeout(type, 1000);
    }
};

// Hamburger menu animation
hamburger.addEventListener('click', () => {
    const spans = hamburger.querySelectorAll('span');
    spans.forEach((span, index) => {
        if (hamburger.classList.contains('active')) {
            if (index === 0) {
                span.style.transform = 'rotate(45deg) translate(5px, 5px)';
            } else if (index === 1) {
                span.style.opacity = '0';
            } else if (index === 2) {
                span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
            }
        } else {
            span.style.transform = 'none';
            span.style.opacity = '1';
        }
    });
});

// Smooth reveal animations for sections
const revealElements = document.querySelectorAll('.stat, .skill-card, .project-card, .about-text');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(element);
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize typing effect
    typingEffect();
    
    // Initial animation check
    animateOnScroll();
    
    // Add scroll padding to sections to prevent overlap
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.scrollMarginTop = '100px';
    });
});

// Prevent default scroll behavior for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navbarHeight = navbar.offsetHeight;
            const offsetTop = target.offsetTop - navbarHeight - 20;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});