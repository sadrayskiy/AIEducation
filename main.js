// JavaScript for AI Education Website

document.addEventListener("DOMContentLoaded", function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll("header nav ul li a");

    navLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            const href = this.getAttribute("href");
            if (href.startsWith("#")) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    // Scroll to target element
                    // Basic scroll for now, can be enhanced with smooth scroll library or more complex JS
                    // window.scrollTo({
                    //     top: targetElement.offsetTop - 70, // Adjust for sticky header height
                    //     behavior: "smooth"
                    // });

                    // Fallback for browsers not supporting smooth scroll or for simplicity
                    const headerOffset = 70; // Height of the sticky header
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                         top: offsetPosition,
                         behavior: "smooth"
                    });

                    // Optional: Update active link state (can be more complex)
                    navLinks.forEach(nav => nav.classList.remove("active"));
                    this.classList.add("active");
                }
            }
        });
    });

    // Basic Search Icon functionality (placeholder)
    const searchIcon = document.querySelector(".search-icon svg");
    if (searchIcon) {
        searchIcon.addEventListener("click", function() {
            alert("Функционал поиска будет добавлен позже.");
            // Here you would typically show a search bar or navigate to a search page
        });
    }

    // Animate elements on scroll (basic implementation)
    // More robust solution would use Intersection Observer API
    const animatedElements = document.querySelectorAll(".section-card, #hero h1, #hero p, .btn, .level-item");

    function checkVisibility() {
        animatedElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom >= 0) {
                // Element is in viewport - this logic is already handled by CSS animation `animation: fadeInUp`
                // This JS part is more for triggering animations that are not purely CSS entry animations
                // or for more complex scenarios. For now, CSS handles the initial fade-in.
            }
        });
    }

    // Initial check
    checkVisibility();

    // Check on scroll
    window.addEventListener("scroll", checkVisibility);

    // Add active class to nav link based on scroll position
    const sections = document.querySelectorAll("main section[id]");
    window.addEventListener("scroll", navHighlighter);

    function navHighlighter() {
        let scrollY = window.pageYOffset;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100; // Adjusted for header and some leeway
            let sectionId = current.getAttribute("id");

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
                document.querySelector("header nav a[href*=" + sectionId + "]").classList.add("active");
            } else {
                document.querySelector("header nav a[href*=" + sectionId + "]").classList.remove("active");
            }
        });

        // Special case for top of the page (no section active)
        if (scrollY < sections[0].offsetTop - 100) {
             navLinks.forEach(nav => nav.classList.remove("active"));
        }
    }

});

