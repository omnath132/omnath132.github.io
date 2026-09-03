/* ============================================================
   Circuit Portfolio — scroll-driven "power on"
   ============================================================ */

// current year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// ---- Power on each project as it enters the viewport ----
const projects = document.querySelectorAll(".project");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("powered");
        // once powered, keep it on (stop observing)
        observer.unobserve(entry.target);
      }
    });
  },
  {
    // trigger when the card is ~25% up from the bottom of the screen
    rootMargin: "0px 0px -20% 0px",
    threshold: 0.2,
  }
);

projects.forEach((p) => observer.observe(p));

// ---- Rail glow + progress bar track scroll position ----
const railGlow = document.querySelector(".rail-glow");
const progressBar = document.querySelector(".progress span");

// Prime the glowing rail: set dash to the full path length so we can
// "draw" it by reducing the offset as the user scrolls.
if (railGlow) {
  const len = railGlow.getTotalLength();
  railGlow.style.strokeDasharray = len;
  railGlow.style.strokeDashoffset = len;
  railGlow.dataset.len = len;
}

let ticking = false;

function onScroll() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;

  if (railGlow) {
    const len = parseFloat(railGlow.dataset.len);
    railGlow.style.strokeDashoffset = len * (1 - progress);
  }
  if (progressBar) {
    progressBar.style.width = (progress * 100).toFixed(2) + "%";
  }
  ticking = false;
}

window.addEventListener(
  "scroll",
  () => {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  },
  { passive: true }
);

// run once on load
onScroll();

// ---- Thumbnail galleries: click a thumb to swap the main image ----
document.querySelectorAll(".gallery").forEach((gallery) => {
  const card = gallery.closest(".card");
  const mainImg = card.querySelector(".main-img");
  const thumbs = gallery.querySelectorAll(".thumb");

  thumbs.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      const img = thumb.querySelector("img");
      mainImg.src = img.src;
      mainImg.alt = img.alt;
      thumbs.forEach((t) => t.classList.remove("is-active"));
      thumb.classList.add("is-active");
    });
  });
});
