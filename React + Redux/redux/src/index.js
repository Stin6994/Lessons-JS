import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { createStore, bindActionCreators } from 'redux'
import reducer from './reducer';

import App from './components/App';

import { Provider } from 'react-redux';


console.log('Hello!');


const store = createStore(reducer, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);


/* const update = () => {

} */

/* subscribe(update) *///подписка, срабатывает при каждом изменении state через dispatch


/* document.getElementById('inc').addEventListener('click', inc);
document.getElementById('dec').addEventListener('click', dec);
document.getElementById('rnd').addEventListener('click', () => {
    const value = Math.floor(Math.random()*10);
    rnd(value)//изменение state
}) */







const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
        {/*    <Counter
        counter={getState().value}
        inc={inc}
        dec={dec}
        rnd={() => {
            const value = Math.floor(Math.random()*10);
            rnd(value); 
        }}/> */}
        <Provider store={store}>
            <App />
        </Provider>
    </StrictMode>

);

// npm i redux react-redux
// Это установка двух пакетов - redux и react-redux
