// MaNae's Cuisine Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll("nav ul li a");
    navLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            const href = this.getAttribute("href");
            if (href.startsWith("index.html#")) {
                e.preventDefault();
                const targetId = href.substring(href.indexOf("#") + 1);
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: "smooth"
                    });
                }
            } else if (href === "order_meals.html") {
                // Allow default navigation for the new page
            }
        });
    });

    // Service button interactions (excluding the Weekly Meal Delivery button which now links to a new page)
    const serviceButtons = document.querySelectorAll(".service-buttons button:not([onclick])");
    const serviceImages = document.querySelectorAll('.service-images img');
    
    serviceButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            serviceButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Highlight corresponding image
            serviceImages.forEach((img, imgIndex) => {
                if (imgIndex === index) {
                    img.style.transform = 'scale(1.05)';
                    img.style.boxShadow = '0 15px 40px rgba(231, 76, 60, 0.3)';
                } else {
                    img.style.transform = 'scale(1)';
                    img.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                }
            });
        });
    });

    // Initialize first service button as active
    if (serviceButtons.length > 0) {
        serviceButtons[0].classList.add('active');
    }

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.services-section, .dining-on-wheels, .about-chef, .weekly-meal-delivery');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        }
    });

    // Book event button functionality
    const bookButtons = document.querySelectorAll('button');
    bookButtons.forEach(button => {
        if (button.textContent.includes('Book') || button.textContent.includes('Taste-cation')) {
            button.addEventListener('click', function() {
                // Simple alert for demo purposes
                // In a real implementation, this would open a booking form or redirect to a booking page
                alert('Thank you for your interest! Please call (555) 123-4567 to book your culinary experience with MaNae\'s Cuisine.');
            });
        }
    });

    // Image lazy loading
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '1';
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        imageObserver.observe(img);
        
        // Set opacity to 1 when image loads
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
    });

    // Mobile menu toggle (if needed)
    const nav = document.querySelector('nav');
    const navToggle = document.createElement('button');
    navToggle.innerHTML = '☰';
    navToggle.className = 'nav-toggle';
    navToggle.style.display = 'none';
    navToggle.style.background = 'none';
    navToggle.style.border = 'none';
    navToggle.style.color = 'white';
    navToggle.style.fontSize = '1.5rem';
    navToggle.style.cursor = 'pointer';

    // Add mobile menu functionality
    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            navToggle.style.display = 'block';
            const navUl = document.querySelector('nav ul');
            if (navUl) {
                navUl.style.display = 'none';
            }
        } else {
            navToggle.style.display = 'none';
            const navUl = document.querySelector('nav ul');
            if (navUl) {
                navUl.style.display = 'flex';
            }
        }
    }

    nav.insertBefore(navToggle, nav.firstChild);
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    navToggle.addEventListener('click', function() {
        const navUl = document.querySelector('nav ul');
        if (navUl) {
            navUl.style.display = navUl.style.display === 'none' ? 'flex' : 'none';
        }
    });

    // Add CSS for mobile nav toggle
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .nav-toggle {
                display: block !important;
            }
            nav ul {
                position: absolute;
                top: 100%;
                left: 0;
                width: 100%;
                background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
                flex-direction: column !important;
                padding: 1rem 0;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
        }
    `;
    document.head.appendChild(style);

    // Add some interactive hover effects
    const hoverElements = document.querySelectorAll('button, .service-images img');
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // Console log for debugging
    console.log('MaNae\'s Cuisine website loaded successfully!');
});

// Additional utility functions
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top functionality
window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        if (!document.querySelector('.scroll-to-top')) {
            const scrollButton = document.createElement('button');
            scrollButton.innerHTML = '↑';
            scrollButton.className = 'scroll-to-top';
            scrollButton.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
                color: white;
                border: none;
                font-size: 1.2rem;
                cursor: pointer;
                z-index: 1000;
                box-shadow: 0 4px 15px rgba(231, 76, 60, 0.3);
                transition: all 0.3s ease;
            `;
            scrollButton.addEventListener('click', scrollToTop);
            scrollButton.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = '0 6px 20px rgba(231, 76, 60, 0.4)';
            });
            scrollButton.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 4px 15px rgba(231, 76, 60, 0.3)';
            });
            document.body.appendChild(scrollButton);
        }
    } else {
        const scrollButton = document.querySelector('.scroll-to-top');
        if (scrollButton) {
            scrollButton.remove();
        }
    }
});

