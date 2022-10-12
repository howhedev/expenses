import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Categories from "../common/categories";
import RadioButtons from "../common/radioButtons";
import { useExpenses } from "../contexts/expenseContext";

import "./modal.css";

export default function Modal({ setOpenModal }) {
  const [selectedCategory, setSelectedCategory] = useState("Other");
  const [selectedDescription, setSelectedDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState();
  const [selectedExpOrInc, setSelectedExpOrInc] = useState("expense");
  const [selectedAmount, setSelectedAmount] = useState(0);
  const navigate = useNavigate();

  const { addExpense } = useExpenses();

  const handleChange = (event) => {
    if (event.target.name === "description") {
      setSelectedDescription(event.target.value);
    }
    if (event.target.name === "date") {
      setSelectedDate(event.target.value);
    }
    if (event.target.name === "amount") {
      setSelectedAmount(event.target.value);
    }
  };

  const onExpOrIncChange = (expOrInc) => {
    setSelectedExpOrInc(expOrInc);
  };

  const onCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    addExpense({
      description: selectedDescription,
      amount: selectedAmount,
      date: selectedDate,
      category: selectedCategory,
      expOrInc: selectedExpOrInc,
    });

    navigate(-1);
  };

  return (
    <div className="temp">
      <div className="modalBackground">
        <div className="topContainer">
          <div className="titleCloseBtn">
            <button onClick={() => navigate(-1)}>&lt;</button>
            <h4>New Transaction</h4>
          </div>
        </div>
        <h4>Transaction</h4>
        <div className="modalContainer">
          <form className="modalInputs" onSubmit={handleSubmit}>
            <div className="textInputs">
              <RadioButtons
                onExpOrIncChange={onExpOrIncChange}
                gliderType="primaryButton"
              />
              <input
                type="text"
                name="description"
                pattern="[a-zA-Z0-9 ]{3,}"
                required
                className="description"
                placeholder="Description"
                onChange={handleChange}
              />
              <input
                type="date"
                name="date"
                required
                className="date"
                onChange={handleChange}
              />

              <input
                type="number"
                name="amount"
                pattern="\d"
                required
                className="amount"
                placeholder="Amount"
                step=".01"
                onChange={handleChange}
              />
            </div>
            <h5>Categories</h5>
            <Categories onCategoryChange={onCategoryChange} />
            <div className="additionContainer">
              <input type="submit" value="Add" className="primaryButton" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
