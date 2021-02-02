const navSlide = () => {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-links li');

  burger.addEventListener('click', () => {
    //toggle nav
    nav.classList.toggle('nav-active');

    //animate links
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = '';
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + .2}s`
      }
    })
    //burger animation
    burger.classList.toggle('toggle');
  });
}

const dropDownToggle = () => {
  const dropDownBtns = document.querySelectorAll('.dropdown-toggle');
  const dropDownMenus = document.querySelectorAll('.dropdown-menu');

  dropDownBtns.forEach((dropDownBtn, index) => {
    dropDownBtn.addEventListener("click", () => {
      dropDownMenus[index].classList.toggle('active');
    });
  });
}

dropDownToggle();
navSlide();
