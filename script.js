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
  /* AI / ST — chatbot dyal portfolio Nabil El Kamel
   Bla API, bla serveur: kolchi khdam f browser.
   Kay3ref ghir 3la l-m3loumat li f site. */
(function () {
  'use strict';

  /* ---------- 1. Mo3tayat ---------- */
  var L = {
    github: 'https://github.com/elknabil795-ops',
    insta: 'https://www.instagram.com/nabil__elk_/',
    x: 'https://x.com/elknabil299269',
    linkedin: 'https://www.linkedin.com/in/nabil-el-kamel-16363b412/'
  };
  function a(u, t) { return '<a href="' + u + '" target="_blank" rel="noopener noreferrer">' + t + '</a>'; }
  var socials = a(L.insta, 'Instagram') + ' · ' + a(L.x, 'X') + ' · ' + a(L.github, 'GitHub') + ' · ' + a(L.linkedin, 'LinkedIn');

  var UI = {
    en: { dir: 'ltr', title: 'AI / ST', placeholder: 'Ask about Nabil…', send: 'Send', close: 'Close',
      hello: "Hi! I'm AI / ST. Ask me about Nabil El Kamel, his skills, projects or how to reach him.",
      fallback: "I can only answer questions about Nabil and this website. Try one of these:",
      chips: ['Who is Nabil?', 'Skills', 'Projects', 'Contact', 'Goals'] },
    fr: { dir: 'ltr', title: 'AI / ST', placeholder: 'Pose une question sur Nabil…', send: 'Envoyer', close: 'Fermer',
      hello: "Salut ! Je suis AI / ST. Pose-moi des questions sur Nabil El Kamel, ses compétences, ses projets ou comment le contacter.",
      fallback: "Je ne peux répondre qu'aux questions sur Nabil et ce site. Essaie l'une de celles-ci :",
      chips: ['Qui est Nabil ?', 'Compétences', 'Projets', 'Contact', 'Objectifs'] },
    ar: { dir: 'rtl', title: 'AI / ST', placeholder: 'اسأل عن نبيل…', send: 'إرسال', close: 'إغلاق',
      hello: 'مرحباً! أنا AI / ST. اسألني عن نبيل الكامل، مهاراته، مشاريعه أو كيفية التواصل معه.',
      fallback: 'أستطيع الإجابة فقط عن نبيل وهذا الموقع. جرّب أحد هذه الأسئلة:',
      chips: ['من هو نبيل؟', 'المهارات', 'المشاريع', 'التواصل', 'الأهداف'] }
  };

  /* ---------- 2. L-ma3rifa (intents) ---------- */
  var INTENTS = [
    { id: 'greet',
      k: ['salam', 'slm', 'salut', 'hello', 'hi', 'hey', 'bonjour', 'bonsoir', 'marhaba', 'ahlan', 'السلام', 'مرحبا', 'اهلا', 'سلام'],
      r: { en: "Hello! 👋 What would you like to know about Nabil?",
           fr: "Bonjour ! 👋 Que veux-tu savoir sur Nabil ?",
           ar: 'أهلاً بك! 👋 ماذا تريد أن تعرف عن نبيل؟' } },
    { id: 'who',
      k: ['who is', 'about nabil', 'tell me about', 'qui est', 'presente', 'chkoun nabil', 'chkon nabil', '3arfni', 'عرفني', 'من هو', 'من يكون', 'نبذه', 'تعريف'],
      r: { en: "Nabil El Kamel is a 16-year-old student from Oujda, Morocco. He is learning web development, software development and networking by building projects, and he shares what he learns with others.",
           fr: "Nabil El Kamel est un lycéen de 16 ans originaire d'Oujda, au Maroc. Il apprend le développement web, le développement logiciel et les réseaux en construisant des projets, et partage ce qu'il apprend.",
           ar: 'نبيل الكامل طالب عمره 16 سنة من وجدة بالمغرب. يتعلم تطوير الويب وتطوير البرمجيات والشبكات من خلال بناء المشاريع، ويشارك ما يتعلمه مع الآخرين.' } },
    { id: 'age',
      k: ['how old', 'age', 'ans', 'quel age', 'qdach', '9ddach', '3mrou', 'عمر', 'كم عمر', 'سنه'],
      r: { en: "Nabil is 16 years old.", fr: "Nabil a 16 ans.", ar: 'عمر نبيل 16 سنة.' } },
    { id: 'location',
      k: ['oujda', 'wjda', 'wejda', 'where', 'live', 'location', 'ville', 'habite', 'fin kayskon', 'maroc', 'morocco', 'وجده', 'اين', 'يسكن', 'المغرب'],
      r: { en: "Nabil lives in Oujda, Morocco. 🇲🇦", fr: "Nabil habite à Oujda, au Maroc. 🇲🇦", ar: 'يعيش نبيل في وجدة، المغرب. 🇲🇦' } },
    { id: 'school',
      k: ['school', 'study', 'student', 'high school', 'lycee', 'ecole', 'etudie', 'experimental', 'sciences', 'grade', 'kayqra', 'يدرس', 'دراسه', 'تلميذ', 'طالب', 'مستوي', 'علوم'],
      r: { en: "Nabil is in his first year of high school, studying Experimental Sciences.",
           fr: "Nabil est en première année de lycée, en filière Sciences Expérimentales.",
           ar: 'نبيل في السنة الأولى من الثانوي، شعبة العلوم التجريبية.' } },
    { id: 'skills',
      k: ['skill', 'skills', 'html', 'css', 'javascript', 'js', 'competence', 'competences', 'technolog', 'what can he do', 'mahara', 'مهارات', 'تقنيات', 'مهاره', 'يتقن'],
      r: { en: "Nabil is currently learning:<br>• <b>HTML, CSS &amp; JavaScript</b> — building and styling responsive websites<br>• <b>Networking</b> — network concepts, IP addressing and network labs<br>His projects also involve Android and Kotlin.",
           fr: "Nabil apprend actuellement :<br>• <b>HTML, CSS et JavaScript</b> — créer et styliser des sites responsives<br>• <b>Réseaux</b> — concepts réseau, adressage IP et labs<br>Ses projets utilisent aussi Android et Kotlin.",
           ar: 'يتعلم نبيل حالياً:<br>• <b>HTML وCSS وJavaScript</b> — بناء وتنسيق مواقع متجاوبة<br>• <b>الشبكات</b> — مفاهيم الشبكات وعناوين IP والتجارب العملية<br>كما تتضمن مشاريعه Android وKotlin.' } },
    { id: 'networking',
      k: ['network', 'networking', 'reseau', 'reseaux', 'wireshark', 'nmap', 'tcp', 'dns', 'packet tracer', 'cybersecurity', 'cyber', 'network analysis', 'lab', 'شبكات', 'الشبكات', 'امن سيبراني', 'سيبراني'],
      r: { en: "<b>Network Analysis Lab</b> is Nabil's personal cybersecurity lab: network traffic analysis, connectivity troubleshooting, protocols and security testing in authorized environments. Tools: Wireshark, Nmap, TCP/IP, DNS and Packet Tracer. " + a(L.github, 'See GitHub'),
           fr: "<b>Network Analysis Lab</b> est le labo de cybersécurité personnel de Nabil : analyse du trafic, dépannage de connectivité, protocoles et tests de sécurité en environnements autorisés. Outils : Wireshark, Nmap, TCP/IP, DNS et Packet Tracer. " + a(L.github, 'Voir GitHub'),
           ar: '<b>Network Analysis Lab</b> هو مختبر الأمن السيبراني الشخصي لنبيل: تحليل حركة الشبكة، حل مشاكل الاتصال، البروتوكولات، واختبارات الأمان في بيئات مصرح بها. الأدوات: Wireshark وNmap وTCP/IP وDNS وPacket Tracer. ' + a(L.github, 'GitHub') } },
    { id: 'projects',
      k: ['project', 'projects', 'projet', 'projets', 'mashari3', 'mashrou3', 'portfolio work', 'built', 'مشاريع', 'مشروع', 'اعمال'],
      r: { en: "Nabil has four featured projects:<br>• <b>Personal Portfolio</b> — this website<br>• <b>Morocco Cancer Assist</b> — cancer information and support in Morocco<br>• <b>ST Vision</b> — an accessibility app for blind and visually impaired people<br>• <b>Network Analysis Lab</b> — a cybersecurity and networking lab<br>Ask me about any of them, or " + a(L.github, 'visit his GitHub') + ".",
           fr: "Nabil a quatre projets principaux :<br>• <b>Personal Portfolio</b> — ce site<br>• <b>Morocco Cancer Assist</b> — information et soutien sur le cancer au Maroc<br>• <b>ST Vision</b> — une app d'accessibilité pour les personnes aveugles et malvoyantes<br>• <b>Network Analysis Lab</b> — un labo de cybersécurité et réseaux<br>Demande-moi des détails sur l'un d'eux, ou " + a(L.github, 'visite son GitHub') + ".",
           ar: 'لنبيل أربعة مشاريع مميزة:<br>• <b>Personal Portfolio</b> — هذا الموقع<br>• <b>Morocco Cancer Assist</b> — معلومات ودعم حول السرطان في المغرب<br>• <b>ST Vision</b> — تطبيق للمكفوفين وضعاف البصر<br>• <b>Network Analysis Lab</b> — مختبر للشبكات والأمن السيبراني<br>اسألني عن أي مشروع، أو ' + a(L.github, 'زر حسابه على GitHub') + '.' } },
    { id: 'portfolio',
      k: ['personal portfolio', 'this site', 'this website', 'portfolio', 'hada site', 'ce site', 'هذا الموقع', 'الموقع'],
      r: { en: "<b>Personal Portfolio</b> is this website: a personal site for Nabil's profile, skills and projects, built with HTML, CSS and JavaScript.",
           fr: "<b>Personal Portfolio</b> est ce site : un site personnel présentant le profil, les compétences et les projets de Nabil, fait en HTML, CSS et JavaScript.",
           ar: '<b>Personal Portfolio</b> هو هذا الموقع: موقع شخصي يعرض ملف نبيل ومهاراته ومشاريعه، مبني بـ HTML وCSS وJavaScript.' } },
    { id: 'cancer',
      k: ['cancer', 'morocco cancer assist', 'cancer assist', 'سرطان'],
      r: { en: "<b>Morocco Cancer Assist</b> is a project concept focused on cancer information and support in Morocco, built with HTML, CSS and JavaScript.",
           fr: "<b>Morocco Cancer Assist</b> est un concept de projet axé sur l'information et le soutien autour du cancer au Maroc, réalisé en HTML, CSS et JavaScript.",
           ar: '<b>Morocco Cancer Assist</b> فكرة مشروع تركز على المعلومات والدعم حول السرطان في المغرب، مبنية بـ HTML وCSS وJavaScript.' } },
    { id: 'stvision',
      k: ['st vision', 'stvision', 'vision', 'blind', 'visually impaired', 'aveugle', 'malvoyant', 'kotlin', 'android', 'accessibility', 'accessibilite', 'voice command', 'كفيف', 'المكفوفين', 'ضعاف البصر', 'اندرويد', 'اوامر صوتيه'],
      r: { en: "<b>ST Vision</b> is an accessibility software project that helps blind and visually impaired people use technology through voice commands and other useful digital features. Tech: Android, Kotlin, voice commands, accessibility.",
           fr: "<b>ST Vision</b> est un projet logiciel d'accessibilité qui aide les personnes aveugles et malvoyantes à utiliser la technologie grâce aux commandes vocales et à d'autres fonctions utiles. Technos : Android, Kotlin, commandes vocales, accessibilité.",
           ar: '<b>ST Vision</b> مشروع برمجي لإتاحة التكنولوجيا للمكفوفين وضعاف البصر عبر الأوامر الصوتية وميزات رقمية مفيدة. التقنيات: Android وKotlin والأوامر الصوتية وإمكانية الوصول.' } },
    { id: 'contact',
      k: ['contact', 'reach', 'email', 'mail', 'phone', 'call', 'number', 'tel', 'whatsapp', 'contacter', 'joindre', 'tssal', 'ittisal', 'تواصل', 'اتصال', 'رقم', 'ايميل', 'بريد', 'هاتف'],
      r: { en: "You can reach Nabil through the Contact section of this site (email and phone are listed there), or on his profiles:<br>" + socials,
           fr: "Tu peux contacter Nabil via la section Contact du site (email et téléphone y figurent), ou sur ses profils :<br>" + socials,
           ar: 'يمكنك التواصل مع نبيل عبر قسم التواصل في الموقع (البريد والهاتف مذكوران هناك)، أو عبر حساباته:<br>' + socials } },
    { id: 'social',
      k: ['instagram', 'insta', 'github', 'twitter', 'linkedin', 'social', 'follow', 'profiles', 'profils', 'suivre', 'حسابات', 'تابع', 'انستغرام', 'لينكدإن', 'لينكدان'],
      r: { en: "Follow Nabil here:<br>" + socials, fr: "Suis Nabil ici :<br>" + socials, ar: 'تابع نبيل هنا:<br>' + socials } },
    { id: 'goals',
      k: ['goal', 'goals', 'plan', 'future', 'aim', 'journey', 'learning', 'objectif', 'objectifs', 'avenir', 'but', 'ahdaf', 'hadaf', 'اهداف', 'هدف', 'رحله', 'مستقبل'],
      r: { en: "Nabil is at the start of his journey in web development, software development and networking. He wants to learn step by step, from the basics to advanced topics, and to share what he learns through stories and posts so others can learn with him.",
           fr: "Nabil est au début de son parcours en développement web, développement logiciel et réseaux. Il veut apprendre étape par étape, des bases aux sujets avancés, et partager ce qu'il apprend via des stories et des posts pour que d'autres apprennent avec lui.",
           ar: 'نبيل في بداية رحلته في تطوير الويب وتطوير البرمجيات والشبكات. يريد التعلم خطوة بخطوة من الأساسيات إلى المواضيع المتقدمة، ومشاركة ما يتعلمه عبر القصص والمنشورات ليتعلم معه الآخرون.' } },
    { id: 'bot',
      k: ['who are you', 'qui es', 'what are you', 'chatbot', 'assistant', 'ai / st', 'who made you', 'من انت', 'من انتا'],
      r: { en: "I'm AI / ST, the assistant of this portfolio. I only answer questions about Nabil and his website.",
           fr: "Je suis AI / ST, l'assistant de ce portfolio. Je réponds uniquement aux questions sur Nabil et son site.",
           ar: 'أنا AI / ST، مساعد هذا الموقع. أجيب فقط عن الأسئلة المتعلقة بنبيل وموقعه.' } },
    { id: 'thanks',
      k: ['thanks', 'thank', 'merci', 'chokran', 'shukran', 'شكرا', 'جزاك'],
      r: { en: "You're welcome! 😊", fr: "Avec plaisir ! 😊", ar: 'عفواً! 😊' } },
    { id: 'bye',
      k: ['bye', 'au revoir', 'bslama', 'tsbah', 'مع السلامه', 'وداعا'],
      r: { en: "Goodbye! Thanks for visiting. 👋", fr: "Au revoir ! Merci de ta visite. 👋", ar: 'إلى اللقاء! شكراً لزيارتك. 👋' } }
  ];

  /* ---------- 3. Fahm l-kalam ---------- */
  function norm(s) {
    return String(s).toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f\u064B-\u065F\u0670]/g, '')
      .replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي')
      .replace(/[^a-z0-9\u0600-\u06FF/ ]+/g, ' ')
      .replace(/\s+/g, ' ').trim();
  }
  INTENTS.forEach(function (it) { it.nk = it.k.map(norm); });

  function match(text) {
    var t = ' ' + norm(text) + ' ';
    var tokens = t.trim().split(' ');
    var best = null, bestScore = 0;
    INTENTS.forEach(function (it) {
      var score = 0;
      it.nk.forEach(function (k) {
        var hit;
        if (/^[a-z0-9]+$/.test(k) && k.length <= 4) hit = tokens.indexOf(k) !== -1;
        else hit = t.indexOf(k) !== -1;
        if (hit) score += k.length;
      });
      if (score > bestScore) { bestScore = score; best = it; }
    });
    if (!best && /nabil|نبيل/.test(t)) best = INTENTS[1];
    return best;
  }

  /* ---------- 4. CSS ---------- */
  var css = '\
#nk-bot,#nk-bot *{box-sizing:border-box}\
#nk-bot{position:fixed;right:20px;bottom:20px;z-index:9999;font-family:inherit;font-size:15px;line-height:1.5}\
#nk-fab{display:flex;align-items:center;gap:8px;padding:12px 18px;border:0;border-radius:999px;cursor:pointer;color:#fff;font:inherit;font-weight:600;background:linear-gradient(135deg,#ff3d57,#8b5cf6);box-shadow:0 8px 24px rgba(139,92,246,.35)}\
#nk-fab:hover{filter:brightness(1.08)}\
#nk-panel{position:absolute;right:0;bottom:60px;width:350px;max-width:calc(100vw - 24px);height:480px;max-height:calc(100vh - 100px);display:none;flex-direction:column;background:#12121a;color:#ececf3;border:1px solid rgba(255,255,255,.1);border-radius:16px;overflow:hidden;box-shadow:0 20px 50px rgba(0,0,0,.45)}\
#nk-bot.open #nk-panel{display:flex;animation:nkIn .18s ease-out}\
@keyframes nkIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}\
.nk-head{display:flex;align-items:center;gap:8px;padding:12px 14px;border-bottom:1px solid rgba(255,255,255,.08);background:#0b0b10}\
.nk-head strong{flex:1;font-size:15px}\
.nk-lang{display:flex;gap:4px}\
.nk-lang button,.nk-x{border:1px solid rgba(255,255,255,.14);background:transparent;color:#c9c9d6;border-radius:8px;padding:3px 8px;font:inherit;font-size:12px;cursor:pointer}\
.nk-lang button[aria-pressed="true"]{background:linear-gradient(135deg,#ff3d57,#8b5cf6);border-color:transparent;color:#fff}\
.nk-x{font-size:14px;padding:3px 8px}\
#nk-msgs{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:10px}\
.nk-m{max-width:88%;padding:9px 12px;border-radius:14px;word-wrap:break-word;unicode-bidi:plaintext}\
.nk-m a{color:#a78bfa;text-decoration:underline}\
.nk-bot{align-self:flex-start;background:#1d1d29;border-bottom-left-radius:4px}\
.nk-user{align-self:flex-end;color:#fff;background:linear-gradient(135deg,#ff3d57,#8b5cf6);border-bottom-right-radius:4px}\
.nk-chips{display:flex;flex-wrap:wrap;gap:6px;align-self:flex-start}\
.nk-chips button{border:1px solid rgba(255,255,255,.18);background:transparent;color:#ececf3;border-radius:999px;padding:5px 11px;font:inherit;font-size:13px;cursor:pointer}\
.nk-chips button:hover{border-color:#8b5cf6;color:#fff}\
.nk-dots{display:inline-flex;gap:4px;padding:4px 0}\
.nk-dots i{width:6px;height:6px;border-radius:50%;background:#8b8ba0;animation:nkB 1s infinite}\
.nk-dots i:nth-child(2){animation-delay:.15s}.nk-dots i:nth-child(3){animation-delay:.3s}\
@keyframes nkB{0%,60%,100%{opacity:.3}30%{opacity:1}}\
#nk-form{display:flex;gap:8px;padding:10px;border-top:1px solid rgba(255,255,255,.08);background:#0b0b10}\
#nk-in{flex:1;min-width:0;padding:9px 12px;border-radius:10px;border:1px solid rgba(255,255,255,.14);background:#12121a;color:#ececf3;font:inherit}\
#nk-in::placeholder{color:#8b8ba0}\
#nk-send{border:0;border-radius:10px;padding:0 14px;cursor:pointer;font:inherit;font-weight:600;color:#fff;background:linear-gradient(135deg,#ff3d57,#8b5cf6)}\
#nk-bot button:focus-visible,#nk-in:focus-visible{outline:2px solid #a78bfa;outline-offset:2px}\
@media (max-width:480px){#nk-bot{right:12px;bottom:12px}#nk-panel{width:calc(100vw - 24px);height:70vh}}\
@media (prefers-reduced-motion:reduce){#nk-bot.open #nk-panel,.nk-dots i{animation:none}}';

  /* ---------- 5. UI ---------- */
  function init() {
    var old = document.getElementById('ai-st');
    if (old) old.remove();                       

    var st = document.createElement('style');
    st.textContent = css;
    document.head.appendChild(st);

    var lang = 'en';
    var root = document.createElement('div');
    root.id = 'nk-bot';
    root.innerHTML =
      '<div id="nk-panel" role="dialog" aria-label="AI / ST">' +
        '<div class="nk-head"><strong>AI / ST</strong>' +
          '<div class="nk-lang">' +
            '<button type="button" data-l="ar">AR</button>' +
            '<button type="button" data-l="en">EN</button>' +
            '<button type="button" data-l="fr">FR</button>' +
          '</div>' +
          '<button type="button" class="nk-x" id="nk-close">✕</button>' +
        '</div>' +
        '<div id="nk-msgs" aria-live="polite"></div>' +
        '<form id="nk-form" autocomplete="off">' +
          '<input id="nk-in" type="text" maxlength="200" required>' +
          '<button id="nk-send" type="submit"></button>' +
        '</form>' +
      '</div>' +
      '<button id="nk-fab" type="button" aria-expanded="false">🤖 AI / ST</button>';
    document.body.appendChild(root);

    var panel = root.querySelector('#nk-panel'),
        msgs = root.querySelector('#nk-msgs'),
        form = root.querySelector('#nk-form'),
        input = root.querySelector('#nk-in'),
        fab = root.querySelector('#nk-fab'),
        langBtns = root.querySelectorAll('.nk-lang button');

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
      UI[lang].chips.forEach(function (c) {
        var b = document.createElement('button');
        b.type = 'button'; b.textContent = c;
        b.addEventListener('click', function () { ask(c); });
        wrap.appendChild(b);
      });
      msgs.appendChild(wrap);
      msgs.scrollTop = msgs.scrollHeight;
    }

    function setLang(l) {
      lang = l;
      var u = UI[l];
      panel.dir = u.dir;
      input.placeholder = u.placeholder;
      root.querySelector('#nk-send').textContent = u.send;
      root.querySelector('#nk-close').setAttribute('aria-label', u.close);
      langBtns.forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.l === l)); });
    }

    function start() {
      msgs.innerHTML = '';
      add(UI[lang].hello, 'bot');
      chips();
    }

    function ask(q) {
      q = q.trim();
      if (!q) return;
      if (/[\u0600-\u06FF]/.test(q) && lang !== 'ar') setLang('ar');   
      add(q, 'user', true);
      var typing = add('<span class="nk-dots"><i></i><i></i><i></i></span>', 'bot');
      setTimeout(function () {
        typing.remove();
        var it = match(q);
        if (it) add(it.r[lang], 'bot');
        else { add(UI[lang].fallback, 'bot'); chips(); }
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
    langBtns.forEach(function (b) {
      b.addEventListener('click', function () { setLang(b.dataset.l); start(); });
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = input.value; input.value = '';
      ask(v);
    });

    setLang('en');
    start();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();


})();
