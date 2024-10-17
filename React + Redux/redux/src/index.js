import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { createStore } from 'redux'

console.log('Hello!');
const initialState = {value: 0};

const reducer = (state = initialState, action) => { //не должно быть случайных чисел, работы с DOM, console.log, запросов на сервер
    // ничего такого, что может изменить четкую логику работы reducer.
    // также строго соблюдается иммутабельность state
    switch (action.type) {
        case 'INC':
            return { // так как state это объект, то возвращаем тоже объект. Он будет уже новый - соблюдена иммутабельность
                ...state, //для сохранения всех свойств исходного объекта - разворачиваем их в новый
                value: state.value + 1 //изменяем нужное свойство
            };
        case 'DEC':
            return {
                ...state, 
                value: state.value - 1
            };
        case 'RND':
            return {
                ...state, 
                value: state.value * action.payload // action.payload - это случайное число, но оно приходит извне в reducer. Это допускается
            }; 
        default:
            return state;
    }
}

const store = createStore(reducer);

const update = () => {
    document.getElementById('counter').textContent = store.getState().value;
}

store.subscribe(update)//подписка, срабатывает при каждом изменении state через dispatch

const inc = () =>  ({type: 'INC'}); // аналогично return {type: 'INC'}
const dec = () =>  ({type: 'DEC'});
const rnd = (value) =>  ({ type: 'RND', payload: value });


document.getElementById('inc').addEventListener('click', () => {
    store.dispatch(inc()); //изменение state
})
document.getElementById('dec').addEventListener('click', () => {
    store.dispatch(dec()); //изменение state
})
document.getElementById('rnd').addEventListener('click', () => {
    const value = Math.floor(Math.random()*10);
    store.dispatch(rnd(value)); //изменение state
})






/* let state = reducer(initialState, {type: 'INC'})
state = reducer(state, {type: 'INC'})
state = reducer(state, {type: 'INC'})
state = reducer(state, {type: 'INC'}) */

/* console.log(state); */

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
        <>

        </>
    </StrictMode>

);

// npm i redux react-redux
// Это установка двух пакетов - redux и react-redux
