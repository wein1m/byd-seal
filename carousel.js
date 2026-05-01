document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.querySelector(".carousel-wrapper");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  const items = document.querySelectorAll(".carousel-item");
  const itemWidth = items[1].offsetLeft - items[0].offsetLeft;

  const delay = 3000;

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

  const autoMove = () => {
    const maxItems = items.length;
    let currSlide = Math.round(wrapper.scrollLeft / itemWidth + 2); // 2 cuz we start counting on the 2nd slide

    wrapper.scrollBy({ left: itemWidth, behavior: "smooth" });

    if (currSlide == maxItems) {
      setTimeout(() => wrapper.scrollTo({ left: 0, behavior: "smooth" }), delay);
    }
  };

  window.setInterval(autoMove, delay);

  validate();
});
