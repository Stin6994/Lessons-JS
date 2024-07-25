/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const calc = function () {
    // Уроки 96-97 Калькулятор

    const result = document.querySelector('.calculating__result span');

    let sex, height, weight, age, ratio;

    if (localStorage.getItem('sex')) { //проверяем, записан ли заранее пол. Если нет, то берем женский по умолчанию.
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function initLocalSettings(selector, activeClass) { // функция для того, чтобы после загрузки страницы были выделены блоки, которые записаны в хранилище
        const elements = document.querySelectorAll(selector);
        elements.forEach(elem => {
            elem.classList.remove(activeClass);

            if (elem.getAttribute('id') === localStorage.getItem('sex')) { //если при переборе элементов значение id совпадет с тем, что ледит в хранилище
                elem.classList.add(activeClass);
            }

            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }

        });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active'); // ОСОБОЕ ВНИМАНИЕ НА div, мы работаем с целыми блоками 
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');


    function calcTotal() { //функция для расчета
        if (!sex || !height || !weight || !age || !ratio) { // если что-то не заполнено, то расчитывать не будем
            result.textContent = 'WTF';
            return;
        }

        if (sex === 'female') { // если для женщины, формула одна, для мужчины другая
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }

    }

    calcTotal();

    function getStaticInformation(selector, activeClass) { //функция для сбора данных, из незаполняемых (выбранных) элементов
        const elements = document.querySelectorAll(selector); //получаем все div из элемента parrentSelector

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => { // при нажатии на один из елементов
                if (e.target.getAttribute('data-ratio')) { // проверяем есть ли у него аттрибут data-ratio
                    // такие аттрибуты заранее прописали для степеней активности, так мы отделяем
                    // было ли нажатие на элемент пола или элемент активности
                    ratio = +e.target.getAttribute('data-ratio'); // достаем значение аттрибута, преобразуем в число, присваеваем одноименной переменной
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else { // если это не элемент активности, то элемент пола, а у них вместо data-ratio мы прописали id для их разделения
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }

                elements.forEach(elem => {
                    elem.classList.remove(activeClass); //для выделения только выбранного блока для начала убираем выделение со всех
                });

                e.target.classList.add(activeClass); //и выделяем только выбранный блок

                calcTotal(); // пересчитываем после любого изменения
            });
        })

    }

    // вызываем функцию 2 раза, первая на блок пола, вторая на активность. Эти блоки одинаковы по функционалу, поэтому 
    // функция одна, только идентификаторы разные
    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');


    function getDynamicInformation(selector) { // функция для сбора данных, из заполняемых полей
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            //надо понять в какое поле вводится инфа - при помощи id полей

            if (input.value.match(/\D/g)) { //если пользователь вводит не число
                input.style.border = '1px solid red'; //подсвечиваем рамку красным
            } else {
                input.style.border = 'none';
            }

            switch (input.getAttribute('id')) { // когда в одно из полей будем что-то вводить, код будет понимать в какое поле вводим по id
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            calcTotal(); // пересчитываем после любого изменения
        });

    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');

}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


const cards = function () {

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



    ;(0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResources)('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({ img, altimg, tittle, descr, price }) => {
                new MenuCard(img, altimg, tittle, descr, price, '.menu .container').render();
            });
        });

    // Урок 90 - Axios

    /*     axios.get('http://localhost:3000/menu')
            .then(data => {
                data.data.forEach(({ img, altimg, tittle, descr, price }) => {
                    new MenuCard(img, altimg, tittle, descr, price, '.menu .container').render();
                });
            }); */


    // ниже еще один способ динамической верстки на странице

    /*     getResources('http://localhost:3000/menu')
    .then(data => createCard(data));
    
    function createCard(data) {
        data.forEach(({img, altimg, tittle, descr, price}) => {
            const element = document.createElement('div');
            element.classList.add('menu__item');
            element.innerHTML = `
              <img src= ${img} alt=${altimg}>
                    <h3 class="menu__item-subtitle">${tittle}</h3>
                    <div class="menu__item-descr">${descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${price*91}</span> руб/день</div> 
                    </div>
            `
    
            document.querySelector('.menu .container').append(element);
        });
    }  */

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



