const moveSlide = (sliderTouch, offset, btnNext, btnPrev) => {
    const slider = document.querySelector(sliderTouch);
    let isDragging = false;
    let startPosition = 0;
    let currentTranslate = 0;
    // let prevTranslate = 0;

    slider.addEventListener('mousedown', (e) => {
        console.log(`Offset при нажатии ${offset}`);
        isDragging = true; //При нажатии на слайдер флаг в true
        startPosition = e.clientX; //начальная позиция
        slider.style.cursor = 'grabbing';
        slider.style.transition = `0s all`;
    });

    slider.addEventListener('mousemove', (e) => {
        if (isDragging) { //проверка нажата мышка или нет
            let currentPosition = e.clientX; //текущая позиция
            // currentTranslate = prevTranslate + currentPosition - startPosition; //рассчитываем текущее смещение мышки
            console.log(`Offset при перемещении ${offset}`);
            currentTranslate = currentPosition - startPosition; //рассчитываем текущее смещение мышки
            console.log(`текущая позиция ${currentPosition}`);
            updateSliderPosition();
        } 
        
    });

    slider.addEventListener('mouseup', () => {
        isDragging = false;
        // prevTranslate = currentTranslate;
        slider.style.cursor = 'grab';
        slider.style.transform = `translateX(-${offset}px) `;
        // startPosition = 0;
        if (currentTranslate < -100) {
            btnNext.click();
            // prevTranslate = 0;
            // startPosition = offset;
        } else if (currentTranslate > 100) {
            btnPrev.click();
        }
        
    });

    slider.addEventListener('mouseleave', () => {
    isDragging = false;
    slider.style.cursor = 'grab';
    console.log(`Offset мышка покинула слайдер ${offset}`);
    });

    function updateSliderPosition() {
            slider.style.transform = `translateX(${-offset + currentTranslate}px)`;
            // requestAnimationFrame(updateSliderPosition);
            console.log(`текущее перемещение ${currentTranslate}`);
            // console.log(prevTranslate);
            console.log(`стартовая позиция ${startPosition}`);
    }

    // moveSlide(sliderTouch, offset, btnNext);
}

export default moveSlide;