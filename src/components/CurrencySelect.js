
const CurrencySelect = ({ value, onChange }) => {
    return (
        <select value={value} onChange={(e) => onChange(e.target.value)} className="form-control">
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
            <option value="CHF">CHF</option>
        </select>
    );
};

export default CurrencySelect;
