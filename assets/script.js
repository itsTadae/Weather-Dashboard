// City Search
let city = $("#citySearch").val();

// API Key
const apiKey = "&appid=baa6592af236ee08c7befaf458396c28";

// prevent sumbitted search
$("#citySearch").keypress(function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    $("#searchBtn").click();
  }
});
// Search Button OnClick
$("#searchBtn").on("click", function () {
  $("#forecast5").addClass("show");

  // Search Value
  city = $("#citySearch").val();

  // clear input box
  $("#citySearch").val("");

  // Call Weather API
  const queryUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey;

  $.ajax({
    url: queryUrl,
    method: "GET",
  }).then(function (response) {
    // Load city weather and daily forecast
    getCityWeather(response);
    getForecast(response);
    makeList();
  });
});

// City search history
function makeList() {
  let groupItem = $("<li>").addClass("list-group-item").text(city);
  $(".list").append(groupItem);
}

// Fetch city weather
function getCityWeather(response) {
  // get the temperature and convert to fahrenheit
  let tempFahrenheit = (response.main.temp - 273.15) * 1.8 + 32;
  tempFahrenheit = Math.floor(tempFahrenheit);

  // Clear existing container
  $("#currentCity").empty();

  // Display current city weather + time
  const card = $("<div>").addClass("card");
  const cardBody = $("<div>").addClass("card-body");
  const city = $("<h4>").addClass("card-title").text(response.name);
  var currdate = moment(response.dt, "X").format("dddd, MMMM Do YYYY, h:mm a");

  //link icons
  const images = $("<img>").attr(
    "src",
    "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png"
  );
  // City weather response
  const temperature = $("<p>")
    .addClass("card-text temperature")
    .text("Temperature: " + tempFahrenheit + " °F");
  const humidity = $("<p>")
    .addClass("card-text humidity")
    .text("Humidity: " + response.main.humidity + "%");
  const wind = $("<p>")
    .addClass("card-text wind")
    .text("Wind Speed: " + response.wind.speed + " MPH");
  const uvi = $("<p>")
    .addClass("card-text uvi")
    .text("UV Index: " + response.uvi);

  // Append weather
  city.append(images);

  city.append(
    $("<p>").attr("class", "card-text").append($("<small>").text(currdate))
  );
  cardBody.append(city, temperature, humidity, wind, uvi);
  card.append(cardBody);
  $("#currentCity").append(card);
}

// Fetch 5-day Forecast
function getForecast() {
  $.ajax({
    url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + apiKey,
    method: "GET",
  }).then(function (response) {
    // Clear forecast Container
    $("#forecast").empty();

    // Store response list
    let responseList = response.list;

    // Set starting city date
    for (let i = 0; i < responseList.length; i++) {
      let hour = responseList[i].dt_txt.split("-")[2].split(" ")[1];
      let day = Number(responseList[i].dt_txt.split("-")[2].split(" ")[0]);

      if (responseList[i].dt_txt.indexOf("8:00:00") !== -1) {
        // Fetch temp and convert from Kelvin to Fahrenheit
        let tempKelvin = (responseList[i].main.temp - 273.15) * 1.8 + 32;
        let tempFahrenheit = Math.floor(tempKelvin);

        const card = $("<div>").addClass(
          "card col-md-2 ml-4 bg-primary text-white"
        );
        const cardBody = $("<div>").addClass("card-body p-3 forecastBody");

        var cardHeader = $("<div>")
          .addClass("card-body p-2 forecastHeader")
          .attr("class", "card-header")
          .text(moment(response.list[i].dt, "X").format("MMM Do"));
        cardBody.append(cardHeader);

        var currdate = moment(response.dt, "X").format(
          "dddd, MMMM Do YYYY, h:mm a"
        );

        const temperature = $("<p>")
          .addClass("card-text forecastTemp")
          .text("Temperature: " + tempFahrenheit + " °F");
        const humidity = $("<p>")
          .addClass("card-text forecastHumidity")
          .text("Humidity: " + responseList[i].main.humidity + "%");
        // fetch image icons
        const images = $("<img>").attr(
          "src",
          "https://openweathermap.org/img/w/" +
            responseList[i].weather[0].icon +
            ".png"
        );

        cardBody.append(images, temperature, humidity);
        card.append(cardBody);
        $("#forecast").append(card);
      }
    }
  });
}
