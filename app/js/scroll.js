const menu = document.querySelector('.menu');
const menuItems = [...menu.children];
const ACTIVE_ITEM_CLASS = 'menu__item--active';
const HOME = 'home';

const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      const { isIntersecting, target } = entry;

      if (!isIntersecting) continue;

      const activeItem = menuItems.find((item) =>
        item.classList.contains(ACTIVE_ITEM_CLASS)
      );

      if (target.className.match(/(header|banner)/)) {
        const menuItem = menuItems.find((item) => item.dataset.menu === HOME);

        if (menuItem) {
          if (activeItem && activeItem.dataset.menu !== HOME) {
            activeItem.classList.remove(ACTIVE_ITEM_CLASS);
          }

          menuItem.classList.add(ACTIVE_ITEM_CLASS);
        }
      } else if (
        ['reputation', 'experience', 'consultation'].includes(target.className)
      ) {
        if (activeItem) {
          activeItem.classList.remove(ACTIVE_ITEM_CLASS);
        }
      } else {
        if (activeItem) {
          activeItem.classList.remove(ACTIVE_ITEM_CLASS);
        }

        const menuItem = menuItems.find(
          (item) => item.dataset.menu === target.className
        );

        if (menuItem) {
          menuItem.classList.add(ACTIVE_ITEM_CLASS);
        }
      }

      break;
    }
  },
  { threshold: 0.5 }
);

[
  document.querySelector('.header'),
  document.querySelector('.banner'),
  document.querySelector('.reputation'),
  document.querySelector('.about-us'),
  document.querySelector('.projects'),
  document.querySelector('.services'),
  document.querySelector('.contact-us'),
  document.querySelector('.experience'),
  document.querySelector('.consultation'),
].forEach((item) => observer.observe(item));
