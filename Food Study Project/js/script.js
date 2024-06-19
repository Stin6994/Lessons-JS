'use strict';

console.log('hello111');

// Урок 64 - Табы

document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');




    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });

    }

    function showTabContent(i = 0) {         // i=0 - значит, что если аргумент при вызове не быдет задан, то он автоматически приравняется к нулю
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();


    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });



    // Урок 69 - таймер

    const deadLine = '2024-08-31';



    function getTimeRemaining(endTime) {

        let days, hours, minutes, seconds;
        const t = Date.parse(endTime) - Date.parse(new Date());  // Date.parse - преобразование даты в числовое выражение (миллисекунды). newDate - текущая дата

        if (t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24));
            hours = Math.floor((t / (1000 * 60 * 60) % 24)); // Вычисляем количество часов и берем только остаток от деления на 24, так как дни уже вычислены ранее и теперь нужен только остаток часов в рамках одного дня
            minutes = Math.floor((t / 1000 / 60) % 60);
            seconds = Math.floor((t / 1000) % 60);
        }

        return {
            'total': t, // актуальная разница между заявленным дедлайном и текущей датой. Если дедлайн просрочен - становится отрицательной
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZiro(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }


    function setClock(selector, endTime) {
        const timer = document.querySelector(selector);
        const days = timer.querySelector('#days');
        const hours = timer.querySelector('#hours');
        const minutes = timer.querySelector('#minutes');
        const seconds = timer.querySelector('#seconds');

        const timeInterval = setInterval(updateClock, 1000); // Обновляет таймер на странице 1 раз в секунду

        updateClock(); // сразу обновляем, потому что иначе первое обновление произойдет не после загрузки страницы, а через 1 секунду

        function updateClock() {
            const t = getTimeRemaining(endTime);

            days.innerHTML = getZiro(t.days);
            hours.innerHTML = getZiro(t.hours);
            minutes.innerHTML = getZiro(t.minutes);
            seconds.innerHTML = getZiro(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);   // Если текущая дата больше дедлайна, автообновление таймера останавливается
            }
        }
    }

    setClock('.timer', deadLine);




    // Урок 72 - Модальное окно

    const modalTrigger = document.querySelectorAll('[data-modal]');
    const modal = document.querySelector('.modal');
    const modalCloseBtn = document.querySelector('[data-close]');

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    function openModal() {
        modal.classList.toggle('show');  // Если класса show нет, добавляем, если есть - убираем
        document.body.style.overflow = 'hidden';  //для того, чтобы при открытом модальном окне не прокручивался вниз и вверх сайт
        clearInterval(modalTimerId); // Если юзер сам открыл окно до его автоматического открытия - далее оно автоматически уже не будет открываться до обновления страницы.
    }


    function closeModal() {
        modal.classList.toggle('show');
        document.body.style.overflow = ''; //возвращаем скролл на страницу сайта после закрытия мод. окна
    }

    modalCloseBtn.addEventListener('click', closeModal);


    modal.addEventListener('click', (e) => {    //если кликнуть мимо модального окна, то оно тоже закроется
        if (e.target === modal) {
            closeModal();
        }
    });


    document.addEventListener('keydown', (e) => {  // Если нажали Esc, окно тоже закрывается. e.code - кодовое название клавиш, надо их гуглить
        if (e.code === 'Escape' && modal.classList.contains('show')) {  //проверка также на то, открыто ли сейчас окно, иначе Esc будет его сам открывать
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 7500); //Когда сайт загружается - через 7 секунд выходит модальное окно.


    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) { // проверяет докрутили ли страницу до конца
            openModal();
            window.removeEventListener('scroll', showModalByScroll); // удаляем обработчик события после первого срабытывания, чтобы не спамить окнами при прокрутке до конца страницы
        }
    }

    window.addEventListener('scroll', showModalByScroll);  //При прокрутке страницы до конца - открывается окно



    // Урок 83 - Реализация скрипта отправки данных на сервер (POST)
    // формы

    const forms = document.querySelectorAll('form');

    const message = { // сообщения для юзера в разных ситуациях
        loading: 'Загрузка',
        success: 'Спасибо! Скоро мы с Вами свяжемся',
        failure: 'Что-то пошло не так...'
    }

    forms.forEach(item => { // При заполнении любой формы будет происходить нижеперечисленное
        postData(item);
    });

    function postData(form) {
        form.addEventListener('submit', (e) => { //срабатывает когда мы пытемся оправить какую-то форму
            e.preventDefault(); // в AJAX запросах ставим вначале, чтобы отменить стандартное поведение браузера (перезагрузку при изменениях и отправке формы)

            const statusMessage = document.createElement('div'); // Добавляем блок с сообщением пользователю о статусе отправки данных
            statusMessage.classList.add('ststus');
            statusMessage.textContent = message.loading; //как только отправились данные, пользователь видит сообщение "загрузка"
            form.append(statusMessage); //добавляем сообщение к форме


            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            request.setRequestHeader('Content-type', 'application/json');  //заголовки

            const formData = new FormData(form); // Это позволяет преобразовать данные от форм ввода в привычную форму объекта

            const object = {}; //сюда будем помещать преобразованные данные из FormData в JSON

            formData.forEach (function(value,key) { //наполняем объект данными из FormData
                object[key] = value;
            });

            const json = JSON.stringify(object); // превращаем наш заполненный объект в JSON



            request.send(json); //отправили данные на сервер

            request.addEventListener('load', () => { //отслеживаем загрузку данных на сервер
                if (request.status === 200) {
                    console.log(request.response);
                    statusMessage.textContent = message.success; // если все ок, то сообщение об успехе в форме
                    form.reset(); // очистка формы после отправки на сервер

                    setTimeout(() => {  // удаление сообщения через 2 секунды
                        statusMessage.remove();
                    }, 2000);

                } else {
                    statusMessage.textContent = message.failure; // если не ок, то сообщение об ошибке
                }
            });

        });

    }

// Урок 84 - Красивое оповещение пользователя






});
