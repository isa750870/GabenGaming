document.getElementById('burger-menu').addEventListener('click', function() {
  document.getElementById('menu').classList.toggle('open');
  document.getElementById('burger-menu').classList.toggle('open');
});
const backToTopButton = document.getElementById('backToTop');
window.onscroll = function() {
    const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        backToTopButton.style.opacity = Math.min((scrollTop - 100) / 50, 1);
        backToTopButton.style.transform = `translateY(0)`;
        backToTopButton.style.pointerEvents = 'auto';
    } else {
        backToTopButton.style.opacity = 0;
        backToTopButton.style.transform = `translateY(20px)`;
        backToTopButton.style.pointerEvents = 'none';
    }
}

backToTopButton.addEventListener('click', () => {
    smoothScrollTo(0, 500);
});

function smoothScrollTo(targetY, duration) {
    const startY = window.scrollY;
    const distance = targetY - startY;
    let startTime = null;
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const easeInOutQuad = progress => {
            return progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
        };

        const scrollY = startY + distance * easeInOutQuad(progress);

        window.scrollTo(0, scrollY);

        if (progress < 1) {
            requestAnimationFrame(animation);
        }
    }
    requestAnimationFrame(animation);
}

document.getElementById('newsletterForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const emailInput = document.getElementById('emailInput');
    const email = emailInput.value;
    const messageDiv = document.getElementById('message');
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (email.match(emailPattern)) {
        alert('Успешная подписка на новостную рассылку');
        emailInput.value = '';
    } else {
        alert('Введите корректную почту');
    }
});

const prevButton = document.querySelector('.carousel-control-prev');
const nextButton = document.querySelector('.carousel-control-next');
const carouselInner = document.querySelector('.carousel-inner');
const items = document.querySelectorAll('.carousel-item');
let currentIndex = 0;

function updateCarousel() {
  const offset = -currentIndex * 100;
  carouselInner.style.transform = `translateX(${offset}%)`;
}

// Переход к предыдущему слайду
prevButton.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = items.length - 1;
  }
  updateCarousel();
});

// Переход к следующему слайду
nextButton.addEventListener('click', () => {
  if (currentIndex < items.length - 1) {
    currentIndex++;
  } else {
    currentIndex = 0;
  }
  updateCarousel();
});

// Автопрокрутка (можно отключить, если не нужно)
setInterval(() => {
  if (currentIndex < items.length - 1) {
    currentIndex++;
  } else {
    currentIndex = 0;
  }
  updateCarousel();
}, 5000); // каждые 5 секунд