var input = document.querySelector('.input_text');
var main = document.querySelector('#name');
var temp = document.querySelector('.temp');
var desc = document.querySelector('.desc');
var clouds = document.querySelector('.clouds');
var button = document.querySelector('.submit');
var humidity = document.querySelector('humidity');
var windSpeed = document.querySelector('wind-speed');
var savedLocations = [];
var currentLoc;
var key = "60ce7466ebde7b0aecd67dbb4864a061";
var url = "https://api.openweathermap.org/data/2.5/forecast";
document.getElementById("demo").innerHTML = Date();







function getWeather(desiredCity) {
  var queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${desiredCity}&APPID=${apiKey}&units=imperial`;
  $.ajax({
      url: queryUrl,
      method: "GET"
  })
      .then(function (weatherData) {
          var cityObj = {
              cityName: weatherData.name,
              cityTemp: weatherData.main.temp,
              cityHumidity: weatherData.main.humidity,
              cityWindSpeed: weatherData.wind.speed,
              cityUVIndex: weatherData.coord,
              cityWeatherIconName: weatherData.weather[0].icon
          }
          var queryUrl = `https://api.openweathermap.org/data/2.5/uvi?lat=${cityObj.cityUVIndex.lat}&lon=${cityObj.cityUVIndex.lon}&APPID=${apiKey}&units=imperial`
          $.ajax({
              url: queryUrl,
              method: 'GET'
          })
              .then(function (uvData) {
                  if (JSON.parse(localStorage.getItem("searchHistory")) == null) {
                      var searchHistoryArr = [];
                      if (searchHistoryArr.indexOf(cityObj.cityName) === -1) {
                          searchHistoryArr.push(cityObj.cityName);
                          localStorage.setItem("searchHistory", JSON.stringify(searchHistoryArr));
                          var renderedWeatherIcon = `https:///openweathermap.org/img/w/${cityObj.cityWeatherIconName}.png`;
                          renderWeatherData(cityObj.cityName, cityObj.cityTemp, cityObj.cityHumidity, cityObj.cityWindSpeed, renderedWeatherIcon, uvData.value);
                          renderSearchHistory(cityObj.cityName);
                      } else {
                          console.log("City already in searchHistory. Not adding to history list")
                          var renderedWeatherIcon = `https:///openweathermap.org/img/w/${cityObj.cityWeatherIconName}.png`;
                          renderWeatherData(cityObj.cityName, cityObj.cityTemp, cityObj.cityHumidity, cityObj.cityWindSpeed, renderedWeatherIcon, uvData.value);
                      }
                  } else {
                      var searchHistoryArr = JSON.parse(localStorage.getItem("searchHistory"));
                      if (searchHistoryArr.indexOf(cityObj.cityName) === -1) {
                          searchHistoryArr.push(cityObj.cityName);
                          localStorage.setItem("searchHistory", JSON.stringify(searchHistoryArr));
                          var renderedWeatherIcon = `https:///openweathermap.org/img/w/${cityObj.cityWeatherIconName}.png`;
                          renderWeatherData(cityObj.cityName, cityObj.cityTemp, cityObj.cityHumidity, cityObj.cityWindSpeed, renderedWeatherIcon, uvData.value);
                          renderSearchHistory(cityObj.cityName);
                      } else {
                          console.log("City already in searchHistory. Not adding to history list")
                          var renderedWeatherIcon = `https:///openweathermap.org/img/w/${cityObj.cityWeatherIconName}.png`;
                          renderWeatherData(cityObj.cityName, cityObj.cityTemp, cityObj.cityHumidity, cityObj.cityWindSpeed, renderedWeatherIcon, uvData.value);
                      }
                  }
              })

      });



if (JSON.parse(localStorage.getItem("searchHistory")) === null) {
  console.log("searchHistory not found")
}else{
  console.log("searchHistory loaded into searchHistoryArr");
  renderSearchHistory();
}}

function renderSearchHistory(name) {
  searchHistoryEl.empty();
  var searchHistoryArr = JSON.parse(localStorage.getItem("searchHistory"));
  for (let i = 0; i < searchHistoryArr.length; i++) {
      // We put newListItem in loop because otherwise the text of the li element changes, rather than making a new element for each array index
      var newListItem = $("<li>").attr("class", "historyEntry");
      newListItem.text(searchHistoryArr[i]);
      searchHistoryEl.prepend(newListItem);
  }
}






function initialize() {
  //grab previous locations from local storage
  savedLocations = JSON.parse(localStorage.getItem("weathercities"));
  var lastSearch;
  //display buttons for previous searches
  if (savedLocations) {
    //get the last city searched so we can display it
    currentLoc = savedLocations[savedLocations.length - 1];
    showPrevious();
    getCurrent(currentLoc);
  };
};
