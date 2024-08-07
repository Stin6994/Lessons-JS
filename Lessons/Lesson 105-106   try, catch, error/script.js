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

// Урок 106 - создание ошибки (Error)

console.log('            Урок 106');

try {
    const a = 2, 
    b = 3,
    c = '';

if (!c) throw new Error(`${c} не найдена или пустая`); 
console.log (a+b+c); //до этого этапа не дойдем, так как сверху будет ошибка с пояснением
} catch(e) {
console.error(e.name);
console.log(e.message);
console.log(e.stack);
}

/* const a = 2, 
        b = 3,
        c = '';

if (!c) throw new Error(`${c} не найдена или пустая`); */
/* console.log (a+b+c);  *///до этого этапа не дойдем, так как сверху будет ошибка с пояснением


/* const err = new Error('new_error');
console.log(err.name, err.message, err.stack); */