const forms = function (formSelector, modalTimerId) {
    const forms = document.querySelectorAll(formSelector);

    const message = { // сообщения для юзера в разных ситуациях
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с Вами свяжемся',
        failure: 'Что-то пошло не так...'
    }

    forms.forEach(item => { // При заполнении любой формы будет происходить нижеперечисленное
        bindPostData(item);
    });

    


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


            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            // Берем данные пользователя из заполненной формы
            // formData.entries() - превращает их в массив массивов [[ключ, значение], [ключ, значение]]
            // Object.fromEntries - превращает массив массивов в объект
            // JSON.stringify - преобразует объект в удобный формат JSON


            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
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
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerId); //создавали ранее, открывает модальное окно

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
                (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
            }, 4000);

        }

        //Урок 86 - Fetch API - примеры в предыдущих версиях


    };

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeModal: () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   openModal: () => (/* binding */ openModal)
/* harmony export */ });

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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const slider = function ({container, slide, nextArrow, prevArrow, totalCounter,
     currentCounter, wrapper, field}) {
    // Урок 92 - слайдер, второй вариант (карусель)

    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width;


    let slideIndex = 1;
    let offset = 0;


    if (slides.length < 10) { //чтобы индекс прописывался с 0 в начале, например 03, 07 и тд
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + '%'; // задаем ширину всей карусели (4 слайда)
    slidesField.style.display = 'flex'; // располагаем слайды в ряд по направлению карусели
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';


    slides.forEach(slide => { //каждый слайд остается с родной шириной, не растягивается на всю карусель - 400%
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'); //создаем список(ol - order-list) из точек навигации

    const dots = []; //создаем массив для точек

    indicators.classList.add('carousel-indicators'); // даем ему класс
    indicators.style.cssText = ` 
position: absolute;
right: 0;
bottom: 0;
left: 0;
z-index: 15;
display: flex;
justify-content: center;
margin-right: 15%;
margin-left: 15%;
list-style: none;
`; //классу присваиваем css свойства, можно просто сделать это в css

    slider.append(indicators); //помещаем индикаторы внутрь блока слайдера

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li'); //создаем точки по количеству слайдов (li - list-item)
        dot.setAttribute('data-slide-to', i + 1); // каждому слайду, начиная с 1 задаем аттрибут
        dot.style.cssText = `
box-sizing: content-box;
flex: 0 1 auto;
width: 30px;
height: 6px;
margin-right: 3px;
margin-left: 3px;
cursor: pointer;
background-color: #fff;
background-clip: padding-box;
border-top: 10px solid transparent;
border-bottom: 10px solid transparent;
opacity: .5;
transition: opacity .6s ease;
`;

        if (i == 0) {
            dot.style.opacity = 1;
        }

        indicators.append(dot); //добавляем точку в верстку
        dots.push(dot); // добавляем точку в массив
    }


    function slidesSetting() {
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = '.5'); // для изменения активного индикатора
        dots[slideIndex - 1].style.opacity = 1;
    }

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
        // +str.replace(/\D/g, '') - изначально строка, например "500px". Обрезаем рх, преобразуем в число
    }



    next.addEventListener('click', () => {
        if (offset == deleteNotDigits(width) * (slides.length - 1)) { //если текущее положение индекса конечное, то возвращаемся к начальному
            // +width.replace(/\D/g, '') - изначально строка, например "500px". Обрезаем рх, преобразуем в число
            offset = 0;
        } else {
            offset += deleteNotDigits(width); // если не конечное, слайдсмещается на величину слайда 
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        slidesSetting();

    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;
        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        slidesSetting();
    });

    // Урок 93 - навигация для слайдера

    dots.forEach(dot => {   // для перемещения по слайдам кликом по навигации
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');
            slideIndex = slideTo; // приравниваем индекс к выбранному слайду, чтобы все правила завязанные на индекс переформатировались под выбранный слайд
            offset = deleteNotDigits(width) * (slideTo - 1); //находим положение нужного слайда
            slidesField.style.transform = `translateX(-${offset}px)`; //перемещаем на нужный слайд

            slidesSetting();
        });
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    // Урок 64 - Табы
    const tabs = document.querySelectorAll(tabsSelector),
        tabsContent = document.querySelectorAll(tabsContentSelector),
        tabsParent = document.querySelector(tabsParentSelector);

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });
    }

    function showTabContent(i = 0) {         // i=0 - значит, что если аргумент при вызове не быдет задан, то он автоматически приравняется к нулю
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent();


    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains(tabsSelector.slice(1))) { //вырезали точку из tabsSelector
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const timer = function(id, deadLine) {
// Урок 69 - таймер

/* const deadLine = '2024-08-31'; */

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

setClock(id, deadLine);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getResources: () => (/* binding */ getResources),
/* harmony export */   postData: () => (/* binding */ postData)
/* harmony export */ });
// выносим серверные взаимодействия в отдельный файл

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

const getResources = async (url) => {
    const res = await fetch(url);

    if (!res.ok) { // Если GET запрос не прошел, выдаем ошибку
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* 'use strict'; */

console.log('hello111');











document.addEventListener('DOMContentLoaded', () => {

    const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)('.modal', modalTimerId), 50000);

    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]', '.modal', modalTimerId );
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])('.timer', '2024-08-31');
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_4__["default"])();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_5__["default"])('form', modalTimerId);
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])({
        container: '.offer__slider',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        slide: '.offer__slide',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
        
});



//npx json-server db.json
//npx webpack
/******/ })()
;
//# sourceMappingURL=bundle.js.map