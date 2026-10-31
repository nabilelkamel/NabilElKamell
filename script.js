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

// ===== REAL AI / ST ASSISTANT =====

document.addEventListener("DOMContentLoaded", () => {
    const aiBox = document.getElementById("ai-box");
    const aiMessages = document.getElementById("ai-messages");
    const aiInput = document.getElementById("ai-input");
    const aiForm = document.getElementById("ai-form");

    const toggle = document.getElementById("ai-toggle");
    const close = document.getElementById("ai-close");
    const arabic = document.getElementById("ai-ar");
    const english = document.getElementById("ai-en");

    // حط هنا رابط الخادم ديالك من بعد
    const AI_API_URL = "https://YOUR-WORKER.workers.dev/chat";

    let aiLanguage = "en";
    let chatHistory = [];

    if (!aiBox || !aiMessages || !aiInput || !aiForm) {
        console.error("ST AI: Chat elements not found.");
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
        return message;
    }

    async function askSTAI(question) {
        const languageInstruction = aiLanguage === "ar"
            ? "Reply in clear Arabic or Moroccan Darija."
            : "Reply in clear, friendly English.";

        const response = await fetch(AI_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: question,
                languageInstruction,
                history: chatHistory.slice(-10)
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Connection error");
        }

        if (!data.reply) {
            throw new Error("Empty AI response");
        }

        return data.reply;
    }

    aiForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const question = aiInput.value.trim();
        if (!question) return;

        addAIMessage(question, "ai-user");
        aiInput.value = "";
        aiInput.disabled = true;

        const loading = addAIMessage(
            aiLanguage === "ar" ? "ST AI كيفكر..." : "ST AI is thinking...",
            "ai-bot"
        );

        try {
            const answer = await askSTAI(question);
            loading.textContent = answer;

            chatHistory.push(
                { role: "user", parts: [{ text: question }] },
                { role: "model", parts: [{ text: answer }] }
            );

            chatHistory = chatHistory.slice(-10);

        } catch (error) {
            console.error("ST AI:", error);
            loading.textContent = "ST AI could not connect. Check the server setup.";
        } finally {
            aiInput.disabled = false;
            aiInput.focus();
        }
    });
});
