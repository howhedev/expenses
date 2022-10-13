import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import GraphSection from "./components/graphSection";
import Home from "./components/home";
import Modal from "./components/modal";
import NavBar from "./components/navBar";
import ThemeToggle from "./components/themeToggle";
import TransactionsList from "./components/transactionsList";
import { useExpenses } from "./contexts/expenseContext";
import useLocalStorage from "./hooks/useLocalStorage";
import { graphDataMapper } from "./utils";

function App() {
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? "dark" : "light"
  );
  const mql = window.matchMedia("(max-width: 912px)");
  const [mobileView, setMobileView] = useState(mql.matches);
  const { expenses } = useExpenses();
  const expensesData = graphDataMapper(expenses);

  const onThemeChange = (theme) => {
    setTheme(theme);
  };

  mql.addEventListener("change", (e) => {
    const mobileViewer = e.matches;
    setMobileView(mobileViewer);
  });

  return (
    <Router basename="/expenses">
      <div className="app" data-theme={theme}>
        <ThemeToggle theme={theme} onThemeChange={onThemeChange} />
        {mobileView && (
          <>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/graph"
                element={
                  <GraphSection theme={theme} expensesdata={expensesData} />
                }
              ></Route>
              <Route path="/add" element={<Modal />}></Route>
              <Route path="*" element={<Home />} />
            </Routes>
            <NavBar />
          </>
        )}

        {!mobileView && (
          <div className="desktop">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Home />
                    <GraphSection theme={theme} expensesdata={expensesData} />
                  </>
                }
              />
              <Route path="/add" element={<Modal />}></Route>
              <Route
                path="*"
                element={
                  <>
                    <Home />
                    <GraphSection theme={theme} expensesdata={expensesData} />
                  </>
                }
              />
            </Routes>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
