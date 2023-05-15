import Canvas from "../Canvas/Canvas";
import PredictionResult from "../StableDiffusion/PredictionResult";
import ToggleBox from "./ToggleBox";
import "./css/Body.css";

function Body({
  parameters,
  canvasData,
  preditionImg,
  onChangeParameters,
  onChangeCanvasData,
}) {
  return (
    <div className="body">
      <div className="canvas_and_result">
        <Canvas
          canvasData={canvasData}
          onChangeCanvasData={onChangeCanvasData}
          onChangeParameters={onChangeParameters}
        />
        {preditionImg && <PredictionResult preditionImg={preditionImg} />}
      </div>
      <ToggleBox parameters={parameters} canvasData={canvasData} />
    </div>
  );
}

export default Body;
