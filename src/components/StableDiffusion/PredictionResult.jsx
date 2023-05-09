function PredictionResult({ preditionImg }) {
  return (
    <div>
      <div>이미지 생성 결과</div>
      <img src={preditionImg} alt="predict_img" />
    </div>
  );
}

export default PredictionResult;
