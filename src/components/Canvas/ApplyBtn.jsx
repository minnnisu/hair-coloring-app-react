function ApplyBtn({ canvasData, onChangeParameters }) {
  const applyPaintingImage = () => {
    const canvas = document.createElement("canvas");
    canvas.width = canvasData.canvasRef.current.width;
    canvas.height = canvasData.canvasRef.current.height;
    const context = canvas.getContext("2d");

    const mask = canvasData.canvasRef.current.toDataURL();
    const maskImage = new Image();
    maskImage.src = mask;

    maskImage.onload = function () {
      context.drawImage(maskImage, 0, 0);
      context.globalCompositeOperation = "destination-atop";
      context.fillStyle = "#000";
      context.fillRect(0, 0, canvas.width, canvas.height);

      const image = canvas.toDataURL(); //base64
      onChangeParameters("initImg", canvasData.baseImg.src);
      onChangeParameters("maskImg", image);
    };
  };

  return <button onClick={applyPaintingImage}>apply</button>;
}

export default ApplyBtn;
