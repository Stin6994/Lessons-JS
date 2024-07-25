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


export default calc;