const burger = (menuSelector, burgerSelector, menuLinks, modalBtn) => {
    const menuElem = document.querySelector(menuSelector),
          burgerElem = document.querySelector(burgerSelector),
          phone = document.querySelector('.header__info_e_p .header__info_phone '),
          links = document.querySelectorAll(menuLinks),
          modalButton = document.querySelector(modalBtn),
          scrollbarWidth = getScrollbarWidth();
    
    menuElem.style.display = 'none';

    function closeMenu() {
        menuElem.classList.add('fadeOut');
        menuElem.classList.remove('fadeIn');
        setTimeout(() => {
            menuElem.style.display = 'none';
        }, 300);
    }

    links.forEach(link => {
        link.addEventListener('click', () => {
            burgerElem.click();
        })
    });



    modalButton.addEventListener('click', () => {
        burgerElem.click();
        document.body.style.overflow = "hidden";
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i
        .test(navigator.userAgent)) {

        } else {
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        }
        
    });


    burgerElem.addEventListener('click', () => {
        
        burgerElem.classList.toggle('active');
        if (burgerElem.classList.contains('active')) {
            phone.style.visibility = 'hidden';
            document.body.style.overflow = 'hidden';
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i
            .test(navigator.userAgent)) {
    
            } else {
                document.body.style.paddingRight = `${scrollbarWidth}px`;
            }
        } else {
            phone.style.visibility = 'visible';
            document.body.style.overflow = '';
            document.body.style.paddingRight = '0px';
        }
        
        if (menuElem.style.display == 'none' && window.innerWidth < 993) {
            menuElem.style.display = '';
            menuElem.classList.add('fadeIn');
            menuElem.classList.remove('fadeOut');
            
        } else {
            closeMenu();
        }
    });

    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            console.log(window.innerWidth);
            if (burgerElem.classList.contains('active') && window.innerWidth > 993) {
                phone.style.visibility = 'visible';
                document.body.style.overflow = '';
                document.body.style.paddingRight = '0px';
                burgerElem.classList.toggle('active');
            }
        }, 10);
        
    })

    let flagOrientation = false;

    window.addEventListener('orientationchange', () => {
        flagOrientation = true;
    })

    window.addEventListener('resize', () => {
        if (window.screen.availWidth > 992) {
            menuElem.style.display = 'none';
        }
        if (menuElem.classList.contains('fadeIn') && flagOrientation) {
            flagOrientation = false;
        } else if (menuElem.classList.contains('fadeIn')) {
                burgerElem.click();
                // menuElem.classList.remove('fadeIn')
        }
        
    });

    // Получаем ширину скролла
    function getScrollbarWidth() {
        const outer = document.createElement('div');
        outer.style.visibility = 'hidden';
        outer.style.overflow = 'scroll';
        document.body.appendChild(outer);
        const inner = document.createElement('div');
        outer.appendChild(inner);
        const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
        outer.parentNode.removeChild(outer);
        return scrollbarWidth;
    }

};

export default burger;