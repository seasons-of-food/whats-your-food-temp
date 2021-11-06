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
            console.log("weather",weatherData);
        
        var temp = weatherData.main.temp
        console.log("temp", temp)
        localStorage.setItem("temp", JSON.stringify(temp))

        var cityName = document.createElement('p')
        cityName.textContent = weatherData.name 
        weatherBox.appendChild(cityName)

        var description = document.createElement('p')
        description.textContent = weatherData.weather[0].description
        weatherBox.appendChild(description)

        var icon = document.createElement('img')
        icon.src = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png"
        weatherBox.appendChild(icon)
        icon.classList.add("resize")
        console.log(weatherData.weather[0],icon)

        var currentTemp = document.createElement('p')
        currentTemp.textContent = "Current temperature:" + weatherData.main.temp + "\xB0"
        weatherBox.appendChild(currentTemp)

        var tempHigh = document.createElement('p')
        tempHigh.textContent = "High temperature:" + weatherData.main.temp_max + "\xB0"
        weatherBox.appendChild(tempHigh)

        var tempLow = document.createElement('p')
        tempLow.textContent = "Low temperature:" + weatherData.main.temp_min + "\xB0"
        weatherBox.appendChild(tempLow)

        }) 
    }
    //add event listener

var choices = ["Breakfast", "Lunch", "Dinner"]
var mealType

function fetchRecipeData(event){
    event.preventDefault();

    if (document.getElementById("breakfast").checked) {
        mealType = choices[0]
    }else if (document.getElementById("lunch").checked) {
        mealType = choices[1]
    }else if (document.getElementById('dinner').checked) {
        mealType = choices[2]
    }
        
    // var mealType = "breakfast"
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
            console.log("recipe",recipeData);
            
            var temp2 = JSON.parse(localStorage.getItem("temp"))
            console.log("temp2", temp2)

            // name of food
            var foodname = document.createElement('p')
            foodname.textContent = recipeData.hits[0].recipe.label
            recipesBox.appendChild(foodname)
            // image
            var foodimage = document.createElement('img')
            foodimage.src =recipeData.hits[0].recipe.image
            recipesBox.appendChild(foodimage)
            // cuisine type
            var cuisine = document.createElement('p')
            cuisine.textContent = recipeData.hits[0].recipe.cuisineType
            recipesBox.appendChild(cuisine)
            // diet labels
            for (var i=0; i < recipeData.hits[0].recipe.dietLabels.length; i++) {
                var dietLabels = document.createElement('p')
                dietLabels.textContent = "diet: " + recipeData.hits[0].recipe.dietLabels[i]
                recipesBox.appendChild(dietLabels)
            }
            // ingredients list
            for (var i=0; i < recipeData.hits[0].recipe.ingredientLines.length; i++) {
                var ingredient =document.createElement('p')
                ingredient.textContent = "- " + recipeData.hits[0].recipe.ingredientLines[i]
                recipesBox.appendChild(ingredient)
            }
            // link to recipe
            var link = document.createElement('a')
            link.href = recipeData.hits[0].recipe.url
            link.textContent = "Link to Recipe" 
            recipesBox.appendChild(link)
        }) 
    }

submitButton.addEventListener('click', fetchWeatherData)
submitButton.addEventListener('click', fetchRecipeData)

// Select all checked options
//   var checkedEl = $('input:checked');
//   var selected = [];