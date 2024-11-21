
const goButton = document.getElementById('go');

goButton.onclick = () => {
    fetchCountryByIdOrName();
}

function displayLoading() {
    div = document.getElementById('target');
    div.innerHTML = `loading...`;
    document.body.classList.add('wait');
}

function displayCountry(r) {
    document.getElementById('target').innerHTML = `
        <h2>${r.name}</h2>
        <table>
        <tr><th>Continent</th><td>${r.continent}</td></tr>
        <tr><th>Capital</th><td>${r.capital}</td></tr>
        <tr><th>GDP</th><td>${r.gdp.toLocaleString()}</td></tr>
        <tr><th>Population</th><td>${r.population.toLocaleString()}</td></tr>
        </table>
        <img style='width:200px' src='${r.flag}'></img>
        `;
        document.body.classList.remove('wait');
}

function fetchCountryByIdOrName(){
    // read country id from user input
    countryIdOrName = document.getElementById('num').value;

    displayLoading();
    
    fetch(`/country/${countryIdOrName}`) // fetch country data
    .then(r=>r.json())             // turn response into json
    .then(r=>{                     // process the response
        displayCountry(r);
    })
}
