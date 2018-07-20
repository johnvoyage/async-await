const axios = require('axios');

const { fixerIoKey } = require('./api_keys.js');

const getExchangeRate = async (from, to) => {
  try {
    const response = await axios.get(`http://data.fixer.io/api/latest?access_key=${fixerIoKey}`);
    const euro = 1 / response.data.rates[from];
    const rate = euro * response.data.rates[to];

    if (isNan(rate)) {
      throw new Error();
    };

    return rate;
  } catch (err) {
    throw new Error(`Unable to get exchange rate for ${from} and ${to}.`);
  };
};

const getCountries = async (currencyCode) => {
  try {
    const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
    return response.data.map((country) => country.name);
  } catch (err) {
    throw new Error(`Unable to get countries that use ${currencyCode}.`)
  }
};

const convertCurrency = async (from, to, amount) => {
  const exchangeRate = await getExchangeRate(from, to);
  const countries = await getCountries(to);
  const convertedAmount = (amount * exchangeRate).toFixed(2) ;
  return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend it in the following country(ies): ${countries.join(', ')}`
};

convertCurrency('USD', 'CAD', 20).then((message) => {
  console.log(message);
}).catch((err) => {
  console.log(err.message)
});

const add = async (a, b) => {
  return a + b + c;
};

const doWork = async () => {
  try {
    const result = await add(12, 13);
    return result;
  } catch (err) {
    return 10
  }
};

// doWork().then((data) => {
//   console.log(data);
// }).catch((err) => {
//   console.log('Something went wrong');
// });
