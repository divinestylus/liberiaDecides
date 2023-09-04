/*============================
==============================
CANDIDATES PAGE
==============================
=============================*/

const
    candidateDisplay = document.querySelector('.candidates-display'),
    searchField = document.querySelector('#search-and-result input');

let
    candidatesCategories = document.querySelectorAll('.sidebar-card'),
    profilePhoto = document.querySelector('.profile-photo'),
    presidentialData,
    senatorialData,
    representativeData,
    candidatesName;

function getData() {
    fetch('./database/presidentialCandidate.json')
        .then(response => response.json())
        .then(data => {
            presidentialData = data;
            displayCandidates();
        })
        .catch(error => {
            console.error(`Something went wrong: ${error}`)
        })

    fetch('./database/senatorialCandidate.json')
        .then(response => response.json())
        .then(data => {
            senatorialData = data;
            displayCandidates();
        })
        .catch(error => {
            console.error(`Something went wrong: ${error}`)
        })

    fetch('./database/representativeCandidate.json')
        .then(response => response.json())
        .then(data => {
            representativeData = data;
            displayCandidates();
        })
        .catch(error => {
            console.error(`Something went wrong: ${error}`)
        })
}
getData();

function displayUserImg() {
    if (localStorage.getItem("userImage") !== null) {
        profilePhoto.src = localStorage.getItem("userImage");
    }
}
displayUserImg();

function displayCandidates() {
    let previousCategory = null;
    displayPresidentialCandidates();
    candidatesCategories = Array.from(candidatesCategories);
    if (candidatesCategories.length > 0) {
        candidatesCategories[0].classList.add('active-sidebar-card');
    }
    candidatesCategories.forEach(categories => {
        categories.addEventListener('click', (e) => {
            let category = e.currentTarget.firstElementChild.lastElementChild;
            if (category.textContent.toLowerCase() === "Senatorial".toLowerCase()) {
                displaySenatorialCandidates();
            }
            else if (category.textContent.toLowerCase() === "Representative".toLowerCase()) {
                displayRepresentativeCandidates();

            } else {
                displayPresidentialCandidates();
            }
            if (previousCategory !== null) {
                previousCategory.classList.remove('active-sidebar-card');
            }
            candidatesCategories[0].classList.remove('active-sidebar-card');
            categories.classList.add('active-sidebar-card');
            previousCategory = categories;
        })

    })
}

function displayPresidentialCandidates() {
    candidateDisplay.innerHTML = "";
    for (const group in presidentialData) {
        const aspirants = presidentialData[group];
        if (aspirants.length > 0) {
            const firstAspirant = aspirants[0];
            candidateDisplay.innerHTML += `
                <div class="candidates-card">
                    <img src="${firstAspirant.photo}" alt="candidates-img">
                    <h2>${firstAspirant.aspirant}</h2>
                    <p class="position">${firstAspirant.position}</p>
                    <p>${firstAspirant.party}</p>
                </div>
                `;
        }
    }
    candidatesName = document.querySelectorAll('.candidates-card h2');
    searchCandidates(candidatesName);
}

function displaySenatorialCandidates() {
    candidateDisplay.innerHTML = "";
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
        candidateDisplay.innerHTML += `
            <div class="candidates-card">
                <!-- <img src="${counties[i].photo}" alt="candidates-img"> -->
                <img src="./assets/user-icon.png" alt="candidates-img">
                <h2>${counties[i].aspirant}</h2>
                <p class="position">${counties[i].county} County</p>
                <p>${counties[i].party}</p>
            </div>
            `;
    }
    candidatesName = document.querySelectorAll('.candidates-card h2');
    searchCandidates(candidatesName);
}

function displayRepresentativeCandidates() {
    candidateDisplay.innerHTML = "";
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
        candidateDisplay.innerHTML += `
            <div class="candidates-card">
                <!-- <img src="${counties[i].photo}" alt="candidates-img"> -->
                <img src="./assets/user-icon.png" alt="candidates-img">
                <h2>${counties[i].aspirant}</h2>
                <p class="position">District #${counties[i].district}</p>
                <p>${counties[i].county} County <br> ${counties[i].party}</p>
            </div>
            `;
    }
    candidatesName = document.querySelectorAll('.candidates-card h2');
    searchCandidates(candidatesName);
}


function searchCandidates(candidatesData) {
    for (let i = 0; i < candidatesData.length; i++) {
        searchField.addEventListener('keyup', () => {
            if (candidatesData[i].textContent.toLowerCase().includes(searchField.value.toLowerCase())) {
                candidatesData[i].parentElement.style.display = "block";
            } else {
                candidatesData[i].parentElement.style.display = "none";
            }
        })
    }
}


