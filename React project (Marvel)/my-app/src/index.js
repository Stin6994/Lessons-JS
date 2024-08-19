import React from 'react';
import ReactDOM from 'react-dom/client';

import App from "./components/app/App";
import MarvelService from './services/MarvelService';

import "./style/style.scss";

const marvelService = new MarvelService(); //создаем жкземпляр нашего класса

/* marvelService.getAllCharacters().then(res => console.log(res)); */
marvelService.getCharacter(1014992).then(res => console.log(res)); //все данные по id с сервера
marvelService.getAllCharacters().then(res => res.data.results.forEach(item => console.log(item.name))); // все имена из заданного диапазона


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);

