const API_URL = 'https://api.nbp.pl/api/exchangerates/rates/A/';

export const getExchangeRate = async (currency) => {
    const response = await fetch(`${API_URL}${currency}/?format=json`);
    const data = await response.json();

    if (data.rates.length > 0) {
        return data.rates[0].mid;
    } else {
        throw new Error('Unable to get exchange rate');
    }
};