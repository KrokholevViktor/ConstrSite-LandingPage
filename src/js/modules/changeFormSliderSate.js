function changeFormSliderSate (state) {
    
    const buldingType = document.querySelectorAll('.item-1 .form-slider__item__card'),
          floorsNumber = document.querySelectorAll('.item-2 .form-slider__item__card'),
          material = document.querySelectorAll('.item-3 .form-slider__item__card'),
          soiltype = document.querySelectorAll('.item-4 .form-slider__item__card'),
          planSelect = document.querySelectorAll('.item-5 .form-slider__item__card-form_select');
          
    function bindActionToElems (elem, prop) {
        elem.forEach(item => {
            item.addEventListener('click', () => {
                if (item.firstElementChild === null) {
                    state[prop] = item.textContent.replace(/\s+/g,' ');
                } else {
                    state[prop] = item.firstElementChild.textContent.replace(/\s+/g,' ');
                }
            })
        });
    };

    bindActionToElems(buldingType, 'buldingType');
    bindActionToElems(floorsNumber, 'floorsNumber');
    bindActionToElems(material, 'material');
    bindActionToElems(soiltype, 'soiltype');
    bindActionToElems(planSelect, 'planSelect');
}; // при клике по картчоке в слайдере добавляет свойство prop в объект state с текстом заголовка картоки

export default changeFormSliderSate;