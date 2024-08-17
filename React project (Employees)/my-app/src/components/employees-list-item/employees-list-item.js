

import './employees-list-item.css'


const EmployeesListItem = (props) => {

    const { name, salary, onDelete, onToggleProp, increase, rise } = props; //эти данные идут из заданных свойств (props)

    let classNames = 'list-group-item d-flex justify-content-between'; // берем все классы
    if (increase) { //проверяем true или false
        classNames += ' increase'; //добавляем новый класс
    }

    if (rise) { //проверяем true или false
        classNames += ' like'; //добавляем новый класс
    }

    return (
        <li className={classNames}>
            <span className="list-group-item-label" 
            onClick={onToggleProp} 
            data-toggle="rise"
            style={{fontSize: 35}}>{name}</span>
            <input type="text" className="list-group-item-input" defaultValue={salary} />
            <div className='d-flex justify-content-center align-items-center'>
                <button type="button"
                    className="btn-cookie btn-sm "
                    onClick={onToggleProp}
                    data-toggle="increase">
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