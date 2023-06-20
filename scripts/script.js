// let a = [
//   {
//       "id": 50,
//       "name": "Погибшим в афганской войне Чёрный тюльпан",
//       "latitude": 56.843202,
//       "longitude": 60.617393,
//       "price": 0,
//       "time": 15,
//       "category": "Памятники",
//       "description": "Мемориал уральским воинам-интернационалистам, погибшим в Афганистане, и воинам, погибшим в Чечне. Находится на площади Советской Армии в квадрате улиц Луначарского - Первомайская - Мамина-Сибиряка - Шарташская."
//   },
//   {
//       "id": 36,
//       "name": "Плотинка",
//       "latitude": 56.839513,
//       "longitude": 60.612413,
//       "price": 0,
//       "time": 40,
//       "category": "Мосты",
//       "description": "Плотина, расположенная на реке Исеть в Историческом сквере Екатеринбурга. Построена в 1723 году, впоследствии многократно перестраивалась. Жители города называют её «Плотинка». Традиционное место массовых народных гуляний и праздников."
//   },
//   {
//       "id": 19,
//       "name": "Владимир Высоцкий и Марина Влади",
//       "latitude": 56.837102,
//       "longitude": 60.615808,
//       "price": 0,
//       "time": 15,
//       "category": "Скульптуры",
//       "description": "Памятник, установленный в г. Екатеринбурге рядом с главным входом в торгово-развлекательный центр «Антей», жанр скульптуры - паблик-арт"
//   }
// ]



const categoriesItems = {
  categories: [],
  price: 0,
  time: 300,
  lat: '',
  lon: ''
}

function checkCategoriesArray(item) {
  const index = categoriesItems.categories.indexOf(item);
  if (index !== -1) {
    categoriesItems.categories.splice(index, 1);
  } else {
    categoriesItems.categories.push(item);
  }
  
  console.log(categoriesItems)
}

navigator.geolocation.getCurrentPosition(function(position) {
  var latitude = position.coords.latitude; // Широта
  var longitude = position.coords.longitude; // Долгота

  categoriesItems.lat = latitude;
  categoriesItems.lon = longitude;
});


// управление слайдерами
for (let e of document.querySelectorAll('input[type="range"].slider-progress')) {
    e.style.setProperty('--value', e.value);
    e.style.setProperty('--min', e.min == '' ? '0' : e.min);
    e.style.setProperty('--max', e.max == '' ? '100' : e.max);
    e.addEventListener('input', () => e.style.setProperty('--value', e.value));
}
// получаем значения из input слайдеров
const timeInpute = document.querySelector('.time_input');
const budgetInput = document.querySelector('.budget_input');

// находим заголовки времени и бюджета
const timeLabel = document.querySelector('.time_value');
const budgetLabel = document.querySelector('.budget_value');

// стандартные значения времени и бюджета
const time = 5;
const budget = 0;

// выставляем начальные значения времени и бюджета на label
timeInpute.value = time;
budgetInput.value = budget;

// выставляем начальное значание времени input
timeLabel.textContent = time;

// обрабатываем изменнение времени input
timeInpute.addEventListener('input', () => {
  timeLabel.textContent = timeInpute.value;
  categoriesItems.time = timeInpute.value * 60;
});

// обрабатываем изменнение бюджета input
budgetInput.addEventListener('input', () => {
  budgetLabel.textContent = budgetInput.value;
  categoriesItems.price = budgetInput.value;
});

// достаем все категории
const categories = document.querySelectorAll('.categories_item');
const categoriesWindow = document.querySelector('.categorie');

// событие клика на категории 
categories.forEach((item, index) => {
  item.addEventListener('click', (e) => {
    openCategoriesMenu(index);
    showSubcategories(index);
  });
});


const blackout = document.querySelector('.blackout');

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

// показваем подкатегории под нужным индексом
function showSubcategories(index) { 
  let items = document.querySelectorAll(`.categorie_item[data="${index}"]`);

  for(let item of items) {
    item.style.display = 'flex';
  }
}

// скрываем все категории
function HideSubcategories() {
  let items = document.querySelectorAll(`.categorie_item`);
  for(let item of items) {
    item.style.display = 'none';
  }
}


slideMenu(categoriesWindow, openCategoriesMenu, closeCategoriesMenu)

