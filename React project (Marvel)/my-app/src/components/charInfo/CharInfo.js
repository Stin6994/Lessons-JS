import { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';

import setContent from '../../utils/setContent';


import './charInfo.scss';



const CharInfo = (props) => {


    const [char, setChar] = useState(null);



    const {getCharacter, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateChar();
    }, [props.charId])

    const updateChar = () => {
        clearError();
        const { charId } = props
        if (!charId) { // если элемент не выбран, используется скелетон
            return;
        }
        getCharacter(charId)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'))
    }


    const onCharLoaded = (char) => {
        setChar(char);
    }




/*     const skeleton = char || loading || error ? null : <Skeleton />
    const errorMessage = error ? <ErrorMassage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null; */

    return (
        <div className="char__info">
            {setContent(process, View, char)}
{/*         {skeleton}
            {errorMessage}
            {spinner}
            {content} */}
        </div>
    )


}


const View = ({ data }) => {

    const { name, description, thumbnail, homepage, wiki, comics } = data
    const imgNotFound = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={thumbnail === imgNotFound ? { objectFit: 'contain' } : { objectFit: 'cover' }} />
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

CharInfo.propTypes = {   //проверяем является ли пропс charId числом. Если нет - будет ошибка в консоли.
    charId: PropTypes.number
}

export default CharInfo;