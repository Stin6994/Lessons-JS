'use strict';

// Урок 115 - РАбота с готовым кодом (готовый tiny slider)

//1) npm install tiny-slider
//2)импорт модуля в наш проект:
import { tns } from "./node_modules/tiny-slider/src/tiny-slider" //из документации

//3) объявление из документации
tns({
    container: '.my-slider',
    items: 1,
    slideBy: 'page',
    autoplay: true
  });

  //4) webpack