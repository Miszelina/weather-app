const input = document.querySelector('input');
const cityName = document.querySelector('.city-name');
const button = document.querySelector('button');
const temperature = document.querySelector('.temperature');
const feelLike = document.querySelector('.feel-like');
const humidity = document.querySelector('.humidity');
const pressure = document.querySelector('.pressure');
const sunsetElement = document.querySelector('.sunset');
const sunriseElement = document.querySelector('.sunrise');
const wind = document.querySelector('.wind');
const clouds = document.querySelector('.clouds');
const visibility = document.querySelector('.visibility');
const weather = document.querySelector('.short-info');
const currentDate = document.querySelector('.current-date');
const warning = document.querySelector('.warning');
const photo = document.querySelector('.photo');
const body = document.querySelector('body');

const API_LINK_WEATHER = 'https://api.openweathermap.org/data/2.5/weather?q=';
const API_KEY = '&appid=03d6728fef058c11aeed6f32e9b83b64';
const API_UNITS = '&units=metric';

function getWeather() {
  const city = input.value || 'Miami';
  const URL = API_LINK_WEATHER + city + API_KEY + API_UNITS;

  axios
    .get(URL)
    .then((res) => {
      const {
        main: { temp, feels_like: feelsLike, humidity: hum, pressure: pres },
        weather: [status],
        wind: { speed: windSpeed },
        clouds: { all: cloudiness },
        visibility: visibilityDistance,
        sys: { sunset, sunrise, country },
        name,
        dt: unix,
        timezone: timeZone,
      } = res.data;

      currentDate.textContent = country;
      cityName.textContent = name;
      input.value = '';
      input.placeholder = name;
      warning.textContent = '';

      temperature.textContent = Math.floor(temp) + '°C';
      feelLike.textContent = Math.floor(feelsLike) + '°';
      humidity.textContent = hum + '%';
      pressure.textContent = pres + ' hPa';
      wind.textContent = windSpeed + 'm/s';
      clouds.textContent = cloudiness + '%';
      visibility.textContent = visibilityDistance / 1000 + ' km';
      weather.textContent = status.description;

      setWeatherIcon(status.id, unix, sunset, sunrise);
      changeBackground(unix, sunset, sunrise);
    })
    .catch(() => (warning.textContent = 'Wpisz poprawną nazwę miasta!'));
}

function setWeatherIcon(statusId, unix, sunset, sunrise) {
  const night = unix > sunset || unix < sunrise;
  let icon;

  if (statusId >= 200 && statusId < 300) {
    icon = night ? '11n' : '11d';
  } else if (statusId >= 300 && statusId < 400) {
    icon = night ? '09n' : '09d';
  } else if (statusId >= 500 && statusId <= 504) {
    icon = night ? '10n' : '10d';
  } else if (statusId === 511) {
    icon = night ? '13n' : '13d';
  } else if (statusId >= 520 && statusId < 600) {
    icon = night ? '09n' : '09d';
  } else if (statusId >= 600 && statusId < 700) {
    icon = night ? '13n' : '13d';
  } else if (statusId >= 700 && statusId < 800) {
    icon = night ? '50n' : '50d';
  } else if (statusId === 800) {
    icon = night ? '01n' : '01d';
  } else if (statusId === 801) {
    icon = night ? '02n' : '02d';
  } else if (statusId === 802) {
    icon = night ? '03n' : '03d';
  } else if (statusId >= 803 && statusId <= 804) {
    icon = night ? '04n' : '04d';
  } else {
    icon = '01d';
  }

  photo.setAttribute('src', `./img/${icon}.svg`);
}

function changeBackground(unix, sunset, sunrise) {
  if (unix > sunset || unix < sunrise) {
    body.style.background = 'linear-gradient(0deg, #485461 0%, #28313b 74%)';
  } else {
    body.style.background = 'linear-gradient(180deg, rgba(92, 105, 242, 1) 30%, rgba(143, 183, 243, 1) 100%)';
  }
}

function checkEnter(e) {
  if (e.key === 'Enter') {
    show();
  }
}

function show() {
  getWeather();
}

show();
button.addEventListener('click', show);
window.addEventListener('keydown', checkEnter);
