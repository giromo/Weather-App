// script.js

const weatherContainer = document.querySelector('.weather-container');
const locationForm = document.getElementById('location-form');
const locationInput = document.getElementById('location-input');

const mockWeatherData = {
    name: 'Cuddalore',
    main: {
        temp: 28, // Temperature in Celsius
    },
    weather: [
        {
            description: 'Clear', // Weather description
            icon: '01d', // Weather icon code (you can use any code here)
        }
    ]
};

function getWeather(event) {
    event.preventDefault();
    const location = locationInput.value;
    displayWeather(mockWeatherData, location);
}

function displayWeather(data, location) {
    const { name, main, weather } = data;
    const { temp } = main;
    const { description, icon } = weather[0];

    const temperatureElement = document.querySelector('.temperature');
    const descriptionElement = document.querySelector('.description');
    const locationElement = document.querySelector('.location');
    const iconElement = document.querySelector('.weather-icon');

    locationElement.textContent = `Weather Forecast for ${location}`;
    temperatureElement.textContent = `${Math.round(temp)}°C`;
    descriptionElement.textContent = description;

    const iconUrl = `https://openweathermap.org/img/wn/${icon}.png`; // You can use any placeholder icon URL here
    iconElement.src = iconUrl;

    updateWeatherBackground(description);
}

function updateWeatherBackground(description) {
    // Remove all existing weather classes
    weatherContainer.classList.remove('sunny', 'cloudy', 'rainy');

    // Add weather class based on description (for demonstration purposes)
    if (description.includes('Clear')) {
        weatherContainer.classList.add('sunny');
    } else if (description.includes('Cloud')) {
        weatherContainer.classList.add('cloudy');
    } else if (description.includes('Rain')) {
        weatherContainer.classList.add('rainy');
    }
}

// Event listener for form submission
locationForm.addEventListener('submit', getWeather);
