function modal() {
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
        if (e.target === modal || e.target.getAttribute('data-close') == '') { // закрытие окна кликом на тёмную область или на крестик
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
}

module.exports = modal;