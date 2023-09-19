
import Notiflix from 'notiflix';
export function fetchCountries(countryName) {
    const url = `https://restcountries.com/v3.1/name/${countryName}?fields=name,capital,population,flags,languages`;
    return fetch(`${url}`).then(response => {
      if(!response.ok){
        throw new Error(Notiflix.Notify.failure("Oops, there is no country with that name"));
      }
      return response.json();
    });
  }