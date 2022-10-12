import { gsap } from "gsap";
import React, { useEffect, useState } from "react";
import "./pieChart.css";

export default function PieChart({ totalIncome, totalExpenses }) {
  const [leftover, setLeftover] = useState(0);
  const [barValue, setBarValue] = useState(0);
  const [over, setOver] = useState(false);

  useEffect(() => {
    setLeftover(+(totalIncome - totalExpenses).toFixed(2) + " €");
    setOver(totalExpenses > totalIncome ? true : false);
    setBarValue(over ? 100 : 100 - (1 - totalExpenses / totalIncome) * 100);

    if (totalIncome === 0 && totalExpenses === 0) {
      setLeftover("No expenses");
      setBarValue(1);
    }
    if (totalIncome !== 0 && totalExpenses === 0) {
      setLeftover(0 + " €");
      setBarValue(1);
    }
  }, [totalExpenses, totalIncome, over, barValue]);

  document.documentElement.style.setProperty("--barValue", `${barValue}%`);

  return (
    <div className="pieChart">
      <div className="donut">
        <h2 className={`leftoverHeading ${over && "over"}`}>{leftover}</h2>
        <h3 className="incomeHeading">{totalIncome} €</h3>
      </div>
    </div>
  );
}
