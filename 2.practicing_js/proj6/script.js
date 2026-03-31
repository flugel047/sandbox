const btn= document.querySelector('.btn-country');
const renderCountry = function(data) {
  const html = `
    <div class="country-card">
      <img class="country-card__flag" src="${data.flags.png}" alt="Flag of ${data.name.common}">
      <div class="country-card__body">
        <h1 class="country-card__name">${data.name.common}</h1>
        <p class="country-card__official">${data.name.official}</p>
        <div class="country-card__details">
          <p><span class="label">Capital</span> ${data.capital[0]}</p>
          <p><span class="label">Region</span> ${data.region}</p>
          <p><span class="label">Subregion</span> ${data.subregion}</p>
          <p><span class="label">Population</span> ${(data.population/1000000).toFixed(1)}M</p>
          <p><span class="label">Currency</span> ${Object.values(data.currencies)[0].name}</p>
          <p><span class="label">Languages</span> ${Object.values(data.languages).join(', ')}</p>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', html);
}
const getCountryData=function(country)
{
    fetch(`https://restcountries.com/v3.1/name/${country}?fullText=true`).then(function(fetchResponse)
    {
        // console.log(fetchResponse);
        return fetchResponse.json();
    },err=>alert(err)).then(function(jsonData)
        {
            console.log(jsonData);
            renderCountry(jsonData[0]);
            const neighbour=jsonData[0].borders[0];
            if(!neighbour) return ;

            return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`)
        }).then(response => response.json()).then(data => renderCountry(data[0], 'neighbour'))
        };



{
    getCountryData('portugal');
    getCountryData('united states');
    getCountryData('India');
}
        

navigator.getLocation.getCurrentPosition(position=>console.log(position),err=>console.log(err));
