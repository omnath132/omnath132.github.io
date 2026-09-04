/* ============================================================
   Circuit Portfolio — scroll-driven "power on"
   ============================================================ */

// current year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// ---- Projects light up as the rail's power wave reaches their node ----
const projects = [...document.querySelectorAll(".project")];
const railFill = document.querySelector(".rail-fill");
const projectsMain = document.querySelector("main");
const progressBar = document.querySelector(".progress span");

let ticking = false;

function onScroll() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const innerH = window.innerHeight;

  // top bar: overall page scroll
  if (progressBar) {
    const docHeight = document.documentElement.scrollHeight - innerH;
    const pageProgress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
    progressBar.style.width = (pageProgress * 100).toFixed(2) + "%";
  }

  if (projectsMain) {
    const mainTop = projectsMain.offsetTop;
    const mainHeight = projectsMain.offsetHeight;
    // leading edge of the power wave, in document coordinates (the rail glow's tip)
    const waveY = scrollTop + innerH * 0.5;

    // rail glow fills 0→100% as the wave travels down through the projects
    if (railFill) {
      const railProgress = Math.max(0, Math.min((waveY - mainTop) / mainHeight, 1));
      railFill.style.height = (railProgress * 100).toFixed(2) + "%";
    }

    // a project (and its dot) powers on once the wave reaches the dot's position
    projects.forEach((p) => {
      const node = p.querySelector(".node");
      const nodeY = mainTop + p.offsetTop + (node ? node.offsetTop : p.offsetHeight / 2);
      p.classList.toggle("powered", waveY >= nodeY);
    });
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

// ---- Lightbox: click a photo to view it full-size (scrollable) ----
const lb = document.getElementById("lightbox");
const lbImg = lb.querySelector(".lb-img");
const lbScroll = lb.querySelector(".lb-scroll");
const lbPrev = lb.querySelector(".lb-prev");
const lbNext = lb.querySelector(".lb-next");
let lbGroup = [];
let lbIndex = 0;

function groupFor(card) {
  const thumbs = card.querySelectorAll(".gallery .thumb img");
  if (thumbs.length) {
    return [...thumbs].map((i) => ({ src: i.src, alt: i.alt }));
  }
  const m = card.querySelector(".main-img");
  return [{ src: m.src, alt: m.alt }];
}
function showLb(i) {
  lbIndex = (i + lbGroup.length) % lbGroup.length;
  const it = lbGroup[lbIndex];
  lbImg.src = it.src;
  lbImg.alt = it.alt;
  lbScroll.scrollTo(0, 0);
  const multi = lbGroup.length > 1;
  lbPrev.hidden = !multi;
  lbNext.hidden = !multi;
}
function openLb(card, startSrc) {
  lbGroup = groupFor(card);
  const idx = Math.max(0, lbGroup.findIndex((x) => x.src === startSrc));
  showLb(idx);
  lb.hidden = false;
  document.body.style.overflow = "hidden";
}
function closeLb() {
  lb.hidden = true;
  lbImg.src = "";
  document.body.style.overflow = "";
}

document.querySelectorAll(".card-media").forEach((media) => {
  media.addEventListener("click", () => {
    const card = media.closest(".card");
    openLb(card, media.querySelector(".main-img").src);
  });
});
lb.querySelector(".lb-close").addEventListener("click", closeLb);
lbPrev.addEventListener("click", () => showLb(lbIndex - 1));
lbNext.addEventListener("click", () => showLb(lbIndex + 1));
lb.addEventListener("click", (e) => {
  if (e.target === lb || e.target === lbScroll) closeLb();
});
document.addEventListener("keydown", (e) => {
  if (lb.hidden) return;
  if (e.key === "Escape") closeLb();
  else if (e.key === "ArrowLeft") showLb(lbIndex - 1);
  else if (e.key === "ArrowRight") showLb(lbIndex + 1);
});
