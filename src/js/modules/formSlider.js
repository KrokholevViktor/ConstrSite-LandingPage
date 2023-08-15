/// slider


function  formSlider(prevBtn, nextBtn, slidesItems, sliderWrapper, sliderInner) {
        const slides = document.querySelectorAll(slidesItems),
        prev = document.querySelector(prevBtn),
        next = document.querySelector(nextBtn),
        navigationNext = document.querySelector('.form-slider__navigation_next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        counter = document.querySelector('.form-slider__counter'),
        slidesWrapper = document.querySelector(sliderWrapper),
        slidesInner = document.querySelector(sliderInner),
        // width = window.getComputedStyle(slidesWrapper).width,
        titles = document.querySelectorAll('.form-slider__title'),
        buttonForm = document.querySelector('.form-slider__navigation_btn-form');

        let width = window.getComputedStyle(slidesWrapper).width;

    // moveSlide('.form-slider__inner');


    window.addEventListener('resize', () => {
        width = window.getComputedStyle(slidesWrapper).width
    });

    let slideIndex = 1;
    let offset = 0;
    let slideCounter = 0;

    if (slides.length < 10) {
        total.textContent = `0${slides.length - 1}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length - 1;
        current.textContent = slideIndex;
    };

    function setSlideWidth() {
        // slidesInner.style.width = `calc((100 * ${slides.length}%) + (10 * ${slides.length - 1}px))`;
        slidesInner.style.width = `calc(100 * ${slides.length}%)`;
        slides.forEach(slide => {
            slide.style.width = width;
        });
    }
    setSlideWidth();

    window.addEventListener('resize', () => {
        
        setSlideWidth();
        offset = +width.slice(0, width.length - 2) * (slideIndex - 1);
        slidesInner.style.transition = `0s all`;
        slidesInner.style.transform = `translateX(-${offset}px)`;

    });

    hideElements();
    showTitle();
    hidePrev();
    // next.disabled = true;
    setTimeout(() => {
        next.click();
        prev.click();
    }, 10);

    function showTitle() {
        titles.forEach(title => title.style.display = 'none')
        titles[slideIndex - 1].style.display = '';
    };

    next.addEventListener('click', () => {
        slidesInner.style.transition = `0.5s all`;
        if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
            offset = 0;
        } else {
            // offset += +width.slice(0, width.length - 2) + 10;
            offset += +width.slice(0, width.length - 2);
        }

        slidesInner.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
        ////отключил для тестов слайдера disabled
        next.disabled = true; 
        ////отключил для тестов слайдера disabled
        hideElements();
        showTitle();
        hidePrev();
        slideCounter++
        checkSelecteditems(slideCounter);
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = +width.slice(0, width.length - 2) * (slides.length - 1);
        } else {
            // offset -= +width.slice(0, width.length - 2) + 10;
            offset -= +width.slice(0, width.length - 2);
        }

        slidesInner.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
        hideElements();
        showTitle();
        hidePrev();
        slideCounter--
        checkSelecteditems(slideCounter);
    });

    function hidePrev() {
        if ((slideIndex - 1) == 0) {
            prev.style.visibility = 'hidden';
        } else {
            prev.style.visibility = '';
        }
    };

    function hideElements() {
        if (slideIndex == slides.length) {
            counter.style.visibility = 'hidden';
            navigationNext.style.display = 'none';
            buttonForm.style.display = '';
        } else {
            counter.style.visibility = '';
            navigationNext.style.display = '';
            buttonForm.style.display = 'none';
        }
    };

    const slideSelect = () => {    

        slides.forEach(slide => {
            const images = slide.querySelectorAll('.form-slider__img'),
                cardAskSelects = slide.querySelectorAll('.form-slider__item__card-form_select');

            images.forEach(element => {

                element.addEventListener('click', () => {
                    
                    images.forEach(element => {
                        element.children[1].classList.remove('img-selected');
                        element.style.cssText = "background-color: #FFFFFF;"
                    });
                    element.children[1].classList.add('img-selected');
                    next.disabled = false;
                    if (element.children[1].classList.contains('img-selected')) {
                        element.style.cssText = "background-color: #D22043;"
                        images.forEach(element => {
                            element.children[1].previousElementSibling.style.cssText = "border-bottom: 1px solid $black-color;"
                        });
                        element.children[1].previousElementSibling.style.cssText = "background-color: transparent; border-bottom: none; color: white; ";
                    }
                });
            });

            cardAskSelects.forEach(select => {
                select.style.cssText = "background-color: #FFFFFF;"
                select.addEventListener('click', () => {
                    next.disabled = false;
                    cardAskSelects.forEach(select => {
                        select.classList.remove('ask-selected');
                        select.style.cssText = "background-color: #FFFFFF;"
                    });
                    select.classList.add('ask-selected');
                    select.style.cssText = "background-color: #D22043;"
                    
                });
            });

            //////////////////////////////////////// заменяет чёрточку в counter у form-slider
            const counterDivider = document.querySelector('.form-slider__counter_divider');

            if (window.innerWidth < 576 || window.screen.availWidth < 576) {
            
                counterDivider.textContent = '';
                images.forEach(element => {
                    element.children[1].style.display = 'none'
                });
            };

            window.addEventListener('resize', () => {
                if (window.innerWidth < 576 || window.screen.availWidth < 576) {
                    counterDivider.textContent = '';
                    images.forEach(element => {
                        element.children[1].style.display = 'none'
                    });
                } else {
                    counterDivider.textContent = '/';
                    images.forEach(element => {
                        element.children[1].style.display = ''
                    });
                }
            })
            /////////////////////////////////////////////
        });
    };
    slideSelect();


    // проверяет карточки в слайдере на наличие класса и включает или оключает кнопку next 
    function checkSelecteditems(i) {
        let slidesItems = slides[i].querySelectorAll('.form-slider__img');
        let askitems = slides[i].querySelectorAll('.form-slider__item__card-form_select');
        function chek(typeSlide) {
                for (i = 0; i < typeSlide.length; i++) {
                    try {
                        if (!(typeSlide[i].children[1].classList.contains('img-selected'))) {
                            // next.disabled = true;
                            ////отключил для тестов слайдера disabled
                        } else {
                            next.disabled = false;
                            return
                        }
                    } catch (error) {
                        if (!(typeSlide[i].classList.contains('ask-selected'))) {
                            next.disabled = true;
                            ////отключил для тестов слайдера disabled
                        } else {
                            next.disabled = false;
                            return
                        }
                    }
                };
        };
        chek(slidesItems);
        chek(askitems);
    };
}

export default formSlider;