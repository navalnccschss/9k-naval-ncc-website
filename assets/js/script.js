// =========================================================
// 9(K) NAVAL UNIT NCC
// COMPLETE JAVASCRIPT
// =========================================================


// =========================================================
// LOADER
// =========================================================

window.addEventListener("load", () => {

  const loader = document.getElementById("loader");

  if (!loader) return;

  setTimeout(() => {

    loader.style.opacity = "0";
    loader.style.pointerEvents = "none";

    setTimeout(() => {
      loader.style.display = "none";
    }, 700);

  }, 1000);

});


// =========================================================
// MOBILE MENU
// =========================================================

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {

  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show-menu");
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {

    link.addEventListener("click", () => {
      navLinks.classList.remove("show-menu");
    });

  });

}


// =========================================================
// SCROLL REVEAL
// =========================================================

const reveals = document.querySelectorAll(
  ".section, .card, .leader-card, .activity-card, " +
  ".timeline-item, .batch-card, .rank-card, " +
  ".cadet-card, .gallery-grid img"
);

function revealOnScroll() {

  reveals.forEach((element) => {

    const top =
      element.getBoundingClientRect().top;

    if (top < window.innerHeight - 80) {

      element.classList.add("show");

    }

  });

}

window.addEventListener(
  "scroll",
  revealOnScroll,
  { passive: true }
);

revealOnScroll();


// =========================================================
// ACTIVE NAVIGATION
// =========================================================

const sections =
  document.querySelectorAll("section");

const navItems =
  document.querySelectorAll(".nav-links a");

function updateActiveNavigation() {

  let current = "";

  sections.forEach((section) => {

    const top =
      section.offsetTop - 150;

    const height =
      section.offsetHeight;

    if (
      window.scrollY >= top &&
      window.scrollY < top + height
    ) {

      current =
        section.getAttribute("id");

    }

  });

  navItems.forEach((link) => {

    link.classList.remove("active");

    if (
      link.getAttribute("href") ===
      `#${current}`
    ) {

      link.classList.add("active");

    }

  });

}

window.addEventListener(
  "scroll",
  updateActiveNavigation,
  { passive: true }
);

updateActiveNavigation();


// =========================================================
// COUNTER ANIMATION
// =========================================================

const counters =
  document.querySelectorAll(".card h2");

counters.forEach((counter) => {

  const text =
    counter.innerText.trim();

  /*
    Only pure numbers animate.

    50       → animates
    2024     → animates
    9(K)     → stays normal
    19 Jan   → stays normal
  */

  if (!isNaN(text) && text !== "") {

    const target =
      parseInt(text, 10);

    counter.innerText = "0";

    function updateCounter() {

      const current =
        parseInt(counter.innerText, 10);

      if (current < target) {

        const increment =
          Math.max(
            1,
            Math.ceil(target / 40)
          );

        counter.innerText =
          Math.min(
            current + increment,
            target
          );

        setTimeout(
          updateCounter,
          40
        );

      } else {

        counter.innerText =
          target;

      }

    }

    updateCounter();

  }

});


// =========================================================
// BACK TO TOP BUTTON
// =========================================================

const topBtn =
  document.createElement("button");

topBtn.innerHTML = "↑";

topBtn.className =
  "top-btn";

topBtn.setAttribute(
  "aria-label",
  "Back to top"
);

document.body.appendChild(topBtn);

function updateTopButton() {

  if (window.scrollY > 400) {

    topBtn.classList.add(
      "show-top"
    );

  } else {

    topBtn.classList.remove(
      "show-top"
    );

  }

}

window.addEventListener(
  "scroll",
  updateTopButton,
  { passive: true }
);

topBtn.addEventListener(
  "click",
  () => {

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }
);


// =========================================================
// FLOATING STARS
// =========================================================

const hero =
  document.querySelector(".hero");

if (hero) {

  for (let i = 0; i < 40; i++) {

    const star =
      document.createElement("span");

    star.classList.add("star");

    star.style.left =
      Math.random() * 100 + "%";

    star.style.top =
      Math.random() * 100 + "%";

    star.style.animationDuration =
      Math.random() * 4 + 2 + "s";

    star.style.animationDelay =
      Math.random() * 3 + "s";

    hero.appendChild(star);

  }

}


// =========================================================
// HERO SLIDESHOW
// =========================================================

const heroImages = [

  "assets/images/hero1.jpg",

  "assets/images/hero2.jpg",

  "assets/images/hero3.jpg"

];

let currentHero = 0;

