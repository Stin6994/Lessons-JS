import { Component } from 'react';


import './employees-add-form.css';

class EmployeesAddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            salary: '',
            placeholderName:  "Как его зовут?",
            placeholderSalary: "З/П в руб.?"
        }
    }

    onValueChange = (e) => {
        this.setState({   // мы не привязаны к предыдущему состоянию, так как вводим в форму новые данные, поэтому без коллбек
            [e.target.name]: e.target.value  //проверяем атрибут name у инпута, в который вводим данные 
            //(они заранее названы идентично состояниям) и меняем состояние на вводимый текст
            //квадратные скобки нужны из-за особенностей синтаксиса ES6, иначе ругается
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.name.length >= 2 && this.state.salary.length >= 2) {
            this.props.onAdd(this.state.name, this.state.salary  + ' руб.');
            this.setState({
                name: '',
                salary: '',
                placeholderName:  "Как его зовут?",
                placeholderSalary: "З/П в руб.?"
            })
        } else {
            this.setState({
                name: '',
                salary: '',
                placeholderName: 'Минимальное количество символов - 2',
                placeholderSalary: 'Минимальное количество символов - 2'
            }) 
            setTimeout (() => {
                this.setState({
                    name: '',
                    salary: '',
                    placeholderName:  "Как его зовут?",
                    placeholderSalary: "З/П в руб.?"
                })
            }, 3000)
             
            
        }
    }

    render() {

        const { name, salary, placeholderName, placeholderSalary } = this.state;
       /*  const placeholderName = "Как его зовут?" */

        return (
            <div className="app-add-form">
                <h3>Добавьте нового сотрудника</h3>
                <form
                    className="add-form d-flex"
                    onSubmit={this.onSubmit}>
                    <input type="text"
                        className="form-control new-post-label"
                        placeholder={placeholderName}
                        name="name"
                        value={name} // value делает компонент управляемым, подчиняет его реакту и 
                        //позволяет мгновенно при рендеринге видеть текущее состояние и вносить изменения
                        //То есть мы можем прямо во время ввода данных производить какие-то операции над вводимым текстом,
                        //на этапе формирования виртуального DOM дерева 
                        // а без этого - только проверить уже написанный в основном DOM дереве


                        //добавили обработчик события и атрибут name, 
                        //совпадающий именем с состояниями, чтобы поптом отличить два инпута и изменять состояние
                        // в зависимости от того к кокому name происходит обращение
                        onChange={this.onValueChange} />

                    <input type="number"
                        className="form-control new-post-label"
                        placeholder={placeholderSalary}
                        name="salary"
                        value={salary}  // value делает компонент управляемым, подчиняет его реакту и 
                        //позволяет мгновенно при рендеринге видеть текущее состояние и вносить изменения
                        //То есть мы можем прямо во время ввода данных производить какие-то операции над вводимым текстом,
                        //на этапе формирования виртуального DOM дерева 
                        // а без этого - только проверить уже написанный в основном DOM дереве

                        //добавили обработчик события и атрибут name, 
                        //совпадающий именем с состояниями, чтобы поптом отличить два инпута и изменять состояние
                        // в зависимости от того к кокому name происходит обращение 
                        onChange={this.onValueChange} />

                    <button type="submit"
                        className="btn btn-outline-light">Добавить</button>
                </form>
            </div>
        );
    }
}

export default EmployeesAddForm;