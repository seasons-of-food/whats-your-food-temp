var inputField = document.querySelector("#city")
var submitButton = document.querySelector("#submit")
var weatherBox = document.querySelector("#weatherbox")
var recipesBox = document.querySelector("#recipes")
// console.log("hi")

function fetchWeatherData(event){
    event.preventDefault();
    // console.log("hello")
    var cityName = inputField.value
    // console.log(cityName);
    var apiKey = 'fd531081518e808eb0375251a19ac935'
    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=imperial&appid=' + apiKey
 
    fetch(requestUrl)
    //if statement for empty input field
        .then(function (response) {
            return response.json();
        })
        .then(function (weatherData) {
            console.log(weatherData);
        
        var cityName = document.createElement('p')
        cityName.textContent = weatherData.name 
        weatherBox.appendChild(cityName)

        var description = document.createElement('p')
        description.textContent = weatherData.weather[0].description
        weatherBox.appendChild(description)

        var icon = document.createElement('img')
        icon.src = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png"
        weatherBox.appendChild(icon)
        console.log(weatherData.weather[0],icon)

        var currentTemp = document.createElement('p')
        currentTemp.textContent = "Current temperature:" + weatherData.main.temp + "\xB0"
        weatherBox.appendChild(currentTemp)

        var tempHigh = document.createElement('p')
        tempHigh.textContent = "High temperature:" + weatherData.main.temp_max + "\xB0"
        weatherBox.appendChild(tempHigh)

        var tempLow = document.createElement('p')
        tempLow.textContent = "Low temperature:" + weatherData.main.temp_main + "\xB0"
        weatherBox.appendChild(tempLow)

        }) 
    }
    //add event listener

function fetchRecipeData(event){
    event.preventDefault();
    var mealType = "breakfast"
    // add mealType id to radio buttons
    // var apiKey = '8da3cf957b3be5b0a78864d9cb374f8c'
    // var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + mealType + '&appid=' + apiKey
    var requestUrl = "https://api.edamam.com/api/recipes/v2?type=public&q=" + mealType + "&app_id=ce747e67&app_key=8da3cf957b3be5b0a78864d9cb374f8c"
    
    
    fetch(requestUrl)
    //if statement for empty input field
        .then(function (response) {
            return response.json();
        })
        .then(function (recipeData) {
            console.log(recipeData);
        }) 
    }

submitButton.addEventListener('click', fetchWeatherData)
submitButton.addEventListener('click', fetchRecipeData)

// Select all checked options
//   var checkedEl = $('input:checked');
//   var selected = [];