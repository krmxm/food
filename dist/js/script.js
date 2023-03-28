window.addEventListener('DOMContentLoaded', () => {

    // tabs

    const tabsParents = document.querySelector('.tabheader__items'),
          tabs = tabsParents.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.remove('show', 'fade');
            item.classList.add('hide');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');

        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParents.addEventListener('click', (e) => {
        const target = e.target;

        if(target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    // Timer

    // const deadline
    // 1 функция, которая будет устанавливать разницу getTimeRemaining
    // 2 функция, которая будет устанавливать таймер на страницу setTime
    // 3 функция, которая будет заниматься обновлением таймера updateClock

    
    const deadline = '2023-03-20';

    function getTimeRemaining(endtime) {
        let days, hours, minutes, seconds;

        const t = Date.parse(endtime) - Date.parse(new Date());
        
        if(t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24));
            hours = Math.floor((t / (1000 * 60 * 60)) % 24);
            minutes = Math.floor((t / (1000 * 60)) % 60);
            seconds = Math.floor((t / 1000) % 60);
        }

        return {
            total: t,
            days,
            hours,
            minutes,
            seconds
        };
    }

    function zero(num) {
        if(num > 0 && num <= 10) {
            return '0' + num;
        } else {
            return num;
        }
    }

    function setTime(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = zero(t.days);
            hours.innerHTML = zero(t.hours);
            minutes.innerHTML = zero(t.minutes);
            seconds.innerHTML = zero(t.seconds);

            if(t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setTime('.timer', deadline)

    // Modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal');

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
        
    });

    function openModal() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') { // закрытие окна кликом на тёмную область
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape") { // закрытие окна по клику клавиши, метод event
            closeModal(); 
        }
    });

    const modalTimerId = setTimeout(openModal, 300000);
    // Изменил значение, чтобы не отвлекало

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1){
            openModal();
            window.removeEventListener('scroll', showModalByScroll); // модальное окно один раз
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    // Используем классы для карточек

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector,  ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 37;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.classes = "menu__item";
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            
            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container',
        'menu__item',
        'big'
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        14,
        '.menu .container',
        'menu__item',
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    21,
        '.menu .container',
        'menu__item',
    ).render();
    
    // Forms
    // используем объект XMLHttpRequest, будем отправлять данные в двух разных форматах

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'Загрузка',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => { // подвязываем на каждую форму функцию postData
        postData(item);
    });

    function postData(form) {
        form.addEventListener('submit', (e) => { 
        // навешивает обработчик события на форму, submit срабатывает, когда мы пытаемся отправить какую-то форму, клацаем на кнопку или нажимаем Enter
            e.preventDefault();
            // отменяем стандартное поведение браузера, именно эта команда первая должна идти в AJAX запросах

            const statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            statusMessage.textContent = message.loading;
            form.append(statusMessage);

            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            // вначале всегда вызывается метод open, чтобы настроить этот запрос

            /* request.setRequestHeader('Content-type', 'multipart/form-data'); 
            // заголовок для формы (когда мы используем связку XMLHttpRequest + FormData нам устанавливать заголовок не нужно, он установится автоматически) */

            request.setRequestHeader('Content-type', 'application/json'); // для JSON нужен заголовок

            const formData = new FormData(form);
            // самый просто способ подготовить данные из формы для отправки (не JSON)

            // formData - специальный объект, который позволяет с определённой формы быстро сформироовать все данные, которые заполнил пользователь, формирует ключ-значение

            // в html у форм всегда должен быть атрибут name

            const object = {};
            formData.forEach(function(value, key) {
               object[key] = value; 
            }); // на основании значений в formData сформируем object, с которым мы можем использовать конвертацию JSON

            const json = JSON.stringify(object); // превращаем в формат json

            /* request.send(formData); // отправляем formDate */
            request.send(json); // отправляем json

            request.addEventListener('load', () => {
            // остлеживаем load, конечную загурзку нашего запросы
                if (request.status === 200) {
                    console.log(request.response);
                    showThanksModal(message.success);
                    form.reset(); // сбрасываем форму после успешной отправки
                    statusMessage.remove(); // сдаляет сообщение
                } else {
                    showThanksModal(message.failure);
                }
            });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.style.display = 'none';
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
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal(); // ???
        }, 4000);
    }
});
