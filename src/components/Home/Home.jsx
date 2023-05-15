import { useState } from "react";
import Controller from "./Controller";
import Body from "./Body";
import "./css/Home.css";

function Home() {
  const [parameters, setParameters] = useState({
    initImg: null,
    maskImg: null,
    prompt: "male",
    width: 0,
    height: 0,
    cfgScale: 7,
    denoisingStrength: 0.75,
  });
  const [canvasData, setCanvasData] = useState({
    canvasRef: null,
    context: null,
    tool: { penMode: "brush", penSize: 10 },
    baseImg: null,
  });
  const [preditionImg, setPredictionImg] = useState(null);

  const onChangeCanvasData = (name, value) => {
    setCanvasData((prev) => ({ ...prev, [name]: value }));
  };

  const onChangeParameters = (name, value) => {
    setParameters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="home">
      <Controller
        parameters={parameters}
        canvasData={canvasData}
        onChangeParameters={onChangeParameters}
        onChangeCanvasData={onChangeCanvasData}
        onChangePreditctionImage={setPredictionImg}
      />
      <Body
        parameters={parameters}
        canvasData={canvasData}
        preditionImg={preditionImg}
        onChangeParameters={onChangeParameters}
        onChangeCanvasData={onChangeCanvasData}
      />
    </div>
  );
}

export default Home;
