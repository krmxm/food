function forms() {
    // Forms
    // используем объект XMLHttpRequest, будем отправлять данные в двух разных форматах

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => { // подвязываем на каждую форму функцию postData
        bindPpostData(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: data
        });

        return await res.json();
    };

    function bindPpostData(form) {
        form.addEventListener('submit', (e) => { 
        // навешивает обработчик события на форму, submit срабатывает, когда мы пытаемся отправить какую-то форму, клацаем на кнопку или нажимаем Enter, prevent - предотвращать
            e.preventDefault();
            // отменяем стандартное поведение браузера, именно эта команда первая должна идти в AJAX запросах

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            // form.append(statusMessage);
            form.insertAdjacentElement('afterend', statusMessage);



            /* request.setRequestHeader('Content-type', 'multipart/form-data'); 
            // заголовок для формы (когда мы используем связку XMLHttpRequest + FormData нам устанавливать заголовок не нужно, он установится автоматически) */

            // request.setRequestHeader('Content-type', 'application/json'); // для JSON нужен заголовок

            const formData = new FormData(form);
            // самый просто способ подготовить данные из формы для отправки (не JSON), аргумент - форма, из которой над нужно собрать данные

            // formData - специальный объект, который позволяет с определённой формы быстро сформироовать все данные, которые заполнил пользователь, формирует ключ-значение

            // в html у форм всегда должен быть атрибут name

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove(); // удаляет сообщение
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset(); // сбрасываем форму после успешной отправки
            });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        document.querySelector('.modal__dialog').classList.add('hide');
        openModal(); // ???

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
            document.querySelector('.modal__dialog').classList.add('show');
            document.querySelector('.modal__dialog').classList.remove('hide');
            closeModal(); // ???
        }, 4000);
    }
}

module.exports = forms;