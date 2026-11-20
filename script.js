// ===== MOBILE MENU =====

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {
    const closeMenu = () => {
        navLinks.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    };

    menuBtn.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");
        menuBtn.setAttribute("aria-expanded", String(isOpen));
        menuBtn.innerHTML = isOpen
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';
    });

    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeMenu);
    });
}

// ===== DARK / LIGHT THEME =====

const themeBtn = document.getElementById("themeBtn");
const themeIcon = themeBtn ? themeBtn.querySelector("i") : null;

function applyTheme(isLight) {
    document.body.classList.toggle("light-theme", isLight);

    if (themeIcon) {
        themeIcon.className = isLight ? "fa-solid fa-moon" : "fa-solid fa-sun";
    }

    if (themeBtn) {
        themeBtn.setAttribute(
            "aria-label",
            isLight ? "Switch to dark theme" : "Switch to light theme"
        );
    }

    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) {
        themeColor.setAttribute("content", isLight ? "#f5f5f8" : "#09090d");
    }
}

let savedTheme = null;

try {
    savedTheme = localStorage.getItem("nabil-theme");
} catch (error) {
    // Theme switching still works if storage is unavailable.
}

applyTheme(savedTheme === "light");

if (themeBtn) {
    themeBtn.addEventListener("click", () => {
        const isLight = !document.body.classList.contains("light-theme");
        applyTheme(isLight);

        try {
            localStorage.setItem("nabil-theme", isLight ? "light" : "dark");
        } catch (error) {
            // The selected theme stays active until the page is refreshed.
        }
    });
}

// ===== ANIMATED TYPING =====

const typedText = document.getElementById("typedText");

const roles = [
    "Web Development",
    "Software Development",
    "Networking"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeRole() {
    if (!typedText) return;

    const currentRole = roles[roleIndex];
    charIndex += deleting ? -1 : 1;
    typedText.textContent = currentRole.substring(0, charIndex);

    let delay = deleting ? 45 : 90;

    if (!deleting && charIndex === currentRole.length) {
        deleting = true;
        delay = 1300;
    } else if (deleting && charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = 350;
    }

    setTimeout(typeRole, delay);
}

if (typedText) {
    typeRole();
}

// ===== REVEAL SECTIONS ON SCROLL =====

const revealSections = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.08 }
    );

    revealSections.forEach((section) => observer.observe(section));
} else {
    revealSections.forEach((section) => section.classList.add("visible"));
}

// ===== FOOTER YEAR =====

const yearEl = document.getElementById("year");
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

// ===== GHOST EFFECT (desktop only, skipped on phones and reduced motion) =====

(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isSmallScreen = window.matchMedia("(max-width: 700px)").matches;

    if (reduceMotion || isSmallScreen || document.querySelector(".ghost-layer")) return;

    const layer = document.createElement("div");
    layer.className = "ghost-layer";
    layer.setAttribute("aria-hidden", "true");
    document.body.appendChild(layer);

    for (let i = 0; i < 3; i++) {
        const ghost = document.createElement("div");
        ghost.className = "ghost";
        ghost.style.left = `${15 + i * 30}%`;
        ghost.style.top = `${25 + (i % 3) * 20}%`;
        ghost.style.animationDelay = `${i * -6}s`;
        ghost.style.animationDuration = `${17 + i * 3}s`;
        layer.appendChild(ghost);
    }
})();
// ===== CONTACT FORM =====

document.addEventListener("DOMContentLoaded", () => {

    const contactForm = document.getElementById("contactForm");

    if (!contactForm) return;

    contactForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const recipient = "YOUR_EMAIL_HERE";

        const name = document.getElementById("contactName").value.trim();
        const email = document.getElementById("contactEmail").value.trim();
        const subject = document.getElementById("contactSubject").value.trim();
        const message = document.getElementById("contactMessage").value.trim();

        const body =
            `Name: ${name}\nEmail: ${email}\n\n${message}`;

        const mailto =
            `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        window.location.href = mailto;

    });

});
