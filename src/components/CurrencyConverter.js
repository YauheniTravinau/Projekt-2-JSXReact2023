import React, { useState } from 'react';
import { getExchangeRate } from '../services/currencyService';
import Loader from '../components/Loader';
import '../components/CurrencyConverter.css';

import AmountInput from '../components/AmountInput';
import CurrencySelect from '../components/CurrencySelect';
import ConvertButton from '../components/ConvertButton';

const CurrencyConverter = () => {
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('EUR');
    const [convertedAmount, setConvertedAmount] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!amount) {
            return;
        }

        setIsLoading(true);

        try {
            const exchangeRate = await getExchangeRate(currency);
            const converted = amount * exchangeRate;
            setConvertedAmount(converted.toFixed(2));
        } catch (error) {
            console.error(error);
        }

        setIsLoading(false);
    };

    return (
        <div className="currency-converter-container">
            <h1>Currency Converter</h1>
            <div className="logo-container">
                <img src={process.env.PUBLIC_URL + '/logo1.png'} alt="Logo" className="logo" />
            </div>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-6">
                        <AmountInput value={amount} onChange={setAmount} />
                    </div>
                    <div className="col-md-4">
                        <CurrencySelect value={currency} onChange={setCurrency} />
                    </div>
                    <div className="col-md-2">
                        <ConvertButton />
                    </div>
                </div>
            </form>
            {isLoading && <Loader />}
            {convertedAmount !== null && (
                <p className="converted-amount">Converted amount: {convertedAmount} PLN</p>
            )}
        </div>
    );
};

export default CurrencyConverter;
