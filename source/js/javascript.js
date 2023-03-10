
// querySelector() Функция, которая ищет элементы на странице.
// addEventListener() Функция, которая слушает ваши действия над элементом.
// classList Объект, внутри которого есть функции управляющие классами.
// add()  является функцией добавляющей доп. класс.
// Добавляет класс: searchElem.classList.add();
// Удаляет класс: searchElem.classList.remove();
// Если нет класса, добавляет, если есть, удаляет: searchElem.classList.toggle();
// Сообщает, есть ли класс у элемента: searchElem.classList.contains();

// Первый poup
(function() {
    const popup = document.querySelector('.form'); // Первый poup
    const buttonOpen = document.querySelector('.button-btn-js');// Первый poup
    const buttonClose = document.querySelector('.button__close');// Первый poup

buttonOpen.addEventListener('click', function() {
    popup.classList.add('open');
})

buttonClose.addEventListener('click', function() {
    popup.classList.remove('open');
})

window.addEventListener('keydown', function(event) {
    if (event.code === "Escape" && popup.classList.contains('open')) {
        popup.classList.remove('open');
    }
})

})();

// Второй poup
(function() {
    const popUp = document.querySelector('.poup'); // Второй poup
    const btnOpen = document.querySelector('.button-btn__js');// Второй poup
    const btnClose = document.querySelector('.button__close-js');// Второй poup


btnOpen.addEventListener('click', function() {
    popUp.classList.add('open');
})

btnClose.addEventListener('click', function() {
    popUp.classList.remove('open');
})

window.addEventListener('keydown', function(event) {
    if (event.code === "Escape" && popUp.classList.contains('open')) {
        popUp.classList.remove('open');
    }
})

})();

// Третий poup
(function() {
    const sendUp = document.querySelector('.send'); // Третий poup
    const sendOpen = document.querySelector('.footer__message-js');// Третий poup
    const sendClose = document.querySelector('.send__block-forms-js');// Третий poup


sendOpen.addEventListener('click', function() {
    sendUp.classList.add('open');
})

sendClose.addEventListener('click', function() {
    sendUp.classList.remove('open');
})

window.addEventListener('keydown', function(event) {
    if (event.code === "Escape" && sendUp.classList.contains('open')) {
        sendUp.classList.remove('open');
    }
})

})();


// Кнопка скролла
(function() {
    const btnScroll = document.querySelector('.btn__scroll-js') // Кнопка скролла

window.addEventListener('scroll', (e) => {
    const scrollTop = window.scrollY;
    console.log('scrollTop');

    if(scrollTop >= 1500) {
        visuallyBtn();
    } else {
        notVisuallyBtn();
    }
    btnScroll.addEventListener('click', scrollUp);
})

// Отображение кнопки 
function visuallyBtn() {
    btnScroll.classList.remove('btn__scroll-hidden');
}

// Скрывающая кнопку
function notVisuallyBtn() {
    btnScroll.classList.add('btn__scroll-hidden');
}

// Сам скролл
function scrollUp() {
    console.log('scrollUp');
    window.scrollTo ({
        top: 0,
        behavior: 'smooth',
    })
}

})();


