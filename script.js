document.querySelectorAll('.nav a, .button[href^="#"]').forEach(link => {
  link.addEventListener('click', () => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// ==== Слайдер картинок в карточках товара ====
document.querySelectorAll('.work-image.slider').forEach(slider => {
  const raw = slider.getAttribute('data-images') || '';
  const images = raw.split(',').map(s => s.trim()).filter(Boolean);
  if (images.length < 2) return; // если фото одно - слайдер не нужен

  let current = 0;
  const img = slider.querySelector('img');

  // Стрелки
  const prevBtn = document.createElement('button');
  prevBtn.className = 'slider-arrow slider-prev';
  prevBtn.setAttribute('aria-label', 'Предыдущее фото');
  prevBtn.innerHTML = '&#10094;';

  const nextBtn = document.createElement('button');
  nextBtn.className = 'slider-arrow slider-next';
  nextBtn.setAttribute('aria-label', 'Следующее фото');
  nextBtn.innerHTML = '&#10095;';

  // Точки-индикаторы
  const dots = document.createElement('div');
  dots.className = 'slider-dots';
  images.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goTo(i));
    dots.appendChild(dot);
  });

  function goTo(index) {
    current = (index + images.length) % images.length;
    img.src = images[current];
    dots.querySelectorAll('.slider-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  prevBtn.addEventListener('click', (e) => { e.stopPropagation(); goTo(current - 1); });
  nextBtn.addEventListener('click', (e) => { e.stopPropagation(); goTo(current + 1); });

  slider.appendChild(prevBtn);
  slider.appendChild(nextBtn);
  slider.appendChild(dots);

  // Свайп на телефоне
  let touchStartX = 0;
  slider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });
  slider.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 40) {
      if (diff < 0) goTo(current + 1); else goTo(current - 1);
    }
  });
});
