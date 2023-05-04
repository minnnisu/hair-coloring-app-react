const BASE_BACKGROUND_COLOR = "#fff";
const PEN_COLOR = "#fff";

function CanvasTools({ canvas, onChangePenMode }) {
  function changePenSize(event) {
    canvas.context.lineWidth = event.target.valueAsNumber; // 펜 크기 조절
  }

  function handlePenMode(type) {
    if (type === "brush") {
      canvas.context.strokeStyle = PEN_COLOR;
      onChangePenMode("brush");
    } else if (type === "eraser") {
      canvas.context.strokeStyle = BASE_BACKGROUND_COLOR;
      onChangePenMode("eraser");
    }
  }

  function deletePaintingAll() {
    canvas.context.fillStyle = "blue";
    canvas.context.fillRect(0, 0, canvas.canvas.width, canvas.canvas.height);
  }

  return (
    <div>
      <input
        type="range"
        className="value"
        min={0}
        max={20}
        color="gray"
        step={1}
        onChange={changePenSize}
      />
      <button onClick={() => handlePenMode("brush")}>브러쉬</button>
      <button onClick={() => handlePenMode("eraser")}>지우개</button>
      <button onClick={deletePaintingAll}>전체 지우기</button>
    </div>
  );
}

export default CanvasTools;
