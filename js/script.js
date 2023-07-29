/*============================
==============================
LANDING PAGE
==============================
=============================*/

const
    voteBtnEl = document.querySelectorAll('.cta'),
    hamburgerMenu = document.querySelector('.fa-bars'),
    navBar = document.querySelector('.showMenu');

function voteNow() {
    window.location.href = './form.html'
}
voteBtnEl.forEach(button => {
    button.addEventListener('click', voteNow);
})

function displayNavigation() {
    navBar.classList.toggle('displayShowMenu');
    hamburgerMenu.classList.toggle('fa-times');
}
hamburgerMenu.addEventListener('click', displayNavigation);

