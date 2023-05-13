import SliderBar from "../StableDiffusion/ParameterController/SliderBar";

function CanvasTools({ canvasData, onChangeCanvasData }) {
  function changePenSize(value) {
    canvasData.context.lineWidth = value; // 펜 크기 조절
    onChangeCanvasData("tool", {
      penMode: canvasData.tool.penMode,
      penSize: value,
    });
  }

  function handlePenMode(type) {
    if (type === "brush") {
      canvasData.context.strokeStyle = "#fff";
      onChangeCanvasData("tool", {
        penMode: "brush",
        penSize: canvasData.tool.penSize,
      });
    } else if (type === "eraser") {
      onChangeCanvasData("tool", {
        penMode: "eraser",
        penSize: canvasData.tool.penSize,
      });
    }
  }

  return (
    <div className="canvas_tool_container">
      <SliderBar
        min={0}
        max={30}
        step={1}
        currentValue={canvasData.tool.penSize}
        onChangeValue={changePenSize}
      />
      <button onClick={() => handlePenMode("brush")}>브러쉬</button>
      <button onClick={() => handlePenMode("eraser")}>지우개</button>
    </div>
  );
}

export default CanvasTools;
