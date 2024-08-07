'use strict';

const btnPhone = document.querySelector('#iphone'),
    btnMacbook = document.querySelector('#macbook'),
    images = document.querySelectorAll('img');

let phoneAnimation;

btnPhone.addEventListener('click', () => {

    if (!phoneAnimation) { // если такой анимации еще не существует
            //создаем ее
        phoneAnimation = images[0].animate([ //задаем начальный, промежуточный и конечный этапы анимации
            { transform: 'translateY(0) rotate(0deg)',
                filter: 'opacity(100%)'
            },
            { transform: 'translateY(100px) rotate(180deg)',
                filter: 'opacity(50%)'
            },
            { transform: 'translateY(-100px) rotate(270deg)',
                filter: 'opacity(75%)'
            },
            { transform: 'translateY(0) rotate(360deg)',
                filter: 'opacity(100%)'
            }
        ], { //тут задаем свойства анимации из документации по необходимости
            duration: 3000, //продолжительность
            iterations: Infinity //количество повторений
        });
    } else if (phoneAnimation.playState === 'paused') {  //playState - метод, проверяющий текущее состояние анимации
        phoneAnimation.play(); //если она на паузе, то по клику на кнопку запускаем
    } else {
        phoneAnimation.pause(); //наоборот
    }
});


// КАРТИНКА НОУТБУКА В ПРОЕКТЕ ДЛЯ ТРЕНИРОВКИ
