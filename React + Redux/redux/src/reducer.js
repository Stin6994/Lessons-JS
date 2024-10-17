const initialState = {counter: 2, foo: 'bar'};

const reducer = (state = initialState, action) => { //не должно быть случайных чисел, работы с DOM, console.log, запросов на сервер
    // ничего такого, что может изменить четкую логику работы reducer.
    // также строго соблюдается иммутабельность state
    switch (action.type) {
        case 'INC':
            return { // так как state это объект, то возвращаем тоже объект. Он будет уже новый - соблюдена иммутабельность
                ...state, //для сохранения всех свойств исходного объекта - разворачиваем их в новый
                counter: state.counter + 1 //изменяем нужное свойство
            };
        case 'DEC':
            return {
                ...state, 
                counter: state.counter - 1
            };
        case 'RND':
            return {
                ...state, 
                counter: state.counter * action.payload // action.payload - это случайное число, но оно приходит извне в reducer. Это допускается
            }; 
        default:
            return state;
    }
}

export default reducer;