import {Component, StrictMode} from 'react'; //деструктуризация от React.Component
import logo from './logo.svg';
import './App.css';

const Header = () => {// с большой буквы,потому что это не переменная, а реакт компонент
  return <h2>Простейший реакт компонент</h2>
}

const Field = () => {
  const holder = 'Type here' // можно и атрибуты помещать извне при помощи {}
  //добавим инлайн стили (всегда при помощи объекта)
  const styleField = {
    width: '500px'
  };

  return <input placeholder={holder}
    type="text"
    style={styleField} />
}

// создаем такое же поле припомощи классов и наследования от библиотеки react

class FieldTwo extends Component { //из объекта React класс будет наследовать все необходимые вещи
  render() {
    const holder = 'Type here two'
    const styleField = {
      width: '800px'
    };

    return <input placeholder={holder}
    type="text"
    style={styleField} />
  }
}

function Btn() {
  const text = "button"
  const res = () => {
    return "button2"
  }
  const a = <h4>"button3"</h4>
  return <button>{text} {res()} {a} {5 + 6}</button> //можно передать как переменную, так и функцию, или даже другой элемент или выражение
}


function BtnTwo() {
  const text = 'Log in'
  const logged = false
  return <button>{logged ? text : "Enter"}</button> //целое условие выводим в кнопку
}

// Урок 126 - свойства компонентов

const Lesson126 = () => {
  return <h1>Урок 126 - свойства компонентов</h1>  
}

const Lesson129 = () => {
  return <h1>Урок 129 - состояние компонентов</h1>  
}

function WhoAmI (props) { //props - это объект со свойтсвами, 
  //которые мы будем подставлять в единый конструктор для его изменения 
  //например одинаковые карточки товаров с разным содержимым
  return (
    <div>
      <h1>My name is {props.name}, surname - {props.surname}</h1>
      <a href={props.link}>My profile</a>
    </div>
  )
}

function WhoAmITwo ({name, surname, link}) { // так как в аргументах будет объект - используем деструктуризацию
  //для упрощения и большей читабельности кода. НА выходе - аналогично получится
  return (
    <div>
      <h1>My name is {name}, surname - {surname}</h1>
      <a href={link}>My profile</a>
    </div>
  )
}

//Урок 129 - состояние компонентов

class WhoAmIThree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      years: 27
    }
  }


  nextYear = () => {
    console.log('test OK');
    this.setState({
      years: ++this.state.years
    })
  }


  render () {
    const {name, surname, link} = this.props;
    return (
      <div>
      <button onClick={this.nextYear}>btn</button>
      <h1>My name is {name}, surname - {surname}, age - {this.state.years}</h1>
      <a href={link}>My profile</a>
    </div>
    )
  }
}



function App() {
  return (
    <div className="App">
      <StrictMode>
      <Header />
      </StrictMode>
      
      <Field />
      <Btn />
      <BtnTwo />
      <FieldTwo/>

      <Lesson126/>
      <WhoAmI name='Igor' surname='Andreev' link='Facebook.com' />
      {/* Из этих аргументов получается объект, и которого уже и берутся необходимые свойства */}
      <WhoAmITwo name='Анечка' surname='Андреева' link='Facebook.com' />

      <Lesson129/>
      <WhoAmIThree name='Анечка' surname='Андреева' link='Facebook.com'/>

    </div>
  );
}


export {Header}
export default App;
