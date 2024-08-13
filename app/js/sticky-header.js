const header = document.querySelector('.header');
const banner = document.querySelector('.banner');
const footer = document.querySelector('footer .logo__wrapper');

let isBannerObserved = false;
let isBannerObserverStarted = false;
let isFooterIntersectedOnce = false;

const bannerObserver = new IntersectionObserver(
  ([{ isIntersecting, target: banner }]) => {
    if (isIntersecting && header.classList.contains('header--fixed')) {
      header.classList.remove('header--fixed');
      banner.classList.remove('banner--adaptive');
      header.classList.add('header--unfixed');

      if (isBannerObserverStarted) {
        setTimeout(() => headerObserver.observe(header), 750);
      } else {
        headerObserver.observe(header);
        isBannerObserverStarted = true;
      }
    }
  },
  { threshold: 0.85 }
);

const headerObserver = new IntersectionObserver(
  ([{ isIntersecting, target: header }], observer) => {
    if (!isIntersecting) {
      banner.classList.add('banner--adaptive');
      header.classList.add('header--fixed');
      header.classList.remove('header--unfixed');

      if (!isBannerObserved) {
        bannerObserver.observe(banner);
        isBannerObserved = true;
      }

      observer.unobserve(header);
    }
  }
);

headerObserver.observe(header);

const footerObserver = new IntersectionObserver(([{ isIntersecting }]) => {
  if (isIntersecting) {
    isFooterIntersectedOnce = true;
    header.classList.remove('header--faded-in');
    header.classList.add('header--faded-out');
  } else {
    if (isFooterIntersectedOnce) {
      header.classList.remove('header--faded-out');
      header.classList.add('header--faded-in');
    }
  }
});

footerObserver.observe(footer);
