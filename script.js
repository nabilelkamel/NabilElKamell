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

// ===== ST PERSONAL ASSISTANT =====

const chatToggle = document.getElementById("st-chat-toggle");
const chatWindow = document.getElementById("st-chat-window");
const chatClose = document.getElementById("st-chat-close");
const chatForm = document.getElementById("st-chat-form");
const chatInput = document.getElementById("st-chat-input");
const chatMessages = document.getElementById("st-chat-messages");

chatToggle.addEventListener("click", () => {
    chatWindow.hidden = !chatWindow.hidden;
});

chatClose.addEventListener("click", () => {
    chatWindow.hidden = true; 
});

function addMessage(message, sender) {
    const div = document.createElement("div");
    div.className = "st-message " + sender;
    div.textContent = message;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getSTAnswer(question) {
    const q = question.toLowerCase();

    if (/who is nabil|about nabil|tell me about nabil|من هو نبيل/.test(q)) {
        return "Nabil El Kamel is a student from Oujda, Morocco, interested in technology, programming, networking and software development. He is continuously learning and building new projects.";
    }

    if (/project|projects|work|portfolio|المشاريع/.test(q)) {
        return "Here are Nabil's projects:\n\n01. Personal Portfolio – A website presenting his profile and skills.\n\n02. Morocco Cancer Assist – A project concept focused on cancer information and support in Morocco.\n\n03. Python Experiments – Small Python coding exercises.\n\n04. Network Infrastructure Lab – Networking practice using Cisco Packet Tracer and Wireshark.";
    }

    if (/skill|skills|technolog|مهارات/.test(q)) {
        return "Nabil is developing skills in:\n\n• HTML, CSS and JavaScript\n• Python Programming\n• Computer Networking\n• Cisco Packet Tracer\n• Wireshark\n• Software Development\n\nHe is learning step by step.";
    }

    if (/network|packet tracer|wireshark|شبكات/.test(q)) {
        return "Nabil is learning computer networking, including IP addressing, routers, switches, TCP/IP and network troubleshooting. He practices using Cisco Packet Tracer and Wireshark.";
    }

    if (/web development|website|html|css|javascript/.test(q)) {
        return "Nabil is learning Web Development using HTML, CSS and JavaScript. He works on personal websites and interactive web projects.";
    }

    if (/python|programming|coding/.test(q)) {
        return "Nabil is learning Python programming and developing small coding experiments to improve his programming skills.";
    }

    if (/contact|github|instagram|linkedin|social|اتصل/.test(q)) {
        return "You can connect with Nabil through:\n\nGitHub: github.com/elknabil795-ops\n\nInstagram: @nabil__elk_\n\nLinkedIn: linkedin.com/in/nabil-el-kamel-16363b412/\n\nFeel free to explore his profiles!";
    }

    if (/morocco cancer|cancer assist/.test(q)) {
        return "Morocco Cancer Assist is a web project concept focused on providing cancer-related information and support in Morocco. It uses HTML, CSS and JavaScript.";
    }

    if (/hello|hi|hey|salam|مرحبا/.test(q)) {
        return "Hello! Welcome to Nabil's Portfolio. 👋 How can I help you?";
    }

    if (/thank|thanks|شكرا/.test(q)) {
        return "You're welcome! Thank you for visiting Nabil's Portfolio. ❤️";
    }

    return "Thanks for your question! I'm ST Assistant. I can explain Nabil's profile, projects, skills and contact information. Try asking about one of these topics.";
}

function sendSTMessage(message) {
    const question = message.trim();

    if (!question) return;

    addMessage(question, "user");

    const answer = getSTAnswer(question);

    setTimeout(() => {
        addMessage(answer, "bot");
    }, 300);
}

chatForm.addEventListener("submit", (e) => {
    e.preventDefault();

    sendSTMessage(chatInput.value);
    chatInput.value = "";
});

document.querySelectorAll(".st-chat-suggestions button")
.forEach(button => {
    button.addEventListener("click", () => {
        sendSTMessage(button.dataset.question);
    });
});
