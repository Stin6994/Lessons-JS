import { Component } from 'react';



import abyss from '../../resources/img/abyss.jpg';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';

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

   /*      const imgNotFound = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'

        if (!loading) {

            const bbb = !loading ? ttt : <Spinner />
        }
 */




        /*  const content = !loading ? <View char={char[0]} /> : null; */

        return (
            <div className="char__list" >
                <ul className="char__grid">
                    {!loading ? <View char={char} /> : <Spinner />}
                    {/* {!loading ? {ttt} : <Spinner />} */}
                  {/*   {bbb} */}

                    {/*                     <li className="char__item char__item_selected">
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
                    </li> */}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }

}

const View = ({ char }) => {
    /* const {char} = char; */
    const imgNotFound = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
    const ttt = char.map(({ name, thumbnail }) => {
        return (
            <li className="char__item">
                <img src={thumbnail} alt="abyss"
                    style={thumbnail === imgNotFound ? { objectFit: 'contain' } : null} />
                <div className="char__name">{name}</div>
            </li>
        )
        
    })
    return ttt
}



/*   char.forEach((char) => {
      const { name, thumbnail } = char
      return (
          <li className="char__item">
              <img src={thumbnail} alt="abyss"
                  style={thumbnail === imgNotFound ? { objectFit: 'contain' } : null} />
              <div className="char__name">{name}</div>
          </li>
      )
  }) */



/* const buttonsData = [
    { name: 'all', label: 'Все сотрудники', colored: false },
    { name: 'rise', label: 'На повышение', colored: false },
    { name: 'moreThen 120000', label: 'З/П выше 120 000 руб.', colored: true }
]; */

/* const buttons = buttonsData.map(({ name, label, colored }) => {
    const active = props.filter === name; // active будет true, если заданный фильтр будет равен какому-то из name кнопок
    const clazz = active ? 'btn-light' : 'btn-outline-light' // если active true, то один класс и наоборот
    const style = colored ? {color: 'red'}: null; //если true, то добавляем красный цвет, если false - ничего не делаем
    return (
        <button 
            className={`btn ${clazz}`} // в зависимости от выбранного фильтра будет либо активной либо нет
            type="button"
            key={name}
            onClick={() => props.onFilterSelect(name)}
            style={style}> 
            {label}
        </button>
    )
}) */
export default CharList;