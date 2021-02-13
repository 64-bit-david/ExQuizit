
const navSlide = () => {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav-links');
  const nestedDropBtns = document.querySelectorAll('.dropdown-toggle');
  const nestedDropMenus = document.querySelectorAll('.dropdown-menu-mobile');
  let isFirstDropDownActive = false;
  let isSecondDropDownActive = false;

  burger.addEventListener('click', () => {
    //toggle nested drop-downs
    if (isFirstDropDownActive && isSecondDropDownActive) {
      nestedDropMenus.forEach(dropMenu => {
        dropMenu.classList.remove('active');
      })
      isSecondDropDownActive = !isSecondDropDownActive;
      return;

    }
    //toggle nav at start
    if (!isFirstDropDownActive && !isSecondDropDownActive) {
      nav.classList.toggle('nav-active');
      burger.classList.toggle('toggle');
      isFirstDropDownActive = !isFirstDropDownActive;
      return;


    } else if (isFirstDropDownActive && !isSecondDropDownActive) {
      burger.classList.toggle('toggle');
      nav.classList.toggle('nav-active');
      isFirstDropDownActive = !isFirstDropDownActive;
      return;
    }
  });

  //toggle clicked sub dropdown
  nestedDropBtns.forEach((dropBtn, index) => {
    dropBtn.addEventListener('click', () => {
      if (isFirstDropDownActive) {
        isSecondDropDownActive = !isSecondDropDownActive;
        nestedDropMenus[index].classList.toggle('active')
      }
    });
  });
}


const dropDownToggle = () => {
  const dropDownBtns = document.querySelectorAll('.dropdown-toggle');
  const dropDownMenus = document.querySelectorAll('.dropdown-menu');
  //click on certain dropbtn will toggle corresponding d-menu
  dropDownBtns.forEach((dropDownBtn, index) => {
    dropDownBtn.addEventListener("click", () => {
      dropDownMenus[index].classList.toggle('active');
    });
  });
  //click anywhere off dbtn removes corresponding dmenu' active class
  document.addEventListener("click", (event) => {
    dropDownBtns.forEach((dbtn, index) => {
      const isClickedInside = dbtn.contains(event.target);
      if (!isClickedInside) {
        dropDownMenus[index].classList.remove('active');
      }
    })
  })
}


const cssManipulation = () => {
  const cardDescTexts = document.querySelectorAll('.quiz-card-desc p');
  const cardHeaderTexts = document.querySelectorAll('.quiz-card-title h2');


  let descCountTextArray = [];
  cardDescTexts.forEach((cht, index) => {
    descCountTextArray.push(cht.innerHTML.length)
  })
  descCountTextArray.forEach((item, index) => {
    if (item > 80) {
      cardDescTexts[index].classList.add('small-text');
    }
  })


  let headerTextCountArray = [];
  cardHeaderTexts.forEach((cht, index) => {
    headerTextCountArray.push(cht.innerHTML.length)
  })

  headerTextCountArray.forEach((item, index) => {
    if (item > 25) {
      cardHeaderTexts[index].classList.add('small-text');
    }
  })


}

cssManipulation();
dropDownToggle();
navSlide();
