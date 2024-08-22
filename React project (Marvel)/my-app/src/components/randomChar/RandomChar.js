import { Component } from 'react';

import Spinner from '../spinner/spinner';
import MarvelService from '../../services/MarvelService';
import mjolnir from '../../resources/img/mjolnir.png';
import ErrorMassage from '../errorMessage/ErrorMessage';

import './randomChar.scss';


class RandomChar extends Component {



    state = { // все остояния будут получены через API. Изначально их нет, поэтому null
        /*  name: null,
         description: null, //описание
         thumbnail: null, //лого
         homepage: null, //инфа по кнопке
         wiki: null */ //инфа по кнопке

        //аналогично

        char: {},
        loading: true,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
        /* console.log('mount'); */
    }
    /* 
        componentWillUnmount() {
            console.log('unmount');
        } */


    onCharLoaded = (char) => { //если запрос прогрузился и получили персонажа, то записываем в состояние объект с данными
       /*  console.log('update'); */
        this.setState({
            char,  //аналогично char: char
            loading: false
        })  //как только загрузка закончилась и в состояние передан объект с данными - 
        //значение загрузки становится false и спиннер заменяется данными

        /* console.log(char) */
    }



    updateChar = () => {

        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        //случайный персонаж из ПРИМЕРНО всех. Слишком сложная и непонятная логика id для точного захвата всех
        this.marvelService
            .getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError)

        this.setState({
            loading: true
        })
        // запрашиваем данные по персонажу, когда получаем - преобразуем в объект с нужными данными, 
        // записываем эти данные в состояние
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }



    render() {
       /*  console.log('render'); */
        const { char, loading, error } = this.state; //деструктуризация объекта изнутри объекта
        const errorMessage = error ? <ErrorMassage /> : null; //если ошибка - отрабатываем
        const spinner = loading ? <Spinner /> : null; // если загрузка - отрабатываем (спиннер)
        const content = !(loading || error) ? <View char={char} /> : null; // если не то и не то - рисуем данные

    

        return (
            <div className="randomchar">
                {errorMessage}
                {spinner}
                {content}
                {/*  // по порядку: сначала проверяем на ошибку, потом на загрузку данных, потом уже рисуем */}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br />
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main">
                        <div className="inner"
                            onClick={this.updateChar}>try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
                </div>
            </div>
        )
    }
}

const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki } = char
    const imgNotFound = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img" 
             /* verticalAlign={verticalAlign} horizontalAlign={horizontalAlign} */
             style={thumbnail === imgNotFound ? {objectFit: 'contain'} : null}/>
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
    )
}



export default RandomChar;