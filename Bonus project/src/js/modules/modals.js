const modals = () => {
    function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) { //общая функция для работы с модальными окнами (открытие по клику на триггер, закрытие по клику на крестик или подложку)
        
        const trigger = document.querySelectorAll(triggerSelector);
        const modal = document.querySelector(modalSelector);
        const close = document.querySelector(closeSelector);
        const windows = document.querySelectorAll("[data-modal]"),
        scroll = calcScroll();
        
        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) { // если таргет будет кнопкой, то это условие ничего не изменит, а вот если ссылкой, то при нажатии будет обновление страницы,
                    // чтобы этого избежать отменяем стандартное поведение браузера
                    e.preventDefault();
                }

                windows.forEach(item => { //когда закрывается модальное окно - закрываются все сразу, если их несколько открыто
                    item.style.display = 'none'; 
                });
    
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; //пропадает скролл
                /* document.body.classList.add('modal-open'); */
                document.body.style.marginRight = `${scroll}px`;
            });
        });

        close.addEventListener('click', () => {

         /*    windows.forEach(item => {
                item.style.display = 'none';
            }); */

            modal.style.display = 'none';
            document.body.style.overflow = '';
            document.body.style.marginRight = `0px`;
            /* document.body.classList.remove('modal-open'); */
        });

        modal.addEventListener('click', (e) => {

          /*   windows.forEach(item => {
                item.style.display = 'none'; 
            }); */

            if (e.target === modal && closeClickOverlay) { // кликаем мимо окна - закрывается. ===modal - странно, как будто нажимаем на окно, но это особенность конкретной верстки
                modal.style.display = 'none';
                document.body.style.overflow = '';
                document.body.style.marginRight = `0px`;
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


    function calcScroll() { //при появлении модального окна картинка прыгает на ширину скролла. Эта функция для вычисления ширины скролла (для дальнейшей нейтрализации скачка)
        let div = document.createElement('div');
        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);

        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;
    }


    bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
    bindModal('.phone_link', '.popup', '.popup .popup_close');
/*     showModalByTime('.popup', 60000); */
    bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close');

    bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
    bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);

};

export default modals;