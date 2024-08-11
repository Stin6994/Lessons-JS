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




      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React111
        </a>
      </header> */}
    </div>
  );
}


export {Header}
export default App;
