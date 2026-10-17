// ==========================
// 1. TYPING ANIMATION
// ==========================

const typingText = document.getElementById("typing-text");

const roles = [
    "Aspiring Developer",
    "Creative Thinker",
    "Problem Solver",
    "Lifelong Learner"
];

let roleIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeEffect() {
    const currentRole = roles[roleIndex];

    if (typingText) {
        if (!deleting) {
            typingText.textContent =
                currentRole.substring(0, characterIndex + 1);

            characterIndex++;

            if (characterIndex === currentRole.length) {
                deleting = true;
                setTimeout(typeEffect, 1400);
                return;
            }
        } else {
            typingText.textContent =
                currentRole.substring(0, characterIndex - 1);

            characterIndex--;

            if (characterIndex === 0) {
                deleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
            }
        }

        setTimeout(typeEffect, deleting ? 45 : 85);
    }
}

if (typingText) {
    typeEffect();
}


// ==========================
// 2. SCROLL REVEAL
// ==========================

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(function (element) {
        revealObserver.observe(element);
    });
} else {
    // Fallback for older browsers.
    revealElements.forEach(function (element) {
        element.classList.add("visible");
    });
}


// ==========================
// 3. MOBILE NAVIGATION
// ==========================

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
        const isOpen = navLinks.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            navLinks.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.textContent = "☰";
        });
    });
}
