'use strict';

/* const app = '123'; */ //эта переменная уже глобально объявлена в ранее прогруженном скрипте lib.js, 
//поэтому при попытке объявить эту переменную будет ошибка

const number = 1;

(function(){ // такая функция анонимна и сразу вызывает сама себя. Внутри нее своя область видимости. Это и есть модуль
    let number = 2;
    console.log(number); // 2
    console.log(number + 3); // 5
}());

console.log(number); // 1


const user = (function(){
    const privat = function () { // мы не можем извне получить доступ к этой функции, так как она внутри модуля (внутри его области видимости)
        console.log('Private');
    };

    return { // а вот благодаря return мы сможем вытащить функцию privat из модуля
        sayHello: privat
    };

}());

user.sayHello(); // вытащили

