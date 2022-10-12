import { useEffect, useRef, useState } from "react";
import "./dropdown.css";

const Dropdown = ({
  dropDownPosition,
  options,
  onMonthChange,
  onYearChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    options[options.length - 1]
  );
  const dropdownBtnRef = useRef();

  const onOptionClicked = (value) => () => {
    isNaN(value) ? onMonthChange(value) : onYearChange(value);
    setSelectedOption(value);
    setIsOpen(false);
  };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (
        isOpen &&
        dropdownBtnRef.current &&
        !dropdownBtnRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isOpen]);

  return (
    <div className="main">
      <div ref={dropdownBtnRef} className="DropDownContainer">
        <div
          className="DropDownHeader"
          onClick={() => setIsOpen((oldState) => !oldState)}
        >
          {selectedOption || options[0]}
        </div>
        {isOpen && (
          <div className={`DropDownListContainer ${dropDownPosition}`}>
            <div className="DropDownList">
              {options.map((option) => (
                <div
                  className="ListItem"
                  onClick={onOptionClicked(option)}
                  key={Math.random()}
                >
                  {option}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
