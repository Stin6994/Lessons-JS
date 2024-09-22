import { Component, useState } from 'react';
import { Container } from 'react-bootstrap';
import './App.css';

class Slider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            autoplay: false,
            slide: 0
        }
    }

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

    return Math.random()* (50-1) + 1;
} */


/* const Slider = (props) => { */

    /*  const slideStateArray = useState(); //возвращается массив из 2 элементов - 1)текущее состояние  2)функция - действие с состоянием
     console.log(slideStateArray); */
/*     const [slide, setSlide] = useState(() =>calcValue());  */// 0 - начальное значение состояния
    // таких состояний можно создать сколько
/*     const [autoplay, setAutoplay] = useState(false); */

/*     function changeSlide(i) {
        setSlide(slide => slide + i);
        setSlide(slide => slide + i);
    } */

/*     function toggleAutoplay() {
        setAutoplay(!autoplay)
    } */

/*         const [state, setState] = useState({slide: 0, autoplay: false});

        function changeSlide(i) {
            setState(state => ({...state, slide: state.slide + i}));
        }
    
        function toggleAutoplay() {
            setState(state => ({...state, autoplay: !state.autoplay}));
        } */

/*     return (
        <Container>
            <div className="slider w-50 m-auto">
                <img className="d-block w-100" src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg" alt="slide" />
                <div className="text-center mt-5">Active slide {slide} <br /> {autoplay ? 'auto' : null} </div>

                <div className="buttons mt-3">
                    <button
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(-102)}>-1</button>
                    <button
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(102)}>+1</button>
                    <button
                        className="btn btn-primary me-2"
                        onClick={toggleAutoplay}>toggle autoplay</button>
                </div>
            </div>
        </Container>
    )
}
 */


/* const AppTwo = (props) => {

    const [number, setNumber] = useState(27);
    
      function inc() {
      setNumber(number => number + 1);
    } 
    
       function dec() {
      setNumber(number => number - 1);
    } 
    
       function reset() {
      setNumber(number => number = 0);
    } 
    
       function random() {
      setNumber(number => number = Math.floor(Math.random() * 51));
    } 
    
    return (
      <>
        <div className="app">
          <div className="counter">{number}</div>
          <div className="controls">
           <button onClick = {inc}>INC</button>
            <button onClick = {dec}>DEC</button>
            <button onClick = {random}>RND</button>
            <button onClick = {reset}>RESET</button>
          </div>
        </div>
        </>
      )
    
    } */

function App() {
    return (
        
        <Slider />
        
        
    )
}

export default App;
