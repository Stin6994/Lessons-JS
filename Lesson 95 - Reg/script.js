'use strict';

// Урок 95 - Регулярные выражения

/* new RegExp('pattern', 'flags');
//создается конструктор, которы содержит определенный паттерн и флаги, на которые будем обращать внимание для обработки по ним
//эта запись устаревшая, используем современную ниже

/pattern/f      */

const ans = prompt('Введите что-нибудь');

const regA = /n/ig; // задали паттерн - n, флаг - i
// Флаги: i - вне зависимости от регистра
//          g - сразу несколько вхождений паттерна
//          m - включает многострочный режим (учитывает переносы)
// можно использовать все сразу или комбинировать reg = /n/igm;

console.log(ans.search(regA)); // ищем по паттерну совпадение, в имени anna - результат будет 1, так как первое совпадение на симоле с индексом 1
// метод search работает только с флагом i

console.log(ans.match(regA)); // находит совпалдения, отдает массив



const pass = prompt('Password');

console.log(pass.replace(/./g, '*')); // в регулярных выражениях . означает, что берем ВСЕ символы строки и меняем на *    replace  - замена
// также можно сказать, что нужно именно символ . заменить на *.  \ это экранирование, означает, что мы ищем последующий символ, например \., \\, \^
console.log(pass.replace(/\./g, '*'));


console.log('12-34-56'.replace(/-/g, ':')); // меняем дефисы на двоеточие прямо в консоли


const regB = /\d/g;
console.log(regB.test(ans))// проверяет на наличие паттерна и дает true/false
console.log(ans.match(regB)); //все цифры

// для поиска целых однотипных групп в строке используют классы:
//      \d - ищет все цифры
//      \w - ищет все буквы   
//      \s - ищет все пробелы

// также можно искать наоборот, используя большие буквы
//      \D - ищет НЕ цифры
//      \W - ищет НЕ буквы   
//      \S - ищет НЕ пробелы   

const str = 'My name is R2D2';

console.log(str.match(/\w\d\w\d/i));
// ищем в строке конструкцию, в которой подряд буква\цифра\буква\цифра, i - независимо от регистра. Ответ - R2D2
