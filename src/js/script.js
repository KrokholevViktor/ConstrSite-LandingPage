import formSlider from "./modules/formSlider";
import examplesSlider from "./modules/examplesSlider";
import reviewsSlider from "./modules/reviewsSlider";
import accordionFaq from "./modules/accordionFaq";
import forms from "./modules/forms";
import modals from "./modules/modals";
import changeFormSliderSate from "./modules/changeFormSliderSate";
import mask from "./modules/mask";
import burger from "./modules/burger";
import advantagesSlider from "./modules/advantagesSlider";
import fixedHeader from "./modules/fixedHeader";
import lazyLoading from "./modules/lazyLoading";



document.addEventListener('DOMContentLoaded', function () {
    "use strict";

    lazyLoading();

    let formSliderState = {};
    forms(formSliderState);

    try {
        formSlider('.form-slider__navigation_prev .button_black', '.form-slider__navigation_next .button_black', '.form-slider__item', '.form-slider__wrapper', '.form-slider__inner');
        changeFormSliderSate(formSliderState);
    } catch (error) {
        console.log(error);
    }

    try {
        reviewsSlider('.reviews__navigation .navigation_prev .button_black', '.reviews__navigation .navigation_next .button_black', '.reviews__slide', '.reviews__wrapper', '.reviews__inner'); // init slider for reviews
    } catch (error) {
        console.log(error);
    }

    try {
        advantagesSlider('.advantages__navigation .navigation_prev .button_black', '.advantages__navigation .navigation_next .button_black', '.advantages__slide', '.advantages__slider', '.advantages__inner');
    } catch (error) {
        console.log(error);
    }

    try {
        examplesSlider('.examples__navigation .navigation_prev .button_black', '.examples__navigation .navigation_next .button_black', '.examples__slide', '.examples__wrapper', '.examples__inner' );
    } catch (error) {
        console.log(error);
    }
    
    try {
        // Функция, которая будет вызываться при изменении в examples_inner
        function onExamplesSlideChange(mutationsList, observer) {
            console.log("Количество examples_slide изменилось!");
            console.log("Новое количество элементов:", mutationsList[0].target.children.length);
            examplesSlider('.examples__navigation .navigation_prev .button_black', '.examples__navigation .navigation_next .button_black', '.examples__slide', '.examples__wrapper', '.examples__inner' );
            }
        
            // Целевой элемент, за которым будем следить
            const examplesInner = document.querySelector('.examples__inner');
            // Создаем MutationObserver
            const observer = new MutationObserver(onExamplesSlideChange);
        
            // Настройка MutationObserver
            const config = { childList: true };
        
            // Начинаем наблюдение за изменениями
            observer.observe(examplesInner, config);
    } catch (error) {
        console.log('ошибка MutationObserver');
        console.log(error);
    }

    try {
        accordionFaq('.questions__accordion__item', '.questions__accordion__descr');
    } catch (error) {
        console.log(error);
    }
    
    try {
        modals();
    } catch (error) {
        console.log(error);
    }
    try {
        mask('[name="phone"]');
    } catch (error) {
        console.log(error);
    }
    try {
        burger('.header__menu_burger', '.burger', '.header__menu_burger .header_link', '.header__menu_burger--scroll .modal-btn');
    } catch (error) {
        console.log(error);
    }
    try {
        fixedHeader();
    } catch (error) {
        console.log(error);
    }

    window.addEventListener('scroll', checkScrollY)

    function checkScrollY() {
        if (scrollY > 7000) {
            // Создаем элемент <script> для подключения API Яндекс.Карт
            var yandexMapScript = document.createElement("script");
            yandexMapScript.src =
                "https://api-maps.yandex.ru/2.1/?apikey=1997deae-7f1f-4cdb-bbee-84f7aafcaf39&lang=ru_RU";
            yandexMapScript.async = true;
    
            // Событие onload для скрипта API Яндекс.Карт
            yandexMapScript.onload = function () {
                // В этом месте API Яндекс.Карт гарантированно загружен и доступен
            
                // Ваша функция yandexmap() здесь
                function yandexmap() {
                    let address_map = 'Karl-Ludwig-Busse-Straße 2/4 14707 Detmold'; // document.querySelector('.address_map').textContent;
                    let address_descr = 'construction@company.com'; // document.querySelector('.address_descr').textContent;
                    
                    let apiKey = '1997deae-7f1f-4cdb-bbee-84f7aafcaf39';
                    let geocodeUrl = "https://geocode-maps.yandex.ru/1.x/?apikey=" + apiKey + "&format=json&geocode=" + encodeURIComponent(address_map);
                    let latitude = 52.288503;
                    let longitude = 104.289536;
        
                    const xhr = new XMLHttpRequest();
                    xhr.open("GET", geocodeUrl, true);
                    xhr.onload = function() {
                    if (xhr.status === 200) {
                        let data = JSON.parse(xhr.responseText);
                        // Доступ к координатам из ответа
                        let coordinates = data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ');
                        latitude = coordinates[1]; // Широта
                        longitude = coordinates[0]; // Долгота
                        let center = [latitude, longitude];
        
                        ymaps.ready(init);
                        function init(){
                        // Создание карты.
                        let map = new ymaps.Map("map", {
                            center: center,
                            zoom: 14
                        });
                        let placemark = new ymaps.Placemark(center, {
                            balloonContentHeader: address_map,
                            balloonContentBody: address_descr
                            }, {});
        
                        map.controls.remove('geolocationControl'); // удаляем геолокацию
                        map.controls.remove('searchControl'); // удаляем поиск
                        map.controls.remove('trafficControl'); // удаляем контроль трафика
                        map.controls.remove('typeSelector'); // удаляем тип
                        map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
                        // map.controls.remove('zoomControl'); // удаляем контрол зуммирования
                        map.controls.remove('rulerControl'); // удаляем контрол правил
                        map.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)
        
                        map.geoObjects.add(placemark);
                    }
        
                    } else {
                        console.log("Ошибка при выполнении запроса на геокодирование.");
                    }
                    };
                    xhr.send();
                    
                }
            
                // Вызов функции yandexmap() после успешной загрузки API Яндекс.Карт
                yandexmap();
            };
    
            // Находим элемент <script.js> в DOM
            var scriptJsElement = document.querySelector("script[src*='script.js']");
    
            // Вставляем элемент <script> перед скриптом script.js
            if (scriptJsElement) {
                scriptJsElement.parentNode.insertBefore(yandexMapScript, scriptJsElement);
            } else {
                // Если элемент <script.js> не найден, добавляем скрипт в конец <body>
                document.body.appendChild(yandexMapScript);
            }
            window.removeEventListener('scroll', checkScrollY)
        }
    }

    

   
});

