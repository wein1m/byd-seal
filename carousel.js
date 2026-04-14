document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.querySelector(".carousel-wrapper");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  const item = document.querySelector(".carousel-item");
  const itemWidth = item.clientWidth;

  let isDragging = false;
  let lastX = 0;

  const validate = () => {
    const maxScroll = wrapper.scrollWidth - wrapper.clientWidth;
    const currScroll = wrapper.scrollLeft;

    // the '10' is for tolerance (cuz the scroll pos may not be exact)
    if (currScroll <= 10) {
      prevBtn.style.opacity = "0.5";
    } else if (currScroll >= maxScroll - 10) {
      nextBtn.style.opacity = "0.5";
    } else {
      prevBtn.style.opacity = "1";
      nextBtn.style.opacity = "1";
    }
  };

  wrapper.addEventListener("mouseup", () => {
    isDragging = false;
    wrapper.style.cursor = "grab";
  });

  wrapper.addEventListener("mouseleave", () => {
    isDragging = false;
    wrapper.style.cursor = "grab";
  });

  wrapper.addEventListener("mousedown", (e) => {
    isDragging = true;
    lastX = e.pageX;
    wrapper.style.cursor = "grabbing";
  });

  wrapper.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    const moveX = e.pageX - lastX;
    lastX = e.pageX;

    wrapper.scrollBy({ left: -moveX, behavior: "smooth" });
  });

  prevBtn.addEventListener("click", () => {
    wrapper.scrollBy({ left: -itemWidth, behavior: "smooth" });
  });

  nextBtn.addEventListener("click", () => {
    wrapper.scrollBy({ left: itemWidth, behavior: "smooth" });
  });

  wrapper.addEventListener("scroll", validate);

  validate();
});
