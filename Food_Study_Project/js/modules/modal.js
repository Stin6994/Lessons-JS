
function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = ''; //возвращаем скролл на страницу сайта после закрытия мод. окна
}

function openModal(modalSelector, modalTimerId) {
    /* modal.classList.toggle('show'); */  // Если класса show нет, добавляем, если есть - убираем
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';  //для того, чтобы при открытом модальном окне не прокручивался вниз и вверх сайт

    console.log(modalTimerId);
    if (modalTimerId) {
        clearInterval(modalTimerId); // Если юзер сам открыл окно до его автоматического открытия - далее оно автоматически уже не будет открываться до обновления страницы.
    }

}
const modal = function (triggerSelector, modalSelector, modalTimerId) {
    // Урок 72 - Модальное окно

    const modalTrigger = document.querySelectorAll(triggerSelector);
    const modal = document.querySelector(modalSelector);
    /* const modalCloseBtn = document.querySelector('[data-close]'); */

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId)); //коллбек функция прописывается, потому что это обработчик событий и иначе она работать не будет
    });



    /*     modalCloseBtn.addEventListener('click', closeModal); */


    modal.addEventListener('click', (e) => {    //если кликнуть мимо модального окна, то оно тоже закроется
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });


    document.addEventListener('keydown', (e) => {  // Если нажали Esc, окно тоже закрывается. e.code - кодовое название клавиш, надо их гуглить
        if (e.code === 'Escape' && modal.classList.contains('show')) {  //проверка также на то, открыто ли сейчас окно, иначе Esc будет его сам открывать
            closeModal(modalSelector);
        }
    });




    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) { // проверяет докрутили ли страницу до конца
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll); // удаляем обработчик события после первого срабытывания, чтобы не спамить окнами при прокрутке до конца страницы
        }
    }

    window.addEventListener('scroll', showModalByScroll);  //При прокрутке страницы до конца - открывается окно
}

export default modal;
export {closeModal, openModal};