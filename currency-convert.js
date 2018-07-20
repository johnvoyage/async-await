const axios = require('axios');

const { fixerIoKey } = require('./api_keys.js');

const oldGetExchangeRate = (from, to) => {
  return axios.get(`http://data.fixer.io/api/latest?access_key=${fixerIoKey}`).then((response) => {
    const euro = 1 / response.data.rates[from];
    const rate = euro * response.data.rates[to];
    return rate;
  });
};

const newGetExchangeRate = async (from, to) => {
  const response = await axios.get(`http://data.fixer.io/api/latest?access_key=${fixerIoKey}`);
  const euro = 1 / response.data.rates[from];
  const rate = euro * response.data.rates[to];
  return rate;
};

oldGetExchangeRate('USD', 'CAD').then((rate) => {
  console.log(rate);
});

newGetExchangeRate('USD', 'CAD').then((rate) => {
  console.log(rate);
});

const oldGetCountries = (currencyCode) => {
  return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`).then((response) => {
    return response.data.map((country) => country.name);
  });
};

const newGetCountries = async (currencyCode) => {
  const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
  return response.data.map((country) => country.name);
};

oldGetCountries('USD').then((countries) => {
  console.log(countries);
});

newGetCountries('USD').then((countries) => {
  console.log(countries);
});
