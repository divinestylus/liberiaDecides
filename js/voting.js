/*============================
==============================
VOTING PAGE
==============================
=============================*/
AOS.init();

const
    backBtnEl = document.querySelector('.back-btn'),
    voteBtnEl = document.querySelector('.vote-btn'),
    voteBtnTextEl = document.querySelector('.vote-btn span'),
    candidateDisplayToVote = document.querySelector('.candidates-wrapper');

let
    profilePhoto = document.querySelector('.profile-photo'),
    voteCount = 0,
    presidentialData,
    senatorialData,
    representativeData;


localStorage.setItem('vote', voteCount);


function goBack() {
    window.history.back();
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


function getData() {
    fetch('./database/presidentialCandidate.json')
        .then(response => response.json())
        .then(data => {
            presidentialData = data;
            displayCandidatesHere();
        })
        .catch(error => {
            console.error(`Something went wrong: ${error}`)
        })

    fetch('./database/senatorialCandidate.json')
        .then(response => response.json())
        .then(data => {
            senatorialData = data;
            displayCandidatesHere();
        })
        .catch(error => {
            console.error(`Something went wrong: ${error}`)
        })

    fetch('./database/representativeCandidate.json')
        .then(response => response.json())
        .then(data => {
            representativeData = data;
            displayCandidatesHere();
        })
        .catch(error => {
            console.error(`Something went wrong: ${error}`)
        })
}
getData();


function displayCandidatesHere() {
    if (localStorage.getItem("category").toLowerCase() === "Senatorial".toLowerCase()) {
        displaySenatorialCandidates();
    }
    if (localStorage.getItem("category").toLowerCase() === "Representative".toLowerCase()) {
        displayRepresentativeCandidates();

    }
    if (localStorage.getItem("category").toLowerCase() === "Presidential".toLowerCase()) {
        displayPresidentialCandidtes();
    }
}


function displayPresidentialCandidtes() {
    candidateDisplayToVote.innerHTML = "";
    for (const group in presidentialData) {
        const aspirants = presidentialData[group];
        if (localStorage.getItem("selectedCandidate").toLowerCase() === aspirants[0].aspirant.toLowerCase()) {

            candidateDisplayToVote.innerHTML = `
            <div class="candidates-card">
                <img src="${aspirants[0].photo}">
                <div class="text">
                    <h2>${aspirants[0].aspirant}</h2>
                    <p class="position">${aspirants[0].position}</p>
                    <p class="party">${aspirants[0].party}</p>
                    <p class="vote-number">Vote #${aspirants[0].vote}</p>
                </div>
            </div>
            <div class="candidates-card">
                <!-- <img src="${aspirants[1].photo}"> -->
                <img src="./assets/user-icon.png" alt="Vice Standard Bearer Image">

                <div class="text">
                    <h2>${aspirants[1].aspirant}</h2>
                    <p class="position">${aspirants[1].position}</p>
                    <p class="party">${aspirants[1].party}</p>
                    <p class="vote-number">Vote #${aspirants[1].vote}</p>
                </div>
            </div>
            
            `;
        }
    }
}


function displaySenatorialCandidates() {
    candidateDisplayToVote.innerHTML = "";
    let aspirants = senatorialData;
    let counties = Object.entries(aspirants);
    switch (localStorage.getItem('registeredCounty')) {
        case 'bomi':
            counties = counties[0][1];
            break;
        case 'bong':
            counties = counties[1][1];
            break;
        case 'gbarpolu':
            counties = counties[2][1];
            break;
        case 'grandbassa':
            counties = counties[3][1];
            break;
        case 'grandcapemount':
            counties = counties[4][1];
            break;
        case 'grandgedeh':
            counties = counties[5][1];
            break;
        case 'grandkru':
            counties = counties[6][1];
            break;
        case 'lofa':
            counties = counties[7][1];
            break;
        case 'margibi':
            counties = counties[8][1];
            break;
        case 'maryland':
            counties = counties[9][1];
            break;
        case 'montserrado':
            counties = counties[10][1];
            break;
        case 'nimba':
            counties = counties[11][1];
            break;
        case 'rivergee':
            counties = counties[12][1];
            break;
        case 'rivercess':
            counties = counties[13][1];
            break;
        case 'sinoe':
            counties = counties[14][1];
            break;
    }
    for (let i = 0; i < counties.length; i++) {
        if (localStorage.getItem("selectedCandidate").toLowerCase() === counties[i].aspirant.toLowerCase()) {
            candidateDisplayToVote.innerHTML = `
                <div class="candidates-card">
                    <!-- <img src="${counties[i].photo}" alt="candidates-img"> -->
                    <img src="../assets/user-icon.png" alt="candidates-img">
                    <h2>${counties[i].aspirant}</h2>
                    <p class="position">${counties[i].county} County</p>
                    <p>${counties[i].party}</p>
                </div>
                `;
        }
    }
}



function displayRepresentativeCandidates() {
    candidateDisplayToVote.innerHTML = "";
    let aspirants = representativeData;
    let counties = Object.entries(aspirants);
    let selectedDistrict = `${localStorage.getItem('registeredDistrict')}`;
    switch (localStorage.getItem('registeredCounty')) {
        case 'bomi':
            counties = counties[0][1][selectedDistrict];
            break;
        case 'bong':
            counties = counties[1][1][selectedDistrict];
            break;
        case 'gbarpolu':
            counties = counties[2][1][selectedDistrict];
            break;
        case 'grandbassa':
            counties = counties[3][1][selectedDistrict];
            break;
        case 'grandcapemount':
            counties = counties[4][1][selectedDistrict];
            break;
        case 'grandgedeh':
            counties = counties[5][1][selectedDistrict];
            break;
        case 'grandkru':
            counties = counties[6][1][selectedDistrict];
            break;
        case 'lofa':
            counties = counties[7][1][selectedDistrict];
            break;
        case 'margibi':
            counties = counties[8][1][selectedDistrict];
            break;
        case 'maryland':
            counties = counties[9][1][selectedDistrict];
            break;
        case 'montserrado':
            counties = counties[10][1][selectedDistrict];
            break;
        case 'nimba':
            counties = counties[11][1][selectedDistrict];
            break;
        case 'rivergee':
            counties = counties[12][1][selectedDistrict];
            break;
        case 'rivercess':
            counties = counties[13][1][selectedDistrict];
            break;
        case 'sinoe':
            counties = counties[14][1][selectedDistrict];
            break;
    }
    for (let i = 0; i < counties.length; i++) {
        if (localStorage.getItem("selectedCandidate").toLowerCase() === counties[i].aspirant.toLowerCase()) {
            candidateDisplayToVote.innerHTML += `
                <div class="candidates-card">
                    <!-- <img src="${counties[i].photo}" alt="candidates-img"> -->
                    <img src="../assets/user-icon.png" alt="candidates-img">
                    <h2>${counties[i].aspirant}</h2>
                    <p class="position">District #${counties[i].district}</p>
                    <p>${counties[i].county} County <br> ${counties[i].party}</p>
                </div>
                `;
        }
    }
}