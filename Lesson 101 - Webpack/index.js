const myModule = require('./main'); //указываем откуда будем импортировать данные

const myModuleInstance = new myModule(); // создали объект, содержащий данные импортированные из другого файла js

//проверяем

myModuleInstance.hello();
myModuleInstance.goodbye();

// БРАУЗЕР НЕ ПОЙМЕТ, ЧТО МЫ ДЕЛАЕМ, НУЖЕН СБОРЩИК -   Webpack