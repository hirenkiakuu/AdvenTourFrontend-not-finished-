ymaps.ready(init);
function init(){
    var myMap = new ymaps.Map("map", {
        center: [55.76, 37.64],
        zoom: 7,
        controls: ["geolocationControl"]
    });
}

const filterButton = document.querySelector('.filter_btn');

filterButton.addEventListener('click', (e) => {
    var element = document.querySelector('.filter');
    element.classList.remove('filter');
    element.classList.add('active_filter');
});

