const container = document.getElementById("scroll-container");
let current = 0;
let target = 0;
const ease = 0.1;

const setBodyHeight = () => {
  document.body.style.height = container.scrollHeight + "px";
};

let resizeTimeout;

function debouncedSetBodyHeight() {
  clearTimeout(resizeTimeout);

  resizeTimeout = setTimeout(() => {
    setBodyHeight();
  }, 300);
}

setBodyHeight();

// images load after initial render,
// so scrollHeight is wrong at first
// we observe size changes to fix it
const resizeObserver = new ResizeObserver(debouncedSetBodyHeight);
resizeObserver.observe(container);

window.addEventListener("resize", debouncedSetBodyHeight);

window.addEventListener("scroll", () => {
  target = window.scrollY;
});

const nav = document.querySelector("nav");
const navHeight = nav.scrollHeight;

const animate = () => {
  current += (target - current) * ease;
  container.style.transform = `translateY(${-current}px)`;

  current > navHeight
    ? nav.classList.add("scrolled")
    : nav.classList.remove("scrolled");

  requestAnimationFrame(animate);
};

animate();
