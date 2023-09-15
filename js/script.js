const searchBtn= document.querySelector(".search-wrapper #search-btn");
const countryInput= document.querySelector(".search-wrapper input");
const errorMessage= document.querySelector(".error-message h2");
const resultContainer= document.querySelector(".result-container");



// LISTEN TO SEARCH BUTTON CLICK EVENT, TRIM WHITE SPACES FROM INPUT VALUE AND ASSIGN EMPTY STRING AS INPUT VALUE IF FOUND EMPTY.

searchBtn.addEventListener('click', ()=>{
    let countryName= countryInput.value ? countryInput.value.trim() : "";
    console.log(countryName)
    try {
        urlFunction(countryName)
    } catch (error) {
        errorMessage.textContent= error;
    }
    
})


// CHECK IF INPUT LENGTH IS ZERO/ EMPTY STRING IF TRUE IT THROWS ERROR ELSE IT CREATES A URL STRING VALUE
function urlFunction(countryName){
    if(countryName.length === 0 ){
        throw new Error("input field cannot be empty, enter a valid country name")
    }
    const apiUrl= `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;

    fetchFunction(apiUrl);
}


// fetches data from the provided URL from THIRD party API
async function fetchFunction(url){
    try {
        const response= await fetch(url);
        const data = await response.json();
        showResults(data)
    } catch (error) {
        errorMessage.textContent= error;
    }
}


// CREATE HTML ELEMENTS TO DISPLAY THE RESPONSE DATA FROM API
function showResults(data){
    resultContainer.innerHTML = `
            <div class="image-wrapper">
                <img src="${data[0].flags.png}" alt="" width="65%" height="120px">
                <p>${data[0].flags.alt}</p>
            </div>
            <div class="result-details-wrapper">
                <label><h1>Country:</h1><h2>${data[0].name.common}</h2></label>
                <label><h1>Capital City:</h1> <p>${data[0].capital[0]}</p></label>
                <label><h1>Continent:</h1><p>${data[0].continents[0]}</p></label>
                <label><h1>Current Population:</h1> <p>${data[0].population.toLocaleString()}</p></label>
            </div>   
     `
}

// CLEAR ERROR WHEN USER STARTS TYPING AGAIN
countryInput.addEventListener('focus', ()=>{
    errorMessage.textContent = ""
})