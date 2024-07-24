function myModule() { // эту функцию будем экспортировать  в другой js файл - main.js
    this.hello = function() {
        console.log('hello');
    };

    this.goodbye = function() {
        console.log('bye');
    };
}

module.exports = myModule; // синтаксис CommonJS - эти данные на экспорт