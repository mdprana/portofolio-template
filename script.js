/**
 * Portfolio Website - JavaScript
 * Author: Made Pranajaya
 * Version: 1.0
 * Description: Handles animations, interactions, and visual effects for the portfolio website
 */

// ===============================
// JOB TITLE ANIMATION
// ===============================
let currentTitle = 0;
const titles = document.querySelectorAll('.title');

// Set first title as active initially
titles[0].classList.add('active');

// Change job title every 3 seconds
setInterval(() => {
    titles[currentTitle].classList.remove('active');
    currentTitle = (currentTitle + 1) % titles.length;
    titles[currentTitle].classList.add('active');
}, 3000);

// ===============================
// SMOOTH SCROLLING
// ===============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===============================
// NAVBAR SCROLL BEHAVIOR
// ===============================
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Only show navbar when at the absolute top of the page
    if (scrollTop <= 10) { // Small threshold for better user experience
        navbar.classList.remove('navbar--hidden');
    } else {
        navbar.classList.add('navbar--hidden');
    }
});

// Initialize navbar state on page load
document.addEventListener('DOMContentLoaded', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop <= 10) {
        navbar.classList.remove('navbar--hidden');
    } else {
        navbar.classList.add('navbar--hidden');
    }
});

// ===============================
// MOBILE MENU FUNCTIONALITY
// ===============================
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    
    // Create mobile dropdown menu if it doesn't exist yet
    if (!document.querySelector('.mobile-nav-dropdown')) {
        const mobileNavDropdown = document.createElement('div');
        mobileNavDropdown.className = 'mobile-nav-dropdown';
        
        // Clone the navigation buttons for mobile menu
        const navButtons = document.querySelector('.nav-buttons').cloneNode(true);
        mobileNavDropdown.appendChild(navButtons);
        
        // Append dropdown to navbar
        navbar.appendChild(mobileNavDropdown);
    }
    
    const mobileNavDropdown = document.querySelector('.mobile-nav-dropdown');
    
    if (mobileMenuButton && mobileNavDropdown) {
        // Toggle mobile menu
        mobileMenuButton.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileNavDropdown.classList.toggle('active');
        });
        
        // Close mobile menu when clicking links
        const mobileLinks = mobileNavDropdown.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuButton.classList.remove('active');
                mobileNavDropdown.classList.remove('active');
            });
        });
        
        // Close mobile menu when scrolling
        window.addEventListener('scroll', function() {
            if (mobileMenuButton.classList.contains('active')) {
                mobileMenuButton.classList.remove('active');
                mobileNavDropdown.classList.remove('active');
            }
        });
    }
});

