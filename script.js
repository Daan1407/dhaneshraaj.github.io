document.getElementById("year").textContent = new Date().getFullYear();

const progress = document.getElementById("progress");
const updateProgress = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = (scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0) + "%";
};
window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".desktop-nav");
menuButton?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});
nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuButton?.setAttribute("aria-expanded", "false");
}));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.04, rootMargin: "0px 0px -25px 0px" });
document.querySelectorAll(".section, .intro-strip, .hero-copy, .hero-art, .experience-item, .project-card, .writing-card, .capability, .credential-list > div").forEach(el => {
  el.classList.add("reveal");
  observer.observe(el);
});


// Subtle pointer parallax for the portrait panel on larger screens.
(() => {
  const panel = document.querySelector(".hero-art");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  if (!panel || reduceMotion || !finePointer) return;

  panel.addEventListener("pointermove", (event) => {
    const rect = panel.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    panel.style.transform = `perspective(1000px) rotateY(${x * 2.2}deg) rotateX(${-y * 2.2}deg)`;
  });
  panel.addEventListener("pointerleave", () => {
    panel.style.transform = "";
  });
})();


// Stagger sibling cards and list rows for a clearer cinematic reveal.
document.querySelectorAll(".project-grid, .writing-grid, .capability-grid, .credential-list, .experience-list").forEach(group => {
  [...group.children].forEach((child, index) => {
    child.style.transitionDelay = `${Math.min(index * 110, 440)}ms`;
  });
});
