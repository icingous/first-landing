new Swiper('[data-slider="banner"]', {
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

const swiper = new Swiper('.tabs-content', {
  loop: true,
  loopAddBlankSlides: false,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
  },
});

setTabs({
  containerId: 'projects-container',
  activeLinkClass: 'tabs-nav__link--active',
  activeTabClass: 'swiper-slide-active',
  swiper,
});
