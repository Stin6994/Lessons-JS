
import EmployeesListItem from '../employees-list-item/employees-list-item';
import './employees-list.css';


const EmployeesList = () => {
    return (
        <ul className="app-list list-group">
            <EmployeesListItem name='Андреев Игорь' salary={115000 + ' руб.'}/>
            <EmployeesListItem name='Низамов Расул' salary={140000 + ' руб.'}/>
            <EmployeesListItem name='Спицын Сергей' salary={150000 + ' руб.'}/>
        </ul>
    );
}

export default EmployeesList;