import { useEffect, useRef, useState } from "react";
import BaseImageHandler from "./BaseImageHandler";
import CanvasTools from "./CanvasTools";

const PEN_COLOR = "#fff";

function Canvas({ onChangeParameters }) {
  const baseCanvasRef = useRef(null);
  const [baseCtx, setBaseCtx] = useState(null);
  const [painting, setPainting] = useState(false);
  const [valueOfTools, setValueOfTools] = useState({
    penMode: "brush",
    penSize: 10,
  });
  const [baseImg, setBaseImg] = useState(null);
  const [maskImg, setMaskImg] = useState(null);

  const initializeCanvas = (canvasRef) => {
    if (!baseImg) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    context.width = baseImg.width;
    context.height = baseImg.height;

    context.lineWidth = valueOfTools.penSize; // 펜 크기 조절
    context.strokeStyle = PEN_COLOR;
    context.lineCap = "round";
    context.lineJoin = "round";

    canvas.style.background = `url(${baseImg.src})`; // 배경이미지 변경
    setBaseCtx(context);
  };

  useEffect(() => {
    initializeCanvas(baseCanvasRef);
  }, [baseImg]);

  function startDrawing(e) {
    const mouseX = e.nativeEvent.offsetX;
    const mouseY = e.nativeEvent.offsetY;

    setPainting(true);

    baseCtx.beginPath();
    baseCtx.moveTo(mouseX, mouseY);
  }

  function stopDrawing() {
    setPainting(false);
  }

  function draw(e) {
    const mouseX = e.nativeEvent.offsetX;
    const mouseY = e.nativeEvent.offsetY;

    if (!painting) return;

    if (valueOfTools.penMode === "brush") {
      baseCtx.lineTo(mouseX, mouseY);
      baseCtx.stroke();
    } else if (valueOfTools.penMode === "eraser") {
      // baseCtx.lineTo(mouseX, mouseY);
      // baseCtx.stroke();

      baseCtx.clearRect(
        mouseX - baseCtx.lineWidth / 2,
        mouseY - baseCtx.lineWidth / 2,
        baseCtx.lineWidth,
        baseCtx.lineWidth
      );
    }
  }

  const applyPaintingImage = () => {
    const canvas = document.createElement("canvas");
    canvas.width = baseCanvasRef.current.width;
    canvas.height = baseCanvasRef.current.height;
    const context = canvas.getContext("2d");

    const mask = baseCanvasRef.current.toDataURL();
    const maskImage = new Image();
    maskImage.src = mask;

    maskImage.onload = function () {
      context.drawImage(maskImage, 0, 0);
      context.globalCompositeOperation = "destination-atop";
      context.fillStyle = "#000";
      context.fillRect(0, 0, canvas.width, canvas.height);

      const image = canvas.toDataURL(); //base64
      onChangeParameters("initImg", baseImg.src);
      onChangeParameters("maskImg", image);
      setMaskImg(image);
    };
  };

  const changeBaseImage = (img) => {
    const image = new Image();
    image.src = img;

    image.onload = function () {
      setBaseImg(image); // image 객체
    };
    image.onerror = function () {
      alert("fail to change a image");
    };
  };

  return (
    <div>
      {baseImg && (
        <div>
          <div>
            <div>원본 이미지</div>
            <img src={baseImg.src} width={400} alt="원본 이미지" />
            {maskImg && (
              <div>
                <div>마스크 이미지</div>
                <img src={maskImg} width={400} alt="마스크 이미지" />
              </div>
            )}
          </div>
          <canvas
            width={baseImg.width}
            height={baseImg.height}
            id="base-canvas"
            ref={baseCanvasRef}
            onMouseDown={startDrawing}
            onMouseUp={stopDrawing}
            onMouseMove={draw}
          ></canvas>
          <CanvasTools
            canvas={{ canvas: baseCanvasRef.current, context: baseCtx }}
            valueOfTools={valueOfTools}
            onChangeValueOfTools={(name, value) => {
              setValueOfTools((prev) => ({ ...prev, [name]: value }));
            }}
          />
          <button onClick={applyPaintingImage}>apply</button>
        </div>
      )}
      <BaseImageHandler
        onChangeBaseImage={changeBaseImage}
        onChangeParameters={onChangeParameters}
      />
    </div>
  );
}

export default Canvas;
