'use strict';

// Урок 113 - Event loop

/* console.log(1);

setTimeout(() => {
    console.log('timeout');
}, 2000);

setTimeout(() => {
    console.log('timeout2');
}, 4000);

console.log(21);
 */
// Очередность вывода - 1, 21, timeout, timeout2

/* let k = 0;

function count() {
    for (let i = 0; i < 1e9; i++) {
        k++;
    }
    alert ('done');
}

count(); */// эта функция перегружает браузер, пока не выполнится - даже div с текстом не отобразится

setTimeout(() => {
    console.log('1');
}, 0);

console.log(2);

//сначала выполнится 2, потом 1, так как setTimeout - асинхронная операция
//и несмотря на 0 секунд выполнения - она пойдет в работу после синхронной console.log