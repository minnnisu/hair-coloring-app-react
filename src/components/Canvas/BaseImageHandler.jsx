function BaseImageHandler({ onChangeBaseImage, onChangeParameters }) {
  function resizeImage(img) {
    const canvas = document.createElement("canvas");
    // let baseSize = 0;

    // if (img.width > img.height) {
    //   if (img.width > 486) {
    //     baseSize = 486;
    //   } else {
    //     baseSize = Math.floor(img.width);
    //   }
    // } else {
    //   if (img.width > 400) {
    //     baseSize = 400;
    //   } else {
    //     baseSize = Math.floor(img.width);
    //   }
    // }

    // // set the canvas dimensions to the new size
    // console.log(baseSize);
    // const rate = (img.height / img.width).toFixed(2); // 원본이미지 비율 계산
    // canvas.width = baseSize;
    // canvas.height = baseSize * rate;
    // console.log(canvas.height);

    canvas.width = img.width;
    canvas.height = img.height;

    // draw the original image onto the canvas with the new dimensions
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // onChangeParameters("width", canvas.width);
    // onChangeParameters("height", canvas.height);

    onChangeParameters("width", canvas.width);
    onChangeParameters("height", canvas.height);

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

  return (
    <div>
      <div>이미지 선택하기</div>
      <input type="file" onChange={processImage} />
    </div>
  );
}

export default BaseImageHandler;
