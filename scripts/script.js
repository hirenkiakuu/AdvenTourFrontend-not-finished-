for (let e of document.querySelectorAll('input[type="range"].slider-progress')) {
    e.style.setProperty('--value', e.value);
    e.style.setProperty('--min', e.min == '' ? '0' : e.min);
    e.style.setProperty('--max', e.max == '' ? '100' : e.max);
    e.addEventListener('input', () => e.style.setProperty('--value', e.value));
}

// categories 

const categories = document.querySelectorAll('.categories_item');
const categoriesWindow = document.querySelector('.categorie');
const blackout = document.querySelector('.blackout');

// событие клика на категории 
categories.forEach((item, index) => {
  item.addEventListener('click', (e) => {
    openCategoriesMenu(index);
  });
});

// обработка клика на blackout
blackout.addEventListener('click', (e) => {
  closeCategoriesMenu();
})

// открывает меню подкатегорий
function openCategoriesMenu() {
  categoriesWindow.style.transform = 'translateY(0vh)';
  document.querySelector('body').style.overflow = 'hidden';
  blackout.classList.add('active');
}

// закрывает меню подкатегорий
function closeCategoriesMenu() {
  categoriesWindow.style.transform = 'translateY(100vh)';
  document.querySelector('body').style.overflow = 'scroll';
  blackout.classList.remove('active');
}

// двигает меню
function moveCategoriesMenu(len) {
  categoriesWindow.style.transform = `translateY(${len}vh)`;
}

// включает и выключает blackout
function toggleBlackout() {
  blackout.classList.toggle('active')
}

let event = null;
let len = 0;

categoriesWindow.addEventListener("touchstart", function (e) {
    event = e;
});
categoriesWindow.addEventListener("touchmove", function (e) {
    if (event) {
        len = (e.touches[0].pageY - event.touches[0].pageY) * 0.118;
        if (len >= 0 && len <= 100) {
          categoriesWindow.style.transform = `translateY(${len}vh)`;
          categoriesWindow.style.transition = 'none';
        }
    }
});
categoriesWindow.addEventListener("touchend", function (e) {
    event = null;
    categoriesWindow.style.transition = 'all ease-in-out 0.2s';
    
    if (len < 20) {
      openCategoriesMenu();
    } else {
      closeCategoriesMenu();
    }
});

//блокируем обновление страницы при скроле вниз
// var lastY = 1;
// document.addEventListener("touchmove", function (event) {
//   var lastS = document.documentElement.scrollTop;
//   if(lastS == 0 && (lastY-event.touches[0].clientY) < 0 && event.cancelable){
//       event.preventDefault(); 
//       event.stopPropagation();
//   }
//   lastY = event.touches[0].clientY;
// },{passive: false});

