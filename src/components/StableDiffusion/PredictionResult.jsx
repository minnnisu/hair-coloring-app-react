import "./PredictionResult.css";

function PredictionResult({ parameters, isLoading, preditionImg }) {
  const size = { width: parameters.width, height: parameters.height };
  if (isLoading === "no") {
    if (preditionImg) {
      return (
        <div className="predition_img_wrapper">
          <img src={preditionImg} alt="predict_img" />
        </div>
      );
    }
    return <></>;
  }
  if (isLoading === "yes") {
    return (
      <div className="predition_img_wrapper" style={size}>
        <div className="message">Generating your coloring hair</div>
      </div>
    );
  }
  if (isLoading === "fail") {
    return (
      <div className="predition_img_wrapper" style={size}>
        <div className="message">Fail to generate image</div>
      </div>
    );
  }
}

export default PredictionResult;
