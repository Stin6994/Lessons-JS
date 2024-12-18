import React, { Component, StrictMode, Fragment, useState, useEffect, useCallback, useMemo, useRef } from 'react'; //деструктуризация от React.Component
import { Transition, CSSTransition } from 'react-transition-group';
import { Formik, useFormik, Form, Field, ErrorMessage, useField } from 'formik';
import * as Yup from 'yup';
import ReactDOM from 'react-dom/client'
import styled from 'styled-components';


/* import './App.css'; */
/* import './modal.css'; */
import './form.scss';
import { Container } from 'react-bootstrap';
import BootstrapTest from './BootstrapTest';


const Header = () => {// с большой буквы,потому что это не переменная, а реакт компонент
  return <h2>Простейший реакт компонент</h2>
}

const MyField = () => {
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


class FormOne extends Component {
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


//Урок 162 - useState, 163 - useEffect, 164 - useCallback, 165 - useMemo

const LessonHooks = () => {
  return <h4>Урок 162, 163, 164, 165 - хуки </h4>
}



class Slider extends Component {

  constructor(props) {
    super(props);
    this.state = {
      autoplay: false,
      slide: 0
    }
  }

  /* componentDidMount() {
    document.title = `Slide: ${this.state.slide}`; //при загрузке title страницы становится таким
  }
  
  componentDidUpdate() {
    document.title = `Slide: ${this.state.slide}`; //меняется вместе с содержимым на странице через состояние
  }
   */
  changeSlide = (i) => {
    this.setState(({ slide }) => ({
      slide: slide + i
    }))
  }

  toggleAutoplay = () => {
    this.setState(({ autoplay }) => ({
      autoplay: !autoplay
    }))
  }

  render() {
    return (
      <Container>
        <div className="slider w-50 m-auto">
          <img className="d-block w-100" src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg" alt="slide" />
          <div className="text-center mt-5">Active slide {this.state.slide} <br /> {this.state.autoplay ? 'auto' : null}</div>
          <div className="buttons mt-3">
            <button
              className="btn btn-primary me-2"
              onClick={() => this.changeSlide(-1)}>-1</button>
            <button
              className="btn btn-primary me-2"
              onClick={() => this.changeSlide(1)}>+1</button>
            <button
              className="btn btn-primary me-2"
              onClick={this.toggleAutoplay}>toggle autoplay</button>
          </div>
        </div>
      </Container>
    )
  }
}


/* const calcValue = () => {
  console.log('random');

  return Math.random() * (50 - 1) + 1;
} */




const SliderTwo = (props) => {

  /* const [slide, setSlide] = useState(() => calcValue()); */
  const [slide, setSlide] = useState(0)
  const [autoplay, setAutoplay] = useState(false);

  function logging() {
    /* console.log('log!'); */
  }

  const getSomeImages = useCallback(() => {
    console.log('fetching');
    return [
      "https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg",
      "https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg"
    ]
  }, []); //если поставить зависимость от slide, каждый раз при изменения состояния будет идти новый запрос на сервер. Если этого не нужно, зависимость не ставим

  useEffect(() => {
    /* console.log('effect') */
    document.title = `Slide: ${slide}`;
    window.addEventListener('click', logging); //назначили обработчик события

    return () => {
      window.removeEventListener('click', logging);
    }

  }, [slide]) //функция будет работать только тогда, когда изменились состояния элементов массива [slide]

  useEffect(() => {
    /* console.log('autoplay') */
  }, [autoplay])


  function changeSlide(i) {
    setSlide(slide => slide + i);
    setSlide(slide => slide + i);
  }

  function toggleAutoplay() {
    setAutoplay(!autoplay)
  }

  const countTotal = (num) => {
    console.log('counting');
    return num + 10;
  }

  const total = useMemo(() => {
    return countTotal(slide)
  }, [slide]);

  const style = useMemo(() => ({
    color: slide > 4 ? 'red' : 'black'
  }), [slide])

  useEffect(() => {
    console.log('styled')
  }, [style]) //когда произошло изменение стиля - применился эффект, появился console.log

  return (
    <Container>
      <div className="slider w-50 m-auto">

        <Slide getSomeImages={getSomeImages} />

        <div className="text-center mt-5">Active slide {slide} <br /> {autoplay ? 'auto' : null} </div>
        <div style={style} className="text-center mt-5">Total sledes {total} </div>

        <div className="buttons mt-3">
          <button
            className="btn btn-primary me-2"
            onClick={() => changeSlide(-1)}>-1</button>
          <button
            className="btn btn-primary me-2"
            onClick={() => changeSlide(1)}>+1</button>
          <button
            className="btn btn-primary me-2"
            onClick={toggleAutoplay}>toggle autoplay</button>
        </div>
      </div>
    </Container>
  )
}

const Slide = ({ getSomeImages }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    setImages(getSomeImages());
  }, [getSomeImages]) //useEffect запускается только когда изменилось что-то в функции getSomeImages

  return (
    <>
      {images.map((url, i) => <img key={i} className="d-block w-100" src={url} alt="slide" />)}
    </>
  )

}