function changeHero() {

  if (!hero) return;

  hero.style.background =
    `
    linear-gradient(
      rgba(0,0,0,0.55),
      rgba(0,0,0,0.55)
    ),
    url("${heroImages[currentHero]}")
    `;

  hero.style.backgroundSize =
    "cover";

  hero.style.backgroundPosition =
    "center";

  currentHero++;

  if (
    currentHero >=
    heroImages.length
  ) {

    currentHero = 0;

  }

}

changeHero();

setInterval(
  changeHero,
  5000
);


// =========================================================
// GALLERY LIGHTBOX
// =========================================================

const galleryImages = document.querySelectorAll(".gallery-grid img");

let activeLightbox = null;

function openLightbox(image) {

  // Prevent duplicate lightboxes
  if (activeLightbox) return;

  const overlay = document.createElement("div");

  overlay.className = "gallery-lightbox";

  overlay.innerHTML = `
    <button
      class="lightbox-close"
      type="button"
      aria-label="Close image"
    >
      ×
    </button>

    <div class="lightbox-content">
      <img
        src="${image.currentSrc || image.src}"
        alt="${image.alt || "Gallery image"}"
      >
    </div>
  `;

  document.body.appendChild(overlay);

  activeLightbox = overlay;

  // Prevent background scrolling while lightbox is open
  document.body.classList.add("lightbox-open");

  // Small delay for opening animation
  requestAnimationFrame(() => {
    overlay.classList.add("lightbox-visible");
  });

  const closeButton =
    overlay.querySelector(".lightbox-close");

  function closeLightbox() {

    if (!activeLightbox) return;

    overlay.classList.remove("lightbox-visible");

    setTimeout(() => {

      if (overlay.parentNode) {
        overlay.remove();
      }

      activeLightbox = null;

      // VERY IMPORTANT:
      // Restore normal page scrolling
      document.body.classList.remove("lightbox-open");

    }, 250);
  }

  closeButton.addEventListener("click", (event) => {

    event.preventDefault();
    event.stopPropagation();

    closeLightbox();

  });

  // Click outside image closes lightbox
  overlay.addEventListener("click", (event) => {

    if (
      event.target === overlay ||
      event.target.classList.contains("lightbox-content")
    ) {

      closeLightbox();

    }

  });

  // ESC closes lightbox
  function escapeHandler(event) {

    if (event.key === "Escape") {

      closeLightbox();

      document.removeEventListener(
        "keydown",
        escapeHandler
      );

    }

  }

  document.addEventListener(
    "keydown",
    escapeHandler
  );

}

galleryImages.forEach((image) => {

  image.addEventListener("click", (event) => {

    event.preventDefault();

    openLightbox(image);

  });

});


// =========================================================
// PREMIUM NCC CURSOR
// =========================================================

(() => {

  // Disable custom cursor on touch devices
  if (
    window.matchMedia("(pointer: coarse)").matches
  ) {
    return;
  }

  const cursor =
    document.createElement("div");

  cursor.className =
    "premium-cursor";

  const core =
    document.createElement("div");

  core.className =
    "cursor-core";

  const ring =
    document.createElement("div");

  ring.className =
    "cursor-ring";

  cursor.appendChild(ring);
  cursor.appendChild(core);

  document.body.appendChild(cursor);


  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  let currentX = mouseX;
  let currentY = mouseY;


  // Mouse position
  window.addEventListener(
    "mousemove",
    (event) => {

      mouseX = event.clientX;
      mouseY = event.clientY;

    },
    { passive: true }
  );


  // Smooth cursor movement
  function animateCursor() {

    currentX +=
      (mouseX - currentX) * 0.20;

    currentY +=
      (mouseY - currentY) * 0.20;

    cursor.style.left =
      currentX + "px";

    cursor.style.top =
      currentY + "px";

    requestAnimationFrame(
      animateCursor
    );

  }

  animateCursor();


  // Interactive elements
  const interactiveElements =
    document.querySelectorAll(`
      a,
      button,
      .btn,
      .card,
      .leader-card,
      .activity-card,
      .batch-card,
      .rank-card,
      .cadet-card,
      .gallery-grid img,
      input,
      textarea,
      select
    `);


  interactiveElements.forEach((element) => {

    element.addEventListener(
      "mouseenter",
      () => {

        cursor.classList.add(
          "cursor-hover"
        );

      }
    );


    element.addEventListener(
      "mouseleave",
      () => {

        cursor.classList.remove(
          "cursor-hover"
        );

      }
    );

  });


  // Hide cursor outside website
  document.addEventListener(
    "mouseleave",
    () => {

      cursor.classList.add(
        "cursor-hidden"
      );

    }
  );


  document.addEventListener(
    "mouseenter",
    () => {

      cursor.classList.remove(
        "cursor-hidden"
      );

    }
  );

})();
