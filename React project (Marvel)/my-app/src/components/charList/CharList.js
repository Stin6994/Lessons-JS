import { Component } from 'react';


import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMassage from '../errorMessage/ErrorMessage';

import './charList.scss';

class CharList extends Component {
    state = {
        charList: [],
        loading: true,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        /* console.log(this.state.char); */
        this.updateCharList();
        /* console.log('mount'); */
        console.log(this.state);
        this.foo.bar = 0;
    }

    updateCharList = () => {

        this.marvelService
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

    onCharListLoaded = (charList) => {
        console.log('update');

    

        this.setState({
            charList,
            loading: false

        })

        console.log('LOAD')
        console.log(charList)
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

        const { charList, loading, error } = this.state
        const items = this.view(charList)

        const errorMassage = error ? <ErrorMassage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? items : null;



        return (
            <div className="char__list" >


                {errorMassage}
                {spinner}
                {content}

                {/* {!loading ? <View charList={charList} /> : <Spinner />} */}



                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }

}







export default CharList;