const axios = require('axios');

const { fixerIoKey } = require('./api_keys.js');

// const oldGetExchangeRate = (from, to) => {
//   return axios.get(`http://data.fixer.io/api/latest?access_key=${fixerIoKey}`).then((response) => {
//     const euro = 1 / response.data.rates[from];
//     const rate = euro * response.data.rates[to];
//     return rate;
//   });
// };

const getExchangeRate = async (from, to) => {
  const response = await axios.get(`http://data.fixer.io/api/latest?access_key=${fixerIoKey}`);
  const euro = 1 / response.data.rates[from];
  const rate = euro * response.data.rates[to];
  return rate;
};

// oldGetExchangeRate('USD', 'CAD').then((rate) => {
//   console.log(rate);
// });

// getExchangeRate('USD', 'CAD').then((rate) => {
//   console.log(rate);
// });

// const oldGetCountries = (currencyCode) => {
//   return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`).then((response) => {
//     return response.data.map((country) => country.name);
//   });
// };

const getCountries = async (currencyCode) => {
  const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
  return response.data.map((country) => country.name);
};

// oldGetCountries('USD').then((countries) => {
//   console.log(countries);
// });

// getCountries('USD').then((countries) => {
//   console.log(countries);
// });

const oldConvertCurrency = (from, to, amount) => {
  let convertedAmount;
  return getExchangeRate(from, to).then((rate) => {
    convertedAmount = (amount * rate).toFixed(2);
    return getCountries(to);
  }).then((countries) => {
    return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend it in the following country(ies): ${countries.join(', ')}`;
  });
};

const convertCurrency = async (from, to, amount) => {
  const exchangeRate = await getExchangeRate(from, to);
  const countries = await getCountries(to);
  const convertedAmount = (amount * exchangeRate).toFixed(2) ;
  return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend it in the following country(ies): ${countries.join(', ')}`
};

convertCurrency('USD', 'USD', 20).then((message) => {
  console.log(message);
});
