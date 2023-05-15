function ToggleBox({ canvasData, parameters }) {
  return (
    <div className="toggle_box_container">
      {parameters.maskImg && (
        <details>
          <summary className="summary">Show original & masking image</summary>
          <div className="wrapper">
            <img
              className="original_img"
              src={canvasData.baseImg.src}
              width={300}
              alt="original"
            />
            <img
              className="mask_img"
              src={parameters.maskImg}
              width={300}
              alt="masking"
            />
            <div className="overlap_container">
              <img
                className="overlap_original_img"
                src={canvasData.baseImg.src}
                width={300}
                alt="original"
              />
              <img
                className="overlap_mask_img"
                src={parameters.maskImg}
                width={300}
                alt="masking"
              />
            </div>
          </div>
        </details>
      )}
    </div>
  );
}

export default ToggleBox;
