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

    deleteItem = (id) => {
        this.setState(({data}) =>{ //чтобы удалить нужную строку, надо понять на строку с каким индексом мы нажали
            const index = data.findIndex(elem => elem.id == id);//при нажатии будет перезаписывать 
            //id строки из заданной в свойствах на порядковый номер в массиве (0,1,2...)
            
            //сейчас делаем удаление на основе принципов иммутабельности (нельзя изменять объект с данными в состоянии)
            //это приведет к багам. Нужно клонировать и отрисовывать модифицированный

            return { // изменяем состояние не внося изменения в существующий объект, а создавая новый
                // (метод filter создает новый массив с внесенными изменениями на основании прописанного фильтра)
                data: data.filter(item => item.id != id) //проверяем каждый элемент массива, отфильтровываем (по факту удаляем)
                //тот, у которого индекс совпадет при нажатии на корзину 
            }
        })
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
                onDelete={this.deleteItem}/>
                <EmployeesAddForm/>
            </div>
        );
    }
}

export default App;