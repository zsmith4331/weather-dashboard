// This line grabs the input from the textbox //
var searchedCity = $("#searchedCity").val();

// This is my API Key //
var APIKey ="ae877590736bec1c3ee178bfbe574f85"

// URL needed to query the database //
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchedCity + APIKey;

function currentWeather(city) {

  // AJAX call to the OpenWeatherMap API //
  $.ajax({
  url: queryURL,
  method: "GET"
  })
  // Store all of the retrieved data inside of an object //
  .then(function(response) {

    console.log(response)

    // Log the queryURL
    console.log(queryURL);

    // Log the resulting object
    console.log(response);

    console.log(response.name)

    // console.log(response.icon)

    var tempF = (response.main.temp - 273.15) * 1.80 + 32;
  


  });

}



// Event handler for user clicking the search button
$("#select-city").on("click", function(event) {

    // Prevent the button from trying to submit the form
    event.preventDefault();

    // Storing the city name
    var inputCity = $("#city-input").val().trim();

    // Running the searchBandsInTown function(passing in the artist as an argument)
    currentWeather(inputCity);
  });