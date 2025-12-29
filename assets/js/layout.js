// assets/js/layout.js
/* =========================================================
   layout.js
   - Loads shared partials
   - Initializes layout-level UI only
   - Safe for GitHub Pages / static hosting
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
  const btn = document.getElementById("mobileMenuBtn");
  const menu = document.getElementById("mobileMenu");
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
          other.querySelector("i").classList.remove("rotate-180");
        }
      });

      panel.classList.toggle("hidden");
      icon.classList.toggle("rotate-180");
    };
  });
}

/* ---------- DESKTOP MEGA MENU ---------- */
function initDesktopMenu() {
  const triggers = document.querySelectorAll(".nav-trigger");
  const menus = document.querySelectorAll(".mega-menu");
  const layer = document.getElementById("megaMenuLayer");

  if (!triggers.length || !layer) return;

  const closeAll = () =>
    menus.forEach(menu => menu.classList.remove("show"));

  triggers.forEach(trigger => {
    trigger.onmouseenter = () => {
      closeAll();
      const menu = document.getElementById(
        "menu-" + trigger.dataset.menu
      );
      if (menu) menu.classList.add("show");
    };
  });

  layer.onmouseleave = closeAll;
}

/* ---------- DARK MODE ---------- */
function initDarkMode() {
  const toggle = document.getElementById("darkModeToggle");
  const icon = document.getElementById("darkModeIcon");
  if (!toggle || !icon) return;

  const root = document.documentElement;

  // Restore persisted state
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
    const isDark = root.classList.contains("dark");

    // Icon represents CURRENT MODE
    icon.className = isDark
      ? "ri-moon-line"
      : "ri-sun-line";
  }
}

/* ---------- MASTER INITIALIZER ---------- */
async function initLayout() {
  await loadPartial("site-header", "/partials/header.html");
  await loadPartial("mega-menus", "/partials/mega-menus.html");
  await loadPartial("trusted-by", "/partials/trusted-by.html");
  await loadPartial("site-footer", "/partials/footer.html");

  // Bind AFTER DOM injection
  requestAnimationFrame(() => {
    initMobileMenu();
    initDesktopMenu();
    initDarkMode();
  });
}

/* ---------- BOOTSTRAP ---------- */
document.addEventListener("DOMContentLoaded", initLayout);
