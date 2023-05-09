import SliderBar from "../StableDiffusion/ParameterController/SliderBar";

function CanvasTools({ canvas, valueOfTools, onChangeValueOfTools }) {
  function changePenSize(value) {
    canvas.context.lineWidth = value; // 펜 크기 조절
    onChangeValueOfTools("penSize", value);
  }

  function handlePenMode(type) {
    if (type === "brush") {
      canvas.context.strokeStyle = "#fff";
      onChangeValueOfTools("penMode", "brush");
    } else if (type === "eraser") {
      onChangeValueOfTools("penMode", "eraser");
    }
  }

  function deletePaintingAll() {
    canvas.context.fillStyle = "blue";
    canvas.context.fillRect(0, 0, canvas.canvas.width, canvas.canvas.height);
  }

  return (
    <div className="canvas_tool_container">
      <SliderBar
        min={0}
        max={20}
        step={1}
        currentValue={valueOfTools.penSize}
        onChangeValue={changePenSize}
      />
      <button onClick={() => handlePenMode("brush")}>브러쉬</button>
      <button onClick={() => handlePenMode("eraser")}>지우개</button>
      <button onClick={deletePaintingAll}>전체 지우기</button>
    </div>
  );
}

export default CanvasTools;
