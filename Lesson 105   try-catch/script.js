'use strict';

//Урок 105 - поиск и обработка ошибок try/catch

try {
    console.log('Normal');
    console.log(a); // на этом моменте прервется выполнение блока try и пойдет выполняться блок catch
    console.log('result');
} catch(error) { // этот блок кода игнорируется, если все хорошо в блоке try
    console.log(error); // выдаст информацию об ошибке в консоль
    console.log(error.name); //идентификатор ошибки
   /*  console.log(error.message); // описание ошибки
    console.log(error.stack); */ //что привело к ошибке - цепочка функций с указанием на скрипты при большом проекте
} finally { //не обязательно, выполнится в конце при любом развитии событий
    console.log('finally');
}

//Если есть конструкция try/catch, то даже в случае ошибки браузер попытается обработать код далее. Иначе остановился бы

/* console.log('Still normal'); // благодаря присутствию try/catch - выполнится независимо от результата выше
console.log(a); // ошибка
console.log('And now?') */// а вот это уже не выполнится



// запускаем сразу 2 html, оба привязаны к этому файлу. Смотрим как обрабатывается ошибка в одном и как без ошибки все работает в другом

try {
    document.querySelector('.active').addEventListener('click', () => {
        console.log('click is OK');
    });
} catch(e) {
    console.log(e);
}


console.log('Normal');