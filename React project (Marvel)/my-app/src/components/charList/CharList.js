import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMassage from '../errorMessage/ErrorMessage';

import './charList.scss';

const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(1549);
    const [charEnded, setCharEnded] = useState(false);

    const marvelService = new MarvelService();

    useEffect(() => {
        onRequest();
    }, []) //пустой массив - функция аналагичная componentDidMount запустится 1 раз в начале после рендеринга


    const onRequest = (offset) => {
        onCharListLoading();
        marvelService
            .getAllCharacters(offset)
            .then(onCharListLoaded)
            .catch(onError)
    }

    const onCharListLoading = () => {
        setNewItemLoading(true);
    }


    const onCharListLoaded = (newCharList) => {
        console.log('update');
        let ended = false;
        if (newCharList.length < 6) {
            ended = true;
        }

        setCharList(charList => [...charList, ...newCharList]);
        setLoading(false); // нам неважно какой раньше был loading, мы в любом случае ставим его в false на этом этапе, поэтому можеи передать только аргумент false
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 6);
        setCharEnded(charEnded => ended);

    }

    const onError = () => {
        setLoading(false);
        setError(true);
    }

    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    const view = (arr) => {

        const imgNotFound = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
        const cardCharList = arr.map((item, i) => {

            return (
                <li className="char__item"
                    tabIndex={0}
                    key={item.id}
                    ref={el => itemRefs.current[i] = el}
                    onClick={() => {
                        props.onCharSelected(item.id);
                        focusOnItem(i)
                    }}
                    onKeyPress={(e) => {
                        e.preventDefault()
                        if (e.key === ' ' || e.key === "Enter") {
                            props.onCharSelected(item.id);
                            focusOnItem(i);
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


    const items = view(charList);

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
                onClick={() => onRequest(offset)}
                style={{ 'display': charEnded ? 'none' : 'block' }}>
                <div className="inner">load more</div>
            </button>
        </div>
    )


}


CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}




export default CharList;


//npm install --save prop-types