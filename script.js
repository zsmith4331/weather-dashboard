// This line grabs the input from the textbox //
var cityInput = $("#citySearched").val();

// This is my API Key //
var APIKey = "ae877590736bec1c3ee178bfbe574f85";

// Get Date //
var date = new Date();

// Button Key Listener //
$("#citySearched").keypress(function(event) { 
	
	if (event.keyCode === 13) { 
		event.preventDefault();
		$("#searchButton").click(); 
	} 
});

// On-Click Listener //
$("#searchButton").on("click", function() {

  // Grabs Data from form after the search button is clicked //
  cityInput = $("#citySearched").val();
  
  // Clears Data from the form after the search button is clicked //
  $("#citySearched").val("");  

  // URL needed to query openweather API for the current weather//
  var currentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=" + APIKey;

  // AJAX call //
  $.ajax({
    url: currentWeatherURL,
    method: "GET"
  })
  .then(function(response){

    console.log(response)
    currentWeather(response);
    forecastedWeather(response);
    recentSearchList();
    
    })
    
  });

  // Stores recent searched cities in a list //
  function recentSearchList() {
    let listItem = $("<li>").addClass("list-group-item").text(cityInput);
    $(".list").append(listItem);
  }

  
  // Calling current weather function //
  function currentWeather(response) {

    // Clears current weather upon new search //
    $('#currentCity').empty();

    // Coverts the temperature from Kelvin to Fahrenheit //
    var tempF = (response.main.temp - 273.15) * 1.80 + 32;  

    // Constructing HTML containing the current weather informaiton //
    // Create card with bootstrap //
    var card = $("<div>").addClass("card");
    var cardHeader = $("<h4>").addClass("card-header text-center").text("CURRENT WEATHER")
    var todaysDate = $("<h3>").addClass("pl-3 pb-1").text(date.toLocaleDateString('en-US'));
    var cityName = $("<h3>").addClass("card-title pl-3 pb-1").text(response.name);
    var temperature = $("<p>").addClass("card-text pl-4 current-temp").text("Temperature: " + tempF.toFixed(0) + " °F");
    var humidity = $("<p>").addClass("card-text pl-4 current-humidity").text("Humidity: " + response.main.humidity + "%");
    var wind = $("<p>").addClass("card-text pl-4 pb-3 current-wind").text("Wind Speed: " + response.wind.speed + " MPH");
    var icon = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png")

    // Adding current weather content to HTML //
    $("#currentCity").append(card);
    card.append(cardHeader, todaysDate, cityName, temperature, humidity, wind);
    cityName.append(icon);   
   
  }

// Calling forecasted weather function //
function forecastedWeather () {

  $('#forecastcard').addClass('show');

  // URL needed to query openweather API for the current weather//
  var forecastWeatherURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + "&appid=" + APIKey;

  
  $.ajax({
    url: forecastWeatherURL,
    method: "GET"
  }).then(function (response){

    // Clears forecasted weather upon new search //
    $('#forecast').empty();

    // variable to hold response.list
    var results = response.list;
    console.log(results)

    for (let i = 0; i < results.length; i++) {

      var day = Number(results[i].dt_txt.split('-')[2].split(' ')[0]);
      var hour = results[i].dt_txt.split('-')[2].split(' ')[1];
      console.log(day);
      console.log(hour);

      if(results[i].dt_txt.indexOf("12:00:00") !== -1){
        
        // Coverts the temperature from Kelvin to Fahrenheit //
        var tempF = (results[i].main.temp - 273.15) * 1.80 + 32;


        // Constructing HTML containing the current weather informaiton //
        // Create card with bootstrap //
        var forecastCard = $("<div>").addClass("card col-md-2 ml-4 bg-primary text-white");
        var forecastCardBody = $("<div>").addClass("card-body p-3 forecastBody")
        var forecastDate = $("<h4>").addClass("card-title").text(date.toLocaleDateString('en-US'));
        var forecastTemperature = $("<p>").addClass("card-text forecastTemp").text("Temperature: " + tempF.toFixed(0) + " °F");
        var forecastHumidity = $("<p>").addClass("card-text forecastHumidity").text("Humidity: " + results[i].main.humidity + "%");
        var forecastIcon = $("<img>").attr("src", "https://openweathermap.org/img/w/" + results[i].weather[0].icon + ".png")


        // Adding current weather content to HTML //
        $("#forecast").append(forecastCard);
        forecastCardBody.append(forecastDate, forecastIcon, forecastTemperature, forecastHumidity);
        forecastCard.append(forecastCardBody);
        
      }
    }
  });

}

