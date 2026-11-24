// ================================
// 1. LOADING ANIMATION
// ================================
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  // Beri jeda singkat agar animasi loading terlihat.
  setTimeout(() => {
    loader.classList.add("hidden");
    document.body.classList.remove("loading");
  }, 450);
});

document.body.classList.add("loading");

// ================================
// 2. MOBILE NAVIGATION
// ================================
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

menuToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", isOpen);
  menuToggle.innerHTML = isOpen
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
});

// Tutup menu setelah salah satu link diklik.
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
  });
});

// ================================
// 3. STICKY NAVBAR
// ================================
const header = document.getElementById("header");

function handleHeader() {
  header.classList.toggle("scrolled", window.scrollY > 30);
}

window.addEventListener("scroll", handleHeader);
handleHeader();

// ================================
// 4. FADE IN SAAT SCROLL
// ================================
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12
  });

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  // Fallback untuk browser yang belum mendukung IntersectionObserver.
  revealElements.forEach((element) => element.classList.add("visible"));
}

// ================================
// 5. ACTIVE NAV LINK SAAT SCROLL
// ================================
const sections = document.querySelectorAll("main section[id]");

function updateActiveLink() {
  let currentSection = "home";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;

    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${currentSection}`
    );
  });
}

window.addEventListener("scroll", updateActiveLink);
updateActiveLink();

// ================================
// 6. TAHUN OTOMATIS DI FOOTER
// ================================
document.getElementById("current-year").textContent = new Date().getFullYear();
