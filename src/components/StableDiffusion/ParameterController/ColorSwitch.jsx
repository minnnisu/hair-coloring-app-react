import "./css/ColorSwitch.css";

function ColorSwitch({ items, currentColor, onChangeItem }) {
  return (
    <div className="color_switch_container">
      {items.map((itemName, index) => (
        <div
          key={index}
          className={`color_switch_item ${itemName} ${
            currentColor === itemName ? "active" : ""
          }`}
          onClick={() => onChangeItem(itemName)}
          placeholder={itemName}
        ></div>
      ))}
    </div>
  );
}

export default ColorSwitch;
