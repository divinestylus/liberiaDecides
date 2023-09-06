/*============================
==============================
CANDIDATES PAGE
==============================
=============================*/

const
    candidateDisplay = document.querySelector('.candidates-display'),
    searchField = document.querySelector('#search-and-result input'),
    resultBtn = document.querySelector('.view-result');

let
    candidatesCategories = document.querySelectorAll('.sidebar-card'),
    profilePhoto = document.querySelector('.profile-photo'),
    presidentialData,
    senatorialData,
    representativeData,
    candidatesName,
    candidatesCard;


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


function viewResult() {
    window.location.href = "./results.html";
}
resultBtn.addEventListener('click', viewResult);


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
        localStorage.setItem('category', "Presidential");

    }
    candidatesCategories.forEach(categories => {
        categories.addEventListener('click', (e) => {
            let category = e.currentTarget.firstElementChild.lastElementChild;
            if (category.textContent.toLowerCase() === "Senatorial".toLowerCase()) {
                localStorage.setItem('category', category.textContent);
                displaySenatorialCandidates();
            }
            else if (category.textContent.toLowerCase() === "Representative".toLowerCase()) {
                localStorage.setItem('category', category.textContent);
                displayRepresentativeCandidates();

            } else {
                localStorage.setItem('category', "Presidential");
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
                <div class="candidates-card" data-aos="fade-up" data-aos-duration="1000">
                    <img src="${firstAspirant.photo}" alt="candidates-img">
                    <h2 data-category="Presidential">${firstAspirant.aspirant}</h2>
                    <p class="position">${firstAspirant.position}</p>
                    <p>${firstAspirant.party}</p>
                </div>
                `;
        }
    }
    candidatesName = document.querySelectorAll('.candidates-card h2');
    searchCandidates(candidatesName);
    candidatesCard = document.querySelectorAll('.candidates-card');
    displayCandidatesToVote(candidatesCard);
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
            <div class="candidates-card" data-aos="fade-up" data-aos-duration="1000">
                <!-- <img src="${counties[i].photo}" alt="candidates-img"> -->
                <img src="./assets/user-icon.png" alt="candidates-img">
                <h2 data-category="Senatorial">${counties[i].aspirant}</h2>
                <p class="position">${counties[i].county} County</p>
                <p>${counties[i].party}</p>
            </div>
            `;
    }
    candidatesName = document.querySelectorAll('.candidates-card h2');
    searchCandidates(candidatesName);
    candidatesCard = document.querySelectorAll('.candidates-card');
    displayCandidatesToVote(candidatesCard);
}

function displayRepresentativeCandidates() {
    candidateDisplay.innerHTML = "";
    let aspirants = representativeData;
    let counties = Object.entries(aspirants);
    let selectedDistrict = `${localStorage.getItem('registeredDistrict')}`;
    switch (localStorage.getItem('registeredCounty')) {
        case 'bomi':
            counties = counties[0][1][`district${selectedDistrict}`];
            break;
        case 'bong':
            counties = counties[1][1][`district${selectedDistrict}`];
            break;
        case 'gbarpolu':
            counties = counties[2][1][`district${selectedDistrict}`];
            break;
        case 'grandbassa':
            counties = counties[3][1][`district${selectedDistrict}`];
            break;
        case 'grandcapemount':
            counties = counties[4][1][`district${selectedDistrict}`];
            break;
        case 'grandgedeh':
            counties = counties[5][1][`district${selectedDistrict}`];
            break;
        case 'grandkru':
            counties = counties[6][1][`district${selectedDistrict}`];
            break;
        case 'lofa':
            counties = counties[7][1][`district${selectedDistrict}`];
            console.log(counties);
            break;
        case 'margibi':
            counties = counties[8][1][`district${selectedDistrict}`];
            break;
        case 'maryland':
            counties = counties[9][1][`district${selectedDistrict}`];
            break;
        case 'montserrado':
            counties = counties[10][1][`district${selectedDistrict}`];
            break;
        case 'nimba':
            counties = counties[11][1][`district${selectedDistrict}`];
            break;
        case 'rivergee':
            counties = counties[12][1][`district${selectedDistrict}`];
            break;
        case 'rivercess':
            counties = counties[13][1][`district${selectedDistrict}`];
            break;
        case 'sinoe':
            counties = counties[14][1][`district${selectedDistrict}`];
            break;
    }
    for (let i = 0; i < counties.length; i++) {
        candidateDisplay.innerHTML += `
            <div class="candidates-card" data-aos="fade-up" data-aos-duration="1000">
              
                <img src="./assets/user-icon.png" alt="candidates-img">
                <h2 data-category="Representative">${counties[i].aspirant}</h2>
                <p class="position">District #${counties[i].district}</p>
                <p>${counties[i].county} County <br> ${counties[i].party}</p>
            </div>
            `;
    }
    candidatesName = document.querySelectorAll('.candidates-card h2');
    searchCandidates(candidatesName);
    candidatesCard = document.querySelectorAll('.candidates-card');
    displayCandidatesToVote(candidatesCard);
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


function displayCandidatesToVote(candidates) {
    let selectedCandidate;
    let selectedCategory;
    candidates.forEach(candidate => {
        candidate.addEventListener('click', (e) => {
            selectedCandidate = e.currentTarget.children[1].textContent;
            selectedCategory = e.currentTarget.children[1].dataset.category;
            console.log(selectedCandidate);
            console.log(selectedCategory);
            localStorage.setItem('selectedCandidate', selectedCandidate);
            localStorage.setItem('selectedCategory', selectedCategory);
            // window.location.href = "./voting.html";
        })
    })
}


AOS.init();