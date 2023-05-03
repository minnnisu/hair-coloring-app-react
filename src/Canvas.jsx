import { useEffect, useRef, useState } from "react";
import BaseImageHandler from "./BaseImageHandler";

const BACKGROUND_COLOR = "black";
const PEN_COLOR = "#fff";

function Canvas() {
  const baseCanvasRef = useRef(null);
  const maskCanvasRef = useRef(null);
  const [baseCtx, setBaseCtx] = useState(null);
  const [maskCtx, setMaskCtx] = useState(null);
  const [painting, setPainting] = useState(false);
  const [penMode, setPenMode] = useState("brush");
  const [baseImg, setBaseImg] = useState(null);

  useEffect(() => {
    if (!baseImg) return;

    const baseCanvas = baseCanvasRef.current;
    const maskCanvas = maskCanvasRef.current;
    const baseContext = baseCanvas.getContext("2d");
    const maskContext = maskCanvas.getContext("2d");

    baseContext.width = baseImg.width;
    baseContext.height = baseImg.height;
    maskContext.width = baseImg.width;
    maskContext.height = baseImg.height;

    baseContext.drawImage(baseImg, 0, 0);
    baseContext.lineWidth = 10; // 펜 크기 조절
    baseContext.strokeStyle = PEN_COLOR;
    baseContext.lineCap = "round";
    baseContext.lineJoin = "round";

    maskContext.fillStyle = BACKGROUND_COLOR;
    maskContext.fillRect(0, 0, maskContext.width, maskContext.height);
    maskContext.lineWidth = 10; // 펜 크기 조절
    maskContext.strokeStyle = PEN_COLOR;
    maskContext.lineCap = "round";
    maskContext.lineJoin = "round";

    setBaseCtx(baseContext);
    setMaskCtx(maskContext);
  }, [baseImg]);

  function startDrawing(e) {
    const mouseX = e.nativeEvent.offsetX;
    const mouseY = e.nativeEvent.offsetY;

    setPainting(true);

    baseCtx.beginPath();
    baseCtx.moveTo(mouseX, mouseY);

    maskCtx.beginPath();
    maskCtx.moveTo(mouseX, mouseY);
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

      maskCtx.lineTo(mouseX, mouseY);
      maskCtx.stroke();
    } else if (penMode === "eraser") {
      baseCtx.clearRect(
        mouseX - baseCtx.lineWidth / 2,
        mouseY - baseCtx.lineWidth / 2,
        baseCtx.lineWidth,
        baseCtx.lineWidth
      );
      maskCtx.clearRect(
        mouseX - maskCtx.lineWidth / 2,
        mouseY - maskCtx.lineWidth / 2,
        maskCtx.lineWidth,
        maskCtx.lineWidth
      );
    }
  }

  function handlePenMode(type) {
    if (type === "brush") {
      // baseCtx.strokeStyle = PEN_COLOR;
      // maskCtx.strokeStyle = PEN_COLOR;
      setPenMode("brush");
    } else if (type === "eraser") {
      // baseCtx.strokeStyle = BACKGROUND_COLOR;
      // maskCtx.strokeStyle = BACKGROUND_COLOR;
      setPenMode("eraser");
    }
  }

  function deletePaintingAll() {
    baseCtx.fillStyle = "blue";
    baseCtx.fillRect(
      0,
      0,
      baseCanvasRef.current.width,
      baseCanvasRef.current.height
    );

    maskCtx.fillStyle = "blue";
    maskCtx.fillRect(
      0,
      0,
      maskCanvasRef.current.width,
      maskCanvasRef.current.height
    );
  }

  function savePaintingImage() {
    const image = maskCanvasRef.current.toDataURL();
    const a = document.createElement("a");
    a.href = image;
    a.download = "masked";
    document.body.appendChild(a);
    a.click();
  }

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
          <canvas
            width={baseImg.width}
            height={baseImg.height}
            id="mask-canvas"
            ref={maskCanvasRef}
          ></canvas>
        </div>
      )}
      <div>
        <BaseImageHandler onChangeBaseImage={changeBaseImage} />
        <button onClick={() => handlePenMode("brush")}>브러쉬</button>
        <button onClick={() => handlePenMode("eraser")}>지우개</button>
        <button onClick={deletePaintingAll}>전체 지우기</button>
        <button onClick={savePaintingImage}>저장</button>
      </div>
    </div>
  );
}

export default Canvas;
