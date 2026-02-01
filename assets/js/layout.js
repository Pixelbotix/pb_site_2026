/* =========================================================
assets/js/layout.js
   - Loads shared partials
   - Initializes layout-level UI only
   - Safe for static hosting
========================================================= */

/* ---------- PARTIAL LOADER ---------- */
async function loadPartial(targetId, file) {
  const el = document.getElementById(targetId);
  if (!el) return;

  try {
    const res = await fetch(file, { cache: "no-cache" });
    if (!res.ok) return;
    el.innerHTML = await res.text();
  } catch (e) {
    console.error("Partial load failed:", file);
  }
}

/* ---------- MOBILE MENU ---------- */
function initMobileMenu() {
  const btn = document.getElementById("nav-mobile-btn");
  const menu = document.getElementById("nav-mobile-menu");
  if (!btn || !menu) return;

  btn.onclick = () => {
    menu.classList.toggle("max-h-0");
    menu.classList.toggle("max-h-[75vh]");
  };

  const triggers = menu.querySelectorAll(".mobile-trigger");

  triggers.forEach(trigger => {
    trigger.onclick = () => {
      const panel = trigger.nextElementSibling;
      const icon = trigger.querySelector("i");

      triggers.forEach(other => {
        if (other !== trigger) {
          other.nextElementSibling.classList.add("hidden");
          other.querySelector("i")?.classList.remove("rotate-180");
        }
      });

      panel.classList.toggle("hidden");
      icon?.classList.toggle("rotate-180");
    };
  });
}

/* ---------- DESKTOP MEGA MENU ---------- */
function initDesktopMenu() {
  const triggers = document.querySelectorAll(".nav-trigger");
  const menus = document.querySelectorAll(".mega-menu");
  const zone = document.getElementById("nav-hover-zone");

  if (!triggers.length || !zone) return;

  const closeAll = () => {
    menus.forEach(menu => menu.classList.remove("show"));
  };

  triggers.forEach(trigger => {
    trigger.onmouseenter = () => {
      closeAll();
      const menu = document.getElementById(
        "menu-" + trigger.dataset.menu
      );
      if (menu) menu.classList.add("show");
    };
  });

  zone.onmouseleave = closeAll;
}

/* ---------- DARK MODE ---------- */
function initDarkMode() {
  const toggle = document.getElementById("nav-dark-toggle");
  const icon = document.getElementById("nav-dark-icon");
  if (!toggle || !icon) return;

  const root = document.documentElement;

  if (localStorage.theme === "dark") {
    root.classList.add("dark");
  }

  syncIcon();

  toggle.onclick = () => {
    root.classList.toggle("dark");
    localStorage.theme = root.classList.contains("dark")
      ? "dark"
      : "light";
    syncIcon();
  };

  function syncIcon() {
    icon.className = root.classList.contains("dark")
      ? "ri-moon-line"
      : "ri-sun-line";
  }
}

/* ---------- TRUSTED BY SCROLLER ---------- */
function initTrustedBy() {
  const BASE = "/static/trusted-by/";


  const LOGOS = [
    "3devok-logo_4.png",
    "actlogo_10.jpg",
    "Airobo_infinity_2.png",
    "Bigzero-logo_3.jpg",
    "CEG_col_2.png",
    "DMI_5.png",
    "iitm_logo.png",
    "KIT_2.svg.png",
    "LMEC_7.webp",
    "Loyola_6.png",
    "make3d_6.png",
    "medical_spectra.jpeg",
    "Mithra_3d_tech_5.jpg",
    "mit_logo_1.png",
    "nitt_13.png",
    "perfin_health_care_1.png",
    "Pertinent-Logo-1.png",
    "Rajeshwari_engg_college_9.png",
    "remo_11.webp",
    "sairam_8.gif",
    "sairam-sec-logo_8.png",
    "Saveetha_1.png",
    "sri_balaji_14.png",
    "SRM_Institute_of_Science_and_Technology_Logo.svg_3.png",
    "Vellore_Institute_of_Technology_seal_4.svg.png"
  ];

  const scroller = document.getElementById("nav-logo-scroller");
  if (!scroller) return;

  scroller.innerHTML = "";

  [...LOGOS, ...LOGOS].forEach(file => {
    const img = document.createElement("img");
    img.src = BASE + file;
    img.loading = "lazy";
    img.alt = file.replace(/[-_]/g, " ");
    img.className = "h-12 object-contain flex-shrink-0";
    img.onerror = () => img.remove();
    scroller.appendChild(img);
  });
}

