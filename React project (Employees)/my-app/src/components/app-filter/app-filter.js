import './app-filter.css';

const AppFilter = (props) => {

    const buttonsData = [
        { name: 'all', label: 'Все сотрудники' },
        { name: 'rise', label: 'На повышение' },
        { name: 'moreThen 120000', label: 'З/П выше 120 000 руб.' }
    ];

    const buttons = buttonsData.map(({ name, label }) => {
        const active = props.filter === name; // active будет true, если заданный фильтр будет равен какому-то из name кнопок
        const clazz = active ? 'btn-light' : 'btn-outline-light' // если active true, то один класс и наоборот
        return (
            <button 
                className={`btn ${clazz}`} // в зависимости от выбранного фильтра будет либо активной либо нет
                type="button"
                key={name}
                onClick={() => props.onFilterSelect(name)}> 
                {label}
            </button>
        )
    })

    //вышеуказанные действия для того, чтобы автоматизировать создание n-количества одинаковых кнопок

    return (
        <div className="btn-group">  {/* bootstrap класс */}
            {buttons}

            {/*  <button className="btn btn-light"
            type="button">
                Все сотрудники
            </button>

            <button className="btn btn-outline-light"
            type="button">
                На повышение
            </button>

            <button className="btn btn-outline-light"
            type="button">
                З/П выше 120 000 руб.
            </button> */}

        </div>
    );
}

export default AppFilter;