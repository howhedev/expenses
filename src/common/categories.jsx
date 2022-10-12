import { useState } from "react";
import { ReactComponent as Food } from "../icons/food.svg";
import { ReactComponent as Gas } from "../icons/gas.svg";
import { ReactComponent as Home } from "../icons/home.svg";
import { ReactComponent as Other } from "../icons/other.svg";
import { ReactComponent as Shop } from "../icons/shop.svg";
import { ReactComponent as Streaming } from "../icons/streaming.svg";
import { ReactComponent as Withdraw } from "../icons/withdraw.svg";
import { ReactComponent as Work } from "../icons/work.svg";
import "./categories.css";
import Tooltip from "./tooltip";

const Categories = ({ onCategoryChange }) => {
  const [isActive, setIsActive] = useState({
    gas: false,
    shop: false,
    withdraw: false,
    home: false,
    work: false,
    streaming: false,
    food: false,
    other: true,
  });

  const setActiveCategory = (category) => {
    const temporaryCategories = isActive;
    for (let categoryTemp in temporaryCategories) {
      temporaryCategories[categoryTemp] =
        categoryTemp === category ? true : false;
    }
    setIsActive(temporaryCategories);
  };
  return (
    <div className="categorySelection">
      <div
        className={`${isActive.gas ? "activeCategory" : ""} categoryIcon`}
        onClick={() => {
          onCategoryChange("Gas");
          setActiveCategory("gas");
        }}
      >
        <Tooltip text={"Gas"} />
        <Gas className={`${isActive.gas ? "activeLogo" : ""} categoryLogo`} />
      </div>
      <div
        className={`${isActive.shop ? "activeCategory" : ""} categoryIcon`}
        onClick={() => {
          onCategoryChange("Shop");
          setActiveCategory("shop");
        }}
      >
        <Tooltip text={"Shop"} />
        <Shop className={`${isActive.shop ? "activeLogo" : ""} categoryLogo`} />
      </div>
      <div
        className={`${isActive.withdraw ? "activeCategory" : ""} categoryIcon`}
        onClick={() => {
          onCategoryChange("Withdraw");
          setActiveCategory("withdraw");
        }}
      >
        <Tooltip text={"Withdraw"} />
        <Withdraw
          className={`${isActive.withdraw ? "activeLogo" : ""} categoryLogo`}
        />
      </div>
      <div
        className={`${isActive.home ? "activeCategory" : ""} categoryIcon`}
        onClick={() => {
          onCategoryChange("Home");
          setActiveCategory("home");
        }}
      >
        <Tooltip text={"Home"} />
        <Home className={`${isActive.home ? "activeLogo" : ""} categoryLogo`} />
      </div>
      <div
        className={`${isActive.work ? "activeCategory" : ""} categoryIcon`}
        onClick={() => {
          onCategoryChange("Work");
          setActiveCategory("work");
        }}
      >
        <Tooltip position={"bottom"} text={"Work"} />
        <Work className={`${isActive.work ? "activeLogo" : ""} categoryLogo`} />
      </div>
      <div
        className={`${isActive.streaming ? "activeCategory" : ""} categoryIcon`}
        onClick={() => {
          onCategoryChange("Streaming");
          setActiveCategory("streaming");
        }}
      >
        <Tooltip position={"bottom"} text={"Streaming"} />
        <Streaming
          className={`${isActive.streaming ? "activeLogo" : ""} categoryLogo`}
        />
      </div>
      <div
        className={`${isActive.food ? "activeCategory" : ""} categoryIcon`}
        onClick={() => {
          onCategoryChange("Food");
          setActiveCategory("food");
        }}
      >
        <Tooltip position={"bottom"} text={"Food"} />
        <Food className={`${isActive.food ? "activeLogo" : ""} categoryLogo`} />
      </div>
      <div
        className={`${isActive.other ? "activeCategory" : ""} categoryIcon`}
        onClick={() => {
          onCategoryChange("Other");
          setActiveCategory("other");
        }}
      >
        <Tooltip position={"bottom"} text={"Other"} />
        <Other
          className={`${isActive.other ? "activeLogo" : ""} categoryLogo`}
        />
      </div>
    </div>
  );
};

export default Categories;
