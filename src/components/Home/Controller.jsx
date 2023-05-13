import BaseImageHandler from "../Canvas/BaseImageHandler";
import ImageGenerator from "../StableDiffusion/ImageGenerator";
import ParameterController from "../StableDiffusion/ParameterController/ParameterController";
import CanvasTools from "../Canvas/CanvasTools";
import ApplyBtn from "../Canvas/ApplyBtn";

function Controller({
  parameters,
  canvasData,
  onChangeParameters,
  onChangeCanvasData,
  onChangePreditctionImage,
}) {
  return (
    <div>
      <ParameterController
        parameters={parameters}
        onChangeParameters={onChangeParameters}
      />
      {canvasData.baseImg && (
        <div>
          <CanvasTools
            canvasData={canvasData}
            onChangeCanvasData={onChangeCanvasData}
          />
          <ApplyBtn
            canvasData={canvasData}
            onChangeParameters={onChangeParameters}
          />
        </div>
      )}
      <ImageGenerator
        parameters={parameters}
        onChangePreditctionImage={onChangePreditctionImage}
      />
      <BaseImageHandler
        onChangeCanvasData={onChangeCanvasData}
        onChangeParameters={onChangeParameters}
      />
    </div>
  );
}

export default Controller;
