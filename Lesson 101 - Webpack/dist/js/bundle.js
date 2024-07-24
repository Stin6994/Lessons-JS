/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/***/ ((module) => {

function myModule() { // эту функцию будем экспортировать  в другой js файл - main.js
    this.hello = function() {
        console.log('hello');
    };

    this.goodbye = function() {
        console.log('bye');
    };
}

module.exports = myModule; // синтаксис CommonJS - эти данные на экспорт

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
const myModules = __webpack_require__(/*! ./main */ "./src/js/main.js"); //указываем откуда будем импортировать данные

const myModuleInstance = new myModules(); // создали объект, содержащий данные импортированные из другого файла js

//проверяем

myModuleInstance.hello();
myModuleInstance.goodbye();

// БРАУЗЕР НЕ ПОЙМЕТ, ЧТО МЫ ДЕЛАЕМ, НУЖЕН СБОРЩИК -   Webpack
/******/ })()
;
//# sourceMappingURL=bundle.js.map