//Урок 166 - useRef

const Lesson166 = () => {
  return <h4>166 - useRef </h4>
}


const FormRef = () => {

  const [text, setText] = useState('');

  const myRef = useRef(1); //изначально тут ничего, а потом при рендеринге уже появится ссылка ref

  useEffect(() => {
    myRef.current = text;
  })

  /*   const focusFirstInput = () => {
      myRef.current.focus();
    } */

  return (
    <Container>
      <form className="w-50 border mt-5 p-3 m-auto">
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
          <input onChange={(e) => setText(e.target.value)} type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
          <textarea value={myRef.current} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>
      </form>
    </Container>
  )
}

//Урок 168 - создание собственных хуков

const Lesson168 = () => {
  return <h4>Урок 168 - создание собственных хуков </h4>
}

function useInputWithValidate(initialValue) {
  const [value, setValue] = useState(initialValue);

  const onChange = event => {
    setValue(event.target.value);
  }

  const validateInput = () => {
    return value.search(/\d/) >= 0 // возвращается условие. Возвращается по мере выполнения true/false
  }

  return { value, onChange, validateInput }  // равнозначно {value: value, onChange: onChange}
}

const FormMyHooks = () => {

  const [text, setText] = useState('');
  const [textArea, setTextArea] = useState('');

  const input = useInputWithValidate('');
  const area = useInputWithValidate('');

  const color = input.validateInput() ? 'text-danger' : null;

  return (
    <Container>
      <form className="w-50 border mt-5 p-3 m-auto">
        <div className="mb-3">
          <input value={`${input.value} / ${area.value}`} type="text" className="form-control" readOnly />
          <label htmlFor="exampleFormControlInput1" className="form-label mt-3">Email address</label>
          <input
            onChange={input.onChange}
            type="email"
            value={input.value}
            className={`form-control ${color}`}
            id="exampleFormControlInput1"
            placeholder="name@example.com" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
          <textarea
            onChange={area.onChange}
            value={area.value}
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"></textarea>
        </div>
      </form>
    </Container>
  )
}


//Урок 181 - Transition group

const Lesson181 = () => {
  return <h4>Урок 181 - Transition group </h4>
}

/* const Modal = (props) => {

  const duration = 300;

  const defaultStyle = {
    transition: `all ${duration}ms ease-in-out`,
    opacity: 0,
    visibility: "hidden"
  }

  const transitionStyles = {
    entering: { opacity: 1, visibility: "visible" },
    entered: { opacity: 1, visibility: "visible" },
    exiting: { opacity: 0, visibility: "hidden" },
    exited: { opacity: 0, visibility: "hidden" },
  };


  return (
    <Transition 
    in={props.show} 
    timeout={duration}
    onEnter={() => props.setShowTrigger(false)}
    onExited={() => props.setShowTrigger(true)}>
      {state => (
        <div className="modal mt-5 d-block" 
        style={{
          ...defaultStyle,
          ...transitionStyles[state]
        }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Typical modal window</h5>
                <button onClick={() => props.onClose(false)} type="button" className="btn-close" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <p>Modal body content</p>
              </div>
              <div className="modal-footer">
                <button onClick={() => props.onClose(false)} type="button" className="btn btn-secondary">Close</button>
                <button onClick={() => props.onClose(false)} type="button" className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Transition>

  )
}

function MyModal() {
  const [showModal, setShowModal] = useState(false);
  const [showTrigger, setShowTrigger] = useState(true);

  return (
    <Container>
      <Modal show={showModal} onClose={setShowModal} setShowTrigger={setShowTrigger}/>
      {showTrigger ? 
      
      <button
        type="button"
        className="btn btn-warning mt-5"
        onClick={() => setShowModal(true)}>Open Modal</button> :

        null}

    </Container>
  );
} */

const ModalCSS = (props) => {

  const duration = 500;

  return (
    <CSSTransition
      in={props.show}
      timeout={duration}
      onEnter={() => props.setShowTrigger(false)}
      onExited={() => props.setShowTrigger(true)}
      classNames="modal"
      mountOnEnter
      unmountOnExit>
      <div className="modal mt-5 d-block">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Typical modal window</h5>
              <button onClick={() => props.onClose(false)} type="button" className="btn-close" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>Modal body content</p>
            </div>
            <div className="modal-footer">
              <button onClick={() => props.onClose(false)} type="button" className="btn btn-secondary">Close</button>
              <button onClick={() => props.onClose(false)} type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>

  )
}

