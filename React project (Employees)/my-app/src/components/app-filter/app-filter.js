import './app-filter.css';

const AppFilter = () => {
    return (
        <div className="btn-group">  {/* bootstrap класс */}

            <button className="btn btn-light"
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
            </button>

        </div>
    );
}

export default AppFilter;