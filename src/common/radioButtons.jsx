import "./radioButtons.css";

const RadioButtons = ({ onExpOrIncChange, gliderType }) => {
  return (
    <div className="tabs ExporInc">
      <input
        type="radio"
        id="radio-2"
        name="tabs"
        defaultChecked
        onClick={() => onExpOrIncChange("expense")}
      />
      <label className="tab" htmlFor="radio-2">
        Expenses
      </label>
      <input
        type="radio"
        id="radio-3"
        name="tabs"
        onClick={() => onExpOrIncChange("income")}
      />
      <label className="tab" htmlFor="radio-3">
        Income
      </label>
      <span className={`glider ${gliderType}`}></span>
    </div>
  );
};

export default RadioButtons;