function MyModalCSS() {
  const [showModal, setShowModal] = useState(false);
  const [showTrigger, setShowTrigger] = useState(true);

  return (
    <Container>
      <ModalCSS show={showModal} onClose={setShowModal} setShowTrigger={setShowTrigger} />
      {showTrigger ?

        <button
          type="button"
          className="btn btn-warning mt-5"
          onClick={() => setShowModal(true)}>Open Modal</button> :

        null}

    </Container>
  );
}


//Урок 182 - Formik, Yup - формы

const Lesson182 = () => {
  return <h4>Урок 182 - Formik, Yup - формы</h4>
}

/* const validate = values => {
  const errors = {}

  if(!values.name) {
    errors.name = 'Обязательное поле!';
  } else if (values.name.length < 2) {
    errors.name = 'Минимум 2 символа!';
  }

  if(!values.email) {
    errors.email = 'Обязательное поле!';
  } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Неправильный email адрес!';
  }

  return errors;
} */

const MyTextInput = ({ label, ...props }) => {

  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.name}>{label}</label>
      <input {...props} {...field} />
      {meta.touched && meta.error ? (
        <div className='error'> {meta.error} </div>
      ) : null}
    </>
  )

}


const CustomForm = () => {

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        amount: 0,
        currency: '',
        text: '',
        terms: false
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .min(2, 'Минимум 2 символа!')
          .required('Обязательное поле!'),
        email: Yup.string()
          .email('Неправильный email адрес!')
          .required('Обязательное поле!'),
        amount: Yup.number()
          .min(5, 'Не менее 5')
          .required('Обязательное поле!'),
        currency: Yup.string()
          .required('Выберите валюту!'),
        text: Yup.string()
          .min(10, 'Не менее 10 символов'),
        terms: Yup.boolean()
          .required('Необходимо согласие!')
          .oneOf([true], 'Необходимо согласие!')
      })}
      onSubmit={values => console.log(JSON.stringify(values, null, 2))}
    >
      <Form className="form">

        <h2>Отправить пожертвование</h2>
{/*         <label htmlFor="name">Ваше имя</label>
        <Field
          id="name"
          name="name"
          type="text"
        />
        <ErrorMessage className="error" name="name" component="div" /> */}

        <MyTextInput
          label="Ваше имя"
          id="name"
          name="name"
          type="text"
        />

        <label htmlFor="email">Ваша почта</label>
        <Field
          id="email"
          name="email"
          type="email"
        />
        <ErrorMessage className="error" name="email" component="div" />

        <label htmlFor="amount">Количество</label>
        <Field
          id="amount"
          name="amount"
          type="number"

        />
        <ErrorMessage className="error" name="amount" component="div" />

        <label htmlFor="currency">Валюта</label>
        <Field
          id="currency"
          name="currency"
          as="select">
          <option value="">Выберите валюту</option>
          <option value="USD">USD</option>
          <option value="UAH">UAH</option>
          <option value="RUB">RUB</option>
        </Field>
        <ErrorMessage className="error" name="currency" component="div" />

        <label htmlFor="text">Ваше сообщение</label>
        <Field
          id="text"
          name="text"
          as="textarea"
        />
        <ErrorMessage className="error" name="text" component="div" />

        <label className="checkbox">
          <Field
            name="terms"
            type="checkbox"
          />
          Соглашаетесь с политикой конфиденциальности?
        </label>
        <ErrorMessage className="error" name="terms" component="div" />

        <button type="submit">Отправить</button>
      </Form>
    </Formik>
  )
}




function App() {
  /* const [slide, setSlide] = useState(true); */
  return (
    <Wrapper>

      <Lesson182 />
      <div className="myApp">
        <CustomForm />
      </div>

      {/*     <Lesson181 />
      <MyModalCSS /> */}


      {/*     <Lesson168 />
      <FormMyHooks /> */}

      {/* 
      <Lesson158 />
      <FormOne />

      <Lesson159 />
      <FormTwo /> */}

      {/* <LessonHooks />
      <Slider />
      <button onClick={() => setSlide(false)}>Click</button>
      {slide ? <SliderTwo /> : null} */}

      {/*  <Lesson166 />
      <FormRef /> */}

      {/*      <StrictMode>
        <Header />
      </StrictMode> */}
      {/* 
      <MyField />
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
