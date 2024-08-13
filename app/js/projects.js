const activeLinkClass = 'tabs-nav__link--active';
const activeTabClass = 'swiper-slide-active';

function setTabs({ containerId, activeLinkClass, activeTabClass, swiper }) {
  const container = document.querySelector(`#${containerId}`);

  if (!container) return;

  const buttons = container.querySelectorAll(`[data-tab]`);

  if (swiper) {
    swiper.on('realIndexChange', ({ realIndex }) => {
      buttons.forEach((button) => button.classList.remove(activeLinkClass));
      buttons[realIndex].classList.add(activeLinkClass);
    });

    buttons.forEach((button) => {
      button.addEventListener('click', (e) => {
        const index = +e.target.dataset.tab;

        swiper.slideToLoop(index);
      });
    });
  } else {
    const tabs = container.querySelectorAll(`[data-tab-content]`);

    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        if (button.classList.contains(activeLinkClass)) return;

        buttons.forEach((button) => button.classList.remove(activeLinkClass));
        tabs.forEach((button) => button.classList.remove(activeTabClass));
        button.classList.add(activeLinkClass);

        const tab = container.querySelector(`#tab-${button.dataset.tab}`);

        tab.classList.add(activeTabClass);
      });
    });
  }
}
