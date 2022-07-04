var inputEl = document.querySelector("#city-input");
var savedCitiesEl = document.querySelector("#saved-cities-holder");
var searchBtnEl = document.querySelector("#btn-search");
var currentWeatherEl = document.querySelector("#current");
var noCitiesFoundEl = document.querySelector("#noCitiesFound");





// BEGIN loadSavedCities FUNCTION
var loadSavedCities = function(){
    // get any saved cities out of local storage and parse them back into an array called "savedCities"
    var savedCities = localStorage.getItem("savedCitySearches");
        savedCities = JSON.parse(savedCities);

        // if any savedCities were found, go through each of them and create a button element under the city search form
        if(savedCities){
            
        for (i = 0; i < 7; i++){
            var item = document.createElement("button");
            item.classList=("btn  col-12 mt-3 city-btn");
            item.setAttribute("data-query-value",savedCities[i]);
            item.textContent=(savedCities[i]);
            savedCitiesEl.appendChild(item);
            
        }
    }
}// end loadSavedCities function

loadSavedCities();



// BEGIN SEARCH BUTTON FUNCTION
var search = function(event){
    // prevent default action of bootstrap button element and continue with our own functionality instead
    event.preventDefault();

    // look for any saved cities in local storage 
    var searched = localStorage.getItem("savedCitySearches");

    // if any saved cities are found, parse them into the "searched" array so any new searched cities will be added to the saved ones
    if(searched){
        searched = JSON.parse(searched);
    }
    // if no saved cities are found, just set the "searched" array to an empty array so we can start adding cities to it
    else{
        searched = [];
    };

    // check to see if anything has been entered into the city search input element and only continue if there is something there
    if(inputEl.value){
        // add the new city to the beginning of the "searched" array so that when we save the searched cities
        // to local storage, they will appear with the most recently searched cities listed first
        searched.unshift(inputEl.value);
        // save the updated "searched" array to local storage
        localStorage.setItem("savedCitySearches",JSON.stringify(searched));
        
        // create a new button for the searched city and display it under the search input form and put it above any saved city buttons that are already there
        // then, clear out the input element so we can search for a new city
        var item = document.createElement("button");
            item.classList=("btn  col-12 mt-3 city-btn");
            item.setAttribute("data-query-value",inputEl.value);
            item.textContent=(inputEl.value);
            var city=(inputEl.value);
            savedCitiesEl.prepend(item);
            inputEl.value=("");


        getWeather(city);
    }
    return;
}// end search button function


var getWeather = function(city){

    var currentDateTime = new Date();
    var date = currentDateTime.getMonth()+"/"+currentDateTime.getDate()+"/"+currentDateTime.getFullYear();
   
    var APIkey = "568a27ffc728ed645193b7db830d13da";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+APIkey+"&units=imperial";
    


    fetch(queryURL)
        .then(function(response){
            if(response.ok){
                response.json().then(function(data){
                    console.log(data);
                    var currentWeatherArticle = document.createElement("article");
                    currentWeatherArticle.id=("article");

                    
                    // display selected city name, date, and weather icon
                    var cityHeading = document.createElement("h2");
                    cityHeading.className=("fw-bold");
                    cityHeading.innerHTML=(data.name+" ("+date+")"+"<img src='http://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png'></img>");
                    currentWeatherArticle.appendChild(cityHeading);
                    // get and display current temperature
                    var currentTemp = document.createElement("h5");
                    currentTemp.className=("mb-4");
                    currentTemp.textContent=("Temp: "+data.main.temp+"\xB0F");
                    currentWeatherArticle.appendChild(currentTemp);
                    // get and display current wind speed
                    var currentWindSpeed = document.createElement("h5");
                    currentWindSpeed.className=("mb-4");
                    currentWindSpeed.textContent=("Wind: "+data.wind.speed+"MPH");
                    currentWeatherArticle.appendChild(currentWindSpeed);
                    // get and display current humidity
                    var currentHumidity = document.createElement("h5");
                    currentHumidity.className=("mb-4");
                    currentHumidity.textContent=("Humidity: "+data.main.humidity+"%");
                    currentWeatherArticle.appendChild(currentHumidity);

                    // get and display current uv index
                    var lat = data.coord.lat;
                    var lon = data.coord.lon;

                    var uvIndexURL = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude=hourly,daily&appid="+APIkey;

                    fetch(uvIndexURL)
                        .then(function(response){
                            response.json().then(function(data){
                                console.log(data);
                                var uvIndex = document.createElement("h5");
                                uvIndex.className=("mb-4");
                                currentWeatherArticle.appendChild(uvIndex);
                                if(data.current.uvi<=2){
                                    uvIndex.innerHTML=("UV Index: <span class= 'mb-4 p-2 rounded bg-success'>"+data.current.uvi+"</span>");
                                }
                                else if(data.current.uvi>2 && data.current.uvi<=5.9 ){
                                    uvIndex.innerHTML=("UV Index: <span class= 'mb-4 p-2 rounded bg-warning'>"+data.current.uvi+"</span>");
                                }
                                else if(data.current.uvi>5.9 && data.current.uvi<=7.9){
                                    uvIndex.innerHTML=("UV Index: <span class= 'mb-4 p-2 rounded bg-secondary'>"+data.current.uvi+"</span>");
                                }
                                else if(data.current.uvi>7.9 && data.current.uvi<=10.9){
                                    uvIndex.innerHTML=("UV Index: <span class= 'mb-4 p-2 rounded bg-danger'>"+data.current.uvi+"</span>");
                                }
                                else if(data.current.uvi>10.9){
                                    uvIndex.innerHTML=("UV Index: <span class= 'mb-4 p-2 rounded bg-info'>"+data.current.uvi+"</span>");
                                }
                        })
                    })
                    if(document.getElementById("article")){
                        document.getElementById("article").remove();
                        currentWeatherEl.appendChild(currentWeatherArticle);
                    }
                    else if(document.getElementById("warningMsg")){
                        document.getElementById("warningMsg").remove();
                        currentWeatherEl.appendChild(currentWeatherArticle);
                    }
                    else{  
                        currentWeatherEl.appendChild(currentWeatherArticle);
                    }     
                })// end of if statement for when response is OK
        
            

            .catch(function(error) {
                $("#errorModal").modal();
            })
        }
            

            else if (document.getElementById("article")){
                    document.getElementById("article").remove();
                    var noCities = document.createElement("h1");
                    noCities.id=("warningMsg");
                    noCities.textContent=("No cities found, please try again.");          
                    currentWeatherEl.appendChild(noCities);
                }
                else{  
                    var noCities = document.createElement("h1");
                    noCities.id=("warningMsg");
                    noCities.textContent=("No cities found, please try again.");  
                    currentWeatherEl.appendChild(noCities);
                }
                
        })// end of else statement
           
}




var savedCityBtn = function(event){
    var city = event.target.getAttribute("data-query-value");
    console.log("I just clicked "+city);
    getWeather(city);
}













searchBtnEl.addEventListener("click", search);

savedCitiesEl.addEventListener("click",savedCityBtn);