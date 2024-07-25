/* function myModule() { // эту функцию будем экспортировать  в другой js файл - main.js
    this.hello = function() {
        console.log('hello1');
    };

    this.goodbye = function() {
        console.log('bye');
    };
}

module.exports = myModule; */ // синтаксис CommonJS - эти данные на экспорт

// Урок 102 - ES6 Modules
// Синтаксис импорта/экспорта на ES6 

export let one = 1; // первый способ

let two = 2; // второй
export {two};

let numberThree = 3;
export {numberThree};

export function sayHi() { //экспорт функции
    console.log('Hi!');
}

export default function sayCat() { //экспорт функции
    console.log('Cat');
}

