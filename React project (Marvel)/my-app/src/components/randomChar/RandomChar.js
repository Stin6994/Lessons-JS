import { useState, useEffect } from 'react';

import Spinner from '../spinner/spinner';
import useMarvelService from '../../services/MarvelService';
import mjolnir from '../../resources/img/mjolnir.png';
import ErrorMassage from '../errorMessage/ErrorMessage';

import './randomChar.scss';


const RandomChar = () => {


    const [char, setChar] = useState(null);

    const {loading, error, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateChar();
        const timerId = setInterval(updateChar, 60000);

        return () => {
            clearInterval(timerId)
        }
    }, [])


    const onCharLoaded = (char) => {
        setChar(char);
    }


    const updateChar = () => {
        clearError(); //если при предыдущем запросе была ошибка рандомного перса, то при выгрузке нового ошибка сбросится. Иначе вообще не даст выгружать
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        getCharacter(id)
            .then(onCharLoaded)
    }

    const errorMessage = error ? <ErrorMassage /> : null; //если ошибка - отрабатываем
    const spinner = loading ? <Spinner /> : null; // если загрузка - отрабатываем (спиннер)
    const content = !(loading || error || !char) ? <View char={char} /> : null; // если не то и не то - рисуем данные


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
                        onClick={updateChar}>try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
            </div>
        </div>
    )
}

const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki } = char
    const imgNotFound = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img"
                style={thumbnail === imgNotFound ? { objectFit: 'contain' } : null} />
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