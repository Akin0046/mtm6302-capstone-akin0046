// NASA API key
const apiKey = 'djKZYadqZKt6h8erRumtaJGPAbU2J21egco51gEr';


// Function to fetch APOD based on date

async function fetchAPOD(date) {
    const apiKey = 'djKZYadqZKt6h8erRumtaJGPAbU2J21egco51gEr';
    try {
        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`);
        const data = await response.json();

        if (data.media_type === 'image') {
            displayAPOD(data);
        } else {
            alert('The APOD for this date is not an image.');
        }
    } catch (error) {
        console.error('Error fetching APOD:', error);
        alert('Failed to fetch APOD.');
    }
}

// Function to display APOD in #apodResult section
function displayAPOD(data) {
    const apodElement = document.getElementById('apodResult');
    apodElement.innerHTML = `
        <h3 class="text-center">${data.title} (${data.date})</h3>
        <img src="${data.url}" alt="${data.title}" class="mt-4 mb-4" id="apodImage">
        <div class="text-center mb-4">
            <button onclick="saveToFavourites('${data.date}')" class="btn btn-dark">
                <i class="fas fa-heart"></i> Save to Favorites
            </button>
            <button onclick="downloadImage('${data.url}')" class="btn btn-dark">
                <i class="fas fa-download"></i> Download
            </button>
            <button onclick="printImage('apodImage')" class="btn btn-dark">
                <i class="fas fa-print"></i> Print
            </button>
        </div>
        <p class="text-center mt-4">${data.explanation}</p>
    `;
}


// Function to fetch and display today's APOD
async function fetchAndDisplayTodayAPOD() {
    const today = new Date().toISOString().split('T')[0]; // Get today's date in the YYYY-MM-DD format
    try {
        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${today}`);
        const data = await response.json();

        if (data.media_type === 'image') {
            displayAPOD(data);
        } else {
            alert('Today\'s APOD is not an image.');
        }
    } catch (error) {
        console.error('Error fetching APOD:', error);
        alert('Failed to fetch APOD.');
    }
}

document.addEventListener('DOMContentLoaded', fetchAndDisplayTodayAPOD);


// Function to save APOD to favorites
function saveToFavourites(date) {
    let favourites = JSON.parse(localStorage.getItem('apodFavourites')) || {};
    favourites[date] = {
        title: document.querySelector('#apodResult h3').innerText,
        url: document.querySelector('#apodResult img').src,
        explanation: document.querySelector('#apodResult p').innerText,
    };
    localStorage.setItem('apodFavourites', JSON.stringify(favourites));
    displayFavourites();
}
//Funtion to delete favorites
function deleteFavourite(date) {
    let favourites = JSON.parse(localStorage.getItem('apodFavourites')) || {};
    delete favourites[date];
    localStorage.setItem('apodFavourites', JSON.stringify(favourites));
    displayFavourites();
}


// Function to display favorites in a grid
function displayFavourites() {
    const favourites = JSON.parse(localStorage.getItem('apodFavourites')) || {};
    const favouritesContainer = document.getElementById('apodFavoritesGrid');
    favouritesContainer.innerHTML = '';

    Object.keys(favourites).forEach(date => {
        const fav = favourites[date];

        const gridItem = document.createElement('div');
        gridItem.className = 'col';
        gridItem.innerHTML = `
            <div class="card">
                <img src="${fav.url}" class="card-img-top" alt="${fav.title}" onclick="displayFullImage('${fav.url}', '${fav.title}', '${fav.explanation}')">
                <div class="card-body">
                    <h5 class="card-title">${fav.title}</h5>
                    <button onclick="deleteFavourite('${date}')" class="btn btn-danger">Delete from Favourites</button>
                </div>
            </div>
        `;
        favouritesContainer.appendChild(gridItem);
    });
}





// Event listener for form submission
document.getElementById('dateForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const date = document.getElementById('dateInput').value;
    fetchAPOD(date);
});

// Set max date for date input
document.getElementById('dateInput').setAttribute('max', new Date().toISOString().split('T')[0]);
