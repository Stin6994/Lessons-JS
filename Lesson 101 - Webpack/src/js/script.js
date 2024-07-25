/* const myModules = require('./main'); //указываем откуда будем импортировать данные

const myModuleInstance = new myModules(); // создали объект, содержащий данные импортированные из другого файла js

//проверяем

myModuleInstance.hello();
myModuleInstance.goodbye(); */

// БРАУЗЕР НЕ ПОЙМЕТ, ЧТО МЫ ДЕЛАЕМ, НУЖЕН СБОРЩИК - Webpack

// Урок 102 - ES6 Modules
// Синтаксис импорта/экспорта на ES6 
// опять же, браузер просто так не поймет, нужна сборка Webpack-ом

import {one, two} from './main'; //импорт

import {numberThree as three} from './main'; // при импорте можно заменить название на более удобное

console.log(`${one} and ${two} and ${three}`); //использование

import * as data from './main'; //импорт всего

console.log(`${data.numberThree} and ${data.two} and ${data.one}`);
data.sayHi();

// обращение к default проще, добавляем такой статус в main.js и обращаемся к функциям следующим образом:

import sayCat from './main';
sayCat();


