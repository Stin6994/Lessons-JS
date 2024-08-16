import { Component } from 'react';

import './search-panel.css';

class SearchPanel extends Component {
    constructor (props) {
        super(props);
        this.state = {
            term: ''
        }
    }

    onUpdate = (e) => {
        const term = e.target.value //когда начинается ввод - создается новая переменная, содержащая весь текущий ввод
        this.setState({term}) // ({term}) Аеалогично и сокращенно от ({term: term}) 
        //локально стстояние term
        this.props.onUpdateSearch(term)//Установили его же в App
    }

    render () {
        return (
            <input 
            type="text" 
            className="form-control search-input" //классы из bootstrap
            placeholder="Найти сотрудника"
            value={this.state.term}
            onChange={this.onUpdate}
            />
        );
    }
   
} 

export default SearchPanel;