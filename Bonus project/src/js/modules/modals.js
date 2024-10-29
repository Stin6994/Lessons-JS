const modals = () => {
    function bindModal(triggerSelector, modalSelector, closeSelector) { //общая функция для работы с модальными окнами (открытие по клику на триггер, закрытие по клику на крестик или подложку)
        
        const trigger = document.querySelectorAll(triggerSelector);
        const modal = document.querySelector(modalSelector);
        const close = document.querySelector(closeSelector);
        
        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) { // если таргет будет кнопкой, то это условие ничего не изменит, а вот если ссылкой, то при нажатии будет обновление страницы,
                    // чтобы этого избежать отменяем стандартное поведение браузера
                    e.preventDefault();
                }
    
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; //пропадает скролл
                /* document.body.classList.add('modal-open'); */
            });
        });

        close.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
            /* document.body.classList.remove('modal-open'); */
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) { // кликаем мимо окна - закрывается. ===modal - странно, как будто нажимаем на окно, но это особенность конкретной верстки
                modal.style.display = 'none';
                document.body.style.overflow = '';
                /* document.body.classList.remove('modal-open'); */
            }
        });


    }

    function showModalByTime(selector, time) {
        setTimeout(() => {
            document.querySelector(selector).style.display = 'block';
            document.body.style.overflow = 'hidden';
        }, time);
    }

/*     const callEngineerBtn = document.querySelector('.popup_engineer_btn'); //Это триггер
    const modalEngineer = document.querySelector('.popup_engineer'); // это модальное окно
    const modalEngineerClose = document.querySelector('.popup_engineer .popup_close'); // это крестик */

    bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
    bindModal('.phone_link', '.popup', '.popup .popup_close');
    showModalByTime('.popup', 5000);
};

export default modals;