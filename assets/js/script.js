const weatherContainer = document.querySelector('.weather-container');
const locationForm = document.getElementById('location-form');
const locationInput = document.getElementById('location-input');

async function getWeather(event) {
    event.preventDefault();
    const location = locationInput.value.trim(); // حذف فاصله‌های اضافی
    if (!location) {
        alert('لطفاً نام شهر را وارد کنید!');
        return;
    }

    // آدرس API با نام شهر و واحد سانتی‌گراد
    const apiUrl = `https://onyxapi.ir/weather.php?city=${encodeURIComponent(location)}&units=metric`;

    try {
        // ارسال درخواست به API
        const response = await fetch(apiUrl);
        const data = await response.json();

        // بررسی موفقیت درخواست
        if (data.ok && data.result) {
            displayWeather(data.result, location);
        } else {
            alert('شهر یافت نشد یا خطایی رخ داد!');
        }
    } catch (error) {
        console.error('خطا در دریافت داده‌ها:', error);
        alert('خطایی در اتصال به سرور رخ داد!');
    }
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

    // استفاده از آیکون مستقیم از API
    iconElement.src = icon;

    updateWeatherBackground(description);
}

function updateWeatherBackground(description) {
    // حذف کلاس‌های قبلی
    weatherContainer.classList.remove('sunny', 'cloudy', 'rainy');

    // اضافه کردن کلاس بر اساس توضیحات آب‌وهوا
    if (description.includes('صاف') || description.includes('Clear')) {
        weatherContainer.classList.add('sunny');
    } else if (description.includes('ابر') || description.includes('Cloud')) {
        weatherContainer.classList.add('cloudy');
    } else if (description.includes('باران') || description.includes('Rain')) {
        weatherContainer.classList.add('rainy');
    }
}

// Event listener برای ارسال فرم
locationForm.addEventListener('submit', getWeather);
