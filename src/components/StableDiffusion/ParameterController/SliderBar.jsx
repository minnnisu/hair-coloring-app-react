function SliderBar({ min, max, step, currentValue, onChangeValue }) {
  return (
    <>
      <input
        type="range"
        className="slider_bar"
        value={currentValue}
        min={min}
        max={max}
        color="gray"
        step={step}
        onChange={(event) => {
          onChangeValue(event.target.valueAsNumber);
        }}
      />
      <span>{currentValue}</span>
    </>
  );
}

export default SliderBar;
