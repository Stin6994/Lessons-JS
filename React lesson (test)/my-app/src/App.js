import { Component, StrictMode, Fragment } from 'react'; //деструктуризация от React.Component
import styled from 'styled-components';

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

const Lesson131 = () => {
  return <h1>Урок 131 - события в React </h1>
}

const Lesson136 = () => {
  return <h1>Урок 136 - React-фрагменты </h1>
}

const Lesson142 = () => {
  return <h1>Урок 142 - Styled Components </h1>
}

function WhoAmI(props) { //props - это объект со свойтсвами, 
  //которые мы будем подставлять в единый конструктор для его изменения 
  //например одинаковые карточки товаров с разным содержимым
  return (
    <div>
      <h1>My name is {props.name}, surname - {props.surname}</h1>
      <a href={props.link}>My profile</a>
    </div>
  )
}

function WhoAmITwo({ name, surname, link }) { // так как в аргументах будет объект - используем деструктуризацию
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
      years: 27,
      text: 'Some Text'
    }
  }


  nextYear = () => {
    console.log('test OK');
    this.setState(state => ({ //не трогает свойство text, меняет только то, что мы заложили внутрь
      years: ++state.years
    }))
  }


  render() {
    const { name, surname, link } = this.props;
    return (
      <div>
        <button onClick={this.nextYear}>{this.state.text}</button>
        <h1>My name is {name}, surname - {surname}, age - {this.state.years}</h1>
        <a href={link}>My profile</a>
      </div>
    )
  }
}


// Урок 131 - события в React

// повторяю вышестоящий код и дополню

class WhoAmIFour extends Component {
  constructor(props) {
    super(props);
    this.state = {
      years: 27,
      text: 'Some Text',
      position: ''
    }
  }


  nextYear = () => {
    console.log('test OK');
    this.setState(state => ({ //не трогает свойство text, меняет только то, что мы заложили внутрь
      years: ++state.years
    }))
  }

  commitInputChanges = (e, color) => {
    console.log(color)
    console.log(e.target.value)
    this.setState({  //не используем стрелочеую функцию, потому что в этом случае при вводе текста в поле
      //нас не интересует, что до этого было в state (а там ничего и не было - position: '')
        position: e.target.value
    })
  }

  render() {
    const { name, surname, link } = this.props;
    const {position, years, text} = this.state;
    return (
      //если оборачивать в простой div без классов, то в структуре появлется лишняя оболочка div
      <EmpItem active> 
        <Button onClick={this.nextYear}>{text}</Button>
        <HeaderNew>My name is {name}, surname - {surname}, age - {years}, 
        position - {position}</HeaderNew>
        <a href={link}>My profile</a>
        <form>
          <span>Введите должность</span>
          <input type="text" onChange={(e) => this.commitInputChanges(e, 'some color')} /> 
        </form>
      </EmpItem>
    )
  }
}

//Урок 142 - Styled Components

const Wrapper = styled.div`
  width: 600px;
  margin: 80px auto 0 auto;
`;

const EmpItem = styled.div`
  padding: 20px;
  margin-bottom: 15px;
  border-radius: 5px;
  box-shadow: 5px 5px 10px rgba(0,0,0, .2);
  a {
    display: block;
    margin: 10px 0 10px 0;
    color: ${props => props.active ? 'orange' : 'black'};
  }
  input {
    display: block;
    margin-top: 10px;
  }
`;

const HeaderNew = styled.h2`
  font-size: 22px;
`;

export const Button = styled.button`
  display: block;
  padding: 5px 15px;
  background-color: gold;
  border: 1px solid rgba(0,0,0, .2);
  box-shadow: 5px 5px 10px rgba(0,0,0, .2);
`;

function App() {
  return (
    <Wrapper>
      <StrictMode>
        <Header />
      </StrictMode>

      <Field />
      <Btn />
      <BtnTwo />
      <FieldTwo />

      <Lesson126 />
      <WhoAmI name='Igor' surname='Andreev' link='Facebook.com' />
      {/* Из этих аргументов получается объект, и которого уже и берутся необходимые свойства */}
      <WhoAmITwo name='Анечка' surname='Андреева' link='Facebook.com' />

      <Lesson129 />
      <WhoAmIThree name='Анечка' surname='Андреева' link='Facebook.com' />

      <Lesson131 />
      <WhoAmIFour name='Анечка' surname='Андреева' />

      <Lesson136/>

      <Lesson142/>
      <WhoAmIFour name='Анечка' surname='Андреева' link='My profile.com'/>

    </Wrapper>
  );
}


export { Header }
export default App;
