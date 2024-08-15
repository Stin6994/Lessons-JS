
import EmployeesListItem from '../employees-list-item/employees-list-item';
import './employees-list.css';


const EmployeesList = ({data, onDelete}) => { //Это data из App.js

    const elements = data.map(item => {
        const {id, ...itemProps} = item; //деструктуризация - отдельно айди и все остальные свойства
        return (
            <EmployeesListItem 
            key={id} 
            {...itemProps}
            onDelete={() => onDelete(id)}/> //мы делаем карточки, перебирая массив data
            //таким образом, будут автоматически созданы карточки из базы данных, а не объявлены каждая вручную.
         )
         //отдельно определяем свойство key, для того, чтобы реакт при изменении в каком-то элементе списка
         //не перерисовывал весь список, а только элемент по идентефикатору key
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