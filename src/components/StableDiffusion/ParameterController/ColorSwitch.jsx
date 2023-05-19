import "./css/ColorSwitch.css";
import CheckIcon from "../../../asset/images/check.png";

function ColorSwitch({ items, currentColor, onChangeItem }) {
  return (
    <div className="color_switch_container">
      {items.map((itemName, index) => (
        <div key={index} className="color_switch_item_wrapper">
          <div
            className={`color_switch_item ${itemName}`}
            onClick={() => onChangeItem(itemName)}
            placeholder={itemName}
          ></div>
          {currentColor === itemName && (
            <img className="active" src={CheckIcon} alt="active" />
          )}
        </div>
      ))}
    </div>
  );
}

export default ColorSwitch;
