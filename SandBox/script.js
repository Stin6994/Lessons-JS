'use strict';

/* console.log("Hello")

const now = new Date();

console.log(now); */
/* console.log(now.getFullYear());
console.log(now.getMonth());
console.log(now.getDate());
console.log(now.getDay()); */

/* console.log(now.setHours(18));
console.log(now); */


// Урок 74. Функции-конструкторы

/* function User (name, id) { // функция конструктор по созданию юзеров
    this.name = name;
    this.id = id;
    this.human = true;
    this.hello = function() {
        console.log(`Hello ${this.name}`);
    }
}

User.prototype.exit = function() {  //добавляем в конструктор метод exit
    console.log(`Пользователь ${this.name} вышел`);
};

const ivan = new User('Ivan', 28); // переменная Ivan - теперь объект, созданный при помощи конструктора
const alex = new User('Alex', 20);

ivan.exit();

ivan.hello();
alex.hello();


console.log(ivan);
console.log(alex); */

// в ES6 вместо этого устаревшего метода (из ES5) используют классы. Ниже пример, делается то же самое

/* class UserTwo {
    constructor(name, id) {
    this.name = name;
    this.id = id;
    this.human = true;
    }
    hello() {
        console.log(`Hello ${this.name}`);
    }
    exit() {
        console.log(`Пользователь ${this.name} вышел`);
    }
} */



//Урок 75. Контекст вызова this


/* function showThisTest() {  // если включен строгий режим (use strict), то будет undefined. Если откл. строгий режим - глобальный объект window
    console.log(this);
} */

/* showThisTest(); */


// задача на практике

/* function showThis(a, b){
    console.log(this); //undefined
    function sum() {
        console.log(this); //undefined
        return this.a + this.b; // error
    }
    console.log(sum());
}

showThis(4, 5); */

// Контекст у методов объекта - сам объект
// this в конструкторах или классах - это новый экземпляр объекта

/* function sayName(surname) {
    console.log(this);
    console.log(this.name + surname);
}

const user = {
    name : 'John'
};

sayName.call(user,  ' Smith');  
sayName.apply(user, [' Smith']); */
// ручное присвоение контекста. Два способа делают одно и то же, но разный синтаксис

/* function count(num) {
    return this*num;
}
const double = count.bind(2);
console.log (double(29)); */
// присвоили контекст при помощи создания новой функции через bind.


/* const btn = document.querySelector('.btn');
btn.addEventListener('click', function() { // контекст this - будет сам элемент button
    console.log(this);
    this.style.backgroundColor = 'blue';

}) */


/*     const obj = {
        num : 5,
        sayNumber : function() {
            const say = () => {
                console.log(this);
            };
            say();
        }
    }

    obj.sayNumber(); */

// стрелочная функция не имеет своего контекста, поэтому берет его у родителя

/* 
    const double = (a) => {
        return a * 2;
    };  // обычное представление стрелочной функции   */

/* const double = (a) => a * 2; //сокращенное */

/*     const double = a => a * 2; // если только 1 аргумент, можно опустить скобки
    console.log(double(3.5));
    console.log(double(4)); */


//Урок 85 - Promise (дословно ожидание - для асинхронного кода)

console.log('Запрос данных...');



const req = new Promise(function(resolve,reject){  //resolve - обещание выполнилось, reject - не выполнилось
    setTimeout(() => {
        console.log('Подготовка данных...');

        const product = {
            name: 'TV',
            price: 2000
        }

        resolve(product);

    }, 2000);
});

req.then((product) => {   // then - если все в порядке, то выполняется следующий фрагмент кода
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            product.status = 'order';
            resolve(product);
        }, 2000);
    });
}).then(data => {
    data.modify = true;
    return data;
}).then(data => {
    console.log(data);
}).catch(() => {  // catch - если что-то пошло не так, на каком-то из then, то все последующие then пропускаются и код переходит к catch
    console.error('Произошла ошибка');
}).finally(() => { // finally - конечное действие, независимо от того выполнились все then, или был задействован catch. Например для очистки формы после удачного или неудачной (без разницы) отправки данных на сервер 
    console.log('Финал');
});

