import BaseImageHandler from "../Canvas/BaseImageHandler";
import ImageGenerator from "../StableDiffusion/ImageGenerator";
import ParameterController from "../StableDiffusion/ParameterController/ParameterController";
import CanvasTools from "../Canvas/CanvasTools";
import ApplyBtn from "../Canvas/ApplyBtn";

import "./css/Controller.css";

function Controller({
  parameters,
  canvasData,
  onChangeParameters,
  onChangeCanvasData,
  onChangePreditctionImage,
  setIsLoding,
}) {
  return (
    <div className="controller_container">
      <div className="wrapper">
        <ParameterController
          parameters={parameters}
          onChangeParameters={onChangeParameters}
        />
      </div>
      {canvasData.baseImg && (
        <div className="wrapper">
          <div className="canvas_tool_container">
            <CanvasTools
              canvasData={canvasData}
              onChangeCanvasData={onChangeCanvasData}
            />
            <ApplyBtn
              canvasData={canvasData}
              onChangeParameters={onChangeParameters}
            />
          </div>
        </div>
      )}
      <div className="wrapper">
        <BaseImageHandler
          setIsLoding={setIsLoding}
          onChangeCanvasData={onChangeCanvasData}
          onChangeParameters={onChangeParameters}
          onChangePreditctionImage={onChangePreditctionImage}
        />
        <ImageGenerator
          setIsLoding={setIsLoding}
          parameters={parameters}
          onChangePreditctionImage={onChangePreditctionImage}
        />
      </div>
    </div>
  );
}

export default Controller;
