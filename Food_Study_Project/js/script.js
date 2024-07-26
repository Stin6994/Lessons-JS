/* 'use strict'; */

console.log('hello111');

import 'es6-promise-polyfill'; 
import 'nodelist-foreach-polyfill';



import tabs from'./modules/tabs';
import modal from'./modules/modal';
import timer from'./modules/timer';
import cards from'./modules/cards';
import calc from'./modules/calc';
import forms from'./modules/forms';
import slider from'./modules/slider';
import { openModal } from './modules/modal';


document.addEventListener('DOMContentLoaded', () => {

    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 50000);

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    modal('[data-modal]', '.modal', modalTimerId );
    timer('.timer', '2024-08-31');
    cards();
    calc();
    forms('form', modalTimerId);
    slider({
        container: '.offer__slider',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        slide: '.offer__slide',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
        
});



// npx json-server db.json
// npx webpack
// npm install --save-dev @babel/core @babel/cli @babel/preset-env    - 
// npm i --save-dev babel-loader
// npm i --save-dev core-js
// npm i es6-promise-polyfill
// npm i nodelist-foreach-polyfill