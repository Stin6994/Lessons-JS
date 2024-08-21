import { Component } from 'react';



import abyss from '../../resources/img/abyss.jpg';
import MarvelService from '../../services/MarvelService';

import './charList.scss';

class CharList extends Component {
    state = { 
        char: {},
        /* loading: true,
        error: false */
    }

marvelServiceOne = new MarvelService();

componentDidMount() {
    /* console.log(this.state.char); */
    this.updateCharList();
    /* console.log('mount'); */
    console.log (this.state);
    
}

updateCharList = () => {

    this.marvelServiceOne
        .getAllCharacters()
        .then(this.onCharListLoaded)
       /*  .catch(this.onError) */
        /* console.log(this.char); */

  /*   this.setState({
        loading: true
    }) */

}

/* onError = () => {
    this.setState({
        loading: false,
        error: true
    })
} */

onCharListLoaded = (char) => { 
    console.log('update');
    this.setState({
        char 
        /* loading: false */
        
    }) 
    console.log(this.state)
}

    render () {

        //view, переработать в цикл список, исмользовать массив
        const {char} = this.state
        /* const {thumbnail} = char */
        console.log (this.state);

        return (
            <div className="char__list">
                <ul className="char__grid">
                    <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item char__item_selected">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
    
}

export default CharList;