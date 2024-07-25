import { getResources } from "../services/services";

const cards = function () {

    class MenuCard {
        constructor(src, alt, tittle, descr, price, parrentSelector, ...classes) { //Допустим хотим будущей карточке присвоить неизвестное количество дополнительных классов в будущем, используем rest оператор
            this.src = src;
            this.alt = alt;
            this.tittle = tittle;
            this.descr = descr;
            this.price = price;
            this.classes = classes; //не забываем добавить свойство - это будет массив, тк rest оператор отдает массив
            this.parrent = document.querySelector(parrentSelector);
            this.transfer = 91; //курс доллар/рубль
            this.changeToRub();
        }

        changeToRub() { // метод для конвертации валюты в рубль
            this.price *= this.transfer;
        }

        render() { //для добавления новой карточки на страницу в структуру html
            const element = document.createElement('div');

            if (this.classes.length === 0) { //если в rest не были вообще переданы аргументы, то добавляем класс, по умолчанию, без которого вообще никак, поедет верстка
                this.classes = 'menu__item';
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(className => element.classList.add(className)); // перебрали все элементы массива с классами (rest), каждый класс добавили к нашей карточке
            }


            element.innerHTML = `
                <img src= ${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.tittle}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> руб/день</div> 
                </div>
            `; // убрали <div class="menu__item">, этот и другие классы будем передавать при объявлении карточек в виде аргуметов в конце (rest)
            this.parrent.append(element); //добавляем новосозданный элемент div с карточкой в родительский блок всех карточек
        }
    }

    const deleteCard = document.querySelectorAll('.menu__item'); //удаляем старые карточки
    deleteCard.forEach(item => {
        item.remove();
    })



    getResources('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({ img, altimg, tittle, descr, price }) => {
                new MenuCard(img, altimg, tittle, descr, price, '.menu .container').render();
            });
        });

    // Урок 90 - Axios

    /*     axios.get('http://localhost:3000/menu')
            .then(data => {
                data.data.forEach(({ img, altimg, tittle, descr, price }) => {
                    new MenuCard(img, altimg, tittle, descr, price, '.menu .container').render();
                });
            }); */


    // ниже еще один способ динамической верстки на странице

    /*     getResources('http://localhost:3000/menu')
    .then(data => createCard(data));
    
    function createCard(data) {
        data.forEach(({img, altimg, tittle, descr, price}) => {
            const element = document.createElement('div');
            element.classList.add('menu__item');
            element.innerHTML = `
              <img src= ${img} alt=${altimg}>
                    <h3 class="menu__item-subtitle">${tittle}</h3>
                    <div class="menu__item-descr">${descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${price*91}</span> руб/день</div> 
                    </div>
            `
    
            document.querySelector('.menu .container').append(element);
        });
    }  */

}

export default cards;