import { Component } from 'react';

import './employees-list-item.css'


class EmployeesListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            increase: false,
            like: false
        }
    }


    render() {

        const {name, salary, onDelete} = this.props; //эти данные идут из заданных свойств (props)
        const {increase, like} = this.state; //эти из заданного стостояния (state)

        let classNames = 'list-group-item d-flex justify-content-between'; // берем все классы
        if (increase) { //проверяем true или false
            classNames += ' increase'; //добавляем новый класс
        }

        if (like) { //проверяем true или false
            classNames += ' like'; //добавляем новый класс
        }


        this.onIncrease = () => {
            // 1) сразу внутри аргументов производим деструктуризацию ({increase}) - дальше не надо будет писать state.increase
            // 2) используем стрелочную коллбек функцию, так как важно, какое было состояние до этого
            // 3) => ({ вот эта дополнительная круглая скобка заменяет слово return
            // 4) меняем булевое состояние на противоположное при нажатии
            this.setState(({increase}) => ({  
                increase: !increase
            }))
        }

        
        this.onLike = () => {
            // 1) сразу внутри аргументов производим деструктуризацию ({increase}) - дальше не надо будет писать state.increase
            // 2) используем стрелочную коллбек функцию, так как важно, какое было состояние до этого
            // 3) => ({ вот эта дополнительная круглая скобка заменяет слово return
            // 4) меняем булевое состояние на противоположное при нажатии
            this.setState(({like}) => ({  
                like: !like
            }))
        }


        return (
            <li className={classNames}>
                <span className="list-group-item-label" onClick={this.onLike}>{name}</span>
                <input type="text" className="list-group-item-input" defaultValue={salary} />
                <div className='d-flex justify-content-center align-items-center'>
                    <button type="button"
                        className="btn-cookie btn-sm "
                        onClick={this.onIncrease}>
                        <i className="fas fa-cookie"></i>
                    </button>

                    <button type="button"
                        className="btn-trash btn-sm "
                        onClick={onDelete}>
                        <i className="fas fa-trash"></i>
                    </button>
                    <i className="fas fa-star"></i>
                </div>
            </li>
        );
    }
}







//старая запись

/* const EmployeesListItem = ({name, salary, increase}) => {

    let classNames = 'list-group-item d-flex justify-content-between'; // берем все классы
    if (increase) { //проверяем true или false
        classNames += ' increase'; //добавляем новый класс
    }

    return (
        <li className={classNames}>
            <span className="list-group-item-label">{name}</span>
            <input type="text" className="list-group-item-input" defaultValue={salary} />
            <div className='d-flex justify-content-center align-items-center'>
                <button type="button"
                    className="btn-cookie btn-sm ">
                    <i className="fas fa-cookie"></i>
                </button>

                <button type="button"
                    className="btn-trash btn-sm ">
                    <i className="fas fa-trash"></i>
                </button>
                <i className="fas fa-star"></i>
            </div>
        </li>
    );
} */

export default EmployeesListItem;