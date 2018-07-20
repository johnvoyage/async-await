const axios = require('axios');

const { fixerIoKey } = require('./api_keys.js');

const getExchangeRate = (from, to) => {
  return axios.get(`http://data.fixer.io/api/latest?access_key=${fixerIoKey}`).then((response) => {
    const euro = 1 / response.data.rates[from];
    const rate = euro * response.data.rates[to];
    return rate;
  });
};

getExchangeRate('USD', 'CAD').then((rate) => {
  console.log(rate);
});
