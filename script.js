// Mobile Navigation Toggle
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Smooth Scrolling for Navigation Links
const navLinks = document.querySelectorAll('nav ul li a');

navLinks.forEach(link => {
    link.addEventListener('click', smoothScroll);
});

function smoothScroll(e) {
    // Only prevent default if the link is an anchor link
    if (this.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    }
}

// FAQ Toggle Functionality
const faqItems = document.querySelectorAll('.faq-item h3');

faqItems.forEach(item => {
    item.addEventListener('click', () => {
        item.parentElement.classList.toggle('active');
    });
});

// Modal for Calendar Integration
const modal = document.getElementById('calendar-modal');
const bookButtons = document.querySelectorAll('.btn');
const closeBtn = document.querySelector('.close-btn');

bookButtons.forEach(btn => {
    if (btn.textContent.includes('Book') || btn.textContent.includes('Schedule')) {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('show');
        });
    }
});

closeBtn.addEventListener('click', () => {
    modal.classList.remove('show');
});

window.addEventListener('click', (event) => {
    if (event.target == modal) {
        modal.classList.remove('show');
    }
});

// Form Validation
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    // Advanced Validation
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    if (!name.value.trim()) {
        alert('Please enter your name.');
        name.focus();
        return;
    }

    if (!validateEmail(email.value.trim())) {
        alert('Please enter a valid email address.');
        email.focus();
        return;
    }

    if (!message.value.trim()) {
        alert('Please enter your message.');
        message.focus();
        return;
    }

    // Submit the form data using Fetch API
    fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            alert('Thank you for your message!');
            contactForm.reset();
        } else {
            alert('There was an error sending your message. Please try again later.');
        }
    }).catch(error => {
        alert('There was an error sending your message. Please try again later.');
    });
});

function validateEmail(email) {
    // Simple email validation regex
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

// Lazy Loading Images
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers without IntersectionObserver support
        lazyImages.forEach(img => {
            img.src = img.dataset.src || img.src;
        });
    }
});

// Content Flow Optimization with Intersection Observer
const sections = document.querySelectorAll('.section');

const observerOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px"
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
            updateProgress(entry.target.id);
        }
    });
}, observerOptions);

sections.forEach(section => {
    sectionObserver.observe(section);
});

// Update Progress Indicator (if applicable)
function updateProgress(sectionId) {
    // Implement progress indicator logic here if needed
    // For example, update navigation styles or progress bars
}

// Dynamic Content for Personalized CTAs (Example Implementation)
function updateCTAContent(userType) {
    const ctaContainers = document.querySelectorAll('.cta-container');
    ctaContainers.forEach(container => {
        if (container.dataset.userType === userType) {
            container.style.display = 'block';
        } else {
            container.style.display = 'none';
        }
    });
}

// Example of detecting user type (this can be based on real data)
document.addEventListener('DOMContentLoaded', () => {
    // For demonstration, we'll assume the user is from the industry
    const userType = 'industry';
    updateCTAContent(userType);
});

// Google Analytics Tracking
window.dataLayer = window.dataLayer || [];
function gtag(){ dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', 'UA-XXXXXX-X');
