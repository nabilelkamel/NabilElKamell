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
"software development"
"Networking",
    
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

  if (toggle) {
    toggle.addEventListener("click", () => {
      aiBox.hidden = !aiBox.hidden;
      if (!aiBox.hidden) aiInput.focus();
    });
  }

  if (close) {
    close.addEventListener("click", () => {
      aiBox.hidden = true;
    });
  }

  if (arabic) {
    arabic.addEventListener("click", () => {
      aiLanguage = "ar";
      aiInput.placeholder = "اسأل عن نبيل أو التكنولوجيا...";
    });
  }

  if (english) {
    english.addEventListener("click", () => {
      aiLanguage = "en";
      aiInput.placeholder = "Ask about Nabil or technology...";
    });
  }

  function addAIMessage(text, type) {
    const message = document.createElement("p");
    message.className = type;
    message.textContent = text;
    aiMessages.appendChild(message);
    aiMessages.scrollTop = aiMessages.scrollHeight;
  }

  function getAIAnswer(question) {
    const q = question.toLowerCase();

    const includesAny = (words) =>
      words.some(word => q.includes(word));

    if (includesAny(["hello", "hi", "salam", "سلام", "مرحبا", "bonjour"])) {
      return aiLanguage === "ar"
        ? "مرحباً بك! أنا AI / ST، مساعد موقع نبيل. كيف يمكنني مساعدتك؟"
        : "Hello! Welcome to Nabil's website. How can I help you?";
    }

    if (includesAny(["project", "projet", "مشروع", "github"])) {
      return aiLanguage === "ar"
        ? "نبيل مهتم بالمشاريع التقنية. اكتشف أعماله على GitHub: https://github.com/elknabil795-ops"
        : "Nabil is interested in technology projects. Explore his GitHub: https://github.com/elknabil795-ops";
    }

    if (includesAny(["network", "شبكات", "الشبكات", "tcp/ip", "dns"])) {
      return aiLanguage === "ar"
        ? "الشبكات تربط الأجهزة لتبادل البيانات. تعلّم IP وDNS وDHCP وTCP/IP وLAN وWAN."
        : "Networking connects devices to exchange data. Learn IP, DNS, DHCP, TCP/IP, LAN, and WAN.";
    }

    if (includesAny(["program", "javascript", "html", "css", "برمجة", "البرمجة"])) {
      return aiLanguage === "ar"
        ? "يمكنك تعلّم HTML وCSS وJavaScript لتطوير المواقع، أو  لأساسيات البرمجة."
        : "Learn HTML, CSS, and JavaScript for web development, o for programming fundamentals.";
    }


    if (includesAny(["nabil", "نبيل", "about", "من أنت", "من هو"])) {
      return aiLanguage === "ar"
        ? "أنا AI / ST، مساعد موقع نبيل الكاملي من وجدة، المغرب. يهتم نبيل بالبرمجة والشبكات  ."
        : "I am AI / ST, the assistant for Nabil El Kamel's website. Nabil is from Oujda, Morocco, and is interested in programming, networking.";
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

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".stars .star").forEach(star => {
        star.addEventListener("click", () => {
            star.classList.toggle("active");
        });
    });
});
