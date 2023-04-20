const categoriesItems = document.querySelectorAll('.box_item')
const categoriesArray = []

categoriesItems.forEach(element => {
    element.addEventListener('click', () => {
        const item = element.querySelector('.item_box_name').textContent;
        categoriesArray.push(item)
        console.log(categoriesArray)
    })
});

const rangeInput = document.querySelectorAll('.range_input')
let currentPrice = 0
let currentTime = 0

rangeInput.forEach(element => {
    element.addEventListener('input', () => {
        currentPrice = element.value;
        console.log(currentPrice);
    })
});

rangeInput.forEach(element => {
    element.addEventListener('input', () => {
        currentTime = element.value;
        console.log(currentTime);
    })
});