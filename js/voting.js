/*============================
==============================
VOTING PAGE
==============================
=============================*/

const
    backBtnEl = document.querySelector('.back-btn'),
    voteBtnEl = document.querySelector('.vote-btn'),
    voteBtnTextEl = document.querySelector('.vote-btn span');

let
    profilePhoto = document.querySelector('.profile-photo'),
    voteCount = 0;


localStorage.setItem('vote', voteCount);


function goBack() {
    window.location.href = "../candidates.html"
}
backBtnEl.addEventListener('click', goBack);


function vote() {
    voteCount++;
    localStorage.setItem('vote', voteCount);
    voteBtnEl.style.backgroundColor = "#8e8e8e";
    voteBtnTextEl.textContent = "Voted";
    voteBtnEl.disabled = true;
    voteBtnEl.style.cursor = "not-allowed";

}

voteBtnEl.addEventListener('click', vote);


function displayUserImg() {
    if (localStorage.getItem("userImage") !== null) {
        profilePhoto.src = localStorage.getItem("userImage");
    }
}


