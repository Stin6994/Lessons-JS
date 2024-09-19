import { Component } from 'react';
import PropTypes from 'prop-types';

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
        offset: 1549,
        charEnded: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest();
    }

    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService
            .getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }


    onCharListLoaded = (newCharList) => {
        console.log('update');
        let ended = false;
        if (newCharList.length < 6) {
            ended = true;
        }

        this.setState(({ offset, charList }) => ({ // offset, charList - те свойства, которые зависят от предыдущих состояний, поэтому деструктурируем тут
            charList: [...charList, ...newCharList],  // при первом запуске отрисовки будет только 9 элементов, при втором старые элементы + еще 9 (по кнопке)
            loading: false,
            newItemLoading: false,
            offset: offset + 6,
            charEnded: ended
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

    itemRefs = [];

    setRef = (ref) => {
        this.itemRefs.push(ref);
    }

    focusOnItem = (id) => {
        this.itemRefs.forEach(item => item.classList.remove('char__item_selected'));
        this.itemRefs[id].classList.add('char__item_selected');
        this.itemRefs[id].focus();
    }

    view = (arr) => {

        const imgNotFound = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
        const cardCharList = arr.map((item, i) => {

            return (
                <li className="char__item"
                    tabIndex={0}
                    key={item.id}
                    ref={this.setRef}
                    onClick={() => {
                        this.props.onCharSelected(item.id);
                        this.focusOnItem(i)
                    }}
                    onKeyPress={(e) => {
                        e.preventDefault()
                        if (e.key === ' ' || e.key === "Enter") {
                            this.props.onCharSelected(item.id);
                            this.focusOnItem(i);
                        }
                    }}>
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

        const { charList, loading, error, newItemLoading, offset, charEnded } = this.state
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
                    onClick={() => this.onRequest(offset)}
                    style={{ 'display': charEnded ? 'none' : 'block' }}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }

}


CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}




export default CharList;


//npm install --save prop-types