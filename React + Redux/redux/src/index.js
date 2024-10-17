import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { createStore, bindActionCreators} from 'redux'
import reducer from './reducer';
import * as actions from './action';



console.log('Hello!');


const store = createStore(reducer);

const {dispatch, subscribe, getState} = store;

const update = () => {
    document.getElementById('counter').textContent = getState().value;
}

subscribe(update)//подписка, срабатывает при каждом изменении state через dispatch

const {inc, dec, rnd} = bindActionCreators(actions, dispatch)

document.getElementById('inc').addEventListener('click', inc);
document.getElementById('dec').addEventListener('click', dec);
document.getElementById('rnd').addEventListener('click', () => {
    const value = Math.floor(Math.random()*10);
    rnd(value)//изменение state
})







const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
        <>

        </>
    </StrictMode>

);

// npm i redux react-redux
// Это установка двух пакетов - redux и react-redux
