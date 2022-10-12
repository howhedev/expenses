import React from "react";
import { useExpenses } from "../contexts/expenseContext";
import useLongPress from "../hooks/useLongPress";
import { ReactComponent as Food } from "../icons/food.svg";
import { ReactComponent as Gas } from "../icons/gas.svg";
import { ReactComponent as Home } from "../icons/home.svg";
import { ReactComponent as Other } from "../icons/other.svg";
import { ReactComponent as Shop } from "../icons/shop.svg";
import { ReactComponent as Streaming } from "../icons/streaming.svg";
import { ReactComponent as Withdraw } from "../icons/withdraw.svg";
import { ReactComponent as Work } from "../icons/work.svg";
import { currencyFormatter } from "./../utils";
import "./expenseCard.css";

export default function ExpenseCard({ expense, name, type, date, price }) {
  const { action, handlers } = useLongPress();
  const { deleteExpense } = useExpenses();

  const pickType = (type) => {
    switch (type) {
      case "Gas":
        return <Gas className="logo" />;
      case "Home":
        return <Home className="logo" />;
      case "Shop":
        return <Shop className="logo" />;
      case "Streaming":
        return <Streaming className="logo" />;
      case "Withdraw":
        return <Withdraw className="logo" />;
      case "Work":
        return <Work className="logo" />;
      case "Food":
        return <Food className="logo" />;
      default:
        return <Other className="logo" />;
    }
  };

  function TypeCompomnent() {
    return pickType(type);
  }

  const onDeleteCard = () => {
    console.log(action);
    if (action === "longpress") {
      deleteExpense(expense);
    }
  };

  return (
    <div className="expenseCard-container" {...handlers}>
      <div className="expenseCard-data">
        <div className="expenseIcon">
          <TypeCompomnent />
        </div>
        <div className="expenseTitleDate">
          <h4 className="expenseTitle">{name}</h4>
          <h5 className="expenseDate">{`${date.month} ${date.day}, ${date.year}`}</h5>
        </div>

        <div className="expensePrize">
          <h5 className={`${price > 0 ? "green" : "red"}  "prizee"`}>
            {currencyFormatter.format(price)}
          </h5>
        </div>
      </div>
      <div
        className="deleteHandler"
        onMouseUp={onDeleteCard}
        onTouchEnd={onDeleteCard}
      ></div>
    </div>
  );
}
