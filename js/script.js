/*============================
==============================
HOME PAGE
==============================
=============================*/

const
    voteBtnEl = document.querySelectorAll('.button'),
    hamburgerMenu = document.querySelector('#header .wrapper svg'),
    navBar = document.querySelector('.navbar-menu-hamburger');



voteBtnEl.forEach(buttonEl => {
    buttonEl.addEventListener('click', voteNow);
})

hamburgerMenu.addEventListener('click', displayNavigation);

function voteNow() {
    window.location.href = '../form.html'
}

function displayNavigation() {
    navBar.classList.toggle('displayMenu');
}


