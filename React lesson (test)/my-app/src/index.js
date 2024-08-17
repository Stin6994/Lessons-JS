import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'; 

import styled from 'styled-components';
import BootstrapTest from './BootstrapTest';

import { Header } from './App';
import { Button } from './App';

import 'bootstrap/dist/css/bootstrap.min.css';

// Урок 121 - работа с препроцессором JSX



/* const elem = <h2>Hello World!</h2>; */ // первый способ создания - это раект элемент

/* const elem = React.createElement('h2', null, 'Hello World Two!'); */ //второй способ. null - класс, вместо него можно {className = 'some class'}

/* const text = "Some text"; */



/* const elemTwo = ( //можно в одном элементе только один див (корневой элемент). Внутри могут быть еще, а вот следом больше нет
  <div>
    <h2>Текст: {text}</h2> 
    <input type="text" />
    <button>Click</button>
  </div>

);
 */



/* const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
  <React.StrictMode>
    <App />
  </React.StrictMode>
); */

/* ReactDOM.render(
  elem,
  document.getElementById('root')
);
 */ //это для версии реакта ниже 18


 //Урок 123 - Элементы и компоненты React

const BigButton = styled(Button)`
  margin: 0 auto;
  width: 245px;
  text-align: center;
`;


 const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
  <StrictMode> 
    <App />
    <BigButton as="a"> Some Button </BigButton> 
    <BootstrapTest/>
 </StrictMode> 
  
  
);