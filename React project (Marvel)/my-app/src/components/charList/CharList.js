import { Component } from 'react';


import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMassage from '../errorMessage/ErrorMessage';

import './charList.scss';

class CharList extends Component {
    state = {
        charList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 210
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.onCharListLoading();
        this.onRequest();
    }

    onRequest = (offset) => {
        this.marvelService
            .getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }

    onCharListLoading = () => {
        this.setState({
            newItemloading: true
        })
    }


    onCharListLoaded = (newCharList) => {
        console.log('update');
        this.setState(({offset, charList}) =>({ // offset, charList - те свойства, которые зависят от предыдущих состояний, поэтому деструктурируем тут
            charList: [...charList, ...newCharList],  // при первом запуске отрисовки будет только 9 элементов, при втором старые элементы + еще 9 (по кнопке)
            loading: false,
            newItemLoading: false,
            offset: offset + 9
        }))
        console.log('LOAD')
        /* console.log(charList) */
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    view = (arr) => {

        const imgNotFound = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
        const cardCharList = arr.map((item) => {

            return (
                <li className="char__item"
                    key={item.id}
                    onClick={() => this.props.onCharSelected(item.id)}>
                    <img src={item.thumbnail} alt={item.name}
                        style={item.thumbnail === imgNotFound ? { objectFit: 'unset' } : { objectFit: 'cover' }} />
                    <div className="char__name" style={{ fontSize: '16px' }}> {item.name}</div>
                </li>
            )

        })


        // для центровки спиннера
        return (
            <ul className="char__grid">
                {cardCharList}
            </ul>
        )
    }

    render() {

        const { charList, loading, error, newItemLoading, offset } = this.state
        const items = this.view(charList)

        const errorMassage = error ? <ErrorMassage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? items : null;



        return (
            <div className="char__list" >


                {errorMassage}
                {spinner}
                {content}

                <button className="button button__main button__long"
                    disabled={newItemLoading}
                    onClick={() => this.onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }

}







export default CharList;