import { Component } from 'react';

import MarvelService from '../../services/MarvelService';
import mjolnir from '../../resources/img/mjolnir.png';

import './randomChar.scss';


class RandomChar extends Component {

    constructor(props) {
        super(props);
        this.updateChar();
    }

    state = { // все остояния будут получены через API. Изначально их нет, поэтому null
       /*  name: null,
        description: null, //описание
        thumbnail: null, //лого
        homepage: null, //инфа по кнопке
        wiki: null */ //инфа по кнопке

        //аналогично

        char: {}
    }

    marvelService = new MarvelService();

    onCharLoaded = (char) => { //если запрос прогрузился и получили персонажа, то записываем в состояние объект с данными
        this.setState({char}) //аналогично char: char
    }

    updateChar = () => {
        const id = Math.floor(Math.random()*(1011400 - 1011000) + 1011000);
        //случайный персонаж из ПРИМЕРНО всех. Слишком сложная и непонятная логика id для точного захвата всех
        this.marvelService
            .getCharacter(id)
            .then(this.onCharLoaded)
            // запрашиваем данные по персонажу, когда получаем - преобразуем в объект с нужными данными, 
            // записываем эти данные в состояние
    }

    render () {
        const {char: {name, description, thumbnail, homepage, wiki}} = this.state; //деструктуризация объекта изнутри объекта

        return (
            <div className="randomchar">
                <div className="randomchar__block">
                    <img src={thumbnail} alt="Random character" className="randomchar__img"/>
                    <div className="randomchar__info">
                        <p className="randomchar__name">{name}</p>
                        <p className="randomchar__descr">
                           {description}
                        </p>
                        <div className="randomchar__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

export default RandomChar;