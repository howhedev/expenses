import React from "react";
import { useExpenses } from "../contexts/expenseContext";
import { expensesMapper } from "../utils";
import Greetings from "./greetings";
import "./home.css";
import NavBar from "./navBar";
import TransactionsList from "./transactionsList";

export default function Home() {
  const { expenses } = useExpenses();

  const expensesData = expensesMapper(expenses);

  return (
    <div className="home-screen">
      <Greetings name={"Peter Nad"} />
      <TransactionsList expensesdata={expensesData} />
      <NavBar />
    </div>
  );
}