// ===============================
// STARS BACKGROUND GENERATION
// ===============================
// Generate stars and meteor shower background
document.addEventListener('DOMContentLoaded', function() {
    const starsContainer = document.getElementById('stars-container');
    const numStars = 120; // Medium-low number of stars
    const numMeteors = 15; // Number of meteors to create
    
    if (starsContainer) {
      generateStars();
      createMeteorShower();
    }
    
    // Function to generate stars
    function generateStars() {
      if (!starsContainer) return;
      
      // Clear existing stars
      starsContainer.innerHTML = '';
      
      const containerWidth = window.innerWidth;
      const containerHeight = window.innerHeight;
      
      for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        
        // Determine star size category
        let sizeCategory;
        const random = Math.random();
        
        if (random < 0.8) {
          // 80% small stars
          sizeCategory = 'small';
        } else if (random < 0.95) {
          // 15% medium stars
          sizeCategory = 'medium';
        } else {
          // 5% large stars
          sizeCategory = 'large';
        }
        
        // Set star class based on size
        star.className = `star ${sizeCategory !== 'small' ? sizeCategory : ''}`;
        
        // Random position
        const x = Math.random() * containerWidth;
        const y = Math.random() * containerHeight;
        
        // Size based on category
        let size;
        let minOpacity;
        let maxOpacity;
        
        if (sizeCategory === 'small') {
          size = Math.random() * 1 + 1;
          minOpacity = Math.random() * 0.1 + 0.15;
          maxOpacity = Math.random() * 0.15 + 0.25;
        } else if (sizeCategory === 'medium') {
          size = Math.random() * 1 + 2;
          minOpacity = Math.random() * 0.15 + 0.2;
          maxOpacity = Math.random() * 0.15 + 0.3;
        } else {
          size = Math.random() * 1.5 + 3;
          minOpacity = Math.random() * 0.15 + 0.25;
          maxOpacity = Math.random() * 0.2 + 0.35;
        }
        
        // Random animation duration
        const duration = Math.random() * 6 + 4 + 's';
        
        // Apply styles
        star.style.left = `${x}px`;
        star.style.top = `${y}px`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.setProperty('--min-opacity', minOpacity);
        star.style.setProperty('--max-opacity', maxOpacity);
        star.style.setProperty('--duration', duration);
        
        // Random delay so stars don't all twinkle together
        star.style.animationDelay = `${Math.random() * 5}s`;
        
        starsContainer.appendChild(star);
      }
    }
    
    // Function to create meteor shower
    function createMeteorShower() {
      if (!starsContainer) return;
      
      const containerWidth = window.innerWidth;
      const containerHeight = window.innerHeight;
      
      // Create multiple meteors
      for (let i = 0; i < numMeteors; i++) {
        createMeteor(i);
      }
      
      function createMeteor(index) {
        const meteor = document.createElement('div');
        meteor.className = 'meteor';
        
        // Random position across the top portion of the screen
        // Similar to the CSS example, using percentage for horizontal position
        const leftPercent = Math.random() * 90 + 9; // 9% to 99%
        const top = Math.random() * 250 + 50; // 50px to 300px from the top
        
        // Random animation duration between 3-10 seconds
        const duration = (Math.random() * 7 + 3).toFixed(1);
        
        // Randomize the delay so meteors don't all animate simultaneously
        const delay = Math.random() * 15;
        
        // Apply styles
        meteor.style.left = `${leftPercent}%`;
        meteor.style.top = `${top}px`;
        meteor.style.setProperty('--index', index);
        meteor.style.setProperty('--duration', `${duration}s`);
        meteor.style.setProperty('--delay', `${delay}s`);
        
        starsContainer.appendChild(meteor);
      }
    }
    
    // Reposition everything on window resize
    window.addEventListener('resize', function() {
      generateStars();
      // Remove existing meteors
      document.querySelectorAll('.meteor').forEach(meteor => {
        meteor.remove();
      });
      // Create new meteors
      createMeteorShower();
    });
  });

// ===============================
// SCROLL ANIMATIONS
// ===============================

// Track if we've been to the top of the page
let hasScrolledToTop = false;
let lastScrollPosition = 0;

// Elements to animate on scroll
const animatableElements = {
    projectScreens: document.querySelectorAll('.project-screens'),
    projectCards: document.querySelectorAll('.project-card'),
    contactSection: document.querySelector('.contact-section'),
    contactTitle: document.querySelector('.contact-title'),
    contactButtons: document.querySelectorAll('.contact-button'),
    contactGraphic: document.querySelector('.contact-bottom-graphic'),
    footer: document.querySelector('.footer')
};

// Reset animations when scrolling back to top
function resetAnimations() {
    // Reset project screen animations
    animatableElements.projectScreens.forEach(screen => {
        screen.classList.remove('animate-in');
        const img = screen.querySelector('img');
        if (img) {
            img.classList.remove('animate-in');
        }
    });
    
    // Reset project card animations
    animatableElements.projectCards.forEach(card => {
        card.classList.remove('visible');
    });
    
    // Reset contact section animations
    if (animatableElements.contactTitle) {
        animatableElements.contactTitle.classList.remove('visible');
    }
    
    if (animatableElements.contactGraphic) {
        animatableElements.contactGraphic.classList.remove('visible');
    }
    
    animatableElements.contactButtons.forEach(button => {
        button.classList.remove('visible');
    });
    
    if (animatableElements.footer) {
        animatableElements.footer.classList.remove('visible');
    }
}

