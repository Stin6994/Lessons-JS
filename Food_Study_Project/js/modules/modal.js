const modal = function () {
    // Урок 72 - Модальное окно

    const modalTrigger = document.querySelectorAll('[data-modal]');
    const modal = document.querySelector('.modal');
    /* const modalCloseBtn = document.querySelector('[data-close]'); */

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    function openModal() {
        /* modal.classList.toggle('show'); */  // Если класса show нет, добавляем, если есть - убираем
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';  //для того, чтобы при открытом модальном окне не прокручивался вниз и вверх сайт
        clearInterval(modalTimerId); // Если юзер сам открыл окно до его автоматического открытия - далее оно автоматически уже не будет открываться до обновления страницы.
    }


    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = ''; //возвращаем скролл на страницу сайта после закрытия мод. окна
    }

    /*     modalCloseBtn.addEventListener('click', closeModal); */


    modal.addEventListener('click', (e) => {    //если кликнуть мимо модального окна, то оно тоже закроется
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });


    document.addEventListener('keydown', (e) => {  // Если нажали Esc, окно тоже закрывается. e.code - кодовое название клавиш, надо их гуглить
        if (e.code === 'Escape' && modal.classList.contains('show')) {  //проверка также на то, открыто ли сейчас окно, иначе Esc будет его сам открывать
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 50000); //Когда сайт загружается - через 7 секунд выходит модальное окно.


    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) { // проверяет докрутили ли страницу до конца
            openModal();
            window.removeEventListener('scroll', showModalByScroll); // удаляем обработчик события после первого срабытывания, чтобы не спамить окнами при прокрутке до конца страницы
        }
    }

    window.addEventListener('scroll', showModalByScroll);  //При прокрутке страницы до конца - открывается окно
}

module.exports = modal;