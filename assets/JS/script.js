var input = document.querySelector('.input_text');
var main = document.querySelector('#name');
var temp = document.querySelector('.temp');
var desc = document.querySelector('.desc');
var clouds = document.querySelector('.clouds');
var button = document.querySelector('.submit');
var savedLocations = [];
var currentLoc;
document.getElementById("demo").innerHTML = Date();

button.addEventListener('click', function (name) {
  fetch('https://api.openweathermap.org/data/2.5/weather?q=' + input.value + '&units=metric&appid=60ce7466ebde7b0aecd67dbb4864a061')
    .then(response => response.json())
    .then(data => {
      var tempValue = data['main']['temp'];
      var nameValue = data['name'];
      var descValue = data['weather'][0]['description'];

      main.innerHTML = nameValue;
      desc.innerHTML = "Desc - " + descValue;
      temp.innerHTML = "Temp - " + tempValue;
      input.value = "";

    })

    .catch(err => alert("Wrong city name!"));
});

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
