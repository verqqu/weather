const url = 'https://api.openweathermap.org/data/2.5/weather?';
const icon_url = 'https://openweathermap.org/img/wn/';
const api_key = '';

const temp_span = document.querySelector('#temp');
const speed_span = document.querySelector('#speed');
const direction_span = document.querySelector('#direction');
const description_span = document.querySelector('#description');
const icon_img = document.querySelector('img');

const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude.toFixed(3);
      const lng = position.coords.longitude.toFixed(3);

      document.querySelector('#lat').innerHTML = lat + ', ';
      document.querySelector('#lng').innerHTML = lng;

      getWeather(lat, lng);

    }, error => {
      alert(`Error getting location: ${error.message}`);
    });
  } else {
    alert('Your browser does not support geolocation!');
  }
};

const getWeather = (lat, lng) => {
  const address = url +
    'lat=' + lat +
    '&lon=' + lng +
    '&units=metric' +
    '&appid=' + api_key;

  axios.get(address)
    .then(response => {
      const json = response.data;
      temp_span.innerHTML = json.main.temp + '&#8451;';
      speed_span.innerHTML = json.wind.speed + ' m/s';
      direction_span.innerHTML = json.wind.deg + '&#176;';
      description_span.innerHTML = json.weather[0].description;
      const icon = json.weather[0].icon;
      icon_img.src = `${icon_url}${icon}@2x.png`;

    }).catch(error => {
      if (error.response) {
        console.log('Error Response Data:', error.response.data);
        console.log('Error Status:', error.response.status);
        console.log('Error Headers:', error.response.headers);
      } else if (error.request) {
        console.log('Error Request:', error.request);
      } else {
        console.log('Error', error.message);
      }
      alert('Error fetching weather data');
    });
};

getLocation();
