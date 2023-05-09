function ImageGenerator({ parameters, setPredictionImg }) {
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const generateImg = async function () {
    if (parameters.initImg && parameters.maskImg) {
      const payload = {
        init_images: [parameters.initImg],
        prompt: parameters.prompt,
        mask: parameters.maskImg,
        width: parameters.width,
        height: parameters.height,
        cfg_scale: parameters.cfgScale,
        denoising_strength: parameters.denoisingStrength,
        negative_prompt: "(nfsw), long neck, accessory, eyes, distortion",
        steps: 20,
        resize_mode: 0,
        sampler_index: "DPM++ SDE Karras",
        // mask_blur: 4,
      };
      // console.log(payload);

      const response = await fetch(`${BASE_URL}/sdapi/v1/img2img`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...payload }),
      });

      const resJson = await response.json();
      console.log(resJson);
      setPredictionImg(`data:image/png;base64,${resJson.images[0]}`);

      const imgInfo = await fetch(`${BASE_URL}/sdapi/v1/png-info`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: `data:image/png;base64,${resJson.images[0]}`,
        }),
      });

      const resInfo = await imgInfo.json();
      console.log(resInfo);
    } else {
      alert("이미지를 업로드하고 apply를 클릭 해주세요");
    }
  };

  return (
    <button className="sub_btn" onClick={generateImg}>
      subimt
    </button>
  );
}

export default ImageGenerator;
