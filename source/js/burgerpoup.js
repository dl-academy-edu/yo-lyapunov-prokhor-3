(function() {
    const burgPoup = document.querySelector('.form__js'); 
    const burPoupOpen = document.querySelector('.menu__list-open');
    const burPoupClose = document.querySelector('.button__close');

burPoupOpen.addEventListener('click', function() {
    burgPoup.classList.add('open');
})

burPoupClose.addEventListener('click', function() {
    burgPoup.classList.remove('open');
})

window.addEventListener('keydown', function(event) {
    if (event.code === "Escape" && burgPoup.classList.contains('open')) {
        burgPoup.classList.remove('open');
    }
})

})();

(function() {
    const register = document.querySelector('.poup__js-open'); 
    const registerPoupOpen = document.querySelector('.menu__list-register');
    const registerPoupClose = document.querySelector('.button__close');

registerPoupOpen.addEventListener('click', function() {
    register.classList.add('open');
})

registerPoupClose.addEventListener('click', function() {
    register.classList.remove('open');
})


window.addEventListener('keydown', function(event) {
    if (event.code === "Escape" &&  register.classList.contains('open')) {
        register.classList.remove('open');
    }
})

})();


