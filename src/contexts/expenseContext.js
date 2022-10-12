import React, { useContext } from "react";
import { v4 as uuidV4 } from "uuid";
import useLocalStorage from "../hooks/useLocalStorage";

const ExpenseContext = React.createContext();

export function useExpenses() {
  return useContext(ExpenseContext);
}

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useLocalStorage("expenses", []);

  function addExpense({ description, amount, date, category, expOrInc }) {
    setExpenses((prevExpenses) => {
      return [
        ...prevExpenses,
        { id: uuidV4(), description, amount, date, category, expOrInc },
      ];
    });
  }

  function deleteExpense({ id }) {
    setExpenses((prevExpenses) => {
      return prevExpenses.filter((expense) => expense.id !== id);
    });
  }

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        addExpense,
        deleteExpense,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
