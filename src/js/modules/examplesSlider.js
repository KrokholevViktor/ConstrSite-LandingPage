function examplesSlider (prevBtn, nextBtn, slidesItems, sliderWrapper, sliderInner) {
        const slides = document.querySelectorAll(slidesItems),
        prev = document.querySelector(prevBtn),
        next = document.querySelector(nextBtn),
        slidesWrapper = document.querySelector(sliderWrapper),
        slidesInner = document.querySelector(sliderInner);

    let width = window.getComputedStyle(slidesWrapper).width;
    window.addEventListener('resize', () => {
        width = window.getComputedStyle(slidesWrapper).width;
        if (slideIndex > 1) {
            offset = +width.slice(0, width.length - 2) * (slideIndex - 1) + 10 * (slideIndex - 1); ///ошибка
            slidesInner.style.transform = `translateX(-${offset}px) `;
        }
    });

    let slideIndex = 1;
    let offset = 0;


    disabledNext();
    disabledPrev();

    function setSlideWidth() {
        slidesInner.style.width = `calc((100 * ${slides.length}%) + (10 * ${slides.length - 1}px))`;
        // slidesInner.style.width = 100 * slides.length + '%';
        slides.forEach(slide => {
            slide.style.width = width;
        });
    }
    setSlideWidth();


    window.addEventListener('resize', () => {
        setSlideWidth();
    });


    next.addEventListener('click', () => {
        if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2) + 10;
        }

        slidesInner.style.transform = `translateX(-${offset}px`;
        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++
        }

        // if (slides.length < 10) {
        //     current.textContent = `0${slideIndex}`;
        // } else {
        //     current.textContent = slideIndex;
        // }
        disabledNext();
        disabledPrev();
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = +width.slice(0, width.length - 2) * (slides.length - 1)
        } else {
            offset -= +width.slice(0, width.length - 2) + 10;
        }

        slidesInner.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--
        }

        disabledNext();
        disabledPrev();
    });

    function disabledPrev() {
        if (slideIndex == 1) {
            prev.disabled = true;
        } else {
            prev.disabled = false;
        }
    };

    function disabledNext() {
        if (slideIndex == slides.length) {
            next.disabled = true;
        } else {
            next.disabled = false;
        }
    };

        /////////////////////////функциональность перемещения слайдера
        let isDragging = false;
        let startPosition = 0;
        let currentTranslate = 0;
    
        function mousedown(e) {
            isDragging = true; 
            startPosition = e.clientX; 
            slidesInner.style.cursor = 'grabbing';
            slidesInner.style.transition = `0s all`;
        }
    
        function mousemove(e) {
            if (isDragging) { 
                let currentPosition = e.clientX;
                currentTranslate = currentPosition - startPosition;
                updateSliderPosition();
            }
        }
    
        function mouseup() {
            isDragging = false;
            slidesInner.style.cursor = 'grab';
            slidesInner.style.transition = `0.5s all`;
            
            if (currentTranslate < -100 && slideIndex != slides.length) {
                next.click();
            } else if (currentTranslate > 100 && slideIndex != 1) {
                prev.click();
            } else {
                slidesInner.style.transform = `translateX(-${offset}px) `;
            }
        }
    
        function updateSliderPosition() {
            slidesInner.style.transform = `translateX(${-offset + currentTranslate}px)`;
        }
    
    
        /////touch
        function touchstart(e) {
            isDragging = true; 
            startPosition = e.touches[0].clientX;; 
            slidesInner.style.transition = `0s all`;
        };
    
        function touchmove(e) {
            if (isDragging) { 
                let currentPosition = e.touches[0].clientX; 
                currentTranslate = currentPosition - startPosition;
                updateSliderPosition();
            }
        };
        ///touchEND
    
        slidesInner.addEventListener('mousedown', mousedown);
        slidesInner.addEventListener('touchstart', touchstart);
        slidesInner.addEventListener('mousemove', mousemove);
        slidesInner.addEventListener('touchmove', touchmove);
        slidesInner.addEventListener('mouseup', mouseup);
        slidesInner.addEventListener('touchend', mouseup);
        slidesInner.addEventListener('mouseleave', () => {
        isDragging = false;
        slidesInner.style.cursor = 'grab';
        });


};

export default examplesSlider;