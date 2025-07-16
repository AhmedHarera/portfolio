/* =============================typing animation ================*/
var typed = new Typed(".typing", {
    strings: ["Frontend Developer", "Web Designer", "Content Marketer"],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true
});

/* =============================Aside  ================*/
const nav = document.querySelector(".nav"),
    navList = nav.querySelectorAll("li"),
    totalNavList = navList.length,
    allSection = document.querySelectorAll(".section"),
    totalSection = allSection.length;

// Ensure proper section visibility on page load
window.addEventListener('load', function() {
    // Hide all sections initially
    document.querySelectorAll(".section").forEach(function(section) {
        section.classList.remove("active", "back-section");
        section.style.visibility = "hidden";
    });
    
    // Activate home section by default
    const homeSection = document.querySelector("#home");
    if (homeSection) {
        homeSection.classList.add("active");
        homeSection.style.visibility = "visible";
    }
    
    // Ensure home nav link is active
    document.querySelectorAll(".nav li a").forEach(function(link) {
        link.classList.remove("active");
    });
    
    const homeNavLink = document.querySelector('a[href="#home"]');
    if (homeNavLink) {
        homeNavLink.classList.add("active");
    }
    
    // Make sure nav toggler is visible on mobile
    if (window.innerWidth <= 1200) {
        const navToggler = document.querySelector(".nav-toggler");
        if (navToggler) {
            navToggler.style.zIndex = "1001";
            navToggler.style.visibility = "visible";
            navToggler.style.opacity = "1";
            navToggler.style.pointerEvents = "auto";
        }
    }
});

// Event delegation for navigation
nav.addEventListener("click", function(event) {
    let clickedElement = event.target;
    
    // Use closest for better touch handling
    if (!clickedElement.tagName || clickedElement.tagName !== "A") {
        clickedElement = clickedElement.closest("a");
    }
    
    if (clickedElement && clickedElement.tagName === "A") {
        event.preventDefault(); // Prevent default behavior
        
        // Get the clicked section target ID
        const targetId = clickedElement.getAttribute("href").split("#")[1];
        
        // Remove active class from all nav items first
        for (let i = 0; i < totalNavList; i++) {
            navList[i].querySelector("a").classList.remove("active");
        }
        
        // Add active class to clicked nav item
        clickedElement.classList.add("active");
        
        // Find and mark the currently active section
        let prevSection = null;
        for (let i = 0; i < totalSection; i++) {
            if (allSection[i].classList.contains("active")) {
                prevSection = allSection[i];
                allSection[i].classList.add("back-section"); // Mark as previous
            }
            allSection[i].classList.remove("active");
        }

        // Show target section and animate
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.classList.add("active");
            targetElement.style.visibility = "visible";
            // Overlay: active section z-index 2, back-section z-index 1
            if (prevSection) {
                prevSection.style.zIndex = 1;
                targetElement.style.zIndex = 2;
            }
            // Wait for animation to finish, then hide previous
            setTimeout(() => {
                if (prevSection) {
                    prevSection.classList.remove("back-section");
                    prevSection.style.visibility = "hidden";
                }
            }, 1000); // Match CSS animation duration
        }
        
        // Close the mobile navigation menu if we're on mobile
        if (window.innerWidth < 1200 && aside.classList.contains("open")) {
            asideSectionTogglerBtn();
        }
    }
});

function removeBackSection() {
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.remove("back-section");
    }
}

function addBackSection(num) {
    allSection[num].classList.add("back-section");
}

function showSection(element) {
    // Hide all sections first
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.remove("active", "back-section");
        allSection[i].style.visibility = "hidden";
    }
    
    // Get target section ID and make it active
    const target = element.getAttribute("href").split("#")[1];
    const targetSection = document.querySelector("#" + target);
    
    if (targetSection) {
        targetSection.classList.add("active");
        targetSection.style.visibility = "visible";
    }
}

function updateNav(element) {
    // Remove active class from all nav items
    for (let i = 0; i < totalNavList; i++) {
        navList[i].querySelector("a").classList.remove("active");
    }
    
    // Add active class to the matching nav item
    const target = element.getAttribute("href").split("#")[1];
    const navItem = document.querySelector(`a[href="#${target}"]`);
    
    if (navItem) {
        navItem.classList.add("active");
    }
}

/* ===== Mobile Navigation Toggle ===== */
const navTogglerBtn = document.querySelector(".nav-toggler");
const aside = document.querySelector(".aside");

// Toggle navigation menu for mobile
navTogglerBtn.addEventListener("click", () => {
    asideSectionTogglerBtn();
});

// Function to toggle aside menu and sections
function asideSectionTogglerBtn() {
    aside.classList.toggle("open");
    navTogglerBtn.classList.toggle("open");
    
    // Toggle sections
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.toggle("open");
    }
}

// Close navigation when clicking outside on mobile
document.addEventListener("click", function(event) {
    // If the menu is open, the click is outside the aside and not on the toggler button
    if (aside.classList.contains("open") && 
        !aside.contains(event.target) && 
        event.target !== navTogglerBtn && 
        !navTogglerBtn.contains(event.target)) {
        asideSectionTogglerBtn();
    }
});

