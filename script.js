/* ============================================================
   وسمو — script.js
   ============================================================

   ╔══════════════════════════════════════════════════════════╗
   ║           ⬇️  إعدادات ملف الـ APK  ⬇️                   ║
   ║                                                          ║
   ║  1. ضع ملف الـ APK في نفس مجلد الموقع                  ║
   ║  2. غيّر القيم التالية:                                  ║
   ║                                                          ║
   ║  APK_PATH  → اسم ملف الـ APK (مثال: "wesmo.apk")       ║
   ║  APK_VERSION → رقم الإصدار (مثال: "2.1.0")             ║
   ║  APK_SIZE  → حجم الملف (مثال: "48.5 MB")               ║
   ║                                                          ║
   ╚══════════════════════════════════════════════════════════╝
*/

// ================================================================
//  ✏️  عدّل هنا فقط لربط ملف الـ APK بزر التحميل
// ================================================================
const APK_PATH    = "wesmo.apk";      // اسم ملف الـ APK (أو مسار كامل)
const APK_VERSION = "1.0.0";          // رقم الإصدار
const APK_SIZE    = "-- MB";          // حجم الملف — مثال: "45.2 MB"
// ================================================================

document.addEventListener("DOMContentLoaded", () => {

  // ── ربط زر التحميل ────────────────────────────────────────────
  const downloadBtn = document.getElementById("downloadBtn");
  if (downloadBtn) {
    downloadBtn.href = APK_PATH;
    downloadBtn.setAttribute("download", APK_PATH);
    downloadBtn.addEventListener("click", (e) => {
      // التحقق من أن الملف موجود (اختياري — يعمل فقط على خوادم حقيقية)
      fetch(APK_PATH, { method: "HEAD" })
        .then(res => {
          if (!res.ok) {
            e.preventDefault();
            showToast("⚠️ ملف APK غير موجود بعد — ضعه في مجلد الموقع باسم: " + APK_PATH);
          } else {
            showToast("✅ بدأ التحميل...");
          }
        })
        .catch(() => {
          // إذا فشل الفحص (مثلاً ملف محلي) نكمل التحميل عادةً
        });
    });
  }

  // ── تحديث معلومات الإصدار ──────────────────────────────────────
  const versionEl = document.getElementById("appVersion");
  const sizeEl    = document.getElementById("appSize");
  if (versionEl) versionEl.textContent = APK_VERSION;
  if (sizeEl)    sizeEl.textContent    = APK_SIZE;

  // ── Cursor مخصص ───────────────────────────────────────────────
  const cursor      = document.getElementById("cursor");
  const cursorTrail = document.getElementById("cursorTrail");

  let mouseX = 0, mouseY = 0;
  let trailX = 0, trailY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + "px";
    cursor.style.top  = mouseY + "px";
  });

  (function animateTrail() {
    trailX += (mouseX - trailX) * 0.12;
    trailY += (mouseY - trailY) * 0.12;
    cursorTrail.style.left = trailX + "px";
    cursorTrail.style.top  = trailY + "px";
    requestAnimationFrame(animateTrail);
  })();

  document.querySelectorAll("a, button, .app-card, .neon-card, .lm-app").forEach(el => {
    el.addEventListener("mouseenter", () => {
      cursor.classList.add("hover");
      cursorTrail.classList.add("hover");
    });
    el.addEventListener("mouseleave", () => {
      cursor.classList.remove("hover");
      cursorTrail.classList.remove("hover");
    });
  });

  // ── Navbar — تأثير scroll ──────────────────────────────────────
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 60);
  });

  // ── Scroll reveal ──────────────────────────────────────────────
  const revealEls = document.querySelectorAll(
    ".app-card, .neon-card, .launcher-mockup, .download-box"
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealEls.forEach(el => {
    el.style.opacity    = "0";
    el.style.transform  = "translateY(20px)";
    el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    observer.observe(el);
  });

  document.addEventListener("animationframe", () => {});
  // إضافة class visible → يعيد opacity و transform
  document.head.insertAdjacentHTML("beforeend", `
    <style>
      .visible { opacity: 1 !important; transform: translateY(0) !important; }
    </style>
  `);

  // ── App cards — stagger delay ──────────────────────────────────
  document.querySelectorAll(".app-card").forEach((card, i) => {
    card.style.transitionDelay = (i * 0.07) + "s";
  });

  // ── Smooth scroll للروابط ─────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", (e) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top    = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  });

  // ── Toast notification ─────────────────────────────────────────
  function showToast(msg) {
    const toast = document.createElement("div");
    toast.textContent = msg;
    Object.assign(toast.style, {
      position:    "fixed",
      bottom:      "32px",
      left:        "50%",
      transform:   "translateX(-50%)",
      background:  "#0d1525",
      border:      "1px solid rgba(0,245,255,0.3)",
      color:       "#e8f0fe",
      padding:     "14px 28px",
      borderRadius: "100px",
      fontSize:    "0.95rem",
      fontFamily:  "'Tajawal', sans-serif",
      fontWeight:  "600",
      direction:   "rtl",
      zIndex:      "99999",
      boxShadow:   "0 8px 32px rgba(0,0,0,0.4), 0 0 20px rgba(0,245,255,0.1)",
      animation:   "fadeUp 0.3s ease",
      whiteSpace:  "nowrap",
      maxWidth:    "90vw",
      textAlign:   "center",
    });
    document.head.insertAdjacentHTML("beforeend", `
      <style>
        @keyframes fadeUp {
          from { opacity: 0; transform: translateX(-50%) translateY(10px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      </style>
    `);
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3500);
  }

  // ── Easter egg: Konami Code ────────────────────────────────────
  let konamiSeq = [];
  const konami  = [38,38,40,40,37,39,37,39,66,65];
  document.addEventListener("keydown", (e) => {
    konamiSeq.push(e.keyCode);
    if (konamiSeq.length > 10) konamiSeq.shift();
    if (konamiSeq.join(",") === konami.join(",")) {
      showToast("🎉 وجدت السر! أنت تعرف كيف تلعب 🕹️");
      document.body.style.filter = "hue-rotate(180deg)";
      setTimeout(() => (document.body.style.filter = ""), 3000);
    }
  });

});
