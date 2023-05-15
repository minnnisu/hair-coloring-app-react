import SliderBar from "../StableDiffusion/ParameterController/SliderBar";
import Switch from "../StableDiffusion/ParameterController/Switch";

function CanvasTools({ canvasData, onChangeCanvasData }) {
  const PEN_MODE = ["brush", "eraser"];

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
    <div className="canvas_tool">
      <div className="pen-size-controller-container">
        <div className="title">Pen Size</div>
        <SliderBar
          min={0}
          max={30}
          step={1}
          currentValue={canvasData.tool.penSize}
          onChangeValue={changePenSize}
        />
      </div>
      <div className="pen-size-controller-container">
        <div className="title">Pen Mode</div>

        <Switch
          items={PEN_MODE}
          currentColor={canvasData.tool.penMode}
          onChangeItem={handlePenMode}
        />
      </div>
    </div>
  );
}

export default CanvasTools;
