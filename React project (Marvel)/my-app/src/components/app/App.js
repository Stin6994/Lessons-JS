import { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import CharListSecond from '../charListSecond/CharListSecond';

import decoration from '../../resources/img/vision.png';
import AppBanner from '../appBanner/AppBanner';

const App = () => {

    const [selectedChar, setChar] = useState(null); // выбрвнный персонаж (изначально никакой)


    const onCharSelected = (id) => {
        setChar(id);
    }

    return (
        <Router>
            <div className="app">
                <AppHeader />

                <main>
                    <Switch>
                        
                    <Route exact path="/">
                            <ErrorBoundary>
                                <RandomChar />
                            </ErrorBoundary>


                            <div className="char__content">
                                <ErrorBoundary>
                                    <CharList onCharSelected={onCharSelected} />
                                </ErrorBoundary>


                                <ErrorBoundary>
                                    <CharInfo charId={selectedChar} />
                                </ErrorBoundary>

                            </div>

                            <img className="bg-decoration" src={decoration} alt="vision" />
                        </Route>
                        
                        <Route exact path="/comics">
                            <AppBanner />
                            <ErrorBoundary>
                                <CharListSecond onCharSelected={onCharSelected} />
                            </ErrorBoundary>
                        </Route>


                        
                    </Switch>
                </main>

            </div>
        </Router>

    )
}

export default App;