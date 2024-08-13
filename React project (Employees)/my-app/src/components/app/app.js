
import './app.css';
import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/emloyees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';


function App () {

    const data = [
        {name: 'Андреев Игорь', salary: 115000 + ' руб.', increase: false, id: 1},
        {name: 'Низамов Расул', salary: 140000 + ' руб.', increase: true, id: 2},
        {name: 'Спицын Сергей', salary: 150000 + ' руб.', increase: false, id: 3}
    ];

    return (
        <div className="app">
            <AppInfo/>
                <div className="search-panel">
                    <SearchPanel/>
                    <AppFilter/>
                </div>
            <EmployeesList data={data} />
            <EmployeesAddForm/>
        </div>
    );
}

export default App;