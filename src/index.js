import './css/styles.css';

const DEBOUNCE_DELAY = 300;
const debounce = require('lodash.debounce');

const searchBox = document.querySelector('#search-box');
let countryList = document.querySelector('.country-list');
let countryInfo = document.querySelector('.country-info');

import { fetchCountries } from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

searchBox.addEventListener('input', debounce(updateValue, DEBOUNCE_DELAY));

function updateValue(e) {
  if (e.target.value != '') {
    fetchCountries(e.target.value.trim())
      .then(countries => {
        if (countries.length > 10) {
          countryInfo.innerHTML = '';
          countryList.innerHTML = '';
          Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        } else {
          countryInfo.innerHTML = '';
          countryList.innerHTML = '';
          renderList(countries);
        }
      })
      .catch(error => {
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';
        Notify.failure('Oops, there is no country with that name');
      });
  }
}

function renderList(countries) {
  if (countries.length == 1) {
    countryInfo.innerHTML = `
      <h1><img src="${countries[0].flags.svg}" alt="${
      countries[0].name.common
    }" width="30"> ${countries[0].name.common} </h1>
      <ul>
        <li><b>Capital:</b> ${countries[0].capital}</li>
        <li><b>Population:</b> ${countries[0].population}</li>
        <li><b>Languages:</b> ${Object.values(countries[0].languages)}</li>
      </ul>`;
  } else {
    let listOfLi = [];
    for (let item of countries) {
      let addLi = document.createElement('li');
      addLi.innerHTML = `<h3><img src="${item.flags.svg}" alt="${item.name.official}" width="30"> ${item.name.common} </h3>`;
      listOfLi.push(addLi);
    }
    countryList.append(...listOfLi);
  }
}
