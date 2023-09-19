import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const form = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 300;

form.addEventListener('input', debounce(searchCountryByName, DEBOUNCE_DELAY));

function searchCountryByName(e) {
  const inputValue = e.target.value;
  const resultValue = inputValue.trim();
  console.log(resultValue);
  validationResponse(resultValue);
}

function validationResponse(value) {
  if (value === '') {
    countryListEl.innerHTML = '';
    countryInfoEl.innerHTML = '';
  } else {
    fetchCountries(value).then(response => {
      console.log(response);
      if (response.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }
      renderCountryList(response);
      renderCountryInfo(response);
    });
  }
}

function renderCountryList(country) {
  const countryListMarkup = country
    .map(({ name: { common }, flags: { svg } }) => {
      return `<li class="country-name"><img width=30 heigth=20 src="${svg}">${common}</li>`;
    })
    .join('');
  countryListEl.innerHTML = countryListMarkup;
}

function renderCountryInfo(country) {
  const countryInfoMarkup = country
    .map(({ capital, population, languages }) => {
      const languagesValue = Object.values(languages).join(', ');
      return `<ul class="country-info">
                <li><b>Capital:</b> ${capital}</li>
                <li><b>Population:</b> ${population}</li>
                <li><b>Languages:</b> ${languagesValue}</li>
              </ul>`;
    })
    .join('');

  if (country.length <= 1) {
    countryInfoEl.innerHTML = countryInfoMarkup;
  } else {
    countryInfoEl.innerHTML = '';
  }
}
