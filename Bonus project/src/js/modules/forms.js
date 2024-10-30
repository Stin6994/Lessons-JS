import checkNumberInputs from './checkNumberInput';

const forms = (state) => {

    const form = document.querySelectorAll('form');
    const inputs = document.querySelectorAll('input');


    checkNumberInputs('input[name="user_phone"]');
  
    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    const postData = async (url, data) => {
        document.querySelector('.status').textContent = message.loading;
        let res = await fetch(url, {
            method: 'POST',
            body: data
        });

        return await res.text();
    }

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        });
    };

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);

            const formData = new FormData(item);
            if (item.getAttribute('data-calc') === 'end') { //условие касается только формы в конце расчета стоимости
                for (let key in state) {
                    formData.append(key, state[key]); //на сервер придут не только имя и телефон, но и данные полученные из модалки с расчетом стоимости
                }
            }
            
            postData('assets/server.php', formData)
                .then(res => {
                    console.log(res);
                    statusMessage.textContent = message.success;
                })
                .catch(() => statusMessage.textContent = message.failure)
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove()
                    }, 3000);
                });

        });
    });

};

export default forms;