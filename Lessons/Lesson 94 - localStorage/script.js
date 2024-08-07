'use strict';

// Урок 94 - localStorage

/* localStorage.setItem('number', 5); */ //добавляет в локальное хранилище в виде объекта ключ 'number', значение 5
/* localStorage.removeItem('number');  */ // удаляет выбранную запись
/* localStorage.clear();  */ // очищает локальное хранилище целиком

const checkbox = document.querySelector('#checkbox'),
    form = document.querySelector('form'),
    change = document.querySelector('#color');


if (localStorage.getItem('isCheked')) { //если мы можем получить их хранилища isCheked в состоянии true
    checkbox.checked = true; // галочка будет стоять после обновления страницы (в нашем случае, тк это начало кода на странице)
}

if (localStorage.getItem('bg') === 'changed') { // при обновлении, если форма была зеленой - останется зеленой
    form.style.backgroundColor = 'green';
}


checkbox.addEventListener('change', () => { // при нажатии на чекбокс добавляется запись в локальное хранилище
    localStorage.setItem('isCheked', true);
});

change.addEventListener('click', () => { // если при клике на кнопку
    if (localStorage.getItem('bg') === 'changed') { // в хранилище есть запись
        localStorage.removeItem('bg'); //удаляем ее
        form.style.backgroundColor = '#fff'; // делаем форму белой
    } else {
        localStorage.setItem('bg', 'changed'); // если записи нет, делаем ее
        form.style.backgroundColor = 'green'; // форма становится зеленой
    }
});


const persone = {
    name: 'Alex',
    age: 25
};

const serializedPersone = JSON.stringify(persone); // создаем переменную, которая принимает объект в JSON формате
localStorage.setItem('alex', serializedPersone); // размещаем данные в хранилище

console.log(JSON.parse(localStorage.getItem('alex'))); //в консоли - обычный объект