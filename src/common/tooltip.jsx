import "./tooltip.css";

const Tooltip = ({ text, position }) => {
  return (
    <div className={`tooltip ${position}`}>
      <p>{text}</p>
    </div>
  );
};

export default Tooltip;
