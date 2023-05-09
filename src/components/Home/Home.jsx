import { useState } from "react";
import Canvas from "../Canvas/Canvas";
import ParameterController from "../StableDiffusion/ParameterController/ParameterController";
import PredictionResult from "../StableDiffusion/PredictionResult";
import ImageGenerator from "../StableDiffusion/ImageGenerator";

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
  console.log(parameters);

  const [preditionImg, setPredictionImg] = useState(null);

  const onChangeParameters = (name, value) => {
    setParameters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <div className="wrapper">
        <Canvas onChangeParameters={onChangeParameters} />
        {preditionImg && <PredictionResult preditionImg={preditionImg} />}
        <ParameterController
          parameters={parameters}
          onChangeParameters={onChangeParameters}
        />
        <ImageGenerator
          parameters={parameters}
          setPredictionImg={setPredictionImg}
        />
      </div>
    </div>
  );
}

export default Home;
