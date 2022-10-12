import useLocalStorage from "../hooks/useLocalStorage";
import "./themeToggle.css";

const ThemeToggle = ({ theme, onThemeChange }) => {
  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";

    onThemeChange(newTheme);
  };
  return (
    // <div className="themeToggle-container">
    //   <button className="ToggleBtn" onClick={switchTheme}></button>
    // </div>
    <div className="toggle-btn" id="_1st-toggle-btn">
      <input type="checkbox" onClick={switchTheme} />
      <span></span>
    </div>
  );
};

export default ThemeToggle;
