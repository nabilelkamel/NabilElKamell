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
    themeIcon.className = isLight  
        ? "fa-solid fa-moon"  
        : "fa-solid fa-sun";  
}  

if (themeBtn) {  
    themeBtn.setAttribute(  
        "aria-label",  
        isLight ? "Switch to dark theme" : "Switch to light theme"  
    );  
}  

const themeColor = document.querySelector(  
    'meta[name="theme-color"]'  
);  

if (themeColor) {  
    themeColor.setAttribute(  
        "content",  
        isLight ? "#f5f5f8" : "#09090d"  
    );  
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
"software development",
"Networking"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeRole() {
if (!typedText) return;

const currentRole = roles[roleIndex];  

if (deleting) {  
    charIndex--;  
} else {  
    charIndex++;  
}  

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
}, {
threshold: 0.08
});

revealSections.forEach((section) => observer.observe(section));

} else {
revealSections.forEach((section) => {
section.classList.add("visible");
});
}
/* ===== HAUNTED GHOST EFFECT ===== */

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
// ===== ST AI BOT =====

const aiMessages = document.getElementById("ai-messages");
const aiForm = document.getElementById("ai-form");
const aiInput = document.getElementById("ai-input");

function addMessage(text, type = "bot") {
    const message = document.createElement("div");
    message.className = type === "user" ? "ai-user" : "ai-bot";
    message.textContent = text;
    aiMessages.appendChild(message);
    aiMessages.scrollTop = aiMessages.scrollHeight;
}

function addSearchLink(query) {
    const link = document.createElement("a");
    link.href = "https://www.google.com/search?q=" + encodeURIComponent(query);
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "🔎 Search the web";
    link.style.display = "block";
    link.style.margin = "10px";
    aiMessages.appendChild(link);
}

function getSTResponse(question) {
    const q = question.toLowerCase();

    if (/^(hi|hello|hey|salam|سلام|مرحبا)/i.test(q)) {
        return "Hello! Welcome to ST AI. How can I help you today?";
    }

    if (q.includes("who are you") || q.includes("chkon nta")) {
        return "I am ST AI, your digital assistant. Ask me about different topics!";
    }

    if (q.includes("programming") || q.includes("python") || q.includes("html")) {
        return "You can learn programming through free tutorials and practical exercises.";
    }

    if (q.includes("cybersecurity") || q.includes("cyber security")) {
        return "Cybersecurity is the practice of protecting systems, networks and information.";
    }

    if (q.includes("science") || q.includes("physics")) {
        return "Science helps us understand the world through observation and experiments.";
    }

    if (q.includes("thank") || q.includes("شكرا")) {
        return "You're welcome! I'm here to help.";
    }

    return "I don't have a reliable answer stored for this question. You can search the web for more information:";
}

aiForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const question = aiInput.value.trim();
    if (!question) return;

    addMessage(question, "user");

    const answer = getSTResponse(question);
    addMessage(answer, "bot");

    if (answer.startsWith("I don't have")) {
        addSearchLink(question);
    }

    aiInput.value = "";
});

// Welcome message
if (aiMessages && aiMessages.children.length === 0) {
    addMessage("Welcome to ST AI! Ask me anything.");
}
