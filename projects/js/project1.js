// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // ===============================
    // DOM ELEMENTS
    // ===============================
    const header = document.getElementById('header');
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const titles = document.querySelectorAll('.title');
    const scrollTopButton = document.querySelector('.scroll-top-button');
    
    // Create mobile nav dropdown if it doesn't exist
    if (!document.querySelector('.mobile-nav-dropdown')) {
        const mobileNavDropdown = document.createElement('div');
        mobileNavDropdown.className = 'mobile-nav-dropdown';
        
        // Clone nav buttons for mobile menu
        const navButtons = document.querySelector('.nav-buttons').cloneNode(true);
        mobileNavDropdown.appendChild(navButtons);
        
        header.appendChild(mobileNavDropdown);
    }
    
    const mobileNavDropdown = document.querySelector('.mobile-nav-dropdown');
    const mobileNavButtons = mobileNavDropdown.querySelectorAll('.nav-button');

    // ===============================
    // TITLE ANIMATION
    // ===============================
    let titleIndex = 0;
    
    // Set first title as active initially
    if (titles.length > 0) {
        titles[0].style.opacity = '1';
        titles[0].style.transform = 'scale(1)';
    }
    
    function rotateTitles() {
        // Hide all titles
        titles.forEach(title => {
            title.style.opacity = '0';
            title.style.transform = 'scale(0.9)';
        });
        
        // Increment counter
        titleIndex = (titleIndex + 1) % titles.length;
        
        // Show current title
        titles[titleIndex].style.opacity = '1';
        titles[titleIndex].style.transform = 'scale(1)';
    }
    
    // Start title rotation after 2 seconds
    setTimeout(() => {
        setInterval(rotateTitles, 3000);
    }, 2000);
    
    // ===============================
    // NAVBAR SCROLL BEHAVIOR - ONLY ON MOBILE
    // ===============================
    let lastScrollTop = 0;
    
    function handleNavbarVisibility() {
        // Only apply sticky behavior on mobile
        if (window.innerWidth <= 767) {
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
            
            if (currentScroll <= 10) {
                // At the top
                header.classList.remove('navbar--hidden');
                header.classList.add('navbar--top');
                header.classList.remove('navbar--visible');
            } else if (currentScroll > lastScrollTop) {
                // Scrolling down
                header.classList.add('navbar--hidden');
                header.classList.remove('navbar--top');
                header.classList.remove('navbar--visible');
            } else {
                // Scrolling up
                header.classList.remove('navbar--hidden');
                header.classList.remove('navbar--top');
                header.classList.add('navbar--visible');
            }
            
            lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
        }
    }
    
    // Initialize navbar state on page load
    handleNavbarVisibility();
    
    // Add scroll event listener for navbar with passive option for better performance
    window.addEventListener('scroll', handleNavbarVisibility, { passive: true });
    
    // ===============================
    // MOBILE MENU FUNCTIONALITY
    // ===============================
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileNavDropdown.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking a nav button
    mobileNavButtons.forEach(button => {
        button.addEventListener('click', function() {
            mobileMenuButton.classList.remove('active');
            mobileNavDropdown.classList.remove('active');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!header.contains(event.target) && mobileNavDropdown.classList.contains('active')) {
            mobileMenuButton.classList.remove('active');
            mobileNavDropdown.classList.remove('active');
        }
    });
    
    // ===============================
    // SHOOTING STARS ANIMATION
    // ===============================
    const shootingStars = document.querySelectorAll('.shooting-star');
    
    shootingStars.forEach(star => {
        // Random position
        star.style.top = `${Math.random() * 80}%`;
        star.style.left = `${Math.random() * 80}%`;
        
        // Random delay
        star.style.animationDelay = `${Math.random() * 15}s`;
        
        // Random duration
        star.style.animationDuration = `${10 + Math.random() * 10}s`;
    });
    
    // ===============================
    // SCROLL TO TOP FUNCTIONALITY
    // ===============================
    
    // Show/hide scroll-to-top button based on scroll position
    function toggleScrollTopButton() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTopButton) {
            if (scrollTop > 600) {
                scrollTopButton.classList.add('visible');
            } else {
                scrollTopButton.classList.remove('visible');
            }
        }
    }
    
    // Add event listener for scroll to update button visibility
    window.addEventListener('scroll', toggleScrollTopButton, { passive: true });
    
    // Initialize button visibility on page load
    toggleScrollTopButton();
    
    // Handle click on scroll-to-top button
    if (scrollTopButton) {
        scrollTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Scroll to top of main element
            const mainElement = document.getElementById('main');
            if (mainElement) {
                mainElement.scrollIntoView({ behavior: 'smooth' });
            } else {
                // Fallback to scrolling to top of page
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // ===============================
    // SMOOTH SCROLLING FOR ALL ANCHORS
    // ===============================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        // Skip if this is the scroll-top button (we already handled it specifically)
        if (!anchor.classList.contains('scroll-top-button')) {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Offset to account for fixed header
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (mobileMenuButton && mobileMenuButton.classList.contains('active')) {
                        mobileMenuButton.classList.remove('active');
                        mobileNavDropdown.classList.remove('active');
                    }
                }
            });
        }
    });
    
    // ===============================
    // SCROLL REVEAL ANIMATION
    // ===============================
    function revealOnScroll() {
        const elements = document.querySelectorAll('.info-card, .bento-image, .process-image');
        const windowHeight = window.innerHeight;
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight * 0.8) {
                element.style.opacity = '1';
                element.style.transform = 'scale(1) translateY(0)';
            }
        });
    }
    
    // Initial check on page load
    revealOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', revealOnScroll, { passive: true });
});