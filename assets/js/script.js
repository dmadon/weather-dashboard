var inputEl = document.querySelector("#city-input");
var savedCitiesEl = document.querySelector("#saved-cities-holder");
var searchBtnEl = document.querySelector("#btn-search");


var searched = [];


var loadSavedCities = function(){
    var savedCities = localStorage.getItem("savedCitySearches");

        savedCities = JSON.parse(savedCities);
        console.log(savedCities);
        if(savedCities){
        for (i = 0; i < savedCities.length; i++){
            var item = document.createElement("button");
            item.classList=("btn  col-12 mt-3 city-btn");
            item.setAttribute("data-query-value",savedCities[i]);
            item.textContent=(savedCities[i]);
            savedCitiesEl.appendChild(item);
            
        }
        searched.push(savedCities);
    }

}




var search = function(event){
    event.preventDefault();
    
    if(inputEl){
        searched.unshift(inputEl.value);
        console.log(searched);
        localStorage.setItem("savedCitySearches",JSON.stringify(searched));
        inputEl.value=("");
        loadSavedCities();
    }
    return;
}


loadSavedCities();


searchBtnEl.addEventListener("click", search);