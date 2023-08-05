let appId = '71f6779186cc32448b4c412eea65b982';
let units = 'metric';
let searchMethod; // q means searching as a string.
let datetime = document.getElementById('datetime');
//let time = document.getElementById('time');
let appID = 'f6a7d207b47b9da6f9fdd5b3b90fafee';
let lat;
let lon;
let cityName;
let a;
let time;
datetime.innerHTML = getdate();

setInterval(() => {
  a = new Date();
  time = a.getHours() + ':' + a.getMinutes() + ':' + a.getSeconds();
  document.getElementById('time').innerHTML = time;
}, 1000);

//setInterval(time,1000);

function getSearchMethod(searchTerm) {
  if (searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm)
    searchMethod = 'zip';
  else
    searchMethod = 'q';
}

function getdate() {

  var dateTime = new Date();
  var formatted = dateTime.toDateString();

  return formatted;
}

function dates(t){
  var date = new Date(t*1000);
  var og = date.toDateString();

  return og;

}

function getData(resultFromServer) {
  lat = resultFromServer.coord.lat;
  lon = resultFromServer.coord.lon;
  cityName = resultFromServer.name;
if(lat){
  fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=f6a7d207b47b9da6f9fdd5b3b90fafee&units=metric`)
    .then((result) => {
      return result.json();
    }).then((res) => {
      init(res);
    });
      }
else{
    
    }

}

function searchWeather(searchTerm) {
  getSearchMethod(searchTerm);

  fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=metric`)
    .then((result) => {
      return result.json();
    }).then((res) => {
      getData(res);
    });


}

function init(resultFromServer) {
  switch (resultFromServer.current.weather[0].main) {
    case 'Clear':
      document.body.style.backgroundImage = "url('clearPicture.jpg')";
      break;

    case 'Clouds':
      document.body.style.backgroundImage = "url('cloudyPicture.jpg')";
      break;

    case 'Rain':
    case 'Drizzle':
      document.body.style.backgroundImage = "url('rainPicture.jpg')";
      break;

    case 'Mist':
      document.body.style.backgroundImage = "url('mistPicture.jpg')";
      break;

    case 'Thunderstorm':
      document.body.style.backgroundImage = "url('stormPicture.jpg')";
      break;

    case 'Snow':
      document.body.style.backgroundImage = "url('snowPicture.jpg')";
      break;

    default:
      break;
  }

  let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
  let temperatureElement = document.getElementById('temperature');
  let humidityElement = document.getElementById('humidity');
  let windSpeedElement = document.getElementById('windSpeed');
  let cityHeader = document.getElementById('cityHeader');
  let UVIndex = document.getElementById('UVIndex');


  let weatherIcon = document.getElementById('documentIconImg');
  weatherIcon.src = 'http://openweathermap.org/img/w/' + resultFromServer.current.weather[0].icon + '.png';

  let resultDescription = resultFromServer.current.weather[0].description;
  weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);
  temperatureElement.innerHTML = Math.floor(resultFromServer.current.temp) + '&#176;' + 'C';
  windSpeedElement.innerHTML = 'Wind Speed: ' + Math.floor(resultFromServer.current.wind_speed) + ' meter/s';
  cityHeader.innerHTML = cityName;
  humidityElement.innerHTML = 'Humidity levels: ' + resultFromServer.current.humidity + '%';
  UVIndex.innerHTML = 'UV index: ' + resultFromServer.current.uvi;
  //time.innerHTML = time();

   setPositionForWeatherInfo('main');

 // Here is the code for another box

   for(let i = 1; i<=6; i++){
    str = ""+i.toString();

   weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader'+str);
   temperatureElement = document.getElementById('temperature'+str);
   /*humidityElement = document.getElementById('humidity'+str);
   windSpeedElement = document.getElementById('windSpeed'+str);
   //cityHeader = document.getElementById('cityHeader'+str);
   UVIndex = document.getElementById('UVIndex'+str);*/
   Date1 = document.getElementById('Date'+str);

   weatherIcon = document.getElementById('documentIconImg'+str);
  weatherIcon.src = 'http://openweathermap.org/img/w/' + resultFromServer.daily[i].weather[0].icon + '.png';

   resultDescription = resultFromServer.daily[i].weather[0].description;
  weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);
  temperatureElement.innerHTML = Math.floor(resultFromServer.daily[i].temp.min) + '&#176;' + 'C' + ' / ' + Math.floor(resultFromServer.daily[i].temp.max) + '&#176;' + 'C';
  /*windSpeedElement.innerHTML = 'Wind Speed: ' + Math.floor(resultFromServer.current.wind_speed) + ' m/s';
  //cityHeader.innerHTML = cityname;
  humidityElement.innerHTML = 'Humidity levels: ' + resultFromServer.current.humidity + '%';
  UVIndex.innerHTML = 'UV index: ' + resultFromServer.current.uvi;*/
  Date1.innerHTML = dates(resultFromServer.daily[i].dt);
  
  setPositionForWeatherInfo(i);
  }

}

function setPositionForWeatherInfo(str) {
  let weatherContainer = document.getElementById('weatherContainer');
  let weatherContainerHeight = weatherContainer.clientHeight;
  let weatherContainerWidth = weatherContainer.clientWidth; 

  if (str == 'main') {
    weatherContainer.style.left = `calc(50% - ${weatherContainerWidth/2}px)`;
    weatherContainer.style.top = `calc(40% - ${weatherContainerHeight/1.3}px)`;
    weatherContainer.style.visibility = 'visible';
  }

  if(str == 1){
    weatherContainer1.style.left = `calc(10% - ${weatherContainerWidth/2}px)`;
    weatherContainer1.style.top = `calc(85% - ${weatherContainerHeight/1.3}px)`;
    weatherContainer1.style.visibility = 'visible';
  }

  if(str == 2){
    weatherContainer2.style.left = `calc(25% - ${weatherContainerWidth/2}px)`;
    weatherContainer2.style.top = `calc(85% - ${weatherContainerHeight/1.3}px)`;
    weatherContainer2.style.visibility = 'visible';
  }

  if(str == 3){
    weatherContainer3.style.left = `calc(40% - ${weatherContainerWidth/2}px)`;
    weatherContainer3.style.top = `calc(85% - ${weatherContainerHeight/1.3}px)`;
    weatherContainer3.style.visibility = 'visible';
  }

  if(str == 4){
    weatherContainer4.style.left = `calc(55% - ${weatherContainerWidth/2}px)`;
    weatherContainer4.style.top = `calc(85% - ${weatherContainerHeight/1.3}px)`;
    weatherContainer4.style.visibility = 'visible';
  }

  if(str == 5){
    weatherContainer5.style.left = `calc(70% - ${weatherContainerWidth/2}px)`;
    weatherContainer5.style.top = `calc(85% - ${weatherContainerHeight/1.3}px)`;
    weatherContainer5.style.visibility = 'visible';
  }

  if(str == 6){
    weatherContainer6.style.left = `calc(85% - ${weatherContainerWidth/2}px)`;
    weatherContainer6.style.top = `calc(85% - ${weatherContainerHeight/1.3}px)`;
    weatherContainer6.style.visibility = 'visible';
  }

}


document.getElementById('searchBtn').addEventListener('click', () => {
  let searchTerm = document.getElementById('searchInput').value;
  if (searchTerm)
    searchWeather(searchTerm);
});

document.getElementById('searchInput').addEventListener('keyup', function(event) {
  if (event.keyCode === 13) {
    document.getElementById('searchBtn').click();
  }
});
