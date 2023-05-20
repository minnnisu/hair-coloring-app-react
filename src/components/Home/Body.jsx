import Canvas from "../Canvas/Canvas";
import PredictionResult from "../StableDiffusion/PredictionResult";
import ToggleBox from "./ToggleBox";
import "./css/Body.css";

function Body({
  isLoading,
  parameters,
  canvasData,
  preditionImg,
  onChangeParameters,
  onChangeCanvasData,
}) {
  return (
    <div className="body">
      <div className="canvas_and_result">
        {canvasData.baseImg ? (
          <>
            <Canvas
              canvasData={canvasData}
              onChangeCanvasData={onChangeCanvasData}
              onChangeParameters={onChangeParameters}
            />
            <PredictionResult
              parameters={parameters}
              isLoading={isLoading}
              preditionImg={preditionImg}
            />
          </>
        ) : (
          <div className="no_base_img">
            <div className="message">Please click upload image button</div>
          </div>
        )}
      </div>
      <ToggleBox parameters={parameters} canvasData={canvasData} />
    </div>
  );
}

export default Body;