/* ---------- BACK TO TOP ---------- */
/* ---------- NSE STYLE BACK TO TOP (PROGRESS CIRCLE) ---------- */
function initBackToTop() {
  const progress = document.getElementById("progressCircle");
  if (!progress) return;

  const circle = progress.querySelector(".circle");

  const radius = 15.9155;
  const circumference = 2 * Math.PI * radius;

  circle.style.strokeDasharray = `${circumference}`;
  circle.style.strokeDashoffset = `${circumference}`;

  const updateProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    const progressRatio = docHeight > 0 ? scrollTop / docHeight : 0;
    const offset = circumference - progressRatio * circumference;

    circle.style.strokeDashoffset = offset;

    if (scrollTop > 200) {
      progress.classList.add("show");
    } else {
      progress.classList.remove("show");
    }
  };

  window.addEventListener("scroll", updateProgress, { passive: true });

  progress.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}


/* ---------- MASTER INITIALIZER ---------- */
async function initLayout() {
  await loadPartial("site-navbar", "/partials/navbar.html");
  await loadPartial("site-footer", "/partials/footer.html");

  requestAnimationFrame(() => {
    initMobileMenu();
    initDesktopMenu();
    initDarkMode();
    initTrustedBy();
    initBackToTop();
    initAcademicClients(); 
    initContactPopup();
    loadContactForm();
    initChatBot();
  });
}

/* ---------- BOOTSTRAP ---------- */
document.addEventListener("DOMContentLoaded", initLayout);


/* ---------- ACADEMIC CLIENTS SCROLLER IN GALLERY ---------- */
function initAcademicClients() {
  const BASE = "/static/academic-clients/";

  const LOGOS = [
    "actlogo_10.jpg",
    "CEG_col_2.png",
    "DMI_5.png",
    "iitm_logo.png",
    "KIT_2.svg.png",
    "LMEC_7.webp",
    "Loyola_6.png",
    "mit_logo_1.png",
    "nitt_13.png",
    "Rajeshwari_engg_college_9.png",
    "remo_11.webp",
    "sairam_8.gif",
    "Saveetha_1.png",
    "sri_balaji_14.png",
    "SRM_Institute_of_Science_and_Technology_Logo.svg_3.png",
    "Vellore_Institute_of_Technology_seal_4.svg.png"
  ];

  const scroller = document.getElementById("academic-logo-scroller");
  if (!scroller) return;

  scroller.innerHTML = "";

  [...LOGOS, ...LOGOS].forEach(file => {
    const img = document.createElement("img");
    img.src = BASE + file;
    img.loading = "lazy";
    img.alt = file.replace(/[-_]/g, " ");
    img.className = "h-14 object-contain flex-shrink-0 opacity-90";
    img.onerror = () => img.remove();
    scroller.appendChild(img);
  });
}


// COntact page part 
// "https://script.google.com/macros/s/AKfycby2V1X-f9Z_0SYaSK6XR7QXIojv0f7-taoxCPbFrODC0hbUtKAyb_hIJdfEI_9YFqJ5/exec"




// Other page contact page
function initContactPopup() {
  const modal = document.getElementById("contact-popup");
  const closeBtn = document.getElementById("contact-popup-close");
  const container = document.getElementById("contact-popup-form");
  const titleEl = document.getElementById("contact-popup-title");

  if (!modal || !container) return;

  // OPEN HANDLER
  document.addEventListener("click", async (e) => {
    const trigger = e.target.closest("[data-contact]");
    if (!trigger) return;

    e.preventDefault();

    const source = trigger.dataset.source || "Unknown";
    const title  = trigger.dataset.title  || "Contact PixelBotix";

    titleEl.textContent = title;
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";

    if (container.innerHTML.trim() === "") {
      const res = await fetch("/partials/contact-form.html", {
        cache: "no-cache"
      });
      container.innerHTML = await res.text();
    }

    bindContactForm(container, source);
  });

  // CLOSE BUTTON
  closeBtn.onclick = () => {
    modal.classList.add("hidden");
    document.body.style.overflow = "auto";
    container.innerHTML = "";
  };

  // ESC KEY CLOSE  ✅ ADD THIS HERE
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      modal.classList.add("hidden");
      document.body.style.overflow = "auto";
      container.innerHTML = "";
    }
  });
}





