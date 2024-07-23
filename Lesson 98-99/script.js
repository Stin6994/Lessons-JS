'use strict';

// Урок 98 - Акцессоры (get/set)

/* const persone = {
    name: 'Alex',
    age: 26,

    get userAge() {
        return this.age;
    },

    set userAge(num) {
        this.age = num;
    }

}

console.log(persone.userAge); //из-зи get можно использовать функцию без ()
console.log(persone.userAge = 30); // set позволил взять число извне и изменить свойство объекта
console.log(persone.userAge); */

// Урок 99 - Инкапсуляция (ООП)

/* function UserOne(name, age) {
    this.name = name;
    this.age = age;

    this.say = function () {
        console.log(`Имя пользователя: ${this.name}, возраст: ${this.age}`);
    }
}

const ivan = new UserOne('Ivan', 27);
console.log(ivan.name);
console.log(ivan.age);

ivan.age = 30;
ivan.name = 'Alex';

ivan.say(); */
// Выше мы вмешались в работу объекта и перезаписали значения
// Инкапсуляция нужна для того, чтобы не допукать вмешательства извне
// Ниже пример с инкапсуляцией


/* function User(name, age) {
    this.name = name;
    let userAge = age; // это и есть пример инкапсуляции, мы не можем стандартным способом получить доступ к этой переменной

    this.say = function () {
        console.log(`Имя пользователя: ${this.name}, возраст: ${userAge}`);
    };

    this.getAge = function() { //метод для получения инкапсулированного значения
        return userAge;
    };

    this.setAge = function(age) { //метод для перезаписи инкапсулированного значения
        if (typeof age === 'number' && age > 0 && age < 110) {
            userAge = age;
        } else {
            console.log('Недопустимое значение');
        }
        
       
    };


}

const igor = new User('Igor', 15);
console.log(igor.name);
console.log(igor.age); //не можем получить возраст
console.log(igor.getAge()); // а вот так уже можем
igor.setAge(30);
console.log(igor.getAge());
igor.setAge(300);
console.log(igor.getAge());
igor.name = 'Anna'; // имя не инкапсулировали и оно перезаписывается

igor.say(); */


// Делаем через классы и конструктор

class User {
    constructor(name, age) {
        this.name = name;
        this._age = age; // _age - для инкапсуляции при использовании классов
    }

    // это и есть пример инкапсуляции, мы не можем стандартным способом получить доступ к этой переменной

    say() {
        console.log(`Имя пользователя: ${this.name}, возраст: ${this._age}`);
    }

    get age() { //метод для получения инкапсулированного значения
        return this._age;
    }

    set age(age) { //метод для перезаписи инкапсулированного значения
        if (typeof age === 'number' && age > 0 && age < 110) {
            this._age = age;
        } else {
            console.log('Недопустимое значение');
        }
        
       
    }
}

const igor = new User('Igor', 15);
console.log(igor.name);
console.log(igor.age); 
igor.age = 99;
console.log(igor.age); 


igor.say(); 