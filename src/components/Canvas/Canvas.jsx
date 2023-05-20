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
    initializeCanvas();
  }, [canvasData.baseImg?.src]);

  function getPos(event, environment) {
    if (environment === "desktop") {
      return {
        x: event.nativeEvent.offsetX,
        y: event.nativeEvent.offsetY,
      };
    } else {
      return {
        x: event.touches[0].clientX - event.target.offsetLeft,
        y:
          event.touches[0].clientY -
          event.target.offsetTop +
          document.documentElement.scrollTop,
      };
    }
  }

  function startDrawing(event, environment) {
    // const mouseX = e.nativeEvent.offsetX;
    // const mouseY = e.nativeEvent.offsetY;

    // console.log(mouseX, mouseY);

    const { x, y } = getPos(event, environment);
    setPainting(true);

    canvasData.context.beginPath();
    canvasData.context.moveTo(x, y);
  }

  function stopDrawing() {
    setPainting(false);
  }

  function draw(event, environment) {
    // const mouseX = e.nativeEvent.offsetX;
    // const mouseY = e.nativeEvent.offsetY;
    const { x, y } = getPos(event, environment);

    if (!painting) return;

    if (canvasData.tool.penMode === "brush") {
      canvasData.context.lineTo(x, y);
      canvasData.context.stroke();
    } else if (canvasData.tool.penMode === "eraser") {
      // baseCtx.lineTo(mouseX, mouseY);
      // baseCtx.stroke();

      canvasData.context.clearRect(
        x - canvasData.context.lineWidth / 2,
        y - canvasData.context.lineWidth / 2,
        canvasData.context.lineWidth,
        canvasData.context.lineWidth
      );
    }
  }

  return (
    <canvas
      width={canvasData.baseImg.width}
      height={canvasData.baseImg.height}
      id="base-canvas"
      ref={canvasRef}
      onMouseDown={(event) => startDrawing(event, "desktop")}
      onMouseUp={(event) => stopDrawing(event, "desktop")}
      onMouseMove={(event) => draw(event, "desktop")}
      onTouchStart={(event) => startDrawing(event, "mobile")}
      onTouchEnd={(event) => stopDrawing(event, "mobile")}
      onTouchMove={(event) => draw(event, "mobile")}
    ></canvas>
  );
}

export default Canvas;
