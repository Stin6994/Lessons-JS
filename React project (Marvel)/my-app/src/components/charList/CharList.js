import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';


import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMassage from '../errorMessage/ErrorMessage';

import './charList.scss';

const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(1549);
    const [charEnded, setCharEnded] = useState(false);

    const { loading, error, getAllCharacters } = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, []) //пустой массив - функция аналагичная componentDidMount запустится 1 раз в начале после рендеринга


    const onRequest = (offset, initial) => { // initial - для того, чтобы при дозагрузке персонажей появлялись новые, а не перерисовывались старые вместе с новыми
        initial ? setNewItemLoading(false) : setNewItemLoading(true); //
        getAllCharacters(offset, 6)
            .then(onCharListLoaded)

    }

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 6) {
            ended = true;
        }

        setCharList(charList => [...charList, ...newCharList]);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 6);
        setCharEnded(charEnded => ended);

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
                <CSSTransition key={item.id} timeout={500} classNames="char__item">
                    <li className="char__item"
                        tabIndex={0}
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
                </CSSTransition>

            )

        })


        // для центровки спиннера
        return (
            <ul className="char__grid">
                <TransitionGroup component={null}>
                    {cardCharList}
                </TransitionGroup>
            </ul>
        )
    }


    const items = view(charList);

    const errorMassage = error ? <ErrorMassage /> : null;
    const spinner = loading && !newItemLoading ? <Spinner /> : null; //когда загрузка, но первичная, а не новых компонентов


    return (
        <div className="char__list" >


            {errorMassage}
            {spinner}
            {items}

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