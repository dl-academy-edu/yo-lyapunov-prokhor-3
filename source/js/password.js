//Четвертый poup
(function() {
const password = document.querySelector('.password-js'); // Четвертый poup
const passOpen = document.querySelector('.password__form-open');// Четвертый poup
const passClose = document.querySelector('.password__form-close');// Четвертый poup


passOpen.addEventListener('click', function() {
    password.classList.add('open');
})

passClose.addEventListener('click', function() {
    password.classList.remove('open');
})

window.addEventListener('keydown', function(event) {
    if (event.code === "Escape" && password.classList.contains('open')) {
        password.classList.remove('open');
    }
})

})();

// Пятый poup
(function() {
const data = document.querySelector('.data'); // Четвертый poup
const dataOpen = document.querySelector('.data__form-open');// Четвертый poup
const dataClose = document.querySelector('.data__form-close');// Четвертый poup


dataOpen.addEventListener('click', function() {
    data.classList.add('open');
})

dataClose.addEventListener('click', function() {
    data.classList.remove('open');
})

window.addEventListener('keydown', function(event) {
    if (event.code === "Escape" && data.classList.contains('open')) {
        data.classList.remove('open');
    }
})

})();