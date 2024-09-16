import { Component } from 'react';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMassage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';


import './charInfo.scss';
import thor from '../../resources/img/thor.jpeg';


class CharInfo extends Component {

    state = {
        char: null,
        loading: false,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.charId !== prevProps.charId) { // ВАЖНО!!! Обязательно использовать prev аргументы, без них будет бесконечная перерисовка и запросы на сервер
            this.updateChar();
        }
    }

    updateChar = () => {
        const { charId } = this.props
        if (!charId) { // если элемент не выбран, используется скелетон
            return;
        }

        this.onCharLoading();

        this.marvelService
            .getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError);

        this.foo.bar = 0; //несуществующее свойство
    }


    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false
        })
    }

    onCharLoading = () => {
        this.setState({
            loading: true
        })
    }


    render() {
        const { char, loading, error } = this.state

        const skeleton = char || loading || error ? null : <Skeleton />
        const errorMessage = error ? <ErrorMassage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error || !char) ? <View char={char} /> : null;

        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }

}


const View = ({ char }) => {

    const { name, description, thumbnail, homepage, wiki, comics } = char
    const imgNotFound = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={thumbnail === imgNotFound ? { objectFit: 'contain' } : { objectFit: 'cover' }}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">Homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">

                {comics.length > 0 ? null : 'There is no comics with this character'}

                {
                    comics.map((item, i) => {

                        if (i > 9) return;  //по макету - не больше 10 комиксов подгружается

                        return (
                            <li className="char__comics-item"
                                key={i}>
                                {item.name}
                            </li>
                        )
                    })
                }

            </ul>
        </>
    )
}

export default CharInfo;