'use strict';

const inputRub = document.querySelector('#rub');
const inputUsd = document.querySelector('#usd');

inputRub.addEventListener('input', () => {
    const request = new XMLHttpRequest();
    /* request.open(method, url, async, login, pass); */ //  пример аргуметов метода open, не все обязательные
    request.open('GET', 'js/current.json'); //используем только два основных аргумента
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8'); // добавляем заголовки
    request.send(); //теперь отправляем запрос

    // что мы получаем (свойства): 
    // status - 200, 300, 404 и тд., код ответа
    // statusText - ОК, и тд. текстовое описание статуса
    // response - ответ от сервера (его задал бэкенд разработчик)
    // readyState - на каком этапе сейчас запрос на сервер (статус готовности)

    request.addEventListener('readystatechange', () => {  //это событие отслеживает статус готовности запроса на данный момент
        if (request.readyState === 4 && request.status === 200) { //если текущий статус запроса - 4 ('DONE' - выполнено) и статус 200 - ОК, то ...
            console.log(request.response); // выводим в консоль ответ сервера
            const data = JSON.parse(request.response); // делаем из JSON удобный формат для операций в js
            console.log (data);
            inputUsd.value = (+inputRub.value / data.current.usd).toFixed(2); // расчет, toFixed(2) - это округление ответа до 2 знаков после запятой
        } else { // если с запросом что-то не так, нужно оставить пользователю подсказку, чтобы он не ждал
            inputUsd.value = 'Что-то пошло не так';
        }
    });

});