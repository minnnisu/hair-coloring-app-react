import "./css/SliderBar.css";

function SliderBar({
  min,
  max,
  step,
  currentValue,
  onChangeValue,
  additionalClassName,
}) {
  return (
    <div className="slider">
      <input
        type="range"
        className={`slider_bar ${additionalClassName}`}
        value={currentValue}
        min={min}
        max={max}
        color="gray"
        step={step}
        onChange={(event) => {
          onChangeValue(event.target.valueAsNumber);
        }}
      />
      <span className="slider_value">{currentValue}</span>
    </div>
  );
}

export default SliderBar;
