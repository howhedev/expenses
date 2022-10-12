import React from "react";
import "./greetings.css";

export default function Greetings({ name }) {
  return (
    <div className="greetings">
      <div className="your-spendings-user">
        <h4>Your Spendings</h4>
        <p>{name}</p>
      </div>
    </div>
  );
}
