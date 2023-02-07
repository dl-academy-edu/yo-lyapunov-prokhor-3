
// querySelector() Функция, которая ищет элементы на странице.
// addEventListener() Функция, которая слушает ваши действия над элементом.
// classList Объект, внутри которого есть функции управляющие классами.
// add()  является функцией добавляющей доп. класс.
// Добавляет класс: searchElem.classList.add();
// Удаляет класс: searchElem.classList.remove();
// Если нет класса, добавляет, если есть, удаляет: searchElem.classList.toggle();
// Сообщает, есть ли класс у элемента: searchElem.classList.contains();

const popup = document.querySelector('.section-form'); // Первый poup
const buttonOpen = document.querySelector('.button-btn-js');// Первый poup
const buttonClose = document.querySelector('.button__close');// Первый poup
const popUp = document.querySelector('.poup'); // Второй poup
const btnOpen = document.querySelector('.button-btn__js');// Второй poup
const btnClose = document.querySelector('.button__close-js');// Второй poup
const btnSroll = document.querySelector('.btn__scroll-js') // Кнопка скролла


// Первый poup
buttonOpen.addEventListener('click', function() {
    popup.classList.add('open');
    emailInput.focus()
})

buttonClose.addEventListener('click', function() {
    popup.classList.remove('open');
})

window.addEventListener('keydown', function(event) {
    if (event.code === "Escape" && popup.classList.contains('open')) {
        popup.classList.remove('open');
    }
})
// Второй poup
btnOpen.addEventListener('click', function() {
    popUp.classList.add('open');
    emailInput.focus()
})
btnClose.addEventListener('click', function() {
    popUp.classList.remove('open');
})

window.addEventListener('keydown', function(event) {
    if (event.code === "Escape" && popUp.classList.contains('open')) {
        popUp.classList.remove('open');
    }
})

// Кнопка скролла
window.addEventListener('scroll', (e) => {
    const scrollTop = window.scrollY;
    console.log(srollTop);

    if(scrollTop >= 1500) {
        visuallyBtn();
    } else {
        notVisualyBtn();
    }
    btnScroll.addEventListener('click', scrollUp);
    // window.addEventListener('keydown', scrollUp);
})

// Отображение кнопки 
function visuallyBtn() {
    btnScroll.classList.remove('open');
}

// Скрывающая кнопку
function notVisuallyBtn() {
    btnSroll.classList.add('open');
}

// Сам скролл
function scrollUp() {
    console.log('scrollUp');
    closeModal()
    window.scrollTop ({
        top: 0,
        behavior: 'smooth',
    })
}


