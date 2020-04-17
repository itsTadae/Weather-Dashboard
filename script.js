// Search History function 
// Find Location Function -- Success / Warning
// Fetch 5 day forcast function 
// Fetch City function 

// Store City Inputs from the search function
let city = $("searchTerm").val();
// API Key
const apiKey = baa6592af236ee08c7befaf458396c28



api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}


let searchedLocations = [];
let cityLocation;

//store searched locations
function initializeData() {
    searchedLocations = JSON.parse(localStorage.getItem("weathercities"));
    
    let previouslySearched;
    if (searchedLocations) {
        cityLocation = searchedLocations[searchedLocations.length - 1];
        showPrevious();
        getCurrent(cityLocation);
    } else {
        navigator.geolocation.getCurrentPosition(success, error);
    }
}



// Append content to the forecast
function cityConditions (response) {
$('')
}





// fetch temperature and convert to fahrenheit
let convertTemp = (results[i].main.temp - 273.15) * 1.80 + 32;
let tempFahrenheit = Math.floor(convertTemp);



// function to convert temp
$.ajax({
    url:queryUrl,
    method: "GET"
})
.then(function (response){
    let temp = (response.main.temp - 273.15) * 1.80 + 32;
})