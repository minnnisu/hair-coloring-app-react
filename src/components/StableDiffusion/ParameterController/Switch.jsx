import "./Switch.css";

function Switch({ items, currentColor, onChangeItem }) {
  return (
    <div className="switch_container">
      {items.map((itemName, index) => (
        <div
          key={index}
          className={`switch_item ${currentColor === itemName ? "active" : ""}`}
          onClick={() => onChangeItem(itemName)}
        >
          {itemName}
        </div>
      ))}
    </div>
  );
}

export default Switch;
