const LOCATION = {center: [37.568496, 55.71372], zoom: 15};

const CUSTOMIZATION = [
    // Делаем прозрачными все геометрии строений
    {
        tags: {
            all: ['structure']
        },
        elements: 'geometry',
        stylers: [
            {
                opacity: 0
            }
        ]
    },
    // Меняем цвет подписей для всех POI и узлов сети общественного транспорта
    {
        tags: {
            any: ['poi', 'transit_location']
        },
        elements: 'label.text.fill',
        stylers: [
            {
                color: '#0000DD'
            }
        ]
    }
];