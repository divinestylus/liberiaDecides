/*============================
==============================
RESULTS PAGE
==============================
=============================*/



let
    profilePhoto = document.querySelector('.profile-photo'),
    presidentialData,
    senatorialData,
    representativeData;




// let districtChart = document.querySelector('.district').getContext('2d');
// let ageGroupChart = document.querySelector('.age-group').getContext('2d');


// let districtBarChart
// let ageGroupPieChart;

Chart.defaults.font.size = 12;


function displayCountiesChart() {
    let countiesChart = document.querySelector('.counties').getContext('2d');
    let countiesPieChart;
    countiesPieChart = new Chart(countiesChart, {
        type: 'pie',
        data: {
            labels: ['Bomi', 'Bong', 'Gbarpolu', 'Grand Bassa', 'Grand Cape Mount', 'Grand Gedeh', 'Grand Kru', 'Lofa', 'Margibi', 'Maryland', 'Montserrado', 'Nimba', 'RiverGee', 'RiverCess', 'Sinoe'],
            datasets: [{
                label: 'Vote by County',
                data: [
                    944733,
                    242344,
                    234525,
                    424200,
                    236774,
                    643243,
                    566765,
                    663673,
                    564676,
                    437545,
                    346784,
                    237784,
                    247249,
                    476462,
                    240248
                ],
                backgroundColor: [
                    '#c1413f',
                    '#39475e'
                ]
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false,
                }
            }
        }
    })
}
displayCountiesChart();



function displayGenderChart() {
    let genderChart = document.querySelector('.gender').getContext('2d');
    let genderBarChart;
    genderBarChart = new Chart(genderChart, {
        type: 'bar',
        data: {
            labels: ['Male', 'Female'],
            datasets: [{
                label: 'Vote by County',
                data: [
                    944733,
                    242344
                ],
                backgroundColor: [
                    '#c1413f',
                    '#39475e'
                ]
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false,
                }
            }
        }
    })
}
displayGenderChart();



function displayAgeGroupChart() {
    let ageGroupChart = document.querySelector('.age-group').getContext('2d');
    let ageGroupPieChart;
    ageGroupPieChart = new Chart(ageGroupChart, {
        type: 'pie',
        data: {
            labels: ['18-35', '36-50', '51-65', '66 and Older'],
            datasets: [{
                label: 'Vote by County',
                data: [
                    944733,
                    242344,
                    547854,
                    233434
                ],
                backgroundColor: [
                    '#c1413f',
                    '#39475e'
                ]
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false,
                }
            }
        }
    })
}
displayAgeGroupChart();



function displayUserImg() {
    if (localStorage.getItem("userImage") !== null) {
        profilePhoto.src = localStorage.getItem("userImage");
    }
}
displayUserImg();

