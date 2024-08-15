import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/emloyees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: 'Андреев Игорь', salary: 115000 + ' руб.', increase: false, id: 1},
                {name: 'Низамов Расул', salary: 140000 + ' руб.', increase: true, id: 2},
                {name: 'Спицын Сергей', salary: 150000 + ' руб.', increase: false, id: 3}
            ]
        }
    }

    render() {
        return (
            <div className="app">
                <AppInfo/>
                    <div className="search-panel">
                        <SearchPanel/>
                        <AppFilter/>
                    </div>
                <EmployeesList 
                data={this.state.data} 
                onDelete={id=>console.log(id)}/>
                <EmployeesAddForm/>
            </div>
        );
    }
}

export default App;