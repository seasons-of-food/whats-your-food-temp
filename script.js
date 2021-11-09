var inputField = document.querySelector("#city")
var submitButton = document.querySelector("#submit")
var weatherBox = document.querySelector("#weatherbox")
var recipesBox = document.querySelector("#recipes")
// console.log("hi")

function fetchWeatherData(event) {
    event.preventDefault();
    weatherBox.innerHTML = ''
    var cityName = inputField.value
    // console.log(cityName);
    var apiKey = 'fd531081518e808eb0375251a19ac935'
    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=imperial&appid=' + apiKey

    fetch(requestUrl)
        //if statement for empty input field
        .then(function (response) {
            if (response.ok) {
                return response.json();

            } else {
                var cityName = document.createElement('p')
                cityName.textContent = 'Error: Check city name. ' + response.statusText
                weatherBox.appendChild(cityName)
                recipesBox.style.display = "none"
            }
        })
        .catch(function (error) {
            var cityName = document.createElement('p')
            cityName.textContent = 'Error: Unable to connect to APIs. ' + response.statusText
            weatherBox.appendChild(cityName)
        })
        .then(function (weatherData) {
            console.log("weather", weatherData);

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
            console.log(weatherData.weather[0], icon)

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
    inputField.value = ''
}
//add event listener

var choices = ["Breakfast", "Lunch", "Dinner"]
var mealType

function fetchRecipeData(event) {
    event.preventDefault();
    recipesBox.innerHTML = ''

    if (document.getElementById("breakfast").checked) {
        mealType = choices[0]
    } else if (document.getElementById("lunch").checked) {
        mealType = choices[1]
    } else if (document.getElementById('dinner').checked) {
        mealType = choices[2]
    }


    var temp2 = JSON.parse(localStorage.getItem("temp"))
    console.log("temp2", temp2)
    // 0                        1        2          3       4           5           6       7           8       9       10          11          12      13          14       
    var options = ["Biscuits and cookies", "bread", "cereals", "desserts", "drinks", "main course", "pancake", "preps", "preserve", "salad", "sandwiches", "side dish", "soup", "starter", "sweets"];
    var tempChoices
    if (temp2 < 32) {
        tempChoices = options[12] + "&dishType=" + options[1] + "&dishType=" + options[0]
    } else if (temp2 > 32 && temp2 < 60) {
        tempChoices = options[10] + "&dishType=" + options[5] + "&dishType=" + options[11] + "&dishType=" + options[7]
    } else if (temp2 > 60) {
        tempChoices = options[2] + "&dishType=" + options[3] + "&dishType=" + options[4] + "&dishType=" + options[6] + "&dishType=" + options[9] + "&dishType=" + options[13] + "&dishType=" + options[14]
    }
    // var mealType = "breakfast"
    // add mealType id to radio buttons
    // var apiKey = '8da3cf957b3be5b0a78864d9cb374f8c'
    // var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + mealType + '&appid=' + apiKey
    var requestUrl = "https://api.edamam.com/api/recipes/v2?type=public&q=" + mealType + "&app_id=ce747e67&app_key=8da3cf957b3be5b0a78864d9cb374f8c&dishType=" + tempChoices;


    fetch(requestUrl)
        //if statement for empty input field
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } //else {
            // alert('Error: Check city name. ' + response.statusText);
            // recipesBox.style.display = "none"
            // weatherBox.style.display = "none"
            // return window.location.href = "index.html";
            // }
        })
        .catch(function (error) {
            // alert('Unable to connect to APIs');
            var cityName = document.createElement('p')
            cityName.textContent = 'Error: Check city name. ' + response.statusText
            weatherBox.appendChild(cityName)
        })
        .then(function (recipeData) {
            console.log("recipe", recipeData);
            // if (recipesBox.length) {
            //     recipesBox.innerHTML = ""
            // }

            var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
            var select = numbers[Math.floor(Math.random() * numbers.length)]
            console.log(select)
            var food = recipeData.hits[select]

            // name of food
            var foodname = document.createElement('p')
            foodname.textContent = food.recipe.label
            recipesBox.appendChild(foodname)
            // image
            var foodimage = document.createElement('img')
            foodimage.src = food.recipe.image
            recipesBox.appendChild(foodimage)
            // cuisine type
            var cuisine = document.createElement('p')
            cuisine.textContent = food.recipe.cuisineType
            recipesBox.appendChild(cuisine)
            // diet labels
            for (var i = 0; i < food.recipe.dietLabels.length; i++) {
                var dietLabels = document.createElement('p')
                dietLabels.textContent = "diet: " + food.recipe.dietLabels[i]
                recipesBox.appendChild(dietLabels)
            }
            // ingredients list
            for (var i = 0; i < food.recipe.ingredientLines.length; i++) {
                var ingredient = document.createElement('p')
                ingredient.textContent = "- " + food.recipe.ingredientLines[i]
                recipesBox.appendChild(ingredient)
            }
            // link to recipe
            var link = document.createElement('a')
            link.href = food.recipe.url
            link.textContent = "Link to Recipe"
            recipesBox.appendChild(link)
        })
}

submitButton.addEventListener('click', fetchWeatherData)
submitButton.addEventListener('click', fetchRecipeData)

// Select all checked options
//   var checkedEl = $('input:checked');
//   var selected = [];
// weatherBox.innerHTML = ""