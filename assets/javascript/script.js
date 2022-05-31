//setting todays current date into today
var today = new Date();
//selecting serach button in html
var searchBtn = document.querySelector("#search-btn");
//capturing response
var cityName = document.querySelector("#city-input")
//selecting temperature in html
var tempEl = document.querySelector("#temperature");
//selecting humidity in html
var humidEl = document.querySelector("#humidity");
//selecting wind in html
var windEl = document.querySelector("#wind");
//selecting uv-index in html
var uvEl = document.querySelector("#uv-index");
//selecting a div with recent searched
var cityEl = document.querySelector("#mylist");
//selecting temperatures and humidity in cards
var day1TempEl = document.getElementById('day1temp');
var day1HumidEl = document.getElementById('day1humid');
var day2TempEl = document.getElementById('day2temp');
var day2HumidEl = document.getElementById('day2humid');
var day3TempEl = document.getElementById('day3temp');
var day3HumidEl = document.getElementById('day3humid');
var day4TempEl = document.getElementById('day4temp');
var day4HumidEl = document.getElementById('day4humid');
var day5TempEl = document.getElementById('day5temp');
var day5HumidEl = document.getElementById('day5humid');
//selecting uv index
var uvEl = document.getElementById('uv-index')
//selecting current city in html
var currentCity = document.getElementById('city');
//selecting date in html
var currentDate = document.getElementById('date');
//selecting wind speed
var speedEl1 = document.getElementById('day1speed');
var speedEl2 = document.getElementById('day2speed');
var speedEl3 = document.getElementById('day3speed');
var speedEl4 = document.getElementById('day4speed');
var speedEl5 = document.getElementById('day5speed');
//getting latitud and lonitude from first server
var latitude
var longitude
//creating an empty array to hold all the searches
var cityArray = []
//creating a weather function and passing parameter of city
var weather = function (city) {
    //adding the required parameter of city in url
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q= " + city + " &appid=8405dd5c0ff1e9fc9b2565e494079bfc&units=imperial";
    //calling fetch funtion on the url
    fetch(apiUrl)
    //getting response
        .then(function (response) {
            //putting that response into json and getting readable data
            response.json().then(function (data) {
                //populating tempEL with temperature
                tempEl.textContent = data.main.temp;
                //populating humidEl with humidity
                humidEl.textContent = data.main.humidity;
                //populating windEl with wind speed
                windEl.textContent = data.wind.speed;
                //getting latitude and longitude
                latitude = data.coord.lat;
                longitude = data.coord.lon;
                //populating current city with a city name
                currentCity.textContent = data.name;
                //populating cuurent date with today
                currentDate.textContent = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
                // calling fetch function on sencond api and passing api key latitide =, longitude as required parameters
                return fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&exclude=alerts,minutely,hourly&units=imperial&appid=ae65e311ba6fd03133a76ac315362842')
                //getting response 
                    .then(function (response) {
                //putting that response into json and getting readable data
                        response.json().then(function (data) {
                            //populating day 1 temp with tempaerature of day 1
                            day1TempEl.textContent = data.daily[0].temp.day;
                            //populating day 1 humidity with humidity of day 1
                            day1HumidEl.textContent = data.daily[0].humidity;
                            //populating day 2 temp with tempaerature of day 1
                            day2TempEl.textContent = data.daily[1].temp.day;
                            //populating day 2 humidity with humidity of day 1
                            day2HumidEl.textContent = data.daily[1].humidity;
                            //populating day 3 temp with tempaerature of day 1
                            day3TempEl.textContent = data.daily[2].temp.day;
                            //populating day 3 humidity with humidity of day 1
                            day3HumidEl.textContent = data.daily[2].humidity;
                            //populating day 4 temp with tempaerature of day 1
                            day4TempEl.textContent = data.daily[3].temp.day;
                            //populating day 4 humidity with humidity of day 1
                            day4HumidEl.textContent = data.daily[3].humidity;
                            //populating day 5 temp with tempaerature of day 1
                            day5TempEl.textContent = data.daily[4].temp.day;
                            //populating day 5 humidity with humidity of day 1
                            day5HumidEl.textContent = data.daily[4].humidity;
                            //popuating all the speed variables with wind speed
                            speedEl1.textContent = data.daily[0].wind_speed;
                            speedEl2.textContent = data.daily[1].wind_speed;
                            speedEl3.textContent = data.daily[2].wind_speed;
                            speedEl4.textContent = data.daily[3].wind_speed;
                            speedEl5.textContent = data.daily[4].wind_speed;
                            //populating uvEl with uv-index
                            uvEl.textContent = data.current.uvi;
                        })
                    })
            }
            )
        }
        )
}

//adding an event listener on serach button which gets called on a click
searchBtn.addEventListener("click", function () {
    //populatting city with usr input
    var city = cityName.value;
    //calling weather function with city
    weather(city);
    //pushing the user response into an array
    cityArray.push(city);
    //calling recentSearch function
    recentSearch();
})

var recentSearch = function () {
    //created a for loop that will run until the conditon statment is false
    for (var i = 0; i < cityArray.length; i++) {
        //calling localtrorage and setting it into cityEl
        cityEl = localStorage.getItem("savedCity");
        //setting up local storage 
        localStorage.setItem("savedCity", cityArray);
        //creating a key which will then loop through all of localstorage indexes
        key = localStorage.key(i);
        //adding searches to myList in the html
        document.getElementById("myList").innerHTML = " <button class=\"searchButtons\">" + localStorage.getItem(key) + "</button>";
    }
    //adding an event listener in the cityEl list adding click which will fucntion on event
    cityEl.addEventListener("click", function(e){
        //once an event occurs check to see we not getting parent div
        if(e.target !== e.currentTarget){
            //storing value of clock button into clicked item
            var clickedItem = e.target.value;
            //calling weather function with new paramter
            weather(clickedItem);
        }
        // telling it to stop looking
        e.stopPropagation();

    })
}