/*============================
==============================
FORM VALIDATION AND POPULATION
==============================
=============================*/

const
    userRegisterName = document.querySelector('.register-name'),
    userLoginName = document.querySelector('.login-name'),
    inputFile = document.querySelector('[type="file"]'),
    uploadImage = document.querySelector('.upload-img'),
    maleGender = document.querySelector('input.male'),
    femaleGender = document.querySelector('.female'),
    genders = document.querySelectorAll('input[name="gender"]'),
    userGenderEl = document.querySelector('.gender'),
    date = document.querySelector('#date-of-birth'),
    county = document.querySelector('#county'),
    district = document.querySelector('#district'),
    registerBtn = document.querySelector('.register'),
    logInBtn = document.querySelector('.login'),
    voterRegisterForm = document.querySelector('form.voter-register-form'),
    voterLoginForm = document.querySelector('form.voter-login-form'),
    registerSection = document.querySelector('.register-section'),
    loginSection = document.querySelector('.login-section'),
    registerLoginBtn = document.querySelectorAll('.toggle-link a'),
    jpgOrPngRegex = /\.(jpg|png|jpeg)$/i;;
let
    presidentialData,
    senatorialData,
    representativeData,
    userAge,
    selectedCounty;

function getData() {
    fetch('./database/presidentialCandidate.json')
        .then(response => response.json())
        .then(data => {
            presidentialData = data;
        })
        .catch(error => {
            console.error(`Something went wrong: ${error}`)
        })

    fetch('./database/senatorialCandidate.json')
        .then(response => response.json())
        .then(data => {
            senatorialData = data;
        })
        .catch(error => {
            console.error(`Something went wrong: ${error}`)
        })

    fetch('./database/representativeCandidate.json')
        .then(response => response.json())
        .then(data => {
            representativeData = data;
            populateCountyDropdown();
        })
        .catch(error => {
            console.error(`Something went wrong: ${error}`)
        })
}
getData();

function uploadUserImage() {
    inputFile.click();
    inputFile.addEventListener('change', () => {
        const file = inputFile.files[0];
        if (file) {
            const reader = new FileReader()
            reader.onload = () => {
                uploadImage.src = reader.result;
                localStorage.setItem("userImage", reader.result);
            }
            reader.readAsDataURL(file);
        }
    })
}
uploadImage.addEventListener('click', uploadUserImage);

function validateRegisterName() {
    if (userRegisterName.value.length < 3) {
        removeErrorMessages();
        userRegisterName.insertAdjacentHTML("afterend", `<p class="error-msg">Name should be more than 2 characters</p>`);
        return false;
    }
    else if (userRegisterName.value.length >= 3) {
        removeErrorMessages();
        return true;
    }
}

function validateLoginName() {
    if (userLoginName.value.length < 3) {
        removeErrorMessages();
        userLoginName.insertAdjacentHTML("afterend", `<p class="error-msg">Name should be more than 2 characters</p>`);
        return false;
    }
    else if (userLoginName.value.length >= 3) {
        removeErrorMessages();
        return true;
    }
}

function removeErrorMessages() {
    const errorMessages = document.querySelectorAll('.error-msg');
    errorMessages.forEach(function (errorMessage) {
        errorMessage.remove();
    });
}

function validateGender() {
    if (!maleGender.checked && !femaleGender.checked) {
        removeErrorMessages();
        userGenderEl.insertAdjacentHTML("afterend", `<p class="error-msg">Gender is required</p>`);
        return false;
    } else {
        return true;
    }
}

function validateUserAge() {
    let currentYear = new Date();
    currentYear = currentYear.getFullYear();
    let userDOB = date.value;
    userDOB = Number(userDOB.substring(0, 4));
    userAge = currentYear - userDOB;
    if (userAge < 18 || userAge > 120) {
        removeErrorMessages();
        date.insertAdjacentHTML("afterend", `<p class="error-msg">You are not eligible to vote</p>`);
        return false;
    } else {
        return true;
    }
}

function populateCountyDropdown() {
    let countiesArr = Object.keys(representativeData);
    let option;
    for (let i = 0; i < countiesArr.length; i++) {
        option = document.createElement('option');
        option.textContent = countiesArr[i];
        option.value = countiesArr[i];
        county.append(option);
    }
    county.addEventListener('change', () => {
        selectedCounty = county.value.toLowerCase();
        switch (selectedCounty) {
            case 'bomi':
                populateDistrictDropdown(0);
                break;
            case 'bong':
                populateDistrictDropdown(1);
                break;
            case 'gbarpolu':
                populateDistrictDropdown(2);
                break;
            case 'grandbassa':
                populateDistrictDropdown(3);
                break;
            case 'grandcapemount':
                populateDistrictDropdown(4);
                break;
            case 'grandgedeh':
                populateDistrictDropdown(5);
                break;
            case 'grandkru':
                populateDistrictDropdown(6);
                break;
            case 'lofa':
                populateDistrictDropdown(7);
                break;
            case 'margibi':
                populateDistrictDropdown(8);
                break;
            case 'maryland':
                populateDistrictDropdown(9);
                break;
            case 'montserrado':
                populateDistrictDropdown(10);
                break;
            case 'nimba':
                populateDistrictDropdown(11);
                break;
            case 'rivergee':
                populateDistrictDropdown(12);
                break;
            case 'rivercess':
                populateDistrictDropdown(13);
                break;
            case 'sinoe':
                populateDistrictDropdown(14);
                break;
        }
    })
}

function validateCountyDropdown() {
    if (county.value === "Select registered county") {
        removeErrorMessages();
        county.insertAdjacentHTML("afterend", `<p class="error-msg">You need to select a county</p>`);
        return false;
    } else {
        return true;
    }
}

function populateDistrictDropdown(countyIndex) {
    let countiesArr = Object.values(representativeData);
    countiesArr = Object.keys(countiesArr[countyIndex]);
    let option;
    district.innerHTML = '';
    for (let i = 0; i < countiesArr.length; i++) {
        option = document.createElement('option');
        option.textContent = countiesArr[i];
        option.value = countiesArr[i];
        district.append(option);
    }
}


voterRegisterForm.addEventListener('submit', (event) => {
    event.preventDefault();
    // validateUserImage();
    validateRegisterName();
    validateGender();
    validateCountyDropdown();
    validateUserAge();
    genders.forEach(gender => {
        if (gender.checked) {
            localStorage.setItem("gender", gender.dataset.gender);
        }
    })
    localStorage.setItem("userName", userRegisterName.value);
    localStorage.setItem("userAge", userAge);
    localStorage.setItem("registeredCounty", selectedCounty);
    localStorage.setItem("registeredDistrict", district.value.toLowerCase());
    if (validateRegisterName() && validateGender() && validateCountyDropdown() && validateUserAge()) {
        userRegisterName.value = "";
        genders.forEach(gender => {
            gender.checked = false;
        })
        date.value = "";
        location.href = "./candidates.html";
    }
})

voterLoginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    validateLoginName();
    localStorage.setItem("userName", userLoginName.value);
    if (validateLoginName()) {
        userLoginName.value = "";
        location.href = "./candidates.html";
    }
})



function toggleForm() {
    registerSection.classList.toggle('inactive');
    loginSection.classList.toggle('active');
}
registerLoginBtn.forEach(button => {
    button.addEventListener('click', toggleForm)
})


AOS.init();