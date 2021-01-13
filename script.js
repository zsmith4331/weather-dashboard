// This line grabs the input from the textbox //
var searchedCity = $("#searchedCity").val();

// This is my API Key //
var APIKey ="ae877590736bec1c3ee178bfbe574f85"

// URL needed to query the database //
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchedCity + APIKey;

// AJAX call to the OpenWeatherMap API //
$.ajax({
    url: queryURL,
    method: "GET"
  })
    // Store all of the retrieved data inside of an object //
    .then(function(response) {

      // Log the queryURL
      console.log(queryURL);

      // Log the resulting object
      console.log(response);
    });