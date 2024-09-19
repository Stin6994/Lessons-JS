import React, { Component, StrictMode, Fragment } from 'react'; //деструктуризация от React.Component
import ReactDOM from 'react-dom'
import styled from 'styled-components';


import './App.css';
import { Container } from 'react-bootstrap';
import BootstrapTest from './BootstrapTest';

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
  return <h4>Урок 126 - свойства компонентов</h4>
}

const Lesson129 = () => {
  return <h4>Урок 129 - состояние компонентов</h4>
}

const Lesson131 = () => {
  return <h4>Урок 131 - события в React </h4>
}

const Lesson136 = () => {
  return <h4>Урок 136 - React-фрагменты </h4>
}

const Lesson142 = () => {
  return <h4>Урок 142 - Styled Components </h4>
}

function WhoAmI(props) { //props - это объект со свойтсвами, 
  //которые мы будем подставлять в единый конструктор для его изменения 
  //например одинаковые карточки товаров с разным содержимым
  return (
    <div>
      <h4>My name is {props.name}, surname - {props.surname}</h4>
      <a href={props.link}>My profile</a>
    </div>
  )
}

function WhoAmITwo({ name, surname, link }) { // так как в аргументах будет объект - используем деструктуризацию
  //для упрощения и большей читабельности кода. НА выходе - аналогично получится
  return (
    <div>
      <h4>My name is {name}, surname - {surname}</h4>
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
        <h4>My name is {name}, surname - {surname}, age - {this.state.years}</h4>
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
    const { position, years, text } = this.state;
    return (
      //если оборачивать в простой div без классов, то в структуре появлется лишняя оболочка div
      <EmpItem active="true">
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
    color: ${props => props.active == "true" ? 'orange' : 'black'};
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


//Урок 155 - Вставка элементов через props.children

const Lesson155 = () => {
  return <h4>Урок 155 - Вставка элементов через props.children </h4>
}


const DynamicGreating = (props) => {
  return (
    <div className={'mb-3 p-3 border border-' + props.color}>
      {
        React.Children.map(props.children, child => {
          return React.cloneElement(child, { className: 'shadow p-3 m-3 border rounded' })
        })
      }
    </div>
  )
}


//Урок 156 - Специализация и наследование

const Lesson156 = () => {
  return <h4>Урок 156 - Специализация и наследование</h4>
}


const HelloGreating = () => {
  return (
    <div style={{ 'width': '600px', 'margin': '0 auto' }}>
      <DynamicGreating color={'primary'}>
        <h5>Hello world!</h5>
      </DynamicGreating>
    </div>
  )
}


//Урок 157 - Render-props паттерн

const Lesson157 = () => {
  return <h4>Урок 157 - Render-props паттерн</h4>
}

const Message = (props) => {
  return (
    <h3>The counter is {props.counter}</h3>
  )
}

class Counter extends Component {
  state = {
    counter: 0
  }

  changeCounter = () => {
    this.setState(({ counter }) => ({
      counter: counter + 1
    }))
  }

  render() {
    return (
      <>
        <button
          ClassName={'btn btn-primary'}
          onClick={this.changeCounter}>
          Click me
        </button>
        {this.props.render(this.state.counter)}
      </>
    )
  }
}


//Урок 158 - Что такое ref и зачем он нужен

const Lesson158 = () => {
  return <h4>Урок 158 - Что такое ref и зачем он нужен</h4>
}


class Form extends Component {
  myRef = React.createRef()


  /*  componentDidMount() {
     this.myRef.current.focus();
     //Установили фокус в первое поле при загрузке страницы/модального окна
   } */



  focusFirstInput = () => {
    this.myRef.current.focus();
    //при нажатии на второе поле - фокус уходит на первое
  }

  render() {
    return (
      <Container>
        <form className="w-50 border mt-5 p-3 m-auto">
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
            <input ref={this.myRef} type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
            <textarea onClick={this.focusFirstInput} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
          </div>
        </form>
      </Container>
    )
  }
}


const Lesson159 = () => {
  return <h4>Урок 159 - Порталы</h4>
}


class FormTwo extends Component {

  state = {
    advOpen: false
  }

  handleClick = () => {
    this.setState(({ advOpen }) => ({
      advOpen: !advOpen
    }))
  }

  componentDidMount() {

    setTimeout(this.handleClick, 3000);
  }

  render() {
    return (
      <Container>
        <form onClick={this.handleClick}
          className="w-50 border mt-5 p-3 m-auto"
          style={{
            'overflow': 'hidden',
            'position': 'relative'
          }}>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
          </div>

          {
            this.state.advOpen ?
              <Portal>
                <Msg />
              </Portal> :
              null
          }



        </form>
      </Container>
    )
  }
}

const Portal = (props) => {
  const node = document.createElement('div');
  document.body.appendChild(node);

  return ReactDOM.createPortal(props.children, node)
}

const Msg = () => {
  return (
    <div
      style={{
        'width': '500px',
        'height': '150px',
        'backgroundColor': 'red',
        'position': 'absolute',
        'right': '0px',
        'bottom': '0px'
      }}>
      Hello
    </div>
  )
}







function App() {
  return (
    <Wrapper>

      <Lesson158 />
      <Form />

      <Lesson159 />
      <FormTwo />


      {/*      <StrictMode>
        <Header />
      </StrictMode> */}
      {/* 
      <Field />
      <Btn />
      <BtnTwo />
      <FieldTwo />

      <Lesson126 />
      <WhoAmI name='Igor' surname='Andreev' link='Facebook.com' /> */}
      {/* Из этих аргументов получается объект, и которого уже и берутся необходимые свойства  */}
      {/*    <WhoAmITwo name='Анечка' surname='Андреева' link='Facebook.com' /> */}

      {/* <Lesson129 />
      <WhoAmIThree name='Анечка' surname='Андреева' link='Facebook.com' />

      <Lesson131 />
      <WhoAmIFour name='Анечка' surname='Андреева' />

      <Lesson136 />

      <Lesson142 />
      <WhoAmIFour name='Анечка' surname='Андреева' link='My profile.com' />

      <Lesson155 />
      <BootstrapTest
        left={
          <DynamicGreating color={'primary'}>
            <h5>This weel was hard</h5>
            <h5>Hello world!</h5>
          </DynamicGreating>
        }
        right={
          <DynamicGreating color={'primary'}>
            <h5>RIGHT!</h5>
          </DynamicGreating>
        }
      />


      <Lesson156 />
      <HelloGreating />

      <Lesson157 />
      <Counter render={counter => (
        <Message counter={counter} />
      )} /> */}


    </Wrapper>
  );
}


export { Header }
export default App;
