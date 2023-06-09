import { useRef } from "react";

function BaseImageHandler({
  setIsLoding,
  onChangeCanvasData,
  onChangeParameters,
  onChangePreditctionImage,
}) {
  const BaseImageInputRef = useRef(null);

  function resizeImage(img) {
    let ratio = 1;

    if (img.width > img.height) {
      if (img.width > 512) {
        ratio = 512 / img.width;
      }
    } else {
      if (img.width > 512) {
        ratio = 512 / img.width;
      }
    }

    // width, height 모두 8의 배수로 설정
    const resizeWidth = Math.floor((img.width * ratio) / 8) * 8;
    const resizeHeight = Math.floor((img.height * ratio) / 8) * 8;

    return { resizeWidth, resizeHeight };
  }

  const generateResizedImg = (img, { resizeWidth, resizeHeight }) => {
    // draw the original image onto the canvas with the new dimensions
    const canvas = document.createElement("canvas");
    canvas.width = resizeWidth;
    canvas.height = resizeHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    return canvas.toDataURL();
  };

  const changeBaseImage = (img) => {
    const image = new Image();
    image.src = img;

    image.onload = function () {
      onChangeCanvasData("baseImg", image);
      onChangeParameters("maskImg", null);
      onChangePreditctionImage(null);
    };
    image.onerror = function () {
      alert("fail to change a image");
    };
  };

  function processImage(event) {
    if (event.target.files[0]) {
      const image = new Image();
      image.src = URL.createObjectURL(event.target.files[0]);

      image.onload = function () {
        const resize = resizeImage(image);
        const resizedImgUrl = generateResizedImg(image, resize);

        onChangeParameters("width", resize.resizeWidth);
        onChangeParameters("height", resize.resizeHeight);
        changeBaseImage(resizedImgUrl);
        setIsLoding("no");
      };

      image.onerror = function () {
        alert("fail to load a image");
      };
    }
    return;
  }

  return (
    <>
      <button
        className="base_img_input_button"
        onClick={() => {
          BaseImageInputRef.current.click();
        }}
      >
        Upload Image
      </button>
      <input
        className="base_img_input"
        ref={BaseImageInputRef}
        type="file"
        onChange={processImage}
      />
    </>
  );
}

export default BaseImageHandler;
