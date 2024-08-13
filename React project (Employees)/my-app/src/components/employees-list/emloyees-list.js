
import EmployeesListItem from '../employees-list-item/employees-list-item';
import './employees-list.css';


const EmployeesList = ({data}) => { //Это data из App.js

    const elements = data.map(item => {
        return (
            <EmployeesListItem {...item}/> //мы делаем карточки, перебирая массив data
            //таким образом, будут автоматически созданы карточки из базы данных, а не объявлены каждая вручную.
         )
    })


    return (
        <ul className="app-list list-group">
            {elements} 
          {/*   <EmployeesListItem name='Андреев Игорь' salary={115000 + ' руб.'}/>
            <EmployeesListItem name='Низамов Расул' salary={140000 + ' руб.'}/>
            <EmployeesListItem name='Спицын Сергей' salary={150000 + ' руб.'}/> */}
        </ul>
    );
}

export default EmployeesList;