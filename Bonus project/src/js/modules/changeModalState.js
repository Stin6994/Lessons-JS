import checkNumberInputs from './checkNumberInput';

const changeModalState = (state) => { //изначально state пустой, пока пользователь не начал заполнять расчетную форму. По мере заполнения будут добавляться свойства в объект
    const windowForm = document.querySelectorAll('.balcon_icons_img'),
        windowWidth = document.querySelectorAll('#width'),
        windowHeight = document.querySelectorAll('#height'),
        windowType = document.querySelectorAll('#view_type'),
        windowProfile = document.querySelectorAll('.checkbox');

    checkNumberInputs('#width');
    checkNumberInputs('#height');

    function bindActionsToElems(event, elem, prop) {
        elem.forEach((item, i) => {
            item.addEventListener(event, () => {
                /*    if (elem.length > 1) { //мы получили из DOM дерева через querySelectorAll массив. Если в нем больше одного элемента
                       state[prop] = i; // добавили первое свойство - выбранную форму окна. При клике на одну из форм в объекте будет прописываться ее индекс по порядку в свойстве form
                       // то есть это актуально при выборе формы окна. Она всегда только одна и мы запишем ее индекс 
                   } else {
                       state[prop] = item.value;
                       // Это актуально для длины и ширины. При вводе данных в объект будут прописываться эти данные в соответствующие поля
                   } */

                // через switch/case вычислим в какой элемент DOM дерева кликает пользователь и выполним определенные действия в зависимости от этого
                switch (item.nodeName) {
                    case 'SPAN':
                        state[prop] = i; // добавили первое свойство - выбранную форму окна. При клике на одну из форм в объекте будет прописываться ее индекс по порядку в свойстве form
                        // то есть это актуально при выборе формы окна. Она всегда только одна и мы запишем ее индекс
                        break;
                    case 'INPUT':
                        if (item.getAttribute('type') === 'checkbox') {
                            //так как чекбокса 2, применим условие для записи нужного в state
                            i === 0 ? state[prop] = 'Холодное' : state[prop] = 'Теплое';
                            //теперь уберем галочки со всех чекбоксов кроме выбранного, чтобы нельзя было ставить несколько галочек сразу
                            elem.forEach((box, j) => {
                                box.checked = false; // со всех снимаем галки
                                if (i == j) { //оставляем в том, который совпал с тем, который выбрал пользователь 
                                    box.checked = true;
                                }
                            })
                        } else {
                            state[prop] = item.value;
                       // Это актуально для длины и ширины. При вводе данных в объект будут прописываться эти данные в соответствующие поля
                        }
                        break;
                    case 'SELECT':                      
                        
                       // Также актуально для типа остекления, у него есть значение value в DOM-е. Например "Деревянное остекление"

                        state[prop] = item.value;
                        break;
                }

                console.log(state);
            });
        });
    }

    bindActionsToElems('click', windowForm, 'form');
    bindActionsToElems('input', windowHeight, 'height');
    bindActionsToElems('input', windowWidth, 'width');
    bindActionsToElems('change', windowType, 'type');
    bindActionsToElems('change', windowProfile, 'profile');
}

export default changeModalState;