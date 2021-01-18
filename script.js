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
    var icon = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png")

    // Appending current weather content to HTML //
    $("#currentCity").append(card);
    card.append(cardHeader, todaysDate, cityName, temperature, humidity, wind);
    cityName.append(icon);   
   
  }

// Calling forecasted weather function //
function forecastedWeather () {

  $('#forecastcard').addClass('show');

  // URL needed to query openweather API for the forecasted weather //
  var forecastWeatherURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + "&appid=" + APIKey;

    $.ajax({
    url: forecastWeatherURL,
    method: "GET"
  }).then(function (response){
  
    // Clears forecasted weather upon new search //
    $('#forecast').empty();

    // Array to grab the same time for each forecasted day //
    var forecastArray = [response.list[5], response.list[13], response.list[21], response.list[29], response.list[37]];
    console.log(forecastArray)

    // For Loop //
    for (var i = 0; i <forecastArray.length; i++) {

      // Constructing HTML containing the forecasted weather informaiton //
      // Create card with bootstrap //
      var forecastCard = $("<div>").addClass("card col-md-2 ml-4 bg-primary text-white");
      var forecastCardBody = $("<div>").addClass("card-body p-3 forecastBody")

      // Grab date and create HTML header //
      var forecastDate = new Date(forecastArray[i].dt * 1000).toLocaleDateString("en-US");
      var forecastDateHeader = $("<h5>").addClass("card-title").text(forecastDate);

      // Grab Icon and create HTML image //
      var forecastIconURL = "https://openweathermap.org/img/wn/" + forecastArray[i].weather[0].icon + "@2x.png";
      var forecastIcon = $("<img>").attr("src", forecastIconURL);

      // Grab temperature and create HTML element //
      var tempF = (forecastArray[i].main.temp - 273.15) * 1.80 + 32;
      var forecastTemperature = $("<p>").addClass("card-text forecastTemp").text("Temperature: " + tempF.toFixed(0) + " °F");

      // Grab humidity and create HTML element //
      var forecastHumidPercentage = forecastArray[i].main.humidity;
      var forecastHumidity = $("<p>").addClass("card-text forecastHumidity").text("Humidity: " + forecastHumidPercentage + "%");

      // Appending current weather content to HTML //
      $("#forecast").append(forecastCard);
      forecastCardBody.append(forecastDateHeader, forecastIcon, forecastTemperature, forecastHumidity);
      forecastCard.append(forecastCardBody);     

    }   
  }
  )};