// Handle window resize to maintain correct section display
window.addEventListener("resize", function() {
    // If window width becomes larger than 1200px and the menu was open on mobile
    if (window.innerWidth > 1200 && aside.classList.contains("open")) {
        aside.classList.remove("open");
        navTogglerBtn.classList.remove("open");
        for (let i = 0; i < totalSection; i++) {
            allSection[i].classList.remove("open");
        }
    }
    
    // Make sure only the active section is visible
    document.querySelectorAll(".section").forEach(section => {
        if (section.classList.contains("active")) {
            section.style.visibility = "visible";
        } else {
            section.style.visibility = "hidden";
        }
    });
    
    // Ensure nav toggler is correctly positioned in mobile view
    if (window.innerWidth <= 1200) {
        const navToggler = document.querySelector(".nav-toggler");
        if (navToggler) {
            navToggler.style.zIndex = "1001";
            navToggler.style.visibility = "visible";
            navToggler.style.opacity = "1";
        }
    }
});

/* ===== Contact Form Submission ===== */
function sendMail() {
    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Form validation
    if (!name || !email || !message) {
        alert("Please fill in all required fields.");
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // Prepare template parameters for EmailJS
    const templateParams = {
        from_name: name,
        from_email: email,
        subject: subject || 'Portfolio Contact Form',
        message: message
    };

    // Show sending indicator
    const sendButton = document.querySelector('.contact-form .btn');
    const originalButtonText = sendButton.innerHTML;
    sendButton.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Sending...';
    sendButton.disabled = true;

    // Send the email using EmailJS
    emailjs.send('default_service', 'template_contact', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            alert('Your message has been sent successfully!');
            
            // Reset form
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('subject').value = '';
            document.getElementById('message').value = '';
            
            // Reset button
            sendButton.innerHTML = originalButtonText;
            sendButton.disabled = false;
        }, function(error) {
            console.log('FAILED...', error);
            alert('Failed to send the message. Please try again later.');
            
            // Reset button
            sendButton.innerHTML = originalButtonText;
            sendButton.disabled = false;
        });
}

/* ===== Touch Events Support ===== */
document.addEventListener('DOMContentLoaded', function() {
    // Always ensure nav-toggler is on top in mobile view
    function ensureTogglerVisibility() {
        if (window.innerWidth <= 1200) {
            const navToggler = document.querySelector(".nav-toggler");
            if (navToggler) {
                navToggler.style.zIndex = "1001";
            }
        }
    }
    
    // Run on page load
    ensureTogglerVisibility();
    
    // Run when sections change
    document.querySelectorAll(".section").forEach(section => {
        // Use mutation observer to detect when section becomes active
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.attributeName === "class" && 
                    section.classList.contains("active")) {
                    ensureTogglerVisibility();
                }
            });
        });
        
        observer.observe(section, {attributes: true});
    });
    
    // Add touch support for style switcher
    const styleSwitcherToggler = document.querySelector(".style-switcher-toggler");
    if (styleSwitcherToggler) {
        styleSwitcherToggler.addEventListener("touchstart", function(e) {
            e.preventDefault();
            document.querySelector(".style-switcher").classList.toggle("open");
        });
    }

    // Add touch support for color scheme
    const colorSchemes = document.querySelectorAll(".colors span");
    colorSchemes.forEach(color => {
        color.addEventListener("touchstart", function(e) {
            e.preventDefault();
            const colorTitle = this.className;
            setActiveStyle(colorTitle);
        });
    });

    // Add touch support for theme toggle
    const dayNight = document.querySelector(".day-night");
    if (dayNight) {
        dayNight.addEventListener("touchstart", function(e) {
            e.preventDefault();
            dayNight.querySelector("i").classList.toggle("fa-sun");
            dayNight.querySelector("i").classList.toggle("fa-moon");
            document.body.classList.toggle("dark");
            
            // Update images based on theme
            if (typeof updateHomeHeroImg === 'function') {
                updateHomeHeroImg();
            }
            
            if (typeof updateMainLogo === 'function') {
                updateMainLogo();
            }
        });
    }
    
    // Simple swipe gestures
    let touchStartX = 0;
    let touchEndX = 0;
    
    function handleSwipe() {
        const swipeDistance = touchEndX - touchStartX;
        const minimumSwipeDistance = 80;
        
        // Only handle swipes on mobile/tablet view
        if (window.innerWidth > 1200) {
            return;
        }
        
        // Right to left swipe (open menu)
        if (swipeDistance < -minimumSwipeDistance && !aside.classList.contains("open")) {
            asideSectionTogglerBtn();
        }
        
        // Left to right swipe (close menu)
        if (swipeDistance > minimumSwipeDistance && aside.classList.contains("open")) {
            asideSectionTogglerBtn();
        }
    }
    
    // Touch event listeners for swipe gestures
    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});
    
    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, {passive: true});
});
