const slider = function () {
    // Урок 92 - слайдер, второй вариант (карусель)

    const slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slidesWrapper).width;


    let slideIndex = 1;
    let offset = 0;


    if (slides.length < 10) { //чтобы индекс прописывался с 0 в начале, например 03, 07 и тд
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + '%'; // задаем ширину всей карусели (4 слайда)
    slidesField.style.display = 'flex'; // располагаем слайды в ряд по направлению карусели
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';


    slides.forEach(slide => { //каждый слайд остается с родной шириной, не растягивается на всю карусель - 400%
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'); //создаем список(ol - order-list) из точек навигации

    const dots = []; //создаем массив для точек

    indicators.classList.add('carousel-indicators'); // даем ему класс
    indicators.style.cssText = ` 
position: absolute;
right: 0;
bottom: 0;
left: 0;
z-index: 15;
display: flex;
justify-content: center;
margin-right: 15%;
margin-left: 15%;
list-style: none;
`; //классу присваиваем css свойства, можно просто сделать это в css

    slider.append(indicators); //помещаем индикаторы внутрь блока слайдера

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li'); //создаем точки по количеству слайдов (li - list-item)
        dot.setAttribute('data-slide-to', i + 1); // каждому слайду, начиная с 1 задаем аттрибут
        dot.style.cssText = `
box-sizing: content-box;
flex: 0 1 auto;
width: 30px;
height: 6px;
margin-right: 3px;
margin-left: 3px;
cursor: pointer;
background-color: #fff;
background-clip: padding-box;
border-top: 10px solid transparent;
border-bottom: 10px solid transparent;
opacity: .5;
transition: opacity .6s ease;
`;

        if (i == 0) {
            dot.style.opacity = 1;
        }

        indicators.append(dot); //добавляем точку в верстку
        dots.push(dot); // добавляем точку в массив
    }


    function slidesSetting() {
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = '.5'); // для изменения активного индикатора
        dots[slideIndex - 1].style.opacity = 1;
    }

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
        // +str.replace(/\D/g, '') - изначально строка, например "500px". Обрезаем рх, преобразуем в число
    }



    next.addEventListener('click', () => {
        if (offset == deleteNotDigits(width) * (slides.length - 1)) { //если текущее положение индекса конечное, то возвращаемся к начальному
            // +width.replace(/\D/g, '') - изначально строка, например "500px". Обрезаем рх, преобразуем в число
            offset = 0;
        } else {
            offset += deleteNotDigits(width); // если не конечное, слайдсмещается на величину слайда 
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        slidesSetting();

    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;
        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        slidesSetting();
    });

    // Урок 93 - навигация для слайдера

    dots.forEach(dot => {   // для перемещения по слайдам кликом по навигации
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');
            slideIndex = slideTo; // приравниваем индекс к выбранному слайду, чтобы все правила завязанные на индекс переформатировались под выбранный слайд
            offset = deleteNotDigits(width) * (slideTo - 1); //находим положение нужного слайда
            slidesField.style.transform = `translateX(-${offset}px)`; //перемещаем на нужный слайд

            slidesSetting();
        });
    });
}

module.exports = slider;