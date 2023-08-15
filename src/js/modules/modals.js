

const modals = () => {
    function bindModal(triggersSelector, modalSelctor, closeSelector) {
        const triggers = document.querySelectorAll(triggersSelector),
              modal = document.querySelector(modalSelctor),
              close = document.querySelector(closeSelector);

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


        triggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();
                }
                const scrollbarWidth = getScrollbarWidth();
                modal.style.display = "block";
                document.body.style.overflow = "hidden";
                document.body.style.paddingRight = `${scrollbarWidth}px`;

                close.addEventListener('click', () => {
                    modal.style.display = "none";
                    document.body.style.overflow = "";
                    document.body.style.paddingRight = '0px';
                });

                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        modal.style.display = "none";
                    document.body.style.overflow = "";
                    }
                })
            });
        })
    }

    bindModal('.modal-btn', '.modal', '.modal__close');

};

export default modals;