import React, { useState } from 'react';
import { getExchangeRate } from '../services/currencyService';
import Loader from '../components/Loader';
import '../styles/CurrencyConverter.css';


const CurrencyConverter = () => {
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('EUR');
    const [convertedAmount, setConvertedAmount] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
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
        <div className="container">
            <h1 className="mt-4">Currency Converter</h1>
            <div className="logo-container">
                <img src={process.env.PUBLIC_URL + '/logo1.png'} alt="Logo" className="logo" />
            </div>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="row">
                    <div className="col-md-6">
                        <input
                            type="number"
                            step="0.01"
                            min="0.01"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="form-control"
                            placeholder="Enter amount"
                        />
                    </div>
                    <div className="col-md-4">
                        <select
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                            className="form-control"
                        >
                            <option value="EUR">EUR</option>
                            <option value="USD">USD</option>
                            <option value="CHF">CHF</option>
                        </select>
                    </div>
                    <div className="col-md-2">
                        <button type="submit" className="btn btn-primary">
                            Convert
                        </button>
                    </div>
                </div>
            </form>
            {isLoading && <Loader />}
            {convertedAmount !== null && (
                <p className="mt-4">
                    Converted amount: {convertedAmount} PLN
                </p>
            )}
        </div>
    );
};

export default CurrencyConverter;
