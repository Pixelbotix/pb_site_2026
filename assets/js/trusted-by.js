// assets/js/trusted-by.js
/* ================= trusted-by.js =================
   Responsibility:
   - Render Trusted-By logo scroller
   - Safe for partial loading (GitHub Pages)
   - No dependency on layout.js
*/

(function () {
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

  function initTrustedBy() {
    const scroller = document.getElementById("logoScroller");
    if (!scroller) return;

    function addLogos(list) {
      list.forEach(file => {
        const img = document.createElement("img");
        img.src = BASE + file;
        img.loading = "lazy";
        img.alt = file.replace(/[-_]/g, " ");
        img.className =
          "h-12 object-contain flex-shrink-0 opacity-100 will-change-transform transition-all";
        img.onerror = () => img.remove();
        scroller.appendChild(img);
      });
    }

    // Clear in case of re-init
    scroller.innerHTML = "";

    // Duplicate for seamless loop
    addLogos(LOGOS);
    addLogos(LOGOS);
  }

  // Delay init until DOM + partial load
  document.addEventListener("DOMContentLoaded", () => {
    // Small delay to ensure partial is injected
    setTimeout(initTrustedBy, 50);
  });
})();