function slideMenu(slideWindow, openWindow, closeWindow) {
  let event = null;
  let len = 0;

  slideWindow.addEventListener("touchstart", function (e) {
    event = e;
  });

  slideWindow.addEventListener("touchmove", function (e) {
    if (event) {
        len = (e.touches[0].pageY - event.touches[0].pageY) * 0.118;

        if (len >= 0 && len <= 100) {
          slideWindow.style.transform = `translateY(${len}vh)`;
          slideWindow.style.transition = 'none';
        }
    }
  });

  slideWindow.addEventListener("touchend", function (e) {

    event = null;
    slideWindow.style.transition = 'all ease-in-out 0.2s';
    
    if (len < 20) {
      openWindow();
    } else {
      closeWindow();
      len = 0;
    }
});
}

const subcategories = document.querySelectorAll('.categorie_item');
let selectSubCategories = {};

// событие клика на подкатегории 
subcategories.forEach((item, index) => {
  item.addEventListener('click', (e) => {
    // Добавялем элементы в объект для отправки
    let textSubcategory = item.querySelector('.categorie_item__title').textContent;
    checkCategoriesArray(textSubcategory);

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
      // Добавялем элементы в объект для отправки
      let textSubcategory = selectSubCategories[item].querySelector('.categorie_item__title').textContent;
      checkCategoriesArray(textSubcategory);

      delete selectSubCategories[item];
      subcategories[item].classList.remove('active_item'); 
      toggleItemParent()
      toggleItem()
    });
    
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
  // если нет координат пользователя, то запрашиваем координаты, если есть, то делаем запрос на сервер
  if (categoriesItems.lat.length == 0 || categoriesItems.lat.length == 0) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var latitude = position.coords.latitude; // Широта
      var longitude = position.coords.longitude; // Долгота
    
      categoriesItems.lat = latitude;
      categoriesItems.lon = longitude;
    });
  } else {
    document.querySelector('.filter_screen').classList.remove('active_filter');
    document.querySelector('.map').classList.add('active_filter');
    document.querySelector('.paramPath').classList.add('active_filter');
  
    console.log(JSON.stringify(categoriesItems))
  
    fetch('http://127.0.0.1:3000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;'
      },
      body: JSON.stringify(categoriesItems),  
    })
    .then(res => { 
      console.log(res)
      ymaps.ready(init(res, categoriesItems.lat, categoriesItems.lon));
    })

    // ymaps.ready(init(a, categoriesItems.lat, categoriesItems.lon));
  }

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
function init(points, cordsPersonLat, cordsPersonLon) {
  // Создаем карту с добавленной на нее кнопкой.
  var map = new ymaps.Map('map', {
    center: [56.8519, 60.6122],
    zoom: 14,
    controls: ['geolocationControl']
});
  
  
// Создаем массив для хранения точек
var geoObjects = [];

// Добавляем точки на карту
for (var i = 0; i < points.length; i++) {
  var point = points[i];
  geoObjects[i] = new ymaps.Placemark([point.latitude, point.longitude], {
    balloonContent: point.name
  });

  geoObjects[i].events.add('click', function (e) {
    console.log('click');
  });
}

geoObjects.push(new ymaps.Placemark([cordsPersonLat, cordsPersonLon]))


// Создаем маршрут и добавляем его на карту
var route = new ymaps.multiRouter.MultiRoute({
  referencePoints: geoObjects.map(function (geoObject) {
    return geoObject.geometry.getCoordinates();
  }),
  params: {
    results: 1 // ограничиваем количество альтернативных маршрутов до одного
  }
}, {
  boundsAutoApply: true // автоматически подгоняем размер карты под маршрут
});



map.geoObjects.add(route); // добавляем маршрут на карту

geoObjects.forEach(function (geoObject) {
  // Привязка обработчика события 'click' к каждой метке
  geoObject.events.add("click", function (e) {
    // Код обработки клика на метке
    console.log("Клик на метке:", geoObject);
    // Дополнительные действия, которые вы хотите выполнить при клике на метке
  });

  map.geoObjects.add(geoObject);
});


}




let paramPath = document.querySelector('.paramPath');
// открывает меню подкатегорий
function openParamPath() {
  paramPath.style.transform = 'translateY(0vh)';
  document.querySelector('body').style.overflow = 'hidden';
  blackout.classList.add('active');
}

// закрывает меню подкатегорий
function closeParamPath() {
  paramPath.style.transform = 'translateY(80vh)';
  document.querySelector('body').style.overflow = 'scroll';
  blackout.classList.remove('active');
}

slideMenu(paramPath, openParamPath, closeParamPath)

document.querySelector('.paramPath_apply__btn').addEventListener('click', () => {
  document.querySelector('.filter_screen').classList.add('active_filter');
  document.querySelector('.map').classList.remove('active_filter');
  document.querySelector('.paramPath').classList.remove('active_filter');
  paramPath.style.transform = 'translateY(80vh)';
  document.querySelector('body').style.overflow = 'scroll';
  blackout.classList.remove('active');
})



