const fixedHeader = () => {
    const body = document.querySelector('body');
    const header = document.querySelector('.header');
    const modalBtns = document.querySelectorAll('.header .modal-btn');
    const links = document.querySelectorAll('.header__menu .header_link');
    let prevScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    let isFixed = false;
    let scrollCounter = 0; // Добавляем счетчик прокрутки
    const scrollThreshold = 25; // Значение прокрутки, после которого удаляем класс
    let clickLinkFlag = false;
    let isScrolling = false;
    let timeout;

    function handleScroll() {
      // Устанавливаем флаг, что страница находится в состоянии прокрутки
      isScrolling = true;
       // Если таймер уже запущен, сбрасываем его
      clearTimeout(timeout);

      // Запускаем таймер с задержкой 200 мс
      timeout = setTimeout(function () {
        // Код, который выполнится, когда страница закончит прокручиваться
        // console.log('Страница закончила скроллиться');
        // Устанавливаем флаг, что страница закончила скроллиться
        isScrolling = false;
        clickLinkFlag = false;

      }, 200);

    }
    

    window.addEventListener('scroll', handleScroll);


    links.forEach(link => {
      link.addEventListener('click', () => {
        clickLinkFlag = true;
      })
    })
    

    function fixHeader() {
      // console.log(clickLinkFlag);
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > prevScrollPosition) {
        // Прямой скролл (scroll down)
        if (isFixed) {
          isFixed = false;
        }
      } else {
        // Обратный скролл (scroll up)

        if (!isFixed) {
          header.classList.add('fixed');
          body.style.marginTop = `${header.offsetHeight}px`;
          isFixed = true;
        }
      }

      // Увеличиваем счетчик прокрутки при скролле обратно
      if (!isFixed) {
        scrollCounter++;
      } else {
        scrollCounter = 0;
      }
      
      if (clickLinkFlag) {
        // Проверяем флаг нажатия на ссылку
       
      } else {
         // Удаляем класс, если счетчик достигнет определенного значения
          if (scrollCounter >= scrollThreshold) {
            header.classList.remove('fixed');
            body.style.marginTop = `0px`;
            isFixed = false;
            scrollCounter = 0; // Сбрасываем счетчик
            modalBtns.forEach(btn => {
              btn.addEventListener('click', () => {
                if (isFixed) {
                  header.classList.remove('fixed');
                  body.style.marginTop = `0px`;
                  isFixed = false;
                  scrollCounter = 0;
                }
              });
            })
          }

        // Код для установки класса "fixed" при скролле обратно
        // ... (остальная логика оставляется без изменений)
      }



     

     
      
      prevScrollPosition = scrollTop;
    }
      // Добавляем слушатель события прокрутки
      window.addEventListener('scroll', fixHeader);
};

export default fixedHeader;