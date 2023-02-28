const input = document.querySelector('input');
const cityName = document.querySelector('.city-name');
const button = document.querySelector('button');
const temperature = document.querySelector('.temperature');
const feelLike = document.querySelector('.feel-like');
const humidity = document.querySelector('.humidity');
const pressure = document.querySelector('.pressure');
const sunset = document.querySelector('.sunset');
const sunrise = document.querySelector('.sunrise');
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
	// + API_CNT + API_UNITS

	axios
		.get(URL)
		.then((res) => {
			const temp = res.data.main.temp;
			const feelsLike = res.data.main.feels_like;
			const hum = res.data.main.humidity;
			const pres = res.data.main.pressure;
			const status = Object.assign({}, ...res.data.weather);
			console.log(res.data);
			const unix = res.data.dt;
			const sunset = res.data.sys.sunset;
			const sunrise = res.data.sys.sunrise;
			const timeZone = res.data.timezone;

			currentDate.textContent = res.data.sys.country;

			cityName.textContent = res.data.name;
			input.value = '';
			input.placeholder = res.data.name;
			warning.textContent = '';

			temperature.textContent = Math.floor(temp) + '°C';
			feelLike.textContent = Math.floor(feelsLike) + '°';
			humidity.textContent = hum + '%';
			pressure.textContent = pres + ' hPa';
			wind.textContent = res.data.wind.speed + 'm/s';
			clouds.textContent = res.data.clouds.all + '%';
			visibility.textContent = res.data.visibility / 1000 + ' km';

			weather.textContent = status.description;

			if (status.id >= 200 && status.id < 300) {
				if (changeBackground() == true) {
					photo.setAttribute('src', './img/11n.svg');
				} else {
					photo.setAttribute('src', './img/11d.svg');
				}
			} else if (status.id >= 300 && status.id < 400) {
				if (unix > sunset && unix < sunrise + 86400) {
					photo.setAttribute('src', './img/09n.svg');
				} else {
					photo.setAttribute('src', './img/09d.svg');
				}
			} else if (status.id >= 500 && status.id <= 504) {
				if (unix > sunset && unix < sunrise + 86400) {
					photo.setAttribute('src', './img/10n.svg');
				} else {
					photo.setAttribute('src', './img/10d.svg');
				}
			} else if (status.id === 511) {
				if (unix > sunset && unix < sunrise + 86400) {
					photo.setAttribute('src', './img/13n.svg');
				} else {
					photo.setAttribute('src', './img/13d.svg');
				}
			} else if (status.id >= 520 && status.id < 600) {
				if (unix > sunset && unix < sunrise + 86400) {
					photo.setAttribute('src', './img/09n.svg');
				} else {
					photo.setAttribute('src', './img/09d.svg');
				}
			} else if (status.id >= 600 && status.id < 700) {
				if (unix > sunset && unix < sunrise + 86400) {
					photo.setAttribute('src', './img/13n.svg');
				} else {
					photo.setAttribute('src', './img/13d.svg');
				}
			} else if (status.id >= 700 && status.id < 800) {
				if (unix > sunset && unix < sunrise + 86400) {
					photo.setAttribute('src', './img/50n.svg');
				} else {
					photo.setAttribute('src', './img/50d.svg');
				}
			} else if (status.id === 800) {
				console.log(changeBackground());
				if (changeBackground() == true) {
					photo.setAttribute('src', './img/01n.svg');
				} else {
					photo.setAttribute('src', './img/01d.svg');
				}
			} else if (status.id === 801) {
				if (unix > sunset && unix < sunrise + 86400) {
					photo.setAttribute('src', './img/02n.svg');
				} else {
					photo.setAttribute('src', './img/02d.svg');
				}
			} else if (status.id === 802) {
				if (unix > sunset && unix < sunrise + 86400) {
					photo.setAttribute('src', './img/03n.svg');
				} else {
					photo.setAttribute('src', './img/03d.svg');
				}
			} else if (status.id >= 803 && status.id <= 804) {
				if (unix > sunset && unix < sunrise + 86400) {
					photo.setAttribute('src', './img/04n.svg');
				} else {
					photo.setAttribute('src', './img/04d.svg');
				}
			} else {
				photo.setAttribute('src', './img/01d.svg');
			}

			function changeBackground() {
				if (
					(unix > sunset && unix < sunrise + 86400) ||
					(unix < sunrise && unix < sunset)
				) {
					body.style.background =
						'linear-gradient(0deg, #485461 0%, #28313b 74%)';
					return true;
					console.log('true');
				} else {
					body.style.background = `linear-gradient(
					180deg,
					rgba(92, 105, 242, 1) 30%,
					rgba(143, 183, 243, 1) 100%`;
					return false;
				}
			}
			changeBackground();

			// function getCurrentDate() {
			// 	const timeZone = res.data.timezone;
			// 	console.log(timeZone);
			// 	console.log((unix * 1000 + timeZone).toDate());
			// }
			// getCurrentDate();
			// console.log(unix * 1000 + timeZone);
		})
		.catch(() => (warning.textContent = 'Wpisz poprawną nazwę miasta!'));
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
