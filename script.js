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


/* CHATBOT FUNCTIONALITY - ST PORTFOLIO */

const chatbotWindow = document.getElementById("chatbotWindow");
const chatbotToggle = document.getElementById("chatbotToggle");
const chatbotClose = document.getElementById("chatbotClose");
const chatbotInput = document.getElementById("chatbotInput");
const chatbotSend = document.getElementById("chatbotSend");
const chatbotMessages = document.getElementById("chatbotMessages");

chatbotToggle.addEventListener("click", () => {
    chatbotWindow.classList.toggle("active");
    chatbotInput.focus();
});

chatbotClose.addEventListener("click", () => {
    chatbotWindow.classList.remove("active");
});

function addChatMessage(message, type) {
    const div = document.createElement("div");
    div.className = type === "user" ? "user-message" : "bot-message";
    div.textContent = message;
    chatbotMessages.appendChild(div);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function getBotReply(message) {
    const text = message.toLowerCase().trim();

    // Greetings
    if (/^(hi|hello|hey|salut|bonjour|salam|سلام|مرحبا)/i.test(text)) {
        return "Hello! Welcome to Nabil El Kamel's portfolio. How can I help you?";
    }

    // Identity
    if (text.includes("who is nabil") || text.includes("about nabil") ||
        text.includes("من هو نبيل") || text.includes("nabil")) {
        return "Nabil El Kamel is a technology enthusiast from Oujda, Morocco. He is a student interested in Web Development, Software Development and Networking.";
    }

    // Education
    if (text.includes("study") || text.includes("school") ||
        text.includes("education") || text.includes("يقرا") ||
        text.includes("الدراسة")) {
        return "Nabil is a high-school student in the Experimental Sciences track. He enjoys learning technology step by step.";
    }

    // Skills
    if (text.includes("skill") || text.includes("technologies") ||
        text.includes("مهارات")) {
        return "Nabil is learning HTML, CSS, JavaScript, Python, Networking and computer technologies.";
    }

    // Web development
    if (text.includes("web") || text.includes("website") ||
        text.includes("مواقع")) {
        return "Nabil is interested in Web Development and builds websites using HTML, CSS and JavaScript.";
    }

    // Networking
    if (text.includes("network") || text.includes("شبكات")) {
        return "Nabil is learning Networking using Cisco Packet Tracer and Wireshark. He is interested in IP addressing, routers, switches and network fundamentals.";
    }

    // Projects
    if (text.includes("project") || text.includes("مشاريع")) {
        return "Nabil's projects include:\n1. Personal Portfolio\n2. Smart Office Network\n3. Morocco Cancer Assist\n4. Python Experiments.";
    }

    // Portfolio
    if (text.includes("portfolio")) {
        return "This is Nabil El Kamel's personal portfolio, showcasing his interests, skills and technology projects.";
    }

    // Smart Office
    if (text.includes("smart office")) {
        return "Smart Office Network is a networking learning project focused on network design, routers, switches, IP addressing and connectivity.";
    }

    // Morocco Cancer Assist
    if (text.includes("cancer") || text.includes("morocco cancer")) {
        return "Morocco Cancer Assist is a project concept designed to provide information and support related to cancer in Morocco.";
    }

    // Python
    if (text.includes("python")) {
        return "Nabil uses Python for beginner programming experiments and learning.";
    }

    // Contact
    if (text.includes("contact") || text.includes("email") ||
        text.includes("تواصل") || text.includes("اتصال")) {
        return "You can contact Nabil through his social profiles:\nGitHub: github.com/elknabil795-ops\nInstagram: @nabil__elk_\nLinkedIn: Nabil El Kamel.";
    }

    // GitHub
    if (text.includes("github")) {
        return "Visit Nabil's GitHub profile:\nhttps://github.com/elknabil795-ops";
    }

    // Instagram
    if (text.includes("instagram")) {
        return "Nabil's Instagram: @nabil__elk_";
    }

    // LinkedIn
    if (text.includes("linkedin")) {
        return "Find Nabil El Kamel on LinkedIn: https://www.linkedin.com/in/nabil-el-kamel-16363b412/";
    }

    // Location
    if (text.includes("where") || text.includes("from") ||
        text.includes("فين") || text.includes("منين")) {
        return "Nabil is from Oujda, Morocco.";
    }

    // Thanks
    if (text.includes("thank") || text.includes("شكرا")) {
        return "You're welcome! Feel free to ask me anything about Nabil and his projects.";
    }

    // Default
    return "I can help you learn about Nabil, his education, skills, projects and contact information. Try asking: Who is Nabil? What are his projects? How can I contact him?";
}

function sendChatMessage() {
    const message = chatbotInput.value.trim();

    if (!message) return;

    chatbotInput.value = "";
    addChatMessage(message, "user");

    chatbotSend.disabled = true;

    const typing = document.createElement("div");
    typing.className = "bot-message typing";
    typing.innerHTML = "<span></span><span></span><span></span>";
    chatbotMessages.appendChild(typing);

    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

    setTimeout(() => {
        typing.remove();
        const reply = getBotReply(message);
        addChatMessage(reply, "bot");

        chatbotSend.disabled = false;
        chatbotInput.focus();
    }, 700);
}

chatbotSend.addEventListener("click", sendChatMessage);

chatbotInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        sendChatMessage();
    }
});
