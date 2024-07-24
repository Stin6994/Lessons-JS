const forms = function () {
    const forms = document.querySelectorAll('form');

    const message = { // сообщения для юзера в разных ситуациях
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с Вами свяжемся',
        failure: 'Что-то пошло не так...'
    }

    forms.forEach(item => { // При заполнении любой формы будет происходить нижеперечисленное
        bindPostData(item);
    });

    const postData = async (url, data) => {   // async - говорит, что код должен будет обрабатываться не по порядку, а асинхронно, так как надо дождаться реакции сервера (при помощи await), прежде чем выполнять дальше
        // async и await всегда идут в паре
        const res = await fetch(url, { // await не дает создать переменную res до тех пор, пока не выполнится запрос на сервер
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: data
        });
        return await res.json();
    }


    function bindPostData(form) {
        form.addEventListener('submit', (e) => { //срабатывает когда мы пытемся оправить какую-то форму
            e.preventDefault(); // в AJAX запросах ставим вначале, чтобы отменить стандартное поведение браузера (перезагрузку при изменениях и отправке формы)

            const statusMessage = document.createElement('img'); // Добавляем блок с сообщением пользователю о статусе отправки данных
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
            `;

            form.insertAdjacentElement('afterend', statusMessage); // Для добавления после формы (снизу) в верстке, а не за ним горизонтально
            const formData = new FormData(form); // Это позволяет преобразовать данные от форм ввода в привычную форму объекта


            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            // Берем данные пользователя из заполненной формы
            // formData.entries() - превращает их в массив массивов [[ключ, значение], [ключ, значение]]
            // Object.fromEntries - превращает массив массивов в объект
            // JSON.stringify - преобразует объект в удобный формат JSON


            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success); // если все ок, то сообщение об успехе в форме
                    statusMessage.remove();
                }).catch(() => {
                    showThanksModal(message.failure); // если не ок
                }).finally(() => {
                    form.reset(); // в любом случае в конце чистим форму
                });


        });

        // Урок 84 - Красивое оповещение пользователя

        function showThanksModal(message) {  // новое модальное окно с благодарностью

            const prevModalDialog = document.querySelector('.modal__dialog'); //функционируем с имеющимся модальным окном
            prevModalDialog.classList.add('hide'); //временно скрываем его, чтобы не удалять и не создавать заново при новой необходимости
            openModal(); //создавали ранее, открывает модальное окно

            const thanksModal = document.createElement('div');
            thanksModal.classList.add('modal__dialog');
            thanksModal.innerHTML = `
    <div class="modal__content">
        <div class="modal__close" data-close>×</div>
        <div class="modal__title">${message}</div>
    </div>
    `;

            document.querySelector('.modal').append(thanksModal);

            setTimeout(() => {
                thanksModal.remove();
                prevModalDialog.classList.add('show');
                prevModalDialog.classList.remove('hide');
                closeModal();
            }, 4000);

        }

        //Урок 86 - Fetch API - примеры в предыдущих версиях


    };

}

module.exports = forms;