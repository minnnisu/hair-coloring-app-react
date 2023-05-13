import { useEffect, useRef, useState } from "react";

const PEN_COLOR = "#fff";

function Canvas({ canvasData, onChangeCanvasData, onChangeParameters }) {
  const canvasRef = useRef(null);
  const [painting, setPainting] = useState(false);

  const initializeCanvas = () => {
    if (!canvasData.baseImg) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    context.width = canvasData.baseImg.width;
    context.height = canvasData.baseImg.height;

    context.lineWidth = canvasData.tool.penSize; // 펜 크기 조절
    context.strokeStyle = PEN_COLOR;
    context.lineCap = "round";
    context.lineJoin = "round";

    canvas.style.background = `url(${canvasData.baseImg.src})`; // 배경이미지 변경
    onChangeCanvasData("canvasRef", canvasRef);
    onChangeCanvasData("context", context);
  };

  useEffect(() => {
    console.log("initializeCanvas");
    initializeCanvas();
  }, [canvasData.baseImg?.src]);

  function startDrawing(e) {
    const mouseX = e.nativeEvent.offsetX;
    const mouseY = e.nativeEvent.offsetY;

    setPainting(true);

    canvasData.context.beginPath();
    canvasData.context.moveTo(mouseX, mouseY);
  }

  function stopDrawing() {
    setPainting(false);
  }

  function draw(e) {
    const mouseX = e.nativeEvent.offsetX;
    const mouseY = e.nativeEvent.offsetY;

    if (!painting) return;

    if (canvasData.tool.penMode === "brush") {
      canvasData.context.lineTo(mouseX, mouseY);
      canvasData.context.stroke();
    } else if (canvasData.tool.penMode === "eraser") {
      // baseCtx.lineTo(mouseX, mouseY);
      // baseCtx.stroke();

      canvasData.context.clearRect(
        mouseX - canvasData.context.lineWidth / 2,
        mouseY - canvasData.context.lineWidth / 2,
        canvasData.context.lineWidth,
        canvasData.context.lineWidth
      );
    }
  }

  return (
    <div>
      {canvasData.baseImg && (
        <div>
          <canvas
            width={canvasData.baseImg.width}
            height={canvasData.baseImg.height}
            id="base-canvas"
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseUp={stopDrawing}
            onMouseMove={draw}
          ></canvas>
        </div>
      )}
    </div>
  );
}

export default Canvas;
