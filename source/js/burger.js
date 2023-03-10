(function() {
// Гамбургер!!!
const menuBtn = document.querySelector('.menu__btn');
const menu = document.querySelector('.menu');


menuBtn.addEventListener('click', function() {
    menuBtn.classList.toggle('active');
    menu.classList.toggle('active');
})

})();