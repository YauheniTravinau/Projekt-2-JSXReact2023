
const AmountInput = ({ value, onChange }) => {
    return (
        <input
            type="number"
            step="0.01"
            min="0.01"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="form-control"
            placeholder="Enter amount"
            required
        />
    );
};

export default AmountInput;
