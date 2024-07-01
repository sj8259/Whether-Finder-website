const apiKey = 'enter your api key';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');

searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
    }
});

function fetchWeather(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            locationElement.textContent = data.name;
            temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
            descriptionElement.textContent = data.weather[0].description;

            // Set background image based on weather description
            const weather = data.weather[0].main;
            setBackground(weather);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

function setBackground(weather) {
    let backgroundImageUrl;

    // Determine background image URL based on weather condition
    switch (weather) {
        case 'Clear':
            backgroundImageUrl = 'url("clear.jpg")'; // Replace with actual URL or path
            break;
        case 'Clouds':
            backgroundImageUrl = 'url("cloudy.jpg")'; // Replace with actual URL or path
            break;
        case 'Rain':
            backgroundImageUrl = 'url("rainy.jpg")'; // Replace with actual URL or path
            break;
        default:
            backgroundImageUrl = 'none';
            break;
    }

    // Apply background image to the body
    document.body.style.backgroundImage = backgroundImageUrl;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
}
