/* 'use strict'; */

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


    // Урок 78 Классы в реальной работе (шаблонизируем карточки) ЗАКОММЕНТИРОВАНО, ТК ДАЛЕЕ ДОПОЛНЕНО

    /*     class MenuCard {
            constructor(src, alt, tittle, descr, price, parrentSelector) {
                this.src = src;
                this.alt = alt;
                this.tittle = tittle;
                this.descr = descr;
                this.price = price;
                this.parrent = document.querySelector(parrentSelector);
                this.transfer = 91; //курс доллар/рубль
                this.changeToRub();
            }
    
            changeToRub() { // метод для конвертации валюты в рубль
                this.price *= this.transfer;
            }
    
            render() { //для добавления новой карточки на страницу в структуру html
                const element = document.createElement('div');
                element.innerHTML = `
              <div class="menu__item">
                          <img src= ${this.src} alt=${this.alt}>
                          <h3 class="menu__item-subtitle">${this.tittle}</h3>
                          <div class="menu__item-descr">${this.descr}</div>
                          <div class="menu__item-divider"></div>
                          <div class="menu__item-price">
                              <div class="menu__item-cost">Цена:</div>
                              <div class="menu__item-total"><span>${this.price}</span> руб/день</div> 
                          </div>
                      </div>
                      `;
                this.parrent.append(element); //добавляем новосозданный элемент div с карточкой в родительский блок всех карточек
            }
        }
    
    
        new MenuCard(
            "img/tabs/vegy.jpg",
            "vegy",
            'Меню "Фитнес"',
            'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
            5, //прайс - 5$ 
            '.menu .container'
        ).render();
    
        new MenuCard(
            "img/tabs/elite.jpg",
            "elite",
            'Меню “Премиум”',
            'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
            9,
            '.menu .container'
        ).render();
    
        new MenuCard(
            "img/tabs/post.jpg",
            "post",
            'Меню "Постное"',
            'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
            7,
            '.menu .container'
        ).render(); */




    // Урок 79 - Rest оператор и параметры по умолчанию (ES6)

    /*     const log = function (a, b, ...rest) {  // ...(любое название, например rest) - rest оператор, говорит, что будет неизвестное количество элементов дополнительно. Эти элементы соберутся в массив
            console.log(a, b, rest);
        }
    
        log('a', 'b', 'rest1', 'rest2', 'rest3');
    
    
        //параметр по умолчанию
    
        function calcOrDouble(number, basis) {
            console.log(number * basis);
        }
    
        calcOrDouble(3, 5); // будет 15, оба параметра известны, но что если один из них не будет задан, можно ли задать один из параметров по умолчанию? 
    
        function calcOrDoubleTwo(number, basis = 7) { //в ES6 можно просто через = задать параметр по умолчанию, на случай если этот аргумент не будет задан при объявлении функции
            console.log(number * basis);
        }
    
        calcOrDoubleTwo(3); */ // Будет 21

    // Теперь дополняем предыдущий урок с классами ()


    class MenuCard {
        constructor(src, alt, tittle, descr, price, parrentSelector, ...classes) { //Допустим хотим будущей карточке присвоить неизвестное количество дополнительных классов в будущем, используем rest оператор
            this.src = src;
            this.alt = alt;
            this.tittle = tittle;
            this.descr = descr;
            this.price = price;
            this.classes = classes; //не забываем добавить свойство - это будет массив, тк rest оператор отдает массив
            this.parrent = document.querySelector(parrentSelector);
            this.transfer = 91; //курс доллар/рубль
            this.changeToRub();
        }

        changeToRub() { // метод для конвертации валюты в рубль
            this.price *= this.transfer;
        }

        render() { //для добавления новой карточки на страницу в структуру html
            const element = document.createElement('div');

            if (this.classes.length === 0) { //если в rest не были вообще переданы аргументы, то добавляем класс, по умолчанию, без которого вообще никак, поедет верстка
                this.classes = 'menu__item';
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(className => element.classList.add(className)); // перебрали все элементы массива с классами (rest), каждый класс добавили к нашей карточке
            }


            element.innerHTML = `
                <img src= ${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.tittle}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> руб/день</div> 
                </div>
            `; // убрали <div class="menu__item">, этот и другие классы будем передавать при объявлении карточек в виде аргуметов в конце (rest)
            this.parrent.append(element); //добавляем новосозданный элемент div с карточкой в родительский блок всех карточек
        }
    }

    const deleteCard = document.querySelectorAll('.menu__item'); //удаляем старые карточки
    deleteCard.forEach(item => {
        item.remove();
    })

    new MenuCard( //Добавляем новые
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        5, //прайс - 5$ 
        '.menu .container'
        // 'menu__item',// rest добавляем классы
        //'big' 
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        9,
        '.menu .container'
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        7,
        '.menu .container'
    ).render();




    // Урок 83 - Реализация скрипта отправки данных на сервер (POST)
    // формы

    const forms = document.querySelectorAll('form');

    const message = { // сообщения для юзера в разных ситуациях
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с Вами свяжемся',
        failure: 'Что-то пошло не так...'
    }

    forms.forEach(item => { // При заполнении любой формы будет происходить нижеперечисленное
        bindPostData(item);
    });

    const postData = async (url, data) => {   // async - говорит, что код должен будет обрабатываться не по порядку, а асинхронно, так как надо дождаться реакции сервера (при помощи await), прежде чем выполнять дальше
                                            // async и await всегда идут в паре
        const res = await fetch(url, { // await не дает создать переменную res до тех пор, пока не выполнится запрос на сервер
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: data
        });
        return await res.json();
    }


    function bindPostData(form) {
        form.addEventListener('submit', (e) => { //срабатывает когда мы пытемся оправить какую-то форму
            e.preventDefault(); // в AJAX запросах ставим вначале, чтобы отменить стандартное поведение браузера (перезагрузку при изменениях и отправке формы)

            const statusMessage = document.createElement('img'); // Добавляем блок с сообщением пользователю о статусе отправки данных
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
            `;

            form.insertAdjacentElement('afterend', statusMessage); // Для добавления после формы (снизу) в верстке, а не за ним горизонтально
            const formData = new FormData(form); // Это позволяет преобразовать данные от форм ввода в привычную форму объекта
            const object = {}; //сюда будем помещать преобразованные данные из FormData в JSON
            formData.forEach(function (value, key) { //наполняем объект данными из FormData
                object[key] = value;
            });

                postData ('http://localhost:3000/requests', JSON.stringify(object))
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success); // если все ок, то сообщение об успехе в форме
                    statusMessage.remove();
                }).catch(() => {
                    showThanksModal(message.failure); // если не ок
                }).finally(() => {
                    form.reset(); // в любом случае в конце чистим форму
                });


        });

        // Урок 84 - Красивое оповещение пользователя

        function showThanksModal(message) {  // новое модальное окно с благодарностью

            const prevModalDialog = document.querySelector('.modal__dialog'); //функционируем с имеющимся модальным окном
            prevModalDialog.classList.add('hide'); //временно скрываем его, чтобы не удалять и не создавать заново при новой необходимости
            openModal(); //создавали ранее, открывает модальное окно

            const thanksModal = document.createElement('div');
            thanksModal.classList.add('modal__dialog');
            thanksModal.innerHTML = `
    <div class="modal__content">
        <div class="modal__close" data-close>×</div>
        <div class="modal__title">${message}</div>
    </div>
    `;

            document.querySelector('.modal').append(thanksModal);

            setTimeout(() => {
                thanksModal.remove();
                prevModalDialog.classList.add('show');
                prevModalDialog.classList.remove('hide');
                closeModal();
            }, 4000);

        }

        //Урок 86 - Fetch API - примеры в предыдущих версиях


    };

        //Урок 88 - JSON сервер


    /* fetch('db.json') */ // изначально делали так
    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res));

        //получили в консоли инфо из db.json
        //теперь используем json-server: пишем в консоли     npx json-server db.json
        // там видим Endpoints:
                //http://localhost:3000/menu
                //http://localhost:3000/requests
        // подставляем путь в fetch


        //Урок 89 - Получение данных с сервера Async/Await (ES8)





});

