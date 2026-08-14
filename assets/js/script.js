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
  ".timeline-item, .batch-card, .rank-card, .gallery-grid img"
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
     Only animate pure numbers.

     This means:
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

const galleryImages =
  document.querySelectorAll(
    ".gallery-grid img"
  );


function openLightbox(image) {

  const overlay =
    document.createElement("div");


  overlay.className =
    "gallery-lightbox";


  overlay.innerHTML = `

    <button
      class="lightbox-close"
      aria-label="Close image"
    >
      ×
    </button>

    <img
      src="${image.src}"
      alt="${image.alt || "Gallery image"}"
    >

  `;


  document.body.appendChild(
    overlay
  );


  document.body.style.overflow =
    "hidden";


  const closeButton =
    overlay.querySelector(
      ".lightbox-close"
    );


  function closeLightbox() {

    overlay.remove();

    document.body.style.overflow =
      "";

  }


  closeButton.addEventListener(
    "click",
    (event) => {

      event.stopPropagation();

      closeLightbox();

    }
  );


  overlay.addEventListener(
    "click",
    (event) => {

      if (
        event.target === overlay
      ) {

        closeLightbox();

      }

    }
  );


  document.addEventListener(
    "keydown",
    function escapeHandler(event) {

      if (event.key === "Escape") {

        closeLightbox();

        document.removeEventListener(
          "keydown",
          escapeHandler
        );

      }

    }
  );

}


galleryImages.forEach(
  (image) => {

    image.addEventListener(
      "click",
      () => {

        openLightbox(image);

      }
    );

  }
);


// =========================================================
// FUTURISTIC NCC CURSOR
// =========================================================

/*
   The custom cursor is only enabled
   on devices with a real mouse.

   Phones/tablets automatically use
   their normal touch interaction.
*/


const hasMouse =
  window.matchMedia(
    "(hover: hover) and (pointer: fine)"
  ).matches;


if (hasMouse) {


  // -------------------------------------------------------
  // Cursor elements
  // -------------------------------------------------------

  const cursorDot =
    document.createElement("div");

  cursorDot.className =
    "cursor-dot";


  const cursorRing =
    document.createElement("div");

  cursorRing.className =
    "cursor-ring";


  document.body.appendChild(
    cursorDot
  );

  document.body.appendChild(
    cursorRing
  );


  // -------------------------------------------------------
  // Mouse position
  // -------------------------------------------------------

  let mouseX =
    window.innerWidth / 2;

  let mouseY =
    window.innerHeight / 2;


  let ringX = mouseX;
  let ringY = mouseY;


  // -------------------------------------------------------
  // Mouse movement
  // -------------------------------------------------------

  document.addEventListener(
    "mousemove",
    (event) => {

      mouseX =
        event.clientX;

      mouseY =
        event.clientY;


      cursorDot.style.left =
        mouseX + "px";

      cursorDot.style.top =
        mouseY + "px";


      /*
         Small trail particles.

         They appear only sometimes,
         so the effect stays elegant.
      */

      if (
        Math.random() > 0.72
      ) {

        const trail =
          document.createElement(
            "div"
          );


        trail.className =
          "cursor-trail";


        trail.style.left =
          mouseX + "px";


        trail.style.top =
          mouseY + "px";


        document.body.appendChild(
          trail
        );


        setTimeout(() => {

          trail.remove();

        }, 700);

      }

    }
  );


  // -------------------------------------------------------
  // Smooth cursor ring
  // -------------------------------------------------------

  function animateCursor() {

    ringX +=
      (mouseX - ringX) *
      0.12;


    ringY +=
      (mouseY - ringY) *
      0.12;


    cursorRing.style.left =
      ringX + "px";


    cursorRing.style.top =
      ringY + "px";


    requestAnimationFrame(
      animateCursor
    );

  }


  animateCursor();


  // -------------------------------------------------------
  // Cursor hover targets
  // -------------------------------------------------------

  function setupCursorTargets() {

    const cursorTargets =
      document.querySelectorAll(
        `
        a,
        button,
        .btn,
        .card,
        .leader-card,
        .activity-card,
        .timeline-item,
        .batch-card,
        .rank-card,
        .cadet-card,
        .gallery-grid img
        `
      );


    cursorTargets.forEach(
      (element) => {

        element.addEventListener(
          "mouseenter",
          () => {

            cursorRing.classList.add(
              "hover"
            );

          }
        );


        element.addEventListener(
          "mouseleave",
          () => {

            cursorRing.classList.remove(
              "hover"
            );

          }
        );

      }
    );

  }


  setupCursorTargets();


  // -------------------------------------------------------
  // Hide cursor while over lightbox
  // -------------------------------------------------------

  document.addEventListener(
    "click",
    () => {

      const lightbox =
        document.querySelector(
          ".gallery-lightbox"
        );


      if (lightbox) {

        cursorRing.classList.remove(
          "hover"
        );

      }

    }
  );

}


// =========================================================
// END OF SCRIPT
// =========================================================
