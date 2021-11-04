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