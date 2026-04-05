document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.querySelector('.carousel-wrapper');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    const item = document.querySelector('.carousel-item');
    const itemWidth = item.clientWidth;

    prevBtn.addEventListener('click', () => {
        wrapper.scrollBy({ left: -itemWidth, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
        wrapper.scrollBy({ left: itemWidth, behavior: 'smooth' });
    });
});
