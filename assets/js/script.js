var inputEl = document.querySelector("#city-input");
var savedCitiesEl = document.querySelector("#saved-cities-holder");
var searchBtnEl = document.querySelector("#btn-search");


// BEGIN loadSavedCities FUNCTION
var loadSavedCities = function(){
    // get any saved cities out of local storage and parse them back into an array called "savedCities"
    var savedCities = localStorage.getItem("savedCitySearches");
        savedCities = JSON.parse(savedCities);

        // if any savedCities were found, go through each of them and create a button element under the city search form
        if(savedCities){
            
        for (i = 0; i < savedCities.length; i++){
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
            savedCitiesEl.prepend(item);
            inputEl.value=("");
    }
    return;
}// end search button function





searchBtnEl.addEventListener("click", search);