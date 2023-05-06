for (let e of document.querySelectorAll('input[type="range"].slider-progress')) {
    e.style.setProperty('--value', e.value);
    e.style.setProperty('--min', e.min == '' ? '0' : e.min);
    e.style.setProperty('--max', e.max == '' ? '100' : e.max);
    e.addEventListener('input', () => e.style.setProperty('--value', e.value));
}
// достаем значения из input
const timeInpute = document.querySelector('.time_input');
const budgetInput = document.querySelector('.budget_input');

const timeValue = document.querySelector('.time_value');
const budgetValue = document.querySelector('.budget_value');

// стандартные значения
const time = 5;
const budget = 0;

timeInpute.value = time;
budgetInput.value = budget;
timeValue.textContent = time;

timeInpute.addEventListener('input', () => {
  timeValue.textContent = timeInpute.value;
});

budgetInput.addEventListener('input', () => {
  budgetValue.textContent = budgetInput.value;
});

// categories 
const categories = document.querySelectorAll('.categories_item');
const categoriesWindow = document.querySelector('.categorie');
const blackout = document.querySelector('.blackout');

// событие клика на категории 
categories.forEach((item, index) => {
  item.addEventListener('click', (e) => {
    openCategoriesMenu(index);
    showSubcategories(index);
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
  HideSubcategories();
}

// двигает меню
function moveCategoriesMenu(len) {
  categoriesWindow.style.transform = `translateY(${len}vh)`;
}

// включает и выключает blackout
function toggleBlackout() {
  blackout.classList.toggle('active')
}

function showSubcategories(index) { 
  let items = document.querySelectorAll(`.categorie_item[data="${index}"]`);
  for(let item of items) {
    item.style.display = 'flex';
  }
}
function HideSubcategories() {
  let items = document.querySelectorAll(`.categorie_item`);
  for(let item of items) {
    item.style.display = 'none';
  }
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
      len = 0;
    }
});


const subcategories = document.querySelectorAll('.categorie_item');
let selectSubCategories = {};

// событие клика на подкатегории 
subcategories.forEach((item, index) => {
  item.addEventListener('click', (e) => {
    selectSubcategory(index);  
    toggleItemParent();
  })
});

// активация подкатегории
// если елемент был выбран, то деактивируем иначе активируем 
// добавляем выбранный элемент в объект по индексу
function selectSubcategory(index) {
  if (subcategories[index].classList.contains('active_item')) {
    subcategories[index].classList.remove('active_item'); 
    delete selectSubCategories[index];
    toggleItem()
  } else {
    subcategories[index].classList.add('active_item');  
    selectSubCategories[index] = subcategories[index];
    toggleItem()
  }
}

// если есть выбранные элементы, добавляем класс родителя
function toggleItemParent() {
  if (Object.keys(selectSubCategories).length != 0) {
    document.querySelector('.categoriesList').style.display = 'block'; 
    activeApplybtn(); 
  } else {
    document.querySelector('.categoriesList').style.display = 'none';
    unActiveApplybtn();
  }
}

// обновляем html при изменении массива
function toggleItem() {
  // создаем контенер для подкатегорий
  let container = document.createElement('ul');
  container.className = "categoriesList_items";

  for(let item in selectSubCategories) {
    let liItem = document.createElement('li');
    liItem.className = "categoriesList_item";
    liItem.innerHTML = `
      <img class="categoriesList_item__img" src="${selectSubCategories[item].querySelector('img').src}" alt="" width="60px" height="60px">
    `
    container.append(liItem);

    liItem.addEventListener('click', () => {
      delete selectSubCategories[item];
      subcategories[item].classList.remove('active_item'); 
      toggleItemParent()
      toggleItem()
    })
  }
  document.querySelector('.categoriesList').innerHTML = `
  <h2 class="categoriesList_title">Ваш выбор:</h2>
  `;
  document.querySelector('.categoriesList').append(container);
}

function activeApplybtn() {
  let btn = document.querySelector('.apply_btn');
  btn.style.background = '#0C79FE';
  btn.addEventListener('click', applyBtn)
}
function unActiveApplybtn() {
  let btn = document.querySelector('.apply_btn');
  btn.style.background = '#AFAFAF';
  btn.removeEventListener('click', applyBtn)
}

function applyBtn() {
  console.log('ok')
}

// закрытие окна с фильтром
document.querySelector('.close_btn').addEventListener('click', () => {
  document.querySelector('.filter_screen').classList.remove('active_filter');
  document.querySelector('.map').classList.add('active_filter');
});

// открытие окна с фильтром
document.querySelector('.burger').addEventListener('click', () => {
  document.querySelector('.filter_screen').classList.add('active_filter');
  document.querySelector('.map').classList.remove('active_filter');
});


/// map
const map = new ymaps3.YMap(document.getElementById('YMapsID'), {
  location: {
    center: [37.64, 55.76],
    zoom: 10
  }
});







