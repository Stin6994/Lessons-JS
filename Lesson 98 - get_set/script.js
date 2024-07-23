'use strict';

// Урок 98 - Акцессоры (get/set)

const persone = {
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
console.log(persone.userAge);

// Урок 99 - Инкапсуляция (ООП)

