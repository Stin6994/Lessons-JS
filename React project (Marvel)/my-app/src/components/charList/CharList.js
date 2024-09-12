import { Component } from 'react';


import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMassage from '../errorMessage/ErrorMessage';

import './charList.scss';

class CharList extends Component {
    state = {
        char: {},
        loading: true,
        error: false
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
            .catch(this.onError)
        /* console.log(this.char); */

        /*   this.setState({
              loading: true
          }) */

    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    onCharListLoaded = (char) => {
        console.log('update');

        char.forEach((elem, index) => {  //для присваивания id
            elem.id = index
        });

        this.setState({
            char,
            loading: false

        })

        console.log('LOAD')
        console.log(char)
    }

    render() {

        const { char, loading, error } = this.state

        const errorMassage = error ? <ErrorMassage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? <View char={char} /> : null;



        return (
            <div className="char__list" >

        
                    {errorMassage}
                    {spinner}
                    {content}

                    {/* {!loading ? <View char={char} /> : <Spinner />} */}
            


                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }

}

const View = ({ char }) => {

    const imgNotFound = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
    const cardCharList = char.map(({ name, thumbnail, id }) => {

        return (
            <li className="char__item" key={id}>
                <img src={thumbnail} alt={name}
                    style={thumbnail === imgNotFound ? { objectFit: 'unset' } : { objectFit: 'cover' }} />
                <div className="char__name" style={{ fontSize: '16px' }}> {name}</div>
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



export default CharList;