// ===== MOBILE MENU =====

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");

        menuBtn.setAttribute("aria-expanded", String(isOpen));
        menuBtn.innerHTML = isOpen
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';
    });

    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
            menuBtn.setAttribute("aria-expanded", "false");
            menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
        });
    });
}

// ===== DARK / LIGHT THEME =====

const themeBtn = document.getElementById("themeBtn");
const themeIcon = themeBtn?.querySelector("i");

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

themeBtn?.addEventListener("click", () => {
    const isLight = !document.body.classList.contains("light-theme");

    applyTheme(isLight);

    try {
        localStorage.setItem("nabil-theme", isLight ? "light" : "dark");
    } catch (error) {
        // The selected theme remains active until the page is refreshed.
    }
});

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
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08 });

    revealSections.forEach((section) => observer.observe(section));
} else {
    revealSections.forEach((section) => section.classList.add("visible"));
}

// ===== FOOTER YEAR =====

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ===== STAR RATING =====

const stars = document.querySelectorAll(".star");

stars.forEach((star, index) => {
    star.addEventListener("click", () => {
        stars.forEach((s, i) => {
            const on = i <= index;
            s.classList.toggle("active", on);
            s.style.color = on ? "#f5b301" : "";
            s.setAttribute("aria-pressed", String(on));
        });
    });
});

// ===== HAUNTED GHOST EFFECT =====

(() => {
    if (document.querySelector(".ghost-layer")) return;

    const layer = document.createElement("div");
    layer.className = "ghost-layer";
    layer.setAttribute("aria-hidden", "true");
    document.body.appendChild(layer);

    for (let i = 0; i < 4; i++) {
        const ghost = document.createElement("div");
        ghost.className = "ghost";

        ghost.style.left = `${12 + i * 23}%`;
        ghost.style.top = `${25 + (i % 3) * 20}%`;
        ghost.style.animationDelay = `${i * -4.5}s`;
        ghost.style.animationDuration = `${17 + i * 3}s`;
        ghost.style.transform = `scale(${0.7 + i * 0.12})`;

        layer.appendChild(ghost);
    }
})();

// ===== AI / ST ASSISTANT =====

document.addEventListener("DOMContentLoaded", () => {
    const aiBox = document.getElementById("ai-box");
    const aiMessages = document.getElementById("ai-messages");
    const aiInput = document.getElementById("ai-input");
    const aiForm = document.getElementById("ai-form");

    const toggle = document.getElementById("ai-toggle");
    const close = document.getElementById("ai-close");
    const arabic = document.getElementById("ai-ar");
    const english = document.getElementById("ai-en");

    let aiLanguage = "en";

    if (!aiBox || !aiMessages || !aiInput || !aiForm) {
        console.error("AI error: Check ai-box, ai-messages, ai-input and ai-form IDs.");
        return;
    }

    toggle?.addEventListener("click", () => {
        aiBox.hidden = !aiBox.hidden;
        if (!aiBox.hidden) aiInput.focus();
    });

    close?.addEventListener("click", () => {
        aiBox.hidden = true;
    });

    arabic?.addEventListener("click", () => {
        aiLanguage = "ar";
        aiInput.placeholder = "اسأل عن نبيل أو التكنولوجيا...";
    });

    english?.addEventListener("click", () => {
        aiLanguage = "en";
        aiInput.placeholder = "Ask about Nabil or technology...";
    });

    function addAIMessage(text, type) {
        const message = document.createElement("p");
        message.className = type;
        message.textContent = text;
        aiMessages.appendChild(message);
        aiMessages.scrollTop = aiMessages.scrollHeight;
    }

    function escapeRegex(text) {
        return text.replace(/[.*+?^${}()|[\]\\\/]/g, "\\$&");
    }

    function getAIAnswer(question) {
        const q = question.toLowerCase();

        // Latin words must match as whole words ("hi" must not match "this").
        // Arabic words use a simple substring match.
        const includesAny = (words) =>
            words.some((word) => {
                if (/^[a-z0-9\/ ]+$/.test(word)) {
                    return new RegExp(`(^|[^a-z0-9])${escapeRegex(word)}([^a-z0-9]|$)`).test(q);
                }
                return q.includes(word);
            });

        if (includesAny(["project", "projects", "projet", "مشروع", "github"])) {
            return aiLanguage === "ar"
                ? "نبيل مهتم بالمشاريع التقنية. اكتشف أعماله على GitHub: https://github.com/elknabil795-ops"
                : "Nabil is interested in technology projects. Explore his GitHub: https://github.com/elknabil795-ops";
        }

        if (includesAny(["network", "networking", "شبكات", "الشبكات", "tcp/ip", "dns"])) {
            return aiLanguage === "ar"
                ? "الشبكات تربط الأجهزة لتبادل البيانات. تعلّم IP وDNS وDHCP وTCP/IP وLAN وWAN."
                : "Networking connects devices to exchange data. Learn IP, DNS, DHCP, TCP/IP, LAN, and WAN.";
        }

        if (includesAny(["cyber", "cybersecurity", "hack", "security", "الأمن السيبراني", "الأمن"])) {
            return aiLanguage === "ar"
                ? "الأمن السيبراني يحمي الأنظمة والشبكات والبيانات. ابدأ بأساسيات الشبكات وLinux والتدريب القانوني."
                : "Cybersecurity protects systems, networks, and data. Start with networking, Linux, and legal practice.";
        }

        if (includesAny(["program", "programming", "python", "javascript", "html", "css", "برمجة", "البرمجة"])) {
            return aiLanguage === "ar"
                ? "يمكنك تعلّم HTML وCSS وJavaScript لتطوير المواقع، أو Python لأساسيات البرمجة."
                : "Learn HTML, CSS, and JavaScript for web development, or Python for programming fundamentals.";
        }

        if (includesAny(["robot", "robots", "robotics", "روبوت", "الروبوتات"])) {
            return aiLanguage === "ar"
                ? "الروبوتات تجمع بين البرمجة والإلكترونيات وأجهزة الاستشعار."
                : "Robotics combines programming, electronics, and sensors.";
        }

        if (includesAny(["nabil", "نبيل", "about", "who are you", "من أنت", "من هو"])) {
            return aiLanguage === "ar"
                ? "أنا AI / ST، مساعد موقع نبيل الكاملي من وجدة، المغرب. يهتم نبيل بالبرمجة والشبكات والأمن السيبراني والروبوتات."
                : "I am AI / ST, the assistant for Nabil El Kamel's website. Nabil is from Oujda, Morocco, and is interested in programming, networking, cybersecurity, and robotics.";
        }

        if (includesAny(["hello", "hi", "hey", "salam", "bonjour", "سلام", "مرحبا"])) {
            return aiLanguage === "ar"
                ? "مرحباً بك! أنا AI / ST، مساعد موقع نبيل. كيف يمكنني مساعدتك؟"
                : "Hello! Welcome to Nabil's website. How can I help you?";
        }

        return aiLanguage === "ar"
            ? "جرّب أن تسألني عن نبيل أو المشاريع أو البرمجة أو الشبكات أو الأمن السيبراني."
            : "Ask me about Nabil, projects, programming, networking, or cybersecurity.";
    }

    aiForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const question = aiInput.value.trim();
        if (!question) return;

        addAIMessage(question, "ai-user");
        addAIMessage(getAIAnswer(question), "ai-bot");

        aiInput.value = "";
        aiInput.focus();
    });
});
