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

 /* Portfolio chatbot — Nabil El Kamel
   No API, no server: runs fully in the browser.
   Only answers questions about Nabil and this website. English only. */
(function () {
  'use strict';

  var L = {
    github: 'https://github.com/elknabil795-ops',
    insta: 'https://www.instagram.com/nabil__elk_/',
    x: 'https://x.com/elknabil299269',
    linkedin: 'https://www.linkedin.com/in/nabil-el-kamel-16363b412/'
  };
  function a(u, t) { return '<a href="' + u + '" target="_blank" rel="noopener noreferrer">' + t + '</a>'; }
  var socials = a(L.insta, 'Instagram') + ' · ' + a(L.x, 'X') + ' · ' + a(L.github, 'GitHub') + ' · ' + a(L.linkedin, 'LinkedIn');

  var TEXT = {
    placeholder: 'Ask about Nabil…',
    hello: 'Hi! Ask me about Nabil, his skills, his projects or how to reach him.',
    fallback: 'I can only answer questions about Nabil and this website. Try one of these:',
    chips: ['Who is Nabil?', 'Skills', 'Projects', 'Contact', 'Goals']
  };

  var INTENTS = [
    { k: ['hello', 'hi', 'hey', 'salam', 'good morning', 'good evening'],
      r: 'Hello! 👋 What would you like to know about Nabil?' },
    { k: ['who is', 'about nabil', 'tell me about', 'introduce', 'bio'],
      r: 'Nabil El Kamel is a 16-year-old student from Oujda, Morocco. He is learning web development, software development and networking by building projects, and he shares what he learns with others.' },
    { k: ['how old', 'age', 'old'],
      r: 'Nabil is 16 years old.' },
    { k: ['oujda', 'where', 'live', 'location', 'city', 'country', 'morocco'],
      r: 'Nabil lives in Oujda, Morocco. 🇲🇦' },
    { k: ['school', 'study', 'student', 'high school', 'grade', 'experimental', 'sciences', 'education'],
      r: 'Nabil is in his first year of high school, studying Experimental Sciences.' },
    { k: ['skill', 'skills', 'html', 'css', 'javascript', 'js', 'technology', 'technologies', 'what can he do', 'learning'],
      r: 'Nabil is currently learning:<br>• <b>HTML, CSS &amp; JavaScript</b> — building and styling responsive websites<br>• <b>Networking</b> — network concepts, IP addressing and network labs<br>His projects also involve Android and Kotlin.' },
    { k: ['network', 'networking', 'wireshark', 'nmap', 'tcp', 'dns', 'packet tracer', 'cybersecurity', 'cyber', 'network analysis', 'lab'],
      r: '<b>Network Analysis Lab</b> is Nabil\'s personal cybersecurity lab: network traffic analysis, connectivity troubleshooting, protocols and security testing in authorized environments. Tools: Wireshark, Nmap, TCP/IP, DNS and Packet Tracer. ' + a(L.github, 'See GitHub') },
    { k: ['project', 'projects', 'portfolio work', 'built', 'made', 'work'],
      r: 'Nabil has four featured projects:<br>• <b>Personal Portfolio</b> — this website<br>• <b>Morocco Cancer Assist</b> — cancer information and support in Morocco<br>• <b>ST Vision</b> — an accessibility app for blind and visually impaired people<br>• <b>Network Analysis Lab</b> — a cybersecurity and networking lab<br>Ask me about any of them, or ' + a(L.github, 'visit his GitHub') + '.' },
    { k: ['personal portfolio', 'this site', 'this website', 'portfolio'],
      r: '<b>Personal Portfolio</b> is this website: a personal site for Nabil\'s profile, skills and projects, built with HTML, CSS and JavaScript.' },
    { k: ['cancer', 'morocco cancer assist', 'cancer assist'],
      r: '<b>Morocco Cancer Assist</b> is a project concept focused on cancer information and support in Morocco, built with HTML, CSS and JavaScript.' },
    { k: ['st vision', 'stvision', 'vision', 'blind', 'visually impaired', 'kotlin', 'android', 'accessibility', 'voice command', 'voice commands'],
      r: '<b>ST Vision</b> is an accessibility software project that helps blind and visually impaired people use technology through voice commands and other useful digital features. Tech: Android, Kotlin, voice commands, accessibility.' },
    { k: ['contact', 'reach', 'email', 'mail', 'phone', 'call', 'number', 'tel', 'whatsapp', 'get in touch'],
      r: 'You can reach Nabil through the Contact section of this site (email and phone are listed there), or on his profiles:<br>' + socials },
    { k: ['instagram', 'insta', 'github', 'twitter', 'linkedin', 'social', 'follow', 'profiles'],
      r: 'Follow Nabil here:<br>' + socials },
    { k: ['goal', 'goals', 'plan', 'future', 'aim', 'journey', 'mission', 'why'],
      r: 'Nabil is at the start of his journey in web development, software development and networking. He wants to learn step by step, from the basics to advanced topics, and to share what he learns through stories and posts so others can learn with him.' },
    { k: ['who are you', 'what are you', 'chatbot', 'assistant', 'bot', 'who made you'],
      r: 'I\'m the assistant of this website. I only answer questions about Nabil and his work.' },
    { k: ['thanks', 'thank', 'thx'],
      r: 'You\'re welcome! 😊' },
    { k: ['bye', 'goodbye', 'see you'],
      r: 'Goodbye! Thanks for visiting. 👋' }
  ];

  function norm(s) {
    return String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim();
  }
  INTENTS.forEach(function (it) { it.nk = it.k.map(norm); });

  function match(text) {
    var t = ' ' + norm(text) + ' ';
    var tokens = t.trim().split(' ');
    var best = null, bestScore = 0;
    INTENTS.forEach(function (it) {
      var score = 0;
      it.nk.forEach(function (k) {
        var hit = (k.length <= 4 && k.indexOf(' ') === -1) ? tokens.indexOf(k) !== -1 : t.indexOf(k) !== -1;
        if (hit) score += k.length;
      });
      if (score > bestScore) { bestScore = score; best = it; }
    });
    if (!best && /nabil/.test(t)) best = INTENTS[1];
    return best;
  }

  var css = '\
#nk-bot,#nk-bot *{box-sizing:border-box}\
#nk-bot{position:fixed;right:20px;bottom:20px;z-index:9999;font-family:inherit;font-size:15px;line-height:1.5}\
#nk-fab{width:56px;height:56px;display:grid;place-items:center;border:0;border-radius:50%;cursor:pointer;color:#fff;font-size:22px;background:#e11d2e;box-shadow:0 8px 24px rgba(225,29,46,.4)}\
#nk-fab:hover{background:#f02a3b}\
#nk-panel{position:absolute;right:0;bottom:68px;width:350px;max-width:calc(100vw - 24px);height:480px;max-height:calc(100vh - 100px);display:none;flex-direction:column;background:#0a0a0a;color:#f1f1f1;border:1px solid #2a2a2a;border-radius:14px;overflow:hidden;box-shadow:0 20px 50px rgba(0,0,0,.6)}\
#nk-bot.open #nk-panel{display:flex;animation:nkIn .18s ease-out}\
@keyframes nkIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}\
.nk-head{display:flex;align-items:center;gap:10px;padding:12px 14px;background:#000;border-bottom:2px solid #e11d2e}\
.nk-head i.nk-ic{color:#e11d2e;font-size:18px}\
.nk-head span.nk-sp{flex:1}\
.nk-x{border:0;background:transparent;color:#bbb;font-size:16px;cursor:pointer;padding:2px 6px}\
.nk-x:hover{color:#fff}\
#nk-msgs{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:10px}\
.nk-m{max-width:88%;padding:9px 12px;border-radius:12px;word-wrap:break-word}\
.nk-m a{color:#ff6b78;text-decoration:underline}\
.nk-bot{align-self:flex-start;background:#1a1a1a;border-bottom-left-radius:3px}\
.nk-user{align-self:flex-end;color:#fff;background:#e11d2e;border-bottom-right-radius:3px}\
.nk-chips{display:flex;flex-wrap:wrap;gap:6px;align-self:flex-start}\
.nk-chips button{border:1px solid #e11d2e;background:transparent;color:#f1f1f1;border-radius:999px;padding:5px 12px;font:inherit;font-size:13px;cursor:pointer}\
.nk-chips button:hover{background:#e11d2e}\
.nk-dots{display:inline-flex;gap:4px;padding:4px 0}\
.nk-dots i{width:6px;height:6px;border-radius:50%;background:#888;animation:nkB 1s infinite}\
.nk-dots i:nth-child(2){animation-delay:.15s}.nk-dots i:nth-child(3){animation-delay:.3s}\
@keyframes nkB{0%,60%,100%{opacity:.3}30%{opacity:1}}\
#nk-form{display:flex;gap:8px;padding:10px;background:#000;border-top:1px solid #2a2a2a}\
#nk-in{flex:1;min-width:0;padding:9px 12px;border-radius:10px;border:1px solid #333;background:#111;color:#f1f1f1;font:inherit}\
#nk-in::placeholder{color:#777}\
#nk-send{width:42px;border:0;border-radius:10px;cursor:pointer;color:#fff;background:#e11d2e;font-size:15px}\
#nk-send:hover{background:#f02a3b}\
#nk-bot button:focus-visible,#nk-in:focus-visible{outline:2px solid #ff6b78;outline-offset:2px}\
@media (max-width:480px){#nk-bot{right:12px;bottom:12px}#nk-panel{width:calc(100vw - 24px);height:70vh}}\
@media (prefers-reduced-motion:reduce){#nk-bot.open #nk-panel,.nk-dots i{animation:none}}';

  function init() {
    var old = document.getElementById('ai-st');   // remove the old chatbot block
    if (old) old.remove();

    var st = document.createElement('style');
    st.textContent = css;
    document.head.appendChild(st);

    var root = document.createElement('div');
    root.id = 'nk-bot';
    root.innerHTML =
      '<div id="nk-panel" role="dialog" aria-label="Chat">' +
        '<div class="nk-head"><i class="fa-solid fa-robot nk-ic" aria-hidden="true"></i><span class="nk-sp"></span>' +
          '<button type="button" class="nk-x" id="nk-close" aria-label="Close chat"><i class="fa-solid fa-xmark"></i></button>' +
        '</div>' +
        '<div id="nk-msgs" aria-live="polite"></div>' +
        '<form id="nk-form" autocomplete="off">' +
          '<input id="nk-in" type="text" maxlength="200" required aria-label="Your question">' +
          '<button id="nk-send" type="submit" aria-label="Send"><i class="fa-solid fa-paper-plane"></i></button>' +
        '</form>' +
      '</div>' +
      '<button id="nk-fab" type="button" aria-label="Open chat" aria-expanded="false"><i class="fa-solid fa-comment-dots"></i></button>';
    document.body.appendChild(root);

    var msgs = root.querySelector('#nk-msgs'),
        form = root.querySelector('#nk-form'),
        input = root.querySelector('#nk-in'),
        fab = root.querySelector('#nk-fab');
    input.placeholder = TEXT.placeholder;

    function add(html, who, asText) {
      var d = document.createElement('div');
      d.className = 'nk-m nk-' + who;
      if (asText) d.textContent = html; else d.innerHTML = html;
      msgs.appendChild(d);
      msgs.scrollTop = msgs.scrollHeight;
      return d;
    }

    function chips() {
      var wrap = document.createElement('div');
      wrap.className = 'nk-chips';
      TEXT.chips.forEach(function (c) {
        var b = document.createElement('button');
        b.type = 'button'; b.textContent = c;
        b.addEventListener('click', function () { ask(c); });
        wrap.appendChild(b);
      });
      msgs.appendChild(wrap);
      msgs.scrollTop = msgs.scrollHeight;
    }

    function ask(q) {
      q = q.trim();
      if (!q) return;
      add(q, 'user', true);
      var typing = add('<span class="nk-dots"><i></i><i></i><i></i></span>', 'bot');
      setTimeout(function () {
        typing.remove();
        var it = match(q);
        if (it) add(it.r, 'bot');
        else { add(TEXT.fallback, 'bot'); chips(); }
      }, 450);
    }

    function open(v) {
      root.classList.toggle('open', v);
      fab.setAttribute('aria-expanded', String(v));
      if (v) input.focus();
    }

    fab.addEventListener('click', function () { open(!root.classList.contains('open')); });
    root.querySelector('#nk-close').addEventListener('click', function () { open(false); fab.focus(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') open(false); });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = input.value; input.value = '';
      ask(v);
    });

    add(TEXT.hello, 'bot');
    chips();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