// Handle scroll events for animations
window.addEventListener('scroll', function() {
    const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    
    // Check if user has scrolled to the top
    if (currentScrollPosition <= 10) {
        hasScrolledToTop = true;
    }
    
    // Detect if we're scrolling down after being at the top
    if (hasScrolledToTop && currentScrollPosition > lastScrollPosition) {
        // Reset animations only once when starting to scroll down from the top
        if (currentScrollPosition <= 50) {
            resetAnimations();
        }
    }
    
    // Save current position for next comparison
    lastScrollPosition = currentScrollPosition;
    
    // Check which elements are in view and animate them
    checkVisibility();
});

// Check if elements are visible and trigger animations
function checkVisibility() {
    const windowHeight = window.innerHeight;
    const triggerPoint = windowHeight * 0.8; // 80% down the viewport
    
    // Animate project screens when they come into view
    animatableElements.projectScreens.forEach((screen, index) => {
        const rect = screen.getBoundingClientRect();
        if (rect.top < triggerPoint) {
            screen.classList.add('animate-in');
            
            // Animate the image with a slight delay
            const img = screen.querySelector('img');
            if (img && !img.classList.contains('animate-in')) {
                setTimeout(() => {
                    img.classList.add('animate-in');
                }, 200);
            }
            
            // Animate the corresponding project card with a delay
            const card = animatableElements.projectCards[index];
            if (card && !card.classList.contains('visible')) {
                setTimeout(() => {
                    card.classList.add('visible');
                }, 400);
            }
        }
    });
    
    // Animate contact section elements
    if (animatableElements.contactSection) {
        const contactRect = animatableElements.contactSection.getBoundingClientRect();
        
        if (contactRect.top < triggerPoint) {
            // Animate title
            if (animatableElements.contactTitle) {
                animatableElements.contactTitle.classList.add('visible');
            }
            
            // Animate graphic
            if (animatableElements.contactGraphic) {
                animatableElements.contactGraphic.classList.add('visible');
            }
            
            // Staggered animation for buttons
            animatableElements.contactButtons.forEach((button, index) => {
                setTimeout(() => {
                    button.classList.add('visible');
                }, 200 + index * 100);
            });
            
            // Animate footer
            if (animatableElements.footer) {
                setTimeout(() => {
                    animatableElements.footer.classList.add('visible');
                }, 500);
            }
        }
    }
}

// Initial animation on page load
document.addEventListener('DOMContentLoaded', function() {
    // Add classes to CSS for project screens/images
    const projectScreensStyle = document.createElement('style');
    projectScreensStyle.textContent = `
        .project-screens {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .project-screens.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        .project-screens img {
            opacity: 0;
            transform: perspective(1200px) translateX(0px) translateY(20px) scale(0.9) rotate(0deg) rotateX(-30deg) rotateY(0deg) translateZ(0);
            transition: all 0.8s ease;
        }
        .project-screens img.animate-in {
            opacity: 0.9;
            transform: perspective(1200px) translateX(0px) translateY(0px) scale(0.95) rotate(0deg) rotateX(-20deg) rotateY(0deg) translateZ(0);
        }
        
        /* Mobile Menu Styling */
        /* Mobile menu active state */
        .mobile-menu-button.active .line:nth-child(1) {
            transform: translateY(7px) rotate(45deg);
        }
        
        .mobile-menu-button.active .line:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-button.active .line:nth-child(3) {
            transform: translateY(-7px) rotate(-45deg);
        }
        
        /* Mobile nav dropdown */
        .mobile-nav-dropdown {
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background-color: rgba(10, 10, 12, 0.95);
            z-index: 999;
            padding: 0;
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.5s ease, padding 0.5s ease;
            border-radius: 0 0 20px 20px;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
        }
        
        .mobile-nav-dropdown.active {
            max-height: 300px;
            padding: 20px 0;
        }
        
        .mobile-nav-dropdown .nav-buttons {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 16px;
            width: 100%;
        }
        
        .mobile-nav-dropdown .nav-button {
            width: 80%;
            margin: 0 auto;
        }
    `;
    document.head.appendChild(projectScreensStyle);
    
    // First check of visibility
    setTimeout(() => {
        checkVisibility();
    }, 300);
    
    // Trigger initial scroll event
    window.dispatchEvent(new Event('scroll'));
});