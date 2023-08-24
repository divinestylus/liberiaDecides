const
    voteBtnEl = document.querySelector('.cta'),
    hamburgerMenu = document.querySelector('.fa-bars'),
    navBar = document.querySelector('.showMenu');

function voteNow() {
    window.location.href = '../form.html'
}
voteBtnEl.addEventListener('click', voteNow);

function displayNavigation() {
    navBar.classList.toggle('displayShowMenu');
    hamburgerMenu.classList.toggle('fa-times');
}
hamburgerMenu.addEventListener('click', displayNavigation);

