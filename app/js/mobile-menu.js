const menuButton = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".menu");
const mobileMenuItems = mobileMenu.querySelectorAll(".menu__item a");

if (menuButton && mobileMenu) {
  menuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("visible");
  });
}

if (mobileMenuItems.length) {
  mobileMenuItems.forEach((item) => {
    item.addEventListener("click", () => {
      if (mobileMenu.classList.contains("visible")) {
        mobileMenu.classList.remove("visible");
      }
    });
  });
}
