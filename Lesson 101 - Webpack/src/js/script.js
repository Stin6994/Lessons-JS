/* const myModules = require('./main'); //указываем откуда будем импортировать данные

const myModuleInstance = new myModules(); // создали объект, содержащий данные импортированные из другого файла js

//проверяем

myModuleInstance.hello();
myModuleInstance.goodbye(); */

// БРАУЗЕР НЕ ПОЙМЕТ, ЧТО МЫ ДЕЛАЕМ, НУЖЕН СБОРЩИК - Webpack

// Урок 102 - ES6 Modules
// Синтаксис импорта/экспорта на ES6 
// опять же, браузер просто так не поймет, нужна сборка Webpack-ом
/* 
import {one, two} from './main'; //импорт

import {numberThree as three} from './main'; // при импорте можно заменить название на более удобное

console.log(`${one} and ${two} and ${three}`); //использование */

import * as data from './main'; //импорт всего

/* console.log(`${data.numberThree} and ${data.two} and ${data.one}`); */
data.sayHi();

// обращение к default проще, добавляем такой статус в main.js и обращаемся к функциям следующим образом:

/* import sayCat from './main';
sayCat();
 */

// Урок 109 - jQuery

import $ from 'jquery';

/* const btn = $('#btn'); // аналогично document.querySelector
console.log(btn); */

$(document).ready(function(){ //объявляем функцию, которая будет запущена когда всё DOM дерево будет прогружено
    $('.list-item:first').hover(function() {    //синтаксис - :first из документации. Выбирает первый элемент с классом .list-item
        $(this).toggleClass('active'); // класс добавляется, если его не было при наведении 
    });

    $('.list-item:eq(2)').on('click', function() { //при нажатии на 3 кнопку .list-item (индекс 2) 
        $('.image:even').fadeToggle('slow'); // медленная анимация скрытия нечетной (even) картинки
    });

    $('.list-item:eq(4)').on('click', function() { //при нажатии на 5 кнопку .list-item (индекс 4) 
        $('.image:odd').animate({ // другая анимация на протяжении 2 секунд
            opacity: 'toggle',
            height: 'toggle'
        }, 2000);
    });





});




