import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ReactComponent as AddNew } from "../icons/addNew.svg";
import Dropdown from "./dropdown";
import ExpenseCard from "./expenseCard";
import Modal from "./modal";
import PieChart from "./pieChart";
import "./transactionsList.css";

export default function TransactionsList({ expensesdata }) {
  const months = [...new Set(expensesdata.map((month) => month.date.month))];
  const years = [...new Set(expensesdata.map((year) => year.date.year))];

  const [totalIncomeForMonthYear, setTotalIncomeForMonthYear] = useState(0);
  const [totalExpenseForMonthYear, setTotalExpenseForMonthYear] = useState(0);
  const [dropdownMonth, setDropdownMonth] = useState(months[months.length - 1]);
  const [dropdownYear, setDropdownYear] = useState(years[years.length - 1]);

  const location = useLocation();
  const { pathname } = location;

  const filteredList = expensesdata.filter((expense) => {
    return (
      expense.date.year === dropdownYear && expense.date.month === dropdownMonth
    );
  });

  // Sorting filtered list by date
  filteredList.sort((item, next) => {
    return item.date.day > next.date.day ? 1 : -1;
  });

  useEffect(() => {
    const selectedExpense = filteredList.reduce((sum, expense) => {
      return expense.price < 0 ? (sum += expense.price) : sum;
    }, 0);

    const selectedIncome = filteredList.reduce((sum, expense) => {
      return expense.price > 0 ? (sum += expense.price) : sum;
    }, 0);

    setTotalExpenseForMonthYear(selectedExpense);
    setTotalIncomeForMonthYear(selectedIncome);
  }, [filteredList, dropdownMonth, dropdownYear]);

  const onMonthChange = (month) => {
    setDropdownMonth(month);
  };
  const onYearChange = (year) => {
    setDropdownYear(year);
  };

  return (
    <div className="container">
      <PieChart
        totalIncome={totalIncomeForMonthYear}
        totalExpenses={-totalExpenseForMonthYear}
      />
      <div className="dates">
        <Dropdown
          dropDownPosition={"left"}
          onMonthChange={onMonthChange}
          options={months}
        />
        <Dropdown
          dropDownPosition={"right"}
          onYearChange={onYearChange}
          options={years}
        />
      </div>
      <div className="transactions-list">
        <h3>Transactions</h3>
        <div expensesdata={expensesdata} className="transactions">
          {filteredList.map((expense) => (
            <ExpenseCard
              expense={expense}
              key={expense.id}
              name={expense.name}
              type={expense.type}
              date={expense.date}
              price={expense.price}
            />
          ))}
        </div>
      </div>
      <div className="addInDesktop">
        <Link to="/add">
          <AddNew className={pathname === "/add" ? "activeNav" : "logoNav"} />
        </Link>
      </div>
    </div>
  );
}
