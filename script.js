var inputField = document.querySelector("#city")
var submitButton = document.querySelector("#submit")
var weatherBox = document.querySelector("#weatherbox")
var recipesBox = document.querySelector("#recipes")

var body = document.querySelector("#body")
var header = document.querySelector("#header")

var time = setInterval(clock, 1000)
function clock() {
    var time = moment().format('dddd, MMMM Do YYYY, h:mm:ss a')
    $("#time").text(time)
}
clock();

// function to fetch Weather Data, then calls the Recipe Data function
function fetchWeatherData(event) {
    event.preventDefault();
    weatherBox.innerHTML = ''
    var cityName = inputField.value
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

            // if (temp < 32) {
            //     header.classList.add("headerCold");
            //     body.classList.add("cold");
            //     header.classList.remove("headerMild");
            //     body.classList.remove("mild");
            //     header.classList.remove("headerHot");
            //     body.classList.remove("hot");
            // } else if (temp > 32 && temp < 60) {
            //     header.classList.add("headerMild");
            //     body.classList.add("mild");
            //     header.classList.remove("headerCold");
            //     body.classList.remove("cold");
            //     header.classList.remove("headerHot");
            //     body.classList.remove("hot");
            // } else if (temp > 60) {
            //     header.classList.add("headerHot");
            //     body.classList.add("hot");
            //     header.classList.remove("headerCold");
            //     body.classList.remove("cold");
            //     header.classList.remove("headerMild");
            //     body.classList.remove("mild");
            // }

            var cityName = document.createElement('h4')
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
            currentTemp.textContent = "Current temperature: " + weatherData.main.temp + "\xB0" + "F"
            weatherBox.appendChild(currentTemp)

            var tempHigh = document.createElement('p')
            tempHigh.textContent = "High temperature: " + weatherData.main.temp_max + "\xB0"+ "F"
            weatherBox.appendChild(tempHigh)

            var tempLow = document.createElement('p')
            tempLow.textContent = "Low temperature: " + weatherData.main.temp_min + "\xB0"+ "F"
            weatherBox.appendChild(tempLow)

        })
    inputField.value = ''
    fetchRecipeData();
}

var choices = ["Breakfast", "Lunch", "Dinner"]
var mealType

// function to fetch Recipe Data
function fetchRecipeData() {
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
    var options = ["Biscuits and cookies", "bread", "cereals", "desserts", "drinks", "main course", "pancake", "preps", "preserve", "salad", "sandwiches", "side dish", "soup", "starter", "sweets"];
    var tempChoices
    if (temp2 < 32) {
        tempChoices = options[12] + "&dishType=" + options[1] + "&dishType=" + options[0];
    } else if (temp2 > 32 && temp2 < 60) {
        tempChoices = options[10] + "&dishType=" + options[5] + "&dishType=" + options[11] + "&dishType=" + options[7];
    } else if (temp2 > 60) {
        tempChoices = options[2] + "&dishType=" + options[3] + "&dishType=" + options[4] + "&dishType=" + options[6] + "&dishType=" + options[9] + "&dishType=" + options[13] + "&dishType=" + options[14];
    }

    var requestUrl = "https://api.edamam.com/api/recipes/v2?type=public&q=" + mealType + "&app_id=ce747e67&app_key=8da3cf957b3be5b0a78864d9cb374f8c&dishType=" + tempChoices;

    fetch(requestUrl)
        //if statement for empty input field
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } 
        })
        .catch(function (error) {
          var cityName = document.createElement('p')
            cityName.textContent = 'Error: Check city name. ' + response.statusText
            weatherBox.appendChild(cityName)
        })
        .then(function (recipeData) {
            console.log("recipe", recipeData);

            var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
            var select = numbers[Math.floor(Math.random() * numbers.length)]
            console.log(select)
            var food = recipeData.hits[select]

            // name of food
            var foodname = document.createElement('h4')
            foodname.textContent = food.recipe.label
            recipesBox.appendChild(foodname)
            // image
            var foodimage = document.createElement('img')
            foodimage.src = food.recipe.image
            recipesBox.appendChild(foodimage)
            // cuisine type
            var cuisine = document.createElement('p')
            cuisine.textContent = "Cuisine: " + food.recipe.cuisineType
            recipesBox.appendChild(cuisine)
            // diet labels
            for (var i = 0; i < food.recipe.dietLabels.length; i++) {
                var dietLabels = document.createElement('p')
                dietLabels.textContent = "Diet: " + food.recipe.dietLabels[i]
                recipesBox.appendChild(dietLabels)
            }
            // ingredients list
            ingredientTile = document.createElement('h4')
            ingredientTile.textContent = "Ingredients"
            recipesBox.appendChild(ingredientTile)
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
