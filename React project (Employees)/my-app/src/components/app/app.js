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
                {name: 'Андреев Игорь', salary: 115000 + ' руб.', increase: false, rise: true, id: 1},
                {name: 'Низамов Расул', salary: 140000 + ' руб.', increase: true, rise: false, id: 2},
                {name: 'Спицын Сергей', salary: 150000 + ' руб.', increase: false, rise: false, id: 3}
            ]
        }
        this.maxId = 4;
    }

    deleteItem = (id) => {
        this.setState(({data}) =>{ //чтобы удалить нужную строку, надо понять на строку с каким индексом мы нажали
            /* const index = data.findIndex(elem => elem.id === id); *///при нажатии будет перезаписывать 
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

    addItem = (name, salary) => {
        const newItem = {
            name, 
            salary,
            increase: false,
            rise: false,
            id: this.maxId++
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        });
    }
   
onToggleIncrease = (id) => {
    /* console.log(`Increase this ${id}`); */ //методы, которые будем передавать вниз по иерархии
    /* this.setState(({data}) => { */
            //первый способ
        /* const index = data.findIndex(elem => elem.id === id); //получаем индекс элемента, с которым будем работать
        const old = data[index]; //получили объект из data по индексу
        const newItem = {...old, increase: !old.increase};
            // создали новый объект (соблюдаем таким образом принцип иммутабельности)
            //конструкция {...old} - повторяет в новом оюъекте все свойста старого
            // после запятой - мы либо добавляем новые свойства, либо, если свойство повторяется, то оно перезаписывает одноименное
            //мы перезаписываем свойство increase на противоположное при клике
        console.log(newItem);
        const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
        console.log(newArr);
        return {
            data: newArr
        } */
            //второй способ

            //что происходит:
            //1) так как data - массив, можем исподьзовать map - вернет новый переработанный массив (иммутабельность)
            //2) мы перебираем все объекты внутри (item), пока не наткнемся на элемент с таким же id, на который кликнули
            //3) метод map переработает только этот объект, благодаря условию if (все свойства останутся, inrease поменяется)
            //4) По итогу map вернет новый массив в состояние, в нем поменяется только increase у того компонента, на который кликнули
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, increase: !item.increase}
                }
                return item;
            })
        }))
}

onToggleRise = (id) => {
    /* console.log(`Rise this ${id}`); */ //методы, которые будем передавать вниз по иерархии
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
                onDelete={this.deleteItem}
                onToggleIncrease={this.onToggleIncrease}
                onToggleRise={this.onToggleRise}/>
                <EmployeesAddForm onAdd={this.addItem}/>
            </div>
        );
    }
}

export default App;