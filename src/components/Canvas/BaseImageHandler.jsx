function BaseImageHandler({ onChangeBaseImage }) {
  function resizeImage(img) {
    var canvas = document.createElement("canvas");
    let baseSize = 0;

    if (img.width > img.height) {
      if (img.width > 500) {
        baseSize = 500;
      } else {
        baseSize = img.width;
      }
    } else {
      if (img.width > 400) {
        baseSize = 400;
      } else {
        baseSize = img.width;
      }
    }

    // set the canvas dimensions to the new size
    console.log(baseSize);
    canvas.width = baseSize;
    canvas.height = img.height * (baseSize / img.width);

    // draw the original image onto the canvas with the new dimensions
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    return canvas.toDataURL();
  }

  function processImage(event) {
    if (event.target.files) {
      const image = new Image();
      image.src = URL.createObjectURL(event.target.files[0]);

      image.onload = function () {
        const resizedImg = resizeImage(image);
        onChangeBaseImage(resizedImg);
      };
      image.onerror = function () {
        alert("fail to load a image");
      };
    }
  }

  return <input type="file" onChange={processImage} />;
}

export default BaseImageHandler;