function bindContactForm(container, source = "Unknown") {
  const form = container.querySelector("#contactForm");
  const status = container.querySelector("#formStatus");

  if (!form || form.dataset.bound === "true") return;
  form.dataset.bound = "true";


  // inject context
  const sourceInput = form.querySelector('input[name="source"]');
  if (sourceInput) sourceInput.value = source;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    status.textContent = "Submitting…";
    status.className = "text-sm text-blue-600";

    const formData = new FormData(form);

    try {
      const res = await fetch(
        "https://script.google.com/macros/s/AKfycby2V1X-f9Z_0SYaSK6XR7QXIojv0f7-taoxCPbFrODC0hbUtKAyb_hIJdfEI_9YFqJ5/exec",
        { method: "POST", body: formData }
      );

      if (!res.ok) throw new Error();

      container.innerHTML = `
        <div class="text-center py-12">
          <i class="ri-checkbox-circle-line text-5xl text-green-600 mb-4"></i>
          <h3 class="text-xl font-semibold mb-2">Submission Successful</h3>
          <p class="text-gray-600 dark:text-gray-400">
            Thank you. Our team will contact you shortly.
          </p>
        </div>
      `;
    } catch {
      status.textContent = "Submission failed. Try again.";
      status.className = "text-sm text-red-600";
    }
  });
}

async function loadContactForm() {
  const container = document.getElementById("contact-form-container");
  if (!container) return;

  const res = await fetch("/partials/contact-form.html", {
    cache: "no-cache"
  });

  container.innerHTML = await res.text();
  bindContactForm(container, "Contact Page");
}


function initChatBot() {
  const API_BASE   = "https://shop.pixelbotix.com/api/chat";
  const CHAT_LOGIN = `${API_BASE}/login/`;
  const CHAT_ASK   = `${API_BASE}/ask/`;

  let chatToken = sessionStorage.getItem("pb_chat_token");

  const toggleBtn = document.getElementById("pb-chat-toggle");
  const chatBox   = document.getElementById("pb-chatbox");
  const sendBtn   = document.getElementById("pb-chat-send");
  const input     = document.getElementById("pb-chat-input");
  const messages  = document.getElementById("pb-chat-messages");

  /* LOGIN OVERLAY ELEMENTS (must exist in footer) */
  const loginOverlay = document.getElementById("pb-chat-login");
  const loginBtn     = document.getElementById("pb-chat-login-btn");
  const userInput    = document.getElementById("pb-chat-username");
  const passInput    = document.getElementById("pb-chat-password");
  const loginError   = document.getElementById("pb-chat-login-error");

  if (!toggleBtn || !chatBox || !loginOverlay) return;

  toggleBtn.onclick = () => {
    chatBox.classList.toggle("hidden");
    if (!chatToken) loginOverlay.classList.remove("hidden");
  };

  loginBtn.onclick = login;
  sendBtn.onclick = sendMessage;

  input.addEventListener("keydown", e => {
    if (e.key === "Enter") sendMessage();
  });

  async function login() {
    loginError.textContent = "";

    const username = userInput.value.trim();
    const password = passInput.value.trim();

    if (!username || !password) {
      loginError.textContent = "Username and password required";
      return;
    }

    try {
      const res = await fetch(CHAT_LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      if (!res.ok) throw new Error();

      const data = await res.json();
      chatToken = data.token;
      sessionStorage.setItem("pb_chat_token", chatToken);

      loginOverlay.classList.add("hidden");
    } catch {
      loginError.textContent = "Invalid credentials";
    }
  }

  async function sendMessage() {
    if (!chatToken) {
      loginOverlay.classList.remove("hidden");
      return;
    }

    const question = input.value.trim();
    if (!question) return;

    addMessage(question, "user");
    input.value = "";

    const thinkingEl = addMessage("Thinking…", "bot");

    try {
      const res = await fetch(CHAT_ASK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: chatToken,
          question: question
        })
      });

      if (!res.ok) throw new Error();

      const data = await res.json();
      thinkingEl.textContent = data.answer;
    } catch {
      thinkingEl.textContent = "Assistant unavailable.";
    }
  }

  function addMessage(text, from) {
    const div = document.createElement("div");
    div.className =
      from === "user"
        ? "text-right text-black dark:text-white"
        : "text-left text-gray-700 dark:text-gray-300";
    div.textContent = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
    return div;
  }
}


// ros 2 js

function registerNow() {
  // Replace with payment or form URL
  window.location.href = "https://shop.pixelbotix.com";
}
