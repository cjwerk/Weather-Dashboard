var button = document.querySelector('button')
var inputValue = document.querySelector('.inputValue')
var name = document.querySelector('.name');
var desc = document.querySelector('.desc');
var temp = document.querySelector('.temp');

button.addEventListener('click', function() {

fetch("https://api.openweathermap.org/data/2.5/forecast?q="+input.Value+"&appid=60ce7466ebde7b0aecd67dbb4864a061")

.then(response => response.json())
.then(data => console.log(data))

.catch(error => alert("Wrong city name!"))
})