const weatherContainer = document.querySelector('.weather-container');
const locationForm = document.getElementById('location-form');
const locationInput = document.getElementById('location-input');

async function getWeather(event) {
    event.preventDefault();
    
    const location = locationInput.value.trim();
    if (!location) {
        alert('لطفاً نام شهر را وارد کنید!');
        return;
    }

    // آدرس درست API با /v1/
    const apiUrl = `https://onyxapi.ir/v1/weather.php?city=${encodeURIComponent(location)}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        
        // اگر پاسخ موفق نبود
        if (!response.ok) {
            throw new Error('پاسخ سرور نامعتبر است');
        }

        const data = await response.json();

        // بررسی اینکه آیا درخواست موفق بوده
        if (data.ok === true && data.result) {
            displayWeather(data.result, location);
        } else {
            alert('شهر یافت نشد یا اطلاعات در دسترس نیست!');
        }
    } catch (error) {
        console.error('خطا در دریافت داده‌ها:', error);
        alert('خطایی در اتصال به سرور رخ داد. اینترنت خود را چک کنید.');
    }
}

function displayWeather(data, inputLocation) {
    // داده‌های مورد نیاز
    const cityName = data.name || inputLocation; // نام شهر از API یا ورودی کاربر
    const temp = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const iconUrl = data.weather[0].icon;

    // عناصر DOM
    const temperatureElement = document.querySelector('.temperature');
    const descriptionElement = document.querySelector('.description');
    const locationElement = document.querySelector('.location');
    const iconElement = document.querySelector('.weather-icon');

    // بروزرسانی محتوا
    locationElement.textContent = `${cityName}`;
    temperatureElement.textContent = `${temp}°C`;
    descriptionElement.textContent = description;
    iconElement.src = iconUrl;
    iconElement.alt = description;

    // بروزرسانی پس‌زمینه
    updateWeatherBackground(description);
}

function updateWeatherBackground(description) {
    // حذف کلاس‌های قبلی
    weatherContainer.classList.remove('sunny', 'cloudy', 'rainy', 'snowy');

    const desc = description.toLowerCase();

    if (desc.includes('صاف') || desc.includes('clear') || desc.includes('آفتابی')) {
        weatherContainer.classList.add('sunny');
    } else if (desc.includes('ابر') || desc.includes('cloud')) {
        weatherContainer.classList.add('cloudy');
    } else if (desc.includes('باران') || desc.includes('rain')) {
        weatherContainer.classList.add('rainy');
    } else if (desc.includes('برف') || desc.includes('snow')) {
        weatherContainer.classList.add('snowy');
    } else {
        weatherContainer.classList.add('cloudy'); // پیش‌فرض
    }
}

// اتصال به فرم
locationForm.addEventListener('submit', getWeather);
