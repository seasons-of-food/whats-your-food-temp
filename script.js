var inputField = document.querySelector("#city")
var submitButton = document.querySelector("#submit")
var weatherBox = document.querySelector("#weatherbox")
var recipesBox = document.querySelector("#recipes")

function fetchData(){
    var cityName = inputField.value
    var apiKey = 'fd531081518e808eb0375251a19ac935'
    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + apiKey
 
    fetch(requestUrl)
    //if statement for empty input field
        .then(function (response) {
            return response.json();
        })
        .then(function (weatherData) {
            console.log(weatherData);
        }) 
    }
    //add event listener