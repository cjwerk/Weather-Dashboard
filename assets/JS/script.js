var button = document.querySelector('.button');
var inputValue = document.querySelector('.inputValue');
var name = document.querySelector('.name');
var desc = document.querySelector('.desc');
var temp = document.querySelector('.temp');
var clouds = document.querySelector('.clouds');




button.addEventListener('click', function(name){
    fetch("https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=60ce7466ebde7b0aecd67dbb4864a061")
    .then(response => response.json())
    .then(data => {
      var tempValue = data['main']['temp'];
      var nameValue = data['name'];
      var descValue = data['weather'][0]['description'];
    
      main.innerHTML = nameValue;
      desc.innerHTML = "Desc - "+descValue;
      temp.innerHTML = "Temp - "+tempValue;
      input.Value ="";
    })
    
    .catch(error => alert("Wrong city name!"));
    })