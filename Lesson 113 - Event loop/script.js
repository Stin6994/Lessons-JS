'use strict';

// Урок 113 - Event loop

console.log(1);

setTimeout(() => {
    console.log('timeout');
}, 2000);

setTimeout(() => {
    console.log('timeout2');
}, 4000);

console.log(21);

// Очередность вывода - 1, 21, timeout, timeout2

