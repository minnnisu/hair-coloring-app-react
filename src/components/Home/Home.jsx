import { useState } from "react";
import Canvas from "../Canvas/Canvas";
import PredictionResult from "../StableDiffusion/PredictionResult";
import Controller from "./Controller";
import ToggleBox from "./ToggleBox";

function Home(params) {
  const [parameters, setParameters] = useState({
    initImg: null,
    maskImg: null,
    prompt: "male",
    width: 0,
    height: 0,
    cfgScale: 7,
    denoisingStrength: 0.75,
  });
  // console.log(parameters);

  const [preditionImg, setPredictionImg] = useState(null);
  const [canvasData, setCanvasData] = useState({
    canvasRef: null,
    context: null,
    tool: { penMode: "brush", penSize: 10 },
    baseImg: null,
  });
  console.log(canvasData);

  const onChangeCanvasData = (name, value) => {
    setCanvasData((prev) => ({ ...prev, [name]: value }));
  };

  const onChangeParameters = (name, value) => {
    setParameters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <Controller
        parameters={parameters}
        canvasData={canvasData}
        onChangeParameters={onChangeParameters}
        onChangeCanvasData={onChangeCanvasData}
        onChangePreditctionImage={setPredictionImg}
      />
      <div className="wrapper">
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

export default Home;
