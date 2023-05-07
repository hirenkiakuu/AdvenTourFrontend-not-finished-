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
  document.querySelector('.map').classList.add('active_filter');
});


/// map
function init() {
  // Объявляем набор опорных точек и массив индексов транзитных точек.
  var referencePoints = [
          "Москва, Ленинский проспект",
          "Москва, Льва Толстого, 16",
          "Москва, Кремлевская набережная",
          "Москва, парк Сокольники"
      ],
      viaIndexes = [2];

  // Создаем мультимаршрут и настраиваем его внешний вид с помощью опций.
  var multiRoute = new ymaps.multiRouter.MultiRoute({
      referencePoints: referencePoints,
      params: {viaIndexes: viaIndexes}
  }, {
      // Внешний вид путевых точек.
      wayPointStartIconColor: "#333",
      wayPointStartIconFillColor: "#B3B3B3",
      // Задаем собственную картинку для последней путевой точки.
      wayPointFinishIconLayout: "default#image",
      wayPointFinishIconImageHref: "images/sokolniki.png",
      wayPointFinishIconImageSize: [30, 30],
      wayPointFinishIconImageOffset: [-15, -15],
      // Позволяет скрыть иконки путевых точек маршрута.
      // wayPointVisible:false,

      // Внешний вид транзитных точек.
      viaPointIconRadius: 7,
      viaPointIconFillColor: "#000088",
      viaPointActiveIconFillColor: "#E63E92",
      // Транзитные точки можно перетаскивать, при этом
      // маршрут будет перестраиваться.
      viaPointDraggable: true,
      // Позволяет скрыть иконки транзитных точек маршрута.
      // viaPointVisible:false,

      // Внешний вид точечных маркеров под путевыми точками.
      pinIconFillColor: "#000088",
      pinActiveIconFillColor: "#B3B3B3",
      // Позволяет скрыть точечные маркеры путевых точек.
      // pinVisible:false,

      // Внешний вид линии маршрута.
      routeStrokeWidth: 2,
      routeStrokeColor: "#000088",
      routeActiveStrokeWidth: 6,
      routeActiveStrokeColor: "#E63E92",

      // Внешний вид линии пешеходного маршрута.
      routeActivePedestrianSegmentStrokeStyle: "solid",
      routeActivePedestrianSegmentStrokeColor: "#00CDCD",

      // Автоматически устанавливать границы карты так, чтобы маршрут был виден целиком.
      boundsAutoApply: true
  });

  // Настраиваем внешний вид второй точки через прямой доступ к ней.
  customizeSecondPoint();

  // Создаем кнопки.
  var removePointsButton = new ymaps.control.Button({
          data: {content: "Удалить промежуточные точки"},
          options: {selectOnClick: true}
      }),
      routingModeButton = new ymaps.control.Button({
          data: {content: "Пешком"},
          options: {selectOnClick: true}
      });

  // Объявляем обработчики для кнопок.
  removePointsButton.events.add('select', function () {
      multiRoute.model.setReferencePoints([
          referencePoints[0],
          referencePoints[referencePoints.length - 1]
      ], []);
  });

  removePointsButton.events.add('deselect', function () {
      multiRoute.model.setReferencePoints(referencePoints, viaIndexes);
      // Т.к. вторая точка была удалена, нужно заново ее настроить.
      customizeSecondPoint();
  });

  routingModeButton.events.add('select', function () {
      multiRoute.model.setParams({routingMode: 'pedestrian'}, true);
  });

  routingModeButton.events.add('deselect', function () {
      multiRoute.model.setParams({routingMode: 'auto'}, true);
  });

  // Функция настройки внешнего вида второй точки.
  function customizeSecondPoint() {
      /**
       * Ждем, пока будут загружены данные мультимаршрута и созданы отображения путевых точек.
       * @see https://tech.yandex.ru/maps/doc/jsapi/2.1/ref/reference/multiRouter.MultiRouteModel-docpage/#event-requestsuccess
       */
      multiRoute.model.events.once("requestsuccess", function () {
          var yandexWayPoint = multiRoute.getWayPoints().get(1);
          // Создаем балун у метки второй точки.
          ymaps.geoObject.addon.balloon.get(yandexWayPoint);
          yandexWayPoint.options.set({
              preset: "islands#grayStretchyIcon",
              iconContentLayout: ymaps.templateLayoutFactory.createClass(
                  '<span style="color: red;">Я</span>ндекс'
              ),
              balloonContentLayout: ymaps.templateLayoutFactory.createClass(
                  '{{ properties.address|raw }}'
              )
          });
      });
  }

  // Создаем карту с добавленной на нее кнопкой.
  var myMap = new ymaps.Map('map', {
          center: [55.739625, 37.54120],
          zoom: 7,
          controls: [removePointsButton, routingModeButton]
      }, {
          buttonMaxWidth: 300
      });

  // Добавляем мультимаршрут на карту.
  myMap.geoObjects.add(multiRoute);
}

ymaps.ready(init);



