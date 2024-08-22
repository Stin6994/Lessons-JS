import { Component } from 'react';



import abyss from '../../resources/img/abyss.jpg';
import MarvelService from '../../services/MarvelService';

import './charList.scss';

class CharList extends Component {
    state = {
        char: {},
        loading: true,
        /* error: false */
    }

    marvelServiceOne = new MarvelService();

    componentDidMount() {
        /* console.log(this.state.char); */
        this.updateCharList();
        /* console.log('mount'); */
        console.log(this.state);

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
            char,
            loading: false

        })
        console.log('LOAD')
    }

    render() {

        //view, переработать в цикл список, исмользовать массив
        const { char, loading } = this.state
        /* const { name } = this.char[0] */
        /* const {thumbnail} = char */
    /*     !loading ? console.log(char[0]) : null; 
        !loading ? console.log(char[0].name) : null;  */
        /* const arr = !loading ? Object.entries(char[0]) : null; */
      /*   console.log(arr[2][1]) */
        const content = !loading ? <View char={char[0]} /> : null;

        return (
            <div className="char__list">
                <ul className="char__grid">
                    {content}
                    <li className="char__item char__item_selected">
                        <img src={abyss} alt="abyss" />
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss" />
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss" />
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss" />
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss" />
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss" />
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss" />
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss" />
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

const View = ({char}) => {
    const { name, description, thumbnail, homepage, wiki } = char
    console.log(name);
    return (
        <li className="char__item">
            <img src={thumbnail} alt="abyss" />
            <div className="char__name">{name}</div>
        </li>
    )
    
}

export default CharList;