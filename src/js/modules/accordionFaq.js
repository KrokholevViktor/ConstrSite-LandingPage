function accordionFaq (triggersSelector, descrSelector) {
    const triggers = document.querySelectorAll(triggersSelector),
          blocks = document.querySelectorAll(descrSelector);

    triggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            if (!this.classList.contains('questions__accordion__item_active')) {
                this.classList.add('questions__accordion__item_active');
                
            } else {
                this.classList.remove('questions__accordion__item_active');
                
            }
        })
    })

};

export default accordionFaq;