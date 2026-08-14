// ==============================
// LOADER
// ==============================
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  if (!loader) return;

  setTimeout(() => {
    loader.style.display = "none";
  }, 1000);
});

// ==============================
// MOBILE MENU
// ==============================
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

// ==============================
// SCROLL REVEAL
// ==============================
const reveals = document.querySelectorAll(
  ".section, .card, .leader-card, .activity-card, .gallery-grid img, .timeline-item"
);

function revealOnScroll() {
  reveals.forEach((element) => {
    const top = element.getBoundingClientRect().top;

    if (top < window.innerHeight - 80) {
      element.classList.add("show");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

// ==============================
// ACTIVE NAVIGATION
// ==============================
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const top = section.offsetTop - 150;
    const height = section.offsetHeight;

    if (window.scrollY >= top &&
        window.scrollY < top + height) {
      current = section.id;
    }
  });

  navItems.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// ==============================
// COUNTER ANIMATION
// ==============================
const counters = document.querySelectorAll(".card h2");

counters.forEach((counter) => {
  const text = counter.innerText;

  if (!isNaN(text)) {
    counter.innerText = "0";

    function updateCounter() {
      const current = +counter.innerText;
      const target = +text;

      if (current < target) {
        counter.innerText =
          Math.ceil(current + target / 40);

        setTimeout(updateCounter, 40);
      } else {
        counter.innerText = target;
      }
    }

    updateCounter();
  }
});

// ==============================
// BACK TO TOP BUTTON
// ==============================
const topBtn = document.createElement("button");
topBtn.innerHTML = "↑";
topBtn.className = "top-btn";

document.body.appendChild(topBtn);

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    topBtn.classList.add("show-top");
  } else {
    topBtn.classList.remove("show-top");
  }
});

topBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// ==============================
// FLOATING STARS
// ==============================
const hero = document.querySelector(".hero");

if (hero) {
  for (let i = 0; i < 40; i++) {
    const star = document.createElement("span");

    star.classList.add("star");

    star.style.left =
      Math.random() * 100 + "%";

    star.style.top =
      Math.random() * 100 + "%";

    star.style.animationDuration =
      Math.random() * 4 + 2 + "s";

    hero.appendChild(star);
  }
}

// ==============================
// HERO SLIDESHOW
// ==============================
const heroImages = [
  "assets/images/hero1.jpg",
  "assets/images/hero2.jpg",
  "assets/images/hero3.jpg"
];

let currentHero = 0;

function changeHero() {
  if (!hero) return;

  hero.style.background =
    `linear-gradient(
      rgba(0,0,0,0.55),
      rgba(0,0,0,0.55)
    ),
    url('${heroImages[currentHero]}')`;

  hero.style.backgroundSize = "cover";
  hero.style.backgroundPosition = "center";

  currentHero++;

  if (currentHero >= heroImages.length) {
    currentHero = 0;
  }
}

changeHero();
setInterval(changeHero, 5000);

// ==============================
// GALLERY LIGHTBOX
// ==============================
const galleryImages =
  document.querySelectorAll(
    ".gallery-grid img"
  );

galleryImages.forEach((image) => {
  image.addEventListener("click", () => {
    const overlay =
      document.createElement("div");

    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.background =
      "rgba(0,0,0,0.92)";
    overlay.style.display = "flex";
    overlay.style.justifyContent =
      "center";
    overlay.style.alignItems =
      "center";
    overlay.style.zIndex = "99999";
    overlay.style.cursor = "pointer";

    const img =
      document.createElement("img");

    img.src = image.src;
    img.style.maxWidth = "90%";
    img.style.maxHeight = "90%";
    img.style.borderRadius = "20px";
    img.style.boxShadow =
      "0 0 40px rgba(0,0,0,0.6)";

    overlay.appendChild(img);

    overlay.addEventListener(
      "click",
      () => {
        overlay.remove();
      }
    );

    document.body.appendChild(
      overlay
    );
  });
});
// =========================================================
// CUSTOM GOLD CURSOR
// =========================================================

const cursorDot = document.createElement("div");
cursorDot.className = "cursor-dot";

const cursorRing = document.createElement("div");
cursorRing.className = "cursor-ring";

document.body.appendChild(cursorDot);
document.body.appendChild(cursorRing);

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let ringX = mouseX;
let ringY = mouseY;

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursorDot.style.left = mouseX + "px";
    cursorDot.style.top = mouseY + "px";
});

function animateCursor() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;

    cursorRing.style.left = ringX + "px";
    cursorRing.style.top = ringY + "px";

    requestAnimationFrame(animateCursor);
}

animateCursor();


// Cursor grows when hovering over clickable elements

const cursorTargets = document.querySelectorAll(
    "a, button, .btn, .card, .leader-card, .activity-card, .cadet-card, .gallery-grid img"
);

cursorTargets.forEach((element) => {

    element.addEventListener("mouseenter", () => {
        cursorRing.classList.add("hover");
    });

    element.addEventListener("mouseleave", () => {
        cursorRing.classList.remove("hover");
    });

});
