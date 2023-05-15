function ImageGenerator({ parameters, onChangePreditctionImage }) {
  const BASE_URL = process.env.REACT_APP_BASE_URL; // Stable Diffusion Webui API address

  const generateImg = async function () {
    if (parameters.initImg && parameters.maskImg) {
      const payload = {
        include_init_images: true,
        init_images: [parameters.initImg],
        prompt: parameters.prompt,
        mask: parameters.maskImg,
        width: parameters.width,
        height: parameters.height,
        cfg_scale: parameters.cfgScale,
        denoising_strength: parameters.denoisingStrength,
        negative_prompt:
          "(nfsw), long neck, accessory, eyes, distortion, hand, face",
        steps: 20,
        resize_mode: 0,
        sampler_index: "DPM++ SDE Karras",
        inpaint_full_res: 0,
        inpaint_full_res_padding: 32,
        inpainting_mask_invert: 0,
        inpainting_fill: 2,
        restore_faces: true,
        mask_blur: 4,
        Model: "chilloutmix_NiPrunedFp32",
      };

      const response = await fetch(`${BASE_URL}/sdapi/v1/img2img`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...payload }),
      });

      const resJson = await response.json();
      console.log(resJson);
      onChangePreditctionImage(`data:image/png;base64,${resJson.images[0]}`);

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
    <button className="submit_btn" onClick={generateImg}>
      Generate Image
    </button>
  );
}

export default ImageGenerator;
