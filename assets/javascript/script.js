var searchBtn = document.querySelector("#search-btn");
var cityName = document.querySelector("#city-input")
var tempEl = document.querySelector("#temperature");
var humidEl = document.querySelector("#humidity");
var windEl = document.querySelector("#wind");
var uvEl = document.querySelector("#uv-index");
var cityEl = document.querySelector("#mylist");
 var latitude
 var longitude 
 var date;

var cityArray = []

 var cordinates = []

var urlApi = "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=8405dd5c0ff1e9fc9b2565e494079bfc";

var weather = function (city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q= " + city + " &appid=8405dd5c0ff1e9fc9b2565e494079bfc&units=imperial";
    fetch(apiUrl)
        .then(function (response) {
            response.json().then(function (data) {
                tempEl.textContent = data.main.temp;
                humidEl.textContent = data.main.humidity;
                windEl.textContent = data.wind.speed;
                latitude = data.coord.lat;
                longitude = data.coord.lon;
                date = data.dt;
            }
            )
        }
        )
}

var scndApi = "https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=" + latitude + "&lon=" + longitude + "&dt= " + date + "&appid=8405dd5c0ff1e9fc9b2565e494079bfc"
var forecast = function(){
var scndApi = "https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=" + latitude + "&lon=" + longitude + "&dt= " + date + "&appid=8405dd5c0ff1e9fc9b2565e494079bfc"
fetch(scndApi)
.then(function (response){
    response.json().then(function(data){
        console.log(data);
    })
})
}


searchBtn.addEventListener("click", function(){
    var city = cityName.value;
    weather(city);
    cityArray.push(city);
    recentSearch();
    forecast();
    })

    var recentSearch = function(){
         for(var i = 0; i < cityArray.length; i++){

            cityEl = localStorage.getItem("savedCity");

            localStorage.setItem("savedCity",cityArray);

            key  = localStorage.key(i);

            document.getElementById("myList").innerHTML = " <li class=\"icon icon--right icon-arrow-right\">" + localStorage.getItem(key) + "</li>";
        }
     }