import { useEffect, useRef, useState } from "react";
import BaseImageHandler from "./BaseImageHandler";
import CanvasTools from "./CanvasTools";

const PEN_COLOR = "#fff";

function Canvas({ onChangeInitImg, onChangeMaskImg }) {
  const baseCanvasRef = useRef(null);
  const [baseCtx, setBaseCtx] = useState(null);
  const [painting, setPainting] = useState(false);
  const [penMode, setPenMode] = useState("brush");
  const [baseImg, setBaseImg] = useState(null);

  const initializeCanvas = (canvasRef) => {
    if (!baseImg) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    context.width = baseImg.width;
    context.height = baseImg.height;

    context.lineWidth = 10; // 펜 크기 조절
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

    if (penMode === "brush") {
      baseCtx.lineTo(mouseX, mouseY);
      baseCtx.stroke();
    } else if (penMode === "eraser") {
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
      onChangeInitImg(baseImg.src);
      onChangeMaskImg(image);
      // const a = document.createElement("a");
      // a.href = image;
      // a.download = "masked";
      // document.body.appendChild(a);
      // a.click();
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
    // background image로 사진 보여주기
    // 펜 색깔(흰색)
    // 기본적으로 바탕은 검은색
    <div>
      {baseImg && (
        <div>
          <canvas
            width={baseImg.width}
            height={baseImg.height}
            id="base-canvas"
            ref={baseCanvasRef}
            onMouseDown={startDrawing}
            onMouseUp={stopDrawing}
            onMouseMove={draw}
          ></canvas>
        </div>
      )}
      <div>
        <BaseImageHandler onChangeBaseImage={changeBaseImage} />
        <CanvasTools
          canvas={{ canvas: baseCanvasRef.current, context: baseCtx }}
          onChangePenMode={(penMode) => setPenMode(penMode)}
        />
        <button onClick={applyPaintingImage}>apply</button>
      </div>
    </div>
  );
}

export default Canvas;
