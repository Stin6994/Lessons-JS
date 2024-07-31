'use strict';

// Урок 110 - Функции-генераторы

console.log('Start Lesson 110');

function* generator() { //выдает результат последовательно. Вызвали один раз - один результат, второй раз - уже другой
    yield 'S';
    yield 'c';
    yield 'r';
    yield 'i';
    yield 'p';
    yield 't';
}

const str = generator();

console.log (str.next().value); //отдает букву S
console.log (str.next()); //отдает объект с value: 'c', done: false
console.log (str.next().value); //отдает букву r
console.log (str.next()); //отдает объект с value: 'i', done: false
console.log (str.next()); //отдает объект с value: 'p', done: false
console.log (str.next()); //отдает объект с value: 't', done: false

console.log (str.next()); //отдает объект с value: 'undefined', done: true


function* count(n) {
    for (let i = 0; i < n; i++) {
        yield i;
    }
}

const counter = count(7);

console.log (counter.next().value); // 0
console.log (counter.next().value); // 1
console.log (counter.next().value); // 2


for (let k of count(5)) {
    console.log (k); // 0 1 2 3 4
}