function ToggleBox({ canvasData, parameters }) {
  return (
    <div>
      {canvasData.baseImg && (
        <div>
          <div>
            <div>원본 이미지</div>
            <img src={canvasData.baseImg.src} width={300} alt="원본 이미지" />
          </div>
          {parameters.maskImg && (
            <div>
              <div>마스크 이미지</div>
              <img src={parameters.maskImg} width={300} alt="마스크 이미지" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ToggleBox;
