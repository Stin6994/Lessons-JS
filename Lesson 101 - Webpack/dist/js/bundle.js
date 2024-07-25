/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ sayCat),
/* harmony export */   numberThree: () => (/* binding */ numberThree),
/* harmony export */   one: () => (/* binding */ one),
/* harmony export */   sayHi: () => (/* binding */ sayHi),
/* harmony export */   two: () => (/* binding */ two)
/* harmony export */ });
/* function myModule() { // эту функцию будем экспортировать  в другой js файл - main.js
    this.hello = function() {
        console.log('hello1');
    };

    this.goodbye = function() {
        console.log('bye');
    };
}

module.exports = myModule; */ // синтаксис CommonJS - эти данные на экспорт

// Урок 102 - ES6 Modules
// Синтаксис импорта/экспорта на ES6 

let one = 1; // первый способ

let two = 2; // второй


let numberThree = 3;


function sayHi() { //экспорт функции
    console.log('Hi!');
}

function sayCat() { //экспорт функции
    console.log('Cat');
}



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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main */ "./src/js/main.js");
/* const myModules = require('./main'); //указываем откуда будем импортировать данные

const myModuleInstance = new myModules(); // создали объект, содержащий данные импортированные из другого файла js

//проверяем

myModuleInstance.hello();
myModuleInstance.goodbye(); */

// БРАУЗЕР НЕ ПОЙМЕТ, ЧТО МЫ ДЕЛАЕМ, НУЖЕН СБОРЩИК - Webpack

// Урок 102 - ES6 Modules
// Синтаксис импорта/экспорта на ES6 
// опять же, браузер просто так не поймет, нужна сборка Webpack-ом

 //импорт

 // при импорте можно заменить название на более удобное

console.log(`${_main__WEBPACK_IMPORTED_MODULE_0__.one} and ${_main__WEBPACK_IMPORTED_MODULE_0__.two} and ${_main__WEBPACK_IMPORTED_MODULE_0__.numberThree}`); //использование

 //импорт всего

console.log(`${_main__WEBPACK_IMPORTED_MODULE_0__.numberThree} and ${_main__WEBPACK_IMPORTED_MODULE_0__.two} and ${_main__WEBPACK_IMPORTED_MODULE_0__.one}`);
_main__WEBPACK_IMPORTED_MODULE_0__.sayHi();

// обращение к default проще, добавляем такой статус в main.js и обращаемся к функциям следующим образом:


(0,_main__WEBPACK_IMPORTED_MODULE_0__["default"])();



/******/ })()
;
//# sourceMappingURL=bundle.js